import urllib.request
import re

url = 'http://localhost:3000/assets/index-De9NXw4I.js'
with urllib.request.urlopen(url) as res:
    js = res.read().decode('utf-8')

for m in re.finditer(r'v3-dau-trai', js):
    idx = m.start()
    print("Match at", idx, ":")
    print(js[max(0, idx-60):min(len(js), idx+100)])
