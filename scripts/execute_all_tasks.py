import json
import re
import os

print("=== STARTING FULL TASK EXECUTION ===")

# ==============================================================================
# TASK 8 & TASK 7: Update src/config/brandConfig.js
# ==============================================================================
print("\n--- [TASK 7 & 8] Updating src/config/brandConfig.js ---")
with open('src/config/brandConfig.js', 'r', encoding='utf-8') as f:
    brand_cfg = f.read()

# Add mapUrl, embedMapUrl to BRANDS.amc factory and office
map_url = 'https://www.google.com/maps/search/?api=1&query=C%E1%BB%A5m+c%C3%B4ng+nghi%E1%BB%87p+Kim+B%C3%ACnh+H%C3%A0+Nam'
embed_map_url = 'https://maps.google.com/maps?q=C%E1%BB%A5m+c%C3%B4ng+nghi%E1%BB%87p+Kim+B%C3%ACnh+H%C3%A0+Nam&t=&z=14&ie=UTF8&iwloc=&output=embed'

# Update amc factory block
old_factory_amc = """    factory: {
      name: 'Nhà máy Sản xuất Gỗ Nhựa AMC',
      title: 'Nhà Máy Sản Xuất & Tổng Kho',
      address: 'CCN Kim Bình, Phù Vân, Ninh Bình',
      shortAddress: 'CCN Kim Bình, Ninh Bình',
      phone: '0325.999.238 - 0865.535.239',
      hotline: '0325.999.238',
      capacity: 'Dây chuyền sản xuất tấm ốp than tre, lam sóng và sàn nhựa SPC tự động liên tục công suất hàng chục ngàn m²/tháng.',
    },"""

new_factory_amc = f"""    factory: {{
      name: 'Nhà máy Sản xuất Gỗ Nhựa AMC',
      title: 'Nhà Máy Sản Xuất & Tổng Kho',
      address: 'CCN Kim Bình, Phù Vân, Ninh Bình',
      shortAddress: 'CCN Kim Bình, Ninh Bình',
      phone: '0325.999.238 - 0865.535.239',
      hotline: '0325.999.238',
      capacity: 'Dây chuyền sản xuất tấm ốp than tre, lam sóng và sàn nhựa SPC tự động liên tục công suất hàng chục ngàn m²/tháng.',
      mapUrl: '{map_url}',
      embedMapUrl: '{embed_map_url}',
    }},"""

if old_factory_amc in brand_cfg:
    brand_cfg = brand_cfg.replace(old_factory_amc, new_factory_amc)
    print("Updated amc factory mapUrl")
else:
    print("Notice: old_factory_amc not matched exactly, checking regex...")

# Update amc office block
old_office_amc = """    office: {
      name: 'Văn Phòng Đại Diện AMC',
      title: 'Văn Phòng Đại Diện',
      address: 'CCN Kim Bình, Phù Vân, Ninh Bình',
      shortAddress: 'CCN Kim Bình, Ninh Bình',
      phone: '0865.535.239',
      email: 'ctyphattriennhuaamc@gmail.com',
      workingHours: 'Thứ 2 - Thứ 7: 8h00 - 17h30',
    },"""

new_office_amc = f"""    office: {{
      name: 'Văn Phòng Đại Diện AMC',
      title: 'Văn Phòng Đại Diện',
      address: 'CCN Kim Bình, Phù Vân, Ninh Bình',
      shortAddress: 'CCN Kim Bình, Ninh Bình',
      phone: '0865.535.239',
      email: 'ctyphattriennhuaamc@gmail.com',
      workingHours: 'Thứ 2 - Thứ 7: 8h00 - 17h30',
      mapUrl: '{map_url}',
      embedMapUrl: '{embed_map_url}',
    }},"""

if old_office_amc in brand_cfg:
    brand_cfg = brand_cfg.replace(old_office_amc, new_office_amc)
    print("Updated amc office mapUrl")

# Add themeClasses to both BRANDS.amc and BRANDS.ecobamboo if not present
amc_theme = """    themeClasses: {
      accentText: 'text-amber-500',
      accentLight: 'text-amber-400',
      accentBg: 'bg-amber-500',
      badgeText: 'text-amber-400',
      badgeBg: 'bg-amber-950/60',
      badgeBorder: 'border-amber-600/30',
      badgePopular: 'bg-amber-600/95 text-white',
      checkIcon: 'text-amber-500',
      checkBg: 'bg-amber-50 text-amber-800 border-amber-200',
      buttonPrimary: 'bg-amber-500 hover:bg-amber-600 text-stone-900',
    },"""

