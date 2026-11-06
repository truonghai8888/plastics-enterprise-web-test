import React, { useState, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND from '../config/brandConfig';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const HelpCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <path d="M12 17h.01"/>
  </svg>
);

const PhoneCallIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// MOCK FAQ DATA ACCORDION
export const FAQ_TOPICS = [
  { id: 'all', name: 'Tất cả câu hỏi' },
  { id: 'chat-luong', name: 'Chất lượng & Tiêu chuẩn E0' },
  { id: 'thi-cong', name: 'Kỹ thuật soi rãnh & Thi công' },
  { id: 'gia-van-chuyen', name: 'Báo giá & Vận chuyển' },
  { id: 'dai-ly', name: 'Chính sách Đại lý & Bảo hành' },
];

export const FAQ_ITEMS = [
  {
    id: 1,
    topic: 'chat-luong',
    question: `Tấm ốp than tre ${BRAND.shortName} có thực sự chống nước 100% và không ẩm mốc?`,
    answer: 'Hoàn toàn chính xác. Cốt tấm được tạo thành từ bột than tre hoạt tính nén ép ở mật độ cao (≥ 0.85 g/cm³) cùng keo nhiệt PUR Jowat nhập khẩu trực tiếp từ Đức. Cấu trúc đặc kín này hoàn toàn không hút ẩm, độ trương nở ngâm ngập nước sau 24 giờ ≤ 0.2%, triệt tiêu hoàn toàn nỗi lo nấm mốc và mùi hôi nồm ẩm tại miền Bắc.'
  },
  {
    id: 2,
    topic: 'chat-luong',
    question: 'Tiêu chuẩn phát thải Formaldehyde E0 là gì và có an toàn cho trẻ sơ sinh?',
    answer: 'Chuẩn E0 là cấp độ phát thải an toàn cao nhất theo tiêu chuẩn Châu Âu EN 717-1 (nồng độ phát tán ≤ 0.5 mg/L, gần như tiệm cận mức 0). Sản phẩm hoàn toàn không có mùi cay mắt, không chứa hợp chất hữu cơ bay hơi VOC độc hại, đặc biệt an toàn cho phòng ngủ của trẻ nhỏ, người cao tuổi và phụ nữ mang thai.'
  },
  {
    id: 3,
    topic: 'thi-cong',
    question: 'Kỹ thuật soi rãnh V 90 độ và uốn cong góc vòm R thực hiện như thế nào?',
    answer: 'Thợ thi công chỉ cần sử dụng máy phay cầm tay gắn mũi dao chữ V 90 độ để phay mặt sau của tấm than tre, cữ phay ăn sâu vừa chạm lớp film PETG bề mặt (~0.3mm) rồi bẻ gập nhẹ nhàng ôm sát góc tường. Đối với góc cong vòm tròn, ta soi các rãnh song song cách nhau 8-10mm để uốn cong theo bán kính R mong muốn mà không cần nẹp viền thô.'
  },
  {
    id: 4,
    topic: 'thi-cong',
    question: 'Tường bị ẩm mốc nặng hoặc nồm rỉ nước có ốp tấm than tre trực tiếp được không?',
    answer: `Nếu tường ẩm nhẹ hoặc tường mới xây đã trát phẳng, bạn có thể dán trực tiếp bằng keo chuyên dụng ${BRAND.shortName} kèm băng dính xốp định vị. Trường hợp tường xuống cấp hoặc thấm nước từ nhà vệ sinh, ${BRAND.shortName} khuyến cáo nên dựng hệ khung xương sắt hộp 20x20mm hoặc khung xương gỗ nhựa trước khi bắn tấm để đảm bảo độ bền vĩnh cửu.`
  },
  {
    id: 5,
    topic: 'gia-van-chuyen',
    question: 'Đơn giá tấm ốp than tre bao nhiêu tiền 1m² và nhà máy có cắt theo kích thước không?',
    answer: `Đơn giá vật tư dao động từ 290.000 – 690.000 đ/m² tùy theo độ dày (5mm, 8mm, 17mm) và bề mặt vân (vân gỗ, vân đá UV, tráng gương hoặc PETG siêu mờ). Nhà máy ${BRAND.shortName} có dây chuyền xẻ tấm tự động, nhận cắt theo kích thước chiều cao trần bản vẽ (2.8m, 3.0m, 3.2m) để gia chủ không phải chắp nối tấm.`
  },
  {
    id: 6,
    topic: 'gia-van-chuyen',
    question: 'Thời gian giao hàng bao lâu và có hỗ trợ vận chuyển đi tỉnh không?',
    answer: `Các đơn hàng giao ngay trong ngày từ ${BRAND.warehouse?.title || 'Tổng kho Nhà Máy'} (${BRAND.warehouse?.shortAddress || 'Ninh Bình'}). Đối với các tỉnh thành trên toàn quốc, hàng được bọc màng xốp PE bảo vệ 4 góc và gửi chành xe tải hoặc xe container trong vòng 24 - 48 giờ.`
  },
  {
    id: 7,
    topic: 'dai-ly',
    question: `Chính sách bảo hành sản phẩm của ${BRAND.brandName} như thế nào?`,
    answer: `${BRAND.brandName} cam kết bảo hành chính hãng ${BRAND.warrantyYears} năm về độ bền cốt vật liệu, không cong vênh, không bong tách lớp màng film trong điều kiện sử dụng nội thất bình thường. Khách hàng được đổi trả 1-1 ngay lập tức nếu phát hiện lỗi từ quy trình sản xuất của nhà máy.`
  },
  {
    id: 8,
    topic: 'dai-ly',
    question: 'Làm thế nào để nhận bộ xâu mẫu (Sample Box) và đăng ký làm đại lý phân phối?',
    answer: `Bạn chỉ cần điền thông tin tại trang Biểu Mẫu hoặc liên hệ trực tiếp hotline ${BRAND.hotlineDisplay}. Nhà máy sẽ gửi miễn phí tận nơi bộ Sample Box 160 mã màu kèm bảng báo giá chiết khấu dành riêng cho đại lý (lên tới 25%) và bảo hộ độc quyền khu vực.`
  }
];

