import BRAND, { getCurrentYear, getCatalogTitle } from '../../config/brandConfig';
import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// ICON COMPONENTS (Lucide Style SVG)
// ==========================================
const PhoneIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const MapPinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const CalculatorIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2"/>
    <line x1="8" x2="16" y1="6" y2="6"/>
    <line x1="16" x2="16" y1="14" y2="18"/>
    <path d="M16 10h.01"/>
    <path d="M12 10h.01"/>
    <path d="M8 10h.01"/>
    <path d="M12 14h.01"/>
    <path d="M8 14h.01"/>
    <path d="M12 18h.01"/>
    <path d="M8 18h.01"/>
  </svg>
);

const ShieldCheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const SparklesIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  </svg>
);

const DownloadIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

// ==========================================
// HEADER COMPONENT
// ==========================================
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState({});
  const dropdownTimeoutRef = useRef(null);

  const handleDropdownEnter = (menuKey) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(menuKey);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileSubmenu = (key) => {
    setMobileSubmenu(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all duration-300 font-sans">
      {/* 1. TOPBAR TIỆN ÍCH / LIÊN HỆ (ĐÃ ẨN TOÀN BỘ THEO YÊU CẦU) */}
      {/*
      <div className="hidden lg:block bg-bamboo-950 text-white text-xs py-1.5 border-b border-bamboo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center text-eco-gray-300 text-xs">
            <MapPinIcon className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            <span><strong>Nhà máy {BRAND.shortName}:</strong> {BRAND.factory?.shortAddress || BRAND.factoryAddress}</span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href={BRAND.socialLinks.email}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <MailIcon className="w-3.5 h-3.5 mr-1.5 text-bamboo-400" />
              {BRAND.email}
            </a>
            <span className="text-bamboo-700">|</span>
            <a
              href={`tel:${BRAND.hotline.replace(/\./g, '')}`}
              className="flex items-center font-bold text-wood-300 hover:text-wood-200 transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5 mr-1.5 text-wood-400 animate-pulse" />
              {`Hotline: ${BRAND.hotlineDisplay}`}
            </a>
            <span className="text-bamboo-700">|</span>
            <a
              href="/tai-catalogue"
              className="flex items-center text-bamboo-300 hover:text-white font-medium transition-colors"
            >
              <DownloadIcon className="w-3.5 h-3.5 mr-1" />
              {getCatalogTitle()}
            </a>
            <span className="text-bamboo-700">|</span>
            <a
              href="/nhan-mau"
              className="flex items-center text-amber-300 hover:text-white font-medium transition-colors"
            >
              <SparklesIcon className="w-3.5 h-3.5 mr-1" />
              Nhận Hộp Mẫu Thử
            </a>
          </div>
        </div>
      </div>
      */}

      {/* 2. THANH NAVBAR CHÍNH (YÊU CẦU 4: Thu hẹp độ cao Desktop Navigation) */}
      <nav className={`transition-all duration-300 ${isScrolled ? 'shadow-dropdown bg-white/95 backdrop-blur-md py-1.5' : 'py-2 border-b border-eco-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* LOGO DOANH NGHIỆP TRUNG TÂM (Đã chỉnh kích thước to rõ hơn) */}
            <a href="/" className="flex items-center gap-2.5 group focus:outline-none">
              <img
                src={BRAND.logo.url}
                alt={BRAND.logo.alt}
                className="h-11 md:h-13 lg:h-14 w-auto object-contain rounded-lg transition-transform group-hover:scale-105"
                onError={(e) => {
                  if (!e.currentTarget.dataset.retried) {
                    e.currentTarget.dataset.retried = '1';
                    e.currentTarget.src = './images/nhuaamc/logo-amc-1024x878.jpg';
                    return;
                  }
                  if (e.currentTarget.dataset.retried === '1') {
                    e.currentTarget.dataset.retried = '2';
                    e.currentTarget.src = './favicon.png';
                    return;
                  }
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }
                }}
              />
              <div className="hidden items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-bamboo flex items-center justify-center text-white font-black text-xs shadow">
                  {BRAND.logo.badgeText}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-extrabold tracking-tight text-eco-gray-900">
                    {BRAND.brandName}
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-wood-700 -mt-1">
                    {BRAND.subSlogan}
                  </span>
                </div>
              </div>
            </a>

            {/* DESKTOP NAVIGATION LINKS (YÊU CẦU 4: Tinh gọn khoảng cách và chiều cao) */}
            <div className="hidden xl:flex items-center space-x-0.5 2xl:space-x-1">

              {/* Trang chủ */}
              <a
                href="/"
                className="px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold text-bamboo-900 hover:text-bamboo-600 rounded-lg hover:bg-bamboo-50/70 transition-colors whitespace-nowrap"
              >
                Trang chủ
              </a>

              {/* Giới thiệu (Theo yêu cầu TODO item 4) */}
              <a
                href="/gioi-thieu"
                className="px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold text-eco-gray-800 hover:text-bamboo-600 rounded-lg hover:bg-bamboo-50/70 transition-colors whitespace-nowrap"
              >
                Giới thiệu
              </a>

              {/* SẢN PHẨM CHÍNH - MEGA MENU */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('products')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className={`flex items-center px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap rounded-lg !bg-transparent !border-0 !border-transparent !outline-none !shadow-none transition-colors ${
                    activeDropdown === 'products' ? '!text-bamboo-600 !bg-bamboo-50' : '!text-eco-gray-800 hover:!text-bamboo-600 hover:!bg-bamboo-50/70'
                  }`}
                  style={{
                    backgroundColor: activeDropdown === 'products' ? '#f0fdf4' : 'transparent',
                    border: 'none',
                    boxShadow: 'none'
                  }}
                >
                  Sản phẩm chính
                  <ChevronDownIcon className={`ml-1 w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180 text-bamboo-600' : ''}`} />
                </button>

                {/* MEGA MENU CONTAINER - Đã sửa định vị left-0 chống tràn lề trái màn hình */}
                {activeDropdown === 'products' && (
                  <div className="absolute top-full left-0 mt-1 w-[860px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-dropdown border border-eco-gray-200 p-6 grid grid-cols-12 gap-6 animate-fade-in z-50">

                    {/* Cột 1: Tấm ốp than tre & Tấm 17mm */}
                    <div className="col-span-4 space-y-3">
                      <div className="text-xs uppercase font-extrabold text-bamboo-800 tracking-wider flex items-center">
                        <span className="w-2 h-2 rounded-full bg-bamboo-600 mr-2"></span>
                        Tấm Ốp Than Tre Đa Năng
                      </div>
                      <ul className="space-y-1.5 text-sm">
                        <li>
                          <a href="/san-pham-chinh/tam-op-than-tre" className="block p-2 rounded-lg hover:bg-eco-gray-50 text-eco-gray-700 hover:text-bamboo-700 transition-colors">
                            <div className="font-semibold text-eco-gray-900">Tấm ốp than tre 5mm & 8mm</div>
                            <div className="text-xs text-eco-gray-500">Khổ 1.22m x 2.44m / 2.8m, uốn cong 90°</div>
                          </a>
                        </li>
                        <li>
                          <a href="/tam-than-tre-17mm" className="block p-2 rounded-lg hover:bg-eco-gray-50 text-eco-gray-700 hover:text-bamboo-700 transition-colors">
                            <div className="font-semibold text-eco-gray-900 flex items-center">
                              Tấm than tre 17mm
                              <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-wood-100 text-wood-700 rounded font-bold">Chuyên tủ</span>
                            </div>
                            <div className="text-xs text-eco-gray-500">Đóng cánh tủ bếp, tủ áo, cửa thông phòng</div>
                          </a>
                        </li>
                        <li>
                          <a href="/san-pham-chinh" className="block p-2 rounded-lg hover:bg-eco-gray-50 text-bamboo-700 hover:text-bamboo-800 transition-colors font-medium">
                            &rarr; Xem tất cả danh mục sản phẩm chính
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Cột 2: Lam sóng & Phụ kiện nẹp */}
                    <div className="col-span-4 space-y-3">
                      <div className="text-xs uppercase font-extrabold text-bamboo-800 tracking-wider flex items-center">
                        <span className="w-2 h-2 rounded-full bg-wood-500 mr-2"></span>
                        Lam Sóng & Phụ Kiện Nẹp
                      </div>
                      <ul className="space-y-1.5 text-sm">
                        <li>
                          <a href="/san-pham-chinh/lam-song" className="block p-2 rounded-lg hover:bg-eco-gray-50 text-eco-gray-700 hover:text-bamboo-700 transition-colors">
                            <div className="font-semibold text-eco-gray-900">Lam sóng than tre cao cấp</div>
                            <div className="text-xs text-eco-gray-500">Lam 3 sóng, 4 sóng tạo điểm nhấn vách TV</div>
                          </a>
                        </li>
                        <li>
                          <a href="/san-pham-chinh/nep" className="block p-2 rounded-lg hover:bg-eco-gray-50 text-eco-gray-700 hover:text-bamboo-700 transition-colors">
                            <div className="font-semibold text-eco-gray-900">Hệ nẹp nhôm đồng bộ (30+ mã)</div>
                            <div className="text-xs text-eco-gray-500">Nẹp T, V, U, H, nẹp góc âm, nẹp góc dương</div>
                          </a>
                        </li>
                        <li>
                          <a href="/huong-dan-thi-cong" className="block p-2 rounded-lg hover:bg-eco-gray-50 text-bamboo-700 hover:text-bamboo-800 transition-colors font-medium">
                            &rarr; Video hướng dẫn uốn góc & dán nẹp
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Cột 3: Khối giới thiệu công nghệ & Callout */}
                    <div className="col-span-4 bg-gradient-to-br from-bamboo-50 via-bamboo-100/50 to-wood-50 rounded-xl p-4 flex flex-col justify-between border border-bamboo-100">
                      <div>
                        <div className="flex items-center text-bamboo-800 font-bold text-sm mb-1">
                          <SparklesIcon className="w-4 h-4 mr-1.5 text-bamboo-600" />
                          Chuẩn E0 Đức & PUR Jowat
                        </div>
                        <p className="text-xs text-eco-gray-600 leading-relaxed mb-3">
                          Toàn bộ sản phẩm {BRAND.shortName} sử dụng công nghệ ép nhiệt keo PUR tự động, chống co ngót và cam kết phát thải E0 an toàn tuyệt đối.
                        </p>
                      </div>
                      <div className="space-y-1.5 pt-2 border-t border-bamboo-200/50">
                        <a
                          href="/gioi-thieu"
                          className="flex items-center text-xs font-bold text-bamboo-800 hover:text-bamboo-950 group/link"
                        >
                          Giới thiệu công ty & nhà máy
                          <ArrowRightIcon className="ml-1 w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                        <a
                          href="/chung-chi-chung-nhan"
                          className="flex items-center text-xs font-semibold text-bamboo-700 hover:text-bamboo-900"
                        >
                          Chứng nhận E0, B1 cản lửa &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* THƯ VIỆN MÃ MÀU */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('colors')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className={`flex items-center px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap rounded-lg !bg-transparent !border-0 !border-transparent !outline-none !shadow-none transition-colors ${
                    activeDropdown === 'colors' ? '!text-bamboo-600 !bg-bamboo-50' : '!text-eco-gray-800 hover:!text-bamboo-600 hover:!bg-bamboo-50/70'
                  }`}
                  style={{
                    backgroundColor: activeDropdown === 'colors' ? '#f0fdf4' : 'transparent',
                    border: 'none',
                    boxShadow: 'none'
                  }}
                >
                  Thư viện mã màu
                  <ChevronDownIcon className={`ml-1 w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'colors' ? 'rotate-180 text-bamboo-600' : ''}`} />
                </button>

                {activeDropdown === 'colors' && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-dropdown border border-eco-gray-200 py-2 animate-fade-in z-50">
                    <div className="px-4 py-1.5 text-[11px] font-bold uppercase text-eco-gray-400">160+ Mã màu thực tế</div>
                    <a href="/thu-vien-ma-mau" className="flex items-center px-4 py-2.5 text-sm text-eco-gray-700 hover:bg-bamboo-50 hover:text-bamboo-800">
                      <span className="w-3 h-3 rounded-full bg-bamboo-600 mr-2.5"></span>
                      <div>
                        <div className="font-semibold text-eco-gray-900">Xem tất cả 160+ mã swatch</div>
                        <div className="text-[11px] text-eco-gray-500">Vân gỗ, vân đá, vân vải, đơn sắc, gương</div>
                      </div>
                    </a>
                    <a href="/thu-vien-ma-mau/phoi-mau/" className="flex items-center px-4 py-2.5 text-sm text-eco-gray-700 hover:bg-bamboo-50 hover:text-bamboo-800">
                      <span className="w-3 h-3 rounded-full bg-amber-500 mr-2.5"></span>
                      <div>
                        <div className="font-semibold text-eco-gray-900 flex items-center">
                          Phối màu không gian 3D
                          <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-red-100 text-red-700 rounded font-bold">Mới</span>
                        </div>
                        <div className="text-[11px] text-eco-gray-500">Trải nghiệm đổi màu tường phòng khách</div>
                      </div>
                    </a>
                    <a href="/tu-thiet-ke-vach" className="flex items-center px-4 py-2.5 text-sm text-eco-gray-700 hover:bg-bamboo-50 hover:text-bamboo-800 border-t border-eco-gray-100">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-2.5"></span>
                      <div>
                        <div className="font-semibold text-eco-gray-900">Tự thiết kế chia mảng vách</div>
                        <div className="text-[11px] text-eco-gray-500">Canvas mô phỏng chia tỉ lệ vách và nẹp</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              {/* BÁO GIÁ & DỰ TOÁN (ĐÃ GỘP THÀNH 1 VÀ ƯU TIÊN DỰ TOÁN HIỂN THỊ ĐẦU TIÊN) */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('pricing')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className={`flex items-center px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap rounded-lg !bg-transparent !border-0 !border-transparent !outline-none !shadow-none transition-colors ${
                    activeDropdown === 'pricing' ? '!text-bamboo-600 !bg-bamboo-50' : '!text-eco-gray-800 hover:!text-bamboo-600 hover:!bg-bamboo-50/70'
                  }`}
                  style={{
                    backgroundColor: activeDropdown === 'pricing' ? '#f0fdf4' : 'transparent',
                    border: 'none',
                    boxShadow: 'none'
                  }}
                >
                  <CalculatorIcon className="w-3.5 h-3.5 mr-1 text-bamboo-600" />
                  Báo giá & Dự toán
                  <ChevronDownIcon className={`ml-1 w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'pricing' ? 'rotate-180 text-bamboo-600' : ''}`} />
                </button>

                {activeDropdown === 'pricing' && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-dropdown border border-eco-gray-200 py-2 animate-fade-in z-50">
                    <a href="/tinh-chi-phi" className="block px-4 py-2.5 text-sm text-eco-gray-700 hover:bg-bamboo-50 hover:text-bamboo-800">
                      <div className="font-semibold text-eco-gray-900 flex items-center">
                        <CalculatorIcon className="w-4 h-4 mr-1.5 text-bamboo-600" />
                        Dự toán & Tính chi phí vật tư
                        <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-amber-500 text-white rounded font-bold">HOT</span>
                      </div>
                      <div className="text-xs text-eco-gray-500 mt-0.5">Nhập kích thước vách tính ngay số tấm & nẹp hoàn thiện</div>
                    </a>
                    <a href="/bang-gia" className="block px-4 py-2.5 text-sm text-eco-gray-700 hover:bg-bamboo-50 hover:text-bamboo-800 border-t border-eco-gray-100">
                      <div className="font-semibold text-eco-gray-900">{`Bảng giá niêm yết ${getCurrentYear()}`}</div>
                      <div className="text-xs text-eco-gray-500 mt-0.5">Giá theo m² và theo tấm từ 240.000 đ/m²</div>
                    </a>
                    <a href="/nha-phan-phoi" className="block px-4 py-2.5 text-sm text-eco-gray-700 hover:bg-bamboo-50 hover:text-bamboo-800 border-t border-eco-gray-100">
                      <div className="font-semibold text-eco-gray-900">Chính sách chiết khấu đại lý & NPP</div>
                      <div className="text-xs text-eco-gray-500 mt-0.5">Dành cho đại lý & tổ đội thầu thợ toàn quốc</div>
                    </a>
                  </div>
                )}
              </div>

              {/* CÔNG TRÌNH */}
              <a
                href="/cong-trinh"
                className="px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap text-eco-gray-800 hover:text-bamboo-600 rounded-lg hover:bg-bamboo-50/70 transition-colors"
              >
                Công trình
              </a>

              {/* NHÀ PHÂN PHỐI */}
              <a
                href="/nha-phan-phoi"
                className="px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap text-eco-gray-800 hover:text-bamboo-600 rounded-lg hover:bg-bamboo-50/70 transition-colors"
              >
                Nhà phân phối
              </a>

              {/* TIN TỨC */}
              <a
                href="/tin-tuc"
                className="px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap text-eco-gray-800 hover:text-bamboo-600 rounded-lg hover:bg-bamboo-50/70 transition-colors"
              >
                Tin tức
              </a>

              {/* LIÊN HỆ */}
              <a
                href="/lien-he"
                className="px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap text-eco-gray-800 hover:text-bamboo-600 rounded-lg hover:bg-bamboo-50/70 transition-colors"
              >
                Liên hệ
              </a>
            </div>

            {/* ACTION BUTTONS (Góc phải) */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Nút Hotline gọi nhanh */}
              <a
                href={`tel:${BRAND.hotline.replace('.', '')}`}
                className="flex items-center px-3.5 py-2 rounded-xl bg-bamboo-50 hover:bg-bamboo-100 text-bamboo-800 border border-bamboo-200 text-sm font-bold transition-all shadow-sm group"
              >
                <span className="w-8 h-8 rounded-lg bg-bamboo-600 text-white flex items-center justify-center mr-2 shadow-sm group-hover:scale-105 transition-transform">
                  <PhoneIcon className="w-4 h-4 animate-bounce" />
                </span>
                <div className="text-left leading-tight">
                  <div className="text-[10px] font-normal text-bamboo-600 uppercase">Tư vấn trực tiếp</div>
                  <div className="text-sm font-extrabold text-bamboo-900 tracking-tight">{BRAND.hotlineDisplay}</div>
                </div>
              </a>

              {/* Nút Nhận Mẫu Thử CTA */}
              <a
                href="/nhan-mau"
                className="px-4 py-2.5 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white text-sm font-bold shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all flex items-center"
              >
                Nhận Mẫu Thử
                <ArrowRightIcon className="ml-1.5 w-4 h-4" />
              </a>
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            <div className="flex items-center lg:hidden space-x-2">
              <a
                href={`tel:${BRAND.hotline.replace('.', '')}`}
                className="p-2 text-bamboo-700 bg-bamboo-50 rounded-lg hover:bg-bamboo-100"
                aria-label="Gọi hotline"
              >
                <PhoneIcon className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-eco-gray-700 hover:text-bamboo-700 hover:bg-eco-gray-100 rounded-lg transition-colors bg-transparent border-0 border-transparent shadow-none"
                aria-label="Mở menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE MENU DRAWER / OFF-CANVAS */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop mờ */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 overflow-y-auto animate-fade-in">
            {/* Header của drawer */}
            <div className="p-4 border-b border-eco-gray-200 flex items-center justify-between bg-bamboo-900 text-white">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-wider">{BRAND.shortName.toUpperCase()}</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-white hover:bg-bamboo-800 transition-colors bg-transparent border-0 border-transparent shadow-none"
                aria-label="Đóng menu"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Danh sách link điều hướng trên điện thoại */}
            <div className="p-4 space-y-1 flex-1">
              <a
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
              >
                Trang chủ
              </a>

              {/* Accordion Sản phẩm chính */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('products')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700 bg-transparent border-0 border-transparent shadow-none"
                >
                  <span>Sản phẩm chính</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileSubmenu.products ? 'rotate-180' : ''}`} />
                </button>
                {mobileSubmenu.products && (
                  <div className="pl-4 pr-2 py-1 space-y-1 text-sm bg-eco-gray-50 rounded-lg mt-1">
                    <a href="/san-pham-chinh" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-bamboo-800 font-bold hover:text-bamboo-950">Tất cả sản phẩm chính</a>
                    <a href="/san-pham-chinh/tam-op-than-tre" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-eco-gray-600 hover:text-bamboo-700">Tấm ốp than tre đa năng</a>
                    <a href="/tam-than-tre-17mm" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-eco-gray-600 hover:text-bamboo-700 font-medium">Tấm than tre 17mm (Chuyên tủ)</a>
                    <a href="/san-pham-chinh/lam-song" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-eco-gray-600 hover:text-bamboo-700">Lam sóng than tre</a>
                    <a href="/san-pham-chinh/nep" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-eco-gray-600 hover:text-bamboo-700">Phụ kiện nẹp nhôm (30+ mã)</a>
                  </div>
                )}
              </div>

              {/* Accordion Thư viện mã màu */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('colors')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700 bg-transparent border-0 border-transparent shadow-none"
                >
                  <span>Thư viện mã màu</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileSubmenu.colors ? 'rotate-180' : ''}`} />
                </button>
                {mobileSubmenu.colors && (
                  <div className="pl-4 pr-2 py-1 space-y-1 text-sm bg-eco-gray-50 rounded-lg mt-1">
                    <a href="/thu-vien-ma-mau" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-eco-gray-600 hover:text-bamboo-700">160+ Bảng mã màu Swatch</a>
                    <a href="/thu-vien-ma-mau/phoi-mau/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-eco-gray-600 hover:text-bamboo-700 font-medium">Phối màu không gian 3D</a>
                    <a href="/tu-thiet-ke-vach" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-eco-gray-600 hover:text-bamboo-700">Tự thiết kế vách</a>
                  </div>
                )}
              </div>

              {/* Accordion Báo giá & Dự toán (Gộp làm 1, ưu tiên Dự toán trước) */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('pricing')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700 bg-transparent border-0 border-transparent shadow-none"
                >
                  <span className="flex items-center">
                    <CalculatorIcon className="w-4 h-4 mr-2 text-bamboo-600" />
                    Báo giá & Dự toán
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileSubmenu.pricing ? 'rotate-180' : ''}`} />
                </button>
                {mobileSubmenu.pricing && (
                  <div className="pl-4 pr-2 py-1 space-y-1 text-sm bg-eco-gray-50 rounded-lg mt-1">
                    <a href="/tinh-chi-phi" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-bamboo-800 font-bold hover:text-bamboo-950 flex items-center justify-between">
                      <span>Dự toán & Tính chi phí vật tư</span>
                      <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-500 text-white rounded-full">HOT</span>
                    </a>
                    <a href="/bang-gia" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-eco-gray-600 hover:text-bamboo-700">Bảng giá niêm yết vật tư</a>
                    <a href="/nha-phan-phoi" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-eco-gray-600 hover:text-bamboo-700 font-medium">Chính sách nhà phân phối & đại lý</a>
                  </div>
                )}
              </div>

              {/* Các liên kết khác */}
              <a
                href="/cong-trinh"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
              >
                Công trình thực tế
              </a>

              <a
                href="/nha-phan-phoi"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
              >
                Hệ thống nhà phân phối
              </a>

              <a
                href="/huong-dan-thi-cong"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
              >
                Hướng dẫn thi công
              </a>

              <a
                href="/tin-tuc"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
              >
                Tin tức & Kinh nghiệm
              </a>

              <a
                href="/gioi-thieu"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
              >
                {`Giới thiệu ${BRAND.shortName}`}
              </a>

              <a
                href="/lien-he"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
              >
                Liên hệ nhà máy
              </a>

              <a
                href="/nhan-mau"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-bold text-amber-700 bg-amber-50 hover:bg-amber-100"
              >
                🎁 Đăng ký nhận mẫu miễn phí
              </a>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="p-4 border-t border-eco-gray-200 bg-eco-gray-50 space-y-3">
              <a
                href={`tel:${BRAND.hotline.replace('.', '')}`}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-bamboo-700 text-white font-bold text-sm shadow-md"
              >
                <PhoneIcon className="w-4 h-4 mr-2" />
                Gọi ngay: {BRAND.hotlineDisplay}
              </a>

              <a
                href={BRAND.socialLinks.zalo}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
              >
                Chat Zalo tư vấn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
