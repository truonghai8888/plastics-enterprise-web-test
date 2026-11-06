with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'goiy', js)]
print(f"goiy in vach.js: {len(matches)} matches")
for idx in matches:
    print(js[max(0, idx-50):min(len(js), idx+200)])
    print('='*40)
