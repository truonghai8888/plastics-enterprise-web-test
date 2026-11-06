with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = [m.start() for m in re.finditer(r'v3-mau', css)]
print(f"v3-mau in css: {len(matches)} matches")
for idx in matches:
    print(css[idx:idx+400])
    print('='*40)
