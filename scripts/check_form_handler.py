with open('public/assets/js/eb.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find("f.addEventListener('submit'")
print(text[pos:pos+1500])
