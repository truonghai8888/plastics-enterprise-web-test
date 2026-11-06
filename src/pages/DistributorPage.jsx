import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { LeadCaptureForm } from './LeadForms';
import BRAND, { getCurrentYear, DISTRIBUTOR_REGIONS } from '../config/brandConfig';

const PARTNER_LOGOS = [
  { id: 1, name: 'Đối tác chiến lược 1', src: '/images/nhuaamc/2-300x212-1.jpg' },
  { id: 2, name: 'Đối tác chiến lược 2', src: '/images/nhuaamc/4-300x212-1.jpg' },
  { id: 3, name: 'Đối tác chiến lược 3', src: '/images/nhuaamc/3-300x212-1.jpg' },
  { id: 4, name: 'Đối tác chiến lược 4', src: '/images/nhuaamc/logo4.jpg' },
  { id: 5, name: 'Đối tác chiến lược 5', src: '/images/nhuaamc/logo3.jpg' },
  { id: 6, name: 'Đối tác chiến lược 6', src: '/images/nhuaamc/logo2.jpg' },
];

export default function DistributorPage() {
  const regions = DISTRIBUTOR_REGIONS || BRAND.distributorRegions || [];

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
            {BRAND.brandName} liên tục mở rộng mạng lưới phân phối vật liệu xanh tại 63 tỉnh thành, cam kết chính sách chiết khấu trực tiếp và bảo hộ thị trường vùng.
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* SECTION A: CHÍNH SÁCH ĐẠI LÝ & QUYỀN LỢI */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              Chính Sách Hợp Tác {getCurrentYear()}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-eco-gray-900">
              Trở Thành Nhà Phân Phối Của Nhà Máy Nhựa {BRAND.shortName}
            </h2>
            <p className="text-xs text-eco-gray-600">
              Văn phòng & nhà máy sản xuất: {BRAND.factoryAddress}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-eco-gray-200 shadow-soft space-y-3 hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 font-black flex items-center justify-center text-base border border-amber-200">
                25%
              </div>
              <h3 className="font-extrabold text-base text-eco-gray-900">Chiết Khấu Cao Nhất</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Mức giá xuất xưởng trực tiếp từ nhà máy không qua bất kỳ khâu trung gian thương mại nào, tối đa hóa lợi nhuận cho đại lý.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-eco-gray-200 shadow-soft space-y-3 hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-wood-50 text-wood-800 font-black flex items-center justify-center text-base border border-wood-200">
                100%
              </div>
              <h3 className="font-extrabold text-base text-eco-gray-900">Bảo Hộ Thị Trường</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Chính sách bảo hộ địa bàn kinh doanh độc quyền. Toàn bộ đơn hàng và khách lẻ trong khu vực đều được chuyển trực tiếp cho đại lý phụ trách.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-eco-gray-200 shadow-soft space-y-3 hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 font-black flex items-center justify-center text-sm border border-amber-200">
                FREE
              </div>
              <h3 className="font-extrabold text-base text-eco-gray-900">Tặng Sample Box</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Cung cấp miễn phí 100% trọn bộ xâu mẫu thực tế hơn 160 mã màu cùng cuốn Catalogue sản phẩm {getCurrentYear()} hoàn chỉnh.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-eco-gray-200 shadow-soft space-y-3 hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-wood-50 text-wood-800 font-black flex items-center justify-center text-sm border border-wood-200">
                SHOW
              </div>
              <h3 className="font-extrabold text-base text-eco-gray-900">Hỗ Trợ Showroom</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Tài trợ bảng hiệu nhận diện thương hiệu, kệ bảng mẫu trưng bày cao cấp và đào tạo kỹ thuật soi rãnh, uốn cong 90° cho thợ thi công.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION B: 2 CỘT MẠNG LƯỚI KHU VỰC & FORM ĐĂNG KÝ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* CỘT TRÁI: ẢNH KỆ MẪU & DANH SÁCH NPP THEO KHU VỰC */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-eco-gray-200 shadow-sm bg-eco-gray-100">
                <img
                  src="/images/nhuaamc/z6092044827018_6ab77d337d138d8f8952b61efda1fa1c.jpg"
                  alt={`Kệ bảng mẫu tấm ốp than tre ${BRAND.shortName}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2.5 text-center text-xs font-bold text-eco-gray-800 bg-white">
                  Kệ bảng mẫu trưng bày đại lý {BRAND.shortName}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-eco-gray-200 shadow-sm bg-eco-gray-100">
                <img
                  src="/images/nhuaamc/z6092044738595_8a571fba251c65d9fc6bfd9ea184f4bf.jpg"
                  alt={`Kho tấm ốp và vật tư nhà máy ${BRAND.shortName}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2.5 text-center text-xs font-bold text-eco-gray-800 bg-white">
                  Kho tấm ốp & cuộn film nhà máy
                </div>
              </div>
            </div>

            {/* Đại lý tiêu biểu từ nguồn AMC */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                <span className="text-xs font-bold uppercase text-amber-800">Đại lý tiêu biểu trên toàn quốc</span>
              </div>
              <h4 className="text-sm font-extrabold text-eco-gray-900">Cửa Hàng VLXD Dung Anh</h4>
              <p className="text-xs text-eco-gray-700 leading-relaxed">
                <strong>Địa chỉ:</strong> Q123, Phố Yên, Xã Tiền Phong, Huyện Mê Linh, Hà Nội<br />
                <strong>Điện thoại:</strong> {BRAND.hotlineDisplay} • Đầy đủ mẫu tấm ốp Nano, lam sóng và sàn nhựa hèm khóa {BRAND.shortName}.
              </p>
            </div>

            <h3 className="text-xl font-black text-eco-gray-900 border-l-4 border-amber-600 pl-3">
              Mạng Lưới Nhà Phân Phối Theo Khu Vực
            </h3>

            <div className="space-y-4">
              {regions.map((reg, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-eco-gray-200 p-5 shadow-sm space-y-3">
                  <h4 className="text-sm font-extrabold text-bamboo-900 uppercase tracking-wider flex items-center">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                    {reg.region}
                  </h4>
                  <div className="divide-y divide-eco-gray-100">
                    {reg.cities.map((c, cIdx) => (
                      <div key={cIdx} className="py-2.5 flex justify-between items-start text-xs">
                        <strong className="text-eco-gray-900 font-bold shrink-0 w-28 sm:w-32">{c.name}:</strong>
                        <span className="text-eco-gray-600 text-right">{c.address}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: FORM ĐĂNG KÝ ĐẠI LÝ */}
          <div className="lg:col-span-6 sticky top-24">
            <LeadCaptureForm purpose="dealer" embedded={true} />
          </div>

        </div>

        {/* SECTION C: ĐỐI TÁC CỦA AMC (THEO YÊU CẦU TODO ITEM 4) */}
        <div className="bg-white rounded-3xl border border-eco-gray-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              Hợp Tác Bền Vững
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-eco-gray-900">
              ĐỐI TÁC CỦA {BRAND.shortName.toUpperCase()}
            </h3>
            <p className="text-xs sm:text-sm text-eco-gray-600 leading-relaxed font-light">
              Chúng tôi tự hào khi đã đồng hành cùng nhiều đối tác uy tín. Với chất lượng sản phẩm vượt trội, hệ thống sản xuất hiện đại và dịch vụ chuyên nghiệp, {BRAND.shortName} đã mang đến sự hài lòng tuyệt đối cho khách hàng. Sự tin tưởng và hợp tác lâu dài từ các đối tác là minh chứng rõ nét cho giá trị mà {BRAND.shortName} mang lại.
            </p>
          </div>

          {/* LƯỚI LOGO ĐỐI TÁC UY TÍN TỪ NGUỒN AMC */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 items-center">
            {PARTNER_LOGOS.map((partner) => (
              <div
                key={partner.id}
                className="p-4 rounded-2xl bg-white border border-eco-gray-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:ring-2 hover:ring-amber-400/40 hover:scale-105 transition-all duration-300 flex items-center justify-center h-28 group cursor-pointer"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
