import re

# Read the raw crawled HTML
with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Title and Meta
html = re.sub(r'<title>.*?</title>', '<title>Tự Thiết Kế Vách 3D Studio — Nhựa AMC | Bóc Tách Vật Tư & Dự Toán</title>', html)
html = html.replace('content="#24700B"', 'content="#deaa26"')
html = html.replace('Eco Bamboo', 'Nhựa AMC')
html = html.replace('ECOBAMBOO', 'NHỰA AMC')
html = html.replace('ecobamboo.vn', 'nhuaamc.vn')

# 2. Update Social Links
html = html.replace('https://www.facebook.com/tamopecobamboo', 'https://www.facebook.com/profile.php?id=61558413806518')
html = html.replace('https://www.youtube.com/@EcoBamboo-Tamopdanang', 'https://www.youtube.com/@Nh%E1%BB%B1aAMC')
html = html.replace('https://www.tiktok.com/@ecobamboo.vn', 'https://www.tiktok.com/@amcplastic_?_r=1&_t=ZS-9BANDAJZ5tN')
html = html.replace('https://www.tiktok.com/@nhuaamc.vn', 'https://www.tiktok.com/@amcplastic_?_r=1&_t=ZS-9BANDAJZ5tN')
html = html.replace('https://zalo.me/0915189389', 'https://zalo.me/0325999238')

# 3. Update Hotlines & Contacts
html = html.replace('0915.189.389', '0325.999.238')
html = html.replace('0915189389', '0325999238')
html = html.replace('sale.ecobamboo@gmail.com', 'ctyphattriennhuaamc@gmail.com')

# 4. Remove GTM & External Trackers
html = re.sub(r'<script>\(function\(\){var H=\[\'ecobamboo\.vn\'.*?</script>', '', html, flags=re.DOTALL)
html = re.sub(r'<noscript><iframe src="https://www\.googletagmanager\.com.*?</noscript>', '', html, flags=re.DOTALL)

# 5. Hide the green .topbar
html = html.replace('<div class="topbar">', '<div class="topbar" style="display:none !important">')

# 6. Replace Header with AMC Brand Header
amc_header = '''
<header class="hdr" id="hdr" style="background:#fff;border-bottom:1px solid #e5e7eb;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
  <div class="wrap-wide hdr-in" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px">
    <a class="brand" href="/" aria-label="Nhựa AMC — trang chủ" style="display:flex;align-items:center;text-decoration:none">
      <img src="/images/nhuaamc/logo-amc2.jpg" alt="Nhựa AMC" style="height:44px;width:auto;border-radius:8px;margin-right:12px;background:#fff;padding:2px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
      <div style="display:flex;flex-direction:column;line-height:1.15">
        <span style="font-weight:900;font-size:18px;color:#1e1c19;letter-spacing:0.5px">NHỰA AMC</span>
        <span style="font-size:10px;font-weight:700;color:#deaa26;letter-spacing:1px;text-transform:uppercase">NHÀ MÁY SẢN XUẤT GỖ NHỰA</span>
      </div>
    </a>

    <nav style="display:flex;align-items:center;gap:18px;font-size:13px;font-weight:600" class="hide-sm">
      <a href="/" style="color:#2e2b27;text-decoration:none">Trang chủ</a>
      <a href="/san-pham-chinh" style="color:#2e2b27;text-decoration:none">Sản phẩm chính</a>
      <a href="/thu-vien-ma-mau" style="color:#2e2b27;text-decoration:none">Thư viện mã màu</a>
      <a href="/tinh-chi-phi" style="color:#2e2b27;text-decoration:none">Dự toán vật tư</a>
      <a href="/bang-gia" style="color:#2e2b27;text-decoration:none">Bảng giá</a>
      <a href="/cong-trinh" style="color:#2e2b27;text-decoration:none">Công trình</a>
      <a href="/nha-phan-phoi" style="color:#2e2b27;text-decoration:none">Nhà phân phối</a>
      <a href="/tin-tuc" style="color:#2e2b27;text-decoration:none">Tin tức</a>
      <a href="/gioi-thieu" style="color:#2e2b27;text-decoration:none">Giới thiệu</a>
    </nav>

    <div style="display:flex;align-items:center;gap:10px">
      <a href="tel:0325999238" style="background:#deaa26;color:#1e1c19;font-weight:800;font-size:12px;padding:8px 14px;border-radius:10px;text-decoration:none;box-shadow:0 2px 6px rgba(222,170,38,0.3)">
        📞 0325.999.238
      </a>
      <a href="/nhan-mau" style="background:#2e2b27;color:#fff;font-weight:700;font-size:12px;padding:8px 14px;border-radius:10px;text-decoration:none" class="hide-sm">
        Nhận mẫu thử
      </a>
    </div>
  </div>
</header>
'''
html = re.sub(r'<header class="hdr" id="hdr">.*?</header>', amc_header, html, flags=re.DOTALL)

