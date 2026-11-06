import subprocess

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--disable-gpu",
    "--window-size=1600,1000",
    "--virtual-time-budget=6000",
    "--dump-dom",
    "http://localhost:3000/test_modals.html"
]

res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, encoding='utf-8', errors='ignore')
import re
m = re.search(r'<div id="out">(.*?)</div>', res.stdout, re.DOTALL)
if m:
    print("Found out:")
    print(m.group(1))
else:
    print("out not matched")
