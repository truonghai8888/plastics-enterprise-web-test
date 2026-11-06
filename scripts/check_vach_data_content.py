with open('public/assets/js/vach-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

print('vach-data.js size:', len(text))
for varname in ['MAU_THUMB', 'HS', 'EB_DB', 'NEP_DM', 'MAU']:
    print(f'{varname} in vach-data.js?', varname in text)

