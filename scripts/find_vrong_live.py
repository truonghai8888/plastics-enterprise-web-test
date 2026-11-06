with open('live_desktop_dom.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('id="vRong"')
print("vRong at:", idx)
if idx != -1:
    print(text[idx-200:idx+200])
else:
    print("vRong NOT in live_desktop_dom!")
