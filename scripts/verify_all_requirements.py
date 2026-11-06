import urllib.request
import urllib.parse
import json
import re
import sys

def test_site():
    results = {}
    
    # 1. Test /tu-thiet-ke-vach (React SPA Page)
    try:
        req = urllib.request.Request('http://localhost:3000/tu-thiet-ke-vach', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = resp.read().decode('utf-8')
            has_root = '<div id="root">' in body
            has_title = 'Nhựa AMC' in body or 'AMC' in body
            results['tu-thiet-ke-vach'] = {
                'status': resp.status,
                'has_root': has_root,
                'has_title': has_title,
                'ok': resp.status == 200 and has_root
            }
    except Exception as e:
        results['tu-thiet-ke-vach'] = {'error': str(e), 'ok': False}

    # 2. Test /vach-studio.html (Embedded 3D Studio)
    try:
        req = urllib.request.Request('http://localhost:3000/vach-studio.html', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = resp.read().decode('utf-8')
            has_canvas = '<canvas id="c"' in body and 'class="v3-san' in body
            has_header = 'class="v3-dau"' in body
            has_buttons = 'id="qBaoGia"' in body and 'id="qLuu"' in body and 'id="qXuat"' in body
            has_right_panel = 'class="v3-bang"' in body
            has_dock = 'class="v3-cong"' in body
            has_amc = 'NHỰA AMC' in body
            has_green = '#24700b' in body.lower() or '#24700b' in body.upper()
            
            results['vach-studio'] = {
                'status': resp.status,
                'has_canvas': has_canvas,
                'has_header': has_header,
                'has_buttons': has_buttons,
                'has_right_panel': has_right_panel,
                'has_dock': has_dock,
                'has_amc': has_amc,
                'has_green': has_green,
                'ok': resp.status == 200 and has_canvas and has_buttons and not has_green
            }
    except Exception as e:
        results['vach-studio'] = {'error': str(e), 'ok': False}

    # 3. Test /api/web-lead (Quote submission endpoint)
    try:
        data = json.dumps({'name': 'Test User', 'phone': '0987654321', 'note': 'Báo giá vách'}).encode('utf-8')
        req = urllib.request.Request(
            'http://localhost:3000/api/web-lead',
            data=data,
            headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'},
            method='POST'
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp_body = resp.read().decode('utf-8')
            resp_json = json.loads(resp_body)
            results['api-web-lead'] = {
                'status': resp.status,
                'response': resp_json,
                'ok': resp.status == 200 and resp_json.get('status') == 'ok'
            }
    except Exception as e:
        results['api-web-lead'] = {'error': str(e), 'ok': False}

    # 4. Test /assets/css/vach.css (No greens)
    try:
        req = urllib.request.Request('http://localhost:3000/assets/css/vach.css', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            css = resp.read().decode('utf-8')
            has_gold = '#deaa26' in css
            has_green = '#24700b' in css.lower()
            results['vach-css'] = {
                'status': resp.status,
                'has_gold': has_gold,
                'has_green': has_green,
                'ok': resp.status == 200 and has_gold and not has_green
            }
    except Exception as e:
        results['vach-css'] = {'error': str(e), 'ok': False}

    # 5. Test /assets/js/vach.js (No green constants)
    try:
        req = urllib.request.Request('http://localhost:3000/assets/js/vach.js', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            js = resp.read().decode('utf-8')
            has_gold = '#deaa26' in js
            has_green = '#24700b' in js.lower()
            results['vach-js'] = {
                'status': resp.status,
                'has_gold': has_gold,
                'has_green': has_green,
                'ok': resp.status == 200 and has_gold and not has_green
            }
    except Exception as e:
        results['vach-js'] = {'error': str(e), 'ok': False}

    print(json.dumps(results, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    test_site()
