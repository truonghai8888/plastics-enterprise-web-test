import os
import re
import urllib.request

print("=== CHECKING ALL IMAGE LINKS IN THE CODEBASE ===")

# Scan all files in src/
img_srcs = set()

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.json')):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
                # find all image paths like /images/... or /assets/... or http...
                matches = re.findall(r'[\'"](/images/[^\'"\s]+|/assets/[^\'"\s]+)[\'"]', content)
                for m in matches:
                    # filter out code snippets or extensions that are images
                    if any(m.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']):
                        img_srcs.add((m, filepath))

                http_matches = re.findall(r'[\'"](https?://[^\'"\s]+\.(?:jpg|jpeg|png|webp|svg))[\'"]', content)
                for m in http_matches:
                    img_srcs.add((m, filepath))

print(f"Total unique image references found: {len(img_srcs)}")

missing_local = []
dead_remote = []

headers = {'User-Agent': 'Mozilla/5.0'}

checked_remote = {}

for img_url, source_file in sorted(img_srcs, key=lambda x: x[0]):
    if img_url.startswith('/'):
        # Local image check
        rel_path = img_url.lstrip('/')
        local_path = os.path.join('public', rel_path.replace('/', os.sep))
        if not os.path.exists(local_path):
            missing_local.append((img_url, source_file, local_path))
    elif img_url.startswith('http'):
        # Remote check
        if img_url in checked_remote:
            if not checked_remote[img_url]:
                dead_remote.append((img_url, source_file))
            continue
        try:
            req = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(req, timeout=5) as r:
                status = r.status
                checked_remote[img_url] = (status == 200)
                if status != 200:
                    dead_remote.append((img_url, source_file))
        except Exception as e:
            checked_remote[img_url] = False
            dead_remote.append((img_url, source_file))

print(f"\nMissing local images: {len(missing_local)}")
for m, src, lp in missing_local[:30]:
    print(f"  [MISSING] {m} (in {src})")

print(f"\nDead remote images: {len(dead_remote)}")
for d, src in dead_remote[:30]:
    print(f"  [DEAD REMOTE] {d} (in {src})")
