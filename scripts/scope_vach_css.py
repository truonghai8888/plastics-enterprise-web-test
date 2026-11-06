with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Scope button
target_button = '''button{font-family:inherit;font-size:12.5px;font-weight:500;color:var(--muc);background:var(--nen);border:1px solid var(--vien);border-radius:9px;padding:7px 11px;line-height:1.25;cursor:pointer;transition:all .12s ease}'''
scoped_button = '''.v3 button, .bg-hop button, .pop button, #vachStudioMount button, [data-tang] button{font-family:inherit;font-size:12.5px;font-weight:500;color:var(--muc);background:var(--nen);border:1px solid var(--vien);border-radius:9px;padding:7px 11px;line-height:1.25;cursor:pointer;transition:all .12s ease}'''

if target_button in css:
    css = css.replace(target_button, scoped_button)
    print("Scoped button successfully")
else:
    # try regex replacement
    import re
    css, count = re.subn(r'(?:^|\})\s*button\s*\{', r'}.v3 button, .bg-hop button, .pop button, #vachStudioMount button, [data-tang] button{', css, count=1)
    print(f"Scoped button via regex (replaced: {count})")

# 2. Scope table, th, h1
css = css.replace('\ntable{border-collapse:collapse;width:100%;font-size:12px}', '\n.v3 table, .bg-hop table{border-collapse:collapse;width:100%;font-size:12px}')
css = css.replace('}th{font-size:10px;', '}.v3 th, .bg-hop th{font-size:10px;')
css = css.replace('\nh1{font-size:clamp(22px,3.4vw,30px);', '\n.v3 h1, .vach-h1{font-size:clamp(22px,3.4vw,30px);')

with open('public/assets/css/vach.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Scoping completed on public/assets/css/vach.css")
