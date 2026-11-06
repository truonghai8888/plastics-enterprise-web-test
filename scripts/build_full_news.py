import os
import re
import json
import urllib.request
import time

def main():
    with open('scraped_data/nhuaamc/all_news_posts.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    print(f"Loaded {len(posts)} posts.")

    # Load existing articles from src/data/news.js or scraped_data to retain already scraped full contents
    existing_content = {}
    if os.path.exists('scraped_data/nhuaamc/full_50_news.json'):
        try:
            with open('scraped_data/nhuaamc/full_50_news.json', 'r', encoding='utf-8') as f:
                cached = json.load(f)
                for item in cached:
                    if item.get('content') and len(item['content']) > 200:
                        existing_content[item['id']] = item['content']
        except Exception:
            pass

    # Category mappings based on keywords
    def detect_category(title, summary):
        text = (title + " " + summary).lower()
        if any(k in text for k in ['thi công', 'hướng dẫn', 'kỹ thuật', 'lắp đặt', 'soi rãnh']):
            return 'thi-cong', 'Kỹ thuật thi công'
        if any(k in text for k in ['báo giá', 'chi phí', 'giá bao nhiêu', 'bảo hành', 'chính sách']):
            return 'chinh-sach', 'Chính sách & Báo giá'
        if any(k in text for k in ['phòng khách', 'nội thất', 'phòng ngủ', 'không gian', 'spa', 'xu hướng', 'hiện đại', 'phong cách']):
            return 'noi-that', 'Xu hướng nội thất'
        return 'vat-lieu', 'Cẩm nang vật liệu'

    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'}

    for idx, p in enumerate(posts):
        pid = p['id']
        p['category'], p['categoryName'] = detect_category(p['title'], p['summary'])
        p['readTime'] = '5 phút đọc'
        p['author'] = 'Ban Kỹ Thuật Nhựa AMC'

        if pid in existing_content:
            p['content'] = existing_content[pid]
            continue

        url = p.get('url')
        if not url:
            continue

        print(f"[{idx+1}/{len(posts)}] Fetching content for: {p['title'][:40]}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=12) as resp:
                html = resp.read().decode('utf-8', errors='replace')

            # Extract entry-content
            m = re.search(r'<div class="entry-content[^"]*"[^>]*>(.*?)</div>\s*<!-- \.entry-content', html, re.DOTALL)
            if not m:
                m = re.search(r'<div class="entry-content[^"]*"[^>]*>(.*?)</div>\s*<!-- \.entry-content-wrapper', html, re.DOTALL)
            if not m:
                m = re.search(r'<div class="entry-content[^"]*"[^>]*>(.*?)(?:<footer|<div class="blog-share)', html, re.DOTALL)

            if m:
                body = m.group(1).strip()
                # Clean up local image urls if found in /images/nhuaamc/
                def replace_img(match):
                    img_src = match.group(1)
                    basename = os.path.basename(img_src.split('?')[0])
                    # If file exists in public/images/nhuaamc
                    local_path = os.path.join('public', 'images', 'nhuaamc', basename)
                    if os.path.exists(local_path):
                        return f'src="/images/nhuaamc/{basename}"'
                    return f'src="{img_src}"'

                body = re.sub(r'src="([^"]+)"', replace_img, body)
                p['content'] = body
                print(f"   -> Extracted content length: {len(body)}")
            else:
                p['content'] = f"<p class='lead'>{p['summary']}</p><p>Nội dung chi tiết đang được cập nhật từ hệ thống kỹ thuật Nhựa AMC.</p>"
                print("   -> Fallback content used")
        except Exception as e:
            print(f"   -> Error fetching {url}: {e}")
            p['content'] = f"<p class='lead'>{p['summary']}</p><p>Bài viết cẩm nang kỹ thuật và giải pháp vật liệu từ Nhà máy sản xuất Nhựa AMC.</p>"

        # Small sleep
        time.sleep(0.3)

    # Save to scraped_data/nhuaamc/full_50_news.json
    with open('scraped_data/nhuaamc/full_50_news.json', 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print("Saved scraped_data/nhuaamc/full_50_news.json successfully!")

if __name__ == '__main__':
    main()
