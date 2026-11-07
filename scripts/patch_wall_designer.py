with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add mountHostRef
target1 = "export default function WallDesignerPage() {\n  const isInitializedRef = useRef(false);"
replacement1 = """export default function WallDesignerPage() {\n  const isInitializedRef = useRef(false);\n  const mountHostRef = useRef(null);"""

if target1 in content:
    content = content.replace(target1, replacement1)
    print('Added mountHostRef')
else:
    print('Warning: target1 not found')

# 2. Add base URL & DOM caching at start of useEffect
target2 = """  useEffect(() => {
    // 1. Nạp vach.css (đã loại bỏ hoàn toàn các quy tắc fullscreen fixed và ẩn header)"""

replacement2 = """  useEffect(() => {
    const base = getBasePath();
    window.VACH_BASE_URL = base;

    // 0. Quản lý DOM Studio Node để bảo toàn WebGL Canvas & Context khi chuyển tiếp trang SPA
    let studioDiv = window._vachStudioCachedDOM;
    if (!studioDiv) {
      studioDiv = document.createElement('div');
      studioDiv.id = 'vachStudioMount';
      studioDiv.innerHTML = VACH_STUDIO_INNER_HTML;
      window._vachStudioCachedDOM = studioDiv;
    }
    if (mountHostRef.current && !mountHostRef.current.contains(studioDiv)) {
      mountHostRef.current.appendChild(studioDiv);
    }

    // Đảm bảo đồng bộ đường dẫn tài nguyên hình ảnh với base URL hiện tại
    if (typeof window._resolveVachAsset === 'function') {
      if (window.MAU_THUMB) {
        for (let k in window.MAU_THUMB) {
          window.MAU_THUMB[k] = window._resolveVachAsset(window.MAU_THUMB[k]);
        }
      }
      if (window.LAM_SKU) {
        window.LAM_SKU.forEach(item => {
          if (item.tex) item.tex = window._resolveVachAsset(item.tex);
        });
      }
    }

    // 1. Nạp vach.css (đã loại bỏ hoàn toàn các quy tắc fullscreen fixed và ẩn header)"""

if target2 in content:
    content = content.replace(target2, replacement2)
    print('Added base URL and DOM caching in useEffect')
else:
    print('Warning: target2 not found')

# 3. Update initStudio
target3 = """    // 2. Hàm kích hoạt / tái kích hoạt Studio
    const initStudio = () => {
      if (typeof window.VACH_REINIT === 'function') {
        window.VACH_REINIT();
      }
      bindFallbackActions();
    };"""

replacement3 = """    // 2. Hàm kích hoạt / tái kích hoạt Studio
    const initStudio = () => {
      if (typeof window.dungBoMau === 'function') {
        window.dungBoMau();
      }
      if (typeof window.VACH_REINIT === 'function') {
        window.VACH_REINIT();
      }
      if (window.VACH && typeof window.VACH.lamMoi === 'function') {
        window.VACH.lamMoi(true);
      }
      bindFallbackActions();
    };"""

if target3 in content:
    content = content.replace(target3, replacement3)
    print('Updated initStudio')
else:
    print('Warning: target3 not found')

# 4. Update cleanup in useEffect
target4 = """    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('click', handleGlobalModalClose, true);
      document.removeEventListener('keydown', handleGlobalKeyDown, true);
      ['v3Luu', 'v3LuuNen', 'v3Xuat', 'v3XuatNen', 'bgHop', 'bgNen'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
      const link = document.getElementById('vach-css-link');
      if (link) link.remove();
      document.documentElement.classList.remove('v3-on', 'v3-mau', 'v3-bay-on');
    };"""

replacement4 = """    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('click', handleGlobalModalClose, true);
      document.removeEventListener('keydown', handleGlobalKeyDown, true);
      closeAnyModal();
      if (mountHostRef.current && studioDiv && mountHostRef.current.contains(studioDiv)) {
        mountHostRef.current.removeChild(studioDiv);
      }
      const link = document.getElementById('vach-css-link');
      if (link) link.remove();
      document.documentElement.classList.remove('v3-on', 'v3-mau', 'v3-bay-on');
    };"""

if target4 in content:
    content = content.replace(target4, replacement4)
    print('Updated cleanup in useEffect')
else:
    print('Warning: target4 not found')

# 5. Update JSX mount point
target5 = """            {/* VÙNG 3D STUDIO MOUNT: 3 CỘT (BƯỚC, CANVAS 3D, BẢNG ĐIỀU KHIỂN) */}
            <div
              id="vachStudioMount"
              dangerouslySetInnerHTML={{ __html: VACH_STUDIO_INNER_HTML }}
            />"""

replacement5 = """            {/* VÙNG 3D STUDIO MOUNT: 3 CỘT (BƯỚC, CANVAS 3D, BẢNG ĐIỀU KHIỂN) */}
            <div
              ref={mountHostRef}
              id="vachStudioContainer"
              className="w-full"
            />"""

if target5 in content:
    content = content.replace(target5, replacement5)
    print('Updated JSX mount point')
else:
    print('Warning: target5 not found')

with open('src/pages/WallDesignerPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated src/pages/WallDesignerPage.jsx successfully')
