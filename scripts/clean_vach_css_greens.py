with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

replacements = [
    (r'rgba\(36,112,11,', 'rgba(222,170,38,'),
    (r'rgba\(28,107,74,', 'rgba(184,139,27,'),
    (r'rgba\(20,100,45,', 'rgba(143,108,21,'),
    (r'rgba\(26,160,74,', 'rgba(222,170,38,'),
    (r'#1aa04a', '#deaa26'),
    (r'#24700b', '#deaa26'),
    (r'#24700B', '#deaa26'),
    (r'#1e5f09', '#b88b1b'),
    (r'#2d8c0d', '#deaa26'),
    (r'#339900', '#deaa26'),
]

for old, new in replacements:
    css = css.replace(old, new)

with open('public/assets/css/vach.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Sanitized all green shades in public/assets/css/vach.css")
