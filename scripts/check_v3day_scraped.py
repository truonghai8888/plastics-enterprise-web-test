with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'(<footer class="v3-day".*?</footer>)', text, re.DOTALL)
if m:
    print("Found v3-day in scraped:")
    print(m.group(1))
