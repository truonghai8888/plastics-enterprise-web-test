import re

with open('scraped_data/ecobamboo_vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Search for fetch / XMLHttpRequest / image paths / urls
fetch_urls = re.findall(r'fetch\(["\']([^"\']+)["\']', js)
print("Fetch calls in vach.js:", set(fetch_urls))

# Search for asset paths
asset_paths = re.findall(r'["\'](/assets/[^"\']+)["\']', js)
print("Assets paths:", set(asset_paths[:20]))

# Search for image paths
img_paths = re.findall(r'["\']([^"\']+\.(?:png|jpg|webp|svg|glb|gltf))["\']', js)
print("Image/3D model paths (sample):", set(img_paths[:20]))

# Check if there is brand text in vach.js
print("Occurrences of ecobamboo in vach.js:", len(re.findall(r'ecobamboo', js, re.IGNORECASE)))
