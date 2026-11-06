with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('NEP_DM')
print(text[max(0, idx-50):min(len(text), idx+1000)])
