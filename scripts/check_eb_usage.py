with open('public/assets/css/eb.css', 'r', encoding='utf-8') as f:
    eb_css = f.read()

with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    studio_html = f.read()

import re
studio_classes = set(re.findall(r'class=["\']([^"\']+)["\']', studio_html))
split_classes = set()
for c in studio_classes:
    for part in c.split():
        split_classes.add(part)

print("Total unique classes in studio HTML:", len(split_classes))

matches_in_eb = []
for c in split_classes:
    if f'.{c}' in eb_css:
        matches_in_eb.append(c)

print(f"Classes matching in eb.css: {len(matches_in_eb)}")
print("Matches:", matches_in_eb)
