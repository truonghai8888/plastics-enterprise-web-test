import asyncio, json, websockets, subprocess, time, urllib.request

async def test():
    p = subprocess.Popen(['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
                         '--headless=new', '--remote-debugging-port=9229',
                         '--disable-gpu', 'https://truonghai8888.github.io/plastics-enterprise-web-test/tu-thiet-ke-vach'])
    time.sleep(3)
    try:
        resp = urllib.request.urlopen('http://localhost:9229/json').read()
        tabs = json.loads(resp)
        page_tabs = [t for t in tabs if t.get('type') == 'page']
        ws_url = page_tabs[0]['webSocketDebuggerUrl']
        async with websockets.connect(ws_url) as ws:
            mid = 0
            async def call(method, params=None):
                nonlocal mid
                mid += 1
                cur_id = mid
                await ws.send(json.dumps({'id': cur_id, 'method': method, 'params': params or {}}))
                while True:
                    m = json.loads(await ws.recv())
                    if m.get('id') == cur_id:
                        return m.get('result')

            await asyncio.sleep(4)
            eval_res = await call('Runtime.evaluate', {
                'expression': """(function() {
                    var header = document.querySelector('header');
                    var img = header ? header.querySelector('img') : null;
                    return {
                        url: window.location.href,
                        img: img ? {
                            src: img.src,
                            display: window.getComputedStyle(img).display,
                            naturalWidth: img.naturalWidth,
                            complete: img.complete
                        } : null
                    };
                })()""",
                'returnByValue': True
            })
            print("HEADER ON tu-thiet-ke-vach:", json.dumps(eval_res.get('result', {}).get('value', {}), indent=2))
    finally:
        p.kill()

if __name__ == '__main__':
    asyncio.run(test())
