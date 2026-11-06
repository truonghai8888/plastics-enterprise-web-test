with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.rfind('dangerouslySetInnerHTML')
print(text[idx+100:idx+1500])
