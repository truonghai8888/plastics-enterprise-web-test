with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    page_jsx = f.read()

import re
print("dt-on in WallDesignerPage.jsx:")
for line in page_jsx.splitlines():
    if 'dt-' in line or 'dt.js' in line:
        print("  ", line)

with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    vach_css = f.read()
print("dt-on in vach.css (first 10):")
for line in vach_css.splitlines():
    if 'dt-on' in line:
        print("  ", line)

