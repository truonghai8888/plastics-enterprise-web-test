with open('public/assets/css/eb.css', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find(':root')
print(text[pos:pos+1000])
