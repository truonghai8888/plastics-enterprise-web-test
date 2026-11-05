import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { LeadCaptureForm } from './LeadForms';

const DISTRIBUTOR_REGIONS = [
  {
    region: 'Miền Bắc',
    cities: [
      { name: 'Hà Nội', address: 'Tổng kho Km8 Đại Lộ Thăng Long, Hoài Đức & Kho Hoàng Mai' },
      { name: 'Hải Phòng', address: 'Đại lý phân phối khu vực Lê Chân & Thủy Nguyên' },
      { name: 'Quảng Ninh', address: 'Đại lý phân phối TP. Hạ Long & TP. Cẩm Phả' },
      { name: 'Bắc Ninh', address: 'Đại lý phân phối TP. Bắc Ninh & KCN Quế Võ' },
      { name: 'Hải Dương', address: 'Đại lý phân phối TP. Hải Dương' },
    ]
  },
  {
    region: 'Miền Trung',
    cities: [
      { name: 'Đà Nẵng', address: 'Tổng kho phân phối khu vực Cẩm Lệ & Liên Chiểu' },
      { name: 'Nghệ An', address: 'Đại lý phân phối TP. Vinh' },
      { name: 'Thanh Hóa', address: 'Đại lý phân phối TP. Thanh Hóa' },
      { name: 'Khánh Hòa', address: 'Đại lý phân phối TP. Nha Trang' },
    ]
  },
  {
    region: 'Miền Nam',
    cities: [
      { name: 'TP. Hồ Chí Minh', address: 'Hệ thống kho trung chuyển Quận 12 & TP. Thủ Đức' },
      { name: 'Bình Dương', address: 'Đại lý phân phối TP. Thủ Dầu Một' },
      { name: 'Đồng Nai', address: 'Đại lý phân phối TP. Biên Hòa' },
      { name: 'Cần Thơ', address: 'Đại lý phân phối khu vực Ninh Kiều' },
    ]
  }
];

export default function DistributorPage() {
  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-14 border-b border-bamboo-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/30">
            Mạng Lưới Toàn Quốc
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Hệ Thống Nhà Phân Phối & Đại Lý
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
            Eco Bamboo liên tục mở rộng mạng lưới phân phối vật liệu xanh tại 63 tỉnh thành, cam kết chính sách chiết khấu trực tiếp và bảo hộ thị trường vùng.
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">

        {/* Quyền lợi đại lý */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-eco-gray-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-bamboo-100 text-bamboo-800 font-black flex items-center justify-center text-sm">25%</div>
            <h3 className="font-extrabold text-sm text-eco-gray-900">Chiết Khấu Cao Nhất</h3>
            <p className="text-xs text-eco-gray-500 leading-relaxed">Giá xuất xưởng trực tiếp từ nhà máy không qua trung gian thương mại.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-eco-gray-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-wood-100 text-wood-800 font-black flex items-center justify-center text-sm">100%</div>
            <h3 className="font-extrabold text-sm text-eco-gray-900">Bảo Hộ Thị Trường</h3>
            <p className="text-xs text-eco-gray-500 leading-relaxed">Độc quyền phân phối tại địa bàn, toàn bộ khách lẻ khu vực được chuyển về cho đại lý.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-eco-gray-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-bamboo-100 text-bamboo-800 font-black flex items-center justify-center text-sm">FREE</div>
            <h3 className="font-extrabold text-sm text-eco-gray-900">Tặng Sample Box</h3>
            <p className="text-xs text-eco-gray-500 leading-relaxed">Cung cấp miễn phí trọn bộ xâu mẫu 160 mã màu và catalog 2025.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-eco-gray-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-wood-100 text-wood-800 font-black flex items-center justify-center text-sm">SHOW</div>
            <h3 className="font-extrabold text-sm text-eco-gray-900">Hỗ Trợ Showroom</h3>
            <p className="text-xs text-eco-gray-500 leading-relaxed">Tài trợ bảng biển quảng cáo và mẫu trưng bày vách tivi, lam sóng.</p>
          </div>
        </div>

        {/* 2 Cột: Danh sách mạng lưới & Form đăng ký */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-eco-gray-200 shadow-sm bg-eco-gray-100">
                <img
                  src="/images/ecobamboo/gia-bang-mau-tam-op-than-tre-eco-bamboo.webp"
                  alt="Kệ bảng mẫu tấm ốp than tre Eco Bamboo"
                  className="w-full h-40 object-cover"
                />
                <div className="p-2.5 text-center text-xs font-bold text-eco-gray-800 bg-white">
                  Kệ bảng mẫu trưng bày đại lý
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-eco-gray-200 shadow-sm bg-eco-gray-100">
                <img
                  src="/images/ecobamboo/kho-tam-op-va-cuon-film-nha-may-eco-bamboo.webp"
                  alt="Kho tấm ốp và cuộn film nhà máy Eco Bamboo"
                  className="w-full h-40 object-cover"
                />
                <div className="p-2.5 text-center text-xs font-bold text-eco-gray-800 bg-white">
                  Kho tấm ốp & cuộn film nhà máy
                </div>
              </div>
            </div>

            <h3 className="text-xl font-black text-eco-gray-900 border-l-4 border-bamboo-600 pl-3">
              Mạng Lưới Nhà Phân Phối Theo Khu Vực
            </h3>

            <div className="space-y-6">
              {DISTRIBUTOR_REGIONS.map((reg, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-eco-gray-200 p-5 shadow-sm space-y-3">
                  <h4 className="text-sm font-extrabold text-bamboo-900 uppercase tracking-wider">{reg.region}</h4>
                  <div className="divide-y divide-eco-gray-100">
                    {reg.cities.map((c, cIdx) => (
                      <div key={cIdx} className="py-2.5 flex justify-between items-start text-xs">
                        <strong className="text-eco-gray-900 font-bold shrink-0 w-28">{c.name}:</strong>
                        <span className="text-eco-gray-600 text-right">{c.address}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <LeadCaptureForm purpose="dealer" embedded={true} />
          </div>

        </div>

      </div>
    </MainLayout>
  );
}
