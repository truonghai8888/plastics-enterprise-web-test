with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = 2020628
print(text[max(0, idx-400):min(len(text), idx+600)])
