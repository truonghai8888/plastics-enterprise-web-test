import subprocess

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--disable-gpu",
    "--window-size=1600,1000",
    "--virtual-time-budget=4000",
    "--dump-dom",
    "http://localhost:3000/tu-thiet-ke-vach"
]

res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='ignore')
with open("live_desktop_dom.html", "w", encoding="utf-8") as f:
    f.write(res.stdout)
print("Dumped desktop DOM:", len(res.stdout))
