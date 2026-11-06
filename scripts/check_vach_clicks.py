with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
# Find all onclick = or addEventListener("click"
clicks = re.findall(r'(\w+)\.onclick\s*=\s*(?:function|\([^)]*\)|[a-zA-Z0-9_]+)', js)
print("onclick assignments in vach.js:", len(clicks))
print("Sample clicked elements:", list(set(clicks))[:30])

# Find addEventListener click
listeners = re.findall(r'(\w+)\.addEventListener\([\'"]click[\'"]', js)
print("addEventListener click in vach.js:", len(listeners))
print("Sample element variables:", list(set(listeners))[:20])
