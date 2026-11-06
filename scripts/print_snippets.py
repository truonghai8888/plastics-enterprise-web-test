import re

with open('src/data/news.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line_num in [232, 376]:
    text = lines[line_num - 1]
    matches = list(re.finditer(r'kosmos|haroma', text, re.IGNORECASE))
    for m in matches:
        start = max(0, m.start() - 30)
        end = min(len(text), m.end() + 30)
        print(f"Line {line_num}: [{text[start:end]}]")
