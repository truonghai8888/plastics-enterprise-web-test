import subprocess
import time
import urllib.request
import json

# Start Edge with remote debugging
proc = subprocess.Popen([
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "about:blank"
])

print("Started Edge, waiting 2s...")
time.sleep(2)

try:
    # Query targets
    req = urllib.request.urlopen("http://localhost:9222/json")
    targets = json.loads(req.read().decode('utf-8'))
    print("Edge targets:", len(targets))
    ws_url = targets[0].get('webSocketDebuggerUrl')
    print("WebSocket URL:", ws_url)
finally:
    proc.terminate()
