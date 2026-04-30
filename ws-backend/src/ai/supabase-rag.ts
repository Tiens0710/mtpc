import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

export class SupabaseRAG {
  private supabase: SupabaseClient;
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async search(query: string, topK: number = 3) {
    const vectorResults = await this.vectorSearch(query, topK);
    return this.buildContext(vectorResults);
  }

  private async vectorSearch(query: string, limit: number) {
    try {
      const model = this.genAI.getGenerativeModel({ model: "models/gemini-embedding-001" });
      const embeddingResponse = await model.embedContent(query);
      const embedding = embeddingResponse.embedding.values;

      const { data, error } = await this.supabase.rpc('match_mtpc_documents', {
        query_embedding: embedding,
        match_threshold: 0.5,
        match_count: limit,
      });

      if (error) {
        console.error('Supabase Vector Search Error:', error);
        return [];
      }

      return data.map((d: any) => ({
        id: d.id?.toString() || '',
        content: d.content,
        metadata: d.metadata,
        score: d.similarity
      }));
    } catch (e) {
      console.error('Embedding error:', e);
      return [];
    }
  }

  private buildContext(results: any[]) {
    if (!results || results.length === 0) return "Không tìm thấy thông tin phù hợp.";
    return "=== KẾT QUẢ TRA CỨU MTPC ===\n" + results.map((res, i) => 
      `[${i+1}] ${res.content}\n`
    ).join('---\n');
  }
}
