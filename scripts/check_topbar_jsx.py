with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('CONSOLIDATED TOP BAR')
print(text[idx-50:idx+1500])
