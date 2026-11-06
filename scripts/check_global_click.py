with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('handleGlobalClick')
print(text[idx:idx+800])
