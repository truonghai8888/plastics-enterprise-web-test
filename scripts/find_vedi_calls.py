with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'\bveDi\(', text)]
print("veDi() calls:", len(matches))
for idx in matches:
    print(text[max(0, idx-60):min(len(text), idx+100)])
