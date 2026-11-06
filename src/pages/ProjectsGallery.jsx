import React, { useState, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND, { getCurrentYear } from '../config/brandConfig';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const MapPinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const EyeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const LayersIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

// DỮ LIỆU CÔNG TRÌNH THỰC TẾ KÈM ẢNH GỐC ECO BAMBOO
export const REAL_PROJECTS = [
  {
    id: 1,
    title: "Vách TV & Phòng Khách Biệt Thự Splendora An Khánh",
    category: 'biet-thu',
    categoryName: 'Biệt Thự Cao Cấp',
    location: "Khu đô thị Splendora, Hoài Đức, Hà Nội",
    area: "85 m² diện tích ốp",
    completionYear: `${getCurrentYear()}`,
    materials: "Tấm ốp than tre Vân Đá Calacatta (EB88012) + Lam 4 sóng Than Tre (EB66450) + Nẹp T mạ vàng",
    image: "/images/ecobamboo/EB68001-2-scaled-w800.webp",
    desc: "Gia chủ yêu cầu giải pháp vật liệu xanh an toàn đạt chuẩn E0, chống chịu được nồm ẩm mùa xuân tại biệt thự ven hồ. Đội thợ đã ứng dụng kỹ thuật soi rãnh V gập vuông góc không cần nẹp viền ngoài.",
    tags: ["Vách TV phòng khách", "Soi rãnh V 90°", "Lam sóng 4 sóng"]
  },
  {
    id: 2,
    title: "Căn Hộ Penthouse Tòa The Matrix One Mễ Trì",
    category: 'can-ho',
    categoryName: 'Căn Hộ Chung Cư',
    location: "Lê Quang Đạo, Nam Từ Liêm, Hà Nội",
    area: "140 m² nội thất",
    completionYear: `${getCurrentYear()}`,
    materials: "Tấm than tre Vân Vải Linen (EB79055) + Nẹp nhôm âm LED 3000K + Tấm 17mm làm cánh tủ",
    image: "/images/ecobamboo/EB79021-w800.webp",
    desc: "Toàn bộ vách đầu giường ngủ Master và hệ tủ áo cánh kính được đóng từ tấm than tre nội thất 17mm, uốn lượn góc bo tròn R20cm mềm mại, không mùi sơn độc hại.",
    tags: ["Uốn vòm cong R", "Vách đầu giường", "Đèn LED âm"]
  },
  {
    id: 3,
    title: "Sảnh Đón & Quầy Lễ Tân Khách Sạn Flamingo Luxury",
    category: 'khach-san',
    categoryName: 'Khách Sạn & Resort',
    location: "Khu nghỉ dưỡng Flamingo Đại Lải, Vĩnh Phúc",
    area: "210 m² hoàn thiện",
    completionYear: `${getCurrentYear() - 1}`,
    materials: "Vân Kim Loại Rose Gold (EB69001G) + Vân Đá Đen Nero Marquina (EB89099G)",
    image: "/images/ecobamboo/2EB68017-scaled-w800.webp",
    desc: "Sự kết hợp giữa tấm tráng gương phản chiếu và vân đá đen tia chớp tạo không gian đại sảnh đẳng cấp 5 sao, thi công nhanh gấp đôi tiến độ cam kết.",
    tags: ["Tráng gương", "Kim loại ánh kim", "Đại sảnh"]
  },
  {
    id: 4,
    title: "Chuỗi Showroom Thời Trang Elise Flagship",
    category: 'thuong-mai',
    categoryName: 'Nhà Hàng & Showroom',
    location: "Tràng Tiền, Q. Hoàn Kiếm, Hà Nội",
    area: "95 m² vách trang trí",
    completionYear: `${getCurrentYear() - 1}`,
    materials: "Tấm than tre Đơn Sắc Trắng Sứ + Tấm tráng gương Titanium (EB69008M)",
    image: "/images/ecobamboo/EB66001-2-scaled-w800.webp",
    desc: "Thi công hoàn tất xuyên đêm trong 48 giờ để kịp ngày khai trương. Tấm than tre nhẹ giúp thợ bốc xếp và vận chuyển dễ dàng qua thang máy trung tâm thương mại.",
    tags: ["Showroom thời trang", "Thi công 48h", "Chống cháy B1"]
  },
  {
    id: 5,
    title: "Nhà Phố Liền Kề Gamuda Gardens Yên Sở",
    category: 'can-ho',
    categoryName: 'Căn Hộ Chung Cư',
    location: "Gamuda Gardens, Q. Hoàng Mai, Hà Nội",
    area: "65 m² vách cầu thang",
    completionYear: `${getCurrentYear()}`,
    materials: "Tấm than tre Vân Gỗ Sồi (EB66006) + Nẹp chỉ T vàng mờ",
    image: "/images/ecobamboo/EB66005-w800.webp",
    desc: "Ốp vách thông tầng cầu thang chống ẩm mốc triệt để thay cho giấy dán tường bị bong rộp trước đây.",
    tags: ["Nhà phố", "Cầu thang", "Vân gỗ sồi"]
  },
  {
    id: 6,
    title: "Biệt Thự Đơn Lập Vinhomes Riverside Long Biên",
    category: 'biet-thu',
    categoryName: 'Biệt Thự Cao Cấp',
    location: "KĐT Vinhomes Riverside, Long Biên, Hà Nội",
    area: "180 m² nội thất phòng sinh hoạt chung",
    completionYear: `${getCurrentYear()}`,
    materials: "Tấm than tre Vân Vải Beige Cream (EB79019) + Nẹp LED hắt sáng",
    image: "/images/ecobamboo/EB79019-scaled-w800.webp",
    desc: "Ứng dụng vật liệu sinh thái xanh an toàn cho gia đình có 3 thế hệ cùng sinh sống, tạo cảm giác thư thái, mộc mạc phong cách Wabi-sabi.",
    tags: ["Biệt thự sinh thái", "Wabi-sabi", "Chuẩn E0"]
  },
  {
    id: 7,
    title: "Phòng Họp & Hội Trường Tập Đoàn Viễn Thông",
    category: 'thuong-mai',
    categoryName: 'Nhà Hàng & Showroom',
    location: "Khu Công Nghệ Cao Duy Tân, Cầu Giấy, Hà Nội",
    area: "120 m² tiêu âm & vách trang trí",
    completionYear: `${getCurrentYear() - 1}`,
    materials: "Tấm ốp cốt than tre 8mm chống va đập + Lam sóng vuông EBL88005",
    image: "/images/ecobamboo/ct-002-w800.webp",
    desc: "Cốt than tre mật độ nén 0.90 g/cm³ đem lại khả năng tiêu âm xuất sắc và chịu va đập mạnh cho không gian làm việc đông người.",
    tags: ["Văn phòng", "Cách âm", "Chống va đập"]
  },
  {
    id: 8,
    title: "Nhà Hàng Ẩm Thực Nhật Bản Hatoyama",
    category: 'thuong-mai',
    categoryName: 'Nhà Hàng & Showroom',
    location: "Nguyễn Chánh, Cầu Giấy, Hà Nội",
    area: "155 m² vách ngăn phòng VIP",
    completionYear: `${getCurrentYear() - 1}`,
    materials: "Vân gỗ Walnut EB66450 kết hợp vách nan lam sóng",
    image: "/images/ecobamboo/ct-005-w800.webp",
    desc: "Không gian ẩm thực Nhật Bản tinh tế, chống bám dính khói mùi thức ăn và dễ dàng lau chùi vệ sinh hằng ngày.",
    tags: ["Nhà hàng Nhật", "Chống bám mùi", "Dễ lau chùi"]
  }
];

export const PROJECT_CATEGORIES = [
  { id: 'all', name: 'Tất cả dự án' },
  { id: 'biet-thu', name: 'Biệt Thự Cao Cấp' },
  { id: 'can-ho', name: 'Căn Hộ Chung Cư' },
  { id: 'khach-san', name: 'Khách Sạn & Resort' },
  { id: 'thuong-mai', name: 'Nhà Hàng & Showroom' },
];

// ==========================================
// PROJECTS GALLERY PAGE COMPONENT
// ==========================================
export default function ProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return REAL_PROJECTS;
    return REAL_PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-14 border-b border-bamboo-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/30">
            Hồ Sơ Năng Lực Thi Công
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Công Trình Thực Tế {BRAND.brandName}
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
            Tuyển tập các công trình biệt thự, căn hộ chung cư cao cấp và khách sạn 5 sao đã nghiệm thu hoàn thiện sử dụng tấm ốp than tre và hệ lam sóng {BRAND.shortName}.
          </p>
        </div>
      </div>

      {/* 2. NỘI DUNG TAB CÔNG TRÌNH (ĐÃ ẨN TẤT CẢ CÁC BÀI VIẾT THEO YÊU CẦU TODO ITEM 2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl border border-eco-gray-200 p-8 sm:p-12 shadow-soft space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shadow-sm">
            <LayersIcon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-eco-gray-900">
              Dữ Liệu Công Trình Đang Được Cập Nhật
            </h2>
            <p className="text-sm text-eco-gray-600 leading-relaxed font-normal">
              Toàn bộ bài viết, video và hình ảnh nghiệm thu công trình thực tế của {BRAND.brandName} đang được chuyển giao và cập nhật dữ liệu. Quý đối tác, chủ đầu tư và đại lý cần xem ảnh chụp thực tế hoặc hồ sơ mẫu vật tư thi công xin vui lòng liên hệ trực tiếp nhà máy.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-eco-gray-50 border border-eco-gray-200/80 text-xs text-eco-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="font-semibold">Hotline hỗ trợ hồ sơ dự án 24/7:</span>
            </div>
            <a
              href={`tel:${BRAND.hotline.replace(/\./g, '')}`}
              className="font-extrabold text-bamboo-800 text-sm hover:underline"
            >
              {BRAND.hotlineDisplay}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="/nhan-mau"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all text-center"
            >
              Đăng Ký Nhận Hộp Mẫu Thử
            </a>
            <a
              href="/tai-catalogue"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-eco-gray-100 hover:bg-eco-gray-200 text-eco-gray-800 font-bold text-xs uppercase tracking-wider transition-colors text-center border border-eco-gray-200"
            >
              Tải Catalogue Hoàn Chỉnh
            </a>
          </div>
        </div>
      </div>

    </MainLayout>
  );
}
