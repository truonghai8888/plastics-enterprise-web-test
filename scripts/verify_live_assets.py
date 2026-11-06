import urllib.request

# 1. Check vach.css
url_css = 'http://localhost:3000/assets/css/vach.css'
with urllib.request.urlopen(url_css) as res:
    css = res.read().decode('utf-8')
    print("vach.css size:", len(css))
    print("Has dark scheme in vach.css:", 'prefers-color-scheme:dark' in css)
    print("Has root light colors:", '--nen:#f9fafb' in css)
    print("Has scoped button line 47:", '#vachStudioMount .v3 button' in css)

# 2. Check vach.js
url_js = 'http://localhost:3000/assets/js/vach.js'
with urllib.request.urlopen(url_js) as res:
    js = res.read().decode('utf-8')
    print("vach.js size:", len(js))
    print("Has clearCho:", 'clearCho' in js)
    print("Has window.VACH_VO.veCot:", 'window.VACH_VO.veCot' in js)
    print("Has window.VACH_REINIT:", 'window.VACH_REINIT' in js)
