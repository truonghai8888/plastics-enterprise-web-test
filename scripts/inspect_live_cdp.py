import asyncio
import subprocess
import time
import urllib.request
import json
import base64
import websockets

async def run():
    proc = subprocess.Popen([
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        "--headless=new",
        "--remote-debugging-port=9222",
        "--disable-gpu",
        "--window-size=1280,1024",
        "about:blank"
    ])
    time.sleep(2)

    try:
        req = urllib.request.urlopen("http://localhost:9222/json")
        targets = json.loads(req.read().decode('utf-8'))
        page_target = next(t for t in targets if t.get('type') == 'page')
        ws_url = page_target['webSocketDebuggerUrl']

        async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
            msg_id = 0
            async def send(method, params=None):
                nonlocal msg_id
                msg_id += 1
                mid = msg_id
                payload = {'id': mid, 'method': method}
                if params:
                    payload['params'] = params
                await ws.send(json.dumps(payload))
                while True:
                    res = json.loads(await ws.recv())
                    if res.get('id') == mid:
                        return res

            await send('Network.enable')
            await send('Page.enable')
            await send('Runtime.enable')

            url = 'https://truonghai8888.github.io/plastics-enterprise-web-test/tu-thiet-ke-vach'
            print("Navigating to:", url)
            await send('Page.navigate', {'url': url})

            await asyncio.sleep(6)

            # Let's inspect elements directly
            res = await send('Runtime.evaluate', {
                'expression': """
                (() => {
                    const bang = document.getElementById('v3Bang');
                    const bmc = document.getElementById('boMau');
                    if (bmc && bang) {
                        bang.scrollTop = bmc.offsetTop - 50;
                    }
                    const cards = Array.from(document.querySelectorAll('#boMau .mau-khoi'));
                    return cards.map(c => {
                        const h = c.querySelector('.hinh');
                        const s = h ? window.getComputedStyle(h) : null;
                        return {
                            name: c.querySelector('b')?.innerText,
                            inlineStyle: h ? h.getAttribute('style') : null,
                            computedBg: s ? s.backgroundImage : null,
                            computedDisplay: s ? s.display : null,
                            computedWidth: s ? s.width : null,
                            computedHeight: s ? s.height : null
                        };
                    });
                })()
                """,
                'returnByValue': True
            })

            print("Cards data:")
            print(json.dumps(res.get('result', {}).get('value'), indent=2, ensure_ascii=False))

            # Take clip screenshot of #boMau
            clip_res = await send('Runtime.evaluate', {
                'expression': """
                (() => {
                    const el = document.getElementById('boMau');
                    if (!el) return null;
                    const r = el.getBoundingClientRect();
                    return { x: r.x, y: r.y, width: r.width, height: r.height };
                })()
                """,
                'returnByValue': True
            })
            clip = clip_res.get('result', {}).get('value')
            print("Clip rect:", clip)

            if clip and clip['width'] > 0 and clip['height'] > 0:
                shot = await send('Page.captureScreenshot', {
                    'format': 'png',
                    'clip': {
                        'x': max(0, clip['x']),
                        'y': max(0, clip['y']),
                        'width': clip['width'],
                        'height': min(600, clip['height']),
                        'scale': 1
                    }
                })
                data = shot.get('result', {}).get('data')
                if data:
                    with open('scripts/bomau_clipped.png', 'wb') as f:
                        f.write(base64.b64decode(data))
                    print("Saved scripts/bomau_clipped.png")

    finally:
        proc.terminate()

if __name__ == '__main__':
    asyncio.run(run())
