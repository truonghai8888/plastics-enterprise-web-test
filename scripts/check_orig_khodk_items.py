with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="khoDK"')
print(text[idx:idx+1500])
