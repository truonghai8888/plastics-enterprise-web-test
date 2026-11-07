import urllib.request

url = 'https://truonghai8888.github.io/plastics-enterprise-web-test/assets/js/vach.js'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    js = resp.read().decode('utf-8', errors='ignore')

idx = js.find('dungBoMau()')
print(js[idx:idx+1200])
