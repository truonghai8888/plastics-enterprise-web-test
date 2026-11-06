with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('const API={')
if idx == -1:
    idx = js.find('API={')
print(js[idx:idx+1500])
