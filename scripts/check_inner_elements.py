with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
print('Length of VACH_STUDIO_INNER_HTML:', len(text))
print('Has canvas#c?', 'id="c"' in text or "id='c'" in text)
print('Has v3-san?', 'v3-san' in text)
print('Has v3-cot?', 'v3-cot' in text)
print('Has v3-bang?', 'v3-bang' in text)
print('Has v3So?', 'id="v3So"' in text)
print('Has qUndo?', 'id="qUndo"' in text)
