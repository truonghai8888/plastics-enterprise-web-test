with open('scraped_data/vach_inner.html', 'r', encoding='utf-8') as f:
    inner = f.read()

import re
ids = set(re.findall(r'id="([^"]+)"', inner))
print("Total IDs in vach_inner.html:", len(ids))

with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

called_ids = set(re.findall(r'\$\([\'"]([^\'"]+)[\'"]\)', js))
called_ids.update(re.findall(r'getElementById\([\'"]([^\'"]+)[\'"]\)', js))

missing = []
for mid in called_ids:
    # If not in vach_inner.html AND not created in js string literals
    if mid not in ids and f'id="{mid}"' not in js and f"id='{mid}'" not in js and f'id=\\"{mid}\\"' not in js:
        missing.append(mid)

print("IDs required by vach.js that are NOT in vach_inner.html and NOT created by vach.js:", missing)
