with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

vo_idx = text.find('/* ==== vo.js ==== */')
dt_idx = text.find('/* ==== dt.js ==== */')
vo_code = text[vo_idx:dt_idx]

import re
# Find all calls to veCot, moMuc, or document query in vo_code
lines = vo_code.splitlines()
for i, l in enumerate(lines):
    if 'veCot()' in l or 'moMuc("1a")' in l or 'v3-on' in l:
        print(f"Line {i}: {l[:100]}")
