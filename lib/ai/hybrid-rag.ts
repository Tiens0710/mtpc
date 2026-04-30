import { ChromaClient, Collection } from 'chromadb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BM25 } from './bm25';
import fs from 'fs';
import path from 'path';

export interface SearchResult {
  id: string;
  content: string;
  metadata: any;
  score: number;
}

export class HybridRAG {
  private client: ChromaClient;
  private genAI: GoogleGenerativeAI;
  private collectionName: string = "mtpc_knowledge";
  private bm25: BM25 | null = null;
  private corpus: any[] = [];

  constructor() {
    this.client = new ChromaClient({ path: process.env.CHROMA_URL || "http://localhost:8000" });
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  }

  /**
   * Tokenize Vietnamese text (simplified version)
   */
  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[.,!?;:()]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1);
  }

  /**
   * Load datasets and initialize BM25
   */
  async loadDatasets() {
    const dataDir = path.join(process.cwd(), 'data', 'mtpc_knowledge_base');
    const files = [
      path.join(dataDir, 'mtpc_data_structured.json'),
      path.join(dataDir, 'intent_mapping.jsonl')
    ];

    const newCorpus: any[] = [];

    for (const file of files) {
      if (!fs.existsSync(file)) continue;
      
      const content = fs.readFileSync(file, 'utf-8');
      let rawData: any[] = [];
      
      if (file.endsWith('.json')) {
        rawData = JSON.parse(content);
        if (!Array.isArray(rawData)) rawData = [rawData];
      } else {
        rawData = content.split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));
      }

      for (const data of rawData) {
        let textContent = "";
        let meta = {};

        if (data.messages) { // FAQ
          textContent = `Q: ${data.messages[0].content}\nA: ${data.messages[1].content}`;
          meta = { source: 'faq' };
        } else if (data.utterance) { // Intent
          textContent = data.utterance;
          meta = { ...data.entities, intent: data.intent, source: 'intent_mapping' };
        } else if (data.content && data.title) { // MTPC Structured
          textContent = data.content;
          meta = {
            source: 'structured_json',
            title: data.title,
            category: data.category || '',
            url: data.url || ''
          };
        }

        newCorpus.push({
          id: data.id || `gen_${newCorpus.length}`,
          content: textContent,
          metadata: meta
        });
      }
    }

    this.corpus = newCorpus;
    const tokenized = this.corpus.map(c => this.tokenize(c.content));
    this.bm25 = new BM25(tokenized);
    console.log(`[✓] Loaded ${this.corpus.length} documents into BM25.`);
  }

  /**
   * Hybrid RAG Search
   */
  async search(query: string, topK: number = 3) {
    if (!this.bm25) await this.loadDatasets();

    // 1. Vector Search
    const vectorResults = await this.vectorSearch(query, 10);
    
    // 2. BM25 Search
    const bm25Results = this.bm25Search(query, 10);
    
    // 3. RRF Reranking
    const ranked = this.rerank(vectorResults, bm25Results, topK);
    
    return this.buildContext(ranked);
  }

  private async vectorSearch(query: string, limit: number): Promise<SearchResult[]> {
    try {
      const collection = await this.client.getCollection({ name: this.collectionName });
      const model = this.genAI.getGenerativeModel({ model: "embedding-001" });
      const embedding = await model.embedContent(query);
      
      const results = await collection.query({
        queryEmbeddings: [embedding.embedding.values],
        nResults: limit
      });

      return results.ids[0].map((id, i) => ({
        id,
        content: results.documents[0][i] || "",
        metadata: results.metadatas[0][i],
        score: 1 - (results.distances?.[0][i] || 0)
      }));
    } catch (e) {
      console.error("Vector search error:", e);
      return [];
    }
  }

  private bm25Search(query: string, limit: number): SearchResult[] {
    if (!this.bm25) return [];
    const tokens = this.tokenize(query);
    const scores = this.bm25.getScores(tokens);
    
    return this.corpus
      .map((doc, i) => ({ ...doc, score: scores[i] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private rerank(vec: SearchResult[], bm25: SearchResult[], topK: number): SearchResult[] {
    const k = 60;
    const scores: Map<string, number> = new Map();
    const docMap: Map<string, SearchResult> = new Map();

    vec.forEach((doc, i) => {
      scores.set(doc.id, (scores.get(doc.id) || 0) + 1 / (k + i + 1));
      docMap.set(doc.id, doc);
    });

    bm25.forEach((doc, i) => {
      scores.set(doc.id, (scores.get(doc.id) || 0) + 1 / (k + i + 1));
      if (!docMap.has(doc.id)) docMap.set(doc.id, doc);
    });

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topK)
      .map(([id, score]) => ({ ...docMap.get(id)!, score }));
  }

  private buildContext(results: SearchResult[]): string {
    if (results.length === 0) return "Không tìm thấy thông tin phù hợp.";
    
    let context = "=== KẾT QUẢ TRA CỨU MTPC ===\n";
    results.forEach((res, i) => {
      context += `[${i+1}] Nguồn: ${res.metadata.source}\n`;
      context += `Nội dung: ${res.content}\n`;
      context += "-".repeat(20) + "\n";
    });
    return context;
  }
}
