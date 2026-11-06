with open('src/components/layout/Header.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('860px')
if idx != -1:
    print(text[idx-50:idx+200])
