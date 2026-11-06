import re

with open('src/data/news.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines, 1):
    if re.search(r'kosmos|haroma', line, re.IGNORECASE):
        print(f"Line {idx}: {line.strip()[:140]}")
