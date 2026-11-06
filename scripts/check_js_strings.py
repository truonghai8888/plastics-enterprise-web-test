import os
import re

patterns = ['0915', 'ecobamboo', 'sale.ecobamboo']

for root, dirs, files in os.walk('public/assets/js'):
    for f in files:
        if f.endswith('.js'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
                for pat in patterns:
                    matches = list(re.finditer(re.escape(pat), content, re.IGNORECASE))
                    if matches:
                        print(f"File {p} has {len(matches)} matches for '{pat}'")
