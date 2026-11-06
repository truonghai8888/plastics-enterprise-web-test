import subprocess
import json
import time
import urllib.request
import sys

# Start Chrome with remote debugging
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
proc = subprocess.Popen([
    chrome_path,
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--window-size=1600,1000",
    "about:blank"
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

time.sleep(2)

try:
    # Get WebSocket debugger URL
    tabs_url = "http://localhost:9222/json"
    req = urllib.request.urlopen(tabs_url, timeout=5)
    tabs = json.loads(req.read().decode())
    print("Found tabs:", len(tabs))
    ws_url = tabs[0]["webSocketDebuggerUrl"]
    print("Debugger URL:", ws_url)
except Exception as e:
    print("Error connecting to Chrome:", e)
    proc.terminate()
    sys.exit(1)

# We can communicate with WebSocket or simple HTTP
proc.terminate()
