import re

with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    vcss = f.read()

matches = [m.start() for m in re.finditer(r'#24700b', vcss, re.IGNORECASE)]
print("Occurrences of #24700b in vach.css:", len(matches))
for pos in matches[:5]:
    print(vcss[max(0, pos - 40):min(len(vcss), pos + 60)].replace('\n', ' '))

with open('public/assets/css/eb.css', 'r', encoding='utf-8') as f:
    ebcss = f.read()

matches_eb = [m.start() for m in re.finditer(r'#24700b', ebcss, re.IGNORECASE)]
print("Occurrences of #24700b in eb.css:", len(matches_eb))
for pos in matches_eb[:5]:
    print(ebcss[max(0, pos - 40):min(len(ebcss), pos + 60)].replace('\n', ' '))
