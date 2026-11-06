import re

with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update useEffect: add fallback button binders, modal close listeners, and robust reinit
new_effects = """    // 2. Hàm kích hoạt / tái kích hoạt Studio
    const initStudio = () => {
      if (typeof window.VACH_REINIT === 'function') {
        window.VACH_REINIT();
      }
      bindFallbackActions();
    };

    // 3. Fallback action handlers cho tất cả các nút điều khiển & modal (TODO.md Item 3, 6)
    const bindFallbackActions = () => {
      const qUndo = document.getElementById('qUndo');
      if (qUndo && !qUndo._bound) {
        qUndo._bound = true;
        qUndo.addEventListener('click', () => {
          if (window.VACH && typeof window.VACH.hoanTac === 'function') window.VACH.hoanTac();
        });
      }

      const qLai = document.getElementById('qLai');
      if (qLai && !qLai._bound) {
        qLai._bound = true;
        qLai.addEventListener('click', () => {
          if (window.VACH && typeof window.VACH.lamLai === 'function') window.VACH.lamLai();
        });
      }

      const v3Lui = document.getElementById('v3Lui');
      if (v3Lui && !v3Lui._bound) {
        v3Lui._bound = true;
        v3Lui.addEventListener('click', () => {
          if (window.VACH_VO && typeof window.VACH_VO.moMuc === 'function') {
            const muc = window.VACH_VO.mucDangMo();
            const MUC = window.VACH_VO.MUC;
            const i = MUC.indexOf(muc);
            if (i > 0) window.VACH_VO.moMuc(MUC[i-1]);
          }
        });
      }

      const v3Toi = document.getElementById('v3Toi');
      if (v3Toi && !v3Toi._bound) {
        v3Toi._bound = true;
        v3Toi.addEventListener('click', () => {
          if (window.VACH_VO && typeof window.VACH_VO.moMuc === 'function') {
            const muc = window.VACH_VO.mucDangMo();
            const MUC = window.VACH_VO.MUC;
            const i = MUC.indexOf(muc);
            if (i < MUC.length - 1) {
              window.VACH_VO.moMuc(MUC[i+1]);
            } else if (window.VACH_GUI && typeof window.VACH_GUI.moHop === 'function') {
              window.VACH_GUI.moHop();
            }
          }
        });
      }

      const qLuu = document.getElementById('qLuu');
      if (qLuu && !qLuu._bound) {
        qLuu._bound = true;
        qLuu.addEventListener('click', () => {
          const hop = document.getElementById('v3Luu');
          const nen = document.getElementById('v3LuuNen');
          if (hop) hop.hidden = false;
          if (nen) nen.hidden = false;
        });
      }

      const qXuat = document.getElementById('qXuat');
      if (qXuat && !qXuat._bound) {
        qXuat._bound = true;
        qXuat.addEventListener('click', () => {
          const hop = document.getElementById('v3Xuat');
          const nen = document.getElementById('v3XuatNen');
          if (hop) hop.hidden = false;
          if (nen) nen.hidden = false;
          if (window.VACH_GUI && typeof window.VACH_GUI.veXemTruoc === 'function') {
            window.VACH_GUI.veXemTruoc();
          }
        });
      }

      const qBaoGia = document.getElementById('qBaoGia');
      if (qBaoGia && !qBaoGia._bound) {
        qBaoGia._bound = true;
        qBaoGia.addEventListener('click', () => {
          if (window.VACH_GUI && typeof window.VACH_GUI.moHop === 'function') {
            window.VACH_GUI.moHop();
          } else {
            const hop = document.getElementById('bgHop') || document.getElementById('v3Hop');
            const nen = document.getElementById('bgNen') || document.getElementById('v3Nen');
            if (hop) hop.hidden = false;
            if (nen) nen.hidden = false;
          }
        });
      }
    };

    // 4. Trình đóng Modal toàn cầu - đảm bảo luôn đóng được (TODO.md Item 3)
    const handleGlobalModalClose = (e) => {
      const closeTrigger = e.target.closest(
        '.v3-hop-x, .bg-x, #bgDong, #v3LuuX, #v3XuatX, .bg-nen, .v3-nen, button[data-dong], .ts-x'
      );
      if (closeTrigger) {
        const bgHop = document.getElementById('bgHop');
        const bgNen = document.getElementById('bgNen');
        if (bgHop) bgHop.hidden = true;
        if (bgNen) bgNen.hidden = true;

        const v3Luu = document.getElementById('v3Luu');
        const v3LuuNen = document.getElementById('v3LuuNen');
        if (v3Luu) v3Luu.hidden = true;
        if (v3LuuNen) v3LuuNen.hidden = true;

        const v3Xuat = document.getElementById('v3Xuat');
        const v3XuatNen = document.getElementById('v3XuatNen');
        if (v3Xuat) v3Xuat.hidden = true;
        if (v3XuatNen) v3XuatNen.hidden = true;

        document.querySelectorAll('.v3-hop:not([hidden]), .bg-hop:not([hidden]), .v3-nen:not([hidden]), .bg-nen:not([hidden])').forEach(el => {
          el.hidden = true;
        });

        if (window.VACH_GUI && typeof window.VACH_GUI.dongHop === 'function') {
          window.VACH_GUI.dongHop();
        }
      }
    };

    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.v3-hop:not([hidden]), .bg-hop:not([hidden]), .v3-nen:not([hidden]), .bg-nen:not([hidden])').forEach(el => {
          el.hidden = true;
        });
        if (window.VACH_GUI && typeof window.VACH_GUI.dongHop === 'function') {
          window.VACH_GUI.dongHop();
        }
      }
    };

    document.addEventListener('click', handleGlobalModalClose);
    document.addEventListener('keydown', handleGlobalKeyDown);"""

# Replace in content
pattern_init = r'    // 2\. Hàm kích hoạt / tái kích hoạt Studio.*?const loadScript'
content = re.sub(pattern_init, new_effects + "\n\n    // 5. Nạp tuần tự vach-data.js rồi đến vach.js\n    const loadScript", content, flags=re.DOTALL)

# Update form submit closer
old_form_close = r"const btnClose = form\.closest\('\.bg-hop'\)\?\.querySelector\('\.bg-hop-x, \.ts-x, button\[data-dong\]'\);"
new_form_close = "const btnClose = form.closest('.bg-hop')?.querySelector('.bg-x, #bgDong, .bg-hop-x, .ts-x, button[data-dong]');\n        if (btnClose) btnClose.click();\n        else {\n          const h = document.getElementById('bgHop');\n          const n = document.getElementById('bgNen');\n          if (h) h.hidden = true;\n          if (n) n.hidden = true;\n        }"
content = re.sub(old_form_close, new_form_close, content)

# Update cleanup return
old_cleanup = r"return \(\) => {\s*document\.removeEventListener\('submit', handleFormSubmit\);\s*const link = document\.getElementById\('vach-css-link'\);\s*if \(link\) link\.remove\(\);\s*document\.documentElement\.classList\.remove\('v3-on', 'v3-mau', 'v3-bay-on'\);\s*};"
new_cleanup = """return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('click', handleGlobalModalClose);
      document.removeEventListener('keydown', handleGlobalKeyDown);
      const link = document.getElementById('vach-css-link');
      if (link) link.remove();
      document.documentElement.classList.remove('v3-on', 'v3-mau', 'v3-bay-on');
    };"""
content = re.sub(old_cleanup, new_cleanup, content)

with open('src/pages/WallDesignerPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated script logic in WallDesignerPage.jsx!")
