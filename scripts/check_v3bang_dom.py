with open('live_desktop_dom.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('id="v3Bang"')
print("v3Bang at:", idx)
if idx != -1:
    print(text[idx-50:idx+400])
