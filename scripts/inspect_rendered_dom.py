with open('test_rendered_dom.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

print("Length of rendered DOM:", len(text))
print("Has header:", 'hdr' in text or 'header' in text)
print("Has v3-dau:", 'v3-dau' in text)
print("Has canvas:", '<canvas id="c"' in text)
print("Has v3-san:", 'v3-san' in text)
print("Has v3-cot:", 'v3-cot' in text)
print("Has v3-bang:", 'v3-bang' in text)

# Check if v3Cot has any children
idx = text.find('id="v3Cot"')
if idx != -1:
    print("v3Cot content:", text[idx:idx+300])
else:
    print("v3Cot not found")

idx2 = text.find('id="v3Bang"')
if idx2 != -1:
    print("v3Bang content:", text[idx2:idx2+300])