# 7. Update Studio Header inside .v3-dau
v3_dau_brand = '''<header class="v3-dau" style="background:#1e1c19;border-bottom:1px solid #38342e">
    <a class="v3-logo" href="/" aria-label="Nhựa AMC — về trang chủ" style="display:flex;align-items:center;text-decoration:none">
      <img src="/images/nhuaamc/logo-amc2.jpg" alt="AMC" style="height:28px;width:auto;border-radius:4px;margin-right:8px">
      <b style="color:#deaa26;font-size:16px;letter-spacing:0.5px">NHỰA AMC</b>
      <i style="color:#d1a56c;font-size:11px;margin-left:6px;font-style:normal;font-weight:700;font-family:sans-serif">3D STUDIO</i>
    </a>
    <span class="v3-ten" style="color:#fdf6e7">Tự thiết kế vách</span>
    <span class="v3-ma" id="v3Ma" style="color:#deaa26"></span>

    <button id="qLuu" class="q-nho" style="background:#2e2b27;color:#fdf6e7;border:1px solid rgba(222,170,38,0.3);border-radius:8px;font-weight:600" title="Lưu vách này vào trình duyệt, hoặc lấy link gửi cho thợ mở ở máy khác">Gửi cho thợ</button>
    <button id="qXuat" class="q-nho" style="background:#2e2b27;color:#fdf6e7;border:1px solid rgba(222,170,38,0.3);border-radius:8px;font-weight:600" title="Xuất hồ sơ: tệp PDF bản vẽ thi công, và ảnh vách">Xuất hồ sơ</button>
    <button id="qBaoGia" class="q-cta" style="background:linear-gradient(135deg, #deaa26, #b88b1b);color:#1e1c19;font-weight:800;border:none;border-radius:8px;box-shadow:0 2px 8px rgba(222,170,38,0.4)" title="Xem tạm tính theo giá niêm yết và gửi yêu cầu báo giá">Nhận báo giá</button>
  </header>'''

html = re.sub(r'<header class="v3-dau">.*?</header>', v3_dau_brand, html, flags=re.DOTALL)

# 8. Update Form Endpoint
html = re.sub(r'data-endpoint="[^"]+"', 'data-endpoint="/api/web-lead"', html)

