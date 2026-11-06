import subprocess

test_step3_html = """
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

      // Click step 3 in v3Cot
      const btnStep3 = doc.querySelector('button[data-muc="3"]');
      if (btnStep3) {
        btnStep3.click();
        await new Promise(r => setTimeout(r, 400));
        const bang = doc.getElementById('v3Bang');
        res.v3Bang_step3_innerHTML = bang ? bang.innerHTML : null;
        res.has_table = bang ? !!bang.querySelector('table') : false;
        res.table_id = bang?.querySelector('table')?.id;
        res.table_rows = bang?.querySelectorAll('table tr')?.length;
        res.table_display = bang?.querySelector('table') ? win.getComputedStyle(bang.querySelector('table')).display : null;
      }

      document.getElementById('out').textContent = JSON.stringify(res, null, 2);
    }, 1500);
  };
</script>
</body>
</html>
"""

with open("public/test_step3.html", "w", encoding="utf-8") as f:
    f.write(test_step3_html)
print("test_step3.html created")
