with open('src/data/vachHs.json', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'#24700[bB]|#CC8D00', text)
print("Colors in vachHs.json:", set(matches))
print(text[:400])
