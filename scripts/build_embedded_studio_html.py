import re

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Title and Meta
html = re.sub(r'<title>.*?</title>', '<title>Nhựa AMC — 3D Wall Studio</title>', html)
html = html.replace('content="#24700B"', 'content="#deaa26"')
html = html.replace('Eco Bamboo', 'Nhựa AMC')
html = html.replace('ECOBAMBOO', 'NHỰA AMC')
html = html.replace('ecobamboo.vn', 'nhuaamc.vn')
html = html.replace('0915.189.389', '0325.999.238')
html = html.replace('0915189389', '0325999238')
html = html.replace('sale.ecobamboo@gmail.com', 'ctyphattriennhuaamc@gmail.com')

# 2. Remove Trackers & Outside Header/Footer
html = re.sub(r'<script>\(function\(\){var H=\[\'ecobamboo\.vn\'.*?</script>', '', html, flags=re.DOTALL)
html = re.sub(r'<noscript><iframe src="https://www\.googletagmanager\.com.*?</noscript>', '', html, flags=re.DOTALL)
html = re.sub(r'<div class="topbar">.*?</div>\s*</div>', '', html, flags=re.DOTALL)
html = re.sub(r'<header class="hdr" id="hdr">.*?</header>', '', html, flags=re.DOTALL)
html = re.sub(r'<aside class="drawer".*?</aside>', '', html, flags=re.DOTALL)
html = re.sub(r'<footer class="ft".*?</footer>', '', html, flags=re.DOTALL)
html = re.sub(r'<button id="toTop".*?</button>', '', html, flags=re.DOTALL)

# Remove qUndo/qLai from .v3-cong before injecting top bar
html = re.sub(r'<button id="qUndo"[^>]*>.*?</button>', '', html)
html = re.sub(r'<button id="qLai"[^>]*>.*?</button>', '', html)

# 3. CONSOLIDATE STUDIO HEADER & FOOTER INTO 1 SINGLE ROW AT TOP
consolidated_top_bar = '''<header class="v3-dau">
    <div class="v3-dau-brand">
      <a class="v3-logo" href="/" target="_top" aria-label="Nhựa AMC — về trang chủ">
        <img src="/images/nhuaamc/logo-amc2.jpg" alt="AMC" />
        <b>NHỰA AMC</b>
        <span>3D STUDIO</span>
      </a>
      <span class="v3-ten">Tự thiết kế vách</span>
      <span class="v3-ma" id="v3Ma"></span>
    </div>

    <div class="v3-dau-history">
      <button id="qUndo" class="q-nho" title="Hoàn tác (Ctrl+Z)">↺ Hoàn tác</button>
      <button id="qLai" class="q-nho" title="Làm lại (Ctrl+Y)">↻ Làm lại</button>
    </div>

    <!-- Thông số kích thước & tạm tính dời từ thanh đáy lên hàng đầu -->
    <div class="v3-so" id="v3So"></div>

    <!-- Nút điều hướng bước lùi/tiếp dời từ thanh đáy lên hàng đầu -->
    <div class="v3-di">
      <button id="v3Lui" class="ph" title="Quay lại bước trước">← Lùi</button>
      <button id="v3Toi" class="to" title="Tiếp tục bước tiếp theo">Tiếp →</button>
    </div>

    <div class="v3-dau-actions">
      <button id="qLuu" class="q-nho" title="Lưu vách này vào trình duyệt hoặc lấy link gửi cho thợ">💾 Gửi cho thợ</button>
      <button id="qXuat" class="q-nho" title="Xuất hồ sơ: tệp PDF bản vẽ thi công và ảnh vách">📄 Xuất hồ sơ</button>
      <button id="qBaoGia" class="q-cta" title="Xem tạm tính theo giá niêm yết và gửi yêu cầu báo giá">⚡ Nhận báo giá</button>
    </div>
  </header>'''

html = re.sub(r'<header class="v3-dau">.*?</header>', consolidated_top_bar, html, flags=re.DOTALL)
html = re.sub(r'<footer class="v3-day">.*?</footer>', '', html, flags=re.DOTALL)

# 4. Update Form Endpoint
html = re.sub(r'data-endpoint="[^"]+"', 'data-endpoint="/api/web-lead"', html)

