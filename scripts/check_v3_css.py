with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = [m.start() for m in re.finditer(r'\.v3\s*\{', css)]
for pos in matches[:3]:
    print(css[pos : pos + 300])
