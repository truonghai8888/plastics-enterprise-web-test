with open('public/assets/css/eb.css', 'r', encoding='utf-8') as f:
    css = f.read()

replacements = [
    ('#24700B', '#deaa26'),
    ('#24700b', '#deaa26'),
    ('#1A5208', '#2e2b27'),
    ('#2E8A0E', '#b88b1b'),
    ('#3DA818', '#e6b83b'),
    ('#0F3505', '#1e1c19'),
    ('rgba(36,112,11,', 'rgba(222,170,38,'),
]

for old, new in replacements:
    css = css.replace(old, new)

with open('public/assets/css/eb.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Sanitized eb.css greens.")
