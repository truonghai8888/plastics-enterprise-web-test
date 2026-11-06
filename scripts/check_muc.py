with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('const MUC=[')
if idx == -1:
    idx = js.find('MUC=[')
print(js[idx:idx+800])

