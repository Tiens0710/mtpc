import { SupabaseRAG } from './ai/supabase-rag';

const ragInstance = new SupabaseRAG();

export async function getToolsConfig() {
  return [
    {
      functionDeclarations: [
        {
          name: "search_mtpc_knowledge",
          description:
            "Tìm kiếm thông tin trong cơ sở dữ liệu kiến thức của Trường Trung cấp Miền Tây (MTPC). " +
            "Gọi tool này khi người dùng hỏi về: ngành học, học phí, tuyển sinh, điều kiện nhập học, " +
            "chương trình đào tạo, thời gian học, cơ sở vật chất, học bổng, hoặc bất kỳ thông tin nào về trường MTPC.",
          parameters: {
            type: "OBJECT",
            properties: {
              query: {
                type: "STRING",
                description: "Từ khóa hoặc câu hỏi cần tìm kiếm bằng tiếng Việt.",
              },
            },
            required: ["query"],
          },
        },
        {
          name: "navigate_to_page",
          description:
            "Chuyển hướng người dùng đến một trang cụ thể trên website của trường MTPC. " +
            "Chỉ gọi tool này KHI người dùng đã đồng ý hoặc yêu cầu chuyển hướng.",
          parameters: {
            type: "OBJECT",
            properties: {
              url: {
                type: "STRING",
                description: "Đường dẫn URL đầy đủ của trang cần chuyển đến (ví dụ: /tuyen-sinh, /nganh-hoc).",
              },
              reason: {
                type: "STRING",
                description: "Lý do chuyển hướng, giải thích ngắn gọn cho người dùng.",
              },
            },
            required: ["url"],
          },
        },
      ],
    },
  ];
}

export function getToolMapping(): Record<string, (args: Record<string, any>) => Promise<string>> {
  return {
    search_mtpc_knowledge: async (args) => {
      const { query } = args;
      if (!query || typeof query !== "string" || !query.trim()) {
        return "Lỗi: Không có từ khóa tìm kiếm.";
      }
      try {
        const result = await ragInstance.search(query.trim());
        return result || "Không tìm thấy thông tin phù hợp trong cơ sở dữ liệu MTPC.";
      } catch (e: any) {
        console.error("[Tools] search_mtpc_knowledge error:", e.message);
        return "Lỗi khi tìm kiếm thông tin. Vui lòng liên hệ hotline 0934 790 790.";
      }
    },

    navigate_to_page: async (args) => {
      const { url, reason } = args;
      if (!url) return "Lỗi: Không có URL để chuyển hướng.";
      return JSON.stringify({ action: "navigate", url, reason: reason ?? "" });
    },
  };
}
