with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('function moMuc(id){')
print(text[idx+1000:idx+3000])
