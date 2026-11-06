with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('<div id="khoDK"')
end_idx = text.find('</main>', idx)
khodk = text[idx:end_idx]
print(f"khoDK length: {len(khodk)} bytes")
import re
ids = re.findall(r'id=["\']([^"\']+)["\']', khodk)
print(f"Total IDs in khoDK: {len(ids)}")
print("Sample IDs:", ids[:15])
