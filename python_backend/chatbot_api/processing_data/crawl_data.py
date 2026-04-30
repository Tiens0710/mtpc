from httpx import URL
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from bs4 import BeautifulSoup
from markdownify import markdownify as md
import os
import re
import pandas as pd

def clean_markdown(md_text: str) -> str:
    # 1. Xóa "xem chi tiết" (case insensitive)
    md_text = re.sub(r"\[xem chi tiết\]\(#popupChitietTTHC\)", "", md_text, flags=re.IGNORECASE)
    md_text = re.sub(r"Bao gồm", "", md_text, flags=re.IGNORECASE)

    # 2. Chuẩn hóa heading về H2
    headings = [
        "Cơ quan thực hiện",
        "Yêu cầu, điều kiện"
    ]

    for h in headings:
        # match mọi dạng: bold, thường, có dấu *,...
        pattern = rf"(\*\*)?\s*{re.escape(h)}\s*(\*\*)?"
        md_text = re.sub(pattern, f"\n\n## {h}\n\n", md_text, flags=re.IGNORECASE)

    # 3. Cleanup dòng trống dư thừa
    md_text = "\n\n".join(
        line.strip() for line in md_text.splitlines() if line.strip()
    )

    return md_text

def read_excel(file_path: str):
    df = pd.read_excel(file_path)
    links = df["Link"].dropna().tolist()
    return links

def crawl_links(links: list):
    options = Options()
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)
    for i, link in enumerate(links):
        try:
            driver.get(link)

            # wait cho JS render xong
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".col-sm-9.col-xs-12"))
            )

            html = driver.page_source

            soup = BeautifulSoup(html, "html.parser")

            container = soup.select_one(".col-sm-9.col-xs-12")

            if not container:
                raise ValueError("Không tìm thấy container")

            # lấy toàn bộ HTML bên trong
            raw_html = container.decode_contents()

            # convert sang markdown
            markdown = md(raw_html, heading_style="ATX")
            markdown = clean_markdown(markdown)

            # lưu file
            file_name = f"TTHC_{i+1:04d}.md"
            with open(os.path.join(folder_output, file_name), "w", encoding="utf-8") as f:
                f.write(markdown)

            print(f"[{i+1}/{len(links)}] Đã lưu markdown vào: {os.path.join(folder_output, file_name)}")

        except Exception as e:
            print(f"[{i+1}/{len(links)}] Lỗi khi xử lý link {link}: {e}")

    driver.quit()

if __name__ == "__main__":
    data_path = r"C:\Chatbot\data\Data TTHC CT.xlsx"
    folder_output = "data/md_content"

    os.makedirs(folder_output, exist_ok=True)
    links = read_excel(data_path)
    
    print(f"Tổng số link cần crawl: {len(links)}")
    print("Bắt đầu crawl...")
    crawl_links(links)
