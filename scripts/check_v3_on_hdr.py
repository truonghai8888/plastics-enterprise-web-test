with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('html.v3-on .topbar')
print(text[idx-50:idx+600])

