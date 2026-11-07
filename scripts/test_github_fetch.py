import urllib.request

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Sec-Fetch-Dest': 'image',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'same-origin',
    'Referer': 'https://truonghai8888.github.io/plastics-enterprise-web-test/tu-thiet-ke-vach'
}

url = 'https://truonghai8888.github.io/plastics-enterprise-web-test/assets/img/vach/mau/trong.webp'
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        print("Status:", resp.status)
        print("Headers:", resp.headers)
        body = resp.read()
        print("Body length:", len(body))
        print("Body start:", body[:32])
except Exception as e:
    print("Error:", e)
