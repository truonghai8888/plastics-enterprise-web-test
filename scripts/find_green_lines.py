import re

def inspect_lines(filename, patterns):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    print(f"=== {filename} ===")
    for i, line in enumerate(lines):
        for p in patterns:
            if p.lower() in line.lower():
                print(f"Line {i+1}: {line.strip()[:160]}")
                break

patterns = ['#9ef7c4', '#8fe3bd', '#5cc294', '#1ac75c', '#0d6b31', '#1f7a3d', '#1c6b4a', '20,100,45', '26,160,74', '28,107,74', '36,112,11', '#0a7a3a']
inspect_lines('public/assets/css/vach.css', patterns)
inspect_lines('public/assets/js/vach.js', patterns)
