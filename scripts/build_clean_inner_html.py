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

# 3. Clean any old buttons in .v3-cong before inserting top bar
inner_html = re.sub(r'<button id="qUndo"[^>]*>.*?</button>', '', inner_html)
inner_html = re.sub(r'<button id="qLai"[^>]*>.*?</button>', '', inner_html)

# 4. CONSOLIDATED TOP BAR: 3 CLEAN BALANCED ZONES IN 1 ROW
consolidated_top_bar = '''<header class="v3-dau">
    <!-- ZONE 1: BRAND & DESIGN CODE (LEFT) -->
    <div class="v3-dau-trai">
      <a class="v3-logo" href="/" target="_top" aria-label="Nhựa AMC — về trang chủ">
        <img src="/images/nhuaamc/logo-amc2.jpg" alt="AMC" />
        <span class="v3-logo-chu">
          <b>NHỰA AMC</b>
          <i>3D STUDIO</i>
        </span>
      </a>
      <span class="v3-ma-pill" id="v3Ma" title="Mã thiết kế vách"></span>
    </div>

    <!-- ZONE 2: HISTORY, STATS & STEP NAVIGATION (CENTER) -->
    <div class="v3-dau-giua">
      <div class="v3-nhom-nut">
        <button type="button" id="qUndo" class="v3-btn-icon" title="Hoàn tác (Ctrl+Z)">↺ Hoàn tác</button>
        <button type="button" id="qLai" class="v3-btn-icon" title="Làm lại (Ctrl+Y)">↻ Làm lại</button>
      </div>

      <!-- Thống kê vách (Kích thước, Số tấm, Số nẹp, Tạm tính từ đáy dời lên) -->
      <div class="v3-dau-so" id="v3So"></div>

      <div class="v3-nhom-nut">
        <button type="button" id="v3Lui" class="v3-btn-nav ph" title="Quay lại bước trước">← Lùi</button>
        <button type="button" id="v3Toi" class="v3-btn-nav to" title="Tiếp tục bước tiếp theo">Tiếp →</button>
      </div>
    </div>

    <!-- ZONE 3: ACTIONS & QUOTE (RIGHT) -->
    <div class="v3-dau-phai">
      <button type="button" id="qLuu" class="v3-btn-action" title="Lưu vách hoặc lấy link gửi cho thợ">💾 Gửi thợ</button>
      <button type="button" id="qXuat" class="v3-btn-action" title="Xuất hồ sơ: bản vẽ thi công và bảng khối lượng">📄 Xuất hồ sơ</button>
      <button type="button" id="qBaoGia" class="v3-btn-cta" title="Xem tạm tính và gửi yêu cầu báo giá">⚡ Báo giá</button>
    </div>
  </header>'''

inner_html = re.sub(r'<header class="v3-dau">.*?</header>', consolidated_top_bar, inner_html, flags=re.DOTALL)

# Hide/remove original footer .v3-day
inner_html = re.sub(r'<footer class="v3-day">.*?</footer>', '', inner_html, flags=re.DOTALL)

# Remove trackers / external scripts from HTML
inner_html = re.sub(r'<script.*?</script>', '', inner_html, flags=re.DOTALL)

# Clean any unclosed tags at the very end
inner_html = inner_html.strip()
if inner_html.endswith('</main>'):
    inner_html = inner_html[:-7].strip()
if inner_html.endswith('</main>'):
    inner_html = inner_html[:-7].strip()

with open('src/data/vachStudioInnerHtml.js', 'w', encoding='utf-8') as f:
    f.write('export const VACH_STUDIO_INNER_HTML = ' + repr(inner_html) + ';\n')

print(f"Generated clean src/data/vachStudioInnerHtml.js ({len(inner_html)} bytes)")