# 5. Modern styles
modern_styles = '''
<style>
  :root {
    --xanh: #deaa26 !important;
    --nhan: #deaa26 !important;
    --nhan-nh: rgba(222, 170, 38, 0.15) !important;
    --ok: #deaa26 !important;
    --muc: #fdf6e7 !important;
    --muc2: #d1c7bc !important;
    --muc3: #9e9488 !important;
    --nen: #141312 !important;
    --the: #1e1c19 !important;
    --vien: rgba(222, 170, 38, 0.25) !important;
    --green-900: #1e1c19 !important;
    --green-800: #26231f !important;
    --green-700: #deaa26 !important;
    --green-600: #b88b1b !important;
    --green-500: #e6b83b !important;
    --green-100: #fdf6e7 !important;
  }

  body {
    margin: 0 !important;
    padding: 0 !important;
    background: #141312 !important;
    color: #fdf6e7 !important;
    font-family: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif !important;
    overflow: hidden !important;
  }

  .vach-trang, .bao {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
  }

  .vach-h1, .vach-phu {
    display: none !important;
  }

  .v3 {
    height: 100vh !important;
    max-height: 100vh !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    border: none !important;
    display: grid !important;
    grid-template-columns: 240px minmax(0, 1fr) 380px !important;
    grid-template-rows: 58px minmax(0, 1fr) !important;
    grid-template-areas: "dau dau dau" "cot san bang" !important;
  }

  .v3-dau {
    background: #1e1c19 !important;
    border-bottom: 1.5px solid rgba(222, 170, 38, 0.3) !important;
    height: 58px !important;
    padding: 0 16px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px !important;
    overflow-x: auto !important;
    scrollbar-width: none !important;
  }
  .v3-dau::-webkit-scrollbar { display: none !important; }

  .v3-dau-brand { display: flex !important; align-items: center !important; gap: 8px !important; flex-shrink: 0 !important; }
  .v3-logo { display: flex !important; align-items: center !important; text-decoration: none !important; gap: 8px !important; }
  .v3-logo img { height: 32px !important; border-radius: 6px !important; border: 1px solid rgba(222, 170, 38, 0.4) !important; background: #fff; padding: 1px; }
  .v3-logo b { color: #deaa26 !important; font-size: 15px !important; font-weight: 900 !important; letter-spacing: 0.5px !important; }
  .v3-logo span { font-size: 10px !important; font-weight: 700 !important; color: #d1a56c !important; background: rgba(222, 170, 38, 0.15) !important; padding: 2px 6px !important; border-radius: 4px !important; border: 1px solid rgba(222, 170, 38, 0.3) !important; }
  .v3-ten { font-weight: 700 !important; color: #fff !important; font-size: 13px !important; }
  .v3-ma { color: #deaa26 !important; font-weight: 700 !important; background: rgba(222, 170, 38, 0.12) !important; padding: 2px 8px !important; border-radius: 6px !important; border: 1px solid rgba(222, 170, 38, 0.3) !important; font-size: 11px !important; }

  .v3-dau-history { display: flex !important; align-items: center !important; gap: 6px !important; flex-shrink: 0 !important; }
  .v3-dau .v3-so {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    font-size: 12px !important;
    color: #d1c7bc !important;
    background: rgba(46, 43, 39, 0.6) !important;
    padding: 5px 12px !important;
    border-radius: 8px !important;
    border: 1px solid rgba(222, 170, 38, 0.2) !important;
    white-space: nowrap !important;
    flex-shrink: 0 !important;
  }
  .v3-dau .v3-so b, .v3-dau .v3-so span b { color: #deaa26 !important; font-weight: 800 !important; }

  .v3-dau .v3-di { display: flex !important; align-items: center !important; gap: 6px !important; flex-shrink: 0 !important; }
  .v3-dau .v3-di button {
    height: 32px !important;
    padding: 0 14px !important;
    border-radius: 8px !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    transition: all 0.15s ease !important;
  }
  .v3-dau .v3-di .ph { background: #2e2b27 !important; color: #fdf6e7 !important; border: 1px solid rgba(222, 170, 38, 0.3) !important; }
  .v3-dau .v3-di .ph:hover { background: #3d3934 !important; border-color: #deaa26 !important; }
  .v3-dau .v3-di .to {
    background: linear-gradient(135deg, #deaa26, #b88b1b) !important;
    color: #1e1c19 !important;
    font-weight: 800 !important;
    border: none !important;
    box-shadow: 0 2px 8px rgba(222, 170, 38, 0.3) !important;
  }
  .v3-dau .v3-di .to:hover {
    background: linear-gradient(135deg, #f0b930, #c8961e) !important;
    box-shadow: 0 4px 12px rgba(222, 170, 38, 0.4) !important;
  }

  .v3-dau-actions { display: flex !important; align-items: center !important; gap: 8px !important; flex-shrink: 0 !important; margin-left: auto !important; }
  .v3-dau button.q-nho {
    height: 32px !important;
    padding: 0 12px !important;
    border-radius: 8px !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    background: #2e2b27 !important;
    color: #fdf6e7 !important;
    border: 1px solid rgba(222, 170, 38, 0.3) !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 5px !important;
  }
  .v3-dau button.q-nho:hover { background: #3d3934 !important; border-color: #deaa26 !important; color: #fff !important; }
  .v3-dau button.q-cta {
    height: 34px !important;
    padding: 0 16px !important;
    border-radius: 8px !important;
    font-size: 12.5px !important;
    font-weight: 800 !important;
    background: linear-gradient(135deg, #deaa26, #b88b1b) !important;
    color: #1e1c19 !important;
    border: none !important;
    box-shadow: 0 2px 10px rgba(222, 170, 38, 0.4) !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 5px !important;
  }
  .v3-dau button.q-cta:hover {
    background: linear-gradient(135deg, #f0b930, #c8961e) !important;
    box-shadow: 0 4px 14px rgba(222, 170, 38, 0.5) !important;
  }

  .v3-day { display: none !important; }

  html.v3-mau:not(.dt-on) .v3-san,
  .v3-san {
    visibility: visible !important;
    display: block !important;
    position: relative !important;
    height: 100% !important;
    min-height: 0 !important;
    pointer-events: auto !important;
    border: 0 !important;
    z-index: 1 !important;
    background: radial-gradient(circle at 50% 40%, #2a2620 0%, #151311 100%) !important;
  }

  .v3-san canvas#c {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
    object-fit: contain !important;
  }

  html.v3-mau:not(.dt-on) .v3-bang,
  .v3-bang {
    grid-column: 3 !important;
    grid-area: bang !important;
    width: 380px !important;
    max-width: 380px !important;
    z-index: 2 !important;
    background: #1e1c19 !important;
    border-left: 1.5px solid rgba(222, 170, 38, 0.25) !important;
    padding: 18px 16px !important;
    color: #fdf6e7 !important;
    overflow-y: auto !important;
  }

  .goiy, .v3-nhac { display: none !important; }

  .v3-cot {
    background: #1e1c19 !important;
    border-right: 1.5px solid rgba(222, 170, 38, 0.25) !important;
    padding: 14px 10px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    overflow-y: auto !important;
    grid-area: cot !important;
  }
  .v3-cot a, .v3-cot button {
    border-radius: 10px !important;
    padding: 10px 12px !important;
    color: #d1c7bc !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    border: 1.5px solid transparent !important;
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    text-decoration: none !important;
  }
  .v3-cot a:hover, .v3-cot button:hover {
    background: rgba(222, 170, 38, 0.1) !important;
    color: #deaa26 !important;
  }
  .v3-cot a.on, .v3-cot button.on {
    background: linear-gradient(135deg, rgba(222, 170, 38, 0.2), rgba(222, 170, 38, 0.05)) !important;
    border: 1.5px solid #deaa26 !important;
    color: #deaa26 !important;
    font-weight: 800 !important;
    box-shadow: 0 0 12px rgba(222, 170, 38, 0.15) !important;
  }

  .v3-bang .nh, .v3-bang h3, .v3-bang h4, .v3-bang summary {
    color: #deaa26 !important;
    font-size: 13.5px !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }
  .v3-bang section, .v3-bang .card, .v3-bang [data-tang] {
    background: #26231f !important;
    border: 1px solid rgba(222, 170, 38, 0.2) !important;
    border-radius: 12px !important;
    padding: 14px !important;
    margin-bottom: 14px !important;
  }
  .v3-bang .stt, .stt {
    background: #deaa26 !important;
    color: #141312 !important;
    font-weight: 900 !important;
  }
  .bo-mau button {
    border-radius: 8px !important;
    border: 2px solid rgba(222, 170, 38, 0.2) !important;
    background: #2e2b27 !important;
  }
  .bo-mau button:hover { border-color: #deaa26 !important; }
  .bo-mau button.on, .bo-mau .chon {
    border-color: #deaa26 !important;
    outline: 2px solid #deaa26 !important;
    box-shadow: 0 0 10px rgba(222, 170, 38, 0.5) !important;
  }
  .so-cum { background: #2e2b27 !important; border: 1.5px solid rgba(222, 170, 38, 0.35) !important; }
  .so-nut { color: #deaa26 !important; background: #38342e !important; }
  .so-nut:hover { background: #deaa26 !important; color: #1e1c19 !important; }

  .v3-cong {
    position: absolute !important;
    bottom: 16px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    background: rgba(26, 24, 21, 0.88) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(222, 170, 38, 0.35) !important;
    border-radius: 30px !important;
    padding: 6px 14px !important;
    z-index: 10 !important;
  }
  .v3-cong button, .v3-goc button {
    background: rgba(46, 43, 39, 0.8) !important;
    border: 1px solid rgba(222, 170, 38, 0.3) !important;
    color: #fdf6e7 !important;
    border-radius: 20px !important;
    padding: 6px 12px !important;
    font-size: 12px !important;
    font-weight: 700 !important;
  }
  .v3-cong button:hover, .v3-goc button:hover { background: #deaa26 !important; color: #1e1c19 !important; }
  .v3-goc button.on { background: #deaa26 !important; color: #1e1c19 !important; }

  .bg-hop {
    background: #1e1c19 !important;
    border: 1.5px solid #deaa26 !important;
    border-radius: 16px !important;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85) !important;
    color: #fdf6e7 !important;
    padding: 24px !important;
  }
  .bg-hop h2, .bg-hop h3 { color: #deaa26 !important; font-weight: 800 !important; }
  .bg-form input, .bg-form select, .bg-form textarea {
    background: #26231f !important;
    border: 1px solid rgba(222, 170, 38, 0.3) !important;
    border-radius: 8px !important;
    color: #fff !important;
    padding: 8px 12px !important;
  }
  .bg-form input:focus, .bg-form select:focus { border-color: #deaa26 !important; outline: none !important; }
</style>
<script>
  window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form[data-eb-form]').forEach(function(f) {
      f.addEventListener('submit', function(e) {
        e.preventDefault();
        var ten = (f.querySelector('input[name="ten"]') || {}).value || '';
        var sdt = (f.querySelector('input[name="sdt"]') || {}).value || '';
        if(!ten.trim() || !sdt.trim()) {
          alert('Vui lòng điền họ tên và số điện thoại để nhận báo giá chi tiết!');
          return;
        }
        fetch('/api/web-lead', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            ten: ten,
            sdt: sdt,
            tinh: (f.querySelector('input[name="tinh"]') || {}).value || '',
            noi_dung: (f.querySelector('textarea[name="noi_dung"]') || {}).value || '',
            hop: 'tu_thiet_ke_vach',
            vach_ma: (f.querySelector('input[name="vach_ma"]') || {}).value || (document.getElementById('v3Ma') || {}).textContent || '',
            vach_khoi_luong: (f.querySelector('input[name="vach_khoi_luong"]') || {}).value || '',
            vach_link: window.location.href
          })
        }).then(function(res) { return res.json(); }).then(function(data) {
          alert('Đã gửi yêu cầu báo giá thành công! Ban tư vấn kỹ thuật Nhựa AMC sẽ liên hệ tư vấn phương án & gửi dự toán chi tiết cho anh/chị ngay.');
          var btnClose = f.closest('.bg-hop') ? f.closest('.bg-hop').querySelector('.bg-hop-x, .ts-x, button[data-dong]') : null;
          if (btnClose) btnClose.click();
        }).catch(function(err) {
          alert('Đã gửi yêu cầu báo giá thành công! Ban tư vấn kỹ thuật Nhựa AMC sẽ liên hệ tư vấn phương án & gửi dự toán chi tiết cho anh/chị ngay.');
        });
      });
    });
  });
</script>
'''

html = html.replace('</head>', modern_styles + '\n</head>')

with open('public/vach-studio.html', 'w', encoding='utf-8') as f:
    f.write(html)
print(f"Generated public/vach-studio.html ({len(html)} bytes)")
