import re

with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

target = 'const H = (typeof require!=="undefined") ? require("./hinh.js") : root.HINH;'
replacement = 'const H = (root && root.HINH) || (typeof window!=="undefined" && window.HINH) || ((typeof require!=="undefined") ? (function(){ try { return require("./hinh.js"); } catch(e){ return root.HINH; } })() : null);'

count = text.count(target)
print('Target occurrences:', count)
text = text.replace(target, replacement)

with open('public/assets/js/vach.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated successfully')