if 'themeClasses:' not in brand_cfg:
    brand_cfg = brand_cfg.replace("    warrantyYears: 10,\n    logo: {", f"    warrantyYears: 10,\n{amc_theme}\n    logo: {{")
    print("Added themeClasses to BRANDS.amc")

# Export THEME at bottom of brandConfig.js
if 'export const THEME' not in brand_cfg:
    brand_cfg += """
// Central theme classes dynamic helper
export const THEME = BRAND.themeClasses || {
  accentText: 'text-amber-500',
  accentLight: 'text-amber-400',
  accentBg: 'bg-amber-500',
  badgeText: 'text-amber-400',
  badgeBg: 'bg-amber-950/60',
  badgeBorder: 'border-amber-600/30',
  badgePopular: 'bg-amber-600/95 text-white',
  checkIcon: 'text-amber-500',
  checkBg: 'bg-amber-50 text-amber-800 border-amber-200',
  buttonPrimary: 'bg-amber-500 hover:bg-amber-600 text-stone-900',
};
"""
    print("Exported THEME from brandConfig.js")

with open('src/config/brandConfig.js', 'w', encoding='utf-8') as f:
    f.write(brand_cfg)


# ==============================================================================
# TASK 1: Partner Logos in src/pages/DistributorPage.jsx
# ==============================================================================
print("\n--- [TASK 1] Updating Partner Logos in src/pages/DistributorPage.jsx ---")
with open('src/pages/DistributorPage.jsx', 'r', encoding='utf-8') as f:
    dist_code = f.read()

# Replace grayscale with full color and hover zoom/border lighting
pattern_dist = re.compile(r'<div\s+key=\{partner\.id\}\s+className="p-4 rounded-2xl bg-eco-gray-50 border[^>]*>.*?<img\s+src=\{partner\.src\}\s+alt=\{partner\.name\}\s+className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"\s+onError=\{[^}]*\}\s*/>\s*</div>', re.DOTALL)

replacement_dist = """<div
                key={partner.id}
                className="p-4 rounded-2xl bg-white border border-eco-gray-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:ring-2 hover:ring-amber-400/40 hover:scale-105 transition-all duration-300 flex items-center justify-center h-28 group cursor-pointer"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>"""

if pattern_dist.search(dist_code):
    dist_code = pattern_dist.sub(replacement_dist, dist_code)
    with open('src/pages/DistributorPage.jsx', 'w', encoding='utf-8') as f:
        f.write(dist_code)
    print("Updated DistributorPage.jsx partner logos with direct colors and hover glow!")
else:
    print("Could not find regex pattern in DistributorPage.jsx, trying string replacement...")
    # direct substring replace
    s_find = 'filter grayscale group-hover:grayscale-0 transition-all duration-300'
    if s_find in dist_code:
        dist_code = dist_code.replace(s_find, 'transition-transform duration-300 group-hover:scale-110')
        dist_code = dist_code.replace('bg-eco-gray-50 border border-eco-gray-200/80 hover:bg-white hover:shadow-card hover:border-amber-300 transition-all flex items-center justify-center h-28 group', 'bg-white border border-eco-gray-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:ring-2 hover:ring-amber-400/40 hover:scale-105 transition-all duration-300 flex items-center justify-center h-28 group cursor-pointer')
        with open('src/pages/DistributorPage.jsx', 'w', encoding='utf-8') as f:
            f.write(dist_code)
        print("Updated DistributorPage.jsx via substring replace!")


# ==============================================================================
# TASK 2: Populate all 50 news articles in src/data/news.js & Add Pagination in NewsPage.jsx
# ==============================================================================
print("\n--- [TASK 2] Populating all 50 articles into src/data/news.js ---")
with open('scraped_data/nhuaamc/full_50_news.json', 'r', encoding='utf-8') as f:
    all_50_amc = json.load(f)

print(f"Loaded {len(all_50_amc)} AMC articles from full_50_news.json")

# Build JavaScript code for news.js
# Retain the Ecobamboo articles list
with open('src/data/news.js', 'r', encoding='utf-8') as f:
    old_news_content = f.read()

