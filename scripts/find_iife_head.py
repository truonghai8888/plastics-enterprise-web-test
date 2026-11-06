with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = 1034128
print(text[max(0, idx-100):min(len(text), idx+500)])
