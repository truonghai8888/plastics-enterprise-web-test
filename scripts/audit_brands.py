import os
import re

print("=== AUDITING HARDCODED BRAND STRINGS IN SRC ===")

patterns = [
    (r'\bECOBAMBOO\b', 'Hardcoded uppercase ECOBAMBOO'),
    (r'\bEcobamboo\b', 'Hardcoded Ecobamboo'),
    (r'Eco\s*Bamboo', 'Hardcoded Eco Bamboo'),
    (r'Nhựa\s*AMC', 'Hardcoded Nhựa AMC'),
    (r'\bAMC\b', 'Hardcoded AMC acronym'),
]

files_with_brand = {}

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx')):
            filepath = os.path.join(root, f)
            # Skip brandConfig.js as it defines the brands
            if 'brandConfig.js' in filepath:
                continue
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as fp:
                lines = fp.readlines()
                for line_idx, line in enumerate(lines):
                    # Skip comments or imports of brandConfig
                    if 'import BRAND' in line or 'from \'../config/brandConfig\'' in line or 'from "./config/brandConfig"' in line:
                        continue
                    # Check patterns
                    for pat, desc in patterns:
                        if re.search(pat, line):
                            # record
                            if filepath not in files_with_brand:
                                files_with_brand[filepath] = []
                            files_with_brand[filepath].append((line_idx + 1, line.strip(), desc))

for fp, matches in sorted(files_with_brand.items()):
    print(f"\n{fp} ({len(matches)} occurrences):")
    for lnum, ltext, desc in matches[:10]:
        print(f"  Line {lnum}: {ltext[:90]}  --> [{desc}]")
