import subprocess
import json

test_mobile_js = """
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<iframe id="ifr" src="/tu-thiet-ke-vach" style="width:390px;height:844px;border:none;"></iframe>
<div id="out"></div>
<script>
  const ifr = document.getElementById('ifr');
  ifr.onload = () => {
    setTimeout(async () => {
      const doc = ifr.contentDocument || ifr.contentWindow.document;
      const win = ifr.contentWindow;
      const res = {};

      const dtBuoc = doc.getElementById('dtBuoc');
      res.has_dtBuoc = !!dtBuoc;
      res.dtBuoc_display = dtBuoc ? win.getComputedStyle(dtBuoc).display : null;
      res.dtBuoc_buttons = dtBuoc ? Array.from(dtBuoc.querySelectorAll('button')).map(b => b.textContent.trim()) : [];

      // Let's inspect each button click
      const dtTam = doc.getElementById('dtTam');
      res.has_dtTam = !!dtTam;
      res.dtTam_initial_style = dtTam ? {
        display: win.getComputedStyle(dtTam).display,
        position: win.getComputedStyle(dtTam).position,
        bottom: win.getComputedStyle(dtTam).bottom,
        top: win.getComputedStyle(dtTam).top,
        height: win.getComputedStyle(dtTam).height,
        transform: win.getComputedStyle(dtTam).transform,
        visibility: win.getComputedStyle(dtTam).visibility,
        zIndex: win.getComputedStyle(dtTam).zIndex
      } : null;

      // Click button 1: chon-mau
      const btnChonMau = doc.querySelector('button[data-b="chon-mau"]');
      if (btnChonMau) {
        btnChonMau.click();
        await new Promise(r => setTimeout(r, 300));
        res.after_click_chon_mau = {
          dtTam_classes: dtTam.className,
          dtTam_rect: dtTam.getBoundingClientRect(),
          dtThan_innerHTML_length: doc.getElementById('dtThan')?.innerHTML.length,
          dtThan_first_child: doc.getElementById('dtThan')?.firstElementChild?.id,
          dtThan_display: win.getComputedStyle(doc.getElementById('dtThan')).display,
          dtThan_color: win.getComputedStyle(doc.getElementById('dtThan')).color
        };
      }

      // Click button 2: mau (Tạo hình vách)
      const btnMau = doc.querySelector('button[data-b="mau"]');
      if (btnMau) {
        btnMau.click();
        await new Promise(r => setTimeout(r, 300));
        res.after_click_mau = {
          dtTam_classes: dtTam.className,
          dtTam_rect: dtTam.getBoundingClientRect(),
          dtThan_innerHTML_length: doc.getElementById('dtThan')?.innerHTML.length,
          dtThan_first_child: doc.getElementById('dtThan')?.firstElementChild?.id,
          dtThan_color: win.getComputedStyle(doc.getElementById('dtThan')).color
        };
      }

      // Click button 3: vlm (Vật liệu & nẹp)
      const btnVlm = doc.querySelector('button[data-b="vlm"]');
      if (btnVlm) {
        btnVlm.click();
        await new Promise(r => setTimeout(r, 300));
        res.after_click_vlm = {
          dtTam_classes: dtTam.className,
          dtTam_rect: dtTam.getBoundingClientRect(),
          dtThan_innerHTML_length: doc.getElementById('dtThan')?.innerHTML.length,
          dtThan_first_child: doc.getElementById('dtThan')?.firstElementChild?.id,
          dtThan_color: win.getComputedStyle(doc.getElementById('dtThan')).color
        };
      }

      // Click button 4: bg (Khối lượng & báo giá)
      const btnBg = doc.querySelector('button[data-b="bg"]');
      if (btnBg) {
        btnBg.click();
        await new Promise(r => setTimeout(r, 300));
        res.after_click_bg = {
          dtTam_classes: dtTam.className,
          dtTam_rect: dtTam.getBoundingClientRect(),
          dtThan_innerHTML_length: doc.getElementById('dtThan')?.innerHTML.length,
          dtThan_first_child: doc.getElementById('dtThan')?.firstElementChild?.id,
          dtThan_color: win.getComputedStyle(doc.getElementById('dtThan')).color
        };
      }

      document.getElementById('out').textContent = JSON.stringify(res, null, 2);
    }, 1500);
  };
</script>
</body>
</html>
"""

with open("public/test_mobile_tam.html", "w", encoding="utf-8") as f:
    f.write(test_mobile_js)
print("test_mobile_tam.html written")
