import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SupabaseRAG } from '@/lib/ai/supabase-rag';


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const rag = new SupabaseRAG();


export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    // 1. RAG Search
    const context = await rag.search(message);

    // 2. Prepare System Prompt
    const systemPrompt = `Bạn là tư vấn viên tuyển sinh của Trường Trung cấp Miền Tây (MTPC).
Hãy giải đáp thắc mắc của người dùng dựa trên thông tin tra cứu dưới đây:

${context}

Quy tắc:
- Trả lời thân thiện, chuyên nghiệp.
- Nếu không có thông tin, hãy hướng dẫn gọi hotline 0934 790 790.
- Trả lời bằng tiếng Việt.`;

    // 3. Define Tools
    const tools = [
      {
        functionDeclarations: [
          {
            name: "navigate_to_page",
            description: "Chuyển hướng người dùng đến một trang web cụ thể của trường MTPC. Chỉ gọi hàm này KHI người dùng đã đồng ý hoặc yêu cầu chuyển hướng.",
            parameters: {
              type: "OBJECT",
              properties: {
                url: { type: "STRING", description: "Đường dẫn URL đầy đủ" }
              },
              required: ["url"]
            }
          },
          {
            name: "start_admission_registration",
            description: "Gọi khi người dùng yêu cầu đăng ký nhập học hoặc xét tuyển trực tuyến.",
            parameters: {
              type: "OBJECT",
              properties: {
                url: { type: "STRING", description: "Đường link trang đăng ký (mặc định đã có)." }
              }
            }
          }
        ]
      }
    ];

    // 4. Prepare History (Đảm bảo tin nhắn đầu tiên luôn là của 'user')
    let chatHistory = history.map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    // Nếu tin nhắn đầu tiên là của model, hãy xóa nó đi để tránh lỗi Gemini
    if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
      chatHistory.shift();
    }

    // 5. Initialize Gemini Chat (Sử dụng Gemini 2.0 Flash mới nhất)
    const modelName = "gemini-2.0-flash-exp";
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: systemPrompt,
      tools: tools as any
    });

    const chat = model.startChat({
      history: chatHistory,
    });




    // 5. Stream response
    const result = await chat.sendMessageStream(message);
    
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'token', text })}\n\n`));
            }

            // Handle Function Calls
            const calls = chunk.functionCalls();
            if (calls && calls.length > 0) {
              for (const call of calls) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                  type: 'call', 
                  method: call.name, 
                  args: call.args 
                })}\n\n`));
              }
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        } catch (e) {
          console.error("Stream error:", e);
        } finally {
          controller.close();
        }
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
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
