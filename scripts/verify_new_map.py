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
    has_new_link = "20%C2%B034'25.8%22N+105%C2%B054'52.4%22E" in js
    has_new_embed = "20.573843,105.914549" in js
    print('New Google Maps URL in bundle:', has_new_link)
    print('New Google Maps Embed coordinates in bundle:', has_new_embed)
else:
    print('Bundle not found')
