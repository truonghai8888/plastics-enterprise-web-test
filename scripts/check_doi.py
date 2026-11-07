with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('function doi(')
if idx == -1:
    idx = text.find('const doi=')
if idx == -1:
    idx = text.find('doi=')
print("function doi found at:", idx)
print(text[idx:idx+500])
