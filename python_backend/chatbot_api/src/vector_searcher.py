import os
import chromadb
from chromadb.config import Settings
from google import genai
from google.genai import types
from typing import List, Dict, Any, Optional
import json
from dotenv import load_dotenv

class VectorSearch:
    """
    Class để tìm kiếm vector sử dụng ChromaDB và Gemini Embedding
    """
    
    def __init__(self, 
                 collection_name: str = "tthc",
                 persist_directory: str = "./chroma_db",
                 api_key: Optional[str] = None):
        """
        Khởi tạo VectorSearch
        
        Args:
            collection_name: Tên collection trong ChromaDB
            persist_directory: Thư mục lưu trữ ChromaDB
            api_key: API key cho Google Gemini (nếu không cung cấp sẽ lấy từ env)
        """
        # Cấu hình API key
        load_dotenv()  # Tải biến môi trường từ .env nếu có
        self.api_key = os.getenv("GEMINI_API_KEY") or api_key
        if not self.api_key:
            raise ValueError("API key không được cung cấp. Hãy đặt GEMINI_API_KEY trong environment variable.")
        
        # Khởi tạo Gemini client
        self.client_genai = genai.Client(api_key=self.api_key)
        
        # Khởi tạo ChromaDB client
        self.chroma_client = chromadb.PersistentClient(path=persist_directory)
        
        # Lấy hoặc tạo collection
        self.collection = self.chroma_client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}  # Sử dụng cosine similarity
        )
        
        print(f"✓ Đã kết nối tới collection '{collection_name}'")
        print(f"  - Số lượng documents: {self.collection.count()}")
    
    def get_embedding(self, text: str) -> List[float]:
        """
        Tạo embedding cho văn bản sử dụng Gemini Embedding
        
        Args:
            text: Văn bản cần embed
            
        Returns:
            List[float]: Vector embedding 768 chiều
        """
        try:
            response = self.client_genai.models.embed_content(
                model="gemini-embedding-001",
                contents=[text],
                config=types.EmbedContentConfig(
                    task_type="RETRIEVAL_QUERY",
                    output_dimensionality=768,
                ),
            )
            # SỬA LỖI: Truy cập thuộc tính .values để lấy danh sách floats
            return response.embeddings[0].values
        except Exception as e:
            print(f"❌ Lỗi khi tạo embedding: {e}")
            raise e
    
    def search(self, 
               query: str, 
               top_k: int = 5,
               filter_dict: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """
        Tìm kiếm các documents tương tự với query
        
        Args:
            query: Câu truy vấn tìm kiếm
            top_k: Số lượng kết quả trả về
            filter_dict: Bộ lọc metadata (nếu có)
            
        Returns:
            List[Dict]: Danh sách kết quả tìm kiếm
        """
        # Tạo embedding cho query
        query_embedding = self.get_embedding(query)
        
        # Tìm kiếm trong ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            where=filter_dict,
            include=["documents", "metadatas", "distances"]
        )
        
        # Format kết quả
        formatted_results = []
        if results and results['documents']:
            for i in range(len(results['documents'][0])):
                result = {
                    'id': results['ids'][0][i],
                    'document': results['documents'][0][i],
                    'metadata': results['metadatas'][0][i] if results['metadatas'] else {},
                    'distance': results['distances'][0][i] if results['distances'] else None,
                    'similarity': 1 - results['distances'][0][i] if results['distances'] else None  # Chuyển distance thành similarity
                }
                formatted_results.append(result)
        
        return formatted_results
    
    def search_by_id(self, doc_id: str) -> Optional[Dict[str, Any]]:
        """
        Tìm kiếm document theo ID
        
        Args:
            doc_id: ID của document
            
        Returns:
            Dict hoặc None nếu không tìm thấy
        """
        results = self.collection.get(
            ids=[doc_id],
            include=["documents", "metadatas"]
        )
        
        if results and results['documents']:
            return {
                'id': results['ids'][0],
                'document': results['documents'][0],
                'metadata': results['metadatas'][0] if results['metadatas'] else {}
            }
        return None
    
    def get_collection_stats(self) -> Dict[str, Any]:
        """
        Lấy thống kê về collection
        
        Returns:
            Dict: Thống kê collection
        """
        return {
            'name': self.collection.name,
            'count': self.collection.count(),
            'metadata': self.collection.metadata
        }
    
    def print_results(self, results: List[Dict[str, Any]], show_metadata: bool = False):
        """
        In kết quả tìm kiếm ra console
        
        Args:
            results: Danh sách kết quả
            show_metadata: Có hiển thị metadata không
        """
        if not results:
            print("❌ Không tìm thấy kết quả nào!")
            return
        
        print(f"\n{'='*80}")
        print(f"📊 KẾT QUẢ TÌM KIẾM ({len(results)} kết quả)")
        print(f"{'='*80}\n")
        
        for i, result in enumerate(results, 1):
            print(f"🔹 Kết quả #{i} | ID: {result['id']}")
            print(f"   Độ tương đồng: {result['similarity']:.4f} (Distance: {result['distance']:.4f})")
            print(f"   Nội dung: {result['document'][:200]}...")
            
            if show_metadata and result.get('metadata'):
                print(f"   Metadata: ")
                for key, value in result['metadata'].items():
                    print(f"     - {key}: {value}")
            
            print(f"{'-'*80}\n")


