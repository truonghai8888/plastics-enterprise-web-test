import BRAND, { getCurrentYear } from '../../config/brandConfig';
import React, { useState } from 'react';

// ==========================================
// ICON COMPONENTS (Lucide Style SVG)
// ==========================================
const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const GlobeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" x2="22" y1="12" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const SendIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" x2="11" y1="2" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

// ==========================================
// FOOTER COMPONENT
// ==========================================
export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const val = email.trim();
    if (!val) {
      setErrorMsg('Vui lòng nhập email hoặc số điện thoại');
      return;
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isPhone = /^(0|\+84)[0-9]{8,11}$/.test(val.replace(/[\s.-]/g, ''));
    if (!isEmail && !isPhone && val.length < 9) {
      setErrorMsg('Vui lòng nhập đúng định dạng email hoặc số điện thoại');
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('plastics_enterprise_newsletter') || '[]');
      existing.push({
        contact: val,
        type: isEmail ? 'email' : 'phone',
        createdAt: new Date().toISOString(),
        timestamp: new Date().toLocaleString('vi-VN')
      });
      localStorage.setItem('plastics_enterprise_newsletter', JSON.stringify(existing));
    } catch (_) {}

    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 6000);
  };

  return (
    <footer className="bg-bamboo-950 text-eco-gray-300 font-sans border-t border-bamboo-900 relative overflow-hidden">
      {/* Decorative leaf background pattern */}
      <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-bamboo-800/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 -mb-10 -ml-10 w-96 h-96 bg-wood-800/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* TOP FOOTER: DẢI CHỨNG NHẬN CHẤT LƯỢNG */}
      <div className="border-b border-bamboo-800/80 bg-bamboo-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-bamboo-800/50 border border-bamboo-700 flex items-center justify-center text-bamboo-400 shrink-0">
                <span className="font-extrabold text-base">E0</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Tiêu Chuẩn E0 Đức</div>
                <div className="text-xs text-eco-gray-400">An toàn phát thải Formaldehyde, lành tính với trẻ nhỏ</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-bamboo-800/50 border border-bamboo-700 flex items-center justify-center text-wood-400 shrink-0">
                <span className="font-extrabold text-base">PUR</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Keo Nhiệt Jowat Đức</div>
                <div className="text-xs text-eco-gray-400">Công nghệ ép tự động, không bong tróc viền mép</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-bamboo-800/50 border border-bamboo-700 flex items-center justify-center text-bamboo-400 shrink-0">
                <span className="font-extrabold text-base">B1</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Chống Cháy Lan B1</div>
                <div className="text-xs text-eco-gray-400">Đạt chứng nhận kiểm định khả năng cản lửa lan truyền</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-bamboo-800/50 border border-bamboo-700 flex items-center justify-center text-wood-400 shrink-0">
                <span className="font-extrabold text-base">{BRAND.warrantyYears}N</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Bảo Hành {BRAND.warrantyYears} Năm</div>
                <div className="text-xs text-eco-gray-400">Cam kết độ bền cốt tấm, chống ẩm mốc, cong vênh</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER COLUMNS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* CỘT 1: THÔNG TIN CÔNG TY & NHÀ MÁY (4 Cột) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3">
              <img
                src={BRAND.logo.url}
                alt={BRAND.logo.alt}
                className="h-12 w-auto object-contain rounded-lg shadow-md bg-white p-1"
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
              <div className="hidden items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-bamboo flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {BRAND.logo.badgeText}
                </div>
                <div>
                  <div className="text-xl font-black text-white tracking-tight">
                    {BRAND.brandName}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-wood-400 tracking-wider">
                    {BRAND.subSlogan}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-eco-gray-300 leading-relaxed"><strong className="text-white">{BRAND.legalName}</strong> ({BRAND.factoryName}) là nhà sản xuất và phân phối hàng đầu về tấm ốp than tre đa năng, lam sóng, tấm ốp super và phụ kiện gỗ nhựa nội ngoại thất chuẩn quốc tế tại Việt Nam.</p>

            <div className="space-y-3 text-sm text-eco-gray-300">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>
                  {BRAND.factory?.mapUrl ? (
                    <a
                      href={BRAND.factory.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/map hover:text-white transition-colors"
                      title="Mở chỉ đường trên Google Maps"
                    >
                      <strong className="text-white group-hover/map:text-amber-400 underline decoration-amber-400/60 underline-offset-2 transition-colors">
                        Nhà máy sản xuất:
                      </strong>{' '}
                      <span className="text-eco-gray-300 group-hover/map:underline decoration-eco-gray-400">
                        {BRAND.factoryAddress}
                      </span>
                    </a>
                  ) : (
                    <>
                      <strong className="text-white">Nhà máy sản xuất:</strong> {BRAND.factoryAddress}
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-4 h-4 text-wood-400 shrink-0 mt-1" />
                <span>
                  {BRAND.office?.mapUrl ? (
                    <a
                      href={BRAND.office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/map hover:text-white transition-colors"
                      title="Mở chỉ đường trên Google Maps"
                    >
                      <strong className="text-white group-hover/map:text-amber-400 underline decoration-amber-400/60 underline-offset-2 transition-colors">
                        Văn phòng đại diện:
                      </strong>{' '}
                      <span className="text-eco-gray-300 group-hover/map:underline decoration-eco-gray-400">
                        {BRAND.officeAddress}
                      </span>
                    </a>
                  ) : (
                    <>
                      <strong className="text-white">Văn phòng đại diện:</strong> {BRAND.officeAddress}
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-4 h-4 text-bamboo-400 shrink-0" />
                <span>
                  <strong className="text-white">Hotline / Zalo:</strong> <a href={`tel:${BRAND.hotline.replace(".", "")}`} className="text-wood-400 font-bold hover:underline">{BRAND.hotlineDisplay}</a>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MailIcon className="w-4 h-4 text-bamboo-400 shrink-0" />
                <span>
                  <strong className="text-white">Email:</strong> <a href={BRAND.socialLinks.email} className="hover:underline">{BRAND.email}</a>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <GlobeIcon className="w-4 h-4 text-bamboo-400 shrink-0" />
                <span>
                  <strong className="text-white">Website:</strong>{' '}
                  <a
                    href={BRAND.websiteUrl || `https://${BRAND.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-eco-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {BRAND.domain}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* CỘT 2: DANH MỤC SẢN PHẨM & MÃ MÀU (3 Cột) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-extrabold text-white border-l-2 border-bamboo-500 pl-3">
              Sản Phẩm & Công Cụ
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/san-pham-chinh/tam-op-than-tre" className="hover:text-bamboo-400 transition-colors flex items-center">
                  <ChevronRightIcon className="w-3.5 h-3.5 mr-1 text-bamboo-500" />
                  Tấm ốp than tre đa năng (5mm & 8mm)
                </a>
              </li>
              <li>
                <a href="/tam-than-tre-17mm" className="hover:text-bamboo-400 transition-colors flex items-center">
                  <ChevronRightIcon className="w-3.5 h-3.5 mr-1 text-bamboo-500" />
                  Tấm nội thất than tre 17mm làm tủ
                </a>
              </li>
              <li>
                <a href="/san-pham-chinh/lam-song" className="hover:text-bamboo-400 transition-colors flex items-center">
                  <ChevronRightIcon className="w-3.5 h-3.5 mr-1 text-bamboo-500" />
                  Lam sóng than tre ốp vách TV
                </a>
              </li>
              <li>
                <a href="/san-pham-chinh/nep" className="hover:text-bamboo-400 transition-colors flex items-center">
                  <ChevronRightIcon className="w-3.5 h-3.5 mr-1 text-bamboo-500" />
                  Hệ phụ kiện nẹp nhôm mạ Anode (30+ mã)
                </a>
              </li>
              <li>
                <a href="/thu-vien-ma-mau" className="hover:text-bamboo-400 transition-colors flex items-center">
                  <ChevronRightIcon className="w-3.5 h-3.5 mr-1 text-bamboo-500" />
                  Thư viện hơn 160 mã vân bề mặt
                </a>
              </li>
              <li>
                <a href="/thu-vien-ma-mau/phoi-mau/" className="hover:text-bamboo-400 transition-colors flex items-center">
                  <ChevronRightIcon className="w-3.5 h-3.5 mr-1 text-bamboo-500" />
                  Trình phối màu không gian 3D
                </a>
              </li>
              <li>
                <a href="/tinh-chi-phi" className="text-wood-400 hover:text-wood-300 font-semibold transition-colors flex items-center">
                  <ChevronRightIcon className="w-3.5 h-3.5 mr-1 text-wood-500" />
                  Công cụ tính chi phí dự toán vật tư
                </a>
              </li>
              <li>
                <a href="/tu-thiet-ke-vach" className="hover:text-bamboo-400 transition-colors flex items-center">
                  <ChevronRightIcon className="w-3.5 h-3.5 mr-1 text-bamboo-500" />
                  Tự thiết kế mô phỏng chia mảng vách
                </a>
              </li>
            </ul>
          </div>

          {/* CỘT 3: CHÍNH SÁCH & HỖ TRỢ KHÁCH HÀNG (2 Cột) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-extrabold text-white border-l-2 border-wood-500 pl-3">
              Chính Sách & Hỗ Trợ
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/gioi-thieu" className="hover:text-bamboo-400 transition-colors">
                  Giới thiệu {BRAND.brandName}
                </a>
              </li>
              <li>
                <a href="/chung-chi-chung-nhan" className="hover:text-bamboo-400 transition-colors">
                  Chứng chỉ E0 & B1
                </a>
              </li>
              <li>
                <a href="/chinh-sach-bao-hanh" className="hover:text-bamboo-400 transition-colors">
                  Bảo hành {BRAND.warrantyYears} năm
                </a>
              </li>
              <li>
                <a href="/nha-phan-phoi" className="hover:text-bamboo-400 transition-colors">
                  Hệ thống nhà phân phối
                </a>
              </li>
              <li>
                <a href="/huong-dan-thi-cong" className="hover:text-bamboo-400 transition-colors">
                  Hướng dẫn thi công & uốn
                </a>
              </li>
              <li>
                <a href="/hoi-dap" className="hover:text-bamboo-400 transition-colors">
                  Hỏi đáp thường gặp (FAQ)
                </a>
              </li>
              <li>
                <a href="/tai-catalogue" className="hover:text-bamboo-400 transition-colors">
                  Tải catalogue PDF
                </a>
              </li>
              <li>
                <a href="/nhan-mau" className="hover:text-bamboo-400 transition-colors text-amber-400 font-medium">
                  Đăng ký nhận mẫu hộp
                </a>
              </li>
              <li>
                <a href="/chinh-sach-bao-mat" className="hover:text-bamboo-400 transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="/dieu-khoan" className="hover:text-bamboo-400 transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* CỘT 4: FORM BẢN TIN & MẠNG XÃ HỘI (3 Cột) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-extrabold text-white border-l-2 border-bamboo-500 pl-3">
              Đăng Ký Nhận Bản Tin
            </h4>
            <p className="text-xs text-eco-gray-400 leading-relaxed">
              Nhận ngay báo giá đại lý cập nhật nhất, bảng mã màu xu hướng mới và các chương trình ưu đãi độc quyền từ nhà máy.
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errorMsg) setErrorMsg(''); }}
                  placeholder="Nhập email hoặc số điện thoại..."
                  required
                  className="w-full px-3.5 py-2.5 pr-10 text-sm bg-bamboo-900 border border-bamboo-700 rounded-xl text-white placeholder-eco-gray-500 focus:outline-none focus:border-bamboo-400 focus:ring-1 focus:ring-bamboo-400"
                />
                <button
                  type="submit"
                  aria-label="Gửi đăng ký"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-bamboo-600 hover:bg-bamboo-500 text-white rounded-lg transition-colors"
                >
                  <SendIcon className="w-4 h-4" />
                </button>
              </div>

              {errorMsg && (
                <div className="text-xs text-red-400 bg-red-950/60 p-2 rounded-lg border border-red-800 animate-fade-in">
                  {errorMsg}
                </div>
              )}

              {isSubscribed && (
                <div className="text-xs text-bamboo-300 flex items-center bg-bamboo-900/90 p-2.5 rounded-lg border border-bamboo-600 shadow-md animate-fade-in">
                  <CheckCircleIcon className="w-4 h-4 mr-1.5 text-bamboo-400 shrink-0" />
                  <span>Đăng ký thành công! Chuyên viên {BRAND.shortName} sẽ gửi báo giá & bản tin sớm nhất.</span>
                </div>
              )}
            </form>

            {/* Mạng xã hội */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-white mb-2.5">Kết nối với {BRAND.shortName}:</div>
              <div className="flex items-center space-x-2.5">
                {/* Facebook */}
                <a
                  href={BRAND.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-bamboo-900 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                  aria-label={`Facebook ${BRAND.brandName}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Zalo */}
                <a
                  href={BRAND.socialLinks.zalo}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-bamboo-900 hover:bg-blue-500 text-white flex items-center justify-center font-bold text-xs transition-colors"
                  aria-label="Zalo Official"
                >
                  Zalo
                </a>

                {/* YouTube */}
                <a
                  href={BRAND.socialLinks?.youtube || "https://www.youtube.com/@Nh%E1%BB%B1aAMC"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-bamboo-900 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube Channel"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href={BRAND.socialLinks?.tiktok || "https://www.tiktok.com/@amcplastic_?_r=1&_t=ZS-9BANDAJZ5tN"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-bamboo-900 hover:bg-neutral-800 text-white flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.71 1.25-.06 2.37-.87 2.77-2.05.21-.6.26-1.24.26-1.87.01-4.79-.01-9.58.02-14.37z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM COPYRIGHT BAR */}
      <div className="border-t border-bamboo-900 bg-bamboo-950/90 py-5 text-xs text-eco-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            © {getCurrentYear()} <strong className="text-white">{BRAND.legalName}</strong>. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-bamboo-400 font-semibold">Đã đăng ký thông báo với Bộ Công Thương</span>
            <span>•</span>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
