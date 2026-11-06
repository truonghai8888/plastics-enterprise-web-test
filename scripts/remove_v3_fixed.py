with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

target = '''@media (min-width:861px){
  html.v3-on .topbar, html.v3-on .hdr, html.v3-on .ft{ display:none }
  html.v3-on .vach-phu{ display:none }
  html.v3-on .vach-h1{ position:absolute; width:1px; height:1px; margin:-1px;
    padding:0; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0 }
  html.v3-on .vach-trang{ padding:0 }
  html.v3-on .vach-trang>.wrap-wide{ padding:0; max-width:none }
  html.v3-on .v3{ position:fixed; inset:0; height:100svh; min-height:0;
    border:0; border-radius:0; box-shadow:none; z-index:20 }
  /* Trang không còn gì để cuộn: mọi thứ nằm trong khung, và cuộn nền phía sau một
     ứng dụng toàn màn hình chỉ làm khung trôi đi trong khi nội dung đứng yên. */
  html.v3-on, html.v3-on body{ overflow:hidden; overscroll-behavior:none }
}'''

if target in text:
    text = text.replace(target, '/* REMOVED FIXED FULLSCREEN OVERRIDE FOR v3-on */')
    print('Removed successfully')
else:
    print('Target not found exactly, searching substring...')
    idx = text.find('html.v3-on .topbar, html.v3-on .hdr')
    if idx != -1:
        start = text.rfind('@media', 0, idx)
        end = text.find('}', text.find('overflow:hidden', idx)) + 1
        print('Replacing from', start, 'to', end)
        text = text[:start] + '/* REMOVED FIXED FULLSCREEN OVERRIDE FOR v3-on */\n' + text[end:]
        print('Replaced by index range!')

with open('public/assets/css/vach.css', 'w', encoding='utf-8') as f:
    f.write(text)
