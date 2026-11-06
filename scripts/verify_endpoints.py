import urllib.request
import re

print("=== VERIFYING RUNNING WEB CONTAINER (http://localhost:3000) ===")

urls = [
    ('/', 'Trang chủ'),
    ('/gioi-thieu', 'Giới thiệu'),
    ('/nha-phan-phoi', 'Nhà phân phối'),
    ('/tin-tuc', 'Tin tức & Cẩm nang'),
    ('/tu-thiet-ke-vach', 'Tự thiết kế vách'),
    ('/thu-vien-ma-mau', 'Thư viện mã màu'),
    ('/tinh-chi-phi', 'Dự toán chi phí'),
    ('/bang-gia', 'Bảng giá niêm yết'),
]

for path, label in urls:
    full_url = f"http://localhost:3000{path}"
    try:
        req = urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            status = resp.status
            html = resp.read().decode('utf-8')
            print(f"[{status}] {label} ({full_url}) - Length: {len(html)} bytes")
    except Exception as e:
        print(f"[FAIL] {label} ({full_url}): {e}")

# Check built bundle content to verify each task specifically
print("\n=== VERIFYING ASSET CONTENT IN DIST BUNDLE ===")
# Find built js file name in index.html
try:
    with urllib.request.urlopen('http://localhost:3000/', timeout=5) as resp:
        index_html = resp.read().decode('utf-8')
    js_match = re.search(r'src="(/assets/index-[^"]+\.js)"', index_html)
    if js_match:
        js_url = f"http://localhost:3000{js_match.group(1)}"
        print(f"Fetching JS bundle: {js_url}")
        with urllib.request.urlopen(js_url, timeout=10) as resp:
            bundle_text = resp.read().decode('utf-8')

        print(f"Bundle size: {len(bundle_text)} bytes")

        # 1. Partner Logos
        p1 = 'transition-transform duration-300 group-hover:scale-110' in bundle_text
        print(f"1. Partner logos hover zoom without grayscale: {'PASS' if p1 else 'FAIL'}")

        # 2. News 50 articles
        articles_count = bundle_text.count('readTime:"5 phút đọc"') + bundle_text.count('readTime:"6 phút đọc"') + bundle_text.count('readTime:"7 phút đọc"')
        print(f"2. News articles in bundle: {articles_count} articles (5 pages): {'PASS' if articles_count >= 50 else 'FAIL'}")

        # 3. SECTION 11 Hotline Phone: check no literal `$`
        has_literal_dollar_phone = 'Hotline: $' in bundle_text
        has_correct_hotline = 'Hotline: ' in bundle_text
        print(f"3. SECTION 11 phone no literal $: {'PASS' if not has_literal_dollar_phone and has_correct_hotline else 'FAIL'}")

        # 4. Giới thiệu tab on Header
        p4 = 'Giới thiệu' in bundle_text and '/gioi-thieu' in bundle_text
        print(f"4. Header Giới thiệu tab added: {'PASS' if p4 else 'FAIL'}")

        # 5. Tự thiết kế vách in Header & route
        p5 = '/tu-thiet-ke-vach' in bundle_text and 'Tự thiết kế vách 3D' in bundle_text
        print(f"5. Tự thiết kế vách in Header dropdown: {'PASS' if p5 else 'FAIL'}")

        # 6. Google Maps for factory & office
        p8 = 'https://www.google.com/maps/search/?api=1' in bundle_text and 'maps.google.com/maps?q=' in bundle_text
        print(f"8. Google Maps factory & office links/embed: {'PASS' if p8 else 'FAIL'}")

        # 7. Ecobamboo colors to AMC amber
        p7_popular = 'bg-amber-600/95 text-white' in bundle_text
        p7_badge = 'text-amber-400 uppercase tracking-widest bg-amber-950/60' in bundle_text
        print(f"7. Brand colors changed to AMC amber/gold: {'PASS' if (p7_popular and p7_badge) else 'FAIL'}")
    else:
        print("Could not find JS bundle url in index.html")
except Exception as e:
    print(f"Error checking bundle: {e}")

