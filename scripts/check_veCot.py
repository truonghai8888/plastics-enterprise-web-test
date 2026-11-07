with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('veCot()')
print("veCot found at:", idx)
print(text[idx-200:idx+1500])
