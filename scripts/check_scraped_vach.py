with open('scraped_data/html/tu-thiet-ke-vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('Length of scraped tu-thiet-ke-vach.html:', len(text))
lines = text.splitlines()
print('Total lines:', len(lines))
for i in range(min(50, len(lines))):
    print(lines[i][:120])

