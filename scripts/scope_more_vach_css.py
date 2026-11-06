with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = [
    ('button.ch{background:var(--nhan);border-color:var(--nhan);color:#fff}',
     '#vachStudioMount button.ch, .v3 button.ch{background:var(--nhan);border-color:var(--nhan);color:#fff}'),
    ('button:disabled{opacity:.38;cursor:not-allowed}',
     '#vachStudioMount button:disabled, .v3 button:disabled{opacity:.38;cursor:not-allowed}'),
    ('button.to{width:100%;text-align:left}',
     '#vachStudioMount button.to, .v3 button.to{width:100%;text-align:left}'),
    ('.cd{background:var(--nen);border-radius:9px;padding:9px 10px;',
     '#vachStudioMount .cd{background:var(--nen);border-radius:9px;padding:9px 10px;'),
    ('input[type=number]{font-family:"IBM Plex Mono"',
     '#vachStudioMount input[type=number], .v3 input[type=number]{font-family:"IBM Plex Mono"'),
]

for old, new in replacements:
    if old in text:
        text = text.replace(old, new)
        print('Replaced:', old[:35])
    else:
        print('Not found:', old[:35])

with open('public/assets/css/vach.css', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated public/assets/css/vach.css')
