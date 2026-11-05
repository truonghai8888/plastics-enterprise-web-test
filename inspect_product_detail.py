import sys
import re
sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_data/html/san-pham_tam-op-than-tre_van-go_tam-op-van-go-eb66006.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("HTML length:", len(html))

headings = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', html, re.DOTALL)
for tag, text in headings:
    print(f"{tag.upper()}: {re.sub(r'<[^>]+>', '', text).strip()}")

imgs = re.findall(r'<img[^>]*src=[\'"]([^\'"]+)[\'"]', html)
print("\nProduct Images:", imgs[:10])

# Tables / Specs
tables = re.findall(r'<table[^>]*>(.*?)</table>', html, re.DOTALL)
print(f"\nFound {len(tables)} tables")
for t in tables[:2]:
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', t, re.DOTALL)
    for r in rows:
        cols = [re.sub(r'<[^>]+>', '', c).strip() for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)]
        print("  | ".join(cols))
