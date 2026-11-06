with open('public/assets/js/eb.js', 'r', encoding='utf-8') as f:
    eb_js = f.read()

import re
funcs = re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', eb_js)
print("Functions in eb.js:", len(funcs), funcs[:10])

with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    vach_js = f.read()

used_from_eb = []
for fn in funcs:
    if f'{fn}(' in vach_js:
        used_from_eb.append(fn)

print("Functions in vach.js that match eb.js functions:", used_from_eb)
