with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('const BUOC=[')
print('Found BUOC at:', idx)
print(text[idx-200:idx+800])
