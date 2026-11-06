with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

v3_idx = text.find('<div class="v3">')
ft_idx = text.find('<footer class="ft"')

full_chunk = text[v3_idx:ft_idx]
print(f"full_chunk length: {len(full_chunk)}")

with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    inner = f.read()
print(f"current vachStudioInnerHtml length: {len(inner)}")

print("khoDK in full_chunk?", 'id="khoDK"' in full_chunk)
print("khoDK in inner?", 'id="khoDK"' in inner)
