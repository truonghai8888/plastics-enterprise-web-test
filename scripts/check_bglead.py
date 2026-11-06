with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

idx = css.find('.bg-lead')
print(css[idx:idx+400])
