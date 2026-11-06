with open('public/vach-studio.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
idx = text.find('class="v3-san')
end_idx = text.find('</aside>', idx) # next aside is v3-bang
print(text[idx:end_idx+8])
