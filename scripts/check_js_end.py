with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

# find end of vach.js
print("Last 2000 chars of vach.js:")
print(js[-2000:])
