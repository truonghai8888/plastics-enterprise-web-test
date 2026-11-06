with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find(':root')
print('Context around :root in vach.css:')
print(text[idx:idx+1500])
