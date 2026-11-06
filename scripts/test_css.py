import glob, re

files = ['public/assets/css/vach.css', 'src/pages/WallDesignerPage.jsx']

for p in files:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    clean = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    for rule in clean.split('}'):
        if '{' not in rule: continue
        sel, body = rule.split('{', 1)
        for s in sel.split(','):
            s = s.strip()
            tokens = s.split()
            last_token = tokens[-1] if tokens else ''
            if last_token == 'button' or last_token.startswith('button:'):
                parents = tokens[:-1]
                print(f'{p}: selector="{s}" -> {body.strip()[:60]}')
