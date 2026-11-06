// Database sản phẩm chính xác, được trừu tượng hóa động theo cấu hình thương hiệu BRAND
// Hỗ trợ tái sử dụng và chuyển đổi linh hoạt giữa các thương hiệu (AMC, EcoBamboo,...)

import BRAND, {
  PRODUCT_NAMING,
  getProductShortDesc,
  getProductWarranty,
  formatProductName
} from '../config/brandConfig';

export const CATEGORY_FILTERS = [
  { id: 'all', name: 'Tất cả sản phẩm', count: 15 },
  { id: 'tam-op-than-tre', name: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} 5mm & 8mm`, count: 12 },
  { id: 'tam-than-tre-17mm', name: PRODUCT_NAMING.board17mmPrefix || 'Tấm Nội Thất 17mm', count: 1 },
  { id: 'lam-song', name: `${PRODUCT_NAMING.flutedPrefix || 'Lam Sóng'} Trang Trí`, count: 1 },
  { id: 'nep', name: PRODUCT_NAMING.trimPrefix || 'Nẹp Nhôm Hoàn Thiện', count: 1 },
];

export const SURFACE_FILTERS = [
  { id: 'all', name: 'Tất cả bề mặt' },
  { id: 'van-go', name: 'Vân Gỗ (Walnut, Oak)' },
  { id: 'don-sac', name: 'Đơn Sắc (White, Grey, Latte, Skin)' },
  { id: 'van-da', name: 'Vân Đá (Luxe, Calacatta PET-G)' },
  { id: 'van-vai', name: 'Vân Vải (Beige Cream, Rimini)' },
];

export const THICKNESS_FILTERS = [
  { id: '5mm', name: '5mm (Ốp tường uốn cong 90°)' },
  { id: '8mm', name: '8mm (Chuẩn ốp tường cao cấp & chống va đập)' },
  { id: '17mm', name: '17mm (Tấm cánh tủ cốt đen Loại 1 & 2)' },
];

export const TECHNICAL_SPECS_TABLE = [
  { criteria: 'Khổ tấm tiêu chuẩn', value: '1220 × 2440 mm · 1220 × 2800 mm · 1220 × 3200 mm' },
  { criteria: 'Độ dày khả dụng', value: '5mm · 8mm · 8mm chống va đập · 17mm' },
  { criteria: 'Loại film phủ', value: 'PVC cao cấp dày 0.14 – 0.18mm · Film PET-G siêu chống trầy' },
  { criteria: 'Màu sắc tấm cốt', value: 'Cốt than tre hoạt tính nén màu đen đặc' },
  { criteria: 'Mật độ nén cốt', value: '≥ 0.70 g/cm³ (Loại chống va đập: 0.90 g/cm³)' },
  { criteria: 'Tỷ lệ nhựa PVC trong cốt', value: 'Từ 45–50% trở lên (chống giòn gãy, kháng nước tuyệt đối)' },
  { criteria: 'Phát thải Formaldehyde', value: '0.40 mg/L — Đạt chuẩn E0 Châu Âu (≤ 0.5 mg/L)' },
  { criteria: 'Kháng cháy lan', value: 'Cấp B1 — Tự dập tắt khi cách ly nguồn nhiệt' },
  { criteria: 'Độ trương nở khi ngâm nước', value: '0.21% (Tiêu chuẩn yêu cầu ≤ 0.5%)' },
  { criteria: 'Keo dán ép film', value: PRODUCT_NAMING.glue || 'Keo PUR nóng chảy Jowat nhập khẩu Đức' },
];

/**
 * Hàm khởi tạo sản phẩm chuẩn hóa (Factory helper)
 * Tự động gắn các thông số bảo hành, mô tả, keo, cốt và tên sản phẩm theo thương hiệu hiện hành
 */
export const createProductItem = ({
  id,
  code,
  baseName,
  subDesc,
  category,
  surfaceGroup,
  categoryName,
  pricePerM2,
  priceFormatted,
  thickness = '5mm / 8mm',
  thicknessOptions = ['5mm', '8mm', '17mm'],
  dimensions = '1220 x 2440 / 2800 / 3200 mm',
  finish = 'Phủ film PVC/PETG cao cấp chống trầy xước, lau chùi dầu mỡ dễ dàng',
  badge,
  colorHex,
  image,
  swatchImage,
  fullBoardImage,
  sceneImage,
  lamSongImage,
  gallery,
  specs,
  customName,
  customShortDesc,
}) => {
  const name = customName || (subDesc ? `${baseName} ${code} (${subDesc})` : `${baseName}`);
  return {
    id,
    code,
    url: `${id}.html`,
    canonicalUrl: `/san-pham/${category}/${surfaceGroup}/${id}.html`,
    name,
    category,
    surfaceGroup,
    categoryName: categoryName || `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} ${surfaceGroup}`,
    pricePerM2,
    priceFormatted,
    thickness,
    thicknessOptions,
    dimensions,
    finish,
    core: PRODUCT_NAMING.coreMaterial || 'Bột than tre hoạt tính tỷ trọng cao (0.70 - 0.90 g/cm³)',
    glue: PRODUCT_NAMING.glue || 'Keo PUR nóng chảy Jowat nhập khẩu CHLB Đức',
    standard: PRODUCT_NAMING.standard || 'Đạt chuẩn phát thải Formaldehyde E0 Châu Âu, Cản cháy lan B1',
    warranty: getProductWarranty(),
    inStock: true,
    badge,
    colorHex,
    image,
    swatchImage,
    fullBoardImage,
    sceneImage,
    lamSongImage,
    gallery,
    shortDesc: customShortDesc || getProductShortDesc(name),
    specs: specs || [
      { label: 'Quy cách khổ', value: '1220 × 2440 / 2800 / 3200 mm' },
      { label: 'Độ dày', value: '5mm (uốn cong) / 8mm (chuẩn vách)' },
      { label: 'Mật độ nén', value: '0.70 g/cm³ (Bản chống va đập 0.90 g/cm³)' },
      { label: 'Tỷ lệ nhựa PVC', value: '≥ 45–50% cốt tấm' },
      { label: 'Phát thải Formaldehyde', value: '0.40 mg/L — Cấp E0 an toàn' },
      { label: 'Công nghệ ép', value: 'Dây chuyền PUR tự động hóa' }
    ]
  };
};

export const PRODUCTS = [
  createProductItem({
    id: 'eb66006',
    code: 'EB66006',
    baseName: 'Walnut',
    subDesc: 'Gỗ Óc Chó Sang Trọng',
    category: 'tam-op-than-tre',
    surfaceGroup: 'van-go',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Vân Gỗ`,
    pricePerM2: 305000,
    priceFormatted: '305.000 đ/m²',
    badge: 'Bán chạy nhất',
    colorHex: '#7a5230',
    image: '/images/ecobamboo/EB66006-w800.webp',
    swatchImage: '/images/ecobamboo/EB66006_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB66006-tam-w400.webp',
    sceneImage: '/images/ecobamboo/1EB66006-1-scaled-9050b8.webp',
    lamSongImage: '/images/ecobamboo/EBL66006_sm.webp',
    gallery: [
      '/images/ecobamboo/EB66006-w800.webp',
      '/images/ecobamboo/EB66006_sm.webp',
      '/images/ecobamboo/EB66006-tam-w400.webp',
      '/images/ecobamboo/1EB66006-1-scaled-9050b8.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb68038',
    code: 'EB68038',
    baseName: 'White',
    subDesc: 'Trắng Tinh Khiết Siêu Mờ',
    category: 'tam-op-than-tre',
    surfaceGroup: 'don-sac',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Đơn Sắc`,
    pricePerM2: 240000,
    priceFormatted: '240.000 đ/m²',
    badge: 'Giá tốt nhất',
    colorHex: '#f4f4f4',
    image: '/images/ecobamboo/EB68038-w800.webp',
    swatchImage: '/images/ecobamboo/EB68038_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB68038-w800.webp',
    sceneImage: '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB68038-w800.webp',
      '/images/ecobamboo/EB68038_sm.webp',
      '/images/ecobamboo/EB68038-w800.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb68032g',
    code: 'EB68032G',
    baseName: 'Glossy Light Grey',
    subDesc: 'Xám Nhạt Bóng Gương',
    category: 'tam-op-than-tre',
    surfaceGroup: 'don-sac',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Đơn Sắc Bóng Gương`,
    pricePerM2: 350000,
    priceFormatted: '350.000 đ/m²',
    badge: 'Bóng gương PETG',
    colorHex: '#d6d7d9',
    image: '/images/ecobamboo/EB68032G-w800.webp',
    swatchImage: '/images/ecobamboo/EB68032G_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB68032G-tam-w400.webp',
    sceneImage: '/images/ecobamboo/EB68032G-w400.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB68032G-w800.webp',
      '/images/ecobamboo/EB68032G_sm.webp',
      '/images/ecobamboo/EB68032G-tam-w400.webp',
      '/images/ecobamboo/EB68032G-w400.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb68031g',
    code: 'EB68031G',
    baseName: 'Glossy White',
    subDesc: 'Trắng Bóng Gương',
    category: 'tam-op-than-tre',
    surfaceGroup: 'don-sac',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Đơn Sắc Bóng Gương`,
    pricePerM2: 350000,
    priceFormatted: '350.000 đ/m²',
    badge: 'Bóng gương PETG',
    colorHex: '#ffffff',
    image: '/images/ecobamboo/EB68031G-w800.webp',
    swatchImage: '/images/ecobamboo/EB68031G_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB68031G-tam-w400.webp',
    sceneImage: '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB68031G-w800.webp',
      '/images/ecobamboo/EB68031G_sm.webp',
      '/images/ecobamboo/EB68031G-tam-w400.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb89028',
    code: 'EB89028',
    baseName: 'Luxe',
    subDesc: 'Vân Đá Luxe Tự Nhiên',
    category: 'tam-op-than-tre',
    surfaceGroup: 'van-da',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Vân Đá`,
    pricePerM2: 310000,
    priceFormatted: '310.000 đ/m²',
    badge: 'Vân đá cẩm thạch',
    colorHex: '#8d877e',
    image: '/images/ecobamboo/EB89028-w800.webp',
    swatchImage: '/images/ecobamboo/EB89028_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB89028-tam-w400.webp',
    sceneImage: '/images/ecobamboo/EB89028-w400.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB89028-w800.webp',
      '/images/ecobamboo/EB89028_sm.webp',
      '/images/ecobamboo/EB89028-tam-w400.webp',
      '/images/ecobamboo/EB89028-w400.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb68033g',
    code: 'EB68033G',
    baseName: 'Glossy Dark Grey',
    subDesc: 'Xám Đậm Bóng Gương',
    category: 'tam-op-than-tre',
    surfaceGroup: 'don-sac',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Đơn Sắc Bóng Gương`,
    pricePerM2: 350000,
    priceFormatted: '350.000 đ/m²',
    badge: 'Bóng gương PETG',
    colorHex: '#4f5358',
    image: '/images/ecobamboo/EB68033G-w800.webp',
    swatchImage: '/images/ecobamboo/EB68033G_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB68033G-tam-w400.webp',
    sceneImage: '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB68033G-w800.webp',
      '/images/ecobamboo/EB68033G_sm.webp',
      '/images/ecobamboo/EB68033G-tam-w400.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb68017',
    code: 'EB68017',
    baseName: 'Light-grey Skin',
    subDesc: 'Màu Be Xám Siêu Mịn',
    category: 'tam-op-than-tre',
    surfaceGroup: 'don-sac',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Đơn Sắc Skin`,
    pricePerM2: 330000,
    priceFormatted: '330.000 đ/m²',
    badge: 'Bề mặt Skin mờ',
    colorHex: '#c9c2b9',
    image: '/images/ecobamboo/EB68017-w800.webp',
    swatchImage: '/images/ecobamboo/EB68017_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB68017-tam-w400.webp',
    sceneImage: '/images/ecobamboo/2EB68017-scaled-c91008.webp',
    lamSongImage: '/images/ecobamboo/EBL68017_sm.webp',
    gallery: [
      '/images/ecobamboo/EB68017-w800.webp',
      '/images/ecobamboo/EB68017_sm.webp',
      '/images/ecobamboo/EB68017-tam-w400.webp',
      '/images/ecobamboo/2EB68017-scaled-c91008.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb68037',
    code: 'EB68037',
    baseName: 'Light Grey',
    subDesc: 'Xám Ghi Nhạt Mờ',
    category: 'tam-op-than-tre',
    surfaceGroup: 'don-sac',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Đơn Sắc Mờ`,
    pricePerM2: 330000,
    priceFormatted: '330.000 đ/m²',
    badge: 'Màu hiện đại',
    colorHex: '#b8bac0',
    image: '/images/ecobamboo/EB68037-w800.webp',
    swatchImage: '/images/ecobamboo/EB68037_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB68037-tam-w400.webp',
    sceneImage: '/images/ecobamboo/EB68037-1-scaled-a9d0d8.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB68037-w800.webp',
      '/images/ecobamboo/EB68037_sm.webp',
      '/images/ecobamboo/EB68037-tam-w400.webp',
      '/images/ecobamboo/EB68037-1-scaled-a9d0d8.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb68040',
    code: 'EB68040G',
    baseName: 'Glossy Latte',
    subDesc: 'Latte Ánh Vàng Kem',
    category: 'tam-op-than-tre',
    surfaceGroup: 'don-sac',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Đơn Sắc Bóng Gương`,
    pricePerM2: 350000,
    priceFormatted: '350.000 đ/m²',
    badge: 'Bóng gương PETG',
    colorHex: '#cfbca6',
    image: '/images/ecobamboo/EB68040G-w800.webp',
    swatchImage: '/images/ecobamboo/EB68040G_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB68040G-tam-w400.webp',
    sceneImage: '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB68040G-w800.webp',
      '/images/ecobamboo/EB68040G_sm.webp',
      '/images/ecobamboo/EB68040G-tam-w400.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb79019',
    code: 'EB79019',
    baseName: 'Beige Cream',
    subDesc: 'Vân Vải Lanh Kem Be',
    category: 'tam-op-than-tre',
    surfaceGroup: 'van-vai',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Vân Vải`,
    pricePerM2: 310000,
    priceFormatted: '310.000 đ/m²',
    badge: 'Vân vải lanh mộc',
    colorHex: '#ded5c7',
    image: '/images/ecobamboo/EB79019-w800.webp',
    swatchImage: '/images/ecobamboo/EB79019_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB79019-tam-w400.webp',
    sceneImage: '/images/ecobamboo/1EB79019-scaled-79b7dc.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB79019-w800.webp',
      '/images/ecobamboo/EB79019_sm.webp',
      '/images/ecobamboo/EB79019-tam-w400.webp',
      '/images/ecobamboo/1EB79019-scaled-79b7dc.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb79021',
    code: 'EB79021',
    baseName: 'Rimini',
    subDesc: 'Vân Vải Xám Rimini Ý',
    category: 'tam-op-than-tre',
    surfaceGroup: 'van-vai',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Vân Vải`,
    pricePerM2: 310000,
    priceFormatted: '310.000 đ/m²',
    badge: 'Vân vải Ý sang trọng',
    colorHex: '#b0aba2',
    image: '/images/ecobamboo/EB79021-w800.webp',
    swatchImage: '/images/ecobamboo/EB79021_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB79021-tam-w400.webp',
    sceneImage: '/images/ecobamboo/4EB79021-5-scaled-50627f.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB79021-w800.webp',
      '/images/ecobamboo/EB79021_sm.webp',
      '/images/ecobamboo/EB79021-tam-w400.webp',
      '/images/ecobamboo/4EB79021-5-scaled-50627f.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'eb89019g',
    code: 'EB89019G',
    baseName: 'Calacatta PET-G',
    subDesc: 'Đá Trắng Hy Lạp Calacatta',
    category: 'tam-op-than-tre',
    surfaceGroup: 'van-da',
    categoryName: `${PRODUCT_NAMING.panelPrefix || 'Tấm Ốp Than Tre'} Vân Đá PETG Cao Cấp`,
    pricePerM2: 550000,
    priceFormatted: '550.000 đ/m²',
    badge: 'Dòng PET-G Cao Cấp',
    colorHex: '#eae8e4',
    image: '/images/ecobamboo/EB89019G-w800.webp',
    swatchImage: '/images/ecobamboo/EB89019G_sm.webp',
    fullBoardImage: '/images/ecobamboo/EB89019G-tam-w400.webp',
    sceneImage: '/images/ecobamboo/Untitled-1-11-3-scaled-4bf19b.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/EB89019G-w800.webp',
      '/images/ecobamboo/EB89019G_sm.webp',
      '/images/ecobamboo/EB89019G-tam-w400.webp',
      '/images/ecobamboo/Untitled-1-11-3-scaled-4bf19b.webp',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]
  }),
  createProductItem({
    id: 'tam-noi-that-17mm',
    code: 'EB17MM',
    customName: `${PRODUCT_NAMING.board17mmPrefix || 'Tấm Nội Thất Than Tre 17mm'} Đóng Cánh Tủ`,
    category: 'tam-than-tre-17mm',
    surfaceGroup: 'don-sac',
    categoryName: PRODUCT_NAMING.board17mmPrefix || 'Tấm Nội Thất 17mm',
    pricePerM2: 650000,
    priceFormatted: '650.000 đ/tấm',
    thickness: '17mm',
    thicknessOptions: ['17mm'],
    dimensions: '1220 x 2440 mm',
    finish: 'Phủ film 1 hoặc 2 mặt, bọc cạnh không lộ cốt',
    badge: 'Chuyên Đóng Cánh Tủ',
    colorHex: '#212429',
    image: '/images/ecobamboo/tam-than-tre-17mm.jpg',
    swatchImage: '/images/ecobamboo/17mmArtboard-2-copy-2.webp',
    fullBoardImage: '/images/ecobamboo/so-sanh-tam-than-tre-17mm-go-cong-nghiep-4daaf2.webp',
    sceneImage: '/images/ecobamboo/tu-lavabo-tam-than-tre-17mm-a2fefa.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/tam-than-tre-17mm.jpg',
      '/images/ecobamboo/so-sanh-tam-than-tre-17mm-go-cong-nghiep-4daaf2.webp',
      '/images/ecobamboo/tu-lavabo-tam-than-tre-17mm-a2fefa.webp'
    ],
    specs: [
      { label: 'Quy cách', value: '1220 x 2440 mm' },
      { label: 'Độ dày / Biên dạng', value: '17mm' },
      { label: 'Bề mặt hoàn thiện', value: 'Phủ film 1 hoặc 2 mặt, bọc cạnh không lộ cốt' },
      { label: 'Tiêu chuẩn an toàn', value: 'E0 Châu Âu' }
    ]
  }),
  createProductItem({
    id: 'lam-song-than-tre',
    code: 'EBL-ALL',
    customName: `${PRODUCT_NAMING.flutedPrefix || 'Lam Sóng Trang Trí'} Than Tre (Lam Vuông & Bán Nguyệt)`,
    category: 'lam-song',
    surfaceGroup: 'van-go',
    categoryName: `${PRODUCT_NAMING.flutedPrefix || 'Lam Sóng'} Trang Trí Than Tre`,
    pricePerM2: 185000,
    priceFormatted: '185.000 đ/thanh',
    thickness: '15mm - 20mm',
    thicknessOptions: ['15mm - 20mm'],
    dimensions: 'Rộng 150-200mm x Dài 2800 / 3000mm',
    finish: 'Đồng bộ 100% mã màu film với tấm ốp phẳng',
    badge: 'Điểm Nhấn Vách 3D',
    colorHex: '#7b5434',
    image: '/images/ecobamboo/Lam-song.webp',
    swatchImage: '/images/ecobamboo/Lam-song.webp',
    fullBoardImage: '/images/ecobamboo/Lam-vuong-co-to-mau-go-oc-cho-EBL88004-scaled-0c772b.webp',
    sceneImage: '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/Lam-song.webp',
      '/images/ecobamboo/Lam-vuong-co-to-mau-go-oc-cho-EBL88004-scaled-0c772b.webp',
      '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp'
    ],
    specs: [
      { label: 'Quy cách', value: 'Rộng 150-200mm x Dài 2800 / 3000mm' },
      { label: 'Độ dày / Biên dạng', value: '15mm - 20mm' },
      { label: 'Bề mặt hoàn thiện', value: 'Đồng bộ 100% mã màu film với tấm ốp phẳng' },
      { label: 'Tiêu chuẩn an toàn', value: 'E0 Châu Âu' }
    ]
  }),
  createProductItem({
    id: 'nep-nhom-dong-bo',
    code: 'EBN-ALL',
    customName: `${PRODUCT_NAMING.trimPrefix || 'Hệ Nẹp Nhôm Hoàn Thiện'} & Hắt Sáng LED (30+ Mã)`,
    category: 'nep',
    surfaceGroup: 'don-sac',
    categoryName: `Phụ Kiện ${PRODUCT_NAMING.trimPrefix || 'Nẹp Nhôm'} Đồng Bộ`,
    pricePerM2: 65000,
    priceFormatted: '65.000 đ/thanh',
    thickness: 'Dùng cho tấm 5mm & 8mm',
    thicknessOptions: ['Dùng cho tấm 5mm & 8mm'],
    dimensions: 'Dài 2800mm / 3000mm',
    finish: 'Vàng gương, Vàng mờ, Đen bóng, Đen mờ, Inox, Bạc',
    badge: 'Mạ Anode Cao Cấp',
    colorHex: '#c8a86b',
    image: '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
    swatchImage: '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
    fullBoardImage: '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
    sceneImage: '/images/ecobamboo/vach-tivi-khe-doc.jpg',
    lamSongImage: '/images/ecobamboo/Lam-song.webp',
    gallery: [
      '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
      '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
      '/images/ecobamboo/vach-tivi-khe-doc.jpg'
    ],
    specs: [
      { label: 'Quy cách', value: 'Dài 2800mm / 3000mm' },
      { label: 'Độ dày / Biên dạng', value: 'Dùng cho tấm 5mm & 8mm' },
      { label: 'Bề mặt hoàn thiện', value: 'Vàng gương, Vàng mờ, Đen bóng, Đen mờ, Inox, Bạc' },
      { label: 'Tiêu chuẩn an toàn', value: 'E0 Châu Âu' }
    ]
  }),
];

/**
 * Các hàm helper tra cứu sản phẩm
 */
export const getProductByCode = (code) => {
  if (!code) return null;
  const clean = code.toLowerCase().trim();
  return PRODUCTS.find(p => p.code.toLowerCase() === clean || p.id.toLowerCase() === clean);
};

export const getProductsByCategory = (categoryId) => {
  if (!categoryId || categoryId === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === categoryId);
};
