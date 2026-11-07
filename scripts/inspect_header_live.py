import asyncio, json, websockets, subprocess, time, urllib.request

async def inspect():
    p = subprocess.Popen(['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
                         '--headless=new', '--remote-debugging-port=9228',
                         '--disable-gpu', 'https://truonghai8888.github.io/plastics-enterprise-web-test/'])
    time.sleep(3)
    try:
        resp = urllib.request.urlopen('http://localhost:9228/json').read()
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

            # wait 3s for page load
            await asyncio.sleep(4)

            eval_res = await call('Runtime.evaluate', {
                'expression': """(function() {
                    var header = document.querySelector('header');
                    var img = header ? header.querySelector('img') : null;
                    var svgs = header ? Array.from(header.querySelectorAll('svg')).map(s => ({
                        cls: s.getAttribute('class'),
                        w: s.clientWidth,
                        h: s.clientHeight,
                        display: window.getComputedStyle(s).display,
                        parent: s.parentElement ? s.parentElement.tagName + '.' + s.parentElement.className : ''
                    })) : [];
                    var links = Array.from(document.querySelectorAll('link[rel*="icon"]')).map(l => ({ rel: l.rel, href: l.href }));
                    var failedImgs = Array.from(document.querySelectorAll('img')).filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src);
                    return {
                        url: window.location.href,
                        title: document.title,
                        headerExists: !!header,
                        headerImg: img ? {
                            src: img.src,
                            currentSrc: img.currentSrc,
                            naturalWidth: img.naturalWidth,
                            naturalHeight: img.naturalHeight,
                            display: window.getComputedStyle(img).display,
                            complete: img.complete
                        } : null,
                        failedImgs: failedImgs.slice(0, 10),
                        faviconLinks: links
                    };
                })()""",
                'returnByValue': True
            })
            print("GITHUB RESULT:", json.dumps(eval_res.get('result', {}).get('value', {}), indent=2))
    finally:
        p.kill()

if __name__ == '__main__':
    asyncio.run(inspect())
