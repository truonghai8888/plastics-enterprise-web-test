with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('function App')
print(text[idx:idx+1500])
