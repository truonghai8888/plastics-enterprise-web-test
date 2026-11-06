with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'window\.VACH\s*=', js)]
print("window.VACH assignments:", len(matches))
for idx in matches:
    print(js[idx:idx+400])
    print('='*50)
