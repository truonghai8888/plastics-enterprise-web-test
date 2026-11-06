import os

content = '''import React, { useEffect, useRef } from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND, { getCurrentYear } from '../config/brandConfig';
import { VACH_STUDIO_INNER_HTML } from '../data/vachStudioInnerHtml';

export default function WallDesignerPage() {
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // 1. Nạp vach.css (đã loại bỏ hoàn toàn các quy tắc fullscreen fixed và ẩn header)
    if (!document.getElementById('vach-css-link')) {
      const linkVach = document.createElement('link');
      linkVach.id = 'vach-css-link';
      linkVach.rel = 'stylesheet';
      linkVach.href = '/assets/css/vach.css';
      document.head.appendChild(linkVach);
    }

    // 2. Hàm kích hoạt / tái kích hoạt Studio
    const initStudio = () => {
      if (typeof window.VACH_REINIT === 'function') {
        window.VACH_REINIT();
      }
    };

    // 3. Nạp tuần tự vach-data.js rồi đến vach.js
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

    // Nếu script đã có sẵn trong DOM (khi chuyển tab quay lại), kích hoạt ngay
    if (window.VACH_REINIT) {
      setTimeout(initStudio, 50);
      setTimeout(initStudio, 300);
    }

    loadScript('/assets/js/vach-data.js', 'script-vach-data')
      .then(() => loadScript('/assets/js/vach.js', 'script-vach-engine'))
      .then(() => {
        setTimeout(initStudio, 50);
        setTimeout(initStudio, 350);
      })
      .catch((err) => {
        console.warn('[WallDesigner] Script initialization error:', err);
      });

    // 4. Xử lý an toàn form báo giá liên kết với /api/web-lead
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
      {/* 1. HERO BREADCRUMB & INTRO BANNER - ĐỒNG BỘ CHUẨN AMC VỚI CÁC TRANG KHÁC */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-10 sm:py-12 border-b border-bamboo-800 relative overflow-hidden">
        <div className="absolute right-10 top-0 w-96 h-96 bg-bamboo-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center space-x-2 text-xs text-eco-gray-300 mb-3" aria-label="Breadcrumb">
            <a href="/" className="hover:text-amber-400 transition-colors">Trang chủ</a>
            <span>/</span>
            <a href="/thu-vien-ma-mau" className="hover:text-amber-400 transition-colors">Thư viện mã màu</a>
            <span>/</span>
            <span className="text-amber-300 font-bold">Tự thiết kế vách 3D Studio</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/30">
                WebGL 3D Studio — {BRAND.shortName}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                TỰ THIẾT KẾ VÁCH 3D STUDIO — {BRAND.shortName.toUpperCase()}
              </h1>
              <p className="text-xs sm:text-sm text-eco-gray-200 max-w-2xl leading-relaxed font-light">
                Công cụ dựng mảng vách ốp than tre và lam sóng thời gian thực: Dễ dàng chia mảng, phối ghép mã màu vân gỗ/vân đá, xem trước hiệu ứng đèn LED và bóc tách khối lượng tự động.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/thu-vien-ma-mau"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all shadow-sm flex items-center"
              >
                ← Thư viện 160+ mã màu
              </a>
              <a
                href={`tel:${BRAND.hotline.replace(/\\\\./g, '')}`}
                className="px-4 py-2.5 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-soft hover:shadow-hover transition-all flex items-center"
              >
                Hotline hỗ trợ: {BRAND.hotlineDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 3D STUDIO WORKSPACE - HIỂN THỊ TRỰC TIẾP TRÊN NỀN SÁNG CHUẨN CỦA WEBSITE */}
      <div className="bg-eco-gray-50 py-6 sm:py-8 border-b border-eco-gray-200">
        <div className="max-w-[1740px] mx-auto px-2 sm:px-4">

          {/* CÔ LẬP TOÀN BỘ CSS CỦA STUDIO TRONG PHẠM VI #vachStudioMount VÀ .v3-dau-parent */}
          <style dangerouslySetInnerHTML={{ __html: `
            #vachStudioMount, .v3-dau-parent {
              --xanh: #deaa26;
              --nhan: #deaa26;
              --nhan-nh: rgba(222, 170, 38, 0.12);
              --ok: #deaa26;
              --muc: #111827;
              --muc2: #4b5563;
              --muc3: #9ca3af;
              --nen: #f9fafb;
              --the: #ffffff;
              --vien: #e5e7eb;
              --vien2: #f3f4f6;
              --green-900: #111827;
              --green-800: #1f2937;
              --green-700: #deaa26;
              --green-600: #b88b1b;
              --green-500: #e6b83b;
              --green-100: #fef9ee;
            }

            /* KHUNG CHÍNH STUDIO */
            #vachStudioMount .v3 {
              position: relative !important;
              top: 0 !important;
              height: calc(100vh - 176px) !important;
              min-height: 600px !important;
              max-height: 920px !important;
              border: none !important;
              box-shadow: none !important;
              border-radius: 0 0 16px 16px !important;
              display: grid !important;
              grid-template-columns: 240px minmax(0, 1fr) 380px !important;
              grid-template-rows: minmax(0, 1fr) !important;
              grid-template-areas: "cot san bang" !important;
              background: #ffffff !important;
              overflow: hidden !important;
            }

            /* 1. CONSOLIDATED TOP BAR: ĐƯA RA COMPONENT CHA, 3 ZONES GỌN GÀNG */
            .v3-dau-parent {
              background: #ffffff !important;
              border-bottom: 1.5px solid #e5e7eb !important;
              height: 56px !important;
              padding: 0 16px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: space-between !important;
              gap: 12px !important;
              overflow-x: auto !important;
              scrollbar-width: none !important;
              box-sizing: border-box !important;
              border-radius: 16px 16px 0 0 !important;
            }
            .v3-dau-parent::-webkit-scrollbar { display: none !important; }

            /* Chuẩn hóa nút bấm: KHÔNG BỊ XÔ LỆCH, CĂN GIỮA TUYỆT ĐỐI */
            .v3-dau-parent button,
            #vachStudioMount .v3-dau button {
              height: 34px !important;
              line-height: 1 !important;
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              font-size: 12px !important;
              font-weight: 600 !important;
              padding: 0 12px !important;
              margin: 0 !important;
              box-sizing: border-box !important;
              border-radius: 7px !important;
              cursor: pointer !important;
              white-space: nowrap !important;
              text-decoration: none !important;
              vertical-align: middle !important;
              transition: all 0.15s ease-in-out !important;
            }

            /* Nút công cụ (Undo / Redo / Lùi) */
            .v3-dau-parent .v3-btn-icon,
            .v3-dau-parent .v3-btn-nav.ph,
            #vachStudioMount .v3-btn-icon,
            #vachStudioMount .v3-btn-nav.ph {
              background: #f3f4f6 !important;
              border: 1px solid #d1d5db !important;
              color: #374151 !important;
            }
            .v3-dau-parent .v3-btn-icon:hover,
            .v3-dau-parent .v3-btn-nav.ph:hover,
            #vachStudioMount .v3-btn-icon:hover,
            #vachStudioMount .v3-btn-nav.ph:hover {
              background: #e5e7eb !important;
              border-color: #9ca3af !important;
              color: #111827 !important;
            }

            /* Nút bước tiếp theo */
            .v3-dau-parent .v3-btn-nav.to,
            #vachStudioMount .v3-btn-nav.to {
              background: linear-gradient(135deg, #2e2b27, #deaa26) !important;
              border: 1px solid #b88b1b !important;
              color: #ffffff !important;
            }
            .v3-dau-parent .v3-btn-nav.to:hover,
            #vachStudioMount .v3-btn-nav.to:hover {
              background: #b88b1b !important;
              border-color: #997112 !important;
              color: #ffffff !important;
            }

            /* Thống kê vách (Kích thước, Số tấm, Số nẹp, Tạm tính dời lên) */
            .v3-dau-parent .v3-dau-so,
            #vachStudioMount .v3-dau-so {
              display: flex !important;
              align-items: center !important;
              gap: 12px !important;
              height: 34px !important;
              line-height: 1 !important;
              padding: 0 14px !important;
              background: #fef9ee !important;
              border: 1px solid rgba(222, 170, 38, 0.4) !important;
              border-radius: 8px !important;
              white-space: nowrap !important;
              font-size: 12px !important;
              box-sizing: border-box !important;
            }
            .v3-dau-parent .v3-dau-so span,
            #vachStudioMount .v3-dau-so span {
              display: inline-flex !important;
              align-items: center !important;
              gap: 4px !important;
              line-height: 1 !important;
            }
            .v3-dau-parent .v3-dau-so b,
            #vachStudioMount .v3-dau-so b {
              color: #b88b1b !important;
              font-weight: 800 !important;
              font-size: 13px !important;
            }
            .v3-dau-parent .v3-dau-so small,
            #vachStudioMount .v3-dau-so small {
              color: #6b7280 !important;
              font-size: 11px !important;
            }

            /* Zone 3: Hành động chính (Phải) */
            .v3-dau-parent .v3-btn-action,
            #vachStudioMount .v3-btn-action {
              background: #f3f4f6 !important;
              border: 1px solid #d1d5db !important;
              color: #1f2937 !important;
            }
            .v3-dau-parent .v3-btn-action:hover,
            #vachStudioMount .v3-btn-action:hover {
              background: #e5e7eb !important;
              border-color: #b88b1b !important;
              color: #b88b1b !important;
            }
            .v3-dau-parent .v3-btn-cta,
            #vachStudioMount .v3-btn-cta {
              background: linear-gradient(135deg, #2e2b27, #deaa26, #b88b1b) !important;
              border: 1px solid #b88b1b !important;
              color: #ffffff !important;
              box-shadow: 0 2px 6px rgba(222, 170, 38, 0.35) !important;
            }
            .v3-dau-parent .v3-btn-cta:hover,
            #vachStudioMount .v3-btn-cta:hover {
              background: #b88b1b !important;
              transform: translateY(-1px) !important;
            }

            /* ẨN TOÀN BỘ THANH ĐÁY FOOTER CŨ CỦA STUDIO VÌ ĐÃ DỜI LÊN ĐẦU */
            #vachStudioMount .v3-day {
              display: none !important;
            }

            /* KHUNG CANVAS 3D & BẢNG BƯỚC: BƯỚC 1A (MẪU KHỞI ĐẦU) VS BƯỚC TIẾP THEO */
            html.v3-mau:not(.dt-on) #vachStudioMount .v3-san {
              display: none !important;
            }
            html.v3-mau:not(.dt-on) #vachStudioMount .v3-bang {
              grid-column: 2 / span 2 !important;
              grid-row: san !important;
              width: 100% !important;
              max-width: none !important;
              background: #ffffff !important;
              border-left: 1.5px solid #e5e7eb !important;
              overflow-y: auto !important;
              scrollbar-width: thin !important;
              padding: 20px 24px !important;
              box-sizing: border-box !important;
            }
            html.v3-mau:not(.dt-on) #vachStudioMount .bo-mau {
              display: grid !important;
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 14px !important;
            }

            /* CÁC BƯỚC CÒN LẠI: CANVAS 3D CỘT 2, BẢNG ĐIỀU KHIỂN CỘT 3 (380px) */
            html:not(.v3-mau):not(.dt-on) #vachStudioMount .v3-san,
            #vachStudioMount .v3-san {
              display: flex !important;
              visibility: visible !important;
              height: 100% !important;
              min-height: 480px !important;
              grid-column: 2 !important;
              grid-row: san !important;
              position: relative !important;
              background: #181716 !important;
              align-items: center !important;
              justify-content: center !important;
              overflow: hidden !important;
            }
            #vachStudioMount .v3-san canvas#c {
              width: 100% !important;
              height: 100% !important;
              display: block !important;
              touch-action: none !important;
            }

            html:not(.v3-mau):not(.dt-on) #vachStudioMount .v3-bang,
            #vachStudioMount .v3-bang {
              display: block !important;
              grid-column: 3 !important;
              grid-row: bang !important;
              width: 380px !important;
              max-width: 380px !important;
              background: #ffffff !important;
              border-left: 1.5px solid #e5e7eb !important;
              overflow-y: auto !important;
              scrollbar-width: thin !important;
              padding: 16px !important;
              box-sizing: border-box !important;
            }

            /* Ẩn các overlay án ngữ che chắn tầm nhìn 3D */
            #vachStudioMount .goiy,
            #vachStudioMount .v3-nhac {
              display: none !important;
            }

            /* CỘT BÊN TRÁI */
            #vachStudioMount .v3-cot {
              grid-column: 1 !important;
              grid-row: cot !important;
              width: 240px !important;
              background: #fafaf9 !important;
              border-right: 1.5px solid #e5e7eb !important;
              overflow-y: auto !important;
              scrollbar-width: thin !important;
              padding: 12px 10px !important;
              box-sizing: border-box !important;
            }
            #vachStudioMount .v3-cot a,
            #vachStudioMount .v3-cot button {
              border-radius: 8px !important;
              color: #4b5563 !important;
              border: 1px solid transparent !important;
              transition: all 0.15s ease !important;
            }
            #vachStudioMount .v3-cot a:hover,
            #vachStudioMount .v3-cot button:hover {
              background: rgba(222, 170, 38, 0.1) !important;
              color: #b88b1b !important;
            }
            #vachStudioMount .v3-cot button.ch,
            #vachStudioMount .v3-cot button.on {
              background: #fef9ee !important;
              border-color: #deaa26 !important;
              color: #b88b1b !important;
              font-weight: 700 !important;
            }

            /* Thẻ cấu hình bên phải */
            #vachStudioMount .v3-bang section,
            #vachStudioMount .v3-bang .card,
            #vachStudioMount .v3-bang [data-tang] {
              background: #f9fafb !important;
              border: 1px solid #e5e7eb !important;
              border-radius: 10px !important;
              padding: 12px !important;
              margin-bottom: 12px !important;
            }
            #vachStudioMount .v3-bang .stt,
            #vachStudioMount .stt {
              background: #deaa26 !important;
              color: #ffffff !important;
              font-weight: 700 !important;
            }

            /* Thẻ mẫu khởi đầu */
            #vachStudioMount .mau-khoi {
              background: #ffffff !important;
              border: 1px solid #e5e7eb !important;
              border-radius: 10px !important;
              transition: all 0.2s ease !important;
            }
            #vachStudioMount .mau-khoi:hover {
              border-color: #deaa26 !important;
              box-shadow: 0 4px 12px rgba(222, 170, 38, 0.15) !important;
              transform: translateY(-2px) !important;
            }

            /* Modal báo giá & xuất file */
            #vachStudioMount .bg-hop {
              background: #ffffff !important;
              color: #111827 !important;
              border: 1px solid #e5e7eb !important;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
              border-radius: 16px !important;
            }
            #vachStudioMount .bg-form input,
            #vachStudioMount .bg-form select,
            #vachStudioMount .bg-form textarea {
              background: #ffffff !important;
              color: #111827 !important;
              border: 1px solid #d1d5db !important;
              border-radius: 8px !important;
            }
            #vachStudioMount .bg-form input:focus,
            #vachStudioMount .bg-form select:focus,
            #vachStudioMount .bg-form textarea:focus {
              border-color: #deaa26 !important;
              outline: 2px solid rgba(222, 170, 38, 0.2) !important;
            }
          `}} />

          {/* KHUNG CHÍNH STUDIO: CONSOLIDATED TOP BAR + 3D WORKSPACE */}
          <div className="studio-card bg-white rounded-2xl shadow-xl border border-eco-gray-200 overflow-hidden">

            {/* CONSOLIDATED TOP BAR: 3 CLEAN BALANCED ZONES IN 1 ROW (ĐƯA RA COMPONENT CHA, LOẠI BỎ v3-dau-trai) */}
            <header className="v3-dau-parent flex items-center justify-between gap-4 px-4 sm:px-6 h-14 bg-white border-b border-eco-gray-200 overflow-x-auto scrollbar-none">

              {/* ZONE 1 (TRÁI): ĐIỀU HƯỚNG BƯỚC & HOÀN TÁC (LOẠI BỎ HOÀN TOÀN v3-dau-trai) */}
              <div className="v3-dau-trai-new flex items-center gap-2.5 shrink-0">
                <div className="flex items-center gap-1.5">
                  <button type="button" id="qUndo" className="v3-btn-icon" title="Hoàn tác (Ctrl+Z)">↺ Hoàn tác</button>
                  <button type="button" id="qLai" className="v3-btn-icon" title="Làm lại (Ctrl+Y)">↻ Làm lại</button>
                </div>
                <div className="h-4 w-px bg-eco-gray-300 mx-1"></div>
                <div className="flex items-center gap-1.5">
                  <button type="button" id="v3Lui" className="v3-btn-nav ph" title="Quay lại bước trước">← Lùi</button>
                  <button type="button" id="v3Toi" className="v3-btn-nav to" title="Tiếp tục bước tiếp theo">Tiếp →</button>
                </div>
                <span id="v3Ma" className="hidden" title="Mã thiết kế vách"></span>
              </div>

              {/* ZONE 2 (GIỮA): THỐNG KÊ VÁCH THỜI GIAN THỰC (KÍCH THƯỚC, SỐ TẤM, SỐ NẸP, TẠM TÍNH) */}
              <div className="v3-dau-giua-new flex items-center justify-center shrink-0">
                <div className="v3-dau-so" id="v3So"></div>
              </div>

              {/* ZONE 3 (PHẢI): HÀNH ĐỘNG, HỒ SƠ & BÁO GIÁ */}
              <div className="v3-dau-phai-new flex items-center gap-2 shrink-0">
                <button type="button" id="qLuu" className="v3-btn-action" title="Lưu vách hoặc lấy link gửi cho thợ">💾 Gửi thợ</button>
                <button type="button" id="qXuat" className="v3-btn-action" title="Xuất hồ sơ: bản vẽ thi công và bảng khối lượng">📄 Xuất hồ sơ</button>
                <button type="button" id="qBaoGia" className="v3-btn-cta" title="Xem tạm tính và gửi yêu cầu báo giá">⚡ Báo giá</button>
              </div>
            </header>

            {/* VÙNG 3D STUDIO MOUNT: 3 CỘT (BƯỚC, CANVAS 3D, BẢNG ĐIỀU KHIỂN) */}
            <div
              id="vachStudioMount"
              dangerouslySetInnerHTML={{ __html: VACH_STUDIO_INNER_HTML }}
            />
          </div>

        </div>
      </div>

      {/* 3. TÍNH NĂNG NỔI BẬT */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Quy Trình 4 Bước Đơn Giản
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-eco-gray-900 tracking-tight mt-3">
              Từ Ý Tưởng Thiết Kế Đến Bản Vẽ Thi Công Thực Tế
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-eco-gray-50 rounded-2xl p-6 border border-eco-gray-200 hover:border-amber-400 hover:shadow-soft transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-sm font-bold text-eco-gray-900 mb-1">Khởi Tạo Kích Thước</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Nhập chiều rộng, chiều cao bức tường thực tế hoặc lựa chọn nhanh các kích thước tiêu chuẩn phòng khách, phòng ngủ.
              </p>
            </div>

            <div className="bg-eco-gray-50 rounded-2xl p-6 border border-eco-gray-200 hover:border-amber-400 hover:shadow-soft transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-sm font-bold text-eco-gray-900 mb-1">Chia Mảng & Hộp Vách</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Chia dọc, chia ngang, giật cấp hộp tivi và tạo các khoang âm trang trí tùy biến linh hoạt.
              </p>
            </div>

            <div className="bg-eco-gray-50 rounded-2xl p-6 border border-eco-gray-200 hover:border-amber-400 hover:shadow-soft transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-sm font-bold text-eco-gray-900 mb-1">Chọn Vân Màu & Nẹp LED</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Phối mã màu tấm than tre, lam sóng và gắn nẹp nhôm mạ anod (Vàng xước, Đen bóng, Nẹp LED hắt sáng).
              </p>
            </div>

            <div className="bg-eco-gray-50 rounded-2xl p-6 border border-eco-gray-200 hover:border-amber-400 hover:shadow-soft transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-105 transition-transform">
                04
              </div>
              <h3 className="text-sm font-bold text-eco-gray-900 mb-1">Xuất Hồ Sơ & Báo Giá</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Tải bản vẽ chi tiết cho thợ thi công hoặc gửi thông tin nhận báo giá dự toán khối lượng vật tư tức thì.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
'''

with open('scripts/generate_wall_designer.py', 'w', encoding='utf-8') as f:
    f.write(f"content = {repr(content)}\\n\\nwith open('src/pages/WallDesignerPage.jsx', 'w', encoding='utf-8') as f:\\n    f.write(content)\\nprint('Updated src/pages/WallDesignerPage.jsx successfully')\\n")

with open('src/pages/WallDesignerPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated scripts/generate_wall_designer.py and src/pages/WallDesignerPage.jsx successfully!")
