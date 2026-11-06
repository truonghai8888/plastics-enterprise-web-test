with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'class="tw[^"]*"|\.tw\b', text)]
print("tw matches in scraped:", len(matches))
for idx in matches:
    print(text[max(0, idx-40):min(len(text), idx+300)])
    print("-------------------")
