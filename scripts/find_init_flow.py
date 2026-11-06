with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

pos = js.find('const cv=$("c");')
print("Position:", pos)
print(js[pos - 200 : pos + 1000])
