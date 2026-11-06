with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    'if(typeof module!=="undefined") module.exports=out; else root.DUNG=out;',
    'if(typeof module!=="undefined") module.exports=out; if(typeof root!=="undefined") root.DUNG=out;'
)
text = text.replace(
    'if(typeof module!=="undefined") module.exports=out; else root.ANH=out;',
    'if(typeof module!=="undefined") module.exports=out; if(typeof root!=="undefined") root.ANH=out;'
)
text = text.replace(
    'if(typeof module!=="undefined") module.exports=out; else root.SODO=out;',
    'if(typeof module!=="undefined") module.exports=out; if(typeof root!=="undefined") root.SODO=out;'
)

with open('public/assets/js/vach.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated export lines in vach.js')

