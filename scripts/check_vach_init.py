with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

print("vach.js length:", len(js))
print("Last 1000 characters of vach.js:")
print(js[-1000:])
