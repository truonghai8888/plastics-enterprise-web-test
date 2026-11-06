import urllib.request
import urllib.error

urls = [
    'http://localhost:3000/',
    'http://localhost:3000/tu-thiet-ke-vach',
    'http://localhost:3000/tinh-chi-phi',
    'http://localhost:3000/bang-gia',
    'http://localhost:3000/thu-vien-ma-mau',
    'http://localhost:3000/thu-vien-ma-mau/phoi-mau/',
    'http://localhost:3000/tin-tuc',
    'http://localhost:3000/nha-phan-phoi',
    'http://localhost:3000/san-pham-chinh',
    'http://localhost:3000/san-pham-chinh/tam-op-than-tre',
    'http://localhost:3000/assets/css/vach.css',
    'http://localhost:3000/assets/js/vach.js',
    'http://localhost:3000/assets/js/vach-data.js',
    'http://localhost:3000/assets/img/vach/mau-1.webp',
    'http://localhost:3000/assets/img/products/EB89001_sm.webp'
]

results = []
for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as res:
            code = res.getcode()
            length = len(res.read())
            results.append((u, code, length, "OK"))
    except Exception as e:
        results.append((u, 0, 0, str(e)))

print("VERIFICATION TEST RESULTS:")
all_ok = True
for u, code, length, status in results:
    print(f"[{code}] {u} - {length} bytes - {status}")
    if code != 200:
        all_ok = False

if all_ok:
    print("\nALL URLS RETURNED HTTP 200 OK!")
else:
    print("\nSOME URLS FAILED!")
