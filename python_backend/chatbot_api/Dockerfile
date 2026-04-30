FROM python:3.10-slim

# Ngăn Python tạo file .pyc và bật log real-time
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/src

WORKDIR /app

# Cài đặt các công cụ hệ thống cần thiết (nếu có)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements và cài đặt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Tạo thư mục chứa dữ liệu và phân quyền
RUN mkdir -p /app/chroma_db /app/corpus

# Copy toàn bộ code vào container
COPY src/ ./src/

# Mở cổng 8000
EXPOSE 8000

# Lệnh khởi chạy
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]