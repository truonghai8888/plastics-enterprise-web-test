import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { PRODUCTS } from '../data/products';
import BRAND, { getCurrentYear } from '../config/brandConfig';

// Icons
const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const PhoneCallIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Giá tấm ốp than tre được tính thế nào?",
      a: "Giá niêm yết tính theo m² và phụ thuộc mã film, độ dày (5mm hoặc 8mm) và khổ tấm. Toàn bộ bảng giá được công bố công khai trên website. Giá niêm yết chưa gồm VAT 8% và chưa gồm cước vận chuyển."
    },
    {
      q: "Tấm ốp than tre có chống cháy không?",
      a: "Vật liệu có khả năng chống cháy lan cấp B1 và đã được kiểm nghiệm vật liệu độc lập. Đây là vật liệu hoàn thiện nội thất an toàn, tự dập tắt khi không còn nguồn nhiệt tiếp xúc."
    },
    {
      q: "Vật liệu có mùi hoặc độc hại không?",
      a: "Các dòng sản phẩm đạt chứng chỉ phát thải Formaldehyde mức E0 (≤ 0.5 mg/L) — mức an toàn cao nhất trong thang phân loại cho vật liệu nội thất, hoàn toàn lành tính cho trẻ nhỏ."
    },
    {
      q: "Có dùng được cho khu vực bếp hoặc ẩm ướt không?",
      a: `Ốp tường khu bếp là được, miễn không phải vị trí sát ngọn lửa bếp nấu (nơi nhiệt độ cao trực tiếp và nhiều dầu mỡ bắn). Với hệ cánh tủ bếp và kệ lavabo, ${BRAND.shortName} khuyên dùng tấm nội thất 17mm chuyên dụng.`
    },
    {
      q: "Thời gian giao hàng từ nhà máy là bao lâu?",
      a: `${BRAND.shortName} luôn sẵn kho số lượng lớn tại ${BRAND.warehouseAddress}. Khu vực Hà Nội và miền Bắc thường nhận hàng sau 1–2 ngày. Các tỉnh xa phụ thuộc tuyến vận chuyển, nhân viên kinh doanh sẽ báo lịch cụ thể khi chốt đơn.`
    },
    {
      q: "Thợ thi công và nhà thầu có được nhận xâu mẫu thử không?",
      a: "Có. Thợ thi công, nhà thầu và kiến trúc sư đăng ký được tặng xâu mẫu (sample box) miễn phí và áp dụng chính sách giá riêng theo sản lượng. Liên hệ Hotline: {BRAND.hotlineDisplay}."
    }
  ];

  const popularProducts = PRODUCTS.slice(0, 12);

  return (
    <MainLayout>
      {/* ========================================================
          SECTION 1: HERO BANNER (ĐỐI CHIẾU ECOBAMBOO.VN)
          ======================================================== */}
      <section className="bg-gradient-to-b from-[#f9fafb] to-white py-12 md:py-20 border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center text-xs font-semibold text-bamboo-800 bg-bamboo-100/80 px-3 py-1 rounded-full">
                100+ mã màu · bảng giá công khai · tính chi phí online
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-eco-gray-900 tracking-tight leading-[1.2]">
                Vật liệu ốp tường than tre cho không gian hoàn thiện đẹp và bền
              </h1>

              <p className="text-sm sm:text-base text-eco-gray-600 leading-relaxed max-w-2xl">
                Tấm ốp 5mm & 8mm, tấm nội thất 17mm, lam sóng và nẹp nhôm đồng bộ — chọn mã màu, xem giá niêm yết và ước tính chi phí vật tư ngay trên website, không cần chờ báo giá.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="/thu-vien-ma-mau"
                  className="px-6 py-3.5 rounded-xl bg-bamboo-800 hover:bg-bamboo-900 text-white font-bold text-sm shadow-md transition-all flex items-center"
                >
                  Xem 100+ mã màu
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </a>

                <a
                  href="/tinh-chi-phi"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-eco-gray-50 text-bamboo-900 border border-eco-gray-300 font-bold text-sm transition-all"
                >
                  Tính chi phí vật tư
                </a>

                <a
                  href="/bang-gia"
                  className="px-5 py-3.5 rounded-xl text-wood-800 hover:text-wood-950 font-bold text-sm"
                >
                  Bảng giá niêm yết &rarr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-eco-gray-200 bg-white">
                <img
                  src="/images/ecobamboo/2EB68017-scaled.webp"
                  alt={`Vật liệu ốp tường than tre ${BRAND.shortName} hoàn thiện`}
                  className="w-full h-auto object-cover max-h-[460px] hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-3 text-white text-xs flex justify-between items-center">
                  <div>
                    <div className="font-bold">Mã EB68017 · Light-grey Skin</div>
                    <div className="text-[11px] text-gray-300">Căn hộ Penthouse The Matrix One, Hà Nội</div>
                  </div>
                  <span className="px-2 py-1 rounded bg-bamboo-700 text-[10px] font-bold">Chuẩn E0 Đức</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 2: TỰ THIẾT KẾ VÁCH NGAY TRÊN TRÌNH DUYỆT
          ======================================================== */}
      <section className="py-16 bg-white border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-eco-gray-900 via-bamboo-950 to-eco-gray-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-bamboo-400">Công cụ độc quyền</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Tự thiết kế vách ngay trên trình duyệt
              </h2>
              <p className="text-sm text-eco-gray-300 leading-relaxed max-w-xl">
                Chọn mẫu vách tivi, vách sofa hay đầu giường, sửa từng mảng, chọn mã tấm và lam thật — nhận bản vẽ, khối lượng vật tư và link gửi cho thợ. Không cần cài đặt bất kỳ phần mềm nào.
              </p>
              <div className="pt-2">
                <a
                  href="/tu-thiet-ke-vach"
                  className="inline-flex items-center px-6 py-3.5 rounded-xl bg-wood-500 hover:bg-wood-600 text-white font-bold text-sm shadow-md transition-all"
                >
                  Thiết kế vách của bạn ngay
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40">
                <img
                  src="/images/ecobamboo/vach-tivi-khe-doc.jpg"
                  alt="Mô phỏng vách tivi khe dọc"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 3: MỖI NHÓM KHÁCH HÀNG CẦN MỘT THỨ KHÁC NHAU
          ======================================================== */}
      <section className="py-16 bg-eco-gray-50/70 border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-eco-gray-900 tracking-tight">
              Mỗi nhóm khách hàng cần một thứ khác nhau
            </h2>
            <p className="mt-2 text-sm text-eco-gray-500">
              Chọn đúng nhóm của bạn để đi thẳng tới thông tin cần thiết.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Gia chủ */}
            <div className="rounded-2xl bg-white border border-eco-gray-200 p-6 flex flex-col justify-between hover:shadow-hover hover:border-bamboo-300 transition-all">
              <div className="space-y-3">
                <span className="w-9 h-9 rounded-xl bg-bamboo-100 text-bamboo-800 font-bold flex items-center justify-center text-sm">01</span>
                <h3 className="text-lg font-extrabold text-eco-gray-900">Gia chủ</h3>
                <p className="text-xs text-eco-gray-600 leading-relaxed">
                  Cần biết mã màu nào hợp không gian và tổng chi phí khoảng bao nhiêu trước khi quyết định.
                </p>
              </div>
              <div className="pt-6 border-t border-eco-gray-100 mt-4 space-y-2">
                <a href="/thu-vien-ma-mau" className="block text-xs font-bold text-bamboo-800 hover:underline">&rarr; Chọn mã màu</a>
                <a href="/tinh-chi-phi" className="block text-xs font-semibold text-eco-gray-500 hover:text-bamboo-800">&rarr; Dự toán chi phí</a>
              </div>
            </div>

            {/* 2. Kiến trúc sư & NTK */}
            <div className="rounded-2xl bg-white border border-eco-gray-200 p-6 flex flex-col justify-between hover:shadow-hover hover:border-bamboo-300 transition-all">
              <div className="space-y-3">
                <span className="w-9 h-9 rounded-xl bg-wood-100 text-wood-800 font-bold flex items-center justify-center text-sm">02</span>
                <h3 className="text-lg font-extrabold text-eco-gray-900">Kiến trúc sư & NTK</h3>
                <p className="text-xs text-eco-gray-600 leading-relaxed">
                  Cần catalogue bản mềm, file map full tấm độ phân giải cao và thông số kỹ thuật để đưa thẳng vào phương án 3D.
                </p>
              </div>
              <div className="pt-6 border-t border-eco-gray-100 mt-4 space-y-2">
                <a href="/tai-catalogue" className="block text-xs font-bold text-bamboo-800 hover:underline">&rarr; Tải catalogue & file map</a>
                <a href="/thu-vien-ma-mau/phoi-mau/" className="block text-xs font-semibold text-eco-gray-500 hover:text-bamboo-800">&rarr; Phối màu không gian 3D</a>
              </div>
            </div>

            {/* 3. Thợ & nhà thầu */}
            <div className="rounded-2xl bg-white border border-eco-gray-200 p-6 flex flex-col justify-between hover:shadow-hover hover:border-bamboo-300 transition-all">
              <div className="space-y-3">
                <span className="w-9 h-9 rounded-xl bg-bamboo-100 text-bamboo-800 font-bold flex items-center justify-center text-sm">03</span>
                <h3 className="text-lg font-extrabold text-eco-gray-900">Thợ & nhà thầu</h3>
                <p className="text-xs text-eco-gray-600 leading-relaxed">
                  Cần bậc giá theo sản lượng, hàng luôn sẵn kho và bộ nẹp đồng bộ đúng độ dày tấm để thi công nhanh nhất.
                </p>
              </div>
              <div className="pt-6 border-t border-eco-gray-100 mt-4 space-y-2">
                <a href="/nha-phan-phoi" className="block text-xs font-bold text-bamboo-800 hover:underline">&rarr; Chính sách thợ & nhà thầu</a>
                <a href="/huong-dan-thi-cong" className="block text-xs font-semibold text-eco-gray-500 hover:text-bamboo-800">&rarr; Kỹ thuật soi rãnh uốn 90°</a>
              </div>
            </div>

            {/* 4. Đại lý & nhà phân phối */}
            <div className="rounded-2xl bg-white border border-eco-gray-200 p-6 flex flex-col justify-between hover:shadow-hover hover:border-bamboo-300 transition-all">
              <div className="space-y-3">
                <span className="w-9 h-9 rounded-xl bg-wood-100 text-wood-800 font-bold flex items-center justify-center text-sm">04</span>
                <h3 className="text-lg font-extrabold text-eco-gray-900">Đại lý & nhà phân phối</h3>
                <p className="text-xs text-eco-gray-600 leading-relaxed">
                  Cần nguồn hàng ổn định từ nhà máy, bảng giá rõ ràng và hỗ trợ kệ mẫu, catalogue showroom chuyên nghiệp.
                </p>
              </div>
              <div className="pt-6 border-t border-eco-gray-100 mt-4 space-y-2">
                <a href="/lien-he?nc=dai-ly" className="block text-xs font-bold text-bamboo-800 hover:underline">&rarr; Trao đổi hợp tác đại lý</a>
                <a href="/nha-phan-phoi" className="block text-xs font-semibold text-eco-gray-500 hover:text-bamboo-800">&rarr; Xem chính sách nhà máy</a>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 4: BỐN NHÓM VẬT LIỆU, DÙNG CHUNG MỘT HỆ HOÀN THIỆN
          ======================================================== */}
      <section className="py-20 bg-white border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-bamboo-700">Hệ sinh thái đồng bộ</span>
              <h2 className="text-2xl sm:text-4xl font-black text-eco-gray-900 tracking-tight mt-1">
                Bốn nhóm vật liệu, dùng chung một hệ hoàn thiện
              </h2>
            </div>
            <p className="mt-3 md:mt-0 text-xs sm:text-sm text-eco-gray-500 max-w-md">
              Tấm ốp, tấm nội thất, lam sóng và nẹp nhôm của {BRAND.shortName} dùng chung hệ mã film — nên mặt tường, tủ và chi tiết trang trí ăn màu liền mạch với nhau.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Nhóm 1: Tấm ốp tường 5mm & 8mm */}
            <div className="rounded-2xl border border-eco-gray-200 overflow-hidden bg-white shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-eco-gray-100">
                  <img
                    src="/images/ecobamboo/gioi-thieu-tam-opArtboard-1-2-1536x960-1.webp"
                    alt="Tấm ốp tường than tre 5mm và 8mm"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-extrabold text-eco-gray-900 group-hover:text-bamboo-800">
                    Tấm ốp tường 5mm & 8mm
                  </h3>
                  <p className="text-xs text-eco-gray-600 leading-relaxed">
                    Ốp tường, ốp trần, vách trang trí. Khổ 1220×2440 / 2800 / 3200mm. Có loại 8mm cốt chống va đập.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a href="/san-pham-chinh/tam-op-than-tre" className="w-full py-2.5 rounded-xl bg-eco-gray-50 group-hover:bg-bamboo-700 text-eco-gray-800 group-hover:text-white font-bold text-xs flex items-center justify-center transition-colors">
                  Chi tiết sản phẩm &rarr;
                </a>
              </div>
            </div>

            {/* Nhóm 2: Tấm nội thất 17mm */}
            <div className="rounded-2xl border border-eco-gray-200 overflow-hidden bg-white shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-eco-gray-100">
                  <img
                    src="/images/ecobamboo/17mmArtboard-2-copy-2.webp"
                    alt="Tấm than tre 17mm đóng tủ"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-extrabold text-eco-gray-900 group-hover:text-bamboo-800">
                    Tấm nội thất 17mm
                  </h3>
                  <p className="text-xs text-eco-gray-600 leading-relaxed">
                    Cốt đen Loại 1 (0,70–0,73 g/cm³) và Loại 2 (0,65 g/cm³), khổ 1220×2440mm, phủ 1 hoặc 2 mặt chuyên đóng tủ bếp, cánh cửa.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a href="/tam-than-tre-17mm" className="w-full py-2.5 rounded-xl bg-eco-gray-50 group-hover:bg-bamboo-700 text-eco-gray-800 group-hover:text-white font-bold text-xs flex items-center justify-center transition-colors">
                  Chi tiết sản phẩm &rarr;
                </a>
              </div>
            </div>

            {/* Nhóm 3: Lam sóng trang trí */}
            <div className="rounded-2xl border border-eco-gray-200 overflow-hidden bg-white shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-eco-gray-100">
                  <img
                    src="/images/ecobamboo/Lam-song.webp"
                    alt="Lam sóng trang trí than tre"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-extrabold text-eco-gray-900 group-hover:text-bamboo-800">
                    Lam sóng trang trí
                  </h3>
                  <p className="text-xs text-eco-gray-600 leading-relaxed">
                    Lam vuông, lam bán nguyệt âm/dương, lam nhỏ — dài 3000mm, tạo điểm nhấn 3D cho vách tivi và trần.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a href="/san-pham-chinh/lam-song" className="w-full py-2.5 rounded-xl bg-eco-gray-50 group-hover:bg-bamboo-700 text-eco-gray-800 group-hover:text-white font-bold text-xs flex items-center justify-center transition-colors">
                  Chi tiết sản phẩm &rarr;
                </a>
              </div>
            </div>

            {/* Nhóm 4: Nẹp nhôm đồng bộ */}
            <div className="rounded-2xl border border-eco-gray-200 overflow-hidden bg-white shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-eco-gray-100">
                  <img
                    src="/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp"
                    alt="Nẹp nhôm hoàn thiện đồng bộ"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-extrabold text-eco-gray-900 group-hover:text-bamboo-800">
                    Nẹp nhôm đồng bộ
                  </h3>
                  <p className="text-xs text-eco-gray-600 leading-relaxed">
                    Nẹp H, nẹp V, nẹp góc âm/dương, nẹp kết thúc — có bản cho tấm 5mm và tấm 8mm, mạ Anode 4 màu.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a href="/san-pham-chinh/nep" className="w-full py-2.5 rounded-xl bg-eco-gray-50 group-hover:bg-bamboo-700 text-eco-gray-800 group-hover:text-white font-bold text-xs flex items-center justify-center transition-colors">
                  Chi tiết sản phẩm &rarr;
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 5: NHỮNG MÃ ĐƯỢC CHỌN NHIỀU NHẤT (12 MÃ CHÍNH XÁC)
          ======================================================== */}
      <section className="py-20 bg-eco-gray-50/70 border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-bamboo-700">Mẫu màu thực tế</span>
              <h2 className="text-2xl sm:text-4xl font-black text-eco-gray-900 tracking-tight mt-1">
                Những mã được chọn nhiều nhất
              </h2>
            </div>
            <p className="mt-3 md:mt-0 text-xs sm:text-sm text-eco-gray-500 max-w-md">
              Ảnh chụp bề mặt thật, không phải ảnh mô phỏng 3D. Mỗi mã có giá niêm yết theo từng độ dày và khổ tấm.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {popularProducts.map((prod) => (
              <a
                key={prod.id}
                href={prod.url}
                className="group rounded-2xl bg-white border border-eco-gray-200 overflow-hidden shadow-soft hover:shadow-hover hover:border-bamboo-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 sm:h-48 w-full bg-eco-gray-100 relative overflow-hidden">
                    <img
                      src={prod.swatchImage || prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono font-bold text-xs backdrop-blur-sm">
                        {prod.code}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-2 py-0.5 rounded bg-amber-600/95 text-white text-[10px] font-bold backdrop-blur-sm">
                        Được chọn nhiều
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1">
                    <div className="text-xs font-bold text-eco-gray-900 group-hover:text-bamboo-800 transition-colors line-clamp-1">
                      {prod.name}
                    </div>
                    <div className="text-xs font-extrabold text-bamboo-800">
                      Tấm ốp từ {prod.priceFormatted}
                    </div>
                  </div>
                </div>

                <div className="px-3.5 pb-3 pt-0 flex justify-between items-center text-[11px] text-eco-gray-500 border-t border-eco-gray-100 mt-2">
                  <span>Khổ {prod.dimensions}</span>
                  <span className="font-bold text-bamboo-700 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/thu-vien-ma-mau"
              className="inline-flex items-center px-6 py-3.5 rounded-xl bg-white border border-bamboo-300 hover:border-bamboo-600 text-bamboo-800 font-bold text-sm shadow-sm transition-all"
            >
              Xem tất cả hơn 100+ mã màu trong thư viện
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </a>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 6: CHẤT LƯỢNG NẰM Ở LỚP PHỦ VÀ CỐT TẤM
          ======================================================== */}
      <section className="py-20 bg-white border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bamboo-700">Tiêu chuẩn kiểm nghiệm</span>
                <h2 className="text-2xl sm:text-4xl font-black text-eco-gray-900 tracking-tight mt-1">
                  Chất lượng nằm ở lớp phủ và cốt tấm
                </h2>
                <p className="mt-3 text-sm text-eco-gray-600 leading-relaxed">
                  Độ bền màu và độ bền cơ học được quyết định ở hai khâu: chọn film đủ dày và chọn cốt theo mật độ nén. {BRAND.shortName} kiểm soát cả hai, cùng với bước phủ mặt tại {BRAND.factory?.title || BRAND.factoryName}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-eco-gray-50 border border-eco-gray-200 space-y-1">
                  <div className="font-extrabold text-sm text-eco-gray-900">Mật độ nén tối thiểu 0,65 g/cm³</div>
                  <div className="text-xs text-eco-gray-600">Mức sàn áp dụng cho mọi lô cốt. Cốt Loại 1 đạt 0,70–0,73 g/cm³.</div>
                </div>

                <div className="p-4 rounded-xl bg-eco-gray-50 border border-eco-gray-200 space-y-1">
                  <div className="font-extrabold text-sm text-eco-gray-900">Tỷ lệ nhựa PVC 45–50% trở lên</div>
                  <div className="text-xs text-eco-gray-600">Liên kết bột gỗ – bột đá bền hơn, giảm cong vênh và bong tách.</div>
                </div>

                <div className="p-4 rounded-xl bg-eco-gray-50 border border-eco-gray-200 space-y-1">
                  <div className="font-extrabold text-sm text-eco-gray-900">Film dày hơn mặt bằng chung</div>
                  <div className="text-xs text-eco-gray-600">PVC 0,14–0,18mm · PET-G 0,30–0,35mm, giữ màu và chịu xước tốt hơn.</div>
                </div>

                <div className="p-4 rounded-xl bg-eco-gray-50 border border-eco-gray-200 space-y-1">
                  <div className="font-extrabold text-sm text-eco-gray-900">Hơn 100 mã màu</div>
                  <div className="text-xs text-eco-gray-600">Đủ vân gỗ, vân đá, vân vải, đơn sắc, kim loại và tráng gương để phối trọn công trình.</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/chung-chi-chung-nhan"
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-bamboo-800 hover:underline"
                >
                  Xem kết quả thử nghiệm và chứng nhận E0, B1 &rarr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-eco-gray-200 bg-white">
                <img
                  src="/images/ecobamboo/day-chuyen-phu-film-pur-nha-may-eco-bamboo.webp"
                  alt={`Dây chuyền phủ film keo PUR tại ${BRAND.factoryName}`}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-bamboo-950 text-white text-xs flex justify-between items-center">
                  <span>Dây chuyền ép keo nhiệt PUR tự động tại {BRAND.factory?.title || BRAND.factoryName} ({BRAND.factory?.shortAddress || BRAND.factoryAddress})</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-bamboo-950 text-[10px] font-bold">Keo Jowat Đức</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 7: ƯỚC TÍNH CHI PHÍ VẬT TƯ TRONG MỘT PHÚT
          ======================================================== */}
      <section className="py-20 bg-gradient-to-br from-bamboo-900 to-bamboo-950 text-white border-b border-bamboo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-wood-400">Tiện ích trực tuyến</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Ước tính chi phí vật tư trong một phút
              </h2>
              <p className="text-sm text-eco-gray-200 leading-relaxed font-light max-w-xl">
                Nhập kích thước từng mảng tường, chọn mã màu và độ dày. Công cụ tính số tấm, số thanh nẹp, hao hụt và tổng chi phí theo giá niêm yết, đồng thời xuất bảng dự toán để lưu lại hoặc gửi cho khách hàng.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="/tinh-chi-phi"
                  className="px-6 py-3.5 rounded-xl bg-wood-500 hover:bg-wood-600 text-white font-bold text-sm shadow-md transition-all"
                >
                  Mở công cụ tính chi phí vật tư
                </a>

                <a
                  href="/bang-gia"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all"
                >
                  Xem bảng giá đầy đủ
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                <div className="font-bold text-wood-300 text-sm">Tính cả nẹp và hao hụt</div>
                <div className="text-gray-300 mt-1">Nẹp 5mm và 8mm có thể dùng chung trong một công trình.</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                <div className="font-bold text-emerald-400 text-sm">Theo giá niêm yết đang áp dụng</div>
                <div className="text-gray-300 mt-1">Số liệu lấy trực tiếp từ bảng giá công bố, không phải giá ước lượng.</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                <div className="font-bold text-wood-300 text-sm">Xuất bảng dự toán</div>
                <div className="text-gray-300 mt-1">In hoặc tải về để gửi khách hàng và so sánh phương án.</div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 8: CÔNG TRÌNH ĐÃ HOÀN THIỆN
          ======================================================== */}
      <section className="py-20 bg-white border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-bamboo-700">Hình ảnh thực tế</span>
              <h2 className="text-2xl sm:text-4xl font-black text-eco-gray-900 tracking-tight mt-1">
                Công trình đã hoàn thiện
              </h2>
            </div>
            <p className="mt-3 md:mt-0 text-xs sm:text-sm text-eco-gray-500">
              Căn hộ, nhà phố, văn phòng, khách sạn và không gian thương mại trên khắp cả nước.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { img: '/images/ecobamboo/EB79019-scaled.webp', title: 'Vân Vải EB79019 · Vách Phòng Khách' },
              { img: '/images/ecobamboo/2EB66004-scaled.webp', title: 'Vân Gỗ EB66004 · Vách Tivi' },
              { img: '/images/ecobamboo/IMG_4577.webp', title: 'Phòng Ngủ Căn Hộ Chung Cư' },
              { img: '/images/ecobamboo/IMG_4571.webp', title: 'Sảnh Đón Văn Phòng Hiện Đại' },
              { img: '/images/ecobamboo/IMG_4575-w800.webp', title: 'Vách Đầu Giường Bo Góc Cong' },
              { img: '/images/ecobamboo/IMG_4576-w800.webp', title: 'Ốp Tường Kết Hợp Lam Sóng' },
              { img: '/images/ecobamboo/EB66013-2.webp', title: 'Vân Gỗ Tự Nhiên Sồi Bắc Âu' },
              { img: '/images/ecobamboo/2EB68017-scaled.webp', title: 'Đơn Sắc Be Sữa · Biệt Thự' }
            ].map((item, idx) => (
              <div key={idx} className="group rounded-2xl overflow-hidden border border-eco-gray-200 relative aspect-[4/3] bg-eco-gray-100 shadow-soft">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                  <span className="text-xs font-bold text-white leading-tight drop-shadow">{item.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/cong-trinh"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-eco-gray-50 hover:bg-bamboo-50 text-bamboo-800 border border-eco-gray-200 font-bold text-sm transition-colors"
            >
              Xem thêm các công trình thực tế &rarr;
            </a>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 9: NGUYÊN TẮC LÀM VIỆC
          ======================================================== */}
      <section className="py-20 bg-eco-gray-50/70 border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-bamboo-700">Cam kết minh bạch</span>
            <h2 className="text-2xl sm:text-3xl font-black text-eco-gray-900 tracking-tight mt-1">
              Nguyên tắc làm việc của {BRAND.shortName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-eco-gray-200 space-y-3 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-bamboo-100 text-bamboo-800 font-extrabold flex items-center justify-center">1</div>
              <h3 className="text-lg font-bold text-eco-gray-900">Bảng giá công khai</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Toàn bộ giá niêm yết của tấm ốp, tấm 17mm, lam sóng và nẹp đều đăng công khai trên website. Giá chưa gồm VAT 8% và cước vận chuyển.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-eco-gray-200 space-y-3 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-wood-100 text-wood-800 font-extrabold flex items-center justify-center">2</div>
              <h3 className="text-lg font-bold text-eco-gray-900">Minh bạch về quy trình</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                {BRAND.shortName} tuyển chọn film và tấm cốt theo tiêu chuẩn riêng, thực hiện khâu phủ mặt tại {BRAND.factoryName}. Chúng tôi nêu đúng và đủ phạm vi công việc của mình.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-eco-gray-200 space-y-3 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-bamboo-100 text-bamboo-800 font-extrabold flex items-center justify-center">3</div>
              <h3 className="text-lg font-bold text-eco-gray-900">Tập trung vào vật liệu</h3>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                {BRAND.shortName} không nhận thi công trực tiếp. Chúng tôi cung cấp vật liệu và giới thiệu đội thi công quen việc theo từng khu vực để chủ đầu tư chủ động về nhân công và tiến độ.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 10: CÂU HỎI THƯỜNG GẶP (FAQ ACCORDION)
          ======================================================== */}
      <section className="py-20 bg-white border-b border-eco-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-eco-gray-900 tracking-tight">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-2 text-sm text-eco-gray-500">
              Giải đáp nhanh các thắc mắc về giá, chất lượng cốt tấm và tiến độ giao hàng.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-eco-gray-200 overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm text-eco-gray-900 hover:text-bamboo-800 flex justify-between items-center transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDownIcon className={`w-4 h-4 text-eco-gray-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-eco-gray-600 leading-relaxed border-t border-eco-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 11: CALLOUT BANNER GỌI TƯ VẤN BÁO GIÁ
          ======================================================== */}
      <section className="py-16 bg-gradient-to-r from-bamboo-950 via-bamboo-900 to-wood-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Cần tư vấn mã màu và báo giá cho công trình?
            </h2>
            <p className="text-sm text-eco-gray-300 max-w-xl">
              Gửi kích thước tường hoặc gọi hotline, chúng tôi báo số tấm, số nẹp và tổng chi phí trong ngày.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${BRAND.hotline.replace(".", "")}`}
              className="px-6 py-3.5 rounded-xl bg-wood-500 hover:bg-wood-600 text-white font-bold text-sm shadow-md transition-all flex items-center"
            >
              <PhoneCallIcon className="mr-2 w-4 h-4" />
              Hotline: {BRAND.hotlineDisplay}
            </a>

            <a
              href="/nhan-mau"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all"
            >
              Nhận xâu mẫu thử miễn phí
            </a>
          </div>
        </div>
      </section>

    </MainLayout>
  );
}