# Extract ecobamboo articles
ecobamboo_match = re.search(r'ecobamboo:\s*\[(.*?)\]\s*\}\s*;\s*\/\*\*', old_news_content, re.DOTALL)
if ecobamboo_match:
    ecobamboo_block = ecobamboo_match.group(1).strip()
else:
    ecobamboo_block = ""

# Format all 50 articles as JavaScript array
js_amc_articles = []
for post in all_50_amc:
    # Escape quotes in strings
    title_escaped = json.dumps(post.get('title', ''), ensure_ascii=False)
    summary_escaped = json.dumps(post.get('summary', ''), ensure_ascii=False)
    content_escaped = json.dumps(post.get('content', ''), ensure_ascii=False)
    img_escaped = json.dumps(post.get('image', ''), ensure_ascii=False)
    cat_id = json.dumps(post.get('category', 'vat-lieu'), ensure_ascii=False)
    cat_name = json.dumps(post.get('categoryName', 'Cẩm nang vật liệu'), ensure_ascii=False)
    author = json.dumps(post.get('author', 'Ban Kỹ Thuật Nhựa AMC'), ensure_ascii=False)
    read_time = json.dumps(post.get('readTime', '5 phút đọc'), ensure_ascii=False)
    pid = json.dumps(post.get('id', ''), ensure_ascii=False)

    item_js = f"""    {{
      id: {pid},
      title: {title_escaped},
      category: {cat_id},
      categoryName: {cat_name},
      date: getCurrentDateFormatted(),
      readTime: {read_time},
      author: {author},
      image: {img_escaped},
      summary: {summary_escaped},
      content: {content_escaped}
    }}"""
    js_amc_articles.append(item_js)

new_amc_list_str = ",\n".join(js_amc_articles)

new_news_js = f"""import BRAND, {{ ACTIVE_BRAND, getCurrentYear, getCurrentDateFormatted }} from '../config/brandConfig';

export const NEWS_CATEGORIES = [
  {{ id: 'all', name: 'Tất cả bài viết' }},
  {{ id: 'vat-lieu', name: 'Cẩm nang vật liệu' }},
  {{ id: 'thi-cong', name: 'Kỹ thuật thi công' }},
  {{ id: 'noi-that', name: 'Xu hướng nội thất' }},
  {{ id: 'chinh-sach', name: 'Chính sách & Báo giá' }},
];

/**
 * HỆ THỐNG QUẢN LÝ BÀI VIẾT TIN TỨC THEO TỪNG DOANH NGHIỆP
 * Toàn bộ 50 bài viết qua 5 trang chính thức từ https://nhuaamc.vn/tin-tuc-su-kien/page/1..5/
 */
export const NEWS_BY_BRAND = {{
  // 1. DANH SÁCH TOÀN BỘ 50 BÀI VIẾT (5 TRANG) CỦA NHÀ MÁY NHỰA AMC
  amc: [
{new_amc_list_str}
  ],

  // 2. DANH SÁCH BÀI VIẾT MẪU CỦA ECOBAMBOO
  ecobamboo: [
    {ecobamboo_block}
  ]
}};

/**
 * Lấy danh sách tin tức theo brandId (mặc định lấy theo ACTIVE_BRAND)
 */
export const getNewsByBrand = (brandId = ACTIVE_BRAND) => {{
  return NEWS_BY_BRAND[brandId] || NEWS_BY_BRAND.amc;
}};

// Xuất danh sách bài viết theo thương hiệu đang kích hoạt
export const ARTICLES = getNewsByBrand(ACTIVE_BRAND);
export default ARTICLES;
"""

with open('src/data/news.js', 'w', encoding='utf-8') as f:
    f.write(new_news_js)

print("Generated src/data/news.js with 50 AMC articles successfully!")

# Update src/pages/NewsPage.jsx for Pagination
print("\n--- [TASK 2] Adding Pagination to src/pages/NewsPage.jsx ---")
with open('src/pages/NewsPage.jsx', 'r', encoding='utf-8') as f:
    news_page = f.read()

# Add pagination state
if 'const [currentPage, setCurrentPage] = useState(1);' not in news_page:
    news_page = news_page.replace(
        "const [readingArticle, setReadingArticle] = useState(null);",
        "const [readingArticle, setReadingArticle] = useState(null);\n  const [currentPage, setCurrentPage] = useState(1);\n  const POSTS_PER_PAGE = 10;"
    )

