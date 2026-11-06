with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
for m in re.finditer(r'VACH_REINIT', text):
    idx = m.start()
    print("Match at", idx, ":")
    print(text[max(0, idx-100):min(len(text), idx+300)])
