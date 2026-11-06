with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
for name in ['v3-nen', 'v3-hop', 'goiy']:
    matches = [m.start() for m in re.finditer(name, css)]
    print(f"=== {name}: {len(matches)} matches ===")
    for idx in matches:
        print(css[idx:idx+300])
        print('-'*30)
