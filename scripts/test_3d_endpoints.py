import urllib.request

urls = [
    'http://localhost:3000/tu-thiet-ke-vach/',
    'http://localhost:3000/tu-thiet-ke-vach',
    'http://localhost:3000/assets/css/eb.css',
    'http://localhost:3000/assets/css/vach.css',
    'http://localhost:3000/assets/js/vach.js',
    'http://localhost:3000/assets/js/eb.js',
    'http://localhost:3000/assets/fonts/bvp-400-vietnamese.woff2',
    'http://localhost:3000/assets/fonts/bvp-400.ttf',
    'http://localhost:3000/assets/fonts/bvp-700.ttf',
    'http://localhost:3000/assets/img/vach/mau/a_khe.webp'
]

print("TESTING 3D STUDIO ENDPOINTS:")
for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as res:
            data = res.read()
            print(f"[{res.getcode()}] {u} -> {len(data)} bytes")
    except Exception as e:
        print(f"[FAIL] {u} -> {e}")
