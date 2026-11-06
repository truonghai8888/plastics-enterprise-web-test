with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('function moMuc(')
print(js[idx:idx+1500])
