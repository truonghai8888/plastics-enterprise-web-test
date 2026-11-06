with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
all_html_ids = set(re.findall(r'id="([^"]+)"', html))
print("Total IDs in scraped HTML:", len(all_html_ids))

with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

called_ids = set(re.findall(r'\$\([\'"]([^\'"]+)[\'"]\)', js))
called_ids.update(re.findall(r'getElementById\([\'"]([^\'"]+)[\'"]\)', js))

missing_from_html = called_ids - all_html_ids
print("IDs in vach.js but NOT in scraped HTML:", len(missing_from_html))
print(missing_from_html)
