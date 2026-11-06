with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.finditer(r'([^\n]*data-tang[^\n]*)', text)
for m in matches:
    print(m.group(0)[:120])
