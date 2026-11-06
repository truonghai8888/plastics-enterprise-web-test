import urllib.request
import json
import re

def verify():
    results = {}

    # 1. Test /tu-thiet-ke-vach
    try:
        req = urllib.request.Request('http://localhost:3000/tu-thiet-ke-vach', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode('utf-8')
            has_root = '<div id="root">' in body

            # Find the JS bundle
            js_match = re.search(r'src="(/assets/index-[^"]+\.js)"', body)
            js_bundle_url = 'http://localhost:3000' + js_match.group(1) if js_match else None

            bundle_has_studio = False
            bundle_has_iframe = False
            bundle_has_v3dau = False
            bundle_has_v3so = False
            bundle_has_canvas = False

            if js_bundle_url:
                with urllib.request.urlopen(js_bundle_url) as js_resp:
                    bundle_text = js_resp.read().decode('utf-8')
                    bundle_has_studio = 'vachStudioMount' in bundle_text
                    bundle_has_v3dau = 'v3-dau' in bundle_text
                    bundle_has_v3so = 'id=\\"v3So\\"' in bundle_text or 'id="v3So"' in bundle_text
                    bundle_has_canvas = 'id=\\"c\\"' in bundle_text or 'id="c"' in bundle_text
                    # Check if iframe to vach-studio.html exists in bundle
                    bundle_has_iframe = 'vach-studio.html' in bundle_text

            results['page_tu_thiet_ke_vach'] = {
                'status': resp.status,
                'has_root': has_root,
                'js_bundle': js_bundle_url,
                'bundle_has_direct_studio': bundle_has_studio,
                'bundle_has_v3dau': bundle_has_v3dau,
                'bundle_has_v3so_in_topbar': bundle_has_v3so,
                'bundle_has_canvas': bundle_has_canvas,
                'bundle_uses_iframe': bundle_has_iframe,
                'ok': resp.status == 200 and has_root and bundle_has_studio and not bundle_has_iframe
            }
    except Exception as e:
        results['page_tu_thiet_ke_vach'] = {'error': str(e), 'ok': False}

    # 2. Test CSS for greens
    try:
        req = urllib.request.Request('http://localhost:3000/assets/css/vach.css', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            css = resp.read().decode('utf-8')
            greens = [c for c in ['#1ac75c', '#0d6b31', '#1f7a3d', '#8fe3bd', '#9ef7c4', '#0a7a3a', '#5cc294', '#1c6b4a', '#24700b'] if c in css.lower()]
            results['vach_css_greens'] = {
                'status': resp.status,
                'greens_found': greens,
                'ok': resp.status == 200 and len(greens) == 0
            }
    except Exception as e:
        results['vach_css_greens'] = {'error': str(e), 'ok': False}

    # 3. Test JS for greens
    try:
        req = urllib.request.Request('http://localhost:3000/assets/js/vach.js', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            js = resp.read().decode('utf-8')
            # Check green hex values
            greens = [c for c in ['"#1ac75c"', "'#1ac75c'", '"#0a7a3a"', "'#0a7a3a'", '#24700b'] if c in js.lower()]
            results['vach_js_greens'] = {
                'status': resp.status,
                'greens_found': greens,
                'ok': resp.status == 200 and len(greens) == 0
            }
    except Exception as e:
        results['vach_js_greens'] = {'error': str(e), 'ok': False}

    # 4. Test API
    try:
        data = json.dumps({'ten': 'Test', 'sdt': '0912345678'}).encode('utf-8')
        req = urllib.request.Request(
            'http://localhost:3000/api/web-lead',
            data=data,
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        with urllib.request.urlopen(req) as resp:
            resp_data = json.loads(resp.read().decode('utf-8'))
            results['api_web_lead'] = {
                'status': resp.status,
                'response': resp_data,
                'ok': resp.status == 200 and resp_data.get('status') == 'ok'
            }
    except Exception as e:
        results['api_web_lead'] = {'error': str(e), 'ok': False}

    print(json.dumps(results, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    verify()
