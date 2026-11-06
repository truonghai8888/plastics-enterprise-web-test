with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

start = html.find('<main id="noidung"')
end = html.find('</main>', start)
full_main = html[start:end+7]

# Save to a clean snippet file
with open('scraped_data/vach_inner.html', 'w', encoding='utf-8') as f:
    f.write(full_main)

print(f"Extracted vach inner HTML: {len(full_main)} characters")
