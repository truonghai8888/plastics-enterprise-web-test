import re

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'(<main[^>]*>.*?</main>)', html, re.DOTALL | re.IGNORECASE)
if m:
    main_html = m.group(1)
    # clean out base64 or long inline svgs if any
    clean = re.sub(r'<svg[^>]*>.*?</svg>', '<svg>...</svg>', main_html, flags=re.DOTALL)
    print("Main HTML structure (first 4000 chars):\n")
    print(clean[:4000])
    with open('scraped_data/vach_main_clean.html', 'w', encoding='utf-8') as out:
        out.write(clean)
    print("\nSaved full clean main to scraped_data/vach_main_clean.html")
