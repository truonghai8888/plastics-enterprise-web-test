import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

// ==========================================
// FLOATING ICONS
// ==========================================
const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const CalculatorIcon = ({ className = "w-5 h-5" }) => (
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

const ArrowUpIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="19" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);

// ==========================================
// MAIN LAYOUT COMPONENT
// ==========================================
export default function MainLayout({
  children,
  title,
  description,
  showFloatingContact = true
}) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-eco-gray-50 text-eco-gray-900 font-sans antialiased selection:bg-bamboo-200 selection:text-bamboo-900">

      {/* 1. TOÀN BỘ HEADER CHUNG */}
      <Header />

      {/* 2. KHU VỰC NỘI DUNG CHÍNH (MAIN BODY) */}
      <main className="flex-grow w-full relative">
        {children}
      </main>

      {/* 3. TOÀN BỘ FOOTER CHUNG */}
      <Footer />

      {/* 4. THANH TIỆN ÍCH NỔI (FLOATING QUICK ACTIONS GÓC PHẢI DƯỚI) */}
      {showFloatingContact && (
        <aside
          aria-label="Tiện ích liên hệ nhanh"
          className="fixed bottom-6 right-5 z-40 flex flex-col items-end space-y-3 pointer-events-none"
        >
          <div className="pointer-events-auto flex flex-col items-end space-y-2.5">

            {/* Nút Tính dự toán nhanh */}
            <a
              href="/du-toan"
              className="group flex items-center bg-white text-bamboo-800 hover:text-bamboo-950 p-2.5 rounded-full shadow-lg border border-bamboo-200 hover:shadow-xl transition-all duration-300"
              title="Tính dự toán chi phí"
            >
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-2.5 text-bamboo-900">
                Tính dự toán vật tư
              </span>
              <div className="w-10 h-10 rounded-full bg-bamboo-100 flex items-center justify-center text-bamboo-700 group-hover:bg-bamboo-600 group-hover:text-white transition-colors">
                <CalculatorIcon className="w-5 h-5" />
              </div>
            </a>

            {/* Nút Chat Zalo */}
            <a
              href="https://zalo.me/0915189389"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center bg-white text-blue-600 p-2.5 rounded-full shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
              title="Tư vấn Zalo"
            >
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-2.5 text-blue-700">
                Chat Zalo tư vấn
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                Zalo
              </div>
            </a>

            {/* Nút Gọi Hotline khẩn cấp / Tư vấn trực tiếp */}
            <a
              href="tel:0915189389"
              className="relative group flex items-center bg-gradient-bamboo text-white p-2.5 rounded-full shadow-hover hover:scale-105 transition-all duration-300"
              title="Gọi Hotline tư vấn"
            >
              {/* Pulse ripple ring */}
              <span className="absolute -inset-1 rounded-full bg-bamboo-500 opacity-60 animate-ping pointer-events-none"></span>

              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-2.5 text-white">
                Hotline: 0915.189.389
              </span>
              <div className="w-10 h-10 rounded-full bg-white text-bamboo-700 flex items-center justify-center shadow-sm">
                <PhoneIcon className="w-5 h-5 animate-pulse" />
              </div>
            </a>

            {/* Nút Cuộn về đầu trang (Back to top) */}
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                aria-label="Cuộn lên đầu trang"
                className="w-10 h-10 rounded-full bg-eco-gray-800/80 hover:bg-eco-gray-900 text-white backdrop-blur-sm flex items-center justify-center shadow-md hover:-translate-y-1 transition-all duration-200 mt-2"
              >
                <ArrowUpIcon className="w-5 h-5" />
              </button>
            )}

          </div>
        </aside>
      )}

    </div>
  );
}
