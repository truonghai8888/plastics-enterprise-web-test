with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'mBaoGia', js)]
print("mBaoGia occurrences in vach.js:", len(matches))
for pos in matches[:3]:
    print(js[max(0, pos - 100):min(len(js), pos + 200)])
