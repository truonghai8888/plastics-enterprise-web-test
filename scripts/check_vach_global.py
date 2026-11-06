with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
tags = ['header', 'nav', 'button', 'a', 'body', 'html', ':root', 'input', 'select']
for t in tags:
    matches = [m.start() for m in re.finditer(rf'(?:^|\}}|\s){re.escape(t)}\s*\{{', css)]
    print(f"Selector '{t}' in vach.css: {len(matches)} matches")
