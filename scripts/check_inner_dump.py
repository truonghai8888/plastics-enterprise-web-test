with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Check first 500 chars and last 500 chars of the HTML inside VACH_STUDIO_INNER_HTML
# The file has: export const VACH_STUDIO_INNER_HTML = '...';
idx = text.find("'''")
if idx == -1:
    idx = text.find('"""')
if idx == -1:
    idx = text.find("'")
print("First 800 chars of text:")
print(text[:800])
print("="*50)
print("Last 800 chars of text:")
print(text[-800:])
