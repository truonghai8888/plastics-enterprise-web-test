with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
btn_ids = ['qUndo', 'qLai', 'v3Lui', 'v3Toi', 'qLuu', 'qXuat', 'qBaoGia', 'v3So']
for bid in btn_ids:
    print(f"=== {bid} ===")
    matches = [m.start() for m in re.finditer(bid, text)]
    for idx in matches[:3]:
        print(text[max(0, idx-60):min(len(text), idx+100)].replace('\n', ' '))
