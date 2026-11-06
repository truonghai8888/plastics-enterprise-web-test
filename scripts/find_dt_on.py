with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('/* ==== dt.js ==== */')
import re
matches = [m.start() for m in re.finditer(r'dt-on', js[idx:])]
print("dt-on in dt.js:", len(matches))
for m in matches[:5]:
    pos = idx + m
    print(js[max(0, pos-40):min(len(js), pos+200)])
    print('='*40)

