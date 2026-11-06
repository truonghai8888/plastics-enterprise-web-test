with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

v3_idx = text.find('<div class="v3">')
ft_idx = text.find('<footer class="ft"')
chunk = text[v3_idx:ft_idx]

import re
scripts = re.findall(r'<script\b[^>]*>(.*?)</script>', chunk, re.DOTALL)
print(f"Number of scripts in chunk: {len(scripts)}")
for i, s in enumerate(scripts):
    print(f"Script {i}: length {len(s)}, preview: {s[:100].strip()}")
