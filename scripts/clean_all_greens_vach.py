import re

# 1. Clean vach.js
with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('#24700B', '#deaa26')
js = js.replace('#24700b', '#deaa26')
js = js.replace('#1e5f09', '#b88b1b')
js = js.replace('#2d8c0d', '#deaa26')
js = js.replace('Eco Bamboo', 'Nhựa AMC')
js = js.replace('ECOBAMBOO', 'NHỰA AMC')

with open('public/assets/js/vach.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Sanitized public/assets/js/vach.js")

# 2. Clean vach-data.js and vachHs.json
with open('src/data/vachHs.json', 'r', encoding='utf-8') as f:
    hs_text = f.read()

hs_text = hs_text.replace('#24700B', '#deaa26')
hs_text = hs_text.replace('#24700b', '#deaa26')
hs_text = hs_text.replace('Eco Bamboo', 'Nhựa AMC')

with open('src/data/vachHs.json', 'w', encoding='utf-8') as f:
    f.write(hs_text)

with open('public/assets/js/vach-data.js', 'r', encoding='utf-8') as f:
    vd_text = f.read()

vd_text = vd_text.replace('#24700B', '#deaa26')
vd_text = vd_text.replace('#24700b', '#deaa26')
vd_text = vd_text.replace('Eco Bamboo', 'Nhựa AMC')

with open('public/assets/js/vach-data.js', 'w', encoding='utf-8') as f:
    f.write(vd_text)
print("Sanitized vach-data.js and vachHs.json")
