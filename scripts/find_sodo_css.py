with open('public/assets/css/vach.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'\.so-do\b|#soDoMD\b|v3-co-md\b', text)]
print("so-do / v3-co-md in css:", len(matches))
for idx in matches:
    print("----------------")
    print(text[max(0, idx-60):min(len(text), idx+200)])
