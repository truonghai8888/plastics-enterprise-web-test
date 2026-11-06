import subprocess

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--disable-gpu",
    "--window-size=1600,1000",
    "--virtual-time-budget=8000",
    "--dump-dom",
    "http://localhost:3000/test_full_suite.html"
]

res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, encoding='utf-8', errors='ignore')
import re
m = re.search(r'<div id="results">(.*?)</div>', res.stdout, re.DOTALL)
if m:
    print("Full suite test results:")
    print(m.group(1))
else:
    print("results not found, stdout preview:")
    print(res.stdout[:1000])
