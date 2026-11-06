with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'taoAnh\(', js)]
print("taoAnh calls:", len(matches))
for pos in matches:
    print(js[max(0, pos - 100):min(len(js), pos + 100)])
