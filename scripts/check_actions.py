import re

with open('public/tu-thiet-ke-vach/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all buttons and links
buttons = re.findall(r'<button\b[^>]*>', html)
links = re.findall(r'<a\b[^>]*>', html)
forms = re.findall(r'<form\b[^>]*>', html)

print(f"Total <button> elements in HTML: {len(buttons)}")
print(f"Total <a> elements in HTML: {len(links)}")
print(f"Total <form> elements in HTML: {len(forms)}")

# Check hrefs in links
hrefs = re.findall(r'href=["\']([^"\']+)["\']', html)
print("\nUnique link hrefs in tu-thiet-ke-vach/index.html:")
for h in sorted(set(hrefs)):
    print(" ", h)
