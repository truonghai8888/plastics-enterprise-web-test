with open('src/components/layout/Header.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.split('\n')
for i in range(540, 605):
    print(f"{i+1}: {lines[i]}")
