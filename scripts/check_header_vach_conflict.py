with open('src/components/layout/Header.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
header_classes = set(re.findall(r'className=["\']([^"\']+)["\']', text))
all_classes = set()
for c in header_classes:
    for cls in c.split():
        all_classes.add(cls)

print('Total classes in Header:', len(all_classes))

with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Check if any class in Header appears in vach.css
common = []
for cls in all_classes:
    # check if .cls followed by { or space or comma or pseudo
    if re.search(r'\.' + re.escape(cls) + r'(?=[^-_a-zA-Z0-9])', css):
        common.append(cls)

print('Classes in Header that match selectors in vach.css:', common)
