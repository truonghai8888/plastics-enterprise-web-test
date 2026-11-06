with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'addEventListener\(["\']DOMContentLoaded["\']|window\.onload', js)]
print("DOMContentLoaded matches:", len(matches))
for idx in matches:
    print(js[max(0, idx-50):min(len(js), idx+150)])
    print('='*50)
