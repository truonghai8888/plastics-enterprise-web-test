with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i in range(min(100, len(lines))):
    print(f"{i+1}: {lines[i]}", end='')
