with open('scripts/localhost_dump.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
m = re.search(r'<div class="bo-mau" id="boMau">([\s\S]*?)</div>', html)
if m:
    print(m.group(0)[:1500])
else:
    print("Not found")
