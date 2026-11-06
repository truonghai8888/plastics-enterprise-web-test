with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
# check what is shown initially or what elements are inserted into v3San or v3Bang
print("v3Nhac occurrences:", len(re.findall(r'v3Nhac', js)))
print("v3Moc occurrences:", len(re.findall(r'v3Moc', js)))
print("caVach occurrences:", len(re.findall(r'caVach', js)))
print("theTS occurrences:", len(re.findall(r'theTS', js)))
print("kyhieu occurrences:", len(re.findall(r'kyhieu', js)))
