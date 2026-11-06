with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('function hopNho(')
print('hopNho at:', idx)
if idx != -1:
    print(text[idx:idx+1500])
