import os

# We will create src/pages/WallDesignerPage.jsx
code = '''import React, { useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND from '../config/brandConfig';
import vachMauThumb from '../data/vachMauThumb.json';
import vachHs from '../data/vachHs.json';
import vachMa from '../data/vachMa.json';
import vachNepDm from '../data/vachNepDm.json';

export default function WallDesignerPage() {
  useEffect(() => {
    // 1. Initialize globals needed by vach.js
    window.MAU_THUMB = vachMauThumb;
    window.VACH_HS = {
      ...vachHs,
      WEB: BRAND.domain,
      TEL: BRAND.hotlineDisplay,
      ZALO: BRAND.socialLinks?.zalo || `https://zalo.me/${BRAND.hotline.replace(/\\./g, '')}`,
      FORM: "/api/lead",
    };
    window.VACH_MA = vachMa;
    window.NEP_DM = vachNepDm;
    window.BRAND = BRAND;

    // 2. Dynamically load vach.css
    const existingCss = document.getElementById('vach-css');
    if (!existingCss) {
      const link = document.createElement('link');
      link.id = 'vach-css';
      link.rel = 'stylesheet';
      link.href = '/assets/css/vach.css';
      document.head.appendChild(link);
    }

    // 3. Dynamically load vach.js
    const existingScript = document.getElementById('vach-js');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'vach-js';
      script.src = '/assets/js/vach.js';
      script.async = true;
      script.onload = () => {
        console.log('3D Wall Designer initialized:', window.VACH);
      };
      document.body.appendChild(script);
    } else if (window.VACH && window.VACH.lamMoi) {
      window.VACH.lamMoi();
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <MainLayout
      title={`Tự Thiết Kế Vách Tivi, Sofa, Đầu Giường 3D | ${BRAND.brandName}`}
      description={`Công cụ tự thiết kế chia mảng vách 3D trực tuyến từ ${BRAND.brandName}. Mô phỏng tấm ốp than tre, lam sóng, nẹp nhôm và xuất bảng khối lượng vật tư tức thì.`}
    >
      <div className="bg-stone-900 text-white py-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/30">
            Công Cụ Thiết Kế 3D Trực Tuyến
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Tự Thiết Kế Vách 3D {BRAND.shortName}
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-300 max-w-2xl mx-auto font-light">
            Vách tivi, sofa, đầu giường bằng tấm thật — xem phối cảnh 3D thực tế, đổi màu bề mặt, điều chỉnh chia mảng và nhận dự toán tức thì.
          </p>
        </div>
      </div>

      <div className="vach-trang-container bg-stone-950 min-h-screen py-4">
        <div className="bao max-w-[1700px] mx-auto px-2 sm:px-4">
          <div className="v3 bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-2xl">
            <header className="v3-dau bg-stone-900 border-b border-stone-800 px-4 py-3 flex items-center justify-between">
              <a className="v3-logo text-amber-400 font-extrabold text-lg tracking-wider" href="/" aria-label={`${BRAND.brandName} — về trang chủ`}>
                <b>{BRAND.shortName.toUpperCase()}</b> <i>3D DESIGNER</i>
              </a>
              <span className="v3-ten text-sm font-bold text-stone-200 hidden sm:inline">Tự thiết kế vách</span>
              <span className="v3-ma font-mono text-xs text-amber-500" id="v3Ma"></span>

              <div className="flex items-center space-x-2">
                <button id="qLuu" className="q-nho px-3 py-1.5 rounded-lg bg-stone-800 text-stone-200 text-xs hover:bg-stone-700" title="Lưu vách này vào trình duyệt hoặc lấy link gửi cho thợ">Gửi cho thợ</button>
                <button id="qXuat" className="q-nho px-3 py-1.5 rounded-lg bg-stone-800 text-stone-200 text-xs hover:bg-stone-700" title="Xuất hồ sơ: tệp PDF bản vẽ thi công và ảnh vách">Xuất hồ sơ</button>
                <button id="qBaoGia" className="q-cta px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-md" title="Xem tạm tính theo giá niêm yết và gửi yêu cầu báo giá">Nhận báo giá</button>
              </div>
            </header>

            <nav className="v3-cot" id="v3Cot" aria-label="Các bước"></nav>

            <div className="v3-san san relative bg-stone-950 flex items-center justify-center min-h-[480px] lg:min-h-[640px]">
              <canvas id="c" width="1600" height="960" className="w-full h-full object-contain max-h-[750px]"></canvas>
              <div className="kyhieu" id="kyhieu"><span className="bt">↔</span><span id="kyhieuChu"></span></div>

              <div className="v3-cong">
                <button id="qUndo" title="Hoàn tác (Ctrl+Z)">↶</button>
                <button id="qLai" title="Làm lại (Ctrl+Y)">↷</button>

                <span className="v3-goc" id="v3Goc" role="group" aria-label="Góc nhìn">
                  <button data-gn="chinh" title="Chính diện (phím 1)">▭</button>
                  <button data-gn="trai" title="Xiên trái (phím 2)">◱</button>
                  <button data-gn="phai" title="Xiên phải (phím 3)">◲</button>
                  <button data-gn="can" title="Cận mảng đang chọn (phím 4)">⊙</button>
                  <button data-gn="toan" title="Toàn vách (phím 5)">⤢</button>
                </span>

                <span className="v3-tuy" id="v3Tuy"></span>
              </div>

              <div className="v3-tuy-hop v3-hop-sang" id="hopSang" role="group" aria-label="Bộ phối sáng" hidden>
                <b>Ánh sáng</b>
                <div className="hang" id="boSang">
                  <button data-bs="ngay">☀ Ban ngày</button>
                  <button data-bs="chieu">🌇 Chiều ấm</button>
                  <button data-bs="toi">🌙 Tối, nổi LED</button>
                  <button data-bs="trungbay">✦ Trưng bày</button>
                </div>
              </div>

              <button type="button" className="v3-cavach" id="caVach" hidden>⤢ Cả vách</button>
              <div className="v3-moc" id="v3Moc"></div>
              <div className="v3-nhac" id="v3Nhac">Chọn mẫu bên phải, hoặc bắt đầu từ vách trống</div>
              <div className="hud" id="hud">—</div>
            </div>

            <aside className="v3-bang" id="v3Bang"></aside>

            <footer className="v3-day bg-stone-900 border-t border-stone-800 p-3 flex justify-between items-center text-xs">
              <div className="v3-so" id="v3So"></div>
              <div className="v3-di flex items-center space-x-2">
                <button id="v3Lui" className="ph px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300">← Quay lại</button>
                <button id="v3Toi" className="to px-4 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold">Tiếp theo →</button>
              </div>
            </footer>
          </div>

          {/* KHO ĐIỀU KHIỂN CHI TIẾT (RENDER BẰNG VACH.JS) */}
          <div id="khoDK" hidden>
            <div id="khuTuong" data-tang="vach">
              <div className="nh">Kích thước tường (mm)</div>
              <div className="kt2">
                <span className="so-cum">
                  <button type="button" className="so-nut" data-so="vRong" data-d="-1" aria-label="Bớt">−</button>
                  <input type="number" id="vRong" defaultValue="4200" min="1" step="10" />
                  <button type="button" className="so-nut" data-so="vRong" data-d="1" aria-label="Thêm">+</button>
                </span>
                <span>×</span>
                <span className="so-cum">
                  <button type="button" className="so-nut" data-so="vCao" data-d="-1" aria-label="Bớt">−</button>
                  <input type="number" id="vCao" defaultValue="2700" min="1" step="10" />
                  <button type="button" className="so-nut" data-so="vCao" data-d="1" aria-label="Thêm">+</button>
                </span>
              </div>
              <p className="tt">Cao hơn chiều dài tấm đã chọn thì <b>có nối tấm theo chiều dài</b>. Rộng hơn bội 1220 thì thêm mạch ghép tấm.</p>
            </div>

            <div id="khuMauKhoiDau" data-tang="vach">
              <div className="nh">Mẫu khởi đầu — dựng lại theo tường đã nhập</div>
              <details className="con" open><summary><i className="stt">1</i>Mẫu cơ bản (hình khối) <span className="dem" id="demLoai0"></span></summary><div className="bo-mau" id="boMau"></div></details>
              <details className="con"><summary><i className="stt">2</i>Vách tivi <span className="dem" id="demLoai1"></span></summary><div className="bo-mau" id="boMau1"></div></details>
              <details className="con"><summary><i className="stt">3</i>Vách sofa <span className="dem" id="demLoai2"></span></summary><div className="bo-mau" id="boMau2"></div></details>
              <details className="con"><summary><i className="stt">4</i>Vách phòng ngủ <span className="dem" id="demLoai3"></span></summary><div className="bo-mau" id="boMau3"></div></details>
            </div>

            <div id="khuDoDay" data-tang="vach"><div className="nh">Độ dày tấm</div><div className="hang" id="dayCot"></div><p className="tt" id="ttDoDay"></p></div>
            <div id="khuKho" data-tang="vach"><div className="nh">Chiều dài tấm</div><div className="hang" id="dayTam"></div></div>
            <div id="khuSoat" data-tang="vach"></div>

            <div id="khuChonMang" data-tang="dt" data-loai="mang">
              <div className="nh">Mảng đang chọn</div>
              <div className="cd" id="tt-mang">—</div>
              <div id="khuDsCon" style={{ display: 'none' }}><div className="tt" id="ttDsCon"></div><div className="hang" id="dsCon"></div></div>
              <details className="con" id="khuTieuChi"><summary>Chọn nhiều mảng theo tiêu chí</summary><div className="hang" id="dsTieuChi"></div><p className="tt" id="ttTieuChi"></p></details>
              <div className="hang"><button type="button" id="mangDatLai" className="ph">Đặt lại mảng</button></div>
              <div id="khuKtMang">
                <div className="nh">Kích thước mảng (mm)</div>
                <div className="kt2">
                  <span className="so-cum">
                    <button type="button" className="so-nut" data-so="mangRong" data-d="-1">−</button>
                    <input type="number" id="mangRong" min="150" step="1" data-buoc="10" inputMode="numeric" />
                    <button type="button" className="so-nut" data-so="mangRong" data-d="1">+</button>
                  </span>
                  <span>×</span>
                  <span className="so-cum">
                    <button type="button" className="so-nut" data-so="mangCao" data-d="-1">−</button>
                    <input type="number" id="mangCao" min="150" step="1" data-buoc="10" inputMode="numeric" />
                    <button type="button" className="so-nut" data-so="mangCao" data-d="1">+</button>
                  </span>
                </div>
              </div>
            </div>

            <div id="khuChiaGop" data-tang="dt" data-loai="mang mach">
              <div className="nh">Chia · gộp</div>
              <div className="hang"><button id="bGopMach">⇔ Gộp hai mảng</button><button id="bGopKe">⇔ Gộp với mảng kề</button></div>
              <div className="hang" style={{ marginTop: '6px' }}><button id="bDoc">┃ Chia đôi dọc</button><button id="bNgang">━ Chia đôi ngang</button></div>
              <div className="hang" style={{ marginTop: '6px' }} id="chiaNhanh">
                <button data-chian="3">3 khoang</button><button data-chian="4">4 khoang</button><button data-chian="5">5 khoang</button>
              </div>
            </div>

            <div id="theXep" data-tang="dt" data-loai="mang"></div>
            <div id="khuCot" data-tang="dt" data-loai="mang">
              <div className="nh">Độ nổi so với tường (mm)</div>
              <div className="hang" id="cotMang"></div>
            </div>

            <div id="khuMach" data-tang="dt" data-loai="mang mach">
              <div className="nh">Thêm mạch vào mảng</div>
              <div className="hang" id="congCu"><button data-cc="chon">✋ Chọn</button><button data-cc="mngang">▬ Mạch ngang</button><button data-cc="mdoc">▮ Mạch dọc</button></div>
            </div>
            <div id="khuMachDS" data-tang="dt" data-loai="mach">
              <div className="nh">Mạch đang chọn</div>
              <div className="cd" id="tt-duong">—</div>
            </div>
            <div id="conNep" data-tang="vach">
              <div className="nh">Mạch giữa hai tấm ghép bằng</div>
              <div className="hang" id="paNep"><button data-pa="nep">Nẹp nối</button><button data-pa="hem">Ghép khít không nẹp</button></div>
              <div className="nh">Màu nẹp chung</div><div className="mau-nep" id="mauNepChung"></div>
            </div>
            <div id="khuNep" data-tang="dt" data-loai="mach">
              <div className="nh">Nẹp trên mạch này</div>
              <div className="chon-nep" id="chonNep"></div>
            </div>
            <div id="khuBoGoc" data-tang="dt" data-loai="mang">
              <div className="nh">Bo tròn góc (bán kính mm)</div>
              <div className="hang" id="boGoc"><button data-r="">Vuông</button><button data-r="30">R30</button><button data-r="50">R50</button><button data-r="100">R100</button></div>
            </div>
            <div id="khuBac" data-tang="dt" data-loai="mach">
              <div className="hang" id="boChon"><button id="bGomCanh">＋ Chọn nhiều mép</button><button data-bc="" className="ph">Bỏ chọn</button></div>
              <div id="theNoi" data-tang="dt" data-loai="mach"></div>
            </div>
            <div id="popTS" className="pop ts" id="theTS" role="dialog" aria-label="Bảng thao tác">
              <button className="ts-x" id="tsDong" aria-label="Đóng">✕</button>
              <div className="ts-than"></div>
              <div className="tt-viec" id="ttViec"></div>
            </div>
          </div>

          {/* BẢNG ĐO VÀ KHỐI LƯỢNG VẬT TƯ */}
          <div id="khoCu" hidden>
            <div className="do bg-stone-900 border border-stone-800 rounded-2xl p-6 text-stone-200 mt-6">
              <h2 className="text-lg font-bold text-amber-400 mb-3">Bảng đo & Khối lượng vật tư dự tính</h2>
              <div className="do-grid grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-stone-800 rounded-xl"><b id="d-tam" className="text-2xl text-amber-400 font-black">—</b><br/><small className="text-stone-400">tấm ốp <span id="d-tamQc">1220×2800</span></small></div>
                <div className="p-4 bg-stone-800 rounded-xl"><b id="d-nep" className="text-2xl text-amber-400 font-black">—</b><br/><small className="text-stone-400">thanh nẹp (<span id="d-nepM">—</span> m)</small></div>
                <div className="p-4 bg-stone-800 rounded-xl"><b id="d-led" className="text-2xl text-amber-400 font-black">—</b><br/><small className="text-stone-400">mét dây LED</small></div>
              </div>
            </div>
            <div className="tw mt-4 overflow-x-auto"><table id="bangSo" className="w-full text-xs text-stone-300"><thead><tr><th>Mảng</th><th>cạnh</th><th>x</th><th>y</th><th>rộng</th><th>cao</th><th>m²</th><th>độ nổi</th><th>Màu</th><th>ốp</th></tr></thead><tbody></tbody></table></div>
          </div>

          {/* FORM NHẬN BÁO GIÁ CHO VÁCH */}
          <section id="bgKhoi" className="bg-lead bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 mt-6 text-stone-200">
            <h2 className="text-xl font-bold text-amber-400 mb-2">Nhận Báo Giá Cho Mẫu Vách Này</h2>
            <p className="text-xs text-stone-400 mb-4">
              Gửi kèm <b>bảng khối lượng</b> và <b>mã vách 3D</b> để đội ngũ kỹ sư {BRAND.brandName} liên hệ tư vấn bóc tách chi phí chuẩn xác nhất.
            </p>
            <form className="ebform bg-form space-y-4 max-w-xl" onSubmit={(e) => {
              e.preventDefault();
              alert(`Cảm ơn bạn! Đội ngũ tư vấn ${BRAND.shortName} sẽ liên hệ lại qua hotline: ${BRAND.hotlineDisplay} trong thời gian sớm nhất.`);
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="text-xs">Họ tên<input name="ten" required placeholder="Họ và tên..." className="w-full mt-1 p-2 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs" /></label>
                <label className="text-xs">Số điện thoại<input name="sdt" required placeholder="Số điện thoại..." className="w-full mt-1 p-2 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs" /></label>
                <label className="text-xs">Tỉnh / Thành<input name="tinh" placeholder="Tỉnh thành..." className="w-full mt-1 p-2 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs" /></label>
              </div>
              <label className="text-xs block">Ghi chú yêu cầu<textarea name="noi_dung" rows={2} placeholder="Yêu cầu cụ thể về thi công, thời gian hoàn thành..." className="w-full mt-1 p-2 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs" /></label>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-md transition-colors">
                Gửi Yêu Cầu Báo Giá Vách 3D
              </button>
            </form>
          </section>

        </div>
      </div>
    </MainLayout>
  );
}
'''

with open('src/pages/WallDesignerPage.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Created src/pages/WallDesignerPage.jsx successfully!")
