import { NextRequest } from 'next/server';
import WebSocket from 'ws';
import { getToolsConfig, getToolMapping } from '@/lib/chatbot/tools';

// Yêu cầu NodeJS Runtime vì thư viện 'ws' không chạy trên Edge
export const runtime = 'nodejs';

// Cache trong RAM (tồn tại trên từng instance của Serverless Function)
const toolCache = new Map<string, { result: string; ts: number }>();
const TOOL_CACHE_TTL = 5 * 60 * 1000;

function buildSystemPrompt(): string {
  return `Bạn là Tiến, chuyên viên tư vấn tuyển sinh của Trường Trung cấp Miền Tây (MTPC).
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

export async function POST(req: NextRequest) {
    try {
        const { message, history = [], pageContext = "" } = await req.json();
        
        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
        const modelName = process.env.CHATBOT_MODEL || "gemini-3.1-flash-live-preview";

        const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey}`;

        // Build context từ Lịch sử hội thoại
        let historyLines = "";
        if (history && history.length > 0) {
            historyLines = history.map((h: any) => `${h.isUser ? "Người dùng" : "Trợ lý"}: ${h.text}`).join('\n');
            historyLines = `[LỊCH SỬ HỘI THOẠI]\n${historyLines}\n\n`;
        }
        
        let textWithCtx = `${historyLines}[TIN NHẮN HIỆN TẠI]\n${message}`;
        if (pageContext) {
            textWithCtx = `[TRANG HIỆN TẠI]: ${pageContext}\n\n${textWithCtx}`;
        }

        const systemPrompt = buildSystemPrompt();

        const stream = new ReadableStream({
            async start(controller) {
                let isClosed = false;
                let setupDone = false;

                const safeEnqueue = (data: string) => {
                    if (!isClosed) {
                        try { controller.enqueue(new TextEncoder().encode(data)); } catch (_) {}
                    }
                };
                const safeClose = () => {
                    if (!isClosed) {
                        isClosed = true;
                        try { controller.close(); } catch (_) {}
                    }
                };

                const ws = new WebSocket(wsUrl);

                ws.on('open', async () => {
                    console.log("[Chatbot API] Đã mở kết nối WS tới Gemini");
                    const toolsConfig = await getToolsConfig();
                    
                    // Gửi Setup
                    ws.send(JSON.stringify({
                        setup: {
                            model: `models/${modelName}`,
                            generationConfig: {
                                responseModalities: ["AUDIO"], // Kích hoạt Audio Modality
                                speechConfig: {
                                    voiceConfig: { prebuiltVoiceConfig: { voiceName: "Algenib" } }
                                }
                            },
                            outputAudioTranscription: {}, // Yêu cầu trả về văn bản dịch từ audio
                            realtimeInputConfig: { turnCoverage: "TURN_INCLUDES_ONLY_ACTIVITY" },
                            systemInstruction: { parts: [{ text: systemPrompt }] },
                            tools: toolsConfig
                        }
                    }));
                });

                ws.on('message', async (data) => {
                    if (isClosed) return;
                    try {
                        const parsed = JSON.parse(data.toString());

                        if (!setupDone && parsed.setupComplete !== undefined) {
                            setupDone = true;
                            // Setup xong, gửi tin nhắn của user
                            ws.send(JSON.stringify({
                                realtimeInput: { text: textWithCtx }
                            }));
                            
                            // Báo Gemini kết thúc lượt
                            setTimeout(() => {
                                if (ws.readyState === WebSocket.OPEN) {
                                    ws.send(JSON.stringify({
                                        clientContent: { turns: [], turn_complete: true }
                                    }));
                                }
                            }, 100);
                            return;
                        }

                        // XỬ LÝ TOOL CALL TỪ GEMINI
                        if (parsed.toolCall?.functionCalls?.length) {
                            const mapping = getToolMapping();
                            const results = await Promise.all(
                                parsed.toolCall.functionCalls.map(async (fc: any) => {
                                    let resultStr = "";
                                    const { name, args } = fc;
                                    console.log(`[Chatbot API] Tool Called: ${name}`, args);
                                    
                                    try {
                                        if (!mapping[name]) {
                                            resultStr = `Tool ${name} not found.`;
                                        } else {
                                            if (name === "search_mtpc_knowledge") {
                                                const query = String(args?.query ?? "").trim();
                                                const cached = toolCache.get(query);
                                                if (cached && Date.now() - cached.ts < TOOL_CACHE_TTL) {
                                                    resultStr = cached.result;
                                                } else {
                                                    resultStr = await mapping[name](args);
                                                    toolCache.set(query, { result: resultStr, ts: Date.now() });
                                                }
                                            } else {
                                                resultStr = await mapping[name](args);
                                            }
                                        }
                                        
                                        // Gửi sự kiện tool cho Frontend (để hiển thị UX nếu cần)
                                        safeEnqueue(`data: ${JSON.stringify({ type: 'tool_call', name, args })}\n\n`);

                                        // Gửi sự kiện điều hướng trang
                                        if (name === "navigate_to_page") {
                                            try {
                                                const nav = JSON.parse(resultStr);
                                                if (nav.action === "navigate") {
                                                    safeEnqueue(`data: ${JSON.stringify({ type: 'navigate', url: nav.url, reason: nav.reason })}\n\n`);
                                                }
                                            } catch(e) {}
                                        }
                                    } catch (err: any) {
                                        resultStr = `Error: ${err.message}`;
                                    }

                                    return { id: fc.id, name: fc.name, response: { result: resultStr } };
                                })
                            );

                            // Gửi kết quả Tool ngược lại cho Gemini
                            if (ws.readyState === WebSocket.OPEN) {
                                ws.send(JSON.stringify({ toolResponse: { functionResponses: results } }));
                            }
                            return;
                        }

                        // XỬ LÝ NỘI DUNG (TEXT) TỪ GEMINI
                        const sc = parsed.serverContent;
                        if (sc) {
                            // Bóc tách text từ Transcription
                            if (sc.outputTranscription?.text) {
                                safeEnqueue(`data: ${JSON.stringify({ type: 'token', text: sc.outputTranscription.text })}\n\n`);
                            }

                            if (sc.turnComplete) {
                                console.log("[Chatbot API] Hoàn thành lượt chat");
                                safeEnqueue(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
                                safeClose();
                                ws.close();
                            }
                        }
                    } catch (e) { console.error("[Chatbot API] Parse error:", e); }
                });

                ws.on('close', () => {
                    console.log("[Chatbot API] WS Closed");
                    safeClose();
                });
                ws.on('error', (e) => {
                    console.error("[Chatbot API] WS error:", e.message);
                    safeEnqueue(`data: ${JSON.stringify({ type: 'error', error: e.message })}\n\n`);
                    safeClose();
                });
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}