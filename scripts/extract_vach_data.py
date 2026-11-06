import re
import json

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract MAU_THUMB
m_thumb = re.search(r'window\.MAU_THUMB\s*=\s*(\{.*?\});', html)
if m_thumb:
    print("Found MAU_THUMB, length:", len(m_thumb.group(1)))
    with open('src/data/vachMauThumb.json', 'w', encoding='utf-8') as f:
        f.write(m_thumb.group(1))

# Extract VACH_HS
m_hs = re.search(r'window\.VACH_HS\s*=\s*(\{.*?\});', html)
if m_hs:
    print("Found VACH_HS, length:", len(m_hs.group(1)))
    with open('src/data/vachHs.json', 'w', encoding='utf-8') as f:
        f.write(m_hs.group(1))

# Extract VACH_MA
m_ma = re.search(r'window\.VACH_MA\s*=\s*(\{.*?\});', html)
if m_ma:
    print("Found VACH_MA, length:", len(m_ma.group(1)))
    with open('src/data/vachMa.json', 'w', encoding='utf-8') as f:
        f.write(m_ma.group(1))

# Extract NEP_DM
m_nep = re.search(r'window\.NEP_DM\s*=\s*(\[.*?\]);', html)
if m_nep:
    print("Found NEP_DM, length:", len(m_nep.group(1)))
    with open('src/data/vachNepDm.json', 'w', encoding='utf-8') as f:
        f.write(m_nep.group(1))

print("Extraction completed successfully!")
