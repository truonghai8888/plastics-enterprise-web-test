with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

for btn_id in ['qUndo', 'qLai', 'v3Lui', 'v3Toi', 'qLuu', 'qXuat', 'qBaoGia', 'v3Cot']:
    idx = 0
    found = []
    while True:
        pos = text.find(f'"{btn_id}"', idx)
        if pos == -1:
            pos = text.find(f"'{btn_id}'", idx)
        if pos == -1:
            break
        found.append(pos)
        idx = pos + len(btn_id) + 2
        if len(found) > 5:
            break
    print(f"ID {btn_id}: found at {len(found)} places: {found}")
    for p in found[:2]:
        print(f"  context: {text[max(0, p-60):min(len(text), p+100)].strip()}")
