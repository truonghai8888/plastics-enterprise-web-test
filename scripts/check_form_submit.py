with open('public/assets/js/eb.js', 'r', encoding='utf-8') as f:
    eb_js = f.read()

import re
matches = [m.start() for m in re.finditer(r'web-lead|data-eb-form|addEventListener\(["\']submit', eb_js)]
print("Form listeners in eb.js:", len(matches))
for pos in matches:
    print(eb_js[max(0, pos - 50):min(len(eb_js), pos + 300)])
