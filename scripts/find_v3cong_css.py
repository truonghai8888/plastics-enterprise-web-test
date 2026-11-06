with open('public/assets/css/vach.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'\.v3-cong\b|\.v3-tuy\b', text)]
print("v3-cong / v3-tuy in css:", len(matches))
for idx in matches[:6]:
    print("----------------")
    print(text[max(0, idx-20):min(len(text), idx+160)])
