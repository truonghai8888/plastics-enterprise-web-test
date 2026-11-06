import urllib.request
import re

with urllib.request.urlopen('http://localhost:3000/', timeout=5) as resp:
    html = resp.read().decode('utf-8')

m = re.search(r'src="(/assets/index-[^"]+\.js)"', html)
if m:
    bundle_url = f'http://localhost:3000{m.group(1)}'
    print(f'Fetching bundle: {bundle_url}')
    with urllib.request.urlopen(bundle_url, timeout=10) as r:
        js = r.read().decode('utf-8')

    has_new_fb = "61558413806518" in js
    has_bando_text = "(Bản đồ Google Maps)" in js

    print("1. New Facebook profile link in bundle:", has_new_fb)
    print("2. Raw '(Bản đồ Google Maps)' text removed:", not has_bando_text)
else:
    print("Bundle not found")
