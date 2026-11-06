test_modals_html = """
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<iframe id="ifr" src="/tu-thiet-ke-vach" style="width:1400px;height:900px;border:none;"></iframe>
<div id="out"></div>
<script>
  const ifr = document.getElementById('ifr');
  ifr.onload = () => {
    setTimeout(async () => {
      const doc = ifr.contentDocument || ifr.contentWindow.document;
      const win = ifr.contentWindow;
      const res = {};

      // 1. Test qLuu
      const qLuu = doc.getElementById('qLuu');
      res.has_qLuu = !!qLuu;
      if (qLuu) {
        qLuu.click();
        await new Promise(r => setTimeout(r, 200));
        const modalLuu = doc.getElementById('v3Luu');
        const nenLuu = doc.getElementById('v3LuuNen');
        res.modalLuu_open = modalLuu ? !modalLuu.hidden : false;
        res.modalLuu_display = modalLuu ? win.getComputedStyle(modalLuu).display : null;
        res.modalLuu_visible = modalLuu ? modalLuu.offsetWidth > 0 : false;

        // Try close by button
        const closeBtn = doc.getElementById('v3LuuX') || modalLuu?.querySelector('.v3-hop-x');
        res.has_luu_closeBtn = !!closeBtn;
        if (closeBtn) closeBtn.click();
        await new Promise(r => setTimeout(r, 200));
        res.modalLuu_closed_by_btn = modalLuu ? modalLuu.hidden : false;
      }

      // 2. Test qXuat
      const qXuat = doc.getElementById('qXuat');
      res.has_qXuat = !!qXuat;
      if (qXuat) {
        qXuat.click();
        await new Promise(r => setTimeout(r, 200));
        const modalXuat = doc.getElementById('v3Xuat');
        res.modalXuat_open = modalXuat ? !modalXuat.hidden : false;
        res.modalXuat_display = modalXuat ? win.getComputedStyle(modalXuat).display : null;
        res.modalXuat_visible = modalXuat ? modalXuat.offsetWidth > 0 : false;

        // Try close by backdrop or button
        const closeBtn = doc.getElementById('v3XuatX') || modalXuat?.querySelector('.v3-hop-x');
        res.has_xuat_closeBtn = !!closeBtn;
        if (closeBtn) closeBtn.click();
        await new Promise(r => setTimeout(r, 200));
        res.modalXuat_closed_by_btn = modalXuat ? modalXuat.hidden : false;
      }

      // 3. Test qBaoGia
      const qBaoGia = doc.getElementById('qBaoGia');
      res.has_qBaoGia = !!qBaoGia;
      if (qBaoGia) {
        qBaoGia.click();
        await new Promise(r => setTimeout(r, 200));
        const modalBg = doc.getElementById('bgHop');
        const nenBg = doc.getElementById('bgNen');
        res.modalBg_open = modalBg ? !modalBg.hidden : false;
        res.modalBg_display = modalBg ? win.getComputedStyle(modalBg).display : null;
        res.modalBg_visible = modalBg ? modalBg.offsetWidth > 0 : false;

        // Try close by button
        const closeBtn = doc.getElementById('bgDong') || modalBg?.querySelector('.bg-x');
        res.has_bg_closeBtn = !!closeBtn;
        if (closeBtn) closeBtn.click();
        await new Promise(r => setTimeout(r, 200));
        res.modalBg_closed_by_btn = modalBg ? modalBg.hidden : false;
      }

      document.getElementById('out').textContent = JSON.stringify(res, null, 2);
    }, 1500);
  };
</script>
</body>
</html>
"""

with open("public/test_modals.html", "w", encoding="utf-8") as f:
    f.write(test_modals_html)
print("test_modals.html created")
