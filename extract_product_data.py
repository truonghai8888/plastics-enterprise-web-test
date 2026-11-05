import os
import sys
import re
import json
sys.stdout.reconfigure(encoding='utf-8')

product_files = [
    ('EB66006', 'san-pham_tam-op-than-tre_van-go_tam-op-van-go-eb66006.html'),
    ('EB68038', 'san-pham_tam-op-than-tre_don-sac_whiteeb68038.html'),
    ('EB68032G', 'san-pham_tam-op-than-tre_don-sac_glossy-light-greyeb68032g.html'),
    ('EB68031G', 'san-pham_tam-op-than-tre_don-sac_glossy-whiteeb68031g.html'),
    ('EB89028', 'san-pham_tam-op-than-tre_van-da_luxe-eb89028.html'),
    ('EB68033G', 'san-pham_tam-op-than-tre_don-sac_glossy-dark-greyeb68033g.html'),
    ('EB68017', 'san-pham_tam-op-than-tre_don-sac_tam-op-don-sac-eb68017.html'),
    ('EB68037', 'san-pham_tam-op-than-tre_don-sac_light-greyeb68037.html'),
    ('EB68040G', 'san-pham_tam-op-than-tre_don-sac_glossy-latteeb68040.html'),
    ('EB79019', 'san-pham_tam-op-than-tre_van-vai_tam-op-van-vai-eb79019.html'),
    ('EB79021', 'san-pham_tam-op-than-tre_van-vai_tam-op-van-vai-eb79021.html'),
    ('EB89019G', 'san-pham_tam-op-than-tre_van-da_tam-op-van-da-petg-eb89019g.html'),
]

image_map = json.load(open('src/data/imageMap.json', encoding='utf-8'))
results = []

for code, fname in product_files:
    fpath = os.path.join('scraped_data', 'html', fname)
    if not os.path.exists(fpath):
        print(f"File not found: {fpath}")
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract Title (H1)
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
    title = re.sub(r'<[^>]+>', '', h1.group(1)).strip() if h1 else code

    # Extract price if present
    price_match = re.search(r'(\d+[\.\d]*)\s*đ\s*/\s*m²', html)
    price_str = price_match.group(0) if price_match else "Liên hệ"

    # Extract images from the page
    imgs = re.findall(r'<img[^>]*src=[\'"]([^\'"]+)[\'"]', html)
    local_imgs = []
    for img in imgs:
        full_url = "https://ecobamboo.vn" + img if img.startswith('/') else img
        loc = image_map.get(full_url)
        if loc and loc not in local_imgs and not loc.endswith('.svg') and 'logo' not in loc:
            local_imgs.append(loc)

    # Extract descriptions or paragraphs in the detail section
    paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', html, re.DOTALL)
    clean_p = [re.sub(r'<[^>]+>', '', p).strip() for p in paragraphs if len(re.sub(r'<[^>]+>', '', p).strip()) > 20]

    results.append({
        'code': code,
        'title': title,
        'price': price_str,
        'local_images': local_imgs[:6],
        'description': clean_p[0] if clean_p else "",
        'features': clean_p[1:4]
    })

print(f"Extracted info for {len(results)} products:")
for r in results:
    print(f"- {r['code']}: {r['title']} | Price: {r['price']} | Images: {len(r['local_images'])}")
    print(f"  Img: {r['local_images'][:2]}")

with open('src/data/extracted_products.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
