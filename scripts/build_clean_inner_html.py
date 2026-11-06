import re

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    orig = f.read()

# 1. Extract the inner studio container: from <div class="v3"> to the end of modals/templates
start_idx = orig.find('<div class="v3">')
end_idx = orig.find('<footer class="ft"')
inner_html = orig[start_idx:end_idx]

# 2. Sanitize branding & links
inner_html = inner_html.replace('Eco Bamboo', 'Nhựa AMC')
inner_html = inner_html.replace('ECOBAMBOO', 'NHỰA AMC')
inner_html = inner_html.replace('ecobamboo.vn', 'nhuaamc.vn')
inner_html = inner_html.replace('0915.189.389', '0325.999.238')
inner_html = inner_html.replace('0915189389', '0325999238')
inner_html = inner_html.replace('sale.ecobamboo@gmail.com', 'ctyphattriennhuaamc@gmail.com')
inner_html = re.sub(r'data-endpoint="[^"]+"', 'data-endpoint="/api/web-lead"', inner_html)

# 3. Clean any old buttons in .v3-cong before inserting top bar
inner_html = re.sub(r'<button id="qUndo"[^>]*>.*?</button>', '', inner_html)
inner_html = re.sub(r'<button id="qLai"[^>]*>.*?</button>', '', inner_html)

# 4. REMOVE <header class="v3-dau"> entirely from inner_html because it is now rendered in parent component
inner_html = re.sub(r'<header class="v3-dau">.*?</header>', '', inner_html, flags=re.DOTALL)

# Hide/remove original footer .v3-day
inner_html = re.sub(r'<footer class="v3-day">.*?</footer>', '', inner_html, flags=re.DOTALL)

# Remove trackers / external scripts from HTML
inner_html = re.sub(r'<script.*?</script>', '', inner_html, flags=re.DOTALL)

# Clean any unclosed tags at the very end
inner_html = inner_html.strip()
if inner_html.endswith('</main>'):
    inner_html = inner_html[:-7].strip()
if inner_html.endswith('</main>'):
    inner_html = inner_html[:-7].strip()

with open('src/data/vachStudioInnerHtml.js', 'w', encoding='utf-8') as f:
    f.write('export const VACH_STUDIO_INNER_HTML = ' + repr(inner_html) + ';\n')

print(f"Generated clean src/data/vachStudioInnerHtml.js ({len(inner_html)} bytes) - <header class='v3-dau'> removed from inner HTML.")
