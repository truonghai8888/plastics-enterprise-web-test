with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('document.documentElement.classList.toggle("v3-mau", id==="1a");')
print(text[idx+1400:idx+3500])
