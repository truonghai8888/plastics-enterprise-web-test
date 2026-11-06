with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('window.VACH_BAY')
print(js[max(0, idx-1500):idx])
