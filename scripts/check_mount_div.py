with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = 24608
print(text[idx-50:idx+600])
