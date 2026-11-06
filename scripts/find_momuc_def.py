with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('function moMuc(')
print("function moMuc at:", idx)
if idx != -1:
    print(text[idx:idx+1500])
