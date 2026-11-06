with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('class="do"')
if idx == -1: idx = text.find('class="do ')
print("class='do' at:", idx)
if idx != -1:
    print(text[max(0, idx-40):min(len(text), idx+600)])
