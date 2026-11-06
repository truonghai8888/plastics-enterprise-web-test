with open('public/vach-studio.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('bgKhoi')
print("bgKhoi in vach-studio.html:", idx)
if idx != -1:
    print(text[max(0, idx-100):min(len(text), idx+300)])

