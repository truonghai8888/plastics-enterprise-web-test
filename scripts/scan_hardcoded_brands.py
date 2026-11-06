import os
import re

files_to_check = []
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx')):
            # skip brandConfig.js itself
            if f == 'brandConfig.js':
                continue
            files_to_check.append(os.path.join(root, f))

patterns = [
    re.compile(r'\b(Eco\s*Bamboo|ECOBAMBOO)\b', re.IGNORECASE),
    re.compile(r'\bNhựa AMC\b'),
    re.compile(r'Công ty TNHH\s+[^\n<"]+')
]

findings = []
for p in files_to_check:
    with open(p, 'r', encoding='utf-8', errors='ignore') as f:
        for idx, line in enumerate(f, 1):
            # Ignore comments or import lines if any
            if line.strip().startswith('//') or line.strip().startswith('/*') or line.strip().startswith('*'):
                continue
            # Also ignore image paths like /images/ecobamboo/
            line_no_img = re.sub(r'/images/ecobamboo/[^\s"\']+', '', line)
            line_no_img = re.sub(r'ecobamboo\.vn', '', line_no_img)
            line_no_img = re.sub(r'nhuaamc\.vn', '', line_no_img)

            for pat in patterns:
                m = pat.search(line_no_img)
                if m:
                    findings.append((p, idx, line.strip()))
                    break

print(f"Total occurrences found: {len(findings)}")
for p, idx, line in findings:
    print(f"{p}:{idx} -> {line[:120]}")
