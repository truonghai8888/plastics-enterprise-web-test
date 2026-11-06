with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'window\.VACH\s*=', text)]
for idx in matches:
    print(f"window.VACH = at {idx}:")
    print(text[max(0, idx-50):min(len(text), idx+150)])
