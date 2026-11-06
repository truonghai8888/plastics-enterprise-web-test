import re
import os
import urllib.request

with open('scraped_data/ecobamboo_vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

with open('scraped_data/ecobamboo_vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Find all /assets/... paths
paths = set(re.findall(r'(/assets/[a-zA-Z0-9_\-\./]+(?:\.webp|\.png|\.jpg|\.ttf|\.woff2|\.svg))', js + css))
print(f"Total asset paths found: {len(paths)}")

headers = {'User-Agent': 'Mozilla/5.0'}
for p in sorted(paths):
    local_path = os.path.join('public', p.lstrip('/').replace('/', os.sep))
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    if not os.path.exists(local_path):
        url = f"https://ecobamboo.vn{p}"
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = resp.read()
            with open(local_path, 'wb') as out:
                out.write(data)
            print(f"Downloaded: {p} ({len(data)} bytes)")
        except Exception as e:
            print(f"Failed {p}: {e}")
    else:
        print(f"Already exists: {p}")
