with open('live_desktop_dom.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
html_tag = re.search(r'<html[^>]*>', text)
print("html tag:", html_tag.group(0) if html_tag else "None")

cot = re.search(r'<nav id="v3Cot"[^>]*>(.*?)</nav>', text, re.DOTALL)
if cot:
    print("v3Cot inner length:", len(cot.group(1)))
    print("v3Cot buttons:", re.findall(r'<button[^>]*>.*?</button>', cot.group(1)))
else:
    print("v3Cot NOT FOUND!")

bang = re.search(r'<main id="v3Bang"[^>]*>(.*?)</main>', text, re.DOTALL)
if bang:
    print("v3Bang inner length:", len(bang.group(1)))
    print("v3Bang first 500 chars:", bang.group(1)[:500])
else:
    print("v3Bang NOT FOUND!")

so = re.search(r'<div[^>]*id="v3So"[^>]*>(.*?)</div>', text, re.DOTALL)
if so:
    print("v3So inner length:", len(so.group(1)))
    print("v3So content:", so.group(1))
