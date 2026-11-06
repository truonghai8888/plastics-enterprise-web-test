with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'#24700[bB]', js)]
for pos in matches:
    print("--- Match at pos:", pos)
    print(js[max(0, pos - 100):min(len(js), pos + 200)])

