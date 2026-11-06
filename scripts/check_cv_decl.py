with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'(?:const|let|var)\s+cv\s*=', js)]
print("cv declaration matches:", len(matches))
for idx in matches:
    print(js[max(0, idx-50):min(len(js), idx+200)])
    print('='*50)
