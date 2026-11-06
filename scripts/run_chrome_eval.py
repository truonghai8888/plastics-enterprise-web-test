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
    print("Connected to tab:", target["url"])
    
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
    assert "101" in resp, "WS handshake failed"
    print("WebSocket connected successfully!")

    def send_ws(msg_dict):
        data = json.dumps(msg_dict).encode('utf-8')
        length = len(data)
        frame = bytearray([0x81])
        mask = os.urandom(4)
        if length <= 125:
            frame.append(0x80 | length)
        elif length <= 65535:
            frame.append(0x80 | 126)
            frame.extend(length.to_bytes(2, 'big'))
        else:
            frame.append(0x80 | 127)
            frame.extend(length.to_bytes(8, 'big'))
        frame.extend(mask)
        masked = bytearray(b ^ mask[i % 4] for i, b in enumerate(data))
        frame.extend(masked)
        s.sendall(frame)

    def recv_ws():
        header = s.recv(2)
        if not header: return None
        b1, b2 = header[0], header[1]
        length = b2 & 0x7F
        if length == 126:
            length = int.from_bytes(s.recv(2), 'big')
        elif length == 127:
            length = int.from_bytes(s.recv(8), 'big')
        payload = b""
        while len(payload) < length:
            chunk = s.recv(length - len(payload))
            if not chunk: break
            payload += chunk
        return json.loads(payload.decode('utf-8', errors='ignore'))

    test_js = """
    (function() {
      const res = {};
      res.step_initial = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
      res.has_vRong = !!document.getElementById('vRong');
      res.has_boMau = !!document.getElementById('boMau');
      res.so_mau_khoi = document.querySelectorAll('.mau-khoi').length;
      
      // Step 1b click
      const b1b = document.querySelector('button[data-muc="1b"]');
      if (b1b) {
        b1b.click();
        res.step_1b = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
        res.has_dayTam = !!document.getElementById('dayTam');
      }
      
      // Step Next (1c)
      const toi = document.getElementById('v3Toi');
      if (toi) {
        toi.click();
        res.step_toi = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
      }
      
      // Step Prev (1b)
      const lui = document.getElementById('v3Lui');
      if (lui) {
        lui.click();
        res.step_lui = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
      }
      
      // Step 2a (Vật liệu & màu vân)
      const b2a = document.querySelector('button[data-muc="2a"]');
      if (b2a) {
        b2a.click();
        res.step_2a = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
      }
      
      // Modal BaoGia
      const qBaoGia = document.getElementById('qBaoGia');
      if (qBaoGia) {
        qBaoGia.click();
        const hop = document.getElementById('v3Hop');
        res.modal_baogia_open = hop ? !hop.hidden : false;
        const cl = document.querySelector('.bg-hop-x, .ts-x, button[data-dong]');
        if (cl) cl.click();
      }

      // Back to 1a
      const b1a = document.querySelector('button[data-muc="1a"]');
      if (b1a) {
        b1a.click();
        res.step_final = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
        res.final_has_vRong = !!document.getElementById('vRong');
        res.final_has_boMau = !!document.getElementById('boMau');
        res.final_so_mau_khoi = document.querySelectorAll('.mau-khoi').length;
      }

      return res;
    })()
    """

    send_ws({
        "id": 1,
        "method": "Runtime.evaluate",
        "params": {
            "expression": test_js,
            "returnByValue": True
        }
    })

    while True:
        msg = recv_ws()
        if msg and msg.get("id") == 1:
            print("\n========== EVALUATION RESULT ==========")
            print(json.dumps(msg.get("result", {}).get("result", {}).get("value", {}), indent=2, ensure_ascii=False))
            print("=======================================")
            break

finally:
    proc.terminate()
