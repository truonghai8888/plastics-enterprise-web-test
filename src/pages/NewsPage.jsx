import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND, { getCurrentYear, getCurrentDateFormatted } from '../config/brandConfig';

// Icons
const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const UserIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const ArrowLeftIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </svg>
);

const PhoneCallIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

import { ARTICLES, NEWS_CATEGORIES } from '../data/news';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 10;

  // Filter articles
  const filteredArticles = ARTICLES.filter((art) => {
    const matchCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <MainLayout
      title={`Tin Tức & Cẩm Nang Vật Liệu | ${BRAND.brandName}`}
      description={`Cẩm nang kiến thức chuyên sâu về tấm ốp than tre, lam sóng và kỹ thuật thi công chuẩn từ nhà máy ${BRAND.shortName}.`}
    >
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-12 sm:py-16 border-b border-bamboo-800 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/30">
            Kiến Thức & Tin Tức Vật Liệu
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Cẩm Nang Tấm Ốp {BRAND.shortName}
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light max-w-2xl mx-auto">
            Tổng hợp bài viết phân tích vật liệu, hướng dẫn kỹ thuật thi công soi rãnh V 90° và kinh nghiệm cải tạo không gian từ đội ngũ chuyên gia {BRAND.brandName}.
          </p>

          {/* Search Bar */}
          {!readingArticle && (
            <div className="pt-4 max-w-md mx-auto">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-eco-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Tìm kiếm bài viết (than tre, lam sóng, thi công...)..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-eco-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/15"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* NẾU ĐANG Ở CHẾ ĐỘ ĐỌC CHI TIẾT BÀI VIẾT */}
        {readingArticle ? (
          <div className="space-y-6">
            {/* Nút quay lại */}
            <button
              onClick={() => {
                setReadingArticle(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center text-xs font-bold text-bamboo-800 hover:text-bamboo-950 bg-bamboo-50 hover:bg-bamboo-100 px-4 py-2 rounded-xl transition-all"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1.5" />
              Quay lại danh sách bài viết
            </button>

            {/* Chi tiết bài viết */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <article className="lg:col-span-8 bg-white rounded-3xl border border-eco-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
                <div className="space-y-3 pb-6 border-b border-eco-gray-200">
                  <span className="px-3 py-1 rounded-full bg-bamboo-100 text-bamboo-800 text-xs font-bold uppercase tracking-wider">
                    {readingArticle.categoryName}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-eco-gray-900 leading-tight">
                    {readingArticle.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-eco-gray-500 pt-1">
                    <span className="flex items-center">
                      <UserIcon className="w-3.5 h-3.5 mr-1.5 text-bamboo-700" />
                      {readingArticle.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-eco-gray-400" />
                      {readingArticle.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <ClockIcon className="w-3.5 h-3.5 mr-1.5 text-eco-gray-400" />
                      {readingArticle.readTime}
                    </span>
                  </div>
                </div>

                {/* Ảnh bìa */}
                <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-eco-gray-200">
                  <img
                    src={readingArticle.image}
                    alt={readingArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Nội dung bài viết */}
                <div
                  className="prose prose-eco max-w-none text-eco-gray-700 text-sm sm:text-base leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: readingArticle.content }}
                />

                {/* Chân bài viết */}
                <div className="pt-6 border-t border-eco-gray-200 flex items-center justify-between text-xs">
                  <span className="text-eco-gray-500">
                    Bản quyền nội dung thuộc về <strong>{BRAND.legalName}</strong>
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Đã sao chép liên kết bài viết!');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-bamboo-50 hover:bg-bamboo-100 text-bamboo-800 font-bold transition-colors"
                  >
                    Chia sẻ bài viết
                  </button>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6 sticky top-24">
                <div className="rounded-3xl bg-gradient-bamboo text-white p-6 shadow-md space-y-3">
                  <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                    Tư Vấn Miễn Phí Từ Nhà Máy
                  </span>
                  <h3 className="text-lg font-black leading-snug">
                    Cần Mẫu Thử & Báo Giá Đại Lý {BRAND.shortName}?
                  </h3>
                  <p className="text-xs text-eco-gray-200 leading-relaxed font-light">
                    Gửi tận nơi bộ xâu mẫu 160 mã màu và bảng giá chiết khấu đại lý lên tới 25%.
                  </p>
                  <a
                    href={`tel:${BRAND.hotline.replace(/\./g, '')}`}
                    className="w-full py-2.5 rounded-xl bg-white text-bamboo-950 font-extrabold text-xs uppercase tracking-wider text-center shadow flex items-center justify-center hover:bg-amber-100 transition-all"
                  >
                    <PhoneCallIcon className="w-4 h-4 mr-2 text-amber-600 animate-pulse" />
                    Hotline: {BRAND.hotlineDisplay}
                  </a>
                </div>

                {/* Bài viết khác */}
                <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-eco-gray-900 border-l-2 border-bamboo-600 pl-2.5">
                    Bài viết cùng chuyên mục
                  </h4>
                  <div className="space-y-3 divide-y divide-eco-gray-100">
                    {ARTICLES.filter(a => a.id !== readingArticle.id).slice(0, 3).map(art => (
                      <div
                        key={art.id}
                        onClick={() => {
                          setReadingArticle(art);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="pt-3 cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-eco-gray-800 group-hover:text-bamboo-700 transition-colors line-clamp-2">
                          {art.title}
                        </div>
                        <div className="text-[10px] text-eco-gray-400 mt-1">
                          {art.date} • {art.readTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        ) : (
          /* NẾU ĐANG Ở DANH SÁCH BÀI VIẾT */
          <div className="space-y-8">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {NEWS_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-bamboo-700 text-white shadow-sm'
                      : 'bg-white border border-eco-gray-200 text-eco-gray-700 hover:bg-eco-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Featured Article */}
            {filteredArticles.length > 0 && selectedCategory === 'all' && searchQuery === '' && (
              <div
                onClick={() => {
                  setReadingArticle(filteredArticles[0]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer group bg-white rounded-3xl border border-eco-gray-200 overflow-hidden shadow-sm hover:shadow-card hover:border-bamboo-400 transition-all grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-eco-gray-100">
                  <img
                    src={filteredArticles[0].image}
                    alt={filteredArticles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                      Bài viết tiêu biểu
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-eco-gray-900 group-hover:text-bamboo-700 transition-colors leading-tight">
                      {filteredArticles[0].title}
                    </h2>
                    <p className="text-xs text-eco-gray-600 line-clamp-3 leading-relaxed">
                      {filteredArticles[0].summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-eco-gray-400 pt-4 border-t border-eco-gray-100">
                    <span>{filteredArticles[0].date}</span>
                    <span className="font-bold text-bamboo-800 flex items-center group-hover:translate-x-1 transition-transform">
                      Đọc chi tiết <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            )}

                        {/* Phân trang bài viết (10 bài/trang tương đương 5 trang trên nhuaamc.vn) */}
            {(() => {
              const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE) || 1;
              const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
              const currentPosts = filteredArticles.slice(startIndex, startIndex + POSTS_PER_PAGE);

              return (
                <>
                  <div className="flex items-center justify-between text-xs text-eco-gray-500 pb-2">
                    <span>
                      Hiển thị <strong>{currentPosts.length}</strong> / <strong>{filteredArticles.length}</strong> bài viết (Trang {currentPage}/{totalPages})
                    </span>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Nguồn bài viết chính thức {BRAND.shortName}
                    </span>
                  </div>

                  {/* Articles Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          setReadingArticle(art);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="cursor-pointer group bg-white rounded-2xl border border-eco-gray-200 overflow-hidden shadow-sm hover:shadow-card hover:border-amber-400 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-[16/10] overflow-hidden bg-eco-gray-100 relative">
                            <img
                              src={art.image}
                              alt={art.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = '/images/nhuaamc/logo-amc2.jpg';
                              }}
                            />
                            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                              {art.categoryName}
                            </span>
                          </div>
                          <div className="p-5 space-y-2">
                            <div className="flex items-center space-x-2 text-[11px] text-eco-gray-400">
                              <span>{art.date}</span>
                              <span>•</span>
                              <span>{art.readTime}</span>
                            </div>
                            <h3 className="text-sm font-bold text-eco-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                              {art.title}
                            </h3>
                            <p className="text-xs text-eco-gray-600 line-clamp-2 leading-relaxed font-light">
                              {art.summary}
                            </p>
                          </div>
                        </div>
                        <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-amber-800">
                          <span>Xem bài viết</span>
                          <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* UI THANH PHÂN TRANG 5 TRANG */}
                  {totalPages > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-8 pb-4">
                      {/* Nút Trang Trước */}
                      <button
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }
                        }}
                        disabled={currentPage === 1}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
                          currentPage === 1
                            ? 'bg-eco-gray-100 text-eco-gray-400 cursor-not-allowed'
                            : 'bg-white border border-eco-gray-200 text-eco-gray-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 shadow-sm'
                        }`}
                      >
                        <ArrowLeftIcon className="w-3.5 h-3.5 mr-1" />
                        Trước
                      </button>

                      {/* Các số trang 1, 2, 3, 4, 5... */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center shadow-sm ${
                            currentPage === pageNum
                              ? 'bg-amber-500 text-white font-extrabold ring-2 ring-amber-400/50 shadow-md'
                              : 'bg-white border border-eco-gray-200 text-eco-gray-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      {/* Nút Trang Sau */}
                      <button
                        onClick={() => {
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }
                        }}
                        disabled={currentPage === totalPages}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${
                          currentPage === totalPages
                            ? 'bg-eco-gray-100 text-eco-gray-400 cursor-not-allowed'
                            : 'bg-white border border-eco-gray-200 text-eco-gray-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 shadow-sm'
                        }`}
                      >
                        Sau
                        <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>
                  )}
                </>
              );
            })()}

            {filteredArticles.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-eco-gray-200 space-y-3">
                <div className="text-4xl">🔍</div>
                <h3 className="text-base font-bold text-eco-gray-900">Không tìm thấy bài viết phù hợp</h3>
                <p className="text-xs text-eco-gray-500">Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn chuyên mục khác.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-xl bg-bamboo-50 text-bamboo-800 font-bold text-xs hover:bg-bamboo-100"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </MainLayout>
  );
}
