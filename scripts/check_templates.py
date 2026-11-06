with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
templates = ['tMoi', 'tMau', 'tKT', 'tChia', 'tVat', 'tBC', 'khoDk', 'v3Cot', 'v3San', 'v3Bang', 'c', 'v3So', 'v3Lui', 'v3Toi']
for tid in templates:
    print(f"{tid}: in VACH_STUDIO_INNER_HTML? {tid in text}")

