with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'veMoc', js)]
print("veMoc in js:", len(matches))
for idx in matches[:5]:
    print(js[max(0, idx-50):min(len(js), idx+300)])
    print('='*50)
