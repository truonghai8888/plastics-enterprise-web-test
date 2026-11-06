with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

for btn_id in ['qXuat', 'qBaoGia', 'qUndo', 'qLai', 'caVach']:
    pos = js.find(btn_id)
    print(f"=== {btn_id} (pos {pos}) ===")
    if pos != -1:
        print(js[pos - 30 : pos + 300])
