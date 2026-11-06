with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
print("document.documentElement / document.body in vach.js:")
for m in re.finditer(r'(document\.(documentElement|body)[^\n;]+)', text):
    print("  ", m.group(1).strip()[:140])
