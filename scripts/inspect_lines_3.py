with open('scraped_data/vach_main_clean.html', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
print(f"Lines 180 to 361:")
for i in range(180, len(lines)):
    print(lines[i])
