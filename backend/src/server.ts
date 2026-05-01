import { WebSocketServer, WebSocket as WS } from 'ws';
import GeminiWS from 'ws';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';
import { ConversationMemory } from './conversation-memory';
import { getToolsConfig, getToolMapping } from './tools';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const CHATBOT_MODEL = process.env.CHATBOT_MODEL || 'gemini-3.1-flash-live-preview';
const PORT = parseInt(process.env.PORT || '4895', 10);

if (!GEMINI_API_KEY) {
  console.warn("⚠️ CẢNH BÁO: Thiếu GEMINI_API_KEY trong môi trường!");
}

const sessions = new Map<string, { memory: ConversationMemory; lastActive: number }>();
const SESSION_TTL = 30 * 60 * 1000; // 30 phút

function getSession(id: string) {
  const now = Date.now();
  for (const [sid, s] of sessions.entries()) {
    if (now - s.lastActive > SESSION_TTL) sessions.delete(sid);
  }
  if (!sessions.has(id)) {
    sessions.set(id, { memory: new ConversationMemory(), lastActive: now });
  }
  const session = sessions.get(id)!;
  session.lastActive = now;
  return session;
}

const toolCache = new Map<string, { result: string; ts: number }>();
const TOOL_CACHE_TTL = 5 * 60 * 1000;

async function executeTool(name: string, args: any) {
  console.log(`[WS] Tool called: ${name}`, args);
  const mapping = getToolMapping();
  if (!mapping[name]) return `Tool "${name}" không tồn tại.`;

  try {
    if (name === "search_mtpc_knowledge") {
      const query = String(args?.query ?? "").trim();
      const cached = toolCache.get(query);
      if (cached && Date.now() - cached.ts < TOOL_CACHE_TTL) return cached.result;
      const result = await mapping[name](args);
      toolCache.set(query, { result, ts: Date.now() });
      return result;
    }
    return await mapping[name](args);
  } catch (e: any) {
    console.error(`[WS] Lỗi tool ${name}:`, e.message);
    return `Lỗi thực thi ${name}`;
  }
}

function buildSystemPrompt() {
  return `Bạn là Nhi, chuyên viên tư vấn tuyển sinh của Trường Trung cấp Miền Tây (MTPC).
Người dùng sẽ hỏi bằng tiếng Việt, bạn LUÔN trả lời bằng tiếng Việt.

## QUY TẮC XỬ LÝ CÂU NGẮN MƠ HỒ
Khi người dùng gửi câu ngắn như "kể thêm đi", "hướng dẫn tôi", "ngành nào tốt"...
→ Hiểu đây là yêu cầu tiếp nối chủ đề đang nói, KHÔNG hỏi lại.
→ Dùng tool search_mtpc_knowledge để tìm thêm thông tin liên quan.

## QUY TẮC SỬ DỤNG DATASET (RAG)
- LUÔN dùng tool search_mtpc_knowledge khi hỏi về: ngành học, học phí, thời gian học, điều kiện tuyển sinh, chương trình đào tạo, học bổng, cơ sở vật chất.
- TUYỆT ĐỐI KHÔNG tự bịa thông tin. Chỉ trả lời dựa trên kết quả tool trả về.
- TUYỆT ĐỐI KHÔNG dùng dấu sao đôi (**từ**). Trả lời bằng văn bản thuần túy.
- Nếu không tìm thấy thông tin → hướng dẫn gọi hotline 0934 790 790.

## QUY TẮC VỀ NGỮ CẢNH TRANG WEB
- Bạn biết người dùng đang ở trang nào qua phần [TRANG HIỆN TẠI] trong tin nhắn.
- Khi hỏi "trang này dùng làm gì", "hướng dẫn tôi" → gọi search_mtpc_knowledge với URL/chủ đề trang đó.

## QUY TẮC ĐIỀU HƯỚNG
- Nếu người dùng muốn xem trang cụ thể hoặc đồng ý chuyển hướng → gọi tool navigate_to_page.
- Chủ động mời: "Bạn có muốn mình dẫn bạn đến trang đó không?" khi phù hợp.
- KHÔNG gọi navigate_to_page mà không có sự đồng ý của người dùng.

## THÔNG TIN LIÊN HỆ
- Hotline tư vấn: 0934 790 790
- Website: mtpc.edu.vn`;
}

