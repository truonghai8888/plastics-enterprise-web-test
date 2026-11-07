with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('VACH_REINIT')
print("VACH_REINIT found at:", idx)
print(text[idx-100:idx+1500])
