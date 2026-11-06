with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
# look around initialization at the bottom of vo.js
idx = js.find('veCot(); moMuc("1a"); veDay(); veMoc();')
print(js[max(0, idx-500):idx+500])

