import re

def find_greens(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # regex for hex colors that have high green component
    # like #24700b, #2e8a0e, #1a5208, #3da818, #28810c, #195e07, #216a09, #389412
    # Also rgba(..., ..., ...) where green > red and green > blue
    # Also words like 'green', 'forest', 'emerald'
    hex_greens = set(re.findall(r'#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}', text))
    found_greens = []
    for h in hex_greens:
        if len(h) == 7:
            r = int(h[1:3], 16)
            g = int(h[3:5], 16)
            b = int(h[5:7], 16)
            # if green is dominant
            if g > 70 and g > r * 1.2 and g > b * 1.2:
                found_greens.append((h, r, g, b))

    rgb_matches = re.findall(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)[^)]*\)', text)
    rgb_greens = []
    for r_s, g_s, b_s in rgb_matches:
        r, g, b = int(r_s), int(g_s), int(b_s)
        if g > 70 and g > r * 1.2 and g > b * 1.2:
            rgb_greens.append((f"rgb({r},{g},{b})", r, g, b))

    print(f"=== File: {filename} ===")
    print("Hex greens:", set([g[0] for g in found_greens]))
    print("RGB greens:", set([g[0] for g in rgb_greens]))

find_greens('public/assets/css/vach.css')
find_greens('public/assets/css/eb.css')
find_greens('public/assets/js/vach.js')
