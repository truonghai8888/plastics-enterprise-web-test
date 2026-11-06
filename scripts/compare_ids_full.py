with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    orig = f.read()

with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    inner = f.read()

import re
orig_v3_start = orig.find('<div class="v3">')
orig_ft_start = orig.find('<footer class="ft"')
orig_section = orig[orig_v3_start:orig_ft_start]

orig_ids = set(re.findall(r'id=["\']([^"\']+)["\']', orig_section))
inner_ids = set(re.findall(r'id=["\']([^"\']+)["\']', inner))

# IDs in topbar (now in JSX)
topbar_ids = {'qUndo', 'qLai', 'v3Lui', 'v3Toi', 'v3So', 'v3Ma', 'qLuu', 'qXuat', 'qBaoGia'}

missing_from_inner = orig_ids - inner_ids - topbar_ids
print(f"Total IDs in orig section: {len(orig_ids)}")
print(f"Total IDs in inner_html: {len(inner_ids)}")
print(f"Missing IDs (excluding topbar): {missing_from_inner}")
