import React from 'react';
import MainLayout from '../components/layout/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-14 border-b border-bamboo-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600/30">
            Giới Thiệu Về Eco Bamboo
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Công Ty Cổ Phần Công Nghiệp Eco Bamboo
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
            Nhà sản xuất và phân phối giải pháp vật liệu hoàn thiện nội thất xanh hàng đầu tại Việt Nam.
          </p>
        </div>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">

        {/* Giới thiệu chung */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4 text-sm text-eco-gray-700 leading-relaxed">
            <h2 className="text-2xl font-black text-eco-gray-900 tracking-tight">
              Sứ Mệnh Tiên Phong Trong Kỷ Nguyên Nội Thất Sinh Thái
            </h2>
            <p>
              <strong>Công ty Cổ phần Công nghiệp Eco Bamboo</strong> có tiền thân hoạt động lâu năm trong lĩnh vực chế biến các sản phẩm sinh thái từ tre và gỗ tự nhiên. Nắm bắt xu hướng toàn cầu về bảo vệ sức khỏe và không gian sống bền vững, Eco Bamboo đã đầu tư đồng bộ dây chuyền sản xuất tự động hóa hiện đại để chế tạo các dòng vật liệu ốp tường than tre công nghệ mới.
            </p>
            <p>
              Toàn bộ sản phẩm của Eco Bamboo sử dụng cốt bột than tre hoạt tính nén ép ở mật độ cao cùng keo nhiệt PUR Jowat nhập khẩu trực tiếp từ CHLB Đức, đạt chuẩn phát thải Formaldehyde E0 – ngưỡng an toàn cao nhất của Châu Âu cho người sử dụng.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-3">
              <div className="p-3 rounded-xl bg-bamboo-50 border border-bamboo-200 text-center">
                <div className="text-xl font-black text-bamboo-800">E0</div>
                <div className="text-[10px] text-eco-gray-600 font-semibold">Chuẩn phát thải Châu Âu</div>
              </div>
              <div className="p-3 rounded-xl bg-wood-50 border border-wood-200 text-center">
                <div className="text-xl font-black text-wood-800">10 Năm</div>
                <div className="text-[10px] text-eco-gray-600 font-semibold">Bảo hành bằng văn bản</div>
              </div>
              <div className="p-3 rounded-xl bg-bamboo-50 border border-bamboo-200 text-center">
                <div className="text-xl font-black text-bamboo-800">160+</div>
                <div className="text-[10px] text-eco-gray-600 font-semibold">Mã màu độc quyền</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-eco-gray-200 shadow-card bg-eco-gray-100 space-y-3">
            <img
              src="/images/ecobamboo/nha-may-eco-bamboo-xuong-san-xuat-tam-op.webp"
              alt="Nhà máy sản xuất tấm ốp than tre Eco Bamboo"
              className="w-full h-auto object-cover"
            />
            <div className="p-4 bg-white space-y-2">
              <h3 className="text-sm font-extrabold text-eco-gray-900">Quy mô nhà máy tại Sơn Đồng, Hoài Đức</h3>
              <p className="text-xs text-eco-gray-600">
                Trang bị hệ thống máy xẻ rãnh tự động, dây chuyền ép phủ keo nhiệt PUR liên tục và kho lưu trữ hơn 100+ cuộn film bề mặt sẵn sàng xuất xưởng.
              </p>
            </div>
          </div>
        </div>

        {/* Địa chỉ cơ sở & Nhà máy */}
        <div className="bg-white rounded-3xl border border-eco-gray-200 p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-extrabold text-eco-gray-900 border-l-4 border-bamboo-600 pl-3">
            Hệ Thống Trụ Sở & Cơ Sở Sản Xuất
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-eco-gray-700 leading-relaxed">
            <div className="p-5 rounded-2xl bg-eco-gray-50 border border-eco-gray-200 space-y-2">
              <div className="font-extrabold text-sm text-bamboo-900">Nhà Máy Sản Xuất & Tổng Kho Hà Nội</div>
              <p><strong>Địa chỉ:</strong> Khu Cầu Nổi, xã Sơn Đồng, huyện Hoài Đức, TP. Hà Nội (Km8 Đại Lộ Thăng Long)</p>
              <p><strong>Năng lực sản xuất:</strong> Dây chuyền xẻ tấm và ép nhiệt PUR tự động liên tục công suất hàng chục ngàn m²/tháng.</p>
              <p><strong>Hotline xuất xưởng:</strong> <a href="tel:0915189389" className="text-bamboo-800 font-bold hover:underline">0915.189.389</a></p>
            </div>

            <div className="p-5 rounded-2xl bg-eco-gray-50 border border-eco-gray-200 space-y-2">
              <div className="font-extrabold text-sm text-wood-900">Văn Phòng Đại Diện Hà Nội</div>
              <p><strong>Địa chỉ:</strong> Tòa HH1, 90 Nguyễn Tuân, Q. Thanh Xuân, TP. Hà Nội</p>
              <p><strong>Chức năng:</strong> Phòng trưng bày vật liệu mẫu, tiếp nhận yêu cầu đại lý và hỗ trợ hồ sơ thầu công trình.</p>
              <p><strong>Email chính thức:</strong> <a href="mailto:sale.ecobamboo@gmail.com" className="hover:underline">sale.ecobamboo@gmail.com</a></p>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
