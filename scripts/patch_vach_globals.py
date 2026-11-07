import re

# 1. Patch src/data/vachGlobals.js
with open('src/data/vachGlobals.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'"LOGO":\s*"data:image/svg\+xml;base64,[^"]+"', '"LOGO": ""', content)

with open('src/data/vachGlobals.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patched src/data/vachGlobals.js')

# 2. Patch src/data/vachHs.json
with open('src/data/vachHs.json', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'"LOGO":\s*"data:image/svg\+xml;base64,[^"]+"', '"LOGO": ""', content)

with open('src/data/vachHs.json', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patched src/data/vachHs.json')