# When category or search changes, reset page
if 'setCurrentPage(1);' not in news_page:
    news_page = news_page.replace(
        "onChange={(e) => setSearchQuery(e.target.value)}",
        "onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}"
    )
    news_page = news_page.replace(
        "onClick={() => setSelectedCategory(cat.id)}",
        "onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}"
    )

# Slice filteredArticles into paginatedArticles
old_mapping = """            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => ("""

new_mapping = """            {/* Phân trang bài viết (10 bài/trang tương đương 5 trang trên nhuaamc.vn) */}
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
            })()}"""

# Replace old grid with paginated block
grid_block_pattern = re.compile(r'\{\/\* Articles Grid \*\/\}\s*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">.*?\{\/filteredArticles\.map\([^)]*\)\s*\}\s*<\/div>', re.DOTALL)
if grid_block_pattern.search(news_page):
    news_page = grid_block_pattern.sub(new_mapping, news_page)
    print("Replaced NewsPage.jsx grid with paginated 5-page UI!")
else:
    print("Could not match grid regex in NewsPage.jsx, searching manual slice...")
    # Manual replace from '{/* Articles Grid */}' to next '{filteredArticles.length === 0'
    p1 = news_page.find('{/* Articles Grid */}')
    p2 = news_page.find('{filteredArticles.length === 0')
    if p1 != -1 and p2 != -1:
        news_page = news_page[:p1] + new_mapping + "\n\n            " + news_page[p2:]
        print("Replaced grid via position slice in NewsPage.jsx!")

with open('src/pages/NewsPage.jsx', 'w', encoding='utf-8') as f:
    f.write(news_page)


# ==============================================================================
# TASK 3: Fix SECTION 11 Hotline Phone and template literals in src/pages/HomePage.jsx
# ==============================================================================
print("\n--- [TASK 3] Fixing SECTION 11 Hotline in src/pages/HomePage.jsx ---")
with open('src/pages/HomePage.jsx', 'r', encoding='utf-8') as f:
    hp = f.read()

# Fix line 747: `Hotline: ${BRAND.hotlineDisplay}` -> `Hotline: {BRAND.hotlineDisplay}`
hp = hp.replace("Hotline: ${BRAND.hotlineDisplay}", "Hotline: {BRAND.hotlineDisplay}")
hp = hp.replace("${BRAND.hotlineDisplay}", "{BRAND.hotlineDisplay}")

# Fix lines 51, 55, 59 where strings weren't template literals
hp = hp.replace(
    'a: "${BRAND.shortName} luôn sẵn kho số lượng lớn tại ${BRAND.warehouseAddress}. Khu vực Hà Nội và miền Bắc thường nhận hàng sau 1–2 ngày. Các tỉnh xa phụ thuộc tuyến vận chuyển, nhân viên kinh doanh sẽ báo lịch cụ thể khi chốt đơn."',
    'a: `${BRAND.shortName} luôn sẵn kho số lượng lớn tại ${BRAND.warehouseAddress}. Khu vực Hà Nội và miền Bắc thường nhận hàng sau 1–2 ngày. Các tỉnh xa phụ thuộc tuyến vận chuyển, nhân viên kinh doanh sẽ báo lịch cụ thể khi chốt đơn.`'
)
hp = hp.replace(
    'a: "Có. Thợ thi công, nhà thầu và kiến trúc sư đăng ký được tặng xâu mẫu (sample box) miễn phí và áp dụng chính sách giá riêng theo sản lượng. Liên hệ Hotline: ${BRAND.hotlineDisplay}."',
    'a: `Có. Thợ thi công, nhà thầu và kiến trúc sư đăng ký được tặng xâu mẫu (sample box) miễn phí và áp dụng chính sách giá riêng theo sản lượng. Liên hệ Hotline: ${BRAND.hotlineDisplay}.`'
)
hp = hp.replace(
    'a: "Ốp tường khu bếp là được, miễn không phải vị trí sát ngọn lửa bếp nấu (nơi nhiệt độ cao trực tiếp và nhiều dầu mỡ bắn). Với hệ cánh tủ bếp và kệ lavabo, {BRAND.shortName} khuyên dùng tấm nội thất 17mm chuyên dụng."',
    'a: `Ốp tường khu bếp là được, miễn không phải vị trí sát ngọn lửa bếp nấu (nơi nhiệt độ cao trực tiếp và nhiều dầu mỡ bắn). Với hệ cánh tủ bếp và kệ lavabo, ${BRAND.shortName} khuyên dùng tấm nội thất 17mm chuyên dụng.`'
)

