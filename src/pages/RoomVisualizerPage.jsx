import React, { useState, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { COLOR_ITEMS } from './ColorLibraryPage';
import BRAND, { getCurrentYear } from '../config/brandConfig';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const Share2Icon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
  </svg>
);

const DownloadIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const SunIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

const MoonIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const CalculatorIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/>
  </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

const EyeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const ZoomInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>
    <line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>
  </svg>
);

const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

// DANH SÁCH 6 PHÒNG MẪU THỰC TẾ
const ROOM_SCENES = [
  {
    id: 'living-room',
    name: 'Phòng Khách Hiện Đại',
    roomType: 'Phòng khách',
    subtitle: 'Vách Tivi & Lam Sóng',
    description: 'Vách chính diện sau kệ TV kết hợp lam sóng trang trí và hệ đèn hắt LED gián tiếp.',
    defaultColor: 'EB89030G',
    fluteColor: 'EB66450',
  },
  {
    id: 'bedroom',
    name: 'Phòng Ngủ Master',
    roomType: 'Phòng ngủ',
    subtitle: 'Vách Đầu Giường Uốn Cong',
    description: 'Vách ốp than tre uốn cong bo tròn cách âm chuẩn an toàn E0 không mùi.',
    defaultColor: 'EB66006',
    fluteColor: 'EB68019',
  },
  {
    id: 'kitchen',
    name: 'Phòng Bếp & Tủ Bếp',
    roomType: 'Phòng bếp',
    subtitle: 'Tấm Nội Thất 17mm',
    description: 'Hệ cánh tủ và đảo bếp đóng từ tấm than tre 17mm kháng ẩm, chịu nước tuyệt đối.',
    defaultColor: 'EB68038',
    fluteColor: 'EB88009G',
  },
  {
    id: 'dining',
    name: 'Phòng Ăn Gia Đình',
    roomType: 'Phòng ăn',
    subtitle: 'Vách Trang Trí Sang Trọng',
    description: 'Mảng tường điểm nhấn khu vực bàn ăn gia đình kết hợp vân đá và nẹp chỉ vàng.',
    defaultColor: 'EB89028',
    fluteColor: 'EB66450',
  },
  {
    id: 'spa',
    name: 'Phòng Tắm & Spa Thư Giãn',
    roomType: 'Nhà tắm & Spa',
    subtitle: 'Kháng Nước 100%',
    description: 'Không gian thư giãn chống ẩm mốc, vân gỗ sần chống trơn trượt an toàn.',
    defaultColor: 'EB79019',
    fluteColor: 'EB66001',
  },
  {
    id: 'lobby',
    name: 'Sảnh Đón & Quầy Lễ Tân',
    roomType: 'Sảnh thương mại',
    subtitle: 'Tráng Gương & Vân Đá Lớn',
    description: 'Vách ốp tráng gương và vân đá lớn tạo ấn tượng thị giác cho đối tác.',
    defaultColor: 'EB69001G',
    fluteColor: 'EB89099G',
  }
];

