with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
matches = re.findall(r'<div[^>]*id="mBaoGia"[^>]*>.*?(?=</aside>|</body>|<script|<div class="ft|\Z)', html, re.DOTALL)
if matches:
    print("Found mBaoGia length:", len(matches[0]))
    with open('scraped_data/mBaoGia.html', 'w', encoding='utf-8') as out:
        out.write(matches[0])
else:
    # Search without div
    idx = html.find('id="mBaoGia"')
    print("mBaoGia index:", idx)
    if idx != -1:
        snippet = html[max(0, idx - 100):min(len(html), idx + 2000)]
        print(snippet[:500])
