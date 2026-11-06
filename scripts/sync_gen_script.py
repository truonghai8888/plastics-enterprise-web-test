with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    page_code = f.read()

with open('scripts/generate_wall_designer.py', 'w', encoding='utf-8') as f:
    f.write(f'# Generated sync script\nWALL_DESIGNER_CODE = {repr(page_code)}\n\nwith open("src/pages/WallDesignerPage.jsx", "w", encoding="utf-8") as fp:\n    fp.write(WALL_DESIGNER_CODE)\nprint("Synchronized WallDesignerPage.jsx!")\n')

print("generate_wall_designer.py updated!")
