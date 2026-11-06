with open('src/data/news.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('vat-tu-thi-cong-tran-nhua-nano-chi-tiet-haroma-3.jpg', 'tam-op-tuong-nano-amc.jpg')
import re
text = re.sub(r'https?://[^\s"\']*kosmos[^\s"\']*', '/images/nhuaamc/tam-op-than-tre-phong-ngu.jpg', text)

with open('src/data/news.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replaced successfully.")
