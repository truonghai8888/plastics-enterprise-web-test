import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND, { getCurrentYear, getCurrentDateFormatted, getTechDocTitle } from '../config/brandConfig';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const UserIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const Share2Icon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
  </svg>
);

const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const PhoneCallIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

import { ARTICLES } from '../data/news';

// DYNAMIC RELATED ARTICLES THEO THƯƠNG HIỆU
const RELATED_POSTS = (ARTICLES || []).slice(0, 4).map((art, idx) => ({
  id: art.id || idx + 1,
  title: art.title,
  date: art.date,
  link: `/tin-tuc#${art.id}`
}));

// ==========================================
// CMS / BLOG / POLICY ARTICLE LAYOUT
// ==========================================
export default function ArticleLayout({
  title = `So Sánh Tấm Ốp Than Tre Đa Năng Và Nhựa PVC Nano: Phân Tích Toàn Diện ${getCurrentYear()}`,
  category = "Cẩm Nang Vật Liệu",
  author = `Ban Kỹ Thuật ${BRAND.brandName}`,
  publishDate = getCurrentDateFormatted(),
  readTime = "6 phút đọc",
  breadcrumb = [
    { name: "Trang chủ", link: "/" },
    { name: "Tin tức & Kiến thức", link: "/tin-tuc" },
    { name: "Cẩm nang vật liệu", link: "/tin-tuc/cam-nang" }
  ],
  children
}) {
  return (
    <MainLayout>
      {/* 1. BREADCRUMB */}
      <div className="bg-white border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-eco-gray-500 flex-wrap">
            {breadcrumb.map((bc, idx) => (
              <React.Fragment key={idx}>
                <a href={bc.link} className="hover:text-bamboo-700 transition-colors">
                  {bc.name}
                </a>
                <ChevronRightIcon className="w-3 h-3 text-eco-gray-400" />
              </React.Fragment>
            ))}
            <span className="text-bamboo-900 font-bold truncate max-w-xs sm:max-w-md">
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMNS CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* CỘT TRÁI: NỘI DUNG VĂN BẢN CHUẨN TYPOGRAPHY (8 Cột) */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-eco-gray-200 p-6 sm:p-10 shadow-sm space-y-6">

            {/* Article Meta Header */}
            <div className="space-y-3 pb-6 border-b border-eco-gray-200">
              <span className="px-3 py-1 rounded-full bg-bamboo-100 text-bamboo-800 text-xs font-bold uppercase tracking-wider">
                {category}
              </span>

              <h1 className="text-2xl sm:text-4xl font-black text-eco-gray-900 tracking-tight leading-tight">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-eco-gray-500 pt-1">
                <span className="flex items-center">
                  <UserIcon className="w-3.5 h-3.5 mr-1.5 text-bamboo-700" />
                  {author}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-eco-gray-400" />
                  {publishDate}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <ClockIcon className="w-3.5 h-3.5 mr-1.5 text-eco-gray-400" />
                  {readTime}
                </span>
              </div>
            </div>

            {/* Typography Content Container */}
            <div className="prose prose-eco max-w-none text-eco-gray-700 text-sm sm:text-base leading-relaxed space-y-5">
              {children || (
                <>
                  <p className="text-base sm:text-lg font-medium text-eco-gray-800 leading-relaxed border-l-4 border-bamboo-600 pl-4 py-1 italic bg-bamboo-50/50 rounded-r-xl">
                    "Trong bối cảnh người tiêu dùng ngày càng chú trọng đến sức khỏe và không gian sống sinh thái, tấm ốp sợi than tre đa năng đang trở thành giải pháp vật liệu thay thế hàng đầu cho các dòng nhựa PVC truyền thống."
                  </p>

                  <h2 className="text-xl sm:text-2xl font-black text-eco-gray-900 pt-3">
                    1. Cốt Vật Liệu: Bột Than Tre Hoạt Tính vs Hạt Nhựa PVC Tái Sinh
                  </h2>
                  <p>
                    Điểm khác biệt cốt lõi nằm ở thành phần cấu tạo bên trong tấm. Tấm ốp {BRAND.shortName} sử dụng cốt sợi than tre thiên nhiên nén ép dưới áp suất thủy lực cực lớn cùng keo nhiệt PUR Jowat nhập khẩu từ CHLB Đức. Cốt than tre có mật độ cao (≥ 0.85 g/cm³), màu đen đặc trưng và hoàn toàn không chứa clo hay chất làm dẻo độc hại.
                  </p>

                  <p>
                    Ngược lại, tấm PVC Nano thông thường có kết cấu rỗng ruột dạng tổ ong, cấu tạo từ nhựa tổng hợp và bột đá. Khi chịu va đập mạnh hoặc tác động nhiệt độ cao mùa hè, tấm rỗng dễ bị giòn vỡ và phát tán mùi nhựa nồng.
                  </p>

                  {/* Ảnh minh họa có caption */}
                  <div className="my-6 space-y-2">
                    <div className="rounded-2xl overflow-hidden border border-eco-gray-200 aspect-[16/9] shadow-md">
                      <img
                        src="/images/ecobamboo/day-chuyen-phu-film-pur-nha-may-eco-bamboo.webp"
                        alt={`Dây chuyền phủ film PUR tự động tại nhà máy ${BRAND.shortName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-eco-gray-500 text-center italic">
                      Hình 1: Dây chuyền phủ film keo nhiệt PUR tự động tại nhà máy {BRAND.shortName} - bảo đảm độ bám dính vĩnh cửu.
                    </p>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-eco-gray-900 pt-3">
                    2. Tiêu Chuẩn Phát Thải Formaldehyde E0 & An Toàn Hô Hấp
                  </h2>
                  <p>
                    Nhiều gia chủ sau khi hoàn thiện nhà mới thường gặp phải triệu chứng cay mắt, cay mũi do nồng độ Formaldehyde từ keo dán công nghiệp bay hơi. {BRAND.shortName} cam kết đạt tiêu chuẩn E0 Châu Âu (≤ 0.5 mg/L), có thể đưa vào sử dụng ngay sau khi thi công mà không cần mở cửa khử mùi nhiều tuần.
                  </p>

                  <blockquote className="border-l-4 border-wood-500 bg-wood-50/60 p-4 rounded-r-2xl my-4 text-xs sm:text-sm text-wood-950 space-y-1">
                    <strong className="block text-wood-900 font-bold">Khuyến cáo chuyên gia:</strong>
                    <span>Đối với phòng ngủ trẻ sơ sinh, người cao tuổi hoặc người có tiền sử viêm mũi dị ứng, nên ưu tiên vật liệu ốp tường đạt chứng nhận phát thải an toàn E0 hoặc E1.</span>
                  </blockquote>

                  <h2 className="text-xl sm:text-2xl font-black text-eco-gray-900 pt-3">
                    3. Kỹ Thuật Gia Công: Uốn Cong 90° Linh Hoạt
                  </h2>
                  <p>
                    Một trong những ưu thế vượt bậc của tấm than tre là khả năng <strong>soi rãnh V gập vuông góc 90°</strong> và <strong>uốn cong góc vòm R</strong>. Người thợ chỉ cần soi nhẹ mặt sau là có thể bẻ gập tấm ốp ôm sát các góc cột, vách bo tròn mà hoàn toàn không để lộ khe hở hay cần dùng nẹp kim loại bo ngoài thô kệch.
                  </p>

                  <div className="overflow-x-auto my-6">
                    <table className="w-full text-xs text-left border border-eco-gray-200 rounded-xl overflow-hidden">
                      <thead className="bg-bamboo-900 text-white font-bold">
                        <tr>
                          <th className="p-3">Tiêu Chí Đánh Giá</th>
                          <th className="p-3">Tấm Ốp Than Tre {BRAND.shortName}</th>
                          <th className="p-3">Tấm Nhựa PVC Nano Rỗng</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-eco-gray-200">
                        <tr className="bg-white">
                          <td className="p-3 font-bold text-eco-gray-900">Tiêu chuẩn an toàn</td>
                          <td className="p-3 text-bamboo-800 font-semibold">Chuẩn E0 Châu Âu (Không mùi)</td>
                          <td className="p-3 text-eco-gray-600">Thường chỉ đạt E2 hoặc không kiểm định</td>
                        </tr>
                        <tr className="bg-eco-gray-50/70">
                          <td className="p-3 font-bold text-eco-gray-900">Uốn cong góc vuông 90°</td>
                          <td className="p-3 text-bamboo-800 font-semibold">Soi rãnh V bẻ gập sắc nét</td>
                          <td className="p-3 text-eco-gray-600">Không thể soi rãnh (Bắt buộc dùng nẹp V)</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 font-bold text-eco-gray-900">Độ bền kết cấu</td>
                          <td className="p-3 text-bamboo-800 font-semibold">Trên 20 năm (Cốt đặc chịu lực)</td>
                          <td className="p-3 text-eco-gray-600">Dễ thủng lồi lõm khi va đập bàn ghế</td>
                        </tr>
                        <tr className="bg-eco-gray-50/70">
                          <td className="p-3 font-bold text-eco-gray-900">Chống cháy lan</td>
                          <td className="p-3 text-bamboo-800 font-semibold">Kháng cháy lan B1 quốc tế</td>
                          <td className="p-3 text-eco-gray-600">Dễ biến dạng và sinh khói đen khi cháy</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-eco-gray-900 pt-3">
                    4. Kết Luận & Lời Khuyên
                  </h2>
                  <p>
                    Mặc dù tấm ốp than tre có mức đơn giá vật tư ban đầu nhỉnh hơn so với nhựa PVC rỗng ruột khoảng 15-20%, nhưng xét về độ bền trên 20 năm, tính thẩm mỹ liền mạch không mối nối và đặc biệt là an toàn sức khỏe gia đình, đây hoàn toàn là khoản đầu tư xứng đáng cho mọi công trình hiện đại.
                  </p>
                </>
              )}
            </div>

            {/* Share & Feedback Bar */}
            <div className="pt-6 border-t border-eco-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-eco-gray-700">Chia sẻ bài viết:</span>
                <button
                  onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Đã sao chép liên kết!'); }}
                  className="p-2 rounded-lg bg-eco-gray-100 hover:bg-bamboo-100 text-bamboo-800 transition-colors"
                  title="Sao chép liên kết"
                >
                  <Share2Icon className="w-4 h-4" />
                </button>
              </div>

              <div className="text-eco-gray-500">
                Chuyên mục: <strong className="text-bamboo-800">{category}</strong>
              </div>
            </div>

          </article>

          {/* CỘT PHẢI: SIDEBAR BÀI VIẾT LIÊN QUAN & BANNER LIÊN HỆ (4 Cột) */}
          <aside className="lg:col-span-4 space-y-6 sticky top-28">

            {/* Quick Contact Banner */}
            <div className="rounded-3xl bg-gradient-bamboo text-white p-6 shadow-md space-y-4">
              <span className="text-[10px] uppercase font-bold text-wood-300 tracking-wider block">
                Hỗ Trợ Dự Án & Bóc Tách Bản Vẽ
              </span>
              <h3 className="text-lg font-black leading-snug">
                Cần Tư Vấn Mẫu Thử & Báo Giá Đại Lý?
              </h3>
              <p className="text-xs text-bamboo-100 leading-relaxed font-light">
                {BRAND.shortName} cung cấp xâu mẫu thực tế (Sample Box 160 mã màu) miễn phí tận nơi cho kiến trúc sư và nhà thầu.
              </p>
              <a
                href={`tel:${BRAND.hotline.replace(/\./g, '')}`}
                className="w-full py-3 rounded-xl bg-white text-bamboo-900 font-extrabold text-xs uppercase tracking-wider text-center shadow hover:scale-[1.02] transition-all flex items-center justify-center"
              >
                <PhoneCallIcon className="w-4 h-4 mr-2 text-wood-600 animate-pulse" />
                Hotline: {BRAND.hotlineDisplay}
              </a>
            </div>

            {/* Related Articles List */}
            <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-eco-gray-900 border-l-2 border-bamboo-600 pl-3 uppercase tracking-wider">
                Bài Viết Cùng Chủ Đề
              </h3>

              <div className="space-y-3.5">
                {RELATED_POSTS.map((post) => (
                  <a
                    key={post.id}
                    href={post.link}
                    className="block group space-y-1 pb-3 border-b border-eco-gray-100 last:border-b-0 last:pb-0"
                  >
                    <h4 className="text-xs font-bold text-eco-gray-800 group-hover:text-bamboo-700 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>
                    <span className="text-[10px] text-eco-gray-400 block">
                      {post.date}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Download Catalog Shortcut */}
            <div className="bg-eco-gray-50 rounded-2xl border border-eco-gray-200 p-4 text-xs space-y-2">
              <div className="font-bold text-eco-gray-900">{getTechDocTitle()}</div>
              <p className="text-[11px] text-eco-gray-600">
                Tải về trọn bộ bảng kiểm định Formaldehyde E0 và chứng nhận chống cháy lan B1.
              </p>
              <a
                href="/chung-chi-chung-nhan"
                className="inline-block text-[11px] font-bold text-bamboo-800 hover:underline pt-1"
              >
                Xem chi tiết chứng nhận &rarr;
              </a>
            </div>

          </aside>

        </div>
      </div>
    </MainLayout>
  );
}
