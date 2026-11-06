with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

idx = css.find('theTS')
if idx != -1:
    print("theTS in css:")
    print(css[max(0, idx-100):min(len(css), idx+400)])
else:
    print("theTS not in css")
