import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const DownloadIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const PhoneCallIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const CalculatorIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2"/>
    <line x1="8" x2="16" y1="6" y2="6"/>
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

// ==========================================
// PRICING DATA MOCK (ECOBAMBOO OFFICIAL 2025)
// ==========================================
export const PRICING_DATA = [
  {
    category: 'Tấm Ốp Than Tre Đa Năng 8mm (Chuyên ốp tường cao cấp)',
    items: [
      {
        surface: 'Vân Vải Lanh / Đơn Sắc Matte Phổ Thông',
        codeRange: 'EB79xxx / EB68xxx',
        specs: '1220 x 2800 x 8mm',
        packaging: '3 tấm / kiện (10.25 m²)',
        retailPerM2: 345000,
        retailPerSheet: 1178000,
        wholesalePerM2: 275000,
        wholesalePerSheet: 939000,
        stock: 'Sẵn hàng kho HN'
      },
      {
        surface: 'Vân Gỗ Tự Nhiên (Sồi, Tần bì, Óc chó)',
        codeRange: 'EB66xxx (EB66006, EB66432)',
        specs: '1220 x 2800 x 8mm',
        packaging: '3 tấm / kiện (10.25 m²)',
        retailPerM2: 365000,
        retailPerSheet: 1247000,
        wholesalePerM2: 295000,
        wholesalePerSheet: 1007000,
        stock: 'Sẵn hàng kho HN'
      },
      {
        surface: 'Vân Đá Cẩm Thạch / Đá Men Sóng Băng (UV Glossy)',
        codeRange: 'EB89xxx / EB88xxx',
        specs: '1220 x 2800 x 8mm',
        packaging: '3 tấm / kiện (10.25 m²)',
        retailPerM2: 385000,
        retailPerSheet: 1315000,
        wholesalePerM2: 315000,
        wholesalePerSheet: 1076000,
        stock: 'Sẵn hàng kho HN'
      },
      {
        surface: 'Dòng PET-G Cao Cấp Siêu Mịn Kháng Xước',
        codeRange: 'EB68038G / EB66006P',
        specs: '1220 x 2800 x 8mm',
        packaging: '3 tấm / kiện (10.25 m²)',
        retailPerM2: 480000,
        retailPerSheet: 164000,
        wholesalePerM2: 395000,
        wholesalePerSheet: 1349000,
        stock: 'Sẵn hàng kho HN'
      },
      {
        surface: 'Dòng Tráng Gương Titan / Kim Loại Phay Xước',
        codeRange: 'EB69001G / EB69008M',
        specs: '1220 x 2800 x 8mm',
        packaging: '2 tấm / kiện (6.83 m²)',
        retailPerM2: 690000,
        retailPerSheet: 2357000,
        wholesalePerM2: 560000,
        wholesalePerSheet: 1913000,
        stock: 'Sẵn hàng kho HN'
      }
    ]
  },
  {
    category: 'Tấm Ốp Than Tre Đa Năng 5mm (Chuyên uốn cong góc 90°)',
    items: [
      {
        surface: 'Vân Gỗ / Vân Vải / Đơn Sắc Uốn Cong',
        codeRange: 'EB-5M-xxx',
        specs: '1220 x 2800 x 5mm',
        packaging: '4 tấm / kiện (13.66 m²)',
        retailPerM2: 295000,
        retailPerSheet: 1007000,
        wholesalePerM2: 240000,
        wholesalePerSheet: 820000,
        stock: 'Sẵn hàng'
      },
      {
        surface: 'Vân Đá Men Bóng Uốn Cong',
        codeRange: 'EB-5D-xxx',
        specs: '1220 x 2800 x 5mm',
        packaging: '4 tấm / kiện (13.66 m²)',
        retailPerM2: 330000,
        retailPerSheet: 1127000,
        wholesalePerM2: 265000,
        wholesalePerSheet: 905000,
        stock: 'Sẵn hàng'
      }
    ]
  },
  {
    category: 'Tấm Nội Thất Than Tre 17mm (Chuyên đóng tủ bếp, cánh cửa)',
    items: [
      {
        surface: 'Phủ Film PET-G 2 Mặt Chống Xước Cốt Than Tre',
        codeRange: 'EB-17M-xxx',
        specs: '1220 x 2800 x 17mm',
        packaging: '1 tấm / kiện (3.416 m²)',
        retailPerM2: 780000,
        retailPerSheet: 2664000,
        wholesalePerM2: 640000,
        wholesalePerSheet: 2186000,
        stock: 'Kho Cầu Nổi'
      }
    ]
  },
  {
    category: 'Lam Sóng Than Tre & Phụ Kiện Nẹp Nhôm Đồng Bộ',
    items: [
      {
        surface: 'Lam Sóng Than Tre Cao Cấp (Lam 3 sóng, 4 sóng)',
        codeRange: 'LS-3S / LS-4S',
        specs: 'Bản rộng 150-200mm, dài 2900mm',
        packaging: '10 thanh / hộp',
        retailPerM2: 0, // Tính theo thanh
        retailPerSheet: 185000, // Giá thanh
        wholesalePerM2: 0,
        wholesalePerSheet: 145000,
        stock: 'Sẵn hàng'
      },
      {
        surface: 'Nẹp Nhôm Chỉ T Nối Tấm (Mạ Anode vàng / đen / bạc)',
        codeRange: 'NEP-T15 / T20',
        specs: 'Thanh dài 2500 - 2800mm',
        packaging: '50 thanh / bó',
        retailPerM2: 0,
        retailPerSheet: 55000,
        wholesalePerM2: 0,
        wholesalePerSheet: 42000,
        stock: 'Sẵn hàng'
      },
      {
        surface: 'Nẹp Nhôm Hắt Sáng LED Định Hình Kèm Nắp Tán Quang',
        codeRange: 'NEP-LED-DH',
        specs: 'Thanh dài 2800mm',
        packaging: '20 thanh / bó',
        retailPerM2: 0,
        retailPerSheet: 95000,
        wholesalePerM2: 0,
        wholesalePerSheet: 75000,
        stock: 'Sẵn hàng'
      },
      {
        surface: 'Keo Dán Chuyên Dụng Than Tre Eco Bamboo (Không mùi)',
        codeRange: 'KEO-EB-300',
        specs: 'Chai tuýp 300ml (Dán được ~3.5 m²)',
        packaging: '24 tuýp / thùng',
        retailPerM2: 0,
        retailPerSheet: 75000,
        wholesalePerM2: 0,
        wholesalePerSheet: 58000,
        stock: 'Sẵn hàng'
      }
    ]
  }
];

