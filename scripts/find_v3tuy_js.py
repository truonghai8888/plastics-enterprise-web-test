with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'v3Tuy', text)]
print("v3Tuy matches in vach.js:", len(matches))
for idx in matches:
    print("---------------------")
    print(text[max(0, idx-60):min(len(text), idx+200)])

