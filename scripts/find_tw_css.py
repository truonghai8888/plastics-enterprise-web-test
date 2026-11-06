with open('public/assets/css/vach.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'\.tw\b|#bangSo\b|#bangKL\b', text)]
print("tw / bangSo / bangKL in css:", len(matches))
for idx in matches:
    print("----------------")
    print(text[max(0, idx-40):min(len(text), idx+200)])
