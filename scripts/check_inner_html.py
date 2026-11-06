with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
# Find all id="..." in inner html
ids = re.findall(r'id=["\']([^"\']+)["\']', text)
print(f"Total IDs in VACH_STUDIO_INNER_HTML: {len(ids)}")
for i in ['v3Cot', 'v3Bang', 'v3San', 'c', 'khoDK', 'khuTuong', 'khuDoDay', 'khuMauKhoiDau']:
    print(f"Has {i}:", i in ids)
