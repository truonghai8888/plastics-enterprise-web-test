import glob, re

for ext in ['jsx', 'js', 'html', 'css']:
    for p in glob.glob(f'src/**/*.{ext}', recursive=True) + glob.glob(f'*.{ext}'):
        with open(p, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        for m in re.finditer(r'(class(?:Name)?=[\'"][^\'"]*v3[^\'"]*[\'"])', content):
            print(f"{p}: {m.group(0)}")
