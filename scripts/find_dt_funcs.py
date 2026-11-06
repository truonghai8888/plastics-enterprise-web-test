with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('/* ==== dt.js ==== */')
dt_code = text[idx:idx+40000]

import re
funcs = re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', dt_code)
print("Functions in dt.js:", funcs[:25])
