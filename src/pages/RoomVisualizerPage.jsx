import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { COLOR_ITEMS } from './ColorLibraryPage';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const Share2Icon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
  </svg>
);

const DownloadIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const SunIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

const MoonIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const CalculatorIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2"/>
    <line x1="8" x2="16" y1="6" y2="6"/>
  </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

// ROOM SCENES DATA
const ROOM_SCENES = [
  {
    id: 'living-room',
    name: 'Phòng Khách (Vách TV & Lam Sóng)',
    subtitle: 'Không gian mở tiếp khách hiện đại',
    description: 'Vách chính diện sau kệ TV kết hợp lam sóng trang trí và hệ đèn hắt LED.',
    defaultColor: 'EB89030G',
    fluteColor: 'EB66450',
  },
  {
    id: 'bedroom',
    name: 'Phòng Ngủ Master (Vách Đầu Giường)',
    subtitle: 'Không gian nghỉ ngơi thư thái',
    description: 'Vách ốp than tre uốn cong bo tròn cách âm chuẩn an toàn E0 không mùi.',
    defaultColor: 'EB66006',
    fluteColor: 'EB68019',
  },
  {
    id: 'lobby',
    name: 'Sảnh Đón / Quầy Bar Lễ Tân',
    subtitle: 'Không gian thương mại cao cấp',
    description: 'Vách ốp tráng gương và vân đá lớn tạo ấn tượng thị giác cho đối tác.',
    defaultColor: 'EB69001G',
    fluteColor: 'EB89099G',
  }
];

