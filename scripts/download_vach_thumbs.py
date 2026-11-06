import re
import os
import urllib.request

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all /assets/img/vach/... paths in the html
paths = set(re.findall(r'(/assets/img/vach/[a-zA-Z0-9_\-\./]+(?:\.webp|\.png|\.jpg|\.svg))', html))
print(f"Total /assets/img/vach/ paths in html: {len(paths)}")

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
