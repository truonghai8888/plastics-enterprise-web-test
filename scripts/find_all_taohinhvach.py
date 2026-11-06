import os, glob

for root, dirs, files in os.walk('.'):
    if any(p in root for p in ['.git', 'node_modules', '.gemini']): continue
    for f in files:
        if f.endswith(('.js', '.jsx', '.html', '.css', '.json', '.md')):
            p = os.path.join(root, f)
            try:
                with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()
                    if 'Tạo hình vách' in content or 'tạo hình vách' in content:
                        print(f"File: {p}")
                        for line in content.splitlines():
                            if 'tạo hình vách' in line.lower():
                                print(f"  {line[:140]}")
            except Exception as e:
                pass
