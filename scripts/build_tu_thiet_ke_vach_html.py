import os
import re

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Title and Meta
html = html.replace('Eco Bamboo', 'Nhựa AMC')
html = html.replace('ECOBAMBOO', 'NHỰA AMC')
html = html.replace('ecobamboo.vn', 'nhuaamc.vn')

# 2. Update Hotlines & Contacts
html = html.replace('0915.189.389', '0325.999.238')
html = html.replace('0915189389', '0325999238')
html = html.replace('sale.ecobamboo@gmail.com', 'ctyphattriennhuaamc@gmail.com')

# 3. Update Social Links
html = html.replace('https://www.facebook.com/tamopecobamboo', 'https://www.facebook.com/profile.php?id=61558413806518')
html = html.replace('https://www.youtube.com/@EcoBamboo-Tamopdanang', 'https://www.youtube.com/@Nh%E1%BB%B1aAMC')
html = html.replace('https://www.tiktok.com/@ecobamboo.vn', 'https://www.tiktok.com/@amcplastic_?_r=1&_t=ZS-9BANDAJZ5tN')
html = html.replace('https://zalo.me/0915189389', 'https://zalo.me/0325999238')

# 4. Update Footer Company text
html = re.sub(r'© \d+ Công ty CP Công nghiệp Eco Bamboo[^<]*', '© 2026 Công ty TNHH Phát Triển AMC. Nhà máy: CCN Kim Bình, Phù Vân, Ninh Bình.', html)

# 5. Fix Google Tag Manager & External Tracking (remove or disable)
html = re.sub(r'<script>\(function\(\){var H=\[\'ecobamboo\.vn\'.*?</script>', '', html, flags=re.DOTALL)
html = re.sub(r'<noscript><iframe src="https://www\.googletagmanager\.com.*?</noscript>', '', html, flags=re.DOTALL)

# 6. Ensure assets paths point to local
html = html.replace('https://ecobamboo.vn/', '/')

# 7. Brand the studio header inside v3-dau
html = html.replace('<a class="v3-logo" href="/" aria-label="Eco Bamboo — về trang chủ"><b>ECO</b><i>BAMBOO</i></a>',
                    '<a class="v3-logo" href="/" aria-label="Nhựa AMC — về trang chủ"><b style="color:#deaa26">AMC</b><i style="color:#d1a56c;font-family:sans-serif;font-size:12px;margin-left:4px">3D STUDIO</i></a>')

os.makedirs('public/tu-thiet-ke-vach', exist_ok=True)
with open('public/tu-thiet-ke-vach/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Generated public/tu-thiet-ke-vach/index.html: {len(html)} bytes")
