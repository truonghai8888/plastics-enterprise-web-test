import React, { useState, useMemo, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { PRODUCTS, CATEGORY_FILTERS, SURFACE_FILTERS, THICKNESS_FILTERS } from '../data/products';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const FilterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
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

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

// ==========================================
// CATEGORY PAGE COMPONENT
// ==========================================
export default function CategoryPage({ onSelectProduct, initialCategory = 'all' }) {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSurface, setSelectedSurface] = useState('all');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Modal State for "Nhận Mẫu Thử"
  const [sampleModalProduct, setSampleModalProduct] = useState(null);
  const [sampleForm, setSampleForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [sampleSuccess, setSampleSuccess] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedSurface !== 'all') {
      result = result.filter(p => p.surfaceGroup === selectedSurface);
    }

    if (selectedThickness) {
      result = result.filter(p => p.thicknessOptions.includes(selectedThickness));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.code.toLowerCase().includes(q) || 
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePerM2 - b.pricePerM2);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePerM2 - a.pricePerM2);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.code.localeCompare(b.code));
    }

    return result;
  }, [selectedCategory, selectedSurface, selectedThickness, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSurface('all');
    setSelectedThickness('');
    setSearchQuery('');
    setSortBy('featured');
  };

  const handleSampleSubmit = (e) => {
    e.preventDefault();
    if (sampleForm.name && sampleForm.phone) {
      setSampleSuccess(true);
      setTimeout(() => {
        setSampleSuccess(false);
        setSampleModalProduct(null);
        setSampleForm({ name: '', phone: '', address: '', note: '' });
      }, 3500);
    }
  };

  return (
    <MainLayout>
      {/* 1. BREADCRUMB & HEADER BANNER */}
      <div className="bg-white border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-eco-gray-500 mb-3">
            <a href="/" className="hover:text-bamboo-700 transition-colors">Trang chủ</a>
            <ChevronRightIcon className="w-3.5 h-3.5 text-eco-gray-400" />
            <a href="/san-pham-chinh" className="hover:text-bamboo-700 transition-colors">Sản phẩm chính</a>
            <ChevronRightIcon className="w-3.5 h-3.5 text-eco-gray-400" />
            <span className="text-bamboo-800 font-bold">
              {CATEGORY_FILTERS.find(c => c.id === selectedCategory)?.name || 'Tất cả sản phẩm'}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-eco-gray-900 tracking-tight">
                {CATEGORY_FILTERS.find(c => c.id === selectedCategory)?.name || `Danh Mục Sản Phẩm Chính ${BRAND.brandName}`}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-eco-gray-500 max-w-2xl leading-relaxed">
                Các mã màu chính hãng từ dòng vân gỗ EB66006, đơn sắc White EB68038, Glossy Grey EB68032G đến vân đá Calacatta EB89019G chuẩn E0 Châu Âu.
              </p>
            </div>

            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-bamboo-50 text-bamboo-800 border border-bamboo-200 text-xs font-bold"
            >
              <FilterIcon className="mr-2 w-4 h-4 text-bamboo-600" />
              Bộ lọc phân loại ({filteredProducts.length})
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR BỘ LỌC (3 Cột) */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border border-eco-gray-200 p-5 shadow-sm space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-3 border-b border-eco-gray-200">
                <span className="text-sm font-extrabold text-eco-gray-900 flex items-center">
                  <FilterIcon className="w-4 h-4 mr-2 text-bamboo-700" />
                  Bộ Lọc Sản Phẩm
                </span>
                {(selectedCategory !== 'all' || selectedSurface !== 'all' || selectedThickness || searchQuery) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-bamboo-700 hover:text-bamboo-900 font-semibold"
                  >
                    Đặt lại
                  </button>
                )}
              </div>

              {/* Nhóm phân loại chính */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-eco-gray-700 uppercase tracking-wider block">
                  Danh Mục Vật Liệu
                </label>
                <div className="space-y-1">
                  {CATEGORY_FILTERS.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-bamboo-100/80 text-bamboo-900 font-bold'
                          : 'text-eco-gray-600 hover:bg-eco-gray-50'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2.5 ${selectedCategory === cat.id ? 'bg-bamboo-600' : 'bg-eco-gray-300'}`} />
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-eco-gray-400">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dòng vân bề mặt */}
              <div className="space-y-2 pt-4 border-t border-eco-gray-100">
                <label className="text-xs font-bold text-eco-gray-700 uppercase tracking-wider block">
                  Dòng Bề Mặt
                </label>
                <div className="space-y-1">
                  {SURFACE_FILTERS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSurface(s.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                        selectedSurface === s.id
                          ? 'bg-wood-100 text-wood-900 font-bold'
                          : 'text-eco-gray-600 hover:bg-eco-gray-50'
                      }`}
                    >
                      <span>{s.name}</span>
                      {selectedSurface === s.id && <CheckIcon className="w-4 h-4 text-wood-700" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Độ dày */}
              <div className="space-y-2 pt-4 border-t border-eco-gray-100">
                <label className="text-xs font-bold text-eco-gray-700 uppercase tracking-wider block">
                  Độ Dày Tấm
                </label>
                <div className="space-y-1.5">
                  {THICKNESS_FILTERS.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => setSelectedThickness(selectedThickness === th.id ? '' : th.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                        selectedThickness === th.id
                          ? 'bg-bamboo-100 text-bamboo-900 font-bold'
                          : 'text-eco-gray-600 hover:bg-eco-gray-50'
                      }`}
                    >
                      <span>{th.name}</span>
                      {selectedThickness === th.id && <CheckIcon className="w-4 h-4 text-bamboo-700" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cam kết nhà máy */}
              <div className="p-4 rounded-xl bg-bamboo-50/70 border border-bamboo-200/80 text-xs space-y-1.5 text-eco-gray-700">
                <div className="font-bold text-bamboo-900 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                  Bảo Hành Chính Hãng 10 Năm
                </div>
                <p className="text-[11px] text-eco-gray-600 leading-relaxed">
                  Bảng giá niêm yết công khai theo sản lượng. Không qua trung gian.
                </p>
              </div>

            </div>
          </aside>

          {/* MAIN PRODUCT GRID (9 Cột) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Toolbar */}
            <div className="bg-white rounded-2xl border border-eco-gray-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm mã (VD: EB66006, EB68038, EB89019G...)"
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-eco-gray-50 border border-eco-gray-200 focus:outline-none focus:border-bamboo-600 focus:bg-white"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-eco-gray-400 w-4 h-4" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-eco-gray-400 hover:text-eco-gray-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-3 text-xs">
                <span className="text-eco-gray-500">
                  Hiển thị <strong className="text-eco-gray-900">{filteredProducts.length}</strong> sản phẩm
                </span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-eco-gray-200 bg-white text-xs font-semibold text-eco-gray-800 focus:outline-none focus:border-bamboo-600"
                >
                  <option value="featured">Nổi bật nhất</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="name-asc">Mã sản phẩm (A - Z)</option>
                </select>
              </div>
            </div>

            {/* Product Cards */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="rounded-2xl bg-white border border-eco-gray-200/90 overflow-hidden shadow-soft hover:shadow-card hover:border-bamboo-400 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Swatch Image Banner with Real Photo */}
                      <div className="h-52 w-full bg-eco-gray-100 relative overflow-hidden">
                        <img
                          src={prod.image || prod.swatchImage}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="px-2.5 py-0.5 rounded bg-black/60 text-white font-mono font-bold text-xs backdrop-blur-md">
                            {prod.code}
                          </span>
                        </div>
                        <div className="absolute top-2.5 right-2.5 z-10">
                          <span className="px-2 py-0.5 rounded bg-bamboo-800/90 text-white font-semibold text-[10px] backdrop-blur-md">
                            {prod.badge}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                          <span className="px-3 py-1.5 bg-white/95 text-bamboo-900 font-bold text-xs rounded-xl shadow-md">
                            Xem chi tiết thớ vân &rarr;
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 z-10">
                          <span className="px-2 py-0.5 rounded bg-black/70 text-white font-extrabold text-[11px] backdrop-blur-md">
                            {prod.priceFormatted}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-bamboo-700">Mã: {prod.code}</span>
                          <span className="text-emerald-700 font-bold text-[11px]">{prod.priceFormatted}</span>
                        </div>

                        <h3 className="text-sm font-bold text-eco-gray-900 group-hover:text-bamboo-800 transition-colors line-clamp-2 leading-snug">
                          {prod.name}
                        </h3>

                        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-eco-gray-100 text-eco-gray-700 font-medium">
                            Khổ: {prod.dimensions}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-wood-100 text-wood-800 font-medium">
                            Dày: {prod.thicknessOptions.join(', ')}
                          </span>
                        </div>

                        <p className="text-xs text-eco-gray-500 line-clamp-2 leading-relaxed pt-1">
                          {prod.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-4 pt-0 border-t border-eco-gray-100 mt-2 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProduct ? onSelectProduct(prod) : (window.location.href = prod.url)}
                        className="w-full py-2 px-3 rounded-xl bg-eco-gray-100 hover:bg-bamboo-50 text-eco-gray-800 hover:text-bamboo-800 text-xs font-bold transition-colors text-center"
                      >
                        Chi Tiết
                      </button>

                      <button
                        onClick={() => setSampleModalProduct(prod)}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center"
                      >
                        <GiftIcon className="w-3.5 h-3.5 mr-1" />
                        Nhận Mẫu
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white border border-eco-gray-200 p-12 text-center space-y-3">
                <h3 className="text-base font-bold text-eco-gray-900">Không tìm thấy mã sản phẩm phù hợp</h3>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-bamboo-700 text-white text-xs font-bold"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* SAMPLE MODAL */}
      {sampleModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-eco-gray-200">
            <button
              onClick={() => setSampleModalProduct(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-eco-gray-400 hover:text-eco-gray-700"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-bamboo-100 text-bamboo-700 flex items-center justify-center">
                <GiftIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-bamboo-600">Sample Box Miễn Phí</span>
                <h3 className="text-lg font-black text-eco-gray-900">
                  Nhận Mẫu Cắt Thực Tế Mã {sampleModalProduct.code}
                </h3>
              </div>
            </div>

            <form onSubmit={handleSampleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-eco-gray-700 mb-1">Họ tên của bạn *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Anh Nam - Kiến trúc sư"
                  value={sampleForm.name}
                  onChange={(e) => setSampleForm({ ...sampleForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-eco-gray-300"
                />
              </div>

              <div>
                <label className="block font-bold text-eco-gray-700 mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  placeholder="0915..."
                  value={sampleForm.phone}
                  onChange={(e) => setSampleForm({ ...sampleForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-eco-gray-300"
                />
              </div>

              <div>
                <label className="block font-bold text-eco-gray-700 mb-1">Địa chỉ nhận mẫu *</label>
                <input
                  type="text"
                  required
                  placeholder="Số nhà, đường, quận/huyện, tỉnh thành..."
                  value={sampleForm.address}
                  onChange={(e) => setSampleForm({ ...sampleForm, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-eco-gray-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-bamboo text-white font-extrabold uppercase"
              >
                Gửi Yêu Cầu Giao Mẫu
              </button>

              {sampleSuccess && (
                <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold">
                  {BRAND.shortName} đã tiếp nhận! Nhân viên điều phối kho sẽ gửi chuyển phát nhanh trong 24h.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
