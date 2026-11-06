with open('scraped_data/vach_main_clean.html', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
print(f"Lines 50 to 180:")
for i in range(50, min(180, len(lines))):
    print(lines[i])
