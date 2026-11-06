with open('public/assets/css/eb.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
classes = ['ph', 'bt', 'fmsg', 'n', 'nh', 'ebform', 'to', 'hp', 'ch', 'con', 'ct']
for c in classes:
    m = re.search(rf'\.{c}\b[^{{]*\{{[^}}]*\}}', css)
    if m:
        print(m.group(0))
        print('-'*30)

