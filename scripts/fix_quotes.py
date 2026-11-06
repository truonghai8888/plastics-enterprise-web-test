with open('src/data/news.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix unescaped quotes before alt=\
import re
text = text.replace('.jpg" alt=\\"', '.jpg\\" alt=\\"')
text = text.replace('.webp" alt=\\"', '.webp\\" alt=\\"')
text = text.replace('.png" alt=\\"', '.png\\" alt=\\"')

with open('src/data/news.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed unescaped quotes in news.js")
