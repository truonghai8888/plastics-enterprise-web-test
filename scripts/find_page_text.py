with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'chọn mẫu|tạo hình vách|vật liệu và nẹp|khối lượng', text, re.IGNORECASE)]
print("Matches in WallDesignerPage.jsx:", len(matches))
for idx in matches:
    print(text[max(0, idx-60):min(len(text), idx+100)])
