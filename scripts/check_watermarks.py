import os
import re

print("=== CHECKING WATERMARKS / BRANDED IMAGES IN nhuaamc ===")

# Look at filenames first
keywords = ['haroma', 'ecovina', 'htwood', 'galawood', 'logo', 'watermark', 'sdt', 'hotline']

flagged = []
for f in os.listdir('public/images/nhuaamc'):
    low = f.lower()
    for kw in keywords:
        if kw in low:
            flagged.append((f, kw))

print(f"Flagged by filename keyword ({len(flagged)}):")
for f, kw in flagged:
    print(f"  {f} -> keyword '{kw}'")

# Check news articles in news.js to see which images are used
with open('src/data/news.js', 'r', encoding='utf-8') as f:
    news_content = f.read()

article_images = re.findall(r'src=["\'](/images/nhuaamc/[^"\']+)["\']', news_content)
article_images += re.findall(r'image:\s*["\'](/images/nhuaamc/[^"\']+)["\']', news_content)
print(f"\nUnique article images used in news.js: {len(set(article_images))}")

# Check alt texts for mentions of other companies
alts = re.findall(r'alt=["\']([^"\']+)["\']', news_content)
competitors = ['haroma', 'ecovina', 'htwood', 'galawood', 'hobiwood', 'kosmos']
flagged_alts = []
for alt in alts:
    for c in competitors:
        if c in alt.lower():
            flagged_alts.append((alt, c))

print(f"\nFlagged competitor mentions in alt text: {len(flagged_alts)}")
for alt, c in flagged_alts[:10]:
    print(f"  '{alt}' -> competitor '{c}'")
