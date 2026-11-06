import urllib.request
import re

url = 'http://localhost:3000/tu-thiet-ke-vach'
with urllib.request.urlopen(url) as res:
    html = res.read().decode('utf-8')
    print("HTTP Status:", res.status)

scripts = re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', html)
for s in scripts:
    with urllib.request.urlopen(f'http://localhost:3000{s}') as res:
        js = res.read().decode('utf-8')
        print(f"Bundle {s}:")
        print("  Has v3-dau-parent:", 'v3-dau-parent' in js)
        print("  Has v3-dau-trai:", 'v3-dau-trai' in js)
        print("  Has qUndo:", 'qUndo' in js)
        print("  Has qBaoGia:", 'qBaoGia' in js)
        print("  Has v3So:", 'v3So' in js)
