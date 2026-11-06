with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="khoDK"')
print("khoDK at:", idx)
if idx != -1:
    end_kho = text.find('</div>\n\n<section id="bgKhoi"', idx)
    print("khoDK end at:", end_kho)
    print("khoDK length:", end_kho - idx)