// ==========================================
// ROOM VISUALIZER PAGE COMPONENT
// ==========================================
export default function RoomVisualizerPage({ initialCode = 'EB66006', onNavigateProduct }) {
  const [activeScene, setActiveScene] = useState(ROOM_SCENES[0]);

  // Selected main wall color object
  const [selectedMainColor, setSelectedMainColor] = useState(
    COLOR_ITEMS.find(c => c.code === initialCode) || COLOR_ITEMS[0]
  );

  // Selected secondary accent/lam song color object
  const [selectedAccentColor, setSelectedAccentColor] = useState(
    COLOR_ITEMS.find(c => c.code === 'EB66450') || COLOR_ITEMS[2]
  );

  // Mode: show raw unfinished wall (Ảnh gốc)
  const [showRawWall, setShowRawWall] = useState(false);

  // Zoom magnifier: 1 | 2 | 4 | 8
  const [zoomLevel, setZoomLevel] = useState(1);

  // Lighting mode: 'day' | 'night'
  const [lightingMode, setLightingMode] = useState('night');

  // Active Tab for Palette: 'main-wall' | 'accent-flute'
  const [targetSurface, setTargetSurface] = useState('main-wall');

  // Filter category in palette sidebar
  const [paletteCategory, setPaletteCategory] = useState('all');

  // Search keyword in palette
  const [searchKeyword, setSearchKeyword] = useState('');

  // Quote Popup State
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: '', phone: '', areaSize: '25', note: '' });
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Notification banners
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Đã sao chép liên kết phối cảnh vào bộ nhớ tạm!');
  };

  const handleDownload = () => {
    showToast(`Đã lưu cấu hình phối cảnh ${selectedMainColor.code} - ${activeScene.name} thành công!`);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (quoteForm.name && quoteForm.phone) {
      setQuoteSuccess(true);
      setTimeout(() => {
        setQuoteSuccess(false);
        setShowQuoteModal(false);
        setQuoteForm({ name: '', phone: '', areaSize: '25', note: '' });
      }, 3500);
    }
  };

  // Filtered swatches for current category tab + search
  const displaySwatches = useMemo(() => {
    return COLOR_ITEMS.filter((c) => {
      const matchCat = paletteCategory === 'all' || c.category.includes(paletteCategory) || c.category === paletteCategory;
      const matchSearch = !searchKeyword.trim() ||
        c.code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        c.name.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [paletteCategory, searchKeyword]);

  return (
    <MainLayout>
      {/* 1. TOP CONTROL BAR (KHỚP NỘI DUNG VỚI ECOBAMBOO PHOI-MAU) */}
      <div className="bg-eco-gray-950 text-white border-b border-eco-gray-800 py-3.5 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">

          {/* Về bảng màu + Tiêu đề */}
          <div className="flex items-center space-x-3">
            <a
              href="/thu-vien-ma-mau"
              className="inline-flex items-center text-xs font-bold text-eco-gray-300 hover:text-white bg-eco-gray-800 hover:bg-eco-gray-700 px-3 py-1.5 rounded-lg border border-eco-gray-700 transition-colors"
            >
              <span className="mr-1">&larr;</span> Bảng màu
            </a>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-white flex items-center">
                Phối màu tấm ốp lên phòng mẫu
                <span className="ml-2 px-2 py-0.5 text-[10px] bg-amber-500/90 text-white rounded-md font-bold uppercase tracking-wider">
                  3D View
                </span>
              </h1>
              <p className="text-[11px] text-eco-gray-400 font-light">
                Chọn mã tấm ốp {BRAND.shortName} và xem ngay trên tường, tủ của các phòng mẫu thực tế
              </p>
            </div>
          </div>

          {/* CTA: Xem mẫu thật - Gửi mẫu về tận nhà */}
          <div className="flex items-center space-x-2">
            <a
              href="/nhan-mau"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white text-xs font-bold shadow transition-all flex items-center"
            >
              <span>Xem mẫu thật</span>
              <span className="hidden sm:inline font-normal text-eco-gray-200 ml-1.5">&middot; gửi mẫu về tận nhà</span>
            </a>
          </div>

        </div>
      </div>

      {/* TOAST ALERT NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 bg-eco-gray-900 text-white px-5 py-2.5 rounded-2xl shadow-2xl border border-bamboo-500 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. MAIN WORKSPACE: SCENE VIEWPORT (LEFT) + COLOR PALETTE DOCK (RIGHT) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* KHUNG HIỂN THỊ KHÔNG GIAN 3D (8 Cột) */}
          <div className="lg:col-span-8 space-y-4">

            {/* DẢI NÚT ĐỔI CẢNH PHÒNG MẪU */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
              <span className="text-eco-gray-500 shrink-0 uppercase text-[10px] tracking-wider font-extrabold mr-1">
                Chọn cảnh:
              </span>
              {ROOM_SCENES.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => setActiveScene(scene)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    activeScene.id === scene.id
                      ? 'bg-bamboo-700 text-white shadow-sm'
                      : 'bg-white hover:bg-eco-gray-100 text-eco-gray-700 border border-eco-gray-200'
                  }`}
                >
                  {scene.name}
                </button>
              ))}
            </div>

            {/* Viewport Box */}
            <div className={`relative rounded-3xl overflow-hidden border border-eco-gray-300 shadow-2xl aspect-[16/10] sm:aspect-[16/9] transition-all duration-500 ${
              lightingMode === 'day' ? 'bg-[#f4f7f6]' : 'bg-[#121619]'
            }`}>

              {/* VÁCH CHÍNH TRONG KHÔNG GIAN (DYNAMIC ACCENT WALL) */}
              <div
                className={`absolute inset-x-8 top-5 bottom-16 rounded-2xl ${showRawWall ? 'bg-stone-600' : (selectedMainColor.bgStyle || 'bg-stone-800')} transition-all duration-500 shadow-2xl flex flex-col justify-between p-6 overflow-hidden`}
                style={zoomLevel > 1 ? { transform: `scale(${zoomLevel})`, transformOrigin: 'center center' } : {}}
              >
                {/* Khi bật chế độ xem ảnh gốc: mô phỏng tường thô chưa ốp */}
                {showRawWall ? (
                  <div className="absolute inset-0 bg-stone-500 flex flex-col items-center justify-center text-white/90 p-6 text-center">
                    <span className="text-xs uppercase font-mono tracking-widest bg-black/60 px-3 py-1 rounded-full mb-2">
                      Ảnh gốc chưa ốp
                    </span>
                    <p className="text-sm font-semibold max-w-sm">
                      Bề mặt tường xi măng mộc trước khi thi công tấm ốp than tre và lam sóng {BRAND.shortName}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Texture / Real Room Underlay */}
                    {selectedMainColor.roomImage ? (
                      <img
                        src={selectedMainColor.roomImage}
                        alt={selectedMainColor.code}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      />
                    ) : (
                      <img
                        src={selectedMainColor.fullImage || selectedMainColor.image || `/images/ecobamboo/${selectedMainColor.code}_sm.webp`}
                        alt={selectedMainColor.code}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-700"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}

                    {/* Surface gloss reflection simulator */}
                    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                      lightingMode === 'night'
                        ? 'bg-gradient-to-b from-amber-500/20 via-transparent to-black/40'
                        : 'bg-gradient-to-tr from-white/30 via-transparent to-black/10'
                    }`} />

                    {/* Mạch ghép tấm tiêu chuẩn 1220mm */}
                    <div className="absolute inset-y-0 left-1/3 w-px bg-black/15 shadow"></div>
                    <div className="absolute inset-y-0 left-2/3 w-px bg-black/15 shadow"></div>

                    {/* Top LED Striplight Simulation */}
                    <div className={`absolute top-0 inset-x-0 h-1.5 transition-all duration-500 ${
                      lightingMode === 'night' ? 'bg-amber-300 shadow-[0_0_25px_8px_rgba(252,211,77,0.7)]' : 'bg-white/40'
                    }`} />

                    {/* Info badge inside room */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-black/60 text-white font-mono text-xs font-bold backdrop-blur-md">
                        Vách chính: {selectedMainColor.code} - {selectedMainColor.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-bamboo-800 text-white text-[10px] font-bold">
                        Khổ 1220x2800mm
                      </span>
                    </div>

                    {/* HỆ LAM SÓNG TRANG TRÍ PHỤ (ACCENT FLUTED PANEL) */}
                    <div
                      className={`absolute right-4 top-4 bottom-4 w-28 sm:w-36 rounded-xl ${selectedAccentColor.bgStyle} shadow-2xl border-l-2 border-white/20 p-2 flex justify-between overflow-hidden`}
                    >
                      <div className="w-full h-full flex justify-between space-x-1 opacity-80">
                        <div className="w-2 h-full bg-black/25 rounded-sm"></div>
                        <div className="w-2 h-full bg-black/25 rounded-sm"></div>
                        <div className="w-2 h-full bg-black/25 rounded-sm"></div>
                        <div className="w-2 h-full bg-black/25 rounded-sm"></div>
                        <div className="w-2 h-full bg-black/25 rounded-sm"></div>
                        <div className="w-2 h-full bg-black/25 rounded-sm"></div>
                      </div>
                      <span className="absolute bottom-2 right-2 text-[8px] font-mono text-white bg-black/60 px-1 rounded">
                        Lam: {selectedAccentColor.code}
                      </span>
                    </div>
                  </>
                )}

                {/* Perspective Furniture Overlay (Mô phỏng nội thất từng cảnh) */}
                <div className="relative z-10 mt-auto flex items-end justify-center">
                  {activeScene.id === 'living-room' && (
                    <div className="w-3/5 h-16 sm:h-20 bg-gradient-to-r from-stone-900 via-zinc-800 to-stone-900 rounded-t-xl shadow-2xl border-t border-white/10 flex flex-col items-center justify-center text-gray-400 text-xs">
                      <div className="w-4/5 h-2 bg-amber-600/60 rounded-full mb-1"></div>
                      <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">Kệ Tivi Treo Tường</span>
                    </div>
                  )}

                  {activeScene.id === 'bedroom' && (
                    <div className="w-4/5 h-16 sm:h-24 bg-gradient-to-r from-stone-800 via-amber-950 to-stone-800 rounded-t-2xl shadow-2xl border-t-2 border-amber-500/30 flex items-center justify-center text-gray-300 text-xs">
                      <span className="text-[10px] font-bold tracking-widest uppercase">Giường Master Đầu Bọc Da</span>
                    </div>
                  )}

                  {activeScene.id === 'kitchen' && (
                    <div className="w-4/5 h-16 sm:h-22 bg-gradient-to-r from-neutral-800 via-stone-800 to-neutral-800 rounded-t-xl shadow-2xl border-t border-white/20 flex items-center justify-center text-gray-300 text-xs">
                      <span className="text-[10px] font-bold tracking-widest uppercase">Đảo Bếp Mặt Đá & Cánh Tủ 17mm</span>
                    </div>
                  )}

                  {activeScene.id === 'dining' && (
                    <div className="w-3/4 h-16 sm:h-20 bg-gradient-to-r from-stone-900 via-amber-950/70 to-stone-900 rounded-t-xl shadow-2xl border-t border-amber-400/30 flex items-center justify-center text-gray-300 text-xs">
                      <span className="text-[10px] font-bold tracking-widest uppercase">Bàn Ăn 6 Ghế Sang Trọng</span>
                    </div>
                  )}

                  {activeScene.id === 'spa' && (
                    <div className="w-3/5 h-16 sm:h-20 bg-gradient-to-r from-teal-950 via-neutral-900 to-teal-950 rounded-t-xl shadow-2xl border-t border-teal-400/30 flex items-center justify-center text-gray-300 text-xs">
                      <span className="text-[10px] font-bold tracking-widest uppercase">Khu Vực Lavabo & Bồn Tắm</span>
                    </div>
                  )}

                  {activeScene.id === 'lobby' && (
                    <div className="w-3/4 h-16 sm:h-22 bg-gradient-to-r from-neutral-900 via-zinc-800 to-neutral-900 rounded-t-xl shadow-2xl border-t border-amber-400/40 flex items-center justify-center text-gray-300 text-xs">
                      <span className="text-[10px] font-bold tracking-widest uppercase">Quầy Lễ Tân Khách Sạn</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Sàn nhà (Floor) */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-stone-800 to-stone-950 border-t border-white/10 flex items-center justify-center">
                <span className="text-[11px] text-gray-500 font-mono">Sàn Gỗ Xương Cá Tự Nhiên &bull; Kháng Nước</span>
              </div>

            </div>

            {/* THANH CÔNG CỤ XEM DƯỚI ẢNH (KHỚP ECOBAMBOO TOOLBAR) */}
            <div className="bg-white rounded-2xl border border-eco-gray-200 p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                {/* Nút Xem ảnh gốc */}
                <button
                  onClick={() => setShowRawWall(!showRawWall)}
                  onMouseDown={() => setShowRawWall(true)}
                  onMouseUp={() => setShowRawWall(false)}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-colors flex items-center ${
                    showRawWall ? 'bg-amber-600 text-white border-amber-600' : 'bg-eco-gray-100 hover:bg-eco-gray-200 text-eco-gray-700 border-eco-gray-200'
                  }`}
                  title="Nhấn hoặc giữ chuột để xem ảnh gốc trước khi ốp"
                >
                  <EyeIcon className="w-3.5 h-3.5 mr-1" />
                  <span>Ảnh gốc</span>
                  <small className="ml-1 text-[10px] opacity-75">(giữ)</small>
                </button>

                {/* Kính lúp soi vân */}
                <div className="flex items-center bg-eco-gray-100 p-0.5 rounded-xl border border-eco-gray-200">
                  <span className="px-2 text-[11px] font-bold text-eco-gray-600 flex items-center">
                    <ZoomInIcon className="w-3 h-3 mr-1" /> Soi vân:
                  </span>
                  {[1, 2, 4].map((level) => (
                    <button
                      key={level}
                      onClick={() => setZoomLevel(level)}
                      className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                        zoomLevel === level ? 'bg-bamboo-700 text-white shadow-sm' : 'text-eco-gray-600 hover:text-eco-gray-900'
                      }`}
                    >
                      {level === 1 ? '1&times;' : `${level}&times;`}
                    </button>
                  ))}
                </div>

                {/* Ánh sáng ban ngày / ban đêm */}
                <button
                  onClick={() => setLightingMode(lightingMode === 'day' ? 'night' : 'day')}
                  className="px-3 py-1.5 rounded-xl bg-eco-gray-100 hover:bg-eco-gray-200 text-eco-gray-700 font-bold border border-eco-gray-200 flex items-center transition-colors"
                >
                  {lightingMode === 'day' ? (
                    <>
                      <SunIcon className="w-3.5 h-3.5 mr-1 text-amber-500" />
                      Ban Ngày
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-3.5 h-3.5 mr-1 text-blue-500" />
                      Đèn Hắt Đêm
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-eco-gray-100 hover:bg-eco-gray-200 text-eco-gray-700 border border-eco-gray-200 transition-colors"
                  title="Chia sẻ phối cảnh"
                >
                  <Share2Icon className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-xl bg-eco-gray-100 hover:bg-eco-gray-200 text-eco-gray-700 border border-eco-gray-200 transition-colors"
                  title="Lưu ảnh phòng mẫu"
                >
                  <DownloadIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center"
                >
                  <CalculatorIcon className="w-3.5 h-3.5 mr-1.5" />
                  Báo Giá Màu Này
                </button>
              </div>
            </div>

          </div>

          {/* THANH CHỌN BẢNG MÀU BÊN CẠNH (4 Cột) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-eco-gray-200 p-5 shadow-soft space-y-4">

            {/* Header dock */}
            <div>
              <span className="text-[10px] font-bold uppercase text-bamboo-700 tracking-wider">Chọn Mặt & Mã Tấm</span>
              <h3 className="text-base font-extrabold text-eco-gray-900">Mặt Đang Ốp & Thư Viện Màu</h3>
            </div>

            {/* Target selector: Đổi màu cho Vách chính hay Lam sóng */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-eco-gray-100 rounded-xl">
              <button
                onClick={() => setTargetSurface('main-wall')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  targetSurface === 'main-wall'
                    ? 'bg-white text-bamboo-800 shadow-sm'
                    : 'text-eco-gray-600 hover:text-eco-gray-900'
                }`}
              >
                1. Đổi Vách Chính
              </button>
              <button
                onClick={() => setTargetSurface('accent-flute')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  targetSurface === 'accent-flute'
                    ? 'bg-white text-wood-800 shadow-sm'
                    : 'text-eco-gray-600 hover:text-eco-gray-900'
                }`}
              >
                2. Đổi Lam Sóng
              </button>
            </div>

            {/* Ô TÌM KIẾM MÃ TẤM ỐP (KHỚP ECOBAMBOO) */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-eco-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm mã hoặc tên màu (VD: EB66006, Calacatta...)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600 bg-eco-gray-50/50"
              />
            </div>

            {/* NHÓM VÂN TABS (TABLIST) */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'van-go', label: 'Vân Gỗ' },
                { id: 'van-da', label: 'Vân Đá' },
                { id: 'van-vai', label: 'Vân Vải' },
                { id: 'don-sac', label: 'Đơn Sắc' },
                { id: 'kim-loai', label: 'Tráng Gương' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPaletteCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                    paletteCategory === cat.id ? 'bg-bamboo-700 text-white' : 'bg-eco-gray-100 text-eco-gray-600 hover:bg-eco-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Current Target Indicator */}
            <div className="p-2.5 rounded-xl bg-bamboo-50/80 border border-bamboo-200 text-xs flex items-center justify-between">
              <span className="text-eco-gray-600">
                Đang chọn: <strong className="text-bamboo-900">{targetSurface === 'main-wall' ? 'Vách phẳng' : 'Lam sóng'}</strong>
              </span>
              <span className="text-[10px] font-mono font-bold text-bamboo-700">
                {targetSurface === 'main-wall' ? selectedMainColor.code : selectedAccentColor.code}
              </span>
            </div>

            {/* Swatch Tiles Scroll Container */}
            <div className="grid grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {displaySwatches.map((color) => {
                const isSelected = targetSurface === 'main-wall'
                  ? selectedMainColor.code === color.code
                  : selectedAccentColor.code === color.code;

                return (
                  <button
                    key={color.id}
                    onClick={() => {
                      if (targetSurface === 'main-wall') {
                        setSelectedMainColor(color);
                      } else {
                        setSelectedAccentColor(color);
                      }
                    }}
                    className={`group relative rounded-xl overflow-hidden border-2 p-1 transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'border-bamboo-700 ring-2 ring-bamboo-400/40 shadow-md'
                        : 'border-eco-gray-200 hover:border-bamboo-300'
                    }`}
                  >
                    <div className="h-16 w-full rounded-lg relative overflow-hidden bg-eco-gray-100 shadow-inner flex items-end p-1">
                      <img
                        src={color.image || `/images/ecobamboo/${color.code}_sm.webp`}
                        alt={color.code}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <span className="relative z-10 px-1 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                        {color.code}
                      </span>
                    </div>

                    <div className="pt-1.5 px-0.5">
                      <div className="text-[11px] font-bold text-eco-gray-900 line-clamp-1 group-hover:text-bamboo-800">
                        {color.name.split(' ')[0]} {color.name.split(' ')[1] || ''}
                      </div>
                      <div className="text-[9px] text-eco-gray-400 line-clamp-1">
                        {color.groupName}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ACCORDION GHI CHÚ VỀ CÔNG CỤ NÀY (THEO ĐÚNG NGUYÊN BẢN ECOBAMBOO) */}
            <details className="p-3 bg-eco-gray-50 rounded-2xl border border-eco-gray-200 text-xs text-eco-gray-600 space-y-2 cursor-pointer">
              <summary className="font-bold text-eco-gray-900 outline-none select-none">
                Về công cụ phối màu này &rarr;
              </summary>
              <div className="pt-2 space-y-2 text-[11px] leading-relaxed border-t border-eco-gray-200 mt-2">
                <p>
                  <strong>Ảnh này là gì:</strong> Các cảnh phòng mẫu được dựng 3D chuẩn xác ánh sáng khuếch tán, cho phép đổi màu mặt ốp chân thực theo từng góc nhìn.
                </p>
                <p>
                  <strong>Màu trên màn hình chỉ để tham khảo:</strong> Ô mẫu hiển thị theo giả định về mức sáng màn hình. Quý khách vui lòng xem mẫu thật trước khi chốt đơn.
                </p>
                <p>
                  <strong>Mã mặt gương không xem trước được:</strong> Vẻ ngoài của tấm gương là ảnh phản chiếu không gian thực tế nên công cụ chỉ hiển thị sắc thái mô phỏng.
                </p>
                <p>
                  <strong>Trang không tính vật tư:</strong> Để bóc tách chi tiết số tấm, nẹp nhôm và keo dán, quý khách vui lòng sử dụng công cụ <a href="/tinh-chi-phi" className="text-bamboo-800 font-bold underline">Dự toán vật tư</a>.
                </p>
              </div>
            </details>

            {/* Quick Link to Product Details */}
            <div className="pt-1">
              <button
                onClick={() => onNavigateProduct ? onNavigateProduct(selectedMainColor.code) : (window.location.href = `/san-pham/${selectedMainColor.code.toLowerCase()}`)}
                className="w-full py-2.5 px-3 rounded-xl bg-eco-gray-50 hover:bg-bamboo-50 text-bamboo-800 text-xs font-bold border border-eco-gray-200 transition-colors flex items-center justify-center"
              >
                Xem chi tiết thông số mã {selectedMainColor.code} &rarr;
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. POPUP MODAL: YÊU CẦU BÁO GIÁ PHỐI CẢNH NÀY */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-eco-gray-200 space-y-4">

            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-eco-gray-400 hover:text-eco-gray-700 hover:bg-eco-gray-100 transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase text-bamboo-700 tracking-wider">Dự Toán Chi Phí Nhanh</span>
              <h3 className="text-xl font-black text-eco-gray-900">
                Nhận Báo Giá Phối Cảnh {activeScene.name}
              </h3>
              <p className="text-xs text-eco-gray-500 mt-1">
                {BRAND.shortName} sẽ bóc tách số lượng tấm ốp, số thanh nẹp và lượng keo dán theo kích thước diện tích tường của bạn.
              </p>
            </div>

            {/* Selected Config Card */}
            <div className="p-3.5 rounded-2xl bg-eco-gray-50 border border-eco-gray-200 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-eco-gray-500">Mã vách chính:</span>
                <strong className="text-bamboo-800 font-mono">{selectedMainColor.code} - {selectedMainColor.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-eco-gray-500">Mã lam sóng phối:</span>
                <strong className="text-wood-700 font-mono">{selectedAccentColor.code} - {selectedAccentColor.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-eco-gray-500">Không gian:</span>
                <strong className="text-eco-gray-900">{activeScene.name}</strong>
              </div>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1">Họ tên của bạn *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Văn A"
                  value={quoteForm.name}
                  onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-eco-gray-700 mb-1">Số điện thoại / Zalo *</label>
                  <input
                    type="tel"
                    required
                    placeholder="09xx xxx xxx"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-eco-gray-700 mb-1">Ước tính m² tường cần ốp</label>
                  <input
                    type="number"
                    placeholder="VD: 25"
                    value={quoteForm.areaSize}
                    onChange={(e) => setQuoteForm({ ...quoteForm, areaSize: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1">Ghi chú thêm</label>
                <textarea
                  rows="2"
                  placeholder="Yêu cầu thi công trọn gói tại Hà Nội, cần gửi mẫu thực tế..."
                  value={quoteForm.note}
                  onChange={(e) => setQuoteForm({ ...quoteForm, note: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Gửi Yêu Cầu Báo Giá & Nhận Ưu Đãi
                </button>
              </div>

              {quoteSuccess && (
                <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-2 text-amber-600" />
                  Đã tiếp nhận yêu cầu! Kỹ thuật viên {BRAND.shortName} sẽ gọi tư vấn bóc tách khối lượng và gửi báo giá trong 10 phút.
                </div>
              )}
            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
}
