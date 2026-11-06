with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('{id:"3"')
print("step 3 in MUC at:", idx)
if idx != -1:
    print(text[idx-50:idx+600])
