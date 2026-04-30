/**
 * Singleton instances dùng chung trong WS Server.
 * Tránh khởi tạo lại RAG nhiều lần cho mỗi client.
 */
import { SupabaseRAG } from "@/lib/ai/supabase-rag";

let ragInstance: SupabaseRAG | null = null;

/**
 * Lấy singleton instance của SupabaseRAG.
 * Khởi tạo lần đầu khi được gọi.
 */
export async function getRAG(): Promise<SupabaseRAG> {
  if (!ragInstance) {
    ragInstance = new SupabaseRAG();
    console.log("[Chatbot] SupabaseRAG singleton initialized.");
  }
  return ragInstance;
}
