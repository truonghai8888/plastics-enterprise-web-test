with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('window.VACH_VO=')
print("=== VACH_VO ===")
print(text[idx1:idx1+300])

idx2 = text.find('window.VACH_REINIT')
print("=== VACH_REINIT ===")
print(text[idx2:idx2+600])