def interactive_search():
    """
    Chế độ tìm kiếm tương tác
    """
    print("\n" + "="*80)
    print("🔍 HỆ THỐNG TÌM KIẾM VECTOR - CHROMADB + GEMINI EMBEDDING")
    print("="*80)
    
    # Khởi tạo vector search
    try:
        searcher = VectorSearch(
            collection_name="tthc",
            persist_directory="./chroma_db"
        )
    except ValueError as e:
        print(f"❌ Lỗi: {e}")
        print("💡 Hướng dẫn: Đặt biến môi trường GEMINI_API_KEY")
        print("   export GEMINI_API_KEY='your-api-key'  (Linux/Mac)")
        print("   set GEMINI_API_KEY=your-api-key      (Windows)")
        return
    
    # Hiển thị thống kê
    stats = searcher.get_collection_stats()
    print(f"\n📊 Thông tin collection:")
    print(f"   - Tên: {stats['name']}")
    print(f"   - Số documents: {stats['count']}")
    
    print("\n💡 Gợi ý sử dụng:")
    print("   - Nhập từ khóa để tìm kiếm")
    print("   - Nhập 'stats' để xem thống kê")
    print("   - Nhập 'quit' để thoát")
    print("="*80 + "\n")
    
    while True:
        try:
            query = input("🔎 Nhập truy vấn tìm kiếm: ").strip()
            
            if query.lower() == 'quit':
                print("👋 Cảm ơn đã sử dụng! Tạm biệt.")
                break
            
            if query.lower() == 'stats':
                stats = searcher.get_collection_stats()
                print(f"\n📊 Thống kê collection:")
                print(f"   - Tên: {stats['name']}")
                print(f"   - Số documents: {stats['count']}")
                print(f"   - Metadata: {stats['metadata']}")
                print()
                continue
            
            if not query:
                print("⚠️  Vui lòng nhập từ khóa tìm kiếm!\n")
                continue
            
            # Tìm kiếm
            print("\n⏳ Đang tìm kiếm...")
            results = searcher.search(query, top_k=5)
            
            # In kết quả
            searcher.print_results(results, show_metadata=True)
            
        except KeyboardInterrupt:
            print("\n\n👋 Cảm ơn đã sử dụng! Tạm biệt.")
            break
        except Exception as e:
            print(f"❌ Lỗi: {str(e)}\n")


def search_from_command(query: str, top_k: int = 5):
    """
    Tìm kiếm từ command line (không tương tác)
    
    Args:
        query: Câu truy vấn
        top_k: Số kết quả trả về
        
    Returns:
        List kết quả
    """
    searcher = VectorSearch(
        collection_name="tthc",
        persist_directory="./chroma_db"
    )
    
    results = searcher.search(query, top_k=top_k)
    searcher.print_results(results, show_metadata=True)
    
    return results


if __name__ == '__main__':
    import sys
    
    # Nếu có argument thì chạy search từ command line
    if len(sys.argv) > 1:
        query = ' '.join(sys.argv[1:])
        search_from_command(query, top_k=5)
    else:
        # Chạy chế độ tương tác
        interactive_search()