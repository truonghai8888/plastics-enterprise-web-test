import os
import re

print("=== CHECKING ALL LOCAL IMAGE PATHS ===")

all_local_images = set()

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.json')):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
                matches = re.findall(r'[\'"](/images/[^\'"\s]+|/assets/[^\'"\s]+)[\'"]', content)
                for m in matches:
                    if any(m.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']):
                        all_local_images.add((m, filepath))

print(f"Total local image references: {len(all_local_images)}")

missing = []
for img_path, src_file in sorted(all_local_images):
    rel = img_path.lstrip('/')
    disk_path = os.path.join('public', rel.replace('/', os.sep))
    if not os.path.exists(disk_path):
        missing.append((img_path, src_file, disk_path))

print(f"Missing images count: {len(missing)}")
for m, src, dp in missing:
    print(f"  [MISSING] {m} referenced in {src}")
