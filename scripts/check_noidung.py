with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

start = html.find('<main id="noidung"')
end = html.find('</main>', start)
main_html = html[start:end+7]

print(f"main id=noidung starts at {start}, ends at {end}, length = {len(main_html)}")

# Check what child elements are inside main id=noidung
import re
divs = re.findall(r'<div[^>]*id="([^"]+)"', main_html)
print("All element IDs inside main id=noidung:")
print(divs)

