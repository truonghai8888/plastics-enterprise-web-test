import subprocess

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--disable-gpu",
    "--virtual-time-budget=3000",
    "--dump-dom",
    "http://localhost:3000/tu-thiet-ke-vach"
]

res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='ignore')
print(f"Stdout length: {len(res.stdout)}")
print(f"Stderr length: {len(res.stderr)}")
if res.stderr:
    print("Stderr:", res.stderr[:500])

with open("live_dom.html", "w", encoding="utf-8") as f:
    f.write(res.stdout)