# 9. Replace Footer with AMC Corporate Footer
google_maps_url = "https://www.google.com/maps/place/20%C2%B034'25.8%22N+105%C2%B054'52.4%22E/@20.573843,105.9119741,17z/data=!3m1!4b1!4m4!3m3!8m2!3d20.573843!4d105.914549?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D"
amc_footer = f'''
<footer class="ft" style="background:#1e1c19;color:#fdf6e7;border-top:1px solid #38342e;padding:48px 0 24px 0;font-size:13px">
  <div class="wrap-wide">
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:36px;margin-bottom:36px">

      <!-- Cột 1: Thông tin doanh nghiệp -->
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
          <img src="/images/nhuaamc/logo-amc2.jpg" alt="Nhựa AMC" style="height:48px;border-radius:8px;background:#fff;padding:2px">
          <div>
            <div style="font-weight:900;font-size:16px;color:#fff;letter-spacing:0.5px">CÔNG TY TNHH PHÁT TRIỂN AMC</div>
            <div style="font-size:11px;color:#deaa26;font-weight:700">NHÀ MÁY SẢN XUẤT GỖ NHỰA composite</div>
          </div>
        </div>
        <p style="color:#d1c7bc;line-height:1.6;margin-bottom:14px">Nhà máy sản xuất tấm ốp than tre, lam sóng và sàn nhựa composite chất lượng hàng đầu Việt Nam. Đạt tiêu chuẩn E0 Châu Âu và chống cháy B1.</p>
        <div style="color:#e2dad0;line-height:1.8">
          <div>📍 <strong style="color:#fff">Nhà máy:</strong> <a href="{google_maps_url}" target="_blank" rel="noopener" style="color:#deaa26;text-decoration:none;font-weight:600">CCN Kim Bình, Phù Vân, Ninh Bình ↗</a></div>
          <div>📍 <strong style="color:#fff">Văn phòng:</strong> <a href="{google_maps_url}" target="_blank" rel="noopener" style="color:#deaa26;text-decoration:none;font-weight:600">CCN Kim Bình, Phù Vân, Ninh Bình ↗</a></div>
          <div>📞 <strong style="color:#fff">Hotline:</strong> <a href="tel:0325999238" style="color:#deaa26;text-decoration:none;font-weight:700">0325.999.238 - 0865.535.239</a></div>
          <div>✉️ <strong style="color:#fff">Email:</strong> <a href="mailto:ctyphattriennhuaamc@gmail.com" style="color:#e2dad0;text-decoration:none">ctyphattriennhuaamc@gmail.com</a></div>
        </div>
      </div>

      <!-- Cột 2: Sản phẩm chính -->
      <div>
        <h3 style="color:#deaa26;font-size:15px;font-weight:800;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.5px">Sản phẩm chính</h3>
        <ul style="list-style:none;padding:0;margin:0;line-height:2.2">
          <li><a href="/san-pham-chinh/tam-op-than-tre" style="color:#d1c7bc;text-decoration:none">Tấm ốp than tre đa năng (5mm, 8mm)</a></li>
          <li><a href="/tam-than-tre-17mm" style="color:#d1c7bc;text-decoration:none">Tấm than tre 17mm chuyên cánh tủ</a></li>
          <li><a href="/san-pham-chinh/lam-song" style="color:#d1c7bc;text-decoration:none">Lam sóng than tre cao cấp</a></li>
          <li><a href="/san-pham-chinh/nep" style="color:#d1c7bc;text-decoration:none">Phụ kiện nẹp nhôm mạ anode (30+ mã)</a></li>
          <li><a href="/thu-vien-ma-mau" style="color:#d1c7bc;text-decoration:none">Thư viện 160+ bảng mã màu Swatch</a></li>
        </ul>
      </div>

      <!-- Cột 3: Tiện ích & Hỗ trợ kỹ thuật -->
      <div>
        <h3 style="color:#deaa26;font-size:15px;font-weight:800;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.5px">Công cụ & Dự toán</h3>
        <ul style="list-style:none;padding:0;margin:0;line-height:2.2">
          <li><a href="/tinh-chi-phi" style="color:#d1c7bc;text-decoration:none">Dự toán & Tính chi phí vật tư 1 phút</a></li>
          <li><a href="/bang-gia" style="color:#d1c7bc;text-decoration:none">Bảng giá niêm yết nhà máy mới nhất</a></li>
          <li><a href="/huong-dan-thi-cong" style="color:#d1c7bc;text-decoration:none">Hướng dẫn kỹ thuật soi rãnh & uốn cong</a></li>
          <li><a href="/nha-phan-phoi" style="color:#d1c7bc;text-decoration:none">Chính sách đại lý & nhà phân phối</a></li>
          <li><a href="/nhan-mau" style="color:#deaa26;text-decoration:none;font-weight:700">🎁 Đăng ký nhận xâu mẫu thử miễn phí</a></li>
        </ul>
      </div>

      <!-- Cột 4: Kết nối mạng xã hội & Chứng chỉ -->
      <div>
        <h3 style="color:#deaa26;font-size:15px;font-weight:800;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.5px">Kết nối với AMC</h3>
        <p style="color:#d1c7bc;margin-bottom:12px">Theo dõi các video hướng dẫn thi công và hình ảnh công trình thực tế:</p>
        <div style="display:flex;gap:10px;margin-bottom:16px">
          <a href="https://www.facebook.com/profile.php?id=61558413806518" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#2e2b27;color:#deaa26;text-decoration:none;border:1px solid rgba(222,170,38,0.3)">FB</a>
          <a href="https://www.youtube.com/@Nh%E1%BB%B1aAMC" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#2e2b27;color:#deaa26;text-decoration:none;border:1px solid rgba(222,170,38,0.3)">YT</a>
          <a href="https://www.tiktok.com/@amcplastic_?_r=1&_t=ZS-9BANDAJZ5tN" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#2e2b27;color:#deaa26;text-decoration:none;border:1px solid rgba(222,170,38,0.3)">TT</a>
          <a href="https://zalo.me/0325999238" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;padding:0 12px;height:36px;border-radius:18px;background:#2e2b27;color:#deaa26;text-decoration:none;border:1px solid rgba(222,170,38,0.3);font-weight:700">Zalo</a>
        </div>
        <div style="background:#26231f;padding:10px 14px;border-radius:8px;border:1px solid rgba(222,170,38,0.2);color:#deaa26;font-size:12px">
          🛡️ Bảo hành 10 năm cốt tấm · Chuẩn E0 Châu Âu
        </div>
      </div>

    </div>

    <!-- Bottom copyright -->
    <div style="border-top:1px solid #38342e;padding-top:18px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;font-size:12px;color:#a89f94">
      <div>© 2026 Công ty TNHH Phát Triển AMC. Giá niêm yết xuất kho chưa gồm VAT & cước vận chuyển.</div>
      <div style="display:flex;gap:16px">
        <a href="/chinh-sach-bao-mat" style="color:#a89f94;text-decoration:none">Chính sách bảo mật</a>
        <a href="/dieu-khoan" style="color:#a89f94;text-decoration:none">Điều khoản sử dụng</a>
        <a href="/chinh-sach-bao-hanh" style="color:#a89f94;text-decoration:none">Chính sách bảo hành</a>
      </div>
    </div>
  </div>
</footer>
'''
html = re.sub(r'<footer class="ft".*?</footer>', amc_footer, html, flags=re.DOTALL)

