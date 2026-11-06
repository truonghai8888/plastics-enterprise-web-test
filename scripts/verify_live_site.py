import urllib.request
import re

endpoints = ['/', '/tu-thiet-ke-vach', '/thu-vien-ma-mau', '/san-pham-chinh', '/bang-gia', '/tinh-chi-phi']
for ep in endpoints:
    url = f'http://localhost:3000{ep}'
    try:
        with urllib.request.urlopen(url) as res:
            print(f'{ep}: status {res.status}, length {len(res.read())}')
    except Exception as e:
        print(f'{ep}: ERROR {e}')

# Check the live bundle content
with urllib.request.urlopen('http://localhost:3000/tu-thiet-ke-vach') as res:
    html = res.read().decode('utf-8')

scripts = re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', html)
for s in scripts:
    with urllib.request.urlopen(f'http://localhost:3000{s}') as res:
        js = res.read().decode('utf-8')
        print(f'Checking {s} for Header buttons:')
        matches = [m.start() for m in re.finditer(r'Sản phẩm chính', js)]
        if matches:
            idx = matches[0]
            print(js[max(0, idx-150):min(len(js), idx+200)])
