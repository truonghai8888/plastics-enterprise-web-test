with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = set(re.findall(r'window\.([a-zA-Z0-9_]+)\s*=', js))
print("All window properties assigned in vach.js:")
print(matches)
