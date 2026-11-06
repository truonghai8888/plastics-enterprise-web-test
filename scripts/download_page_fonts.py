import urllib.request
import os

items = [
    "/assets/fonts/bvp-400-vietnamese.woff2",
    "/assets/fonts/bvp-400-latin.woff2",
    "/assets/img/icon-180.png",
    "/assets/img/favicon-32.png",
    "/assets/img/favicon.png"
]

base_url = "https://ecobamboo.vn"

for it in items:
    url = base_url + it
    dest = os.path.join("public", it.lstrip('/\\').replace('/', os.sep))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if not os.path.exists(dest):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as res:
                content = res.read()
                with open(dest, 'wb') as f:
                    f.write(content)
                print(f"Downloaded {it}: {len(content)} bytes")
        except Exception as e:
            print(f"Error downloading {it}: {e}")
