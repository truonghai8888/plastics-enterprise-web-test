with open('public/assets/css/vach.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'\.v3-hop\b|\.v3-nen\b|\.bg-hop\b|\.bg-nen\b', text)]
print("Matches in vach.css:", len(matches))
for idx in matches[:6]:
    print("-------------")
    print(text[max(0, idx-20):min(len(text), idx+200)])
