with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('function veBuoc(){')
print("function veBuoc at:", idx)
print(text[idx:idx+1500])
