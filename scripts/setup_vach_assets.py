import os
import re

os.makedirs('public/assets/css', exist_ok=True)
os.makedirs('public/assets/js', exist_ok=True)

# Copy vach.css
with open('scraped_data/ecobamboo_vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

with open('public/assets/css/vach.css', 'w', encoding='utf-8') as f:
    f.write(css)

# Copy & customize vach.js
with open('scraped_data/ecobamboo_vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace fallback ecobamboo domain with window.BRAND_DOMAIN or nhuaamc.vn
js = js.replace('const web=HS.WEB||"ecobamboo.vn";', 'const web=HS.WEB||(window.BRAND && window.BRAND.domain)||"nhuaamc.vn";')
js = js.replace("'EcoBamboo - duong 1:1 tiet dien canh cong'", "(window.BRAND ? window.BRAND.shortName : 'AMC') + ' - duong 1:1 tiet dien canh cong'")

with open('public/assets/js/vach.js', 'w', encoding='utf-8') as f:
    f.write(js)

# Copy eb.js
with open('scraped_data/ecobamboo_eb.js', 'r', encoding='utf-8') as f:
    eb_js = f.read()

with open('public/assets/js/eb.js', 'w', encoding='utf-8') as f:
    f.write(eb_js)

print("Saved public/assets/css/vach.css and public/assets/js/vach.js successfully!")
