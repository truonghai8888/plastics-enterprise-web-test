with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('function veCot()')
if idx == -1:
    idx = text.find('const veCot=')
if idx == -1:
    idx = text.find('veCot=')
print("function veCot found at:", idx)
print(text[idx:idx+1500])
