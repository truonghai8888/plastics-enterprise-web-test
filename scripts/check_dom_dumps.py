import re

def inspect_dump(filename):
    print(f"=== {filename} ===")
    try:
        with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print("Error reading:", e)
        return
    
    print("Content length:", len(content))
    bomau = re.findall(r'<div class="bo-mau"[^>]*>([\s\S]*?)</div>', content)
    print("Found bo-mau divs:", len(bomau))
    for i, bm in enumerate(bomau):
        print(f"  bo-mau #{i} length: {len(bm)}")
        hinhs = re.findall(r'<span class="hinh"[^>]*>', bm)
        print(f"  hinh count: {len(hinhs)}")
        for h in hinhs[:5]:
            print("    ", h)

inspect_dump('scripts/localhost_dump.html')
inspect_dump('scripts/github_dump.html')
