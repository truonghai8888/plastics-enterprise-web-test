with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

v3_idx = text.find('<div class="v3">')
kho_idx = text.find('id="khoDK"')
ft_idx = text.find('<footer class="ft"')

print(f"v3_idx: {v3_idx}")
print(f"kho_idx: {kho_idx}")
print(f"ft_idx: {ft_idx}")
