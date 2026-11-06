with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
rules = re.findall(r'([^{}]+)\{([^{}]+)\}', text)

print("Checking tag-only or bare selectors in vach.css:")
bare_tags = ['button', 'input', 'select', 'textarea', 'a', 'h1', 'h2', 'h3', 'h4', 'p', 'b', 'i', 'canvas', 'svg', 'table', 'td', 'th', 'tr', 'ul', 'li', 'summary', 'details']

for sel, body in rules:
    sel = sel.strip()
    if sel.startswith('@') or sel.startswith('from') or sel.startswith('to') or '%' in sel:
        continue
    for s in sel.split(','):
        s = s.strip()
        # strip pseudo classes
        base = re.sub(r':[\w\-\(\)]+', '', s).strip()
        if base in bare_tags or any(base == f"{t}.{c}" for t in bare_tags for c in ['ch', 'ph', 'to', 'on']):
            print(f"BARE TAG: [{s}] in [{sel}] => {body[:50]}")
