with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
# extract all nodes from MUC
muc_text = text[text.find('const MUC=['):text.find('];', text.find('const MUC=['))]
nodes = re.findall(r'node:\s*\[([^\]]+)\]', muc_text)
all_nodes = []
for n in nodes:
    items = [x.strip().strip('"\'') for x in n.split(',')]
    all_nodes.extend(items)

print(f"Total nodes in MUC: {len(all_nodes)}")
print("Nodes list:", all_nodes)

from src.data.vachStudioInnerHtml import VACH_STUDIO_INNER_HTML
missing = []
for node_id in all_nodes:
    if f'id="{node_id}"' not in VACH_STUDIO_INNER_HTML and f"id='{node_id}'" not in VACH_STUDIO_INNER_HTML:
        missing.append(node_id)

print("Missing nodes in VACH_STUDIO_INNER_HTML:", missing)
