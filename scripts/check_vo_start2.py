with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = 1807305 # start of vo.js
sub = text[idx:idx+2000]
print(sub[:800])
