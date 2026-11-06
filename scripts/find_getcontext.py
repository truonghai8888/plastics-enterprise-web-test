with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'getContext\(', js)]
print("getContext lookups in vach.js:", len(matches))
for pos in matches[:5]:
    print(js[max(0, pos - 80):min(len(js), pos + 80)])
