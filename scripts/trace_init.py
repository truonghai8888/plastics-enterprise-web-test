with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find where veCot, moMuc, veDay, veMoc are called initially or on startup
print("Tracing initial calls to veCot, moMuc, etc:")
for m in re.finditer(r'([^\n]*(?:veCot|moMuc|veDay|veMoc|lamMoi|veSan|datDangTang)[^\n]*)', text):
    line = m.group(0).strip()
    if not line.startswith('//') and not line.startswith('/*') and len(line) < 140:
        print(" ", line)
