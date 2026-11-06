with open('public/assets/css/vach.css', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if any(k in line for k in ["Khối lượng & báo giá", "Tạo hình vách", "Vật liệu & nẹp", "chọn mẫu", "bị cắt cụt", "dt-buoc", "dt-day", "v3-day", "dt-viec", "dt-tam"]):
        print(f"CSS L{i+1}: {line.strip()[:100]}")
