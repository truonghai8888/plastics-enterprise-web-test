with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
for term in ['doKL', 'bangKL', 'guKhoi']:
    all_matches = [m.start() for m in re.finditer(re.escape(term), text)]
    print(f"Term '{term}': {len(all_matches)} occurrences")
    for pos in all_matches:
        print(f"  at {pos}: {text[max(0, pos-40):min(len(text), pos+80)].strip()}")
