with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'(html\.v3[^{]+)\{([^}]+)\}', text)
for sel, body in matches:
    print(sel.strip()[:60], '==>', body.strip()[:80])
