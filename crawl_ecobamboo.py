import os
import sys
import re
import json
import urllib.request
import urllib.parse
from html.parser import HTMLParser

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
}

class SimpleHTMLScraper(HTMLParser):
    def __init__(self, base_url):
        super().__init__()
        self.base_url = base_url
        self.images = set()
        self.texts = []
        self.headings = []
        self.links = []
        self.current_tag = None
        self.in_title = False
        self.title = ""

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attr_dict = dict(attrs)

        if tag == 'title':
            self.in_title = True

        if tag == 'img':
            for key in ['src', 'data-src', 'data-original', 'data-lazy', 'srcset']:
                if key in attr_dict and attr_dict[key]:
                    val = attr_dict[key].strip()
                    if key == 'srcset':
                        # take the first or last src from srcset
                        parts = val.split(',')
                        if parts:
                            first_part = parts[-1].strip().split(' ')[0]
                            self.add_image(first_part)
                    else:
                        self.add_image(val)

        if tag == 'a' and 'href' in attr_dict:
            self.links.append({
                'href': attr_dict['href'],
                'text': ''
            })

        if tag in ['h1', 'h2', 'h3', 'h4']:
            self.headings.append({'tag': tag, 'text': ''})

        # check style attribute for background-image
        if 'style' in attr_dict:
            style = attr_dict['style']
            urls = re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', style)
            for u in urls:
                self.add_image(u)

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        self.current_tag = None

    def handle_data(self, data):
        txt = data.strip()
        if not txt:
            return
        if self.in_title:
            self.title += " " + txt
        if self.current_tag in ['h1', 'h2', 'h3', 'h4'] and self.headings:
            self.headings[-1]['text'] += " " + txt
        if self.current_tag == 'a' and self.links:
            self.links[-1]['text'] += " " + txt
        if self.current_tag not in ['script', 'style', 'noscript']:
            self.texts.append(txt)

    def add_image(self, url):
        if not url or url.startswith('data:'):
            return
        full_url = urllib.parse.urljoin(self.base_url, url)
        self.images.add(full_url)

def fetch_url(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            content_type = resp.headers.get('Content-Type', '')
            encoding = 'utf-8'
            if 'charset=' in content_type:
                encoding = content_type.split('charset=')[-1].split(';')[0].strip()
            return resp.read().decode(encoding, errors='replace')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def main():
    with open('ecobamboo.md', 'r', encoding='utf-8') as f:
        urls = [line.strip() for line in f if line.strip() and not line.startswith('#')]

    # Remove duplicate URLs while preserving order
    seen = set()
    unique_urls = []
    for u in urls:
        clean = u.split('#')[0] if '#' in u else u
        if u not in seen:
            seen.add(u)
            unique_urls.append(u)

    os.makedirs('scraped_data/html', exist_ok=True)
    pages_summary = []
    all_images = set()

    for i, url in enumerate(unique_urls):
        print(f"[{i+1}/{len(unique_urls)}] Fetching {url}...")
        html = fetch_url(url)
        if not html:
            continue

        slug = url.replace('https://ecobamboo.vn/', '').replace('/', '_').replace('?', '_').replace('&', '_').replace('.html', '')
        if not slug:
            slug = 'home'

        with open(f'scraped_data/html/{slug}.html', 'w', encoding='utf-8') as f:
            f.write(html)

        parser = SimpleHTMLScraper(url)
        parser.feed(html)

        # also search background-image in full html
        bg_urls = re.findall(r'background(?:-image)?\s*:\s*url\([\'"]?([^\'")]+)[\'"]?\)', html)
        for bg in bg_urls:
            if not bg.startswith('data:'):
                parser.add_image(bg)

        # search og:image
        og_images = re.findall(r'<meta[^>]*property=[\'"]og:image[\'"][^>]*content=[\'"]([^\'"]+)[\'"]', html, re.IGNORECASE)
        for og in og_images:
            parser.add_image(og)

        page_info = {
            'url': url,
            'slug': slug,
            'title': parser.title.strip(),
            'headings': [{'tag': h['tag'], 'text': h['text'].strip()} for h in parser.headings if h['text'].strip()],
            'images': list(parser.images),
            'sample_texts': parser.texts[:50]
        }
        pages_summary.append(page_info)
        all_images.update(parser.images)

    with open('scraped_data/pages_summary.json', 'w', encoding='utf-8') as f:
        json.dump(pages_summary, f, ensure_ascii=False, indent=2)

    with open('scraped_data/all_images.json', 'w', encoding='utf-8') as f:
        json.dump(list(all_images), f, ensure_ascii=False, indent=2)

    print(f"\nDone scraping! Found {len(pages_summary)} pages and {len(all_images)} total image URLs.")

if __name__ == '__main__':
    main()