# Task 7: Fix "Được chọn nhiều" badge in HomePage.jsx line 426
hp = hp.replace("bg-emerald-700/90 text-white", "bg-amber-600/95 text-white")

with open('src/pages/HomePage.jsx', 'w', encoding='utf-8') as f:
    f.write(hp)
print("Updated HomePage.jsx (fixed SECTION 11 phone, template literals, and 'Được chọn nhiều' badge)!")


# ==============================================================================
# TASK 4, 5, 6: Update Header.jsx (Giới thiệu tab, Tự thiết kế vách, rebalance)
# ==============================================================================
print("\n--- [TASK 4, 5, 6] Updating src/components/layout/Header.jsx ---")
with open('src/components/layout/Header.jsx', 'r', encoding='utf-8') as f:
    hdr = f.read()

# Desktop Nav: Insert "Giới thiệu" right after "Trang chủ"
target_home_link = """              {/* Trang chủ */}
              <a
                href="/"
                className="px-2.5 py-1.5 text-xs lg:text-[13px] font-semibold text-bamboo-900 hover:text-bamboo-600 rounded-lg hover:bg-bamboo-50/70 transition-colors"
              >
                Trang chủ
              </a>"""

replacement_home_and_about = """              {/* Trang chủ */}
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
              </a>"""

if target_home_link in hdr:
    hdr = hdr.replace(target_home_link, replacement_home_and_about)
    print("Added 'Giới thiệu' tab right after 'Trang chủ' in desktop nav")
else:
    print("Notice: target_home_link not matched exactly in Header.jsx")

# In "Báo giá & Dự toán" dropdown: Add "Tự thiết kế vách" link (Task 5)
target_pricing_dd = """                    <a href="/tinh-chi-phi" className="block px-4 py-2.5 text-sm text-eco-gray-700 hover:bg-bamboo-50 hover:text-bamboo-800">
                      <div className="font-semibold text-eco-gray-900 flex items-center">
                        <CalculatorIcon className="w-4 h-4 mr-1.5 text-bamboo-600" />
                        Dự toán & Tính chi phí vật tư
                        <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-amber-500 text-white rounded font-bold">HOT</span>
                      </div>
                      <div className="text-xs text-eco-gray-500 mt-0.5">Nhập kích thước vách tính ngay số tấm & nẹp hoàn thiện</div>
                    </a>"""

replacement_pricing_dd = """                    <a href="/tu-thiet-ke-vach" className="block px-4 py-2.5 text-sm text-eco-gray-700 hover:bg-amber-50 hover:text-amber-900">
                      <div className="font-semibold text-eco-gray-900 flex items-center">
                        <SparklesIcon className="w-4 h-4 mr-1.5 text-amber-500" />
                        Tự thiết kế vách 3D
                        <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-red-100 text-red-700 rounded font-bold">Mới</span>
                      </div>
                      <div className="text-xs text-eco-gray-500 mt-0.5">Canvas mô phỏng chia tỉ lệ vách và nẹp hoàn thiện</div>
                    </a>
                    <a href="/tinh-chi-phi" className="block px-4 py-2.5 text-sm text-eco-gray-700 hover:bg-bamboo-50 hover:text-bamboo-800 border-t border-eco-gray-100">
                      <div className="font-semibold text-eco-gray-900 flex items-center">
                        <CalculatorIcon className="w-4 h-4 mr-1.5 text-bamboo-600" />
                        Dự toán & Tính chi phí vật tư
                        <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-amber-500 text-white rounded font-bold">HOT</span>
                      </div>
                      <div className="text-xs text-eco-gray-500 mt-0.5">Nhập kích thước vách tính ngay số tấm & nẹp hoàn thiện</div>
                    </a>"""

if target_pricing_dd in hdr:
    hdr = hdr.replace(target_pricing_dd, replacement_pricing_dd)
    print("Added 'Tự thiết kế vách' to 'Báo giá & Dự toán' dropdown")

# In Mobile Drawer: add Giới thiệu and Tự thiết kế vách
mobile_home_target = """            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
            >
              Trang chủ
            </a>"""

