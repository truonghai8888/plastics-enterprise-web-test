with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'#0a7a3a', text)]
print("Matches of #0a7a3a:", len(matches))
for idx in matches:
    print(text[max(0, idx-30):min(len(text), idx+50)])

