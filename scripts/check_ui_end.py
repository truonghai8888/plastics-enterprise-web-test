with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('/* ==== vo.js ==== */')
print(text[idx-1200:idx])
