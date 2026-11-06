with open('live_desktop_dom.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'bo-mau', text)]
print("bo-mau count:", len(matches))
for idx in matches:
    print("--- bo-mau context ---")
    print(text[max(0, idx-100):min(len(text), idx+300)])
