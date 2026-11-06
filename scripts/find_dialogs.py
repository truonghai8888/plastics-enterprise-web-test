with open('public/vach-studio.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
# check modals, dialogs, popups
dialogs = re.findall(r'<(?:dialog|div)[^>]*(?:modal|hop|popup|overlay|dialog)[^>]*>', html, re.IGNORECASE)
for d in dialogs:
    print(d)
