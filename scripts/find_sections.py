with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'/\* ==== ([^=]+) ==== \*/', text)
for i, m in enumerate(matches):
    print(f'{i+1}. {m}')
