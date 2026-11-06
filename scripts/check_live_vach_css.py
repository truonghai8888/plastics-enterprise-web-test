import urllib.request
import re

url = 'http://localhost:3000/assets/css/vach.css'
with urllib.request.urlopen(url) as res:
    content = res.read().decode('utf-8')
    print(f'Fetched vach.css: {len(content)} bytes')
    for line in content.split('\n')[:50]:
        if 'button' in line:
            print('Line with button:', line[:120])
