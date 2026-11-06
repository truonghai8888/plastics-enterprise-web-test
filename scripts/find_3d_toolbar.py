with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'sơ đồ|so-do|v3-tuy|v3Tuy|dock|thanh công cụ|tuy-nut', text, re.IGNORECASE)]
print("Matches in vach.js:", len(matches))
for idx in matches[:10]:
    print("---------------------")
    print(text[max(0, idx-60):min(len(text), idx+140)])
