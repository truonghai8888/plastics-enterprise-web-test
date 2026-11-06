import re

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

for m in re.finditer(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', html, re.IGNORECASE):
    print(m.group(0))

for m in re.finditer(r'<style[^>]*>(.*?)</style>', html, re.DOTALL | re.IGNORECASE):
    print("Inline <style> length:", len(m.group(1)))
