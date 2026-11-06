import urllib.request
import re

with urllib.request.urlopen('http://localhost:3000/tu-thiet-ke-vach') as response:
    html = response.read().decode('utf-8')

scripts = re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', html)
print('Scripts in index.html:', scripts)

for s in scripts:
    url = f'http://localhost:3000{s}'
    with urllib.request.urlopen(url) as res:
        js = res.read().decode('utf-8')
        print(f'Fetched {s}: {len(js)} bytes')
        matches = [m.start() for m in re.finditer(r'Sản phẩm chính', js)]
        if matches:
            idx = matches[0]
            print('Context around Sản phẩm chính in bundle:')
            print(js[max(0, idx-200):min(len(js), idx+300)])
