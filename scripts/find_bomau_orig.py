with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'bo-mau', text)]
print("bo-mau count in scraped file:", len(matches))
for idx in matches:
    print("--- bo-mau context ---")
    print(text[max(0, idx-100):min(len(text), idx+400)])
