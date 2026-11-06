with open('public/assets/css/vach.css', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Replace :root and remove dark overrides
old_root = """:root{--nen:#eef1ee;--the:#fff;--muc:#15201b;--muc2:#41514a;--muc3:#767c78;--nhan:#deaa26;--nhan-nh:rgba(222,170,38,0.15);--sai:#ac3a2b;--sai-nh:#fbeceb;--vang:#8a6a1e;--vang-nh:#f7efd9;--vien:#d4dad5;--vien2:#e8ebe8;--chon:#deaa26;--bong:0 1px 2px rgba(21,32,27,.06),0 10px 28px -14px rgba(21,32,27,.18)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--nen:#101514;--the:#181e1b;--muc:#e8eeea;--muc2:#a9b5af;--muc3:#7d8b85;--nhan:#deaa26;--nhan-nh:rgba(222,170,38,0.15);--sai:#f08b7c;--sai-nh:#331c19;--vang:#d9b45e;--vang-nh:#3a3016;--vien:#2b3430;--vien2:#222a26;--chon:#deaa26;--bong:0 1px 2px rgba(0,0,0,.45),0 12px 32px -16px rgba(0,0,0,.8)}}
:root[data-theme="dark"]{--nen:#101514;--the:#181e1b;--muc:#e8eeea;--muc2:#a9b5af;--muc3:#7d8b85;--nhan:#deaa26;--nhan-nh:rgba(222,170,38,0.15);--sai:#f08b7c;--sai-nh:#331c19;--vang:#d9b45e;--vang-nh:#3a3016;--vien:#2b3430;--vien2:#222a26;--chon:#deaa26;--bong:0 1px 2px rgba(0,0,0,.45),0 12px 32px -16px rgba(0,0,0,.8)}"""

new_root = """:root, #vachStudioMount{--nen:#f9fafb;--the:#fff;--muc:#15201b;--muc2:#41514a;--muc3:#767c78;--nhan:#deaa26;--nhan-nh:rgba(222,170,38,0.15);--sai:#ac3a2b;--sai-nh:#fbeceb;--vang:#8a6a1e;--vang-nh:#f7efd9;--vien:#d4dad5;--vien2:#e8ebe8;--chon:#deaa26;--bong:0 1px 2px rgba(21,32,27,.06),0 10px 28px -14px rgba(21,32,27,.18)}"""

assert old_root in text, "old_root not found in vach.css"
text = text.replace(old_root, new_root)

# 2. Scope lines 47-50
old_btns = """#vachStudioMount .hang{display:flex;gap:6px;flex-wrap:wrap}.v3 button, .bg-hop button, .pop button, #vachStudioMount button, [data-tang] button{font-family:inherit;font-size:12.5px;font-weight:500;color:var(--muc);background:var(--nen);border:1px solid var(--vien);border-radius:8px;padding:7px 10px;cursor:pointer;transition:.12s}
#vachStudioMount button:hover:not(:disabled), .v3 button:hover:not(:disabled){border-color:var(--nhan);color:var(--nhan)}#vachStudioMount button.ch, .v3 button.ch{background:var(--nhan);border-color:var(--nhan);color:#fff}#vachStudioMount button:disabled, .v3 button:disabled{opacity:.38;cursor:not-allowed}
button.ph{color:var(--sai)}button.ph:hover:not(:disabled){border-color:var(--sai)}#vachStudioMount button.to, .v3 button.to{width:100%;text-align:left}
#vachStudioMount input[type=number], .v3 input[type=number]{font-family:"IBM Plex Mono",monospace;font-size:12.5px;width:100%;padding:6px 8px;border:1px solid var(--vien);border-radius:7px;background:var(--nen);color:var(--muc)}"""

new_btns = """#vachStudioMount .hang{display:flex;gap:6px;flex-wrap:wrap}#vachStudioMount .v3 button, #vachStudioMount .bg-hop button, #vachStudioMount .pop button, #vachStudioMount button, #vachStudioMount [data-tang] button{font-family:inherit;font-size:12.5px;font-weight:500;color:var(--muc);background:var(--nen);border:1px solid var(--vien);border-radius:8px;padding:7px 10px;cursor:pointer;transition:.12s}
#vachStudioMount button:hover:not(:disabled), #vachStudioMount .v3 button:hover:not(:disabled){border-color:var(--nhan);color:var(--nhan)}#vachStudioMount button.ch, #vachStudioMount .v3 button.ch{background:var(--nhan);border-color:var(--nhan);color:#fff}#vachStudioMount button:disabled, #vachStudioMount .v3 button:disabled{opacity:.38;cursor:not-allowed}
#vachStudioMount button.ph{color:var(--sai)}#vachStudioMount button.ph:hover:not(:disabled){border-color:var(--sai)}#vachStudioMount button.to, #vachStudioMount .v3 button.to{width:100%;text-align:left}
#vachStudioMount input[type=number], #vachStudioMount .v3 input[type=number]{font-family:"IBM Plex Mono",monospace;font-size:12.5px;width:100%;padding:6px 8px;border:1px solid var(--vien);border-radius:7px;background:var(--nen);color:var(--muc)}"""

assert old_btns in text, "old_btns not found in vach.css"
text = text.replace(old_btns, new_btns)

# 3. Scope th,td
old_thtd = "}th,td{padding:5px 8px;text-align:left;border-bottom:1px solid var(--vien2)}"
new_thtd = "}#vachStudioMount th,#vachStudioMount td{padding:5px 8px;text-align:left;border-bottom:1px solid var(--vien2)}"
assert old_thtd in text, "old_thtd not found in vach.css"
text = text.replace(old_thtd, new_thtd)

with open('public/assets/css/vach.css', 'w', encoding='utf-8') as f:
    f.write(text)

print("vach.css updated successfully!")