// ==========================================
// ROOM VISUALIZER PAGE COMPONENT
// ==========================================
export default function RoomVisualizerPage({ initialCode = 'EB66006', onNavigateProduct }) {
  // Current space scene
  const [activeScene, setActiveScene] = useState(ROOM_SCENES[0]);

  // Selected main wall color object
  const [selectedMainColor, setSelectedMainColor] = useState(
    COLOR_ITEMS.find(c => c.code === initialCode) || COLOR_ITEMS[0]
  );

  // Selected secondary accent/lam song color object
  const [selectedAccentColor, setSelectedAccentColor] = useState(
    COLOR_ITEMS.find(c => c.code === 'EB66450') || COLOR_ITEMS[2]
  );

  // Lighting mode: 'day' | 'night'
  const [lightingMode, setLightingMode] = useState('night');

  // Active Tab for Palette: 'main-wall' | 'accent-flute'
  const [targetSurface, setTargetSurface] = useState('main-wall');

  // Filter category in palette sidebar
  const [paletteCategory, setPaletteCategory] = useState('all');

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
    showToast(`Đang tải ảnh cấu hình phối cảnh ${selectedMainColor.code} - ${activeScene.name}...`);
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

  // Filtered swatches for current category tab
  const displaySwatches = paletteCategory === 'all'
    ? COLOR_ITEMS
    : COLOR_ITEMS.filter(c => c.category.includes(paletteCategory) || c.category === paletteCategory);

  return (
    <MainLayout>
      {/* 1. TOP CONTROL BAR */}
      <div className="bg-eco-gray-900 text-white border-b border-eco-gray-800 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">

          {/* Breadcrumb / Title */}
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                Trực Quan Hóa 3D Không Gian
              </span>
              <h1 className="text-sm sm:text-base font-extrabold text-white">
                Eco Bamboo Room Visualizer
              </h1>
            </div>
          </div>

          {/* Scene Switcher buttons */}
          <div className="flex items-center bg-eco-gray-800 p-1 rounded-xl border border-eco-gray-700">
            {ROOM_SCENES.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setActiveScene(scene)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeScene.id === scene.id
                    ? 'bg-bamboo-600 text-white shadow'
                    : 'text-gray-300 hover:text-white hover:bg-eco-gray-700'
                }`}
              >
                {scene.name.split(' ')[0]} {scene.name.split(' ')[1]}
              </button>
            ))}
          </div>

          {/* Lighting Mode & Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLightingMode(lightingMode === 'day' ? 'night' : 'day')}
              className="px-3 py-1.5 rounded-lg bg-eco-gray-800 hover:bg-eco-gray-700 text-xs font-bold text-gray-200 border border-eco-gray-700 flex items-center transition-colors"
              title="Đổi chế độ ánh sáng ban ngày / ban đêm"
            >
              {lightingMode === 'day' ? (
                <>
                  <SunIcon className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  Ban Ngày
                </>
              ) : (
                <>
                  <MoonIcon className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                  Đèn Hắt Đêm
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-eco-gray-800 hover:bg-eco-gray-700 text-gray-200 border border-eco-gray-700 transition-colors"
              title="Chia sẻ phối cảnh"
            >
              <Share2Icon className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-eco-gray-800 hover:bg-eco-gray-700 text-gray-200 border border-eco-gray-700 transition-colors"
              title="Tải ảnh phối cảnh"
            >
              <DownloadIcon className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* TOAST ALERT NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-eco-gray-900 text-white px-5 py-2.5 rounded-2xl shadow-2xl border border-bamboo-500 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. MAIN WORKSPACE: SCENE VIEWPORT (LEFT) + COLOR PALETTE DOCK (RIGHT) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* KHUNG HIỂN THỊ KHÔNG GIAN 3D (8 Cột) */}
          <div className="lg:col-span-8 space-y-4">

            {/* Viewport Box */}
            <div className={`relative rounded-3xl overflow-hidden border border-eco-gray-300 shadow-2xl aspect-[16/10] sm:aspect-[16/9] transition-all duration-500 ${
              lightingMode === 'day' ? 'bg-[#f4f7f6]' : 'bg-[#121619]'
            }`}>

              {/* VÁCH CHÍNH TRONG KHÔNG GIAN (DYNAMIC ACCENT WALL) */}
              <div
                className={`absolute inset-x-10 top-6 bottom-20 rounded-2xl ${selectedMainColor.bgStyle || 'bg-stone-800'} transition-all duration-700 shadow-2xl flex flex-col justify-between p-6 overflow-hidden`}
              >
                {/* Real Texture / Room Image Underlay */}
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

                {/* Subtle vertical joints (mạch ghép tấm 1220mm) */}
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
                  {/* Fluted wave ridges */}
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

                {/* Perspective Furniture Overlay (Mô phỏng kệ Tivi / Sofa / Vách) */}
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

                  {activeScene.id === 'lobby' && (
                    <div className="w-3/4 h-16 sm:h-22 bg-gradient-to-r from-neutral-900 via-zinc-800 to-neutral-900 rounded-t-xl shadow-2xl border-t border-amber-400/40 flex items-center justify-center text-gray-300 text-xs">
                      <span className="text-[10px] font-bold tracking-widest uppercase">Quầy Lễ Tân Khách Sạn</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Sàn nhà (Floor) */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-stone-800 to-stone-950 border-t border-white/10 flex items-center justify-center">
                <span className="text-[11px] text-gray-500 font-mono">Sàn Gỗ Xương Cá Tự Nhiên</span>
              </div>

            </div>

            {/* Room Specs & Details Bar */}
            <div className="bg-white rounded-2xl border border-eco-gray-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs text-eco-gray-500">Phối màu không gian:</div>
                <div className="text-sm font-extrabold text-eco-gray-900">
                  Vách chính: <span className="text-bamboo-800 font-mono">{selectedMainColor.code}</span> ({selectedMainColor.name}) + Lam sóng: <span className="text-wood-700 font-mono">{selectedAccentColor.code}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center"
                >
                  <CalculatorIcon className="w-4 h-4 mr-1.5" />
                  Yêu Cầu Báo Giá Màu Này
                </button>
              </div>
            </div>

          </div>

          {/* THANH CHỌN BẢNG MÀU BÊN CẠNH (4 Cột) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-eco-gray-200 p-5 shadow-soft space-y-5">

            {/* Header dock */}
            <div>
              <span className="text-[10px] font-bold uppercase text-bamboo-700 tracking-wider">Bộ Công Cụ Chọn Màu</span>
              <h3 className="text-base font-extrabold text-eco-gray-900">Bảng Swatch Màu Trực Quan</h3>
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

            {/* Quick group filter tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              <button
                onClick={() => setPaletteCategory('all')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                  paletteCategory === 'all' ? 'bg-bamboo-700 text-white' : 'bg-eco-gray-100 text-eco-gray-600 hover:bg-eco-gray-200'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setPaletteCategory('van-go')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                  paletteCategory === 'van-go' ? 'bg-bamboo-700 text-white' : 'bg-eco-gray-100 text-eco-gray-600 hover:bg-eco-gray-200'
                }`}
              >
                Vân Gỗ
              </button>
              <button
                onClick={() => setPaletteCategory('van-da')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                  paletteCategory === 'van-da' ? 'bg-bamboo-700 text-white' : 'bg-eco-gray-100 text-eco-gray-600 hover:bg-eco-gray-200'
                }`}
              >
                Vân Đá
              </button>
              <button
                onClick={() => setPaletteCategory('don-sac')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                  paletteCategory === 'don-sac' ? 'bg-bamboo-700 text-white' : 'bg-eco-gray-100 text-eco-gray-600 hover:bg-eco-gray-200'
                }`}
              >
                Đơn Sắc
              </button>
              <button
                onClick={() => setPaletteCategory('kim-loai')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                  paletteCategory === 'kim-loai' ? 'bg-bamboo-700 text-white' : 'bg-eco-gray-100 text-eco-gray-600 hover:bg-eco-gray-200'
                }`}
              >
                Kim Loại
              </button>
            </div>

            {/* Current Target Indicator */}
            <div className="p-2.5 rounded-xl bg-bamboo-50/80 border border-bamboo-200 text-xs flex items-center justify-between">
              <span className="text-eco-gray-600">
                Đang đổi màu: <strong className="text-bamboo-900">{targetSurface === 'main-wall' ? 'Vách ốp phẳng chính' : 'Hệ lam sóng trang trí'}</strong>
              </span>
              <span className="text-[10px] font-mono font-bold text-bamboo-700">
                {targetSurface === 'main-wall' ? selectedMainColor.code : selectedAccentColor.code}
              </span>
            </div>

            {/* Swatch Tiles Scroll Container */}
            <div className="grid grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
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
                    {/* Visual square swatch */}
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

            {/* Quick Link to Product Details */}
            <div className="pt-2 border-t border-eco-gray-100">
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
                Eco Bamboo sẽ bóc tách số lượng tấm ốp, số thanh nẹp và lượng keo dán theo kích thước diện tích tường của bạn.
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
                    placeholder="0915..."
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
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-2 text-emerald-600" />
                  Đã tiếp nhận yêu cầu! Kỹ thuật viên Eco Bamboo sẽ gọi tư vấn bóc tách khối lượng và gửi báo giá trong 10 phút.
                </div>
              )}
            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
}
