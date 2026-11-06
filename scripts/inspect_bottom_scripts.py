import re

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find scripts at bottom of html
scripts = re.findall(r'<script[^>]*>.*?</script>', html, re.DOTALL | re.IGNORECASE)
print(f"Total script tags: {len(scripts)}")
for idx, s in enumerate(scripts):
    if len(s) > 300:
        print(f"\n--- Script {idx+1} (length {len(s)}) ---")
        print(s[:300] + " ... " + s[-200:])
    else:
        print(f"\n--- Script {idx+1} ---")
        print(s)
