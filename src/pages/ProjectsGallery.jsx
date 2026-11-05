import React, { useState, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout';

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
    completionYear: "2025",
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
    completionYear: "2025",
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
    completionYear: "2024",
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
    completionYear: "2024",
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
    completionYear: "2025",
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
    completionYear: "2025",
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
    completionYear: "2024",
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
    completionYear: "2024",
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
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600/30">
            Hồ Sơ Năng Lực Thi Công
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Công Trình Thực Tế Eco Bamboo
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
            Tuyển tập các công trình biệt thự, căn hộ chung cư cao cấp và khách sạn 5 sao đã nghiệm thu hoàn thiện sử dụng tấm ốp than tre và hệ lam sóng Eco Bamboo.
          </p>
        </div>
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-eco-gray-200 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center space-x-2 overflow-x-auto scrollbar-none text-xs font-bold">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-bamboo-700 text-white shadow-sm'
                  : 'bg-eco-gray-100 hover:bg-eco-gray-200 text-eco-gray-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MASONRY / GRID OF REAL PROJECTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedModalProject(proj)}
              className="group cursor-pointer rounded-3xl bg-white border border-eco-gray-200 overflow-hidden shadow-soft hover:shadow-card hover:border-bamboo-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image with Real Photo */}
                <div className="h-56 w-full bg-eco-gray-100 relative overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-md">
                      {proj.area}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-bamboo-700 text-white text-[10px] font-bold shadow">
                      {proj.categoryName}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white/95 text-bamboo-900 font-extrabold text-xs shadow-lg flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1.5 text-bamboo-700" />
                      Xem Chi Tiết Công Trình
                    </span>
                  </div>

                  {/* Bottom location */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white flex items-center text-xs drop-shadow bg-black/40 backdrop-blur-sm p-1.5 rounded-lg">
                    <MapPinIcon className="w-3.5 h-3.5 mr-1 text-wood-300 shrink-0" />
                    <span className="line-clamp-1">{proj.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-extrabold text-eco-gray-900 group-hover:text-bamboo-800 transition-colors line-clamp-2 leading-snug">
                    {proj.title}
                  </h3>

                  <div className="text-xs text-eco-gray-600 space-y-1">
                    <div className="line-clamp-2">
                      <strong className="text-bamboo-900">Vật tư: </strong>
                      {proj.materials}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-eco-gray-100 text-eco-gray-700 text-[10px] font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-5 pb-5 pt-1 border-t border-eco-gray-100 flex items-center justify-between text-xs font-bold text-bamboo-700 group-hover:text-bamboo-900">
                <span>Nghiệm thu: {proj.completionYear}</span>
                <span>Xem chi tiết &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MODAL CHI TIẾT CÔNG TRÌNH THỰC TẾ */}
      {selectedModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-eco-gray-200 space-y-5 max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelectedModalProject(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-eco-gray-400 hover:text-eco-gray-700 hover:bg-eco-gray-100 transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase text-bamboo-700 tracking-wider">
                {selectedModalProject.categoryName} • Hoàn thiện {selectedModalProject.completionYear}
              </span>
              <h3 className="text-xl font-black text-eco-gray-900 mt-0.5">
                {selectedModalProject.title}
              </h3>
              <div className="flex items-center text-xs text-eco-gray-500 mt-1">
                <MapPinIcon className="w-3.5 h-3.5 mr-1 text-wood-600" />
                <span>{selectedModalProject.location}</span>
              </div>
            </div>

            {/* Real Project Photo in Modal */}
            <div className="h-72 w-full rounded-2xl overflow-hidden relative shadow-inner bg-eco-gray-100">
              <img
                src={selectedModalProject.image}
                alt={selectedModalProject.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/60 text-white text-xs font-bold backdrop-blur-md">
                {selectedModalProject.area}
              </span>
              <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md p-3 rounded-xl text-xs space-y-1 text-white">
                <div className="font-bold text-emerald-300">Vật tư thi công chính thức:</div>
                <div className="text-gray-200 text-[11px]">{selectedModalProject.materials}</div>
              </div>
            </div>

            <p className="text-xs text-eco-gray-600 leading-relaxed">
              {selectedModalProject.desc}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0915189389"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-extrabold text-xs uppercase tracking-wider text-center shadow-md transition-all"
              >
                Tư Vấn & Báo Giá Công Trình Tương Tự
              </a>
              <button
                onClick={() => setSelectedModalProject(null)}
                className="px-6 py-3 rounded-xl bg-eco-gray-100 hover:bg-eco-gray-200 text-eco-gray-800 text-xs font-bold transition-colors"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </MainLayout>
  );
}
