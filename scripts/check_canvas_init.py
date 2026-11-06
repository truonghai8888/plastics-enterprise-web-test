with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'getContext\(["\']webgl2["\']\)|getContext\(["\']2d["\']\)', js)]
print("getContext matches:", len(matches))
for idx in matches:
    print(js[max(0, idx-100):min(len(js), idx+200)])
    print('='*50)
