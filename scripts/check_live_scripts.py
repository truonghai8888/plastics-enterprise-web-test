import urllib.request
import re

req = urllib.request.Request('https://truonghai8888.github.io/plastics-enterprise-web-test/tu-thiet-ke-vach', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

scripts = re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', html)
print("Scripts in live html:")
for s in scripts:
    print(s)
