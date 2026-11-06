with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('/* ==== ui.js ==== */')
print('ui.js index:', idx)
print(text[idx:idx+1200])