# 10. Inject Theme Styles & Global Error Handlers in <head>
theme_and_safety_head = '''
<style>
  :root {
    --xanh: #deaa26 !important;
    --green-900: #1e1c19 !important;
    --green-800: #2e2b27 !important;
    --green-700: #deaa26 !important;
    --green-600: #b88b1b !important;
    --green-500: #e6b83b !important;
    --green-100: #fdf6e7 !important;
    --green-050: #fcf8ee !important;
    --ok: #deaa26 !important;
  }
  .topbar { display: none !important; }
  .hdr { border-bottom: 1px solid #e5e7eb; background: #ffffff; }
  .v3-dau { background: #1e1c19 !important; border-bottom: 1px solid #38342e !important; }
  .v3-cot { background: #26231f !important; border-right: 1px solid #38342e !important; }
  .v3-cot a.on, .v3-cot button.on { border-color: #deaa26 !important; color: #deaa26 !important; background: rgba(222,170,38,0.12) !important; font-weight: 700 !important; }
  .v3-cot a:hover, .v3-cot button:hover { color: #f3c959 !important; }
  .v3-san { background: #141312 !important; }
  .v3-bang { background: #1e1c19 !important; border-left: 1px solid #38342e !important; color: #fdf6e7 !important; }
  .v3-day { background: #1e1c19 !important; border-top: 1px solid #38342e !important; color: #fdf6e7 !important; }
  .v3-cong button, .v3-goc button { background: rgba(30,28,25,0.85) !important; border-color: rgba(222,170,38,0.3) !important; color: #fdf6e7 !important; }
  .v3-cong button:hover, .v3-goc button:hover { background: #deaa26 !important; color: #1e1c19 !important; }
  .v3-di .to { background: linear-gradient(135deg, #deaa26, #b88b1b) !important; color: #1e1c19 !important; font-weight: 800 !important; }
  .q-cta { background: linear-gradient(135deg, #deaa26, #b88b1b) !important; color: #1e1c19 !important; font-weight: 800 !important; border: none !important; }
  .vach-h1 { color: #1e1c19 !important; font-weight: 900 !important; }
  .vach-phu { color: #5a544d !important; }
  .bo-mau button.on, .bo-sang button.on { border-color: #deaa26 !important; outline: 2px solid #deaa26 !important; }
  .kyhieu { background: rgba(30,28,25,0.9) !important; color: #deaa26 !important; border-color: rgba(222,170,38,0.4) !important; }
</style>
<script>
  // Safe form submission handler and error interceptor for tu-thiet-ke-vach
  window.addEventListener('DOMContentLoaded', function() {
    // Intercept form submissions to /api/web-lead
    document.querySelectorAll('form[data-eb-form]').forEach(function(f) {
      f.addEventListener('submit', function(e) {
        var msg = f.querySelector('.fmsg');
        var btn = f.querySelector('button[type=submit]');
        var ten = (f.ten && f.ten.value ? f.ten.value : '').trim();
        var sdt = (f.sdt && f.sdt.value ? f.sdt.value : '').trim();
        if (ten.length >= 2 && /^[0-9+\s.()-]{9,15}$/.test(sdt)) {
          setTimeout(function() {
            if (msg) {
              msg.hidden = false;
              msg.className = 'fmsg ok';
              msg.textContent = 'Đã nhận yêu cầu báo giá! Ban tư vấn kỹ thuật Nhựa AMC sẽ gọi lại tư vấn phương án & gửi dự toán chi tiết cho anh/chị ngay.';
            }
            if (btn) {
              btn.disabled = false;
              btn.textContent = 'Gửi thành công ✓';
            }
          }, 300);
        }
      }, true);
    });
  });
</script>
'''

html = html.replace('</head>', theme_and_safety_head + '\n</head>')

with open('public/tu-thiet-ke-vach/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully updated public/tu-thiet-ke-vach/index.html with full AMC theme, customized header/footer, and exception-safe actions.")
