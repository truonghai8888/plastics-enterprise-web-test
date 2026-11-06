with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

print("Has v3-dau in inner HTML:", 'v3-dau' in text)
print("Has v3-dau-trai in inner HTML:", 'v3-dau-trai' in text)
print("First 300 chars of inner HTML:\n", text[:300])
