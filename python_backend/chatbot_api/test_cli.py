import requests
import json
import time
import sys

def typing_print(text, delay=0.01):
    """In ký tự từng bước để tạo hiệu ứng gõ chữ."""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)

def chat():
    url = "http://localhost:8000/api/chat/stream"
    
    print("\n" + "="*50)
    print("   MTPC AI - TERMINAL TEST CLIENT")
    print("   Hiệu ứng: Typing Effect Enabled")
    print("="*50 + "\n")
    
    session_id = None  # Lưu session_id xuyên suốt cuộc hội thoại
    
    while True:
        try:
            user_input = input("User: ")
        except EOFError:
            break
            
        if user_input.lower() in ['exit', 'quit', 'thoát']:
            break
        if not user_input.strip():
            continue
        
        # Luôn gửi kèm session_id nếu đã có
        payload = {
            "message": user_input,
            "voice": "Algenib",
            "session_id": session_id,  # None ở lần đầu → server tạo mới
        }
        print("MTPC AI: ", end="", flush=True)
        
        try:
            with requests.post(url, json=payload, stream=True, timeout=60) as response:
                if response.status_code != 200:
                    print(f"\n[Lỗi Server]: {response.status_code}")
                    continue
                    
                for line in response.iter_lines():
                    if line:
                        line_text = line.decode('utf-8')
                        if line_text.startswith("data: "):
                            try:
                                data = json.loads(line_text[6:])
                                if data.get("type") == "token":
                                    token = data.get("text", "")
                                    typing_print(token, delay=0.015)
                                elif data.get("type") == "done":
                                    # Lưu session_id từ response để dùng cho lần sau
                                    if data.get("session_id"):
                                        session_id = data["session_id"]
                                    print("")
                                elif data.get("type") == "error":
                                    print(f"\n[Lỗi AI]: {data.get('error')}")
                            except json.JSONDecodeError:
                                continue
        except Exception as e:
            print(f"\n[Lỗi kết nối]: {e}")

if __name__ == "__main__":
    chat()