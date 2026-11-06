with open('scraped_data/vach_inner.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("vach_inner.html total lines:", len(lines))
print("First 30 lines:")
for l in lines[:30]:
    print(l, end='')

