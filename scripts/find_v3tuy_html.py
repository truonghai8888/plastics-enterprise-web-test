with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="v3Tuy"')
if idx == -1:
    idx = text.find('v3Tuy')
print("v3Tuy in vachStudioInnerHtml at:", idx)
if idx != -1:
    print(text[idx-50:idx+600])
