import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { PRODUCTS } from '../data/products';
import BRAND, { getCurrentYear } from '../config/brandConfig';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const DownloadIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const PhoneCallIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
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

const ShieldCheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const Share2Icon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
  </svg>
);

// ==========================================
// PRODUCT DETAIL PAGE COMPONENT
// ==========================================
export default function ProductDetailPage({ product = PRODUCTS[0], onSelectProduct }) {
  // Current active gallery image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Selected thickness option
  const [selectedThickness, setSelectedThickness] = useState(product.thickness || '8mm');

  // Active Info Tab (Thông số kỹ thuật / Hướng dẫn thi công / Chứng nhận E0)
  const [activeTab, setActiveTab] = useState('specs');

  // Popup Modal for Sample Box
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [sampleForm, setSampleForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [sampleSuccess, setSampleSuccess] = useState(false);

  // Download Catalog Notice
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Gallery items (support array of real image paths)
  const gallery = Array.isArray(product.gallery) && product.gallery.length > 0
    ? product.gallery
    : [product.image || product.swatchImage || '/images/ecobamboo/EB66006-w800.webp'];

  // Related products query
  const relatedProducts = PRODUCTS.filter(p =>
    p.id !== product.id && (p.category === product.category || product.relatedCodes?.includes(p.code))
  ).slice(0, 4);

  const handleSampleSubmit = (e) => {
    e.preventDefault();
    if (sampleForm.name && sampleForm.phone) {
      setSampleSuccess(true);
      setTimeout(() => {
        setSampleSuccess(false);
        setShowSampleModal(false);
        setSampleForm({ name: '', phone: '', address: '', note: '' });
      }, 3500);
    }
  };

  const handleDownloadCatalog = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const currentMainImg = typeof gallery[activeImageIndex] === 'string'
    ? gallery[activeImageIndex]
    : gallery[activeImageIndex]?.src || product.image;

  return (
    <MainLayout>
      {/* 1. BREADCRUMB NAVIGATION */}
      <div className="bg-white border-b border-eco-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-eco-gray-500 flex-wrap">
            <a href="/" className="hover:text-bamboo-700 transition-colors">Trang chủ</a>
            <ChevronRightIcon className="w-3.5 h-3.5 text-eco-gray-400" />
            <a href="/san-pham-chinh" className="hover:text-bamboo-700 transition-colors">Sản phẩm chính</a>
            <ChevronRightIcon className="w-3.5 h-3.5 text-eco-gray-400" />
            <a href="/san-pham-chinh/tam-op-than-tre" className="hover:text-bamboo-700 transition-colors">
              {product.categoryName}
            </a>
            <ChevronRightIcon className="w-3.5 h-3.5 text-eco-gray-400" />
            <span className="text-bamboo-800 font-bold font-mono">{product.code}</span>
          </nav>
        </div>
      </div>

      {/* 2. MAIN PRODUCT SECTION (2 COLUMNS) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* CỘT TRÁI: GALLERY ẢNH PHÓNG TO VÂN BỀ MẶT (6 Cột) */}
          <div className="lg:col-span-6 space-y-4">

            {/* Ảnh chính lớn */}
            <div className="relative rounded-3xl overflow-hidden border border-eco-gray-200 bg-eco-gray-100 shadow-soft aspect-[4/3] flex items-center justify-center group">
              <img
                src={currentMainImg}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />

              {/* Watermark & Tag */}
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md rounded-xl p-3 text-white text-xs space-y-0.5">
                <div className="font-mono font-bold text-amber-400 text-sm">{BRAND.shortName.toUpperCase()} {product.code}</div>
                <div className="text-[11px] text-gray-200">{product.name}</div>
              </div>

              <div className="absolute top-4 right-4 flex space-x-2">
                <span className="px-2.5 py-1 rounded-full bg-black/60 text-white font-mono text-xs font-bold backdrop-blur-md">
                  {product.code}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-bamboo-700 text-white text-xs font-bold shadow">
                  Chuẩn E0 Đức
                </span>
              </div>
            </div>

            {/* Thumbnails selector */}
            <div className="grid grid-cols-5 gap-2.5">
              {gallery.map((img, idx) => {
                const thumbSrc = typeof img === 'string' ? img : img.src || product.swatchImage;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-20 rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-white ${
                      activeImageIndex === idx
                        ? 'border-bamboo-600 shadow-md ring-2 ring-bamboo-400/30'
                        : 'border-eco-gray-200 hover:border-bamboo-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumbSrc}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </button>
                );
              })}
            </div>

            {/* Trust Highlights below gallery */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-white border border-eco-gray-200">
                <div className="font-extrabold text-bamboo-800">100% Chống Nước</div>
                <div className="text-[10px] text-eco-gray-500 mt-0.5">Không ngấm ẩm nồm</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-eco-gray-200">
                <div className="font-extrabold text-bamboo-800">Kháng Cháy B1</div>
                <div className="text-[10px] text-eco-gray-500 mt-0.5">Không cháy lan truyền</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-eco-gray-200">
                <div className="font-extrabold text-wood-700">Keo PUR Đức</div>
                <div className="text-[10px] text-eco-gray-500 mt-0.5">Jowat ép nhiệt tự động</div>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI: THÔNG TIN CHI TIẾT & NÚT HÀNH ĐỘNG (6 Cột) */}
          <div className="lg:col-span-6 space-y-6">

            {/* Header thông tin */}
            <div className="space-y-2 border-b border-eco-gray-200 pb-5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-bamboo-100 text-bamboo-800 font-bold text-xs uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span className="text-xs text-eco-gray-500 font-medium flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
                  {product.inStock ? 'Sẵn hàng tại kho' : 'Đặt sản xuất 3 ngày'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-eco-gray-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              <div className="flex items-center space-x-3 text-xs pt-1">
                <span className="font-mono font-bold text-bamboo-800 bg-bamboo-50 px-2 py-0.5 rounded border border-bamboo-200">
                  Mã màu: {product.code}
                </span>
                <span className="text-eco-gray-400">|</span>
                <span className="text-eco-gray-600">Thương hiệu: <strong>Eco Bamboo</strong></span>
                <span className="text-eco-gray-400">|</span>
                <span className="text-wood-700 font-bold">Bảo hành 10 năm</span>
              </div>
            </div>

            {/* Mô tả ngắn */}
            <p className="text-sm text-eco-gray-600 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Chọn độ dày khả dụng */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-eco-gray-800 uppercase tracking-wider block">
                Chọn độ dày tấm:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.thicknessOptions.map((th) => (
                  <button
                    key={th}
                    onClick={() => setSelectedThickness(th)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedThickness === th
                        ? 'bg-bamboo-700 text-white border-bamboo-700 shadow-sm'
                        : 'bg-white text-eco-gray-700 border-eco-gray-200 hover:border-bamboo-400'
                    }`}
                  >
                    Độ dày {th} {th === '5mm' && '(Uốn cong 90°)'} {th === '17mm' && '(Đóng cánh tủ)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bảng tóm tắt thông số nhanh */}
            <div className="rounded-2xl bg-eco-gray-50/80 border border-eco-gray-200 p-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-eco-gray-200/60">
                <span className="text-eco-gray-500">Khổ tấm tiêu chuẩn:</span>
                <strong className="text-eco-gray-900">{product.dimensions}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-eco-gray-200/60">
                <span className="text-eco-gray-500">Bề mặt hoàn thiện:</span>
                <strong className="text-eco-gray-900">{product.finish}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-eco-gray-200/60">
                <span className="text-eco-gray-500">Cốt vật liệu:</span>
                <strong className="text-eco-gray-900">{product.core}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-eco-gray-500">Kho hàng xuất xưởng:</span>
                <strong className="text-bamboo-800">{product.warehouse}</strong>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Nút Đăng ký nhận mẫu */}
                <button
                  onClick={() => setShowSampleModal(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-hover hover:scale-[1.02] transition-all flex items-center justify-center"
                >
                  <GiftIcon className="w-4 h-4 mr-2" />
                  Đăng Ký Nhận Mẫu Thử
                </button>

                {/* Nút Hotline báo giá dự án */}
                <a
                  href={`tel:${BRAND.hotline.replace(/\./g, '')}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-wood-50 text-wood-800 border-2 border-wood-500 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center shadow-sm"
                >
                  <PhoneCallIcon className="w-4 h-4 mr-2 text-wood-600 animate-pulse" />
                  Báo Giá: {BRAND.hotlineDisplay}
                </a>
              </div>

              {/* Tải Catalogue & Báo giá PDF */}
              <button
                onClick={handleDownloadCatalog}
                className="w-full py-2.5 px-4 rounded-xl bg-eco-gray-100 hover:bg-eco-gray-200 text-eco-gray-700 text-xs font-bold transition-colors flex items-center justify-center"
              >
                <DownloadIcon className="w-4 h-4 mr-1.5 text-bamboo-700" />
                Tải Catalogue & Bản Test Kiểm Định Chất Lượng (PDF)
              </button>

              {downloadSuccess && (
                <div className="p-2.5 rounded-xl bg-bamboo-50 text-bamboo-800 text-xs font-semibold border border-bamboo-200 flex items-center animate-fade-in">
                  <CheckCircleIcon className="w-4 h-4 mr-2 text-bamboo-600" />
                  Đã tải xuống file Catalog {BRAND.brandName} {getCurrentYear()} thành công!
                </div>
              )}
            </div>

          </div>

        </div>

        {/* 3. TABS CHI TIẾT THÔNG SỐ & HƯỚNG DẪN THI CÔNG */}
        <div className="mt-16 bg-white rounded-3xl border border-eco-gray-200 p-6 sm:p-8 shadow-sm">

          {/* Tab Navigation */}
          <div className="flex border-b border-eco-gray-200 space-x-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 transition-colors border-b-2 -mb-px ${
                activeTab === 'specs'
                  ? 'border-bamboo-700 text-bamboo-900'
                  : 'border-transparent text-eco-gray-500 hover:text-eco-gray-800'
              }`}
            >
              Bảng Thông Số Kỹ Thuật
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`pb-3 transition-colors border-b-2 -mb-px ${
                activeTab === 'guide'
                  ? 'border-bamboo-700 text-bamboo-900'
                  : 'border-transparent text-eco-gray-500 hover:text-eco-gray-800'
              }`}
            >
              Kỹ Thuật Soi Rãnh V & Uốn Cong
            </button>
            <button
              onClick={() => setActiveTab('cert')}
              className={`pb-3 transition-colors border-b-2 -mb-px ${
                activeTab === 'cert'
                  ? 'border-bamboo-700 text-bamboo-900'
                  : 'border-transparent text-eco-gray-500 hover:text-eco-gray-800'
              }`}
            >
              Tiêu Chuẩn E0 & Chứng Nhận B1
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h4 className="text-base font-extrabold text-eco-gray-900">
                  Thông Số Kỹ Thuật Chi Tiết - {product.name}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody>
                      {product.specs?.map((sp, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-eco-gray-50/70' : 'bg-white'}>
                          <td className="py-3 px-4 font-bold text-eco-gray-700 w-1/3 border-b border-eco-gray-200/60">
                            {sp.label}
                          </td>
                          <td className="py-3 px-4 text-eco-gray-900 border-b border-eco-gray-200/60">
                            {sp.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="space-y-4 text-xs text-eco-gray-700 leading-relaxed max-w-3xl">
                <h4 className="text-base font-extrabold text-eco-gray-900">
                  Hướng Dẫn Thi Công Tấm Ốp Than Tre Chuẩn Kỹ Thuật
                </h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Chuẩn bị bề mặt cốt tường:</strong> Đảm bảo tường phẳng, sạch bụi hoặc bắn hệ khung xương sắt hộp / thanh gỗ nhựa nếu tường ẩm mốc nặng.</li>
                  <li><strong>Kỹ thuật soi rãnh V 90°:</strong> Sử dụng máy phay cầm tay gắn mũi dao soi hình chữ V 90°. Điều chỉnh cữ ăn sâu chỉ giữ lại lớp film PETG bề mặt (~0.3mm), sau đó bẻ gập vuông góc mà không cần nẹp.</li>
                  <li><strong>Kỹ thuật uốn vòm cong R:</strong> Soi các đường rãnh song song cách nhau 5-10mm ở mặt sau tấm than tre để uốn cong theo các góc bo tròn hoặc cột tròn.</li>
                  <li><strong>Dán keo:</strong> Bôi keo dán chuyên dụng (keo Titebond, keo dán than tre Eco Bamboo) thành hình zíc zắc kèm băng keo xốp 2 mặt định vị tạm thời.</li>
                </ol>
              </div>
            )}

            {activeTab === 'cert' && (
              <div className="space-y-4 text-xs text-eco-gray-700 leading-relaxed max-w-3xl">
                <h4 className="text-base font-extrabold text-eco-gray-900">
                  Cam Kết Chất Lượng & An Toàn Sinh Thái
                </h4>
                <p>
                  Sản phẩm tấm ốp than tre {BRAND.shortName} được kiểm nghiệm định kỳ tại các trung tâm đo lường chất lượng độc lập:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-bamboo-50 border border-bamboo-200">
                    <div className="font-bold text-bamboo-900 text-sm mb-1">Chuẩn Formaldehyde E0</div>
                    <p className="text-[11px] text-eco-gray-600">
                      Nồng độ phát tán Formaldehyde đạt mức ≤ 0.5 mg/L theo chuẩn Châu Âu EN 717-1, an toàn tuyệt đối cho người mẫn cảm và phòng trẻ em.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-wood-50 border border-wood-200">
                    <div className="font-bold text-wood-900 text-sm mb-1">Chống Cháy B1 (GB8624)</div>
                    <p className="text-[11px] text-eco-gray-600">
                      Đạt cấp độ khó bắt lửa B1, khi tiếp xúc ngọn lửa không sinh khói độc hại đặc quánh, tự tắt khi ngắt nguồn lửa.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 4. SẢN PHẨM / MÃ MÀU GỢI Ý CÙNG BỘ SƯU TẬP */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-bamboo-700 uppercase tracking-wider">Cùng Bộ Sưu Tập</span>
              <h3 className="text-xl sm:text-2xl font-black text-eco-gray-900">
                Các Mã Màu Tương Đồng Được Ưa Chuộng
              </h3>
            </div>
            <a href="/san-pham-chinh" className="text-xs font-bold text-bamboo-800 hover:underline">
              Xem tất cả &rarr;
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct ? onSelectProduct(rel) : (window.location.href = `/san-pham/${rel.id}`)}
                className="group cursor-pointer rounded-2xl bg-white border border-eco-gray-200 overflow-hidden shadow-sm hover:shadow-card hover:border-bamboo-400 transition-all flex flex-col justify-between"
              >
                <div className="h-40 w-full bg-eco-gray-100 relative overflow-hidden">
                  <img
                    src={rel.image || rel.swatchImage}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white font-mono text-[10px] font-bold backdrop-blur-sm">
                    {rel.code}
                  </span>
                </div>
                <div className="p-3 bg-white space-y-1">
                  <div className="text-xs font-bold text-eco-gray-900 group-hover:text-bamboo-800 transition-colors line-clamp-1">
                    {rel.name}
                  </div>
                  <div className="text-[11px] font-bold text-wood-700">{rel.priceFormatted}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. POPUP MODAL ĐĂNG KÝ NHẬN MẪU MIỄN PHÍ */}
      {showSampleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-eco-gray-200">

            <button
              onClick={() => setShowSampleModal(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-eco-gray-400 hover:text-eco-gray-700 hover:bg-eco-gray-100 transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-bamboo-100 text-bamboo-700 flex items-center justify-center">
                <GiftIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-bamboo-600">Sample Box Miễn Phí</span>
                <h3 className="text-lg font-black text-eco-gray-900 leading-tight">
                  Nhận Mẫu Thử Mã {product.code}
                </h3>
              </div>
            </div>

            <p className="text-xs text-eco-gray-600 mb-4 leading-relaxed">
              Nhà máy {BRAND.shortName} hỗ trợ gửi miễn phí mẫu cắt thực tế kích thước 15x20cm mã <strong>{product.code} - {product.name}</strong> để bạn kiểm tra thớ vân và thử nghiệm độ chống nước, uốn cong.
            </p>

            <form onSubmit={handleSampleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1">Họ và tên của bạn *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Anh Tuấn - Kiến trúc sư"
                  value={sampleForm.name}
                  onChange={(e) => setSampleForm({ ...sampleForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1">Số điện thoại nhận mẫu *</label>
                <input
                  type="tel"
                  required
                  placeholder="0915..."
                  value={sampleForm.phone}
                  onChange={(e) => setSampleForm({ ...sampleForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1">Địa chỉ nhận mẫu</label>
                <input
                  type="text"
                  placeholder="Địa chỉ văn phòng hoặc công trình nhận mẫu..."
                  value={sampleForm.address}
                  onChange={(e) => setSampleForm({ ...sampleForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1">Ghi chú thêm</label>
                <textarea
                  rows="2"
                  placeholder="Gửi thêm mẫu vân đá đối chiếu, catalog bản in..."
                  value={sampleForm.note}
                  onChange={(e) => setSampleForm({ ...sampleForm, note: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Xác Nhận Gửi Mẫu Thử
                </button>
              </div>

              {sampleSuccess && (
                <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-2 text-amber-600" />
                  Đăng ký thành công! Bộ phận mẫu {BRAND.shortName} sẽ gửi hàng trong vòng 24 giờ.
                </div>
              )}
            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
}
