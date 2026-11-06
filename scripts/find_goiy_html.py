with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    orig = f.read()

idx = orig.find('id="goiy"')
print("id='goiy' in orig:", idx)
if idx != -1:
    print(orig[max(0, idx-100):min(len(orig), idx+300)])
