with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = [m.start() for m in re.finditer(r'getElementById\([\'"]c[\'"]\)', js)]
print("Canvas element lookups in vach.js:", len(matches))
for pos in matches:
    print(js[max(0, pos - 50):min(len(js), pos + 100)])

