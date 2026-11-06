with open('public/assets/css/eb.css', 'r', encoding='utf-8') as f:
    eb_css = f.read()

# Replace root variables
eb_css = eb_css.replace('--green-900:#0F3505;', '--green-900:#1e1c19;')
eb_css = eb_css.replace('--green-800:#1A5208;', '--green-800:#2e2b27;')
eb_css = eb_css.replace('--green-700:#24700B;', '--green-700:#deaa26;')
eb_css = eb_css.replace('--green-600:#2E8A0E;', '--green-600:#b88b1b;')
eb_css = eb_css.replace('--green-500:#3DA818;', '--green-500:#e6b83b;')
eb_css = eb_css.replace('--ok:#24700B;', '--ok:#deaa26;')
eb_css = eb_css.replace('Eco Bamboo', 'Nhựa AMC')

with open('public/assets/css/eb.css', 'w', encoding='utf-8') as f:
    f.write(eb_css)

with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    vach_css = f.read()

vach_css = vach_css.replace('#24700B', '#deaa26')
vach_css = vach_css.replace('#24700b', '#deaa26')
vach_css = vach_css.replace('Eco Bamboo', 'Nhựa AMC')

with open('public/assets/css/vach.css', 'w', encoding='utf-8') as f:
    f.write(vach_css)

print("Sanitized CSS color variables to AMC Gold/Dark.")
