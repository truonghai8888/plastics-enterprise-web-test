with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('khoDk')
print('khoDk index in scraped file:', idx)
if idx != -1:
    print('Context of khoDk:')
    print(text[max(0, idx-200):min(len(text), idx+500)])
