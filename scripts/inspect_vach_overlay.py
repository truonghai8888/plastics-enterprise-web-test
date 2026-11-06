import re

with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

keywords = ['v3-nhac', 'v3-moc', 'kyhieu', 'hud', 'v3-san', 'man hinh', 'overlay']
for kw in keywords:
    matches = [m.start() for m in re.finditer(kw, css)]
    print(f"=== Keyword: {kw} (found {len(matches)}) ===")
    for idx in matches[:3]:
        print(css[max(0, idx-50):min(len(css), idx+200)])
        print('-'*40)
