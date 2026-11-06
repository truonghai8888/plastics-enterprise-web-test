with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

pos = 1042279
print(js[pos + 1000 : pos + 3000])
