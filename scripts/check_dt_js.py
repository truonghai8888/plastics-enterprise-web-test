with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('/* ==== dt.js ==== */')
print("dt.js index:", idx)
print(js[idx:idx+2500])
