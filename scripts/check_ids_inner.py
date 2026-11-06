with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
ids = re.findall(r'id=["\']([^"\']+)["\']', text)
print("Total IDs in inner html:", len(ids))
print("First 20 IDs:", ids[:20])
print("Last 20 IDs:", ids[-20:])

