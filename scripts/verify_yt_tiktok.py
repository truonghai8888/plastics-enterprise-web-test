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

    has_yt = "@Nh%E1%BB%B1aAMC" in js
    has_tiktok = "amcplastic_" in js

    print("1. New YouTube link in bundle:", has_yt)
    print("2. New TikTok link in bundle:", has_tiktok)
else:
    print("Bundle not found")
