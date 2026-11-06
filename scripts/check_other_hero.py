with open('src/pages/ColorLibraryPage.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines[120:200]):
    print(f"{i+121}: {l.strip()[:120]}")
