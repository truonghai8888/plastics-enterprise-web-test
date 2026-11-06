with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.finditer(r'([^\n]*html\.v3-mau[^\n]*)', text)
for m in matches:
    print(m.group(0)[:120])
