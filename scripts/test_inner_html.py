from src.data.vachStudioInnerHtml import VACH_STUDIO_INNER_HTML

print("Length of VACH_STUDIO_INNER_HTML:", len(VACH_STUDIO_INNER_HTML))
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
    print(f"Contains {chk}:", chk in VACH_STUDIO_INNER_HTML)
