with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
m = re.search(r'(<header class="v3-dau".*?</header>)', text, re.DOTALL)
if m:
    print('Found header in ecobamboo_tu_thiet_ke_vach.html:')
    print(m.group(1)[:1000])
