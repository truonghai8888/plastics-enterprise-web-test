with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.findall(r'@font-face[^{]*{[^}]*}', css)
print("Font-face declarations in vach.css:", len(matches))
for m in matches:
    print(m)
