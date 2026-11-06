import os
import re

img_regex = re.compile(r'[\'\"`]((?:/images|/assets)[^\'\"`\s]+\.(?:webp|png|jpg|jpeg|svg|gif))[\'\"`]')
missing = []
total_found = 0

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.json', '.html', '.css')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
                matches = img_regex.findall(content)
                for m in matches:
                    total_found += 1
                    local_p = os.path.join('public', m.lstrip('/\\').replace('/', os.sep))
                    if not os.path.exists(local_p):
                        missing.append((path, m, local_p))

print(f"Total image references checked: {total_found}")
print(f"Missing images count: {len(missing)}")
for src_f, m, lp in missing:
    print(f"  {src_f} -> {m}")
