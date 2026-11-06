with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

vo_idx = text.find('/* ==== vo.js ==== */')
dt_idx = text.find('/* ==== dt.js ==== */')
vo_code = text[vo_idx:dt_idx]

lines = vo_code.splitlines()
for i in range(680, 720):
    if i < len(lines):
        print(f"{i}: {lines[i]}")
