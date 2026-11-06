with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

for tid in ["doKL", "bangKL", "guKhoi", "klTamTinh"]:
    idx = text.find(f'"{tid}"')
    if idx == -1: idx = text.find(f"'{tid}'")
    if idx == -1: idx = text.find(f'id="{tid}"')
    print(f"=== {tid} in vach.js ===")
    if idx != -1:
        print(text[max(0, idx-100):min(len(text), idx+300)])
    else:
        print("NOT FOUND!")
