import sys
import re
import json
sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_data/html/home.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect sections between <section> or <main>
sections = re.findall(r'<section[^>]*>(.*?)</section>', html, re.DOTALL)
print(f"Found {len(sections)} sections in home.html\n")

for i, sec in enumerate(sections):
    h = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', sec, re.DOTALL)
    imgs = re.findall(r'<img[^>]*src=[\'"]([^\'"]+)[\'"]', sec)
    ps = re.findall(r'<p[^>]*>(.*?)</p>', sec, re.DOTALL)
    print(f"=== SECTION {i+1} ===")
    for tag, t in h:
        print(f"  {tag.upper()}: {re.sub(r'<[^>]+>', '', t).strip()}")
    if imgs:
        print(f"  Images ({len(imgs)}): {imgs[:4]}")
    if ps:
        print(f"  Paragraphs ({len(ps)}):")
        for p in ps[:3]:
            print(f"    - {re.sub(r'<[^>]+>', '', p).strip()[:100]}...")
    print()
