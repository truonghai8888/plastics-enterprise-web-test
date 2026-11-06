with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('/* Chuẩn hóa nút bấm')
print(text[idx:idx+1500])
