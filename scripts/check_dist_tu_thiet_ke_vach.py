with open('dist/tu-thiet-ke-vach/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("dist/tu-thiet-ke-vach/index.html length:", len(html))
print(html[:1500])
