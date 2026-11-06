with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

for modal_id in ['v3Luu', 'v3Xuat', 'v3Hop', 'qLuu', 'qXuat', 'qBaoGia', 'moHopNho']:
    idx = text.find(modal_id)
    print(f"=== {modal_id} (first 3) ===")
    count = 0
    while idx != -1 and count < 3:
        print(text[max(0, idx-60):min(len(text), idx+140)].strip())
        print('---')
        idx = text.find(modal_id, idx + len(modal_id) + 1)
        count += 1
