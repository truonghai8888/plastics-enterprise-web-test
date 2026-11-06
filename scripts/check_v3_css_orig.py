with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = [m.start() for m in re.finditer(r'\.v3\s*\{', css)]
for idx in matches:
    print(css[idx:idx+500])
    print('='*50)
