import urllib.request
import urllib.parse
import json

base = "http://localhost:3000"

# 1. Test Page
req = urllib.request.Request(f"{base}/tu-thiet-ke-vach", headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=5) as res:
    html = res.read().decode('utf-8', errors='ignore')
    print(f"GET /tu-thiet-ke-vach -> Code {res.getcode()}, Length {len(html)}")

    # Assert AMC Brand presence
    assert "NHỰA AMC" in html or "Nhựa AMC" in html, "AMC Brand missing!"
    assert "0325.999.238" in html, "Hotline AMC missing!"
    assert "CCN Kim Bình, Phù Vân, Ninh Bình" in html, "Factory address missing!"
    assert "ctyphattriennhuaamc@gmail.com" in html, "Email AMC missing!"
    assert "amcplastic_" in html, "TikTok link missing!"
    assert "--xanh: #deaa26" in html, "Gold primary theme missing!"
    print("✓ All brand elements successfully validated in page HTML!")

# 2. Test API web-lead POST
data = json.dumps({"ten": "Nguyễn Văn Test", "sdt": "0987654321", "loai": "baogia"}).encode('utf-8')
post_req = urllib.request.Request(f"{base}/api/web-lead", data=data, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(post_req, timeout=5) as res:
    res_body = res.read().decode('utf-8')
    print(f"POST /api/web-lead -> Code {res.getcode()}, Body: {res_body}")
    assert res.getcode() == 200, "API failed!"
    print("✓ Form submission endpoint /api/web-lead responds HTTP 200 successfully!")

# 3. Test Static Assets
assets = [
    "/assets/css/vach.css",
    "/assets/css/eb.css",
    "/assets/js/vach.js",
    "/assets/js/eb.js",
    "/assets/fonts/bvp-400.ttf",
    "/assets/fonts/bvp-700.ttf",
    "/assets/fonts/bvp-400-vietnamese.woff2",
    "/assets/fonts/bvp-400-latin.woff2",
    "/assets/img/vach/mau/a_khe.webp",
    "/assets/img/products/EB89001_sm.webp",
    "/images/nhuaamc/logo-amc2.jpg"
]

print("\nVerifying static assets for 3D studio:")
all_assets_ok = True
for a in assets:
    try:
        r = urllib.request.urlopen(f"{base}{a}", timeout=5)
        print(f" [{r.getcode()}] {a} ({len(r.read())} bytes)")
    except Exception as e:
        print(f" [FAIL] {a} -> {e}")
        all_assets_ok = False

if all_assets_ok:
    print("\n✓ ALL 3D STUDIO ASSETS VERIFIED WITH HTTP 200 OK!")
