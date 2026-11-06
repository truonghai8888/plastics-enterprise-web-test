import re

with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    orig = f.read()

# 1. Extract the inner studio container: from <div class="v3"> to the end of modals/templates
start_idx = orig.find('<div class="v3">')
end_idx = orig.find('<footer class="ft"')
inner_html = orig[start_idx:end_idx]

# 2. Sanitize branding & links
inner_html = inner_html.replace('Eco Bamboo', 'Nhựa AMC')
inner_html = inner_html.replace('ECOBAMBOO', 'NHỰA AMC')
inner_html = inner_html.replace('ecobamboo.vn', 'nhuaamc.vn')
inner_html = inner_html.replace('0915.189.389', '0325.999.238')
inner_html = inner_html.replace('0915189389', '0325999238')
inner_html = inner_html.replace('sale.ecobamboo@gmail.com', 'ctyphattriennhuaamc@gmail.com')
inner_html = re.sub(r'data-endpoint="[^"]+"', 'data-endpoint="/api/web-lead"', inner_html)

# 3. Remove qUndo/qLai from .v3-cong FIRST (before inserting top bar)
# In orig, qUndo/qLai were ONLY in .v3-cong
inner_html = re.sub(r'<button id="qUndo"[^>]*>.*?</button>', '', inner_html)
inner_html = re.sub(r'<button id="qLai"[^>]*>.*?</button>', '', inner_html)

# 4. CONSOLIDATE STUDIO HEADER & FOOTER INTO 1 SINGLE ROW AT THE TOP
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

inner_html = re.sub(r'<header class="v3-dau">.*?</header>', consolidated_top_bar, inner_html, flags=re.DOTALL)

# Hide/remove original footer .v3-day
inner_html = re.sub(r'<footer class="v3-day">.*?</footer>', '', inner_html, flags=re.DOTALL)

# Remove trackers / external scripts
inner_html = re.sub(r'<script.*?</script>', '', inner_html, flags=re.DOTALL)

print("Generated inner HTML size:", len(inner_html))
with open('src/data/vachStudioInnerHtml.js', 'w', encoding='utf-8') as f:
    f.write('export const VACH_STUDIO_INNER_HTML = ' + repr(inner_html) + ';\n')
print("Saved to src/data/vachStudioInnerHtml.js")
