import glob, re

for p in ['src/pages/WallDesignerPage.jsx', 'public/assets/css/vach.css']:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    for name in ['v3-btn-icon', 'v3-btn-nav', 'v3-btn-action', 'v3-btn-cta', 'v3-dau-so']:
        matches = re.findall(rf'([^\n]*{name}[^\n]*)', c)
        print(f"{p} has {len(matches)} matches for {name}")
