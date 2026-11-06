with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'\bebDo\b', js)]
print("ebDo calls:", len(matches))
for pos in matches[:3]:
    print(js[max(0, pos - 50):min(len(js), pos + 100)])
