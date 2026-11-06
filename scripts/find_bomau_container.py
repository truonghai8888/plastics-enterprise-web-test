with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="boMau"')
print("boMau at:", idx)
start = text.rfind('<div id="', 0, idx)
print("Enclosing div:", text[start:start+150])

kho_idx = text.find('id="khoDK"')
print("khoDK at:", kho_idx)
print("Is boMau inside khoDK?", kho_idx < idx < text.find('</div>', idx+10000))
