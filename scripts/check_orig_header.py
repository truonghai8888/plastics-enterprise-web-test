with open('public/vach-studio.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
m = re.search(r'(<header class="v3-dau".*?</header>)', text, re.DOTALL)
if m:
    print('Found header in vach-studio.html:')
    print(m.group(1))
else:
    print('Header not found in vach-studio.html')
