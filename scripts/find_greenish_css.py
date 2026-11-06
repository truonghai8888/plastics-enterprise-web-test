with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = list(re.finditer(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)', css))
print("Total rgb/rgba in vach.css:", len(matches))
greenish = []
for m in matches:
    r, g, b = int(m.group(1)), int(m.group(2)), int(m.group(3))
    # If green is significantly higher than red and blue, or typical bamboo green (e.g. 36, 112, 11 or 46, 138, 14 or 26, 82, 8)
    if (g > r and g > b and g > 50) or (r < 60 and g > 80):
        greenish.append((m.group(0), r, g, b, m.start()))

print(f"Greenish colors found: {len(greenish)}")
for c, r, g, b, pos in greenish[:15]:
    start = max(0, pos - 40)
    end = min(len(css), pos + 60)
    print(f"  {c} -> [{css[start:end].replace(chr(10), ' ')}]")

