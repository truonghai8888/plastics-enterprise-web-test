import re

def clean_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    orig_len = len(content)
    for old, new in replacements:
        content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Cleaned {path} (size: {orig_len} -> {len(content)})")

# 1. Clean public/assets/css/vach.css
vach_css_reps = [
    ('--nhan:#1c6b4a;', '--nhan:#deaa26;'),
    ('--nhan-nh:#e3efe8;', '--nhan-nh:rgba(222,170,38,0.15);'),
    ('--nhan:#5cc294;', '--nhan:#deaa26;'),
    ('--nhan-nh:#163024;', '--nhan-nh:rgba(222,170,38,0.15);'),
    ('rgba(28,107,74,.92)', 'rgba(222,170,38,.92)'),
    ('#8fe3bd', '#deaa26'),
    ('#9ef7c4', '#fdf6e7'),
    ('#1ac75c', '#deaa26'),
    ('#0d6b31', '#b88b1b'),
    ('#1f7a3d', '#deaa26'),
    ('#1c6b4a', '#deaa26'),
    ('rgba(20,100,45,.92)', 'rgba(222,170,38,.92)'),
    ('rgba(26,160,74,.12)', 'rgba(222,170,38,.15)'),
    ('rgba(36,112,11,', 'rgba(222,170,38,'),
    ('rgba(36, 112, 11,', 'rgba(222, 170, 38,'),
    ('#0a7a3a', '#deaa26'),
    ('#5cc294', '#deaa26'),
]
clean_file('public/assets/css/vach.css', vach_css_reps)

# 2. Clean public/assets/js/vach.js
vach_js_reps = [
    ('"#1ac75c"', '"#deaa26"'),
    ("'#1ac75c'", "'#deaa26'"),
    ('"#0a7a3a"', '"#deaa26"'),
    ("'#0a7a3a'", "'#deaa26'"),
    ('#0d6b31', '#b88b1b'),
    ('#1f7a3d', '#deaa26'),
    ('rgba(36,112,11,', 'rgba(222,170,38,'),
]
clean_file('public/assets/js/vach.js', vach_js_reps)
