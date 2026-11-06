with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'veCot\(\)', text)]
for idx in matches:
    print(text[max(0, idx-100):min(len(text), idx+100)])
    print("-" * 50)