// ==========================================
// FAQ ACCORDION PAGE COMPONENT
// ==========================================
export default function FAQPage() {
  const [activeTopic, setActiveTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Accordion active open indices
  const [openIds, setOpenIds] = useState([1, 2]);

  const toggleAccordion = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(item => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchTopic = activeTopic === 'all' || item.topic === activeTopic;
      const matchSearch = searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [activeTopic, searchQuery]);

  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-14 border-b border-bamboo-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600/30">
            Hỏi & Đáp Chuyên Sâu
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Giải Đáp Thắc Mắc Về Tấm Ốp Than Tre
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
            Tổng hợp câu trả lời chi tiết từ đội ngũ kỹ sư và chuyên gia vật liệu {BRAND.brandName} về độ bền, tiêu chuẩn an toàn E0, kỹ thuật uốn cong và chính sách chiết khấu.
          </p>
        </div>
      </div>

      {/* 2. SEARCH & TOPIC TABS */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-card border border-eco-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi (VD: chống nước, uốn cong 90 độ, chuẩn E0...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-eco-gray-50 border border-eco-gray-200 focus:outline-none focus:border-bamboo-600 focus:bg-white"
            />
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-eco-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-eco-gray-400 hover:text-eco-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pt-6 pb-2 text-xs font-bold scrollbar-none">
          {FAQ_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTopic === topic.id
                  ? 'bg-bamboo-700 text-white shadow-sm'
                  : 'bg-white text-eco-gray-700 border border-eco-gray-200 hover:bg-eco-gray-50'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. ACCORDION LIST */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-eco-gray-200 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between text-sm sm:text-base font-extrabold text-eco-gray-900 hover:text-bamboo-800 transition-colors"
                >
                  <span className="flex items-center pr-4 leading-snug">
                    <HelpCircleIcon className="w-4 h-4 text-bamboo-600 mr-3 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-eco-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-bamboo-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-eco-gray-600 leading-relaxed border-t border-eco-gray-100 bg-eco-gray-50/50 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-eco-gray-200 p-8 text-center text-xs text-eco-gray-500 space-y-2">
            <p>Không tìm thấy câu hỏi phù hợp với từ khóa của bạn.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTopic('all'); }}
              className="px-4 py-2 rounded-xl bg-bamboo-700 text-white font-bold"
            >
              Xem tất cả câu hỏi
            </button>
          </div>
        )}

        {/* 4. CALL TO ACTION: BẠN VẪN CÒN CÂU HỎI? */}
        <div className="mt-12 rounded-3xl bg-gradient-bamboo text-white p-8 sm:p-10 text-center space-y-4 shadow-hover">
          <h3 className="text-xl sm:text-2xl font-black">
            Bạn Vẫn Còn Câu Hỏi Chưa Được Giải Đáp?
          </h3>
          <p className="text-xs sm:text-sm text-bamboo-100 max-w-xl mx-auto font-light leading-relaxed">
            Đừng ngần ngại liên hệ trực tiếp với chuyên gia kỹ thuật {BRAND.shortName} để được tư vấn bóc tách khối lượng và khảo sát công trình miễn phí.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${BRAND.hotline.replace(/\./g, '')}`}
              className="px-6 py-3 rounded-xl bg-white text-bamboo-900 font-extrabold text-xs uppercase tracking-wider shadow hover:scale-105 transition-all flex items-center"
            >
              <PhoneCallIcon className="w-4 h-4 mr-2 text-wood-600" />
              Gọi Hotline: {BRAND.hotlineDisplay}
            </a>
            <a
              href="/lien-he"
              className="px-6 py-3 rounded-xl bg-bamboo-800/80 hover:bg-bamboo-800 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Gửi Câu Hỏi Qua Biểu Mẫu &rarr;
            </a>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
