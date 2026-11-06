import re

with open('scraped_data/vach_inner.html', 'r', encoding='utf-8') as f:
    text = f.read()

kho_start = text.find('<div id="khoDK"')
kho = text[kho_start:]
print('Length of khoDK:', len(kho))
ids = re.findall(r'id="([^"]+)"', kho)
print('IDs inside khoDK:', ids)

# Also find all getElementById in vach.js
with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

get_by_id = re.findall(r'getElementById\([\'"]([^\'"]+)[\'"]\)', js)
print('Unique getElementById in vach.js:', len(set(get_by_id)))

missing_ids = []
for gid in set(get_by_id):
    if f'id="{gid}"' not in text:
        missing_ids.append(gid)

print('IDs queried by vach.js but NOT in vach_inner.html:', missing_ids)
