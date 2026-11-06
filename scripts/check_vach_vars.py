with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = set(re.findall(r'\b(?:window\.)?(VACH_[A-Z0-9_]+)\b', js))
print("VACH variables in vach.js:", matches)

# Check which ones are defined in vach-data.js
with open('public/assets/js/vach-data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

missing = []
for v in matches:
    if v not in data_js and f'window.{v}' not in js and f'const {v}' not in js and f'var {v}' not in js and f'let {v}' not in js:
        missing.append(v)

print("Potentially missing VACH variables:", missing)
