import subprocess

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--disable-gpu",
    "--window-size=1600,1000",
    "--virtual-time-budget=6000",
    "--dump-dom",
    "http://localhost:3000/test_step3.html"
]

res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, encoding='utf-8', errors='ignore')
import re
m = re.search(r'<div id="out">(.*?)</div>', res.stdout, re.DOTALL)
if m:
    print("Found out for step 3:")
    print(m.group(1)[:2000])
else:
    print("out not matched")
