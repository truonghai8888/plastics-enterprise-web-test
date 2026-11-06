test_full_suite = """
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<div id="results">Running suite...</div>
<script>
  window.addEventListener('DOMContentLoaded', async () => {
    const results = {};

    try {
      // 1. TEST ITEM 2: Navigation to /tu-thiet-ke-vach from home
      const ifr = document.createElement('iframe');
      ifr.src = '/';
      ifr.style.width = '1400px';
      ifr.style.height = '900px';
      document.body.appendChild(ifr);

      await new Promise(r => { ifr.onload = r; });
      await new Promise(r => setTimeout(r, 600));

      const homeDoc = ifr.contentDocument || ifr.contentWindow.document;
      const wallLink = homeDoc.querySelector('a[href="/tu-thiet-ke-vach"]');
      results.item2_found_wall_link_on_home = !!wallLink;

      // Navigate to /tu-thiet-ke-vach
      ifr.src = '/tu-thiet-ke-vach';
      await new Promise(r => { ifr.onload = r; });
      await new Promise(r => setTimeout(r, 1200));

      const doc = ifr.contentDocument || ifr.contentWindow.document;
      const win = ifr.contentWindow;

      results.item2_loaded_page = doc.title;
      results.item2_has_canvas = !!doc.getElementById('c');
      results.item2_has_studio = !!doc.getElementById('vachStudioMount');
      results.item2_studio_initialized = win.VACH_VO ? win.VACH_VO.mucDangMo() : null;

      // 2. TEST ITEM 4: Toolbar visibility over 2D elevation diagram (Sơ đồ)
      const tuy = doc.getElementById('v3Tuy');
      const btnMd = doc.getElementById('v3TuyMd');
      results.item4_has_btnMd = !!btnMd;
      if (btnMd) {
        btnMd.click();
        await new Promise(r => setTimeout(r, 400));
        const soDo = doc.getElementById('soDoMD') || doc.querySelector('.so-do');
        const tuyStyle = win.getComputedStyle(tuy);
        const btnLed = doc.getElementById('v3TuyLed');
        const btnBs = doc.getElementById('v3TuyBs');

        results.item4_sodo_active = soDo ? !soDo.hidden : false;
        results.item4_tuy_visible = tuyStyle.display !== 'none' && tuyStyle.visibility !== 'hidden';
        results.item4_tuy_zIndex = tuyStyle.zIndex;
        results.item4_buttons_visible = {
          led: btnLed ? win.getComputedStyle(btnLed).display !== 'none' : false,
          sang: btnBs ? win.getComputedStyle(btnBs).display !== 'none' : false,
          sodo: btnMd ? win.getComputedStyle(btnMd).display !== 'none' : false
        };

        // toggle back to 3D
        btnMd.click();
        await new Promise(r => setTimeout(r, 300));
      }

      // 3. TEST ITEM 5: Step 3 "Khối lượng & Báo giá" Table Display
      const btn3 = doc.querySelector('button[data-muc="3"]');
      results.item5_has_btn3 = !!btn3;
      if (btn3) {
        btn3.click();
        await new Promise(r => setTimeout(r, 400));
        const bang = doc.getElementById('v3Bang');
        const tblBg = doc.querySelector('.bg-bang');
        const tblSo = doc.getElementById('bangSo');
        const doKL = doc.getElementById('doKL');

        results.item5_table_bg_bang = tblBg ? {
          display: win.getComputedStyle(tblBg).display,
          rows: tblBg.querySelectorAll('tr').length,
          has_headers: tblBg.querySelectorAll('th').length > 0
        } : null;

        results.item5_table_bang_so = tblSo ? {
          display: win.getComputedStyle(tblSo).display,
          rows: tblSo.querySelectorAll('tr').length,
          cols: tblSo.querySelectorAll('th').length
        } : null;

        results.item5_do_grid_display = doKL ? win.getComputedStyle(doKL.querySelector('.do-grid')).display : null;
      }

      // 4. TEST ITEM 3: Modal Actions (Gửi thợ, Xuất hồ sơ, Báo giá & Close)
      // Test Báo giá
      const qBaoGia = doc.getElementById('qBaoGia');
      if (qBaoGia) {
        qBaoGia.click();
        await new Promise(r => setTimeout(r, 200));
        const bgHop = doc.getElementById('bgHop');
        results.item3_baogia_opened = bgHop ? !bgHop.hidden : false;

        const closeBtn = doc.getElementById('bgDong') || doc.querySelector('.bg-x');
        if (closeBtn) closeBtn.click();
        await new Promise(r => setTimeout(r, 200));
        results.item3_baogia_closed = bgHop ? bgHop.hidden : false;
      }

      // Test Xuất hồ sơ
      const qXuat = doc.getElementById('qXuat');
      if (qXuat) {
        qXuat.click();
        await new Promise(r => setTimeout(r, 200));
        const v3Xuat = doc.getElementById('v3Xuat');
        results.item3_xuat_opened = v3Xuat ? !v3Xuat.hidden : false;

        const closeBtn = doc.getElementById('v3XuatX') || doc.querySelector('#v3Xuat .v3-hop-x');
        if (closeBtn) closeBtn.click();
        await new Promise(r => setTimeout(r, 200));
        results.item3_xuat_closed = v3Xuat ? v3Xuat.hidden : false;
      }

      // Test Gửi thợ
      const qLuu = doc.getElementById('qLuu');
      if (qLuu) {
        qLuu.click();
        await new Promise(r => setTimeout(r, 200));
        const v3Luu = doc.getElementById('v3Luu');
        results.item3_luu_opened = v3Luu ? !v3Luu.hidden : false;

        const closeBtn = doc.getElementById('v3LuuX') || doc.querySelector('#v3Luu .v3-hop-x');
        if (closeBtn) closeBtn.click();
        await new Promise(r => setTimeout(r, 200));
        results.item3_luu_closed = v3Luu ? v3Luu.hidden : false;
      }

      // 5. TEST ITEM 1: Mobile step buttons text
      const ifrMob = document.createElement('iframe');
      ifrMob.src = '/tu-thiet-ke-vach';
      ifrMob.style.width = '390px';
      ifrMob.style.height = '844px';
      document.body.appendChild(ifrMob);

      await new Promise(r => { ifrMob.onload = r; });
      await new Promise(r => setTimeout(r, 1200));

      const mobDoc = ifrMob.contentDocument || ifrMob.contentWindow.document;
      const mobWin = ifrMob.contentWindow;

      const dtBuoc = mobDoc.getElementById('dtBuoc');
      if (dtBuoc) {
        const btns = Array.from(dtBuoc.querySelectorAll('button'));
        results.item1_mobile_buttons_count = btns.length;
        results.item1_mobile_buttons_texts = btns.map(b => {
          const dai = b.querySelector('.b-dai');
          const ngan = b.querySelector('.b-ngan');
          return {
            fullText: b.textContent.trim(),
            b_dai_display: dai ? mobWin.getComputedStyle(dai).display : null,
            b_ngan_display: ngan ? mobWin.getComputedStyle(ngan).display : null
          };
        });
      }

      results.success = true;
      document.getElementById('results').textContent = JSON.stringify(results, null, 2);
    } catch(err) {
      document.getElementById('results').textContent = 'ERROR: ' + err.stack;
    }
  });
</script>
</body>
</html>
"""

with open("public/test_full_suite.html", "w", encoding="utf-8") as f:
    f.write(test_full_suite)
print("test_full_suite.html written!")
