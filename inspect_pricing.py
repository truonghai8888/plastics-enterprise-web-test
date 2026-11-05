import sys, re
sys.stdout.reconfigure(encoding='utf-8')
html = open('scraped_data/html/bang-gia.html', encoding='utf-8').read()
headings = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', html, re.DOTALL)
for tag, t in headings:
    print(f"{tag.upper()}: {re.sub(r'<[^>]+>', '', t).strip()}")

tables = re.findall(r'<table[^>]*>(.*?)</table>', html, re.DOTALL)
print(f"\nTables: {len(tables)}")
for i, table in enumerate(tables):
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', table, re.DOTALL)
    print(f"--- Table {i+1} ({len(rows)} rows) ---")
    for r in rows[:6]:
        cols = [re.sub(r'<[^>]+>', '', c).strip() for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)]
        print("  | ".join(cols))
