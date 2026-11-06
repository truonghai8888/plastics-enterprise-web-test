with open('public/vach-studio.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('id="theTS"')
print("id='theTS' in html:", idx)
if idx != -1:
    print(html[max(0, idx-100):min(len(html), idx+1000)])
