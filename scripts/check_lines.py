with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(46, 51):
    print(repr(lines[i]))
