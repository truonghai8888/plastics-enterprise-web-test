with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('window.VACH_VO={veCot')
print(text[idx-200:idx+200])
