import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

html = open('scraped_data/html/home.html', encoding='utf-8').read()
sections = re.findall(r'<section[^>]*>(.*?)</section>', html, re.DOTALL)

data = []
for i, s in enumerate(sections):
    h = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', s, re.DOTALL)
    clean_h = [{ 'tag': tag, 'text': re.sub(r'<[^>]+>', '', t).strip() } for tag, t in h]
    imgs = re.findall(r'<img[^>]*src=[\'"]([^\'"]+)[\'"]', s)
    ps = re.findall(r'<p[^>]*>(.*?)</p>', s, re.DOTALL)
    clean_p = [re.sub(r'<[^>]+>', '', p).strip() for p in ps]
    links = re.findall(r'<a[^>]*href=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</a>', s, re.DOTALL)
    clean_links = [{ 'href': href, 'text': re.sub(r'<[^>]+>', '', t).strip() } for href, t in links if re.sub(r'<[^>]+>', '', t).strip()]
    data.append({
        'section_index': i + 1,
        'headings': clean_h,
        'images': imgs,
        'paragraphs': clean_p,
        'links': clean_links
    })

with open('scraped_data/home_sections_cleaned.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Dumped all 11 homepage sections to scraped_data/home_sections_cleaned.json")
