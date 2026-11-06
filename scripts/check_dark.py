with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'prefers-color-scheme', text)]
for idx in matches:
    print("Match at", idx, ":")
    print(text[max(0, idx-50):min(len(text), idx+200)])
