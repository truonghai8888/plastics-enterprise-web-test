import os
import sys
import json
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Referer': 'https://ecobamboo.vn/',
}

def get_safe_filename(url):
    parsed = urllib.parse.urlparse(url)
    path = parsed.path
    name = os.path.basename(path)
    if not name or '.' not in name:
        name = 'image_' + str(abs(hash(url))) + '.webp'
    # Sanitize filename
    name = "".join(c for c in name if c.isalnum() or c in ('-', '_', '.')).rstrip()
    return name

def download_image(url, out_dir):
    try:
        filename = get_safe_filename(url)
        out_path = os.path.join(out_dir, filename)
        if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
            return url, f"/images/ecobamboo/{filename}", True

        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(out_path, 'wb') as f:
                f.write(data)
        return url, f"/images/ecobamboo/{filename}", True
    except Exception as e:
        return url, None, False

def main():
    out_dir = os.path.join('public', 'images', 'ecobamboo')
    os.makedirs(out_dir, exist_ok=True)

    with open('scraped_data/all_images.json', 'r', encoding='utf-8') as f:
        urls = json.load(f)

    # Filter out external social icons / tracking pixels if any
    filtered = [u for u in urls if 'ecobamboo.vn' in u or u.startswith('/') or u.startswith('assets')]
    print(f"Total image URLs to download: {len(filtered)}")

    image_map = {}
    success_count = 0
    fail_count = 0

    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = {executor.submit(download_image, u, out_dir): u for u in filtered}
        for future in as_completed(futures):
            url, local_path, success = future.result()
            if success:
                success_count += 1
                image_map[url] = local_path
            else:
                fail_count += 1

    print(f"Download complete: {success_count} succeeded, {fail_count} failed.")

    # Save mapping for pages and components to use
    os.makedirs('src/data', exist_ok=True)
    with open('src/data/imageMap.json', 'w', encoding='utf-8') as f:
        json.dump(image_map, f, ensure_ascii=False, indent=2)

    # Also update page summaries with local paths
    with open('scraped_data/pages_summary.json', 'r', encoding='utf-8') as f:
        pages = json.load(f)

    for p in pages:
        p['local_images'] = [image_map.get(u) for u in p['images'] if u in image_map]

    with open('scraped_data/pages_summary_with_images.json', 'w', encoding='utf-8') as f:
        json.dump(pages, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
