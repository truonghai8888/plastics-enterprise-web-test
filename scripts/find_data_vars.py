with open('public/assets/js/vach-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = set(re.findall(r'window\.([A-Z0-9_]+)\b', text))
print("All window.[A-Z_] defined in vach-data.js:", sorted(list(matches)))

