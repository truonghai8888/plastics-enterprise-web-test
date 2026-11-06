with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('th,td{')
if idx != -1:
    print(text[idx-50:idx+200])
