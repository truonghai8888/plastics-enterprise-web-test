with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('vachStudioMount')
while idx != -1:
    print('Found at', idx, repr(text[idx-20:idx+60]))
    idx = text.find('vachStudioMount', idx+1)
