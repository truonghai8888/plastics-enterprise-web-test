with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('/* ==== ui.js ==== */')
idx_end = text.find('/* ==== vo.js ==== */')
ui_text = text[idx:idx_end]

import re
matches = re.findall(r'(?:veCot|moMuc|veDay|veMoc)\([^\)]*\)', ui_text)
print('Calls inside ui.js:', len(matches))
for m in matches[-15:]:
    print('  ', m)
