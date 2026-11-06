import re

with open('public/vach-studio.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('class="v3-san')
if idx != -1:
    print("Found v3-san at", idx)
    print(text[idx:idx+3000])
else:
    print("Not found v3-san")
