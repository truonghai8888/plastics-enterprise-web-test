with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# We want to find which selectors in vach.css match a button that is inside Header.
# Header structure:
# <html class="v3-on dt-app dt-on v3-mau">
#   <body>
#     <div id="root">
#       <div class="min-h-screen flex flex-col bg-white">
#         <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-eco-gray-200">
#           ...
#           <button class="flex items-center px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap rounded-lg transition-colors text-eco-gray-800 hover:text-bamboo-600 hover:bg-bamboo-50/70">
#             Sản phẩm chính
#           </button>

rules = re.findall(r'([^{}]+)\{([^{}]+)\}', text)

print("Checking matching rules on Header button:")
for sel, body in rules:
    sel = sel.strip()
    if sel.startswith('@'): continue
    for s in sel.split(','):
        s = s.strip()
        tokens = s.split()
        if not tokens: continue
        last = tokens[-1]
        if last.startswith('button') or last == 'button':
            # check ancestor tokens
            ancestors = tokens[:-1]
            # If there are no ancestors, it matches ALL buttons!
            if not ancestors:
                print(f"MATCH (universal button): [{s}] => {body[:60]}")
            else:
                # check if ancestors could match html/body/root/header/div
                can_match = True
                for a in ancestors:
                    if a in ['html', 'body', 'html.v3-on', 'html.dt-on', 'html.dt-app', 'html.v3-mau', ':root']:
                        continue
                    else:
                        can_match = False
                        break
                if can_match:
                    print(f"MATCH (html/body ancestor): [{s}] => {body[:60]}")
