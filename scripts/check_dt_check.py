with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('/* ==== dt.js ==== */')
print(js[idx+2000:idx+4500])
