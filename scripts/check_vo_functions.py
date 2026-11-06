with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find where function veCot is defined
idx_vecot = text.find('function veCot()')
print(f"veCot is at char: {idx_vecot}")

# Let's find where the IIFE containing veCot starts and ends
iife_start = text.rfind('(function', 0, idx_vecot)
print(f"IIFE containing veCot starts at char: {iife_start}")
print("IIFE start text:", text[iife_start:iife_start+100])

# Now find where this IIFE ends
# We can search for the matching closing paren or comment
print("Next 5 IIFE closures after veCot:")
pos = idx_vecot
for _ in range(5):
    idx_close = text.find('})();', pos)
    if idx_close == -1: break
    print(f"  Closed at {idx_close}: {text[idx_close-60:idx_close+10].replace('\n', ' ')}")
    pos = idx_close + 5