function handleClient(clientWs: WS) {
  let geminiWs: GeminiWS | null = null;
  let setupDone = false;
  const replyParts: string[] = [];

  const sendToClient = (payload: object) => {
    if (clientWs.readyState === WS.OPEN) {
      clientWs.send(JSON.stringify(payload));
    }
  };

  clientWs.on('message', async (raw) => {
    try {
      const msg = JSON.parse(raw.toString());

      if (msg.type === "init") {
        const sessionId = msg.session_id || randomUUID();
        const message = msg.message || "";
        const pageContext = msg.page_context || "";

        const session = getSession(sessionId);
        let textWithCtx = session.memory.buildContextPrefix(message);
        if (pageContext) textWithCtx = `[TRANG HIỆN TẠI]: ${pageContext}\n\n${textWithCtx}`;
        session.memory.addUser(message);

        const geminiUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${GEMINI_API_KEY}`;
        geminiWs = new GeminiWS(geminiUrl);

        geminiWs.on('open', async () => {
          console.log(`[WS] Đã kết nối tới Gemini (Session: ${sessionId})`);
          const toolsConfig = await getToolsConfig();
          geminiWs!.send(JSON.stringify({
            setup: {
              model: `models/${CHATBOT_MODEL}`,
              generationConfig: {
                responseModalities: ["AUDIO", "TEXT"],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } } }
              },
              outputAudioTranscription: {},
              realtimeInputConfig: { turnCoverage: "TURN_INCLUDES_ONLY_ACTIVITY" },
              systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
              tools: toolsConfig
            }
          }));
        });

        geminiWs.on('message', async (data) => {
          try {
            const parsed = JSON.parse(data.toString());

            if (!setupDone && parsed.setupComplete !== undefined) {
              setupDone = true;
              geminiWs!.send(JSON.stringify({ realtimeInput: { text: textWithCtx } }));
              setTimeout(() => {
                if (geminiWs?.readyState === GeminiWS.OPEN) {
                  geminiWs.send(JSON.stringify({ clientContent: { turns: [], turn_complete: true } }));
                }
              }, 100);
              return;
            }

            if (parsed.toolCall?.functionCalls?.length) {
              const results = await Promise.all(
                parsed.toolCall.functionCalls.map(async (fc: any) => {
                  const result = await executeTool(fc.name, fc.args || {});
                  sendToClient({ type: "tool_call", name: fc.name, args: fc.args });

                  if (fc.name === "navigate_to_page") {
                    try {
                      const nav = JSON.parse(result);
                      if (nav.action === "navigate") {
                        sendToClient({ type: "navigate", url: nav.url, reason: nav.reason });
                      }
                    } catch { }
                  }

                  return { id: fc.id, name: fc.name, response: { result } };
                })
              );
              geminiWs!.send(JSON.stringify({ toolResponse: { functionResponses: results } }));
              return;
            }

            const sc = parsed.serverContent;
            if (sc) {
              if (sc.modelTurn?.parts) {
                for (const part of sc.modelTurn.parts) {
                  if (part.inlineData?.data) {
                    console.log("[WS] Received AUDIO chunk from Gemini");
                    sendToClient({ type: "audio", data: part.inlineData.data });
                  }
                }
              } else if (sc.outputTranscription?.text) {
                console.log("[WS] Received TEXT from Gemini:", sc.outputTranscription.text);
              }

              if (sc.outputTranscription?.text) {
                const chunk = sc.outputTranscription.text;
                replyParts.push(chunk);
                sendToClient({ type: "token", text: chunk });
              }

              if (sc.turnComplete) {
                const fullReply = replyParts.join("").trim();
                if (fullReply) session.memory.addAssistant(fullReply);
                sendToClient({ type: "done", session_id: sessionId });
              }
            }
          } catch (e) {
            console.error("[WS] Gemini Parse error", e);
          }
        });

        geminiWs.on('error', (e) => sendToClient({ type: "error", error: e.message }));
        geminiWs.on('close', () => { geminiWs = null; });
      }
    } catch (e) {
      console.error("[WS] Message error", e);
    }
  });

  clientWs.on('close', () => {
    if (geminiWs && geminiWs.readyState === GeminiWS.OPEN) geminiWs.close();
  });
}

const wss = new WebSocketServer({ port: PORT });
wss.on('connection', handleClient);
console.log(`[Backend WS] Đang lắng nghe trên cổng ${PORT}...`);
