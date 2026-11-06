with open('live_desktop_dom.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('khoDK')
print("khoDK in live_desktop_dom:", idx)
if idx != -1:
    print(text[idx-50:idx+400])
else:
    print("khoDK NOT in live_desktop_dom!")

