with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    orig = f.read()
idx = orig.find('data-loai="baogia"')
print(orig[max(0, idx-600):idx])