// Helper format currency
const formatVND = (num) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
};

// ==========================================
// PRICING TABLE PAGE COMPONENT
// ==========================================
export default function PricingTable({ onOpenCalculator }) {
  // Tab state: 'retail' (Giá bán lẻ) | 'wholesale' (Giá đại lý / thầu)
  const [pricingMode, setPricingMode] = useState('retail');
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleDownloadPricingPDF = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  return (
    <MainLayout>
      {/* 1. HEADER BANNER BÁO GIÁ */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-12 sm:py-16 border-b border-bamboo-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bamboo-800/80 border border-bamboo-600/40 text-bamboo-300 text-xs font-bold uppercase tracking-wider">
              <span>Bảng Giá Niêm Yết Nhà Máy 2025</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Bảng Giá Tấm Ốp Than Tre & Phụ Kiện
            </h1>

            <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
              Báo giá minh bạch, xuất kho trực tiếp từ nhà máy Sơn Đồng & hệ thống tổng kho Hà Nội. Cam kết chuẩn an toàn Formaldehyde E0 và keo nhiệt PUR Jowat Đức.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={handleDownloadPricingPDF}
                className="px-5 py-2.5 rounded-xl bg-wood-500 hover:bg-wood-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center hover:scale-105"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Tải Bảng Giá PDF / Excel
              </button>

              <button
                onClick={() => onOpenCalculator ? onOpenCalculator() : (window.location.href = '/tinh-chi-phi')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center"
              >
                <CalculatorIcon className="w-4 h-4 mr-2 text-bamboo-300" />
                Dùng Công Cụ Tính Chi Phí Nhanh &rarr;
              </button>
            </div>

            {downloadNotice && (
              <div className="p-3 rounded-xl bg-bamboo-900/90 text-bamboo-200 text-xs font-bold border border-bamboo-500 flex items-center animate-fade-in mt-3">
                <CheckCircleIcon className="w-4 h-4 mr-2 text-emerald-400" />
                Đang tải xuống tài liệu: Bang_Gia_EcoBamboo_2025_Chinh_Hang.pdf
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. TAB CHUYỂN ĐỔI CHẾ ĐỘ GIÁ & QUY CÁCH */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Toggle Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-eco-gray-900 tracking-tight">
              Chi Tiết Bảng Giá Theo Từng Dòng Sản Phẩm
            </h2>
            <p className="text-xs text-eco-gray-500 mt-0.5">
              Đơn giá xuất kho tại nhà máy Km8 Đại Lộ Thăng Long (chưa bao gồm VAT 8% và vận chuyển).
            </p>
          </div>

          <div className="flex items-center p-1 bg-eco-gray-200 rounded-2xl">
            <button
              onClick={() => setPricingMode('retail')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pricingMode === 'retail'
                  ? 'bg-white text-bamboo-900 shadow-sm'
                  : 'text-eco-gray-600 hover:text-eco-gray-900'
              }`}
            >
              Giá Bán Lẻ Niêm Yết
            </button>
            <button
              onClick={() => setPricingMode('wholesale')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pricingMode === 'wholesale'
                  ? 'bg-bamboo-700 text-white shadow-sm'
                  : 'text-eco-gray-600 hover:text-eco-gray-900'
              }`}
            >
              Giá Thợ / Đại Lý (Chiết khấu 15-25%)
            </button>
          </div>
        </div>

        {/* 3. BẢNG DỮ LIỆU BÁO GIÁ CHI TIẾT */}
        <div className="space-y-8">
          {PRICING_DATA.map((group, gIdx) => (
            <div key={gIdx} className="bg-white rounded-3xl border border-eco-gray-200 overflow-hidden shadow-sm">
              {/* Group Header */}
              <div className="bg-bamboo-900 text-white px-6 py-4 flex items-center justify-between">
                <span className="font-extrabold text-sm sm:text-base tracking-wide">
                  {group.category}
                </span>
                <span className="text-xs text-bamboo-300 font-medium hidden sm:inline">
                  Tiêu chuẩn E0 Đức
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-eco-gray-100 text-eco-gray-700 border-b border-eco-gray-200 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4 sm:px-6">Dòng Bề Mặt / Mã Màu</th>
                      <th className="py-3.5 px-4">Quy Cách Khổ</th>
                      <th className="py-3.5 px-4">Đóng Gói</th>
                      <th className="py-3.5 px-4 text-right">Đơn Giá / m²</th>
                      <th className="py-3.5 px-4 text-right font-black text-bamboo-900">Đơn Giá / Tấm</th>
                      <th className="py-3.5 px-4 text-center">Tình Trạng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-eco-gray-100">
                    {group.items.map((item, iIdx) => {
                      const unitPriceM2 = pricingMode === 'retail' ? item.retailPerM2 : item.wholesalePerM2;
                      const unitPriceSheet = pricingMode === 'retail' ? item.retailPerSheet : item.wholesalePerSheet;

                      return (
                        <tr key={iIdx} className="hover:bg-eco-gray-50/80 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6">
                            <div className="font-bold text-eco-gray-900">{item.surface}</div>
                            <div className="text-[10px] font-mono text-bamboo-700">{item.codeRange}</div>
                          </td>
                          <td className="py-3.5 px-4 text-eco-gray-600 font-medium whitespace-nowrap">
                            {item.specs}
                          </td>
                          <td className="py-3.5 px-4 text-eco-gray-500 whitespace-nowrap">
                            {item.packaging}
                          </td>
                          <td className="py-3.5 px-4 text-right font-medium text-eco-gray-700 whitespace-nowrap">
                            {unitPriceM2 > 0 ? formatVND(unitPriceM2) : 'Theo thanh'}
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-bamboo-800 text-sm whitespace-nowrap">
                            {formatVND(unitPriceSheet)}
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              {item.stock}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* 4. CHÍNH SÁCH CHIẾT KHẤU & CAM KẾT VẬN CHUYỂN */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-eco-gray-200 space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-bamboo-100 text-bamboo-800 font-black flex items-center justify-center text-sm mb-2">
              5%
            </div>
            <h3 className="font-bold text-sm text-eco-gray-900">Chiết Khấu Đơn Hàng &gt; 50m²</h3>
            <p className="text-xs text-eco-gray-500 leading-relaxed">
              Áp dụng cho chủ nhà hoàn thiện căn hộ hoặc tổ đội thợ mua khối lượng từ 15 tấm trở lên.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-eco-gray-200 space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-wood-100 text-wood-800 font-black flex items-center justify-center text-sm mb-2">
              10%
            </div>
            <h3 className="font-bold text-sm text-eco-gray-900">Chiết Khấu Đơn Hàng &gt; 100m²</h3>
            <p className="text-xs text-eco-gray-500 leading-relaxed">
              Hỗ trợ miễn phí cước vận chuyển nội thành Hà Nội trong bán kính 20km từ nhà máy Sơn Đồng.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-eco-gray-200 space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-bamboo-100 text-bamboo-800 font-black flex items-center justify-center text-sm mb-2">
              25%
            </div>
            <h3 className="font-bold text-sm text-eco-gray-900">Chính Sách Đại Lý Độc Quyền</h3>
            <p className="text-xs text-eco-gray-500 leading-relaxed">
              Cam kết bảo hộ thị trường tỉnh, cung cấp xâu mẫu (Sample Box 160 mã) và catalog 2025 miễn phí.
            </p>
          </div>
        </div>

        {/* Banner CTA Báo Giá Dự Án */}
        <div className="mt-10 rounded-3xl bg-gradient-bamboo text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-hover">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-black">Cần Báo Giá Bóc Tách Khối Lượng Bản Vẽ Thiết Kế?</h3>
            <p className="text-xs sm:text-sm text-bamboo-100">
              Gửi ngay file CAD hoặc kích thước mảng tường, kỹ sư Eco Bamboo sẽ gửi dự toán chi tiết trong 15 phút.
            </p>
          </div>
          <a
            href="tel:0915189389"
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-bamboo-900 font-extrabold text-xs uppercase tracking-wider shadow hover:scale-105 transition-all flex items-center"
          >
            <PhoneCallIcon className="w-4 h-4 mr-2 text-wood-600" />
            Hotline Dự Án: 0915.189.389
          </a>
        </div>

      </div>
    </MainLayout>
  );
}
