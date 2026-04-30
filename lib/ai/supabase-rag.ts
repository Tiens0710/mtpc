import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BM25 } from './bm25';
import fs from 'fs';
import path from 'path';

export class SupabaseRAG {
  private supabase;
  private genAI: GoogleGenerativeAI;
  private bm25: BM25 | null = null;
  private corpus: any[] = [];

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    this.genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().replace(/[.,!?;:()]/g, ' ').split(/\s+/).filter(t => t.length > 1);
  }

  /**
   * Tìm kiếm lai (Hybrid Search) trên Supabase
   */
  async search(query: string, topK: number = 3) {
    // 1. Vector Search via Supabase
    const vectorResults = await this.vectorSearch(query, 10);
    
    // 2. Keyword Search via BM25 (Local fallback/Hybrid)
    const bm25Results = await this.bm25Search(query, 10);
    
    // 3. RRF Reranking
    const ranked = this.rerank(vectorResults, bm25Results, topK);
    
    return this.buildContext(ranked);
  }

  private async vectorSearch(query: string, limit: number) {
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
      id: d.id.toString(),
      content: d.content,
      metadata: d.metadata,
      score: d.similarity
    }));
  }

  private async bm25Search(query: string, limit: number) {
    if (!this.bm25) await this.initializeBM25();
    const tokens = this.tokenize(query);
    const scores = this.bm25!.getScores(tokens);
    
    return this.corpus
      .map((doc, i) => ({ ...doc, score: scores[i] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private async initializeBM25() {
    // Trong môi trường Serverless, chúng ta có thể nạp từ file JSON cục bộ
    const dataPath = path.join(process.cwd(), 'data/mtpc_knowledge_base/mtpc_data_structured.json');
    if (fs.existsSync(dataPath)) {
      const raw = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      this.corpus = raw.map((d: any) => ({
        id: d.id || d.major_id,
        content: d.content,
        metadata: { source: 'structured_json', ...d }
      }));
      this.bm25 = new BM25(this.corpus.map(c => this.tokenize(c.content)));
    }
  }

  private rerank(vec: any[], bm25: any[], topK: number) {
    const k = 60;
    const scores = new Map<string, number>();
    const docMap = new Map<string, any>();

    [...vec, ...bm25].forEach((doc, i) => {
      const currentScore = scores.get(doc.id) || 0;
      scores.set(doc.id, currentScore + 1 / (k + i + 1));
      docMap.set(doc.id, doc);
    });

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topK)
      .map(([id]) => docMap.get(id));
  }

  private buildContext(results: any[]) {
    if (!results || results.length === 0) return "Không tìm thấy thông tin phù hợp.";
    return "=== KẾT QUẢ TRA CỨU MTPC ===\n" + results.map((res, i) => 
      `[${i+1}] ${res.content}\n`
    ).join('---\n');
  }
}
