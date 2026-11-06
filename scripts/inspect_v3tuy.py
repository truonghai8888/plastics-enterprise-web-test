with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('id="v3Tuy"')
if idx == -1:
    idx = text.find('v3Tuy')
print("v3Tuy at:", idx)
print(text[idx-200:idx+1500])
