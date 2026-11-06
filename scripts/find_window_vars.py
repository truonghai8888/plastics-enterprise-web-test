with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = set(re.findall(r'window\.([A-Z0-9_]+)\b', text))
print("All window.[A-Z_] references in vach.js:", sorted(list(matches)))
