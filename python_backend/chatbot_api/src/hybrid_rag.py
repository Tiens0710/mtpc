"""
hybrid_rag.py
=============
Hybrid RAG kết hợp BM25 + Vector Search (ChromaDB + Gemini Embedding)
với Reciprocal Rank Fusion (RRF) reranking.
Tối ưu hóa cho bộ dữ liệu Duky AI.
"""

from __future__ import annotations
import os
import json
import pickle
import re
import unicodedata
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any, Union
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor

# ── Google GenAI ──────────────────────────────────────────────────────────────
from google import genai
from google.genai import types as genai_types

# ── ChromaDB ──────────────────────────────────────────────────────────────────
import chromadb
from rank_bm25 import BM25Okapi

# ─────────────────────────────────────────────────────────────────────────────
# Cấu hình mặc định
# ─────────────────────────────────────────────────────────────────────────────
DEFAULT_CHROMA_PATH     = "./chroma_db"
DEFAULT_COLLECTION_NAME = "mtpc_knowledge"
DEFAULT_EMBED_MODEL     = "gemini-embedding-001"
RRF_K = 60

@dataclass
class SearchResult:
    """Kết quả tìm kiếm chuẩn hóa từ BM25 hoặc Vector."""
    id: str
    content: str
    metadata: Dict[str, Any]
    score: float
    source: str  # "bm25" | "vector"

@dataclass
class RankedResult:
    """Kết quả sau khi rerank bằng RRF."""
    id: str
    content: str
    metadata: Dict[str, Any]
    rrf_score: float
    sources: List[str]

# ── Text Helpers ──────────────────────────────────────────────────────────────
def _normalize_text(text: str) -> str:
    if not text: return ""
    text = unicodedata.normalize("NFC", text).lower()
    nfd  = unicodedata.normalize("NFD", text)
    no_accent = "".join(c for c in nfd if unicodedata.category(c) != "Mn")
    cleaned = re.sub(r"[^a-z0-9\s]", " ", no_accent)
    return re.sub(r"\s+", " ", cleaned).strip()

def _tokenize(text: str) -> List[str]:
    return _normalize_text(text).split()

