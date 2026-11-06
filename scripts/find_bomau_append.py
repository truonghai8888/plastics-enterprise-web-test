with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('boMau"+m.loai')
print("found at:", idx)
print(text[max(0, idx-600):min(len(text), idx+600)])

