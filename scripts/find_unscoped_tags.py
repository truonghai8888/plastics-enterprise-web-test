with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.findall(r'(?:^|\})\s*(button|input|a|select|textarea|label|table|th|td|p|h1|h2|h3|h4|h5|h6|ul|ol|li)\s*\{', css)
print("Unscoped tag selectors found in vach.css:", set(matches))
for m in set(matches):
    for match in re.finditer(rf'(?:^|\}})\s*{m}\s*\{{[^}}]*\}}', css):
        print(match.group(0)[:120].strip())

