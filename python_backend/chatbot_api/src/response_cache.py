# response_cache.py
import redis
import json
import hashlib
import os
from typing import Optional, Tuple, List, Dict
from dotenv import load_dotenv

load_dotenv()

class ResponseCache:
    def __init__(self):
        """Khởi tạo kết nối Redis."""
        self.client = None
        self.enabled = False
        self.ttl = int(os.getenv("CACHE_TTL", 86400))  # Mặc định 1 ngày (seconds)
        
        try:
            host = os.getenv("REDIS_HOST", "localhost")
            port = int(os.getenv("REDIS_PORT", 6379))
            db = int(os.getenv("REDIS_DB", 0))
            password = os.getenv("REDIS_PASSWORD", None)

            self.client = redis.Redis(
                host=host,
                port=port,
                db=db,
                password=password,
                decode_responses=True,
                socket_connect_timeout=5
            )
            # Test connection
            self.client.ping()
            self.enabled = True
            print("✅ Kết nối Redis thành công.")
        except Exception as e:
            print(f"⚠️  Không thể kết nối Redis ({e}). Cache sẽ bị vô hiệu hóa.")
            self.enabled = False

    def _generate_key(self, query: str) -> str:
        """Tạo key duy nhất từ câu hỏi (chuẩn hóa và hash)."""
        # Chuẩn hóa: viết thường, xóa khoảng trắng thừa
        normalized = " ".join(query.lower().strip().split())
        return f"tthc_cache:{hashlib.sha256(normalized.encode('utf-8')).hexdigest()}"

    def get(self, query: str) -> Optional[Tuple[str, List[Dict]]]:
        """
        Lấy câu trả lời từ cache.
        Returns: (answer, hits) hoặc None nếu không có.
        """
        if not self.enabled:
            return None
        
        try:
            key = self._generate_key(query)
            data = self.client.get(key)
            if data:
                parsed = json.loads(data)
                return parsed.get("answer"), parsed.get("hits", [])
        except Exception as e:
            print(f"⚠️  Lỗi khi đọc cache: {e}")
        
        return None

    def set(self, query: str, answer: str, hits: List[Dict]):
        """Lưu câu trả lời vào cache."""
        if not self.enabled:
            return
        
        try:
            key = self._generate_key(query)
            data = {
                "answer": answer,
                "hits": hits
            }
            # Lưu dưới dạng JSON string
            self.client.setex(key, self.ttl, json.dumps(data, ensure_ascii=False))
        except Exception as e:
            print(f"⚠️  Lỗi khi ghi cache: {e}")

    def clear(self):
        """Xóa toàn bộ cache (dùng cho mục đích test hoặc reset)."""
        if not self.enabled:
            return
        try:
            # Xóa các key bắt đầu bằng prefix
            cursor = 0
            while True:
                cursor, keys = self.client.scan(cursor, match="tthc_cache:*", count=100)
                if keys:
                    self.client.delete(*keys)
                if cursor == 0:
                    break
            print("🗑️  Đã xóa toàn bộ cache.")
        except Exception as e:
            print(f"⚠️  Lỗi khi xóa cache: {e}")