with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('v3-dau-trai-new', 'v3-topbar-nav')
text = text.replace('v3-dau-giua-new', 'v3-topbar-stats')
text = text.replace('v3-dau-phai-new', 'v3-topbar-actions')

with open('src/pages/WallDesignerPage.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

with open('scripts/generate_wall_designer.py', 'r', encoding='utf-8') as f:
    gen = f.read()

gen = gen.replace('v3-dau-trai-new', 'v3-topbar-nav')
gen = gen.replace('v3-dau-giua-new', 'v3-topbar-stats')
gen = gen.replace('v3-dau-phai-new', 'v3-topbar-actions')

with open('scripts/generate_wall_designer.py', 'w', encoding='utf-8') as f:
    f.write(gen)

print("Renamed classes cleanly!")
