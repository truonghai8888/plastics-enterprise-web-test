with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

checks = [
    'canvas id="c"',
    'class="v3-dau"',
    'id="v3So"',
    'id="v3Lui"',
    'id="v3Toi"',
    'id="qUndo"',
    'id="qLai"',
    'id="qLuu"',
    'id="qXuat"',
    'id="qBaoGia"',
    'id="v3Cot"',
    'id="v3Bang"',
    'id="khoDK"',
    'id="khuTuong"',
    'id="khuMauKhoiDau"',
    'id="boMau"',
]

for chk in checks:
    print(f"Contains {chk}:", chk in text)
