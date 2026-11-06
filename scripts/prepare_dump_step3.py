test_dump_step3_html = """
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<iframe id="ifr" src="/tu-thiet-ke-vach" style="width:1400px;height:900px;border:none;"></iframe>
<pre id="out"></pre>
<script>
  const ifr = document.getElementById('ifr');
  ifr.onload = () => {
    setTimeout(async () => {
      const doc = ifr.contentDocument || ifr.contentWindow.document;
      const win = ifr.contentWindow;

      const btnStep3 = doc.querySelector('button[data-muc="3"]');
      if (btnStep3) {
        btnStep3.click();
        await new Promise(r => setTimeout(r, 400));

        const bang = doc.getElementById('v3Bang');
        const doKL = doc.getElementById('doKL');
        const klTamTinh = doc.getElementById('klTamTinh');
        const bangKL = doc.getElementById('bangKL');

        const summary = {
          doKL_preview: doKL ? doKL.outerHTML.slice(0, 600) : null,
          klTamTinh_preview: klTamTinh ? klTamTinh.outerHTML.slice(0, 600) : null,
          bangKL_preview: bangKL ? bangKL.outerHTML.slice(0, 600) : null,
          bangKL_style: bangKL ? {
            display: win.getComputedStyle(bangKL).display,
            overflowX: win.getComputedStyle(bangKL).overflowX,
            width: win.getComputedStyle(bangKL).width
          } : null
        };

        document.getElementById('out').textContent = JSON.stringify(summary, null, 2);
      }
    }, 1500);
  };
</script>
</body>
</html>
"""

with open("public/test_dump_step3.html", "w", encoding="utf-8") as f:
    f.write(test_dump_step3_html)
print("written")
