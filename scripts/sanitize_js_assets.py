def sanitize_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    text = text.replace('0915.189.389', '0325.999.238')
    text = text.replace('0915189389', '0325999238')
    text = text.replace('sale.ecobamboo@gmail.com', 'ctyphattriennhuaamc@gmail.com')
    text = text.replace('ecobamboo.vn', 'nhuaamc.vn')
    text = text.replace('Eco Bamboo', 'Nhựa AMC')
    text = text.replace('ECOBAMBOO', 'NHỰA AMC')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"Sanitized {path}")

for p in ['public/assets/js/eb.js', 'public/assets/js/vach-data.js', 'public/assets/js/vach.js', 'src/data/vachGlobals.js']:
    sanitize_file(p)
