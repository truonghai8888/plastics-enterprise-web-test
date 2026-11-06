import re

with open('public/tu-thiet-ke-vach/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

forms = re.findall(r'<form\b.*?</form>', html, re.DOTALL)
for idx, fm in enumerate(forms, 1):
    print(f"=== FORM {idx} ===")
    print(fm[:600])
