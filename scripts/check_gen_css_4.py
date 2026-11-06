with open('scripts/generate_wall_designer.py', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('/* Zone 3: Hành động chính')
print(text[idx1:idx1+2000])
