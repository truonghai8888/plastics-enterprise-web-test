with open('public/assets/css/vach.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'#bgDong|\.bg-x\b|bg-hop-dau|v3-hop-dau|v3-hop-x', text)]
print("Matches in vach.css:", len(matches))
for idx in matches[:10]:
    print("-------------")
    print(text[max(0, idx-60):min(len(text), idx+140)])

