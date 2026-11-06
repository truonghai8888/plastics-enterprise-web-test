/**
 * CẤU HÌNH THƯƠNG HIỆU & DOANH NGHIỆP TRUNG TÂM (CENTRAL BRAND & COMPANY CONFIG)
 *
 * Nơi tập hợp duy nhất:
 * 1. Thông tin doanh nghiệp (Tên, địa chỉ nhà máy, văn phòng, hotline, email, MST, số năm bảo hành)
 * 2. Biểu tượng Logo & Favicon
 * 3. Bảng màu sắc nhận diện đặc trưng
 * 4. Các hàm xử lý ngày tháng năm động (Dynamic Date Helpers)
 * 5. Mạng lưới nhà phân phối & cơ sở sản xuất (Chuyển đổi linh hoạt)
 * 6. Quy chuẩn đặt tên sản phẩm & mô tả sản phẩm (Product Naming & Descriptors)
 *
 * Khi muốn chuyển sang doanh nghiệp khác trong ngành, chỉ cần đổi ACTIVE_BRAND hoặc chỉnh sửa thông tin tại đây!
 */

// ==========================================
// 1. CÁC HÀM XỬ LÝ NGÀY THÁNG ĐỘNG (NO HARDCODING)
// ==========================================
export const getCurrentYear = () => new Date().getFullYear();

