with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = re.findall(r'(?:DOMContentLoaded|addEventListener\([\'"]load[\'"]|window\.onload|\$\(document\)\.ready)', js)
print("Load events in vach.js:", matches)

# Check top 500 characters of vach.js
print("Top 500 characters of vach.js:")
print(js[:500])
