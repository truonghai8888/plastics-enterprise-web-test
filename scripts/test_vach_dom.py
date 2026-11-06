import re

with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Find all $(...) or getElementById(...) calls
called_ids = set(re.findall(r'\$\([\'"]([^\'"]+)[\'"]\)', js))
called_ids.update(re.findall(r'getElementById\([\'"]([^\'"]+)[\'"]\)', js))

print("Total unique element IDs queried in vach.js:", len(called_ids))

with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    jsx = f.read()

jsx_ids = set(re.findall(r'id=[\'"]([^\'"]+)[\'"]', jsx))
print("IDs currently present in WallDesignerPage.jsx:", len(jsx_ids))

missing_in_jsx = called_ids - jsx_ids
print("\nIDs required by vach.js that are MISSING in WallDesignerPage.jsx (total", len(missing_in_jsx), "):")
for mid in sorted(missing_in_jsx):
    print(" -", mid)
