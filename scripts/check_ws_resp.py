import subprocess
import json
import time
import urllib.request
import socket
import base64
import os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
proc = subprocess.Popen([
    chrome_path,
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--window-size=1600,1000",
    "http://localhost:3000/tu-thiet-ke-vach"
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

time.sleep(3)

try:
    tabs = json.loads(urllib.request.urlopen("http://localhost:9222/json", timeout=5).read().decode())
    target = next(t for t in tabs if "tu-thiet-ke-vach" in t.get("url", ""))
    ws_url = target["webSocketDebuggerUrl"]

    ws_parts = ws_url.replace("ws://", "").split("/", 1)
    host, port = ws_parts[0].split(":")
    path = "/" + ws_parts[1]

    s = socket.create_connection((host, int(port)), timeout=5)
    key = base64.b64encode(os.urandom(16)).decode()
    handshake = (
        f"GET {path} HTTP/1.1\r\n"
        f"Host: {host}:{port}\r\n"
        "Upgrade: websocket\r\n"
        "Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        "Sec-WebSocket-Version: 13\r\n\r\n"
    )
    s.sendall(handshake.encode())
    resp = s.recv(4096).decode(errors='ignore')
    print("Handshake response:")
    print(resp)
finally:
    proc.terminate()
