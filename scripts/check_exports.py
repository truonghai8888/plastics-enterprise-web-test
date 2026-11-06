import re

with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

for m in re.finditer(r'if\s*\(\s*typeof\s+module\s*!==\s*["\']undefined["\']\s*\)\s*module\.exports\s*=\s*([^;]+);', text):
    print(m.group(0))
