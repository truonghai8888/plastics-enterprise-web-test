import re

competitors = ['kosmos', 'ecovina', 'galawood', 'galwood', 'haroma', 'htwood', 'hwood', 'kwood', 'ecowood']

with open('src/data/news.js', 'r', encoding='utf-8') as f:
    text = f.read()

for c in competitors:
    matches = list(re.finditer(re.escape(c), text, re.IGNORECASE))
    print(f"Competitor '{c}': {len(matches)} occurrences")
    for m in matches[:5]:
        start = max(0, m.start() - 40)
        end = min(len(text), m.end() + 40)
        snippet = text[start:end].replace('\n', ' ')
        print(f"   [{snippet}]")
