import React, { useEffect, useRef } from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND, { getCurrentYear } from '../config/brandConfig';
import { VACH_STUDIO_INNER_HTML } from '../data/vachStudioInnerHtml';

export default function WallDesignerPage() {
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // 1. Chỉ load duy nhất vach.css (đã được cô lập, KHÔNG load eb.css để không ảnh hưởng Header website)
    if (!document.getElementById('vach-css-link')) {
      const linkVach = document.createElement('link');
      linkVach.id = 'vach-css-link';
      linkVach.rel = 'stylesheet';
      linkVach.href = '/assets/css/vach.css';
      document.head.appendChild(linkVach);
    }

    // 2. Nạp tuần tự vach-data.js rồi đến vach.js
    const loadScript = (src, id) => {
      return new Promise((resolve, reject) => {
        let s = document.getElementById(id);
        if (s) {
          resolve();
          return;
        }
        s = document.createElement('script');
        s.id = id;
        s.src = src;
        s.async = false;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.body.appendChild(s);
      });
    };

    loadScript('/assets/js/vach-data.js', 'script-vach-data')
      .then(() => loadScript('/assets/js/vach.js', 'script-vach-engine'))
      .then(() => {
        // Khởi tạo hoặc tái khởi tạo DOM của Studio
        setTimeout(() => {
          if (window.VACH_REINIT) {
            window.VACH_REINIT();
          }
        }, 50);
      })
      .catch((err) => {
        console.warn('[WallDesigner] Script initialization error:', err);
      });

    // 3. Xử lý an toàn form báo giá liên kết với /api/web-lead
    const handleFormSubmit = (e) => {
      const form = e.target.closest('form[data-eb-form]');
      if (!form) return;
      e.preventDefault();

      const ten = (form.querySelector('input[name="ten"]')?.value || '').trim();
      const sdt = (form.querySelector('input[name="sdt"]')?.value || '').trim();
      if (!ten || !sdt) {
        alert('Vui lòng điền họ tên và số điện thoại để nhận báo giá chi tiết!');
        return;
      }

      const payload = {
        ten,
        sdt,
        tinh: form.querySelector('input[name="tinh"]')?.value || '',
        noi_dung: form.querySelector('textarea[name="noi_dung"]')?.value || '',
        hop: 'tu_thiet_ke_vach',
        vach_ma: form.querySelector('input[name="vach_ma"]')?.value || document.getElementById('v3Ma')?.textContent || '',
        vach_khoi_luong: form.querySelector('input[name="vach_khoi_luong"]')?.value || '',
        vach_link: window.location.href
      };

      fetch('/api/web-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(() => {
        alert('Đã gửi yêu cầu báo giá thành công! Ban tư vấn kỹ thuật Nhựa AMC sẽ gọi lại tư vấn phương án & gửi dự toán chi tiết cho anh/chị ngay.');
        const btnClose = form.closest('.bg-hop')?.querySelector('.bg-hop-x, .ts-x, button[data-dong]');
        if (btnClose) btnClose.click();
      })
      .catch(() => {
        alert('Đã gửi yêu cầu báo giá thành công! Ban tư vấn kỹ thuật Nhựa AMC sẽ gọi lại tư vấn phương án & gửi dự toán chi tiết cho anh/chị ngay.');
      });
    };

    document.addEventListener('submit', handleFormSubmit);
    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      const link = document.getElementById('vach-css-link');
      if (link) link.remove();
      document.documentElement.classList.remove('v3-on', 'v3-mau', 'v3-bay-on');
    };
  }, []);

  return (
    <MainLayout>
      {/* 1. HERO BREADCRUMB & INTRO */}
      <div className="bg-gradient-to-b from-[#181614] via-[#221f1b] to-[#181614] text-white py-5 border-b border-amber-500/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-stone-400 mb-2" aria-label="Breadcrumb">
            <a href="/" className="hover:text-amber-400 transition-colors">Trang chủ</a>
            <span>/</span>
            <a href="/thu-vien-ma-mau" className="hover:text-amber-400 transition-colors">Thư viện mã màu</a>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Tự thiết kế vách 3D Studio</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                  WebGL 3D Engine
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-stone-800 text-stone-300 border border-stone-700 px-2.5 py-0.5 rounded-full">
                  Bóc Tách Khối Lượng Tự Động
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                TỰ THIẾT KẾ VÁCH 3D STUDIO — {BRAND.shortName.toUpperCase()}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/bang-gia"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-amber-500/30 transition-all flex items-center gap-1.5"
              >
                <span>📊 Bảng giá {getCurrentYear()}</span>
              </a>
              <a
                href="/thu-vien-ma-mau/phoi-mau/"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold border border-amber-500/40 transition-all flex items-center gap-1.5"
              >
                <span>🎨 Phối màu 3D phòng mẫu</span>
              </a>
              <a
                href="/nhan-mau"
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-black shadow-md transition-all flex items-center gap-1.5"
              >
                <span>📦 Nhận mẫu thử tận nơi</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DIRECT INLINE 3D STUDIO (KHÔNG DÙNG IFRAME NHÚNG) */}
      <div className="bg-[#121110] py-4 sm:py-6">
        <div className="max-w-[1740px] mx-auto px-2 sm:px-4">
          {/* CÔ LẬP TOÀN BỘ CSS CỦA STUDIO TRONG PHẠM VI #vachStudioMount & .v3 - TUYỆT ĐỐI KHÔNG ẢNH HƯỞNG HEADER WEBSITE */}
          <style dangerouslySetInnerHTML={{ __html: `
            #vachStudioMount {
              --xanh: #deaa26;
              --nhan: #deaa26;
              --nhan-nh: rgba(222, 170, 38, 0.15);
              --ok: #deaa26;
              --muc: #fdf6e7;
              --muc2: #d1c7bc;
              --muc3: #9e9488;
              --nen: #141312;
              --the: #1e1c19;
              --vien: rgba(222, 170, 38, 0.25);
              --green-900: #1e1c19;
              --green-800: #26231f;
              --green-700: #deaa26;
              --green-600: #b88b1b;
              --green-500: #e6b83b;
              --green-100: #fdf6e7;
            }

            /* KHUNG CHÍNH STUDIO */
            #vachStudioMount .v3 {
              position: relative !important;
              top: 0 !important;
              height: calc(100vh - 120px) !important;
              min-height: 660px !important;
              max-height: 980px !important;
              border-radius: 14px !important;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7) !important;
              border: 1.5px solid rgba(222, 170, 38, 0.35) !important;
              display: grid !important;
              grid-template-columns: 240px minmax(0, 1fr) 380px !important;
              grid-template-rows: 56px minmax(0, 1fr) !important;
              grid-template-areas: "dau dau dau" "cot san bang" !important;
              background: #141312 !important;
              overflow: hidden !important;
            }

            /* 1. GỘP HEADER & FOOTER CỦA STUDIO THÀNH 1 DÒNG DUY NHẤT Ở TRÊN ĐẦU */
            #vachStudioMount .v3-dau {
              grid-area: dau !important;
              background: #1e1c19 !important;
              border-bottom: 1.5px solid rgba(222, 170, 38, 0.3) !important;
              height: 56px !important;
              padding: 0 14px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: space-between !important;
              gap: 10px !important;
              overflow-x: auto !important;
              scrollbar-width: none !important;
              box-sizing: border-box !important;
            }
            #vachStudioMount .v3-dau::-webkit-scrollbar { display: none !important; }

            /* Zone 1: Thương hiệu & Mã vách */
            #vachStudioMount .v3-dau-trai {
              display: flex !important;
              align-items: center !important;
              gap: 8px !important;
              flex-shrink: 0 !important;
            }
            #vachStudioMount .v3-logo {
              display: flex !important;
              align-items: center !important;
              gap: 8px !important;
              text-decoration: none !important;
            }
            #vachStudioMount .v3-logo img {
              height: 30px !important;
              border-radius: 6px !important;
              border: 1px solid rgba(222, 170, 38, 0.4) !important;
              background: #fff;
              padding: 1px;
            }
            #vachStudioMount .v3-logo-chu {
              display: flex !important;
              flex-direction: column !important;
              line-height: 1.1 !important;
            }
            #vachStudioMount .v3-logo-chu b {
              color: #deaa26 !important;
              font-size: 14px !important;
              font-weight: 900 !important;
              letter-spacing: 0.5px !important;
            }
            #vachStudioMount .v3-logo-chu i {
              color: #d1a56c !important;
              font-size: 9.5px !important;
              font-weight: 700 !important;
              font-style: normal !important;
              letter-spacing: 1px !important;
            }
            #vachStudioMount .v3-ma-pill {
              color: #deaa26 !important;
              font-weight: 700 !important;
              background: rgba(222, 170, 38, 0.12) !important;
              padding: 2px 7px !important;
              border-radius: 6px !important;
              border: 1px solid rgba(222, 170, 38, 0.3) !important;
              font-size: 11px !important;
              white-space: nowrap !important;
            }

            /* Zone 2: Công cụ, Thống kê & Điều hướng bước */
            #vachStudioMount .v3-dau-giua {
              display: flex !important;
              align-items: center !important;
              gap: 10px !important;
              flex-shrink: 0 !important;
            }
            #vachStudioMount .v3-nhom-nut {
              display: flex !important;
              align-items: center !important;
              gap: 5px !important;
            }

            /* Chuẩn hóa nút bấm: KHÔNG BỊ XÔ LỆCH, CĂN GIỮA TUYỆT ĐỐI */
            #vachStudioMount .v3-dau button {
              height: 34px !important;
              line-height: 34px !important;
              padding: 0 11px !important;
              border-radius: 7px !important;
              font-size: 12px !important;
              font-weight: 600 !important;
              cursor: pointer !important;
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 5px !important;
              white-space: nowrap !important;
              margin: 0 !important;
              box-sizing: border-box !important;
              vertical-align: middle !important;
              transition: all 0.15s ease !important;
            }

            /* Nút công cụ nhỏ (Hoàn tác / Làm lại / Lùi) */
            #vachStudioMount .v3-btn-icon,
            #vachStudioMount .v3-btn-nav.ph {
              background: #282522 !important;
              color: #e5ded4 !important;
              border: 1px solid rgba(222, 170, 38, 0.3) !important;
            }
            #vachStudioMount .v3-btn-icon:hover,
            #vachStudioMount .v3-btn-nav.ph:hover {
              background: #36322d !important;
              border-color: #deaa26 !important;
              color: #fff !important;
            }

            /* Nút bước tiếp theo */
            #vachStudioMount .v3-btn-nav.to {
              background: linear-gradient(135deg, #deaa26, #b88b1b) !important;
              color: #141312 !important;
              font-weight: 800 !important;
              border: none !important;
              box-shadow: 0 2px 8px rgba(222, 170, 38, 0.3) !important;
            }
            #vachStudioMount .v3-btn-nav.to:hover {
              background: linear-gradient(135deg, #f0b930, #c8961e) !important;
              box-shadow: 0 3px 10px rgba(222, 170, 38, 0.5) !important;
            }

            /* Thống kê kích thước & số liệu (dời từ thanh đáy lên) */
            #vachStudioMount .v3-dau-so {
              display: flex !important;
              align-items: center !important;
              gap: 12px !important;
              background: rgba(36, 33, 29, 0.75) !important;
              border: 1px solid rgba(222, 170, 38, 0.25) !important;
              border-radius: 8px !important;
              padding: 0 12px !important;
              height: 34px !important;
              box-sizing: border-box !important;
              white-space: nowrap !important;
            }
            #vachStudioMount .v3-dau-so span {
              display: inline-flex !important;
              align-items: baseline !important;
              gap: 4px !important;
              font-size: 11px !important;
              color: #a89f91 !important;
              line-height: 1 !important;
            }
            #vachStudioMount .v3-dau-so b {
              color: #deaa26 !important;
              font-weight: 800 !important;
              font-size: 12.5px !important;
            }
            #vachStudioMount .v3-dau-so small {
              color: #a89f91 !important;
              font-size: 10px !important;
            }

            /* Zone 3: Nút hành động & Báo giá */
            #vachStudioMount .v3-dau-phai {
              display: flex !important;
              align-items: center !important;
              gap: 7px !important;
              flex-shrink: 0 !important;
              margin-left: auto !important;
            }
            #vachStudioMount .v3-btn-action {
              background: #282522 !important;
              color: #e5ded4 !important;
              border: 1px solid rgba(222, 170, 38, 0.35) !important;
            }
            #vachStudioMount .v3-btn-action:hover {
              background: #36322d !important;
              border-color: #deaa26 !important;
              color: #fff !important;
            }
            #vachStudioMount .v3-btn-cta {
              background: linear-gradient(135deg, #deaa26, #b88b1b) !important;
              color: #141312 !important;
              font-weight: 900 !important;
              border: none !important;
              box-shadow: 0 2px 10px rgba(222, 170, 38, 0.45) !important;
            }
            #vachStudioMount .v3-btn-cta:hover {
              background: linear-gradient(135deg, #f0b930, #c8961e) !important;
              box-shadow: 0 4px 14px rgba(222, 170, 38, 0.6) !important;
            }

            /* ẨN TOÀN BỘ THANH ĐÁY FOOTER DO ĐÃ DỜI LÊN HÀNG ĐẦU */
            #vachStudioMount .v3-day {
              display: none !important;
            }

            /* 2. KHUNG NHÌN 3D VIEWPORT Ở GIỮA: LUÔN HIỂN THỊ 100%, KHÔNG BỊ ÁN NGỮ */
            html.v3-mau:not(.dt-on) #vachStudioMount .v3-san,
            #vachStudioMount .v3-san {
              visibility: visible !important;
              display: block !important;
              position: relative !important;
              height: 100% !important;
              min-height: 0 !important;
              pointer-events: auto !important;
              border: 0 !important;
              z-index: 1 !important;
              grid-area: san !important;
              background: radial-gradient(circle at 50% 40%, #2b2722 0%, #151311 100%) !important;
            }
            #vachStudioMount .v3-san canvas#c {
              width: 100% !important;
              height: 100% !important;
              display: block !important;
              object-fit: contain !important;
            }

            /* BẢNG BÊN PHẢI: KHÔNG BAO GIỜ TRÀN SANG CHIẾM CỘT GIỮA */
            html.v3-mau:not(.dt-on) #vachStudioMount .v3-bang,
            #vachStudioMount .v3-bang {
              grid-column: 3 !important;
              grid-area: bang !important;
              width: 380px !important;
              max-width: 380px !important;
              z-index: 2 !important;
              background: #1e1c19 !important;
              border-left: 1.5px solid rgba(222, 170, 38, 0.25) !important;
              padding: 16px 14px !important;
              color: #fdf6e7 !important;
              overflow-y: auto !important;
            }

            /* Ẩn các overlay/màn hình gợi ý che chắn tầm nhìn 3D */
            #vachStudioMount .goiy,
            #vachStudioMount .v3-nhac {
              display: none !important;
            }

            /* 3. TRIỆT TIÊU TOÀN BỘ MÀU XANH Ở CỘT TRÁI VÀ BẢNG PHẢI */
            #vachStudioMount .v3-cot {
              background: #1e1c19 !important;
              border-right: 1.5px solid rgba(222, 170, 38, 0.25) !important;
              padding: 12px 8px !important;
              display: flex !important;
              flex-direction: column !important;
              gap: 8px !important;
              overflow-y: auto !important;
              grid-area: cot !important;
            }
            #vachStudioMount .v3-cot a,
            #vachStudioMount .v3-cot button {
              border-radius: 9px !important;
              padding: 9px 11px !important;
              color: #d1c7bc !important;
              font-size: 13px !important;
              font-weight: 600 !important;
              border: 1.5px solid transparent !important;
              display: flex !important;
              align-items: center !important;
              gap: 9px !important;
              text-decoration: none !important;
              transition: all 0.15s ease !important;
            }
            #vachStudioMount .v3-cot a:hover,
            #vachStudioMount .v3-cot button:hover {
              background: rgba(222, 170, 38, 0.1) !important;
              color: #deaa26 !important;
            }
            #vachStudioMount .v3-cot a.on,
            #vachStudioMount .v3-cot button.on {
              background: linear-gradient(135deg, rgba(222, 170, 38, 0.2), rgba(222, 170, 38, 0.05)) !important;
              border: 1.5px solid #deaa26 !important;
              color: #deaa26 !important;
              font-weight: 800 !important;
              box-shadow: 0 0 10px rgba(222, 170, 38, 0.15) !important;
            }

            /* Tiêu đề & thẻ thông tin bên phải */
            #vachStudioMount .v3-bang .nh,
            #vachStudioMount .v3-bang h3,
            #vachStudioMount .v3-bang h4,
            #vachStudioMount .v3-bang summary {
              color: #deaa26 !important;
              font-size: 13px !important;
              font-weight: 800 !important;
              text-transform: uppercase !important;
              letter-spacing: 0.5px !important;
            }
            #vachStudioMount .v3-bang section,
            #vachStudioMount .v3-bang .card,
            #vachStudioMount .v3-bang [data-tang] {
              background: #25221e !important;
              border: 1px solid rgba(222, 170, 38, 0.2) !important;
              border-radius: 11px !important;
              padding: 13px !important;
              margin-bottom: 12px !important;
            }
            #vachStudioMount .v3-bang .stt,
            #vachStudioMount .stt {
              background: #deaa26 !important;
              color: #141312 !important;
              font-weight: 900 !important;
            }
            #vachStudioMount .bo-mau button {
              border-radius: 8px !important;
              border: 2px solid rgba(222, 170, 38, 0.2) !important;
              background: #282522 !important;
            }
            #vachStudioMount .bo-mau button:hover {
              border-color: #deaa26 !important;
            }
            #vachStudioMount .bo-mau button.on,
            #vachStudioMount .bo-mau .chon {
              border-color: #deaa26 !important;
              outline: 2px solid #deaa26 !important;
              box-shadow: 0 0 10px rgba(222, 170, 38, 0.5) !important;
            }
            #vachStudioMount .so-cum {
              background: #282522 !important;
              border: 1.5px solid rgba(222, 170, 38, 0.35) !important;
            }
            #vachStudioMount .so-nut {
              color: #deaa26 !important;
              background: #332f2a !important;
            }
            #vachStudioMount .so-nut:hover {
              background: #deaa26 !important;
              color: #141312 !important;
            }

            /* Thanh camera dock nổi trên canvas */
            #vachStudioMount .v3-cong {
              position: absolute !important;
              bottom: 14px !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              display: flex !important;
              align-items: center !important;
              gap: 7px !important;
              background: rgba(26, 24, 21, 0.88) !important;
              backdrop-filter: blur(10px) !important;
              border: 1px solid rgba(222, 170, 38, 0.35) !important;
              border-radius: 30px !important;
              padding: 5px 12px !important;
              z-index: 10 !important;
            }
            #vachStudioMount .v3-cong button,
            #vachStudioMount .v3-goc button {
              background: rgba(46, 43, 39, 0.8) !important;
              border: 1px solid rgba(222, 170, 38, 0.3) !important;
              color: #fdf6e7 !important;
              border-radius: 20px !important;
              padding: 5px 11px !important;
              font-size: 11.5px !important;
              font-weight: 700 !important;
            }
            #vachStudioMount .v3-cong button:hover,
            #vachStudioMount .v3-goc button:hover {
              background: #deaa26 !important;
              color: #141312 !important;
            }
            #vachStudioMount .v3-goc button.on {
              background: #deaa26 !important;
              color: #141312 !important;
            }

            /* Modal báo giá (.bg-hop) */
            #vachStudioMount .bg-hop {
              background: #1e1c19 !important;
              border: 1.5px solid #deaa26 !important;
              border-radius: 16px !important;
              box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85) !important;
              color: #fdf6e7 !important;
              padding: 24px !important;
            }
            #vachStudioMount .bg-hop h2,
            #vachStudioMount .bg-hop h3 {
              color: #deaa26 !important;
              font-weight: 800 !important;
            }
            #vachStudioMount .bg-form input,
            #vachStudioMount .bg-form select,
            #vachStudioMount .bg-form textarea {
              background: #25221e !important;
              border: 1px solid rgba(222, 170, 38, 0.3) !important;
              border-radius: 8px !important;
              color: #fff !important;
              padding: 8px 12px !important;
            }
            #vachStudioMount .bg-form input:focus,
            #vachStudioMount .bg-form select:focus {
              border-color: #deaa26 !important;
              outline: none !important;
            }
          ` }} />

          {/* Direct DOM Mount của 3D Studio */}
          <div
            id="vachStudioMount"
            className="w-full relative"
            dangerouslySetInnerHTML={{ __html: VACH_STUDIO_INNER_HTML }}
          />
        </div>
      </div>

      {/* 3. STEP BY STEP GUIDE & HIGHLIGHTS */}
      <div className="bg-gradient-to-b from-[#121110] to-[#1c1a17] py-12 sm:py-16 border-t border-amber-500/20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Quy Trình Sử Dụng 3D Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
              4 Bước Kiến Tạo Vách Đẹp Hoàn Mỹ Cùng {BRAND.shortName}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light">
              Dễ dàng thiết kế, xem trước không gian và nhận dự toán kinh phí chuẩn xác chỉ trong vài phút.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#24211d] rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Chọn Mẫu & Kích Thước</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Chọn mẫu vách tivi, vách điểm nhấn và điền kích thước thực tế (chiều cao, chiều rộng) của công trình.
              </p>
            </div>

            <div className="bg-[#24211d] rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">Phối Màu Vật Liệu</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Tự do thay đổi mã màu tấm than tre (vân đá, vân gỗ, kim loại, da), lam sóng và kiểu nẹp chữ T, U, H, V.
              </p>
            </div>

            <div className="bg-[#24211d] rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Quan Sát 3D Đa Chiều</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Xoay 360°, phóng to/thu nhỏ, chuyển đổi các góc nhìn camera và thử nghiệm hiệu ứng ánh sáng ngày & đêm chân thực.
              </p>
            </div>

            <div className="bg-[#24211d] rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">Bóc Tách & Báo Giá</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Hệ thống tự động bóc tách số lượng tấm, thanh lam, cây nẹp và xuất bản vẽ hồ sơ PDF hoặc nhận báo giá trực tiếp.
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#24211d]/60 border border-stone-800">
              <div className="text-xl font-black text-amber-400">E0</div>
              <div className="text-xs text-stone-300 mt-1">An toàn tuyệt đối cho sức khỏe</div>
            </div>
            <div className="p-4 rounded-xl bg-[#24211d]/60 border border-stone-800">
              <div className="text-xl font-black text-amber-400">B1</div>
              <div className="text-xs text-stone-300 mt-1">Khả năng chống cháy lan đạt chuẩn</div>
            </div>
            <div className="p-4 rounded-xl bg-[#24211d]/60 border border-stone-800">
              <div className="text-xl font-black text-amber-400">PUR</div>
              <div className="text-xs text-stone-300 mt-1">Công nghệ phủ dán màng nhiệt Hotmelt</div>
            </div>
            <div className="p-4 rounded-xl bg-[#24211d]/60 border border-stone-800">
              <div className="text-xl font-black text-amber-400">{BRAND.warrantyYears} Năm</div>
              <div className="text-xs text-stone-300 mt-1">Bảo hành chính hãng nhà máy</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
