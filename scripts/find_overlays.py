with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.findall(r'(\.[a-zA-Z0-9_\-]+|#[a-zA-Z0-9_\-]+)\s*\{[^}]*position:\s*(?:absolute|fixed)[^}]*\}', css)
print("Positioned elements count:", len(matches))
for m in matches[:25]:
    # find where m is
    idx = css.find(m)
    rule = css[idx:css.find('}', idx)+1]
    if 'z-index' in rule or 'inset' in rule or 'top' in rule:
        print(rule.strip().replace('\n', ' '))
