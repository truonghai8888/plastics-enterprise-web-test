with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('function moMuc(id){')
print(text[idx:idx+2000])
