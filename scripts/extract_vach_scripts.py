import re

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script\b[^>]*>(.*?)</script>', html, re.DOTALL)
vach_scripts = []
for s in scripts:
    if 'VACH_' in s:
        vach_scripts.append(s.strip())

combined = "\n\n".join(vach_scripts)
with open('src/data/vachGlobals.js', 'w', encoding='utf-8') as f:
    f.write(combined)

print(f"Extracted vach globals: {len(combined)} chars across {len(vach_scripts)} script blocks")
