import json
import base64

with open('src/data/vachHs.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

logo_data = d.get('LOGO', '')
if logo_data.startswith('data:image/svg+xml;base64,'):
    raw_b64 = logo_data.replace('data:image/svg+xml;base64,', '')
    svg = base64.b64decode(raw_b64).decode('utf-8')
    print("Decoded SVG Logo:")
    print(svg[:400])
