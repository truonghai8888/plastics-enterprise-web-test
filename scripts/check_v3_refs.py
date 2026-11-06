with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = re.findall(r'(\.v3-[\w\-]+|\b(?:v3Ma|v3So|v3Lui|v3Toi|qUndo|qLai|qLuu|qXuat|qBaoGia)\b)', text)
print('Unique classes/ids referenced in vach.js:', set(matches))