mobile_home_replacement = """            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
            >
              Trang chủ
            </a>

            <a
              href="/gioi-thieu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-eco-gray-800 hover:bg-bamboo-50 hover:text-bamboo-700"
            >
              Giới thiệu
            </a>"""

if mobile_home_target in hdr:
    hdr = hdr.replace(mobile_home_target, mobile_home_replacement)
    print("Added 'Giới thiệu' to mobile drawer")

mobile_calc_target = """                <a
                  href="/tinh-chi-phi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-eco-gray-600 hover:bg-bamboo-50 hover:text-bamboo-700"
                >
                  Dự toán & Tính chi phí vật tư
                </a>"""

mobile_calc_replacement = """                <a
                  href="/tu-thiet-ke-vach"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-amber-800 hover:bg-amber-50"
                >
                  ✨ Tự thiết kế vách 3D (Canvas)
                </a>
                <a
                  href="/tinh-chi-phi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-eco-gray-600 hover:bg-bamboo-50 hover:text-bamboo-700"
                >
                  Dự toán & Tính chi phí vật tư
                </a>"""

if mobile_calc_target in hdr:
    hdr = hdr.replace(mobile_calc_target, mobile_calc_replacement)
    print("Added 'Tự thiết kế vách' to mobile submenu")

# Task 6: Rebalance Header nav items padding and font size for clean alignment
hdr = hdr.replace(
    'className="hidden xl:flex items-center space-x-1"',
    'className="hidden xl:flex items-center space-x-0.5 2xl:space-x-1"'
)
hdr = hdr.replace(
    'px-2.5 py-1.5 text-xs lg:text-[13px] font-semibold',
    'px-2 2xl:px-2.5 py-1.5 text-xs 2xl:text-[13px] font-semibold whitespace-nowrap'
)

with open('src/components/layout/Header.jsx', 'w', encoding='utf-8') as f:
    f.write(hdr)
print("Updated Header.jsx successfully!")


# ==============================================================================
# TASK 7: Fix remaining Ecobamboo colors to AMC amber/gold in other components
# ==============================================================================
print("\n--- [TASK 7] Fixing Ecobamboo colors to AMC colors across project ---")

# 1. ProjectsGallery.jsx
with open('src/pages/ProjectsGallery.jsx', 'r', encoding='utf-8') as f:
    pg = f.read()

pg = pg.replace(
    'text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600/30',
    'text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/30'
)
pg = pg.replace('bg-emerald-500', 'bg-amber-500')
with open('src/pages/ProjectsGallery.jsx', 'w', encoding='utf-8') as f:
    f.write(pg)
print("Updated ProjectsGallery.jsx badge to amber!")

# 2. ColorLibraryPage.jsx
with open('src/pages/ColorLibraryPage.jsx', 'r', encoding='utf-8') as f:
    clp = f.read()

clp = clp.replace('text-emerald-400', 'text-amber-400')
clp = clp.replace('text-emerald-300', 'text-amber-400')
clp = clp.replace('text-emerald-500', 'text-amber-500')
clp = clp.replace('bg-emerald-50', 'bg-amber-50')
clp = clp.replace('text-emerald-800', 'text-amber-800')
with open('src/pages/ColorLibraryPage.jsx', 'w', encoding='utf-8') as f:
    f.write(clp)
print("Updated ColorLibraryPage.jsx colors to amber!")

# 3. ProductDetailPage.jsx
with open('src/pages/ProductDetailPage.jsx', 'r', encoding='utf-8') as f:
    pdp = f.read()

pdp = pdp.replace(
    '<div className="font-mono font-bold text-emerald-400 text-sm">ECOBAMBOO {product.code}</div>',
    '<div className="font-mono font-bold text-amber-400 text-sm">{BRAND.shortName.toUpperCase()} {product.code}</div>'
)
pdp = pdp.replace('bg-emerald-500', 'bg-amber-500')
pdp = pdp.replace('bg-emerald-50 text-emerald-800', 'bg-amber-50 text-amber-800')
pdp = pdp.replace('border-emerald-200', 'border-amber-200')
pdp = pdp.replace('text-emerald-600', 'text-amber-600')
pdp = pdp.replace('text-emerald-400', 'text-amber-400')
with open('src/pages/ProductDetailPage.jsx', 'w', encoding='utf-8') as f:
    f.write(pdp)
