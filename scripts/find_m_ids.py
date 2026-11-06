with open('public/vach-studio.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
matches = re.findall(r'id=["\']m[A-Z][a-zA-Z0-9]+["\']', html)
print(matches)
for m in matches:
    idx = html.find(m)
    print(html[max(0, idx-30):min(len(html), idx+150)])
    print('='*50)
