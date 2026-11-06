with open('public/assets/js/vach.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

target = 'const cv=$("c")'
idx = text.find(target)

# Find previous function or IIFE start
prev_func = text.rfind('function', 0, idx)
prev_iife = text.rfind('(function', 0, idx)
prev_arrow = text.rfind('=>', 0, idx)
print('prev_func:', prev_func)
print('prev_iife:', prev_iife)
print('--- Before target (1000 chars) ---')
print(text[max(0, idx-1000):idx])
