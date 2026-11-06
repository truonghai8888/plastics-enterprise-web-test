with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('window.VACH_VO={veCot')
sub = text[:idx]
last_iife = sub.rfind('(function(')
if last_iife == -1:
    last_iife = sub.rfind('(function()')
if last_iife == -1:
    last_iife = sub.rfind('(()=>{')
print(f"Distance to IIFE start: {idx - last_iife}")
print(text[last_iife:last_iife+200])
