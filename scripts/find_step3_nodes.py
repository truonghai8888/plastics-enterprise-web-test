with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

for tid in ["doKL", "bangKL", "klTamTinh", "guKhoi", "v3GhiChu"]:
    idx = text.find(f'id="{tid}"')
    print(f"=== {tid} in inner_html ===")
    if idx != -1:
        print(text[idx-30:idx+400])
    else:
        print("NOT FOUND!")
