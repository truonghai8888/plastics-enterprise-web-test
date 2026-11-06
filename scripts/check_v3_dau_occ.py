with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'<header[^>]*v3-dau[^>]*>', text)
print('Matches for v3-dau:', len(matches), matches)
