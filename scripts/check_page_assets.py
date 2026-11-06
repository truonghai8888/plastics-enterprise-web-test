import re
import os

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all href="..." and src="..."
refs = set(re.findall(r'(?:src|href)=["\'](/assets/[^"\']+)["\']', html))
print(f"Total asset references in ecobamboo_tu_thiet_ke_vach.html: {len(refs)}")

missing = []
for r in refs:
    clean_r = r.split('?')[0]
    local_p = os.path.join('public', clean_r.lstrip('/\\').replace('/', os.sep))
    if not os.path.exists(local_p):
        missing.append((r, local_p))

print(f"Missing local assets: {len(missing)}")
for r, lp in missing:
    print(f"  {r} -> {lp}")

