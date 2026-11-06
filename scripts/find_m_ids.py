import re
with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

for word in ['doKL', 'guKhoi', 'bangKL']:
    print(f"=== {word} ===")
    matches = [m.start() for m in re.finditer(word, text)]
    for idx in matches[:5]:
        print(text[max(0, idx-100):min(len(text), idx+100)])
