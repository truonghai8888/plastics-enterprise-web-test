with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

target = 'const cv=$("c")'
idx = text.find(target)
print('Target index:', idx)
if idx != -1:
    print('--- CONTEXT ---')
    print(text[max(0, idx-400):min(len(text), idx+600)])