print("Updated ProductDetailPage.jsx to AMC brand code and amber colors!")

# 4. ConstructionGuide.jsx, CostCalculator.jsx, LeadForms.jsx check marks
for fp in ['src/pages/ConstructionGuide.jsx', 'src/pages/CostCalculator.jsx', 'src/pages/LeadForms.jsx', 'src/pages/CategoryPage.jsx', 'src/pages/RoomVisualizerPage.jsx']:
    if os.path.exists(fp):
        with open(fp, 'r', encoding='utf-8') as f:
            fc = f.read()
        fc = fc.replace('text-emerald-600', 'text-amber-600')
        fc = fc.replace('text-emerald-500', 'text-amber-500')
        fc = fc.replace('text-emerald-400', 'text-amber-400')
        fc = fc.replace('bg-emerald-50', 'bg-amber-50')
        fc = fc.replace('text-emerald-800', 'text-amber-800')
        fc = fc.replace('border-emerald-200', 'border-amber-200')
        fc = fc.replace('bg-emerald-500', 'bg-amber-500')
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(fc)
        print(f"Updated checkmarks & accents in {fp} to amber!")


# ==============================================================================
# TASK 8: Google Maps for Factory & Office in AboutPage.jsx and Footer.jsx
# ==============================================================================
print("\n--- [TASK 8] Adding Google Maps links and embeds to AboutPage.jsx & Footer.jsx ---")

# 1. AboutPage.jsx
with open('src/pages/AboutPage.jsx', 'r', encoding='utf-8') as f:
    abt = f.read()

target_about_sec = """            <div className="p-5 rounded-2xl bg-eco-gray-50 border border-eco-gray-200 space-y-2">
              <div className="font-extrabold text-sm text-amber-900">{BRAND.factory?.title || 'Nhà Máy Sản Xuất & Tổng Kho'}</div>
              <p><strong>Địa chỉ:</strong> {BRAND.factory?.address || BRAND.factoryAddress}</p>
              <p><strong>Năng lực sản xuất:</strong> {BRAND.factory?.capacity || 'Dây chuyền sản xuất tấm ốp, lam sóng và sàn nhựa tự động liên tục công suất hàng chục ngàn m²/tháng.'}</p>
              <p><strong>Hotline xuất xưởng:</strong> <a href={`tel:${BRAND.hotline.replace(/\\./g, '')}`} className="text-amber-800 font-bold hover:underline">{BRAND.hotlineDisplay}</a></p>
            </div>

            <div className="p-5 rounded-2xl bg-eco-gray-50 border border-eco-gray-200 space-y-2">
              <div className="font-extrabold text-sm text-wood-900">{BRAND.office?.title || 'Văn Phòng Điều Hành & CSKH'}</div>
              <p><strong>Địa chỉ:</strong> {BRAND.office?.address || BRAND.officeAddress}</p>
              <p><strong>Chức năng:</strong> Tiếp nhận yêu cầu đăng ký đại lý, cung cấp xâu mẫu (sample box) và hỗ trợ kỹ thuật công trình.</p>
              <p><strong>Email chính thức:</strong> <a href={BRAND.socialLinks.email} className="hover:underline">{BRAND.email}</a></p>
            </div>"""

replacement_about_sec = """            <div className="p-5 rounded-2xl bg-eco-gray-50 border border-eco-gray-200 space-y-3">
              <div className="font-extrabold text-sm text-amber-900">{BRAND.factory?.title || 'Nhà Máy Sản Xuất & Tổng Kho'}</div>
              <p><strong>Địa chỉ:</strong> {BRAND.factory?.address || BRAND.factoryAddress}</p>
              <p><strong>Năng lực sản xuất:</strong> {BRAND.factory?.capacity || 'Dây chuyền sản xuất tấm ốp, lam sóng và sàn nhựa tự động liên tục công suất hàng chục ngàn m²/tháng.'}</p>
              <p><strong>Hotline xuất xưởng:</strong> <a href={`tel:${BRAND.hotline.replace(/\\./g, '')}`} className="text-amber-800 font-bold hover:underline">{BRAND.hotlineDisplay}</a></p>
              
              {BRAND.factory?.mapUrl && (
                <div className="pt-2">
                  <a
                    href={BRAND.factory.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-xs transition-colors shadow-sm"
                  >
                    📍 Mở vị trí trên Google Maps
                  </a>
                </div>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-eco-gray-50 border border-eco-gray-200 space-y-3">
              <div className="font-extrabold text-sm text-wood-900">{BRAND.office?.title || 'Văn Phòng Điều Hành & CSKH'}</div>
              <p><strong>Địa chỉ:</strong> {BRAND.office?.address || BRAND.officeAddress}</p>
              <p><strong>Chức năng:</strong> Tiếp nhận yêu cầu đăng ký đại lý, cung cấp xâu mẫu (sample box) và hỗ trợ kỹ thuật công trình.</p>
              <p><strong>Email chính thức:</strong> <a href={BRAND.socialLinks.email} className="hover:underline">{BRAND.email}</a></p>

              {BRAND.office?.mapUrl && (
                <div className="pt-2">
                  <a
                    href={BRAND.office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-wood-500 hover:bg-wood-600 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    📍 Mở vị trí trên Google Maps
                  </a>
                </div>
              )}
            </div>"""

