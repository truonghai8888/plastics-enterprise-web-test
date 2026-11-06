import subprocess
import json

# Test script to evaluate inside Chrome:
js_code = """
(function() {
  const results = {};

  // 1. Check current step
  results.current_step = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
  results.has_vRong = !!document.getElementById('vRong');
  results.has_boMau = !!document.getElementById('boMau');

  // 2. Click on step 1b in v3Cot
  const btn1b = document.querySelector('button[data-muc="1b"]');
  if (btn1b) {
    btn1b.click();
    results.after_click_1b_step = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
    results.has_dayTam = !!document.getElementById('dayTam');
    results.v3Bang_first_tag = document.getElementById('v3Bang') ? document.getElementById('v3Bang').children[1]?.id : null;
  } else {
    results.btn1b_found = false;
  }

  // 3. Click v3Toi (should go to 1c)
  const toi = document.getElementById('v3Toi');
  if (toi) {
    toi.click();
    results.after_click_toi_step = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
  }

  // 4. Click v3Lui (should go back to 1b)
  const lui = document.getElementById('v3Lui');
  if (lui) {
    lui.click();
    results.after_click_lui_step = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
  }

  // 5. Test qBaoGia
  const qBaoGia = document.getElementById('qBaoGia');
  if (qBaoGia) {
    qBaoGia.click();
    results.modal_baogia_open = document.getElementById('v3Hop') ? !document.getElementById('v3Hop').hidden : false;
    // close modal if open
    const closeBtn = document.querySelector('.bg-hop-x, .ts-x, button[data-dong]');
    if (closeBtn) closeBtn.click();
  }

  // 6. Test qXuat
  const qXuat = document.getElementById('qXuat');
  if (qXuat) {
    qXuat.click();
    results.modal_xuat_open = document.getElementById('v3Xuat') ? !document.getElementById('v3Xuat').hidden : false;
    const closeBtn = document.querySelector('#v3Xuat .ts-x, #v3Xuat button[data-dong]');
    if (closeBtn) closeBtn.click();
  }

  // 7. Test qLuu
  const qLuu = document.getElementById('qLuu');
  if (qLuu) {
    qLuu.click();
    results.modal_luu_open = document.getElementById('v3Luu') ? !document.getElementById('v3Luu').hidden : false;
    const closeBtn = document.querySelector('#v3Luu .ts-x, #v3Luu button[data-dong]');
    if (closeBtn) closeBtn.click();
  }

  // 8. Go back to 1a
  const btn1a = document.querySelector('button[data-muc="1a"]');
  if (btn1a) {
    btn1a.click();
    results.final_step = window.VACH_VO ? window.VACH_VO.mucDangMo() : null;
    results.final_has_vRong = !!document.getElementById('vRong');
    results.final_has_boMau = !!document.getElementById('boMau');
  }

  return JSON.stringify(results);
})();
"""

# We can run headless chrome with a small HTML wrapper or inspect
print("Test code prepared.")
