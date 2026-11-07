import os
from PIL import Image

p = '/usr/share/nginx/html/assets/img/vach/mau'
for f in sorted(os.listdir(p)):
    fp = os.path.join(p, f)
    im = Image.open(fp)
    colors = im.getcolors(maxcolors=1000)
    extrema = im.getextrema()
    print(f'{f:15s} size={im.size} mode={im.mode} colors={len(colors) if colors else "many"} extrema={extrema}')
