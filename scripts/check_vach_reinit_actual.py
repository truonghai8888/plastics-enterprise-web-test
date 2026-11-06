with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('window.VACH_REINIT')
print("VACH_REINIT at:", idx)
print(text[idx:idx+600])
