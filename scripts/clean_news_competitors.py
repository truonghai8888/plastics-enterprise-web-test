import os
import re

news_path = 'src/data/news.js'
with open(news_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace competitor images with clean AMC images
replacements = {
    # Kosmos images
    r'/images/nhuaamc/banner-san-go-nhua-ngoai-troi-kosmos\.jpg': '/images/nhuaamc/108735_san_nhua_chiu_luc_lot_san_gac_lung_17100727.jpg',
    r'https://kosmos\.vn/wp-content/uploads/2024/09/banner-tam-op-than-tre-kosmos\.jpg': '/images/nhuaamc/tam-op-than-tre-phong-ngu.jpg',
    r'https://kosmos\.vn/[^\s"\']+': '/images/nhuaamc/tam-op-than-tre-phong-ngu.jpg',

    # Ecovina images
    r'/images/nhuaamc/ecovina_tam-go-nhua-op-tuong-gia-go-89\.jpg': '/images/nhuaamc/tam-lam-song-phong-khach.jpg',
    r'/images/nhuaamc/ecovina_tam-op-tran-go-nhua-ngoai-troi-phu-asa-ecovina-ew145t12a-2-225x300\.jpg': '/images/nhuaamc/day-chuyen-san-xuat-go-nhua-amc-1-300x200.jpg',
    r'https://ecovina\.com\.vn/[^\s"\']+': '/images/nhuaamc/tam-lam-song-phong-khach.jpg',

    # Galawood images
    r'/images/nhuaamc/banner-san-nhua-chiu-luc-galwood-24042025\.jpg': '/images/nhuaamc/108735_san_nhua_chiu_luc_lot_san_gac_lung_17100727.jpg',

    # Haroma images
    r'/images/nhuaamc/vat-tu-thi-cong-tran-nhua-nano-chi-tiet-haroma-3\.jpg': '/images/nhuaamc/tam-op-tuong-nano-amc.jpg',
    r'/images/nhuaamc/huong-dan-chi-tiet-cac-buoc-thi-cong-tam-op-nano-tu-A-Z-Haroma\.jpg': '/images/nhuaamc/tam-op-tuong-nano-amc.jpg',

    # Kwood Vietnam external links
    r'https://kwoodvietnam\.com/[^\s"\']+': '/images/nhuaamc/tam-op-than-tre-phong-ngu.jpg',
}

for old_pat, new_val in replacements.items():
    content = re.sub(old_pat, new_val, content)

# 2. Text / alt replacements of competitor names in news content
text_replacements = [
    (r'\bKosmos\b', 'AMC'),
    (r'\bEcovina\b', 'AMC'),
    (r'\bGalawood\b', 'AMC'),
    (r'\bGalwood\b', 'AMC'),
    (r'\bHaroma\b', 'AMC'),
    (r'\bHAROMA\b', 'AMC'),
    (r'\bHTWood\b', 'AMC'),
    (r'\bKwood\b', 'AMC'),
    (r'\bKWOOD\b', 'AMC'),
]

for pat, repl in text_replacements:
    content = re.sub(pat, repl, content)

with open(news_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully sanitized competitor images and names in src/data/news.js")
