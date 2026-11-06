with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'dt-buoc', text)]
print("dt-buoc in scraped:", len(matches))
for idx in matches:
    print(text[max(0, idx-50):min(len(text), idx+200)])
