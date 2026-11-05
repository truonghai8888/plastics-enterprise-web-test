import sys
import json
sys.stdout.reconfigure(encoding='utf-8')

pages = json.load(open('scraped_data/pages_summary_with_images.json', encoding='utf-8'))
print(f"Total pages: {len(pages)}")
for p in pages:
    print(f"\n{'='*20} {p['url']} {'='*20}")
    print(f"Title: {p['title']}")
    print("Headings:", [h['text'] for h in p['headings'][:8]])
    print(f"Images count: {len(p.get('local_images', []))}")
    print("Sample images:", p.get('local_images', [])[:5])