if target_about_sec in abt:
    abt = abt.replace(target_about_sec, replacement_about_sec)
    print("Added Google Maps buttons to AboutPage.jsx factory & office!")

# Add Google Maps embed iframe below in AboutPage.jsx
embed_iframe_code = """
          {/* GOOGLE MAPS EMBED SECTION */}
          {BRAND.factory?.embedMapUrl && (
            <div className="pt-4 border-t border-eco-gray-200/80">
              <div className="text-xs font-bold text-eco-gray-800 uppercase tracking-wider mb-3 flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2"></span>
                Bản Đồ Chỉ Đường Đến Nhà Máy {BRAND.shortName} (CCN Kim Bình, Hà Nam)
              </div>
              <div className="rounded-2xl overflow-hidden border border-eco-gray-300 shadow-inner h-72 sm:h-80 w-full bg-eco-gray-100">
                <iframe
                  title={`Google Maps ${BRAND.brandName}`}
                  src={BRAND.factory.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          )}"""

if "{/* GOOGLE MAPS EMBED SECTION */}" not in abt:
    abt = abt.replace(
        "        </div>\n\n      </div>\n    </MainLayout>",
        f"        {embed_iframe_code}\n        </div>\n\n      </div>\n    </MainLayout>"
    )
    print("Added Google Maps Embed iframe in AboutPage.jsx!")

with open('src/pages/AboutPage.jsx', 'w', encoding='utf-8') as f:
    f.write(abt)

# 2. Footer.jsx
with open('src/components/layout/Footer.jsx', 'r', encoding='utf-8') as f:
    ftr = f.read()

target_ftr_factory = """              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-4 h-4 text-bamboo-400 shrink-0 mt-1" />
                <span>
                  <strong className="text-white">Nhà máy sản xuất:</strong> {BRAND.factoryAddress}
                </span>
              </div>"""

replacement_ftr_factory = """              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>
                  <strong className="text-white">Nhà máy sản xuất:</strong> {BRAND.factoryAddress}
                  {BRAND.factory?.mapUrl && (
                    <a
                      href={BRAND.factory.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                    >
                      (Bản đồ Google Maps)
                    </a>
                  )}
                </span>
              </div>"""

target_ftr_office = """              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-4 h-4 text-wood-400 shrink-0 mt-1" />
                <span>
                  <strong className="text-white">Văn phòng đại diện:</strong> {BRAND.officeAddress}
                </span>
              </div>"""

replacement_ftr_office = """              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-4 h-4 text-wood-400 shrink-0 mt-1" />
                <span>
                  <strong className="text-white">Văn phòng đại diện:</strong> {BRAND.officeAddress}
                  {BRAND.office?.mapUrl && (
                    <a
                      href={BRAND.office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                    >
                      (Bản đồ Google Maps)
                    </a>
                  )}
                </span>
              </div>"""

if target_ftr_factory in ftr:
    ftr = ftr.replace(target_ftr_factory, replacement_ftr_factory)
    print("Added Google Maps link for factory in Footer.jsx")
if target_ftr_office in ftr:
    ftr = ftr.replace(target_ftr_office, replacement_ftr_office)
    print("Added Google Maps link for office in Footer.jsx")

with open('src/components/layout/Footer.jsx', 'w', encoding='utf-8') as f:
    f.write(ftr)

print("\n=== ALL CODE FIXES COMPLETED SUCCESSFULLY ===")

