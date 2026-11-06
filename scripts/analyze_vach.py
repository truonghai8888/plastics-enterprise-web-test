import re
from html.parser import HTMLParser

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract title
m_title = re.search(r'<title>(.*?)</title>', html, re.DOTALL | re.IGNORECASE)
print("Title:", m_title.group(1).strip() if m_title else "No title")

# Headings
print("\n--- Headings ---")
for m in re.finditer(r'<(h[1-3])[^>]*>(.*?)</\1>', html, re.DOTALL | re.IGNORECASE):
    clean = re.sub(r'<[^>]+>', '', m.group(2)).strip()
    print(f"{m.group(1)}: {clean[:100]}")

# Script src
print("\n--- Scripts ---")
for m in re.finditer(r'<script[^>]+src=["\']([^"\']+)["\']', html, re.IGNORECASE):
    src = m.group(1)
    if any(k in src.lower() for k in ['vach', 'design', 'custom', 'three', 'tool', 'visual', 'app', 'js']):
        print("Script:", src)

# Check for canvas or iframe
print("\n--- Canvas / Iframes ---")
for m in re.finditer(r'<(canvas|iframe)[^>]*>', html, re.IGNORECASE):
    print(m.group(0))

# Search for interactive sections or forms or data attributes
print("\n--- Interactive Elements / Data ---")
for m in re.finditer(r'<div[^>]+id=["\']([^"\']+)["\']', html, re.IGNORECASE):
    i = m.group(1)
    if any(k in i.lower() for k in ['vach', 'wall', 'thiet-ke', 'design', 'calc', 'step', 'preview', 'room']):
        print("ID:", i)

# Check for material / color codes in the html (e.g. EB, mã màu, etc.)
colors = re.findall(r'EB\d{5}', html)
print(f"\nFound {len(colors)} EB product codes, samples:", colors[:10])
