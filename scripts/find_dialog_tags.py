with open('public/vach-studio.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
dialogs = re.findall(r'<dialog[^>]*>.*?</dialog>', html, re.DOTALL)
print(f"Total dialogs: {len(dialogs)}")
for d in dialogs:
    tag = re.search(r'<dialog[^>]*>', d).group(0)
    print(tag)
