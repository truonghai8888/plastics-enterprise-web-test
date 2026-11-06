with open('live_desktop_dom.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
mount = re.search(r'<div id="vachStudioMount"[^>]*>(.*?)</div>\s*</div>\s*</div>\s*<div class="py-12', text, re.DOTALL)
if mount:
    print("Found mount! Length:", len(mount.group(1)))
    print("First 1000 chars:")
    print(mount.group(1)[:1000])
    print("...")
    print("Last 1000 chars:")
    print(mount.group(1)[-1000:])
else:
    print("Mount not matched with regex, searching by index...")
    idx = text.find('id="vachStudioMount"')
    print(text[idx:idx+2000])

