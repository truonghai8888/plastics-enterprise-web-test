with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('/* ==== dt.js ==== */')
print("dt.js starts at:", idx)
print("Before dt.js (last 800 chars of vo.js):")
print(text[idx-800:idx])
