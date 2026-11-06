with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'if\s*\(\s*typeof\s+module\s*!==\s*["\']undefined["\']\s*\)', text)]
for idx in matches:
    print('---')
    print(text[idx-50:idx+120])

