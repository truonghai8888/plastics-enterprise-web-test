with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="khoDK"')
print("khoDK in vachStudioInnerHtml:", idx)
if idx != -1:
    print(text[idx:idx+500])
    print("...")
    end = text.find('</div>', idx+1000)
    print(text[end-200:end+100])

