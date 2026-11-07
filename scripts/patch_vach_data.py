import re

with open('public/assets/js/vach-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('Initial length:', len(content))

# 1. Replace all "LOGO": "data:image/svg+xml;base64,..." with "LOGO": ""
content = re.sub(r'"LOGO":\s*"data:image/svg\+xml;base64,[^"]+"', '"LOGO": ""', content)

# 2. Add _resolveVachAsset at the top of the file
resolve_func = """function _resolveVachAsset(u) {
  if (!u || typeof u !== 'string') return u;
  if (u.startsWith('data:') || u.startsWith('blob:') || u.startsWith('http://') || u.startsWith('https://')) return u;
  var base = (typeof window !== 'undefined' && window.VACH_BASE_URL) || '';
  if (!base && typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    var parts = window.location.pathname.split('/').filter(Boolean);
    var knownRoutes = ['tu-thiet-ke-vach', 'san-pham-chinh', 'thu-vien-ma-mau', 'bang-gia', 'tinh-chi-phi', 'cong-trinh', 'tai-catalogue', 'huong-dan-thi-cong', 'tin-tuc', 'hoi-dap', 'gioi-thieu', 'chung-chi-chung-nhan', 'chinh-sach-bao-hanh', 'lien-he', 'nhan-mau', 'san-pham', 'chinh-sach-bao-mat', 'dieu-khoan', 'nha-phan-phoi', 'tam-than-tre-17mm'];
    if (parts.length > 0 && knownRoutes.indexOf(parts[0]) === -1) {
      base = '/' + parts[0] + '/';
    }
  }
  if (!base || base === '/') return u;
  var cleanBase = base.replace(/\\/+$/, '');
  if (u.startsWith(cleanBase + '/')) return u;
  return cleanBase + (u.startsWith('/') ? u : '/' + u);
}
if (typeof window !== 'undefined') window._resolveVachAsset = _resolveVachAsset;

"""

if 'function _resolveVachAsset' not in content:
    content = resolve_func + content

# 3. Add dynamic resolution for window.MAU_THUMB and window.VACH_MA at the end of the file
post_patch = """
(function() {
  if (typeof window === 'undefined') return;
  if (window.MAU_THUMB) {
    for (var k in window.MAU_THUMB) {
      window.MAU_THUMB[k] = _resolveVachAsset(window.MAU_THUMB[k]);
    }
  }
  if (window.VACH_MA) {
    for (var ma in window.VACH_MA) {
      var arr = window.VACH_MA[ma];
      if (arr[2]) arr[2] = _resolveVachAsset(arr[2]);
      if (arr[6]) arr[6] = _resolveVachAsset(arr[6]);
      if (arr[7]) arr[7] = _resolveVachAsset(arr[7]);
    }
  }
})();
"""

if '(function() {\n  if (typeof window === \'undefined\') return;\n  if (window.MAU_THUMB)' not in content:
    content = content + "\n" + post_patch

with open('public/assets/js/vach-data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated length:', len(content))
print('Successfully patched public/assets/js/vach-data.js')
