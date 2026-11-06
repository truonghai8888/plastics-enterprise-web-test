with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
scripts = re.findall(r'<script(?:\s+[^>]*)?>(.*?)</script>', text, re.DOTALL)

# Let's inspect scripts 2, 3, 4, 5
data_parts = []
for idx in [1, 2, 3, 4]: # 0-indexed: 1=Script #2, 2=Script #3, 3=Script #4, 4=Script #5
    s = scripts[idx].strip()
    # Replace branding & green colors
    s = s.replace('Eco Bamboo', 'Nhựa AMC')
    s = s.replace('ECOBAMBOO', 'NHỰA AMC')
    s = s.replace('ecobamboo.vn', 'nhuaamc.vn')
    s = s.replace('0915.189.389', '0325.999.238')
    s = s.replace('0915189389', '0325999238')
    s = s.replace('sale.ecobamboo@gmail.com', 'ctyphattriennhuaamc@gmail.com')
    s = s.replace('#24700B', '#deaa26').replace('#24700b', '#deaa26')
    s = s.replace('#1ac75c', '#deaa26').replace('#0a7a3a', '#deaa26')
    data_parts.append(s)

print("Part 1 (MAU_THUMB) len:", len(data_parts[0]))
print("Part 2 (HANG_SO) len:", len(data_parts[1]))
print("Part 3 (VAT_LIEU) len:", len(data_parts[2]))
print("Part 4 (NEP_DM) len:", len(data_parts[3]))

# Also read existing vach-data.js
with open('public/assets/js/vach-data.js', 'r', encoding='utf-8') as f:
    existing_data = f.read()

full_data = existing_data + '\n;\n' + '\n;\n'.join(data_parts) + '\n;'

with open('public/assets/js/vach-data.js', 'w', encoding='utf-8') as f:
    f.write(full_data)

print("Updated public/assets/js/vach-data.js total size:", len(full_data))
