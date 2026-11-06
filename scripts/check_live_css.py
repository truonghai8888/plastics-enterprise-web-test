import urllib.request
import re

with urllib.request.urlopen('http://localhost:3000/tu-thiet-ke-vach') as response:
    html = response.read().decode('utf-8')

css_links = re.findall(r'<link[^>]+href=[\'"]([^\'"]+\.css)[\'"]', html)
print('CSS links in index.html:', css_links)

for c in css_links:
    url = f'http://localhost:3000{c}'
    with urllib.request.urlopen(url) as res:
        content = res.read().decode('utf-8')
        print(f'Fetched {c}: {len(content)} bytes')
        matches = re.findall(r'button[^{]*\{[^}]*\}', content)
        print('Button rules in index css:', len(matches))
        for m in matches[:5]:
            print('  ', m[:80])
