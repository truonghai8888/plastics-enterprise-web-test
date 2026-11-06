with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('function veCot()')
sub = text[idx-1000:idx]
for line in sub.split('\n'):
    if '$' in line or 'function' in line or 'const' in line:
        print(line[:120])
