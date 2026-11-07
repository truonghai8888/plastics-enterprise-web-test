import React, { useState, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const EyeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
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

const GiftIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect width="20" height="5" x="2" y="7"/>
    <line x1="12" x2="12" y1="22" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const LayersIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

import colorItems from '../data/colorItems.json';
import BRAND, { resolveBrandAssetUrl } from '../config/brandConfig';

// ==========================================
// DANH MỤC NHÓM MÀU CHUẨN ECOBAMBOO
// ==========================================
export const COLOR_CATEGORIES = [
  { id: 'all', name: 'Tất cả mã màu', count: 137 },
  { id: 'van-go', name: 'Vân gỗ', count: 25 },
  { id: 'van-da', name: 'Vân đá', count: 31 },
  { id: 'van-vai', name: 'Vân vải & vân da', count: 16 },
  { id: 'don-sac-matte', name: 'Đơn sắc Skin PET-G', count: 10 },
  { id: 'don-sac-glossy', name: 'Tráng gương & Bóng', count: 7 },
  { id: 'kim-loai', name: 'Vân kim loại', count: 12 },
  { id: 'lam-song', name: 'Lam sóng than tre', count: 15 },
  { id: 'nep', name: 'Nẹp nhôm hoàn thiện', count: 21 },
];

export const COLOR_ITEMS = colorItems;

// ==========================================
// COLOR LIBRARY PAGE COMPONENT
// ==========================================
export default function ColorLibraryPage({ onOpenVisualizer }) {
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModalItem, setSelectedModalItem] = useState(null);

  // Filter items
  const filteredColors = useMemo(() => {
    return COLOR_ITEMS.filter((item) => {
      const matchCategory = selectedGroup === 'all' || item.category === selectedGroup;
      const matchSearch = searchQuery.trim() === '' ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.groupName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-14 border-b border-bamboo-800 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute right-10 top-0 w-96 h-96 bg-bamboo-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Thư Viện Mã Màu & Bề Mặt Chuẩn {BRAND.shortName}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Khám Phá Hơn 160+ Mã Bề Mặt Tấm Ốp
            </h1>

            <p className="text-sm sm:text-base text-eco-gray-200 leading-relaxed font-light">
              Mỗi mã màu được nghiên cứu và tinh chỉnh kỹ lưỡng: Từ hiệu ứng tráng gương phản chiếu, bề mặt Skin PETG siêu mịn kháng bám vân tay, đến thớ gỗ tự nhiên dập nổi 3D.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenVisualizer ? onOpenVisualizer('EB66006') : (window.location.href = '/thu-vien-ma-mau/phoi-mau')}
                className="px-5 py-2.5 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-soft hover:shadow-hover transition-all flex items-center hover:scale-105"
              >
                <LayersIcon className="w-4 h-4 mr-2" />
                Vào Trình Phối Màu Phòng (Room Visualizer) &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER TABS & SEARCH BAR */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-eco-gray-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

            {/* Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {COLOR_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedGroup(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedGroup === cat.id
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-eco-gray-100 hover:bg-amber-50 hover:text-amber-900 text-eco-gray-700'
                  }`}
                >
                  {cat.name}
                  <span className={`ml-1.5 text-[10px] ${selectedGroup === cat.id ? 'text-amber-100' : 'text-eco-gray-400'}`}>
                    ({cat.count})
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full lg:w-72 shrink-0">
              <input
                type="text"
                placeholder="Tìm mã màu (VD: EB66006, vân đá...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-eco-gray-50 border border-eco-gray-200 focus:outline-none focus:border-bamboo-600 focus:bg-white transition-colors"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-eco-gray-400" />
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
        </div>
      </div>

      {/* 3. COLOR SWATCHES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-eco-gray-900 tracking-tight">
              Bảng Mẫu Mã Màu Tấm Ốp Than Tre
            </h2>
            <p className="text-xs text-eco-gray-500 mt-0.5">
              Nhấp vào từng ô màu để xem cận cảnh độ bóng, bề mặt texture và thử nghiệm phối cảnh phòng.
            </p>
          </div>

          <span className="text-xs font-bold text-eco-gray-600 bg-eco-gray-100 px-3 py-1.5 rounded-lg">
            Hiển thị {filteredColors.length} mã màu
          </span>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {filteredColors.map((color) => (
            <div
              key={color.id}
              onClick={() => setSelectedModalItem(color)}
              className="group cursor-pointer rounded-2xl bg-white border border-eco-gray-200 overflow-hidden shadow-soft hover:shadow-card hover:border-bamboo-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Texture Swatch Box */}
                <div className="h-44 w-full relative p-3 flex flex-col justify-between overflow-hidden shadow-inner bg-eco-gray-100">
                  <img
                    src={resolveBrandAssetUrl(color.image || `/images/ecobamboo/${color.code}_sm.webp`)}
                    alt={color.code}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className={`absolute inset-0 ${color.bgStyle || 'bg-bamboo-900'} -z-10`} />

                  {/* Top indicators */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono text-xs font-bold backdrop-blur-md">
                      {color.code}
                    </span>
                    {color.popular && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[10px] font-black uppercase">
                        Hot
                      </span>
                    )}
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white text-bamboo-800 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <EyeIcon className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Bottom category tag */}
                  <div className="z-10 flex justify-between items-end">
                    <span className="text-[10px] font-semibold text-white/90 drop-shadow">
                      {color.groupName}
                    </span>
                    <span className="text-[9px] bg-black/40 text-amber-400 px-1.5 py-0.5 rounded backdrop-blur-sm">
                      {color.finishType.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Swatch Information */}
                <div className="p-3.5 space-y-1">
                  <div className="font-mono text-xs font-bold text-bamboo-700">
                    {color.code}
                  </div>
                  <h3 className="text-xs font-bold text-eco-gray-900 group-hover:text-bamboo-800 transition-colors line-clamp-1">
                    {color.name}
                  </h3>
                  <div className="text-[10px] text-eco-gray-400 line-clamp-1">
                    Độ bóng: {color.glossLevel}
                  </div>
                </div>
              </div>

              {/* Action pill */}
              <div className="px-3.5 pb-3 pt-1 border-t border-eco-gray-100 flex items-center justify-between text-[11px] font-bold text-bamboo-700 group-hover:text-bamboo-900">
                <span>Xem chi tiết</span>
                <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 4. MODAL XEM CẬN CẢNH ĐỘ BÓNG & TEXTURE */}
      {selectedModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-eco-gray-200 space-y-6">

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-eco-gray-200 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-extrabold text-sm text-bamboo-700 bg-bamboo-50 px-2.5 py-1 rounded border border-bamboo-200">
                    {selectedModalItem.code}
                  </span>
                  <span className="text-xs font-bold text-eco-gray-500 uppercase tracking-wider">
                    {selectedModalItem.groupName}
                  </span>
                </div>
                <h3 className="text-xl font-black text-eco-gray-900 mt-1">
                  {selectedModalItem.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedModalItem(null)}
                className="p-1 rounded-full text-eco-gray-400 hover:text-eco-gray-700 hover:bg-eco-gray-100 transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated High-Res Texture Canvas */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-eco-gray-200 shadow-inner group bg-eco-gray-900">
              <img
                src={resolveBrandAssetUrl(selectedModalItem.fullImage || selectedModalItem.image || `/images/ecobamboo/${selectedModalItem.code}-w800.webp`)}
                alt={selectedModalItem.code}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = resolveBrandAssetUrl(selectedModalItem.image || `/images/ecobamboo/${selectedModalItem.code}_sm.webp`);
                }}
              />
              <div className="relative z-10 w-full h-full flex flex-col justify-between p-5 bg-gradient-to-t from-black/80 via-transparent to-black/40">
                <div className="flex justify-between items-center text-white">
                  <span className="px-2.5 py-1 rounded bg-black/60 text-xs font-mono backdrop-blur-md">
                    Cận Cảnh Bề Mặt: {selectedModalItem.code}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-bamboo-700/90 text-xs font-bold shadow">
                    Phủ PETG Chuẩn E0
                  </span>
                </div>

                {/* Glare / Lighting simulator */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>

                <div className="text-white text-xs bg-black/60 backdrop-blur-md p-3 rounded-xl max-w-sm space-y-0.5">
                  <div className="font-bold text-amber-400">{selectedModalItem.finishType}</div>
                  <div className="text-gray-300 text-[11px]">{selectedModalItem.textureDesc}</div>
                </div>
              </div>
            </div>

            {/* Thông số kỹ thuật nhanh */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200">
                <span className="text-[10px] text-eco-gray-500 uppercase font-bold block">Chỉ số độ bóng</span>
                <strong className="text-eco-gray-900">{selectedModalItem.glossLevel}</strong>
              </div>
              <div className="p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200">
                <span className="text-[10px] text-eco-gray-500 uppercase font-bold block">Gợi ý nẹp nhôm</span>
                <strong className="text-bamboo-800">{selectedModalItem.matchingColor}</strong>
              </div>
              <div className="p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-eco-gray-500 uppercase font-bold block">Khổ tấm khả dụng</span>
                <strong className="text-eco-gray-900">1220x2800 (5, 8, 17mm)</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setSelectedModalItem(null);
                  if (onOpenVisualizer) {
                    onOpenVisualizer(selectedModalItem.code);
                  } else {
                    window.location.href = `/thu-vien-ma-mau/phoi-mau?code=${selectedModalItem.code}`;
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-hover transition-all flex items-center justify-center"
              >
                <LayersIcon className="w-4 h-4 mr-2" />
                Thử Phối Cảnh Phòng Ngay &rarr;
              </button>

              <a
                href={`tel:${BRAND.hotline.replace(/\./g, '')}`}
                className="w-full py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-400 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center text-center"
              >
                Nhận Mẫu Thử Mã Này ({BRAND.hotlineDisplay})
              </a>
            </div>

          </div>
        </div>
      )}

    </MainLayout>
  );
}
