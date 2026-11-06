import os
from PIL import Image

nhuaamc_dir = 'public/images/nhuaamc'
files = [f for f in os.listdir(nhuaamc_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]

print(f"Total images in {nhuaamc_dir}: {len(files)}")

# Let's check image dimensions and samples
small_or_banner = []
for f in files:
    fp = os.path.join(nhuaamc_dir, f)
    try:
        with Image.open(fp) as im:
            w, h = im.size
            # check aspect ratio or very wide banners
            if w > 2 * h or 'banner' in f.lower() or 'logo' in f.lower() or 'ecovina' in f.lower():
                small_or_banner.append((f, w, h))
    except Exception as e:
        print(f"Error reading {f}: {e}")

print(f"\nPotential banners or flagged ({len(small_or_banner)}):")
for f, w, h in small_or_banner[:20]:
    print(f"  {f} ({w}x{h})")
