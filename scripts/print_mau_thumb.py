import json

# Let's inspect vach-data.js to see what window.MAU_THUMB has
with open('public/assets/js/vach-data.js', 'r', encoding='utf-8') as f:
    vdata = f.read()

import re
m = re.search(r'window\.MAU_THUMB\s*=\s*(\{[^\;]+\})', vdata)
if m:
    thumb = json.loads(m.group(1))
    print("Total keys in MAU_THUMB:", len(thumb))
    for k in sorted(thumb.keys()):
        print(f"  {k:12s} -> {thumb[k]}")
else:
    print("MAU_THUMB regex failed")
