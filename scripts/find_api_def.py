with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'const\s+API\s*=\s*\{', js)]
for pos in matches:
    print(js[pos : pos + 600])
