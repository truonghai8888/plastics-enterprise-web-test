with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('veCot(); moMuc("1a"); veDay(); veMoc();')
print(js[max(0, idx-200):idx+400])
