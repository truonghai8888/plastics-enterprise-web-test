import os
import shutil

replacements = {
    'public/images/nhuaamc/banner-san-go-nhua-ngoai-troi-kosmos.jpg': 'public/images/nhuaamc/108735_san_nhua_chiu_luc_lot_san_gac_lung_17100727.jpg',
    'public/images/nhuaamc/banner-san-nhua-chiu-luc-galwood-24042025.jpg': 'public/images/nhuaamc/108735_san_nhua_chiu_luc_lot_san_gac_lung_17100727.jpg',
    'public/images/nhuaamc/ecovina_tam-go-nhua-op-tuong-gia-go-89.jpg': 'public/images/nhuaamc/tam-lam-song-phong-khach.jpg',
    'public/images/nhuaamc/ecovina_tam-op-tran-go-nhua-ngoai-troi-phu-asa-ecovina-ew145t12a-2-225x300.jpg': 'public/images/nhuaamc/day-chuyen-san-xuat-go-nhua-amc-1-300x200.jpg',
}

for dst, src in replacements.items():
    if os.path.exists(src):
        shutil.copyfile(src, dst)
        print(f"Sanitized physical file: {dst} <- {src}")

print("Competitor watermark images sanitized.")
