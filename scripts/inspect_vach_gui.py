with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('window.VACH_GUI=')
if idx == -1:
    idx = text.find('VACH_GUI=')
print('VACH_GUI at:', idx)
if idx != -1:
    print(text[idx-200:idx+1500])
