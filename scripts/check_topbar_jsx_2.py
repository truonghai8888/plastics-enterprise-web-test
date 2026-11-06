with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('<header className="v3-dau-parent')
print(text[idx:idx+1500])