export const getCurrentDateFormatted = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getMonthYearFormatted = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${month}/${year}`;
};

export const getYearSpan = (startYear = 2022) => {
  const current = getCurrentYear();
  return startYear >= current ? `${current}` : `${startYear} - ${current}`;
};

export const getCatalogTitle = () => `Tải Catalog ${getCurrentYear()} PDF`;
export const getPriceTableTitle = () => `Bảng Giá Niêm Yết Nhà Máy Tháng ${new Date().getMonth() + 1}/${getCurrentYear()}`;
export const getTechDocTitle = () => `Tài Liệu Kỹ Thuật ${getCurrentYear()}`;

// ==========================================
// 2. CẤU HÌNH CÁC DOANH NGHIỆP TRONG NGÀNH
// ==========================================
export const BRANDS = {
  // DOANH NGHIỆP 1: NHÀ MÁY NHỰA AMC (nhuaamc.vn) - THÔNG TIN GỐC CHÍNH XÁC
  amc: {
    id: 'amc',
    brandName: 'AMC',
    shortName: 'Nhựa AMC',
    legalName: 'Công ty TNHH Phát Triển AMC',
    factoryName: 'Nhà máy Sản xuất Gỗ Nhựa AMC',
    slogan: 'Nhà máy sản xuất gỗ nhựa chất lượng hàng đầu Việt Nam',
    subSlogan: 'Bền vững – Chất lượng – Đổi mới',
    domain: 'nhuaamc.vn',
    websiteUrl: 'https://nhuaamc.vn',
    hotline: '0325.999.238',
    hotlineDisplay: '0325.999.238 - 0865.535.239',
    secondaryPhone: '0865.535.239',
    email: 'ctyphattriennhuaamc@gmail.com',

    // ĐỊA CHỈ GỐC CHÍNH XÁC CỦA AMC: CCN KIM BÌNH, PHÙ VÂN, NINH BÌNH
    factory: {
      name: 'Nhà máy Sản xuất Gỗ Nhựa AMC',
      title: 'Nhà Máy Sản Xuất & Tổng Kho',
      address: 'CCN Kim Bình, Phù Vân, Ninh Bình',
      shortAddress: 'CCN Kim Bình, Ninh Bình',
      phone: '0325.999.238 - 0865.535.239',
      hotline: '0325.999.238',
      capacity: 'Dây chuyền sản xuất tấm ốp than tre, lam sóng và sàn nhựa SPC tự động liên tục công suất hàng chục ngàn m²/tháng.',
      mapUrl: "https://www.google.com/maps/place/20%C2%B034'25.8%22N+105%C2%B054'52.4%22E/@20.573843,105.9119741,17z/data=!3m1!4b1!4m4!3m3!8m2!3d20.573843!4d105.914549?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
      embedMapUrl: 'https://maps.google.com/maps?q=20.573843,105.914549&t=&z=16&ie=UTF8&iwloc=&output=embed',
    },
    office: {
      name: 'Văn Phòng Đại Diện AMC',
      title: 'Văn Phòng Đại Diện',
      address: 'CCN Kim Bình, Phù Vân, Ninh Bình',
      shortAddress: 'CCN Kim Bình, Ninh Bình',
      phone: '0865.535.239',
      email: 'ctyphattriennhuaamc@gmail.com',
      workingHours: 'Thứ 2 - Thứ 7: 8h00 - 17h30',
      mapUrl: "https://www.google.com/maps/place/20%C2%B034'25.8%22N+105%C2%B054'52.4%22E/@20.573843,105.9119741,17z/data=!3m1!4b1!4m4!3m3!8m2!3d20.573843!4d105.914549?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
      embedMapUrl: 'https://maps.google.com/maps?q=20.573843,105.914549&t=&z=16&ie=UTF8&iwloc=&output=embed',
    },
    warehouse: {
      name: 'Tổng Kho Nhà Máy AMC',
      title: 'Tổng Kho Nhà Máy AMC',
      address: 'CCN Kim Bình, Phù Vân, Ninh Bình',
      shortAddress: 'Ninh Bình',
      phone: '0325.999.238',
    },

    // Trường tương thích backward
    factoryAddress: 'CCN Kim Bình, Phù Vân, Ninh Bình',
    officeAddress: 'CCN Kim Bình, Phù Vân, Ninh Bình',
    warehouseAddress: 'CCN Kim Bình, Phù Vân, Ninh Bình',

    establishedYear: 2022,
    warrantyYears: 10,
    themeClasses: {
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
    },
    logo: {
      url: '/images/nhuaamc/logo-amc-1024x878.jpg',
      squareUrl: '/images/nhuaamc/logo-amc2.jpg',
      badgeText: 'AMC',
      alt: 'Nhựa AMC - Nhà máy sản xuất gỗ nhựa chất lượng hàng đầu Việt Nam'
    },
    colors: {
      primary: '#deaa26',        // Vàng kim Gold đặc trưng AMC
      primaryHover: '#b88b1b',
      primaryLight: '#fdf6e7',
      primaryDark: '#8f6c15',
      secondary: '#d1a56c',      // Vàng gỗ sang trọng
      secondaryHover: '#be9054',
      dark: '#2e2b27',           // Nâu than tối đặc trưng
      darkBg: '#1e1c19',
      accent: '#27a8e0',         // Xanh AMC
      textMuted: '#6b665f'
    },
    socialLinks: {
      zalo: 'https://zalo.me/0325999238',
      facebook: 'https://www.facebook.com/profile.php?id=61558413806518',
      youtube: 'https://www.youtube.com/@Nh%E1%BB%B1aAMC',
      tiktok: 'https://www.tiktok.com/@amcplastic_?_r=1&_t=ZS-9BANDAJZ5tN',
      email: 'mailto:ctyphattriennhuaamc@gmail.com'
    },
    aboutSummary: 'Ra đời từ năm 2022, AMC tự hào là một trong những nhà sản xuất gỗ nhựa và tấm ốp than tre chất lượng hàng đầu tại Việt Nam. Với hệ thống nhà máy hiện đại đặt tại CCN Kim Bình, Ninh Bình đạt tiêu chuẩn quốc tế, AMC cam kết mang đến những sản phẩm chất lượng tốt nhất, đạt chuẩn an toàn phát thải E0 Châu Âu, chống cháy B1 và keo ép PUR siêu bền.',

    // CẤU HÌNH TÊN VÀ QUY CÁCH SẢN PHẨM TỰ ĐỘNG THEO THƯƠNG HIỆU
    productNaming: {
      brandPrefix: 'Nhựa AMC',
      panelPrefix: 'Tấm Ốp Than Tre',
      flutedPrefix: 'Lam Sóng',
      trimPrefix: 'Nẹp Nhôm Hoàn Thiện',
      board17mmPrefix: 'Tấm Nội Thất 17mm',
      coreMaterial: 'Bột than tre hoạt tính tỷ trọng cao (0.70 - 0.90 g/cm³)',
      glue: 'Keo PUR nóng chảy Jowat nhập khẩu CHLB Đức',
      standard: 'Đạt chuẩn phát thải Formaldehyde E0 Châu Âu, Cản cháy lan B1',
      getWarrantyText: (years = 10) => `Bảo hành kết cấu ${years} năm chính hãng Nhựa AMC`,
      getShortDesc: (name) => `Tấm ốp than tre Nhựa AMC (${name}) cốt than tre hoạt tính tỷ trọng cao, chuẩn an toàn E0, keo PUR Jowat Đức, bảo hành 10 năm.`,
      formatProductName: (baseName, code) => `${baseName} ${code} (Nhựa AMC)`,
    },

    // MẠNG LƯỚI NHÀ PHÂN PHỐI THEO KHU VỰC CỦA AMC
    distributorRegions: [
      {
        region: 'Miền Bắc',
        cities: [
          { name: 'Ninh Bình', address: 'Tổng kho nhà máy CCN Kim Bình, Phù Vân, Ninh Bình' },
          { name: 'Hà Nội', address: 'Kho trung chuyển Hoàng Mai & Hà Đông, TP. Hà Nội' },
          { name: 'Nam Định', address: 'Đại lý phân phối TP. Nam Định' },
          { name: 'Hà Nam', address: 'Đại lý phân phối TP. Phủ Lý' },
          { name: 'Hải Phòng', address: 'Đại lý phân phối khu vực Lê Chân & Thủy Nguyên' },
          { name: 'Quảng Ninh', address: 'Đại lý phân phối TP. Hạ Long & TP. Cẩm Phả' },
          { name: 'Bắc Ninh', address: 'Đại lý phân phối TP. Bắc Ninh & KCN Quế Võ' },
          { name: 'Hải Dương', address: 'Đại lý phân phối TP. Hải Dương' },
        ]
      },
      {
        region: 'Miền Trung',
        cities: [
          { name: 'Thanh Hóa', address: 'Đại lý phân phối TP. Thanh Hóa & Sầm Sơn' },
          { name: 'Nghệ An', address: 'Đại lý phân phối TP. Vinh' },
          { name: 'Đà Nẵng', address: 'Tổng kho phân phối khu vực Cẩm Lệ & Liên Chiểu' },
          { name: 'Khánh Hòa', address: 'Đại lý phân phối TP. Nha Trang' },
        ]
      },
      {
        region: 'Miền Nam',
        cities: [
          { name: 'TP. Hồ Chí Minh', address: 'Hệ thống kho trung chuyển Quận 12 & TP. Thủ Đức' },
          { name: 'Bình Dương', address: 'Đại lý phân phối TP. Thủ Dầu Một' },
          { name: 'Đồng Nai', address: 'Đại lý phân phối TP. Biên Hòa' },
          { name: 'Cần Thơ', address: 'Đại lý phân phối khu vực Ninh Kiều' },
        ]
      }
    ]
  },

  // DOANH NGHIỆP 2: ECOBAMBOO (Bản dự phòng để dễ dàng chuyển đổi qua lại)
  ecobamboo: {
    id: 'ecobamboo',
    brandName: 'ECOBAMBOO',
    shortName: 'Eco Bamboo',
    legalName: 'Công ty Cổ phần Công nghiệp Eco Bamboo',
    factoryName: 'Nhà máy Tấm Ốp Eco Bamboo',
    slogan: 'Vật liệu ốp tường than tre cho không gian hoàn thiện đẹp và bền',
    subSlogan: 'Vật Liệu Xanh Nội Thất',
    domain: 'ecobamboo.vn',
    websiteUrl: 'https://ecobamboo.vn',
    hotline: '0915.189.389',
    hotlineDisplay: '0915.189.389',
    secondaryPhone: '0915.189.389',
    email: 'sale.ecobamboo@gmail.com',

    factory: {
      name: 'Nhà máy Tấm Ốp Eco Bamboo',
      title: 'Nhà Máy Sản Xuất & Tổng Kho',
      address: 'Khu Cầu Nổi, xã Sơn Đồng, huyện Hoài Đức, TP. Hà Nội',
      shortAddress: 'Hoài Đức, Hà Nội',
      phone: '0915.189.389',
      hotline: '0915.189.389',
      capacity: 'Dây chuyền sản xuất tấm ốp than tre và nẹp nhôm công suất lớn.',
    },
    office: {
      name: 'Văn Phòng Đại Diện Eco Bamboo',
      title: 'Văn Phòng Đại Diện Hà Nội',
      address: 'Tòa HH1, 90 Nguyễn Tuân, Q. Thanh Xuân, TP. Hà Nội',
      shortAddress: 'Thanh Xuân, Hà Nội',
      phone: '0915.189.389',
      email: 'sale.ecobamboo@gmail.com',
      workingHours: 'Thứ 2 - Thứ 7: 8h00 - 17h30',
    },
    warehouse: {
      name: 'Tổng Kho Sơn Đồng',
      title: 'Tổng Kho Sơn Đồng',
      address: 'Kho Cầu Nổi, Sơn Đồng, Hoài Đức, Hà Nội',
      shortAddress: 'Hoài Đức, Hà Nội',
      phone: '0915.189.389',
    },

    factoryAddress: 'Khu Cầu Nổi, xã Sơn Đồng, huyện Hoài Đức, TP. Hà Nội',
    officeAddress: 'Tòa HH1, 90 Nguyễn Tuân, Q. Thanh Xuân, TP. Hà Nội',
    warehouseAddress: 'Kho Sơn Đồng, huyện Hoài Đức, TP. Hà Nội',

    establishedYear: 2020,
    warrantyYears: 10,
    themeClasses: {
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
    },
    logo: {
      url: '/images/ecobamboo/logo.png',
      squareUrl: '/images/ecobamboo/logo.png',
      badgeText: 'EB',
      alt: 'Eco Bamboo - Tấm ốp than tre sinh thái'
    },
    colors: {
      primary: '#15803d',
      primaryHover: '#166534',
      primaryLight: '#f0fdf4',
      primaryDark: '#14532d',
      secondary: '#b45309',
      secondaryHover: '#92400e',
      dark: '#1c1917',
      darkBg: '#0c0a09',
      accent: '#3b82f6',
      textMuted: '#78716c'
    },
    socialLinks: {
      zalo: 'https://zalo.me/0915189389',
      facebook: 'https://facebook.com/ecobamboo.vn',
      youtube: 'https://youtube.com',
      email: 'mailto:sale.ecobamboo@gmail.com'
    },
    aboutSummary: 'Eco Bamboo là nhà sản xuất và phân phối hàng đầu về tấm ốp than tre đa năng, lam sóng và phụ kiện trang trí nội thất xanh chuẩn quốc tế tại Việt Nam.',

    productNaming: {
      brandPrefix: 'Eco Bamboo',
      panelPrefix: 'Tấm Ốp Than Tre',
      flutedPrefix: 'Lam Sóng',
      trimPrefix: 'Nẹp Nhôm Hoàn Thiện',
      board17mmPrefix: 'Tấm Nội Thất 17mm',
      coreMaterial: 'Bột than tre hoạt tính tỷ trọng cao (0.70 - 0.90 g/cm³)',
      glue: 'Keo PUR nóng chảy Jowat nhập khẩu CHLB Đức',
      standard: 'Đạt chuẩn phát thải Formaldehyde E0 Châu Âu, Cản cháy lan B1',
      getWarrantyText: (years = 10) => `Bảo hành kết cấu ${years} năm chính hãng Eco Bamboo`,
      getShortDesc: (name) => `Tấm ốp than tre Eco Bamboo (${name}) cốt than tre hoạt tính tỷ trọng cao, chuẩn an toàn E0, keo PUR Jowat Đức, bảo hành 10 năm.`,
      formatProductName: (baseName, code) => `${baseName} ${code} (Eco Bamboo)`,
    },

    distributorRegions: [
      {
        region: 'Miền Bắc',
        cities: [
          { name: 'Hà Nội', address: 'Tổng kho Km8 Đại Lộ Thăng Long, Hoài Đức & Kho Hoàng Mai' },
          { name: 'Hải Phòng', address: 'Đại lý phân phối khu vực Lê Chân & Thủy Nguyên' },
          { name: 'Quảng Ninh', address: 'Đại lý phân phối TP. Hạ Long & TP. Cẩm Phả' },
          { name: 'Bắc Ninh', address: 'Đại lý phân phối TP. Bắc Ninh & KCN Quế Võ' },
          { name: 'Hải Dương', address: 'Đại lý phân phối TP. Hải Dương' },
        ]
      },
      {
        region: 'Miền Trung',
        cities: [
          { name: 'Đà Nẵng', address: 'Tổng kho phân phối khu vực Cẩm Lệ & Liên Chiểu' },
          { name: 'Nghệ An', address: 'Đại lý phân phối TP. Vinh' },
          { name: 'Thanh Hóa', address: 'Đại lý phân phối TP. Thanh Hóa' },
          { name: 'Khánh Hòa', address: 'Đại lý phân phối TP. Nha Trang' },
        ]
      },
      {
        region: 'Miền Nam',
        cities: [
          { name: 'TP. Hồ Chí Minh', address: 'Hệ thống kho trung chuyển Quận 12 & TP. Thủ Đức' },
          { name: 'Bình Dương', address: 'Đại lý phân phối TP. Thủ Dầu Một' },
          { name: 'Đồng Nai', address: 'Đại lý phân phối TP. Biên Hòa' },
          { name: 'Cần Thơ', address: 'Đại lý phân phối khu vực Ninh Kiều' },
        ]
      }
    ]
  }
};

// ==========================================
// 3. XUẤT CÁC BIẾN DÙNG CHUNG DOANH NGHIỆP NHỰA (PLASTICS ENTERPRISE SHARED CONFIG)
// ==========================================
// ĐỔI DUY NHẤT BIẾN NÀY ĐỂ CHUYỂN TOÀN BỘ WEBSITE SANG THƯƠNG HIỆU KHÁC:
export const ACTIVE_BRAND = 'amc'; // 'amc' hoặc 'ecobamboo'
export const PLASTICS_ENTERPRISE_ACTIVE_BRAND = ACTIVE_BRAND;

export const PLASTICS_ENTERPRISE_BRANDS = BRANDS;
export const BRAND = BRANDS[ACTIVE_BRAND] || BRANDS.amc;
export const PLASTICS_ENTERPRISE_BRAND = BRAND;

export const DISTRIBUTOR_REGIONS = BRAND.distributorRegions || [];
export const PLASTICS_ENTERPRISE_DISTRIBUTOR_REGIONS = DISTRIBUTOR_REGIONS;

export const PRODUCT_NAMING = BRAND.productNaming || {};
export const PLASTICS_ENTERPRISE_PRODUCT_NAMING = PRODUCT_NAMING;

// Helper lấy mô tả sản phẩm động theo thương hiệu hiện tại
export const getProductShortDesc = (productName = '') => {
  if (PRODUCT_NAMING.getShortDesc) {
    return PRODUCT_NAMING.getShortDesc(productName);
  }
  return `Tấm ốp than tre ${BRAND.shortName} cốt than tre hoạt tính tỷ trọng cao, chuẩn an toàn E0, keo PUR Jowat Đức, bảo hành ${BRAND.warrantyYears} năm.`;
};

// Helper lấy chuỗi bảo hành sản phẩm động
export const getProductWarranty = () => {
  if (PRODUCT_NAMING.getWarrantyText) {
    return PRODUCT_NAMING.getWarrantyText(BRAND.warrantyYears);
  }
  return `Bảo hành kết cấu ${BRAND.warrantyYears} năm chính hãng ${BRAND.shortName}`;
};

// Helper format tên sản phẩm động
export const formatProductName = (baseName, code) => {
  if (PRODUCT_NAMING.formatProductName) {
    return PRODUCT_NAMING.formatProductName(baseName, code);
  }
  return `${baseName} ${code}`;
};

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
export const PLASTICS_ENTERPRISE_THEME = THEME;

// Cấu hình doanh nghiệp dùng chung toàn hệ thống
export const PLASTICS_ENTERPRISE_CONFIG = {
  activeBrand: ACTIVE_BRAND,
  brands: BRANDS,
  current: BRAND,
  regions: DISTRIBUTOR_REGIONS,
  productNaming: PRODUCT_NAMING,
  theme: THEME
};

export default BRAND;
