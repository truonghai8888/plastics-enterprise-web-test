with open('scraped_data/html/tu-thiet-ke-vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
print('Has bgHop:', 'id="bgHop"' in text)
print('Has bgNen:', 'id="bgNen"' in text)
print('Has bgTamTinh:', 'id="bgTamTinh"' in text)

# Find all id="..." in scraped HTML
ids_in_scraped = set(re.findall(r'id=["\']([a-zA-Z0-9_\-]+)["\']', text))
print('Total IDs in scraped HTML:', len(ids_in_scraped))
