with open('public/assets/css/eb.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
tags = ['header', 'nav', 'button', 'a', 'body', 'html', ':root', '.hdr', '.topbar', '.brand']
for t in tags:
    matches = [m.start() for m in re.finditer(rf'(?:^|\}}|\s){re.escape(t)}\s*\{{', css)]
    print(f"Selector '{t}' in eb.css: {len(matches)} matches")
