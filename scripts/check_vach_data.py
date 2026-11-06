with open('public/assets/js/vach-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

print("vach-data.js length:", len(text))
print("First 300 characters:")
print(text[:300])
