with open('public/assets/css/vach.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('.v3-hop{')
if idx == -1:
    idx = text.find('.v3-hop ')
if idx == -1:
    idx = text.find('.v3-hop')
print(".v3-hop in css at:", idx)
print(text[idx-50:idx+400])
