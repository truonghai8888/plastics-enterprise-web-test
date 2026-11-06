with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find('classList.toggle("dt-on"')
print(js[max(0, idx-400):idx+200])
