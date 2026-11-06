with open('scripts/generate_wall_designer.py', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('/* Chuẩn hóa nút bấm')
print(text[idx1:idx1+2000])
