import re

files = [
    'public/tu-thiet-ke-vach/index.html',
    'public/assets/css/vach.css',
    'public/assets/css/eb.css',
    'public/assets/js/vach.js',
    'public/assets/js/eb.js'
]

# Patterns for green colors: #24700B, #2e8a0e, rgb with green dominant, green words
green_patterns = [
    re.compile(r'#24700[bB]', re.I),
    re.compile(r'#1[aA]5208', re.I),
    re.compile(r'#2[eE]8[aA]0[eE]', re.I),
    re.compile(r'#3[dD][aA]818', re.I),
    re.compile(r'#0[fF]3505', re.I),
    re.compile(r'#195207', re.I),
    re.compile(r'#2d8c0d', re.I),
    re.compile(r'#1e5f09', re.I),
    re.compile(r'#339900', re.I),
    re.compile(r'#28a745', re.I),
    re.compile(r'#10b981', re.I),
    re.compile(r'#059669', re.I),
    re.compile(r'#047857', re.I),
    re.compile(r'#065f46', re.I),
    re.compile(r'#064e3b', re.I),
    re.compile(r'rgba?\(\s*\d+\s*,\s*(?:1[2-9]\d|2\d\d)\s*,\s*\d+\s*(?:,[^)]+)?\)', re.I) # high green component
]

for p in files:
    with open(p, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    found = []
    for pat in green_patterns:
        matches = list(pat.finditer(text))
        if matches:
            found.append((pat.pattern, len(matches)))
    if found:
        print(f"File {p}:")
        for pat_str, count in found:
            print(f"  Pattern {pat_str}: {count} occurrences")

