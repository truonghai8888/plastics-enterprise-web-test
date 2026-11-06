with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
muc_text = text[text.find('const MUC=['):text.find('];', text.find('const MUC=['))]
nodes = re.findall(r'node:\s*\[([^\]]+)\]', muc_text)
all_nodes = []
for n in nodes:
    items = [x.strip().strip('"\'') for x in n.split(',')]
    all_nodes.extend(items)

with open('src/data/vachStudioInnerHtml.js', 'r', encoding='utf-8') as f:
    inner_html = f.read()

missing = []
for node_id in set(all_nodes):
    if f'id="{node_id}"' not in inner_html and f"id='{node_id}'" not in inner_html:
        missing.append(node_id)

print(f"Total unique nodes in MUC: {len(set(all_nodes))}")
print("Missing nodes in VACH_STUDIO_INNER_HTML:", missing)
