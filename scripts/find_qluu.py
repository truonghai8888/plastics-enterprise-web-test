with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

pos = js.find('qLuu')
print("qLuu pos:", pos)
if pos != -1:
    print(js[pos - 50 : pos + 400])
