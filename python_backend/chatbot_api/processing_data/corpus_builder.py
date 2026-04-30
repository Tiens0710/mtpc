"""
corpus_builder.py
=================
Xây dựng chỉ mục BM25 (corpus.json và corpus.pkl) từ các nguồn dữ liệu JSON/JSONL.
"""

import json
import os
import pickle
import re
import unicodedata
from pathlib import Path

# ── Cấu hình đường dẫn ───────────────────────────────────────────────────────
BASE_DIR     = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 
PYTHON_BACKEND = os.path.dirname(BASE_DIR) 
PROJECT_ROOT = os.path.dirname(PYTHON_BACKEND) 

# Các file đầu vào mặc định
DEFAULT_INPUTS = [
    os.path.join(PROJECT_ROOT, "data", "mtpc_knowledge_base", "mtpc_data_structured.json"),
    os.path.join(PROJECT_ROOT, "data", "mtpc_knowledge_base", "intent_mapping.jsonl")
]

OUTPUT_DIR   = os.path.join(BASE_DIR, "storage", "corpus")
OUTPUT_JSON  = os.path.join(OUTPUT_DIR, "corpus.json")
OUTPUT_PKL   = os.path.join(OUTPUT_DIR, "corpus.pkl")

# ── thư viện BM25 ────────────────────────────────────────────────────────────
try:
    from rank_bm25 import BM25Okapi
except ImportError:
    import math
    from collections import Counter
    class BM25Okapi:
        def __init__(self, corpus: list[list[str]], k1: float = 1.5, b: float = 0.75):
            self.k1, self.b = k1, b
            self.corpus_size = len(corpus)
            self.avgdl = sum(len(doc) for doc in corpus) / max(self.corpus_size, 1)
            self.doc_freqs, self.idf, self.doc_len = [], {}, []
            self._build(corpus)
        def _build(self, corpus):
            df = {}
            for doc in corpus:
                freq = Counter(doc)
                self.doc_freqs.append(freq)
                self.doc_len.append(len(doc))
                for word in freq: df[word] = df.get(word, 0) + 1
            for word, freq in df.items():
                self.idf[word] = math.log((self.corpus_size - freq + 0.5) / (freq + 0.5) + 1)
        def get_scores(self, query):
            scores = [0.0] * self.corpus_size
            for q in query:
                idf_q = self.idf.get(q, 0.0)
                for i, (freq, dl) in enumerate(zip(self.doc_freqs, self.doc_len)):
                    tf = freq.get(q, 0)
                    if tf == 0: continue
                    norm = self.k1 * (1 - self.b + self.b * dl / self.avgdl)
                    scores[i] += idf_q * (tf * (self.k1 + 1)) / (tf + norm)
            return scores

# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def normalize_text(text: str) -> str:
    if not text: return ""
    text = unicodedata.normalize("NFC", text).lower()
    nfd = unicodedata.normalize("NFD", text)
    no_accent = "".join(c for c in nfd if unicodedata.category(c) != "Mn")
    cleaned = re.sub(r"[^a-z0-9\s]", " ", no_accent)
    return re.sub(r"\s+", " ", cleaned).strip()

def tokenize(text: str) -> list[str]:
    return normalize_text(text).split()

def build_corpus(file_paths: list[str]) -> list[dict]:
    corpus = []
    unique_paths = list(dict.fromkeys([os.path.abspath(p) for p in file_paths]))
    
    for path in unique_paths:
        if not os.path.exists(path):
            print(f"[!] File không tồn tại: {path}")
            continue
        
        print(f"[→] Đang xử lý: {path}")
        try:
            with open(path, "r", encoding="utf-8-sig") as f:
                if path.endswith('.json'):
                    raw_data = json.load(f)
                    if not isinstance(raw_data, list): raw_data = [raw_data]
                else:
                    raw_data = [json.loads(line) for line in f if line.strip()]

                for data in raw_data:
                    content = data.get("content", "") or (f"Q: {data['messages'][0]['content']}\nA: {data['messages'][1]['content']}" if "messages" in data else "") or data.get("utterance", "")
                    if not content.strip(): continue

                    # MTPC Structured Schema V2
                    if "content" in data and "title" in data:
                        chunk = {
                            "id": data.get("id", data.get("title")),
                            "content": data.get("content", ""),
                            "tool": data.get("category", "General"),
                            "url": data.get("url", ""),
                            "source": "structured_json",
                            "major_id": data.get("major_id", ""),
                            "target_audience": data.get("target_audience", []),
                            "last_updated": data.get("last_updated", "")
                        }
                    # FAQ Schema
                    elif "messages" in data:
                        chunk = {
                            "id": f"faq_{len(corpus)}",
                            "content": content,
                            "tool": "FAQ",
                            "source": "faq"
                        }
                    # Intent Mapping Schema V2
                    elif "utterance" in data:
                        chunk = {
                            "id": data.get("id") or f"intent_{len(corpus)}",
                            "content": data.get("utterance", ""),
                            "tool": "Intent",
                            "source": "intent_mapping",
                            "intent": data.get("intent", ""),
                            "entities": data.get("entities", {})
                        }
                    # Default
                    else:
                        chunk = {
                            "id": data.get("id") or f"gen_{len(corpus)}",
                            "content": data.get("content", ""),
                            "tool": data.get("metadata", {}).get("tool", "General"),
                            "source": "rag_chunks"
                        }
                    corpus.append(chunk)
        except Exception as e:
            print(f"[!] Lỗi khi xử lý {path}: {e}")
    return corpus

def save_corpus(corpus: list[dict], json_path: str, pkl_path: str) -> BM25Okapi:
    os.makedirs(os.path.dirname(json_path), exist_ok=True)
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(corpus, f, ensure_ascii=False, indent=2)
    
    tokenized_corpus = [tokenize(c['content']) for c in corpus]
    bm25 = BM25Okapi(tokenized_corpus)
    
    with open(pkl_path, "wb") as f:
        pickle.dump({"bm25": bm25, "corpus": corpus}, f)
    
    print(f"[✓] Đã lưu {len(corpus)} chunks vào {json_path} và {pkl_path}")
    return bm25

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", nargs="+", default=DEFAULT_INPUTS)
    parser.add_argument("--output-dir", default=OUTPUT_DIR)
    args = parser.parse_args()

    out_json = os.path.join(args.output_dir, "corpus.json")
    out_pkl  = os.path.join(args.output_dir, "corpus.pkl")

    corpus = build_corpus(args.input)
    if corpus:
        save_corpus(corpus, out_json, out_pkl)
    else:
        print("[!] Không có dữ liệu.")