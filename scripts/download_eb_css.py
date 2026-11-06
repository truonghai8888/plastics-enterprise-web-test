import urllib.request
import os

url = "https://ecobamboo.vn/assets/css/eb.css"
os.makedirs("public/assets/css", exist_ok=True)
dest = "public/assets/css/eb.css"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as res:
        content = res.read()
        with open(dest, 'wb') as f:
            f.write(content)
        print(f"Downloaded eb.css: {len(content)} bytes")
except Exception as e:
    print("Error downloading eb.css:", e)
