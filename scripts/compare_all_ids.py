with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    orig = f.read()

with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    inner = f.read()

import re
orig_ids = set(re.findall(r'id=["\']([^"\']+)["\']', orig))
inner_ids = set(re.findall(r'id=["\']([^"\']+)["\']', inner))

# Filter out site-wide elements that belong to website header/footer/trackers
site_ids = {'hdr', 'topbar', 'toTop', 'drawer', 'closeDrawer', 'ft', 'main', 'noidung'}
orig_studio_ids = orig_ids - site_ids

missing = orig_studio_ids - inner_ids
print(f"Total orig studio IDs: {len(orig_studio_ids)}")
print(f"Total inner studio IDs: {len(inner_ids)}")
print(f"Missing studio IDs ({len(missing)}):", missing)

