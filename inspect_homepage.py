import sys
import re
sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_data/html/home.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("HTML length:", len(html))

# Extract header / navbar links
nav_links = re.findall(r'<a[^>]*href=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</a>', html, re.DOTALL)
print(f"\n--- NAVBAR / HEADER LINKS (first 30) ---")
for href, text in nav_links[:30]:
    clean_text = re.sub(r'<[^>]+>', '', text).strip()
    if clean_text:
        print(f"[{clean_text}] -> {href}")

# Extract sections / main content
print("\n--- HEADINGS IN HOMEPAGE ---")
headings = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', html, re.DOTALL)
for tag, text in headings:
    clean_text = re.sub(r'<[^>]+>', '', text).strip()
    print(f"{tag.upper()}: {clean_text}")

# Extract image tags
print("\n--- IMAGES IN HOMEPAGE ---")
images = re.findall(r'<img[^>]*src=[\'"]([^\'"]+)[\'"][^>]*(?:alt=[\'"]([^\'"]*)[\'"])?', html)
for src, alt in images[:15]:
    print(f"IMG: {src} (alt='{alt}')")
