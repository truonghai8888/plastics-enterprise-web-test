with open('public/assets/js/vach.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('Initial length:', len(content))

# 1. Resolve window.LAM_SKU textures
lam_patch = """
if (typeof window !== 'undefined' && window.LAM_SKU) {
  var _rf = window._resolveVachAsset || function(u) { return u; };
  window.LAM_SKU.forEach(function(item) {
    if (item.tex) item.tex = _rf(item.tex);
  });
}
"""

target_lam = "window.LAM_SKU=[{"
if target_lam in content and 'window.LAM_SKU.forEach(function(item)' not in content:
    # insert right after window.LAM_SKU=[...];\n;\n
    end_lam_idx = content.find(';\n;\n/* ==== hinh.js ==== */')
    if end_lam_idx != -1:
        content = content[:end_lam_idx] + ";" + lam_patch + content[end_lam_idx:]
        print('Applied window.LAM_SKU resolution patch')
    else:
        print('Warning: could not find end of LAM_SKU')

# 2. Wrap starter templates in function dungBoMau()
old_mauvach = """MAUVACH.forEach(m=>{ const b=document.createElement("button"); b.className="mau-khoi"; const th=(window.MAU_THUMB||{})[m.id];
  b.innerHTML=(th?`<span class="hinh" style="background-image:url(${th})"></span>`:"")+`<b>${m.so?`<i class="stt">${m.so}</i>`:""}${m.ten}</b>`; /* §20 · W8 — KHÔNG in dòng "ảnh 0276·0277" ra ô mẫu: đó là số hiệu ảnh gốc TGĐ gửi, vô nghĩa với khách. Trường `m.anh` GIỮ LẠI trong `mau.js` (nó là dấu vết nguồn của từng mẫu, và `title` vẫn chở câu mô tả), chỉ thôi hiển thị. */ b.title=m.mo;
  /* ══⚠⚠ §53.3 · X11 — CHỌN MẪU LÀ DỰNG VÁCH **VÀ** ĐI SANG BƯỚC SAU ═══════════════
     TGĐ 02/10: *"Chạm một ô → dựng vách và chuyển ngay sang Tạo hình (3D hiện, mảng
     chưa chọn); chip Mẫu vẫn quay lại được."* Trước bản này chạm một ô chỉ dựng vách,
     còn 3D thì nằm sau tờ lưới mẫu — tức khách chọn mẫu xong **không thấy kết quả**
     cho tới khi tự đóng tờ. Trên máy tính thì lệnh chốt đi sang **1b**.
     ⚠ Đi qua cửa của VỎ (`VACH_DT.moViec` · `VACH_VO.moMuc`), không tự gán trạng thái:
       hai vỏ có hai cơ chế mở bước, và một phép gán tay ở đây là bản thứ hai của chúng.
     ⚠ "mảng chưa chọn": `mo()` của tầng điện thoại tự chọn mảng cuối, nên bỏ chọn lại
       sau một nhịp — cùng lý do đã ghi ở `boChon()` của §53.2. */
  b.onclick=()=>{ vachMoi(m.id);
    const dt=document.documentElement.classList.contains("dt-on");
    if(dt && window.VACH_DT && VACH_DT.moViec){ VACH_DT.moViec("mau");
      setTimeout(()=>{ chonMat=-1; chonCanh=-1; lamMoi(false); },0); }
    else if(!dt && window.VACH_VO && VACH_VO.moMuc) VACH_VO.moMuc("1b");
  };
  /* §53.3 — phân nhóm theo `loai` cho MỌI mẫu, không riêng mẫu ảnh: hai mẫu cơ bản vừa
     được gán lại (`om` · `cot`) phải vào đúng nhóm nội dung của chúng. */
  $(m.loai?("boMau"+m.loai):"boMau").appendChild(b); });"""

new_mauvach = """function dungBoMau() {
  const bmc = $("boMau");
  if (!bmc) return;
  ['boMau', 'boMaucoBan', 'boMauhienDai', 'boMaucoDien'].forEach(id => {
    const el = $(id);
    if (el) el.innerHTML = '';
  });
  MAUVACH.forEach(m => {
    const b = document.createElement("button");
    b.className = "mau-khoi";
    let th = (window.MAU_THUMB || {})[m.id];
    if (th && window._resolveVachAsset) th = window._resolveVachAsset(th);
    b.innerHTML = (th ? `<span class="hinh" style="background-image:url(${th})"></span>` : "") + `<b>${m.so ? `<i class="stt">${m.so}</i>` : ""}${m.ten}</b>`;
    b.title = m.mo;
    b.onclick = () => {
      vachMoi(m.id);
      const dt = document.documentElement.classList.contains("dt-on");
      if (dt && window.VACH_DT && VACH_DT.moViec) {
        VACH_DT.moViec("mau");
        setTimeout(() => { chonMat = -1; chonCanh = -1; lamMoi(false); }, 0);
      } else if (!dt && window.VACH_VO && VACH_VO.moMuc) {
        VACH_VO.moMuc("1b");
      }
    };
    const target = $(m.loai ? ("boMau" + m.loai) : "boMau") || bmc;
    target.appendChild(b);
  });
}
window.dungBoMau = dungBoMau;
dungBoMau();"""

if old_mauvach in content:
    content = content.replace(old_mauvach, new_mauvach)
    print('Replaced MAUVACH.forEach with dungBoMau()')
else:
    print('Warning: old_mauvach not found exactly')

# 3. In VACH_REINIT, call window.dungBoMau()
old_reinit = """window.VACH_REINIT = function() {
  try {
    if (window.VACH_VO) {"""

new_reinit = """window.VACH_REINIT = function() {
  try {
    if (typeof window.dungBoMau === 'function') {
      window.dungBoMau();
    }
    if (window.VACH_VO) {"""

if old_reinit in content:
    content = content.replace(old_reinit, new_reinit)
    print('Added dungBoMau call in VACH_REINIT')
else:
    print('Warning: old_reinit not found')

# 4. Replace eco-bamboo references with amc
replacements = [
    ("taiVe(r.byte, o.ten || 'eco-bamboo-ho-so.pdf');", "taiVe(r.byte, o.ten || 'amc-ho-so-vach.pdf');"),
    ('return "eco-bamboo-vach-" + sach + ".jpg";', 'return "amc-vach-" + sach + ".jpg";'),
    ('const tenTep="eco-bamboo-ho-so-"+', 'const tenTep="amc-ho-so-vach-"+'),
    ('const NHAN_VL = "[VẬT LIỆU ECO BAMBOO]";', 'const NHAN_VL = "[VẬT LIỆU AMC]";'),
    ("const ten = 'eco-bamboo-vach-' +", "const ten = 'amc-vach-' +")
]

for old_s, new_s in replacements:
    if old_s in content:
        content = content.replace(old_s, new_s)
        print(f'Replaced: {old_s[:30]} -> {new_s[:30]}')
    else:
        print(f'Warning: string not found: {old_s[:30]}')

with open('public/assets/js/vach.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated public/assets/js/vach.js length:', len(content))
