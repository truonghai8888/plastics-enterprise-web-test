with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    orig = f.read()

import re
print("qBaoGia in orig:", 'qBaoGia' in orig)
matches = [m.start() for m in re.finditer(r'qBaoGia|bao.*gia|modal|popup|hop', orig, re.IGNORECASE)]
print("Matches in orig:", len(matches))
for idx in matches[:10]:
    print(orig[max(0, idx-40):min(len(orig), idx+150)])
    print('='*40)