class HybridRAG:
    def __init__(
        self,
        gemini_api_key: Optional[str] = None,
        chroma_path: str = DEFAULT_CHROMA_PATH,
        collection_name: str = DEFAULT_COLLECTION_NAME,
        embed_model: str = DEFAULT_EMBED_MODEL,
    ):
        load_dotenv()
        self.api_key = gemini_api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY is required")
            
        self._genai_client = genai.Client(api_key=self.api_key)
        self._embed_model = embed_model
        
        # ChromaDB
        self._chroma = chromadb.PersistentClient(path=chroma_path)
        self._collection = self._chroma.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}
        )
        
        # BM25 & Corpus
        self.corpus: List[Dict[str, Any]] = []
        self.bm25: Optional[BM25Okapi] = None
        self._id_index: Dict[str, Dict[str, Any]] = {}

    def load_datasets(self, file_paths: List[str]):
        """Nạp dữ liệu từ các file .jsonl và cập nhật BM25 index."""
        print(f"[→] Loading datasets: {file_paths}")
        new_corpus = []
        for path in file_paths:
            if not os.path.exists(path):
                print(f"  ⚠️ Warning: File not found {path}")
                continue
            if path.endswith('.json'):
                # Handle JSON array (e.g. mtpc_data_structured.json)
                with open(path, 'r', encoding='utf-8') as f_json:
                    raw_data = json.load(f_json)
                    if not isinstance(raw_data, list): raw_data = [raw_data]
            else:
                # Handle JSONL (line by line)
                raw_data = []
                with open(path, 'r', encoding='utf-8') as f_line:
                    for line in f_line:
                        if line.strip(): raw_data.append(json.loads(line))

            for data in raw_data:
                doc_id = data.get("id") or data.get("ma_thu_tuc") or f"gen_{len(new_corpus)}"
                
                if "messages" in data: # FAQ
                    content = f"Q: {data['messages'][0]['content']}\nA: {data['messages'][1]['content']}"
                    meta = {"source": "faq"}
                elif "utterance" in data: # Intent
                    content = data["utterance"]
                    meta = data.get("entities", {})
                    meta["intent"] = data.get("intent")
                    meta["source"] = "intent_mapping"
                elif "content" in data and "title" in data: # MTPC Structured JSON
                    content = data["content"]
                    meta = {
                        "source": "structured_json",
                        "title": data.get("title", ""),
                        "category": data.get("category", ""),
                        "url": data.get("url", ""),
                        "major_id": data.get("major_id") or "",
                        "last_updated": data.get("last_updated", "")
                    }
                    if data.get("target_audience"):
                        meta["target_audience"] = ", ".join(data.get("target_audience"))
                else: # RAG Chunks
                    content = data.get("content", "")
                    meta = data.get("metadata", {})
                    meta["source"] = "rag_chunks"
                
                chunk = {
                    "id": str(doc_id),
                    "content": content,
                    "metadata": meta
                }
                new_corpus.append(chunk)
                self._id_index[str(doc_id)] = chunk


        
        self.corpus = new_corpus
        if self.corpus:
            tokenized_corpus = [_tokenize(c["content"]) for c in self.corpus]
            self.bm25 = BM25Okapi(tokenized_corpus)
            print(f"[✓] Loaded {len(self.corpus)} chunks into BM25 index.")

    def _embed_query(self, query: str) -> List[float]:
        response = self._genai_client.models.embed_content(
            model=self._embed_model,
            contents=query,
            config=genai_types.EmbedContentConfig(
                task_type="RETRIEVAL_QUERY", output_dimensionality=768
            ),
        )
        return response.embeddings[0].values

    def bm25_search(self, query: str, top_k: int = 10) -> List[SearchResult]:
        if not self.bm25: return []
        tokens = _tokenize(query)
        scores = self.bm25.get_scores(tokens)
        indexed = sorted(enumerate(scores), key=lambda x: x[1], reverse=True)
        
        results = []
        for idx, score in indexed:
            if score <= 0 or len(results) >= top_k: break
            chunk = self.corpus[idx]
            results.append(SearchResult(
                id=chunk["id"],
                content=chunk["content"],
                metadata=chunk["metadata"],
                score=float(score),
                source="bm25"
            ))
        return results

    def vector_search(self, query: str, top_k: int = 10) -> List[SearchResult]:
        query_vec = self._embed_query(query)
        res = self._collection.query(
            query_embeddings=[query_vec],
            n_results=top_k,
            include=["documents", "metadatas", "distances"]
        )
        
        results = []
        if not res["ids"]: return []
        
        for i in range(len(res["ids"][0])):
            doc_id = res["ids"][0][i]
            doc_text = res["documents"][0][i]
            meta = res["metadatas"][0][i]
            dist = res["distances"][0][i]
            
            # similarity = 1 / (1 + distance)
            results.append(SearchResult(
                id=str(doc_id),
                content=doc_text,
                metadata=meta,
                score=1.0 / (1.0 + dist),
                source="vector"
            ))
        return results

    def rerank(self, bm25_res: List[SearchResult], vector_res: List[SearchResult], top_k: int = 5) -> List[RankedResult]:
        rrf_scores: Dict[str, float] = {}
        meta_map: Dict[str, Dict] = {}
        content_map: Dict[str, str] = {}
        source_map: Dict[str, List[str]] = {}

        for rank, res in enumerate(bm25_res, 1):
            rid = res.id
            rrf_scores[rid] = rrf_scores.get(rid, 0.0) + 1.0 / (RRF_K + rank)
            meta_map[rid] = res.metadata
            content_map[rid] = res.content
            source_map.setdefault(rid, []).append("bm25")

        for rank, res in enumerate(vector_res, 1):
            rid = res.id
            rrf_scores[rid] = rrf_scores.get(rid, 0.0) + 1.0 / (RRF_K + rank)
            if rid not in meta_map:
                meta_map[rid] = res.metadata
                content_map[rid] = res.content
            source_map.setdefault(rid, []).append("vector")

        sorted_ids = sorted(rrf_scores, key=lambda x: rrf_scores[x], reverse=True)
        
        final_results = []
        for rid in sorted_ids[:top_k]:
            final_results.append(RankedResult(
                id=rid,
                content=content_map[rid],
                metadata=meta_map[rid],
                rrf_score=rrf_scores[rid],
                sources=source_map[rid]
            ))
        return final_results

    def hybrid_rag(self, query: str, top_k: int = 5) -> str:
        with ThreadPoolExecutor(max_workers=2) as executor:
            f_bm25 = executor.submit(self.bm25_search, query, top_k=10)
            f_vec = executor.submit(self.vector_search, query, top_k=10)
            
            bm25_res = f_bm25.result()
            vec_res = f_vec.result()

        ranked = self.rerank(bm25_res, vec_res, top_k=top_k)
        return self._build_context(ranked)

    def _build_context(self, ranked: List[RankedResult]) -> str:
        if not ranked: return "Không tìm thấy thông tin phù hợp."
        
        parts = ["=== KẾT QUẢ TRA CỨU MTPC ==="]

        for i, res in enumerate(ranked, 1):
            src = "+".join(res.sources)
            tool = res.metadata.get("tool", "General")
            parts.append(f"[{i}] Nguồn: {src} | Tool: {tool}")
            parts.append(f"Nội dung: {res.content}")
            parts.append("-" * 30)
        return "\n".join(parts)

if __name__ == "__main__":
    # Test
    rag = HybridRAG()
    rag.load_datasets(["src/top20_faq.jsonl", "src/rag_chunks_v2.jsonl"])
    print(rag.hybrid_rag("Cách dùng Swap Style?"))