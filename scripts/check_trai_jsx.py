with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'v3-dau-trai', text)]
for idx in matches:
    print(text[max(0, idx-50):min(len(text), idx+100)])
