import json
import os

extracted = json.load(open('src/data/extracted_products.json', encoding='utf-8'))

# Metadata for each product matching ecobamboo
product_meta = {
    'EB66006': {
        'id': 'eb66006',
        'name': 'Walnut EB66006 (Gỗ Óc Chó Sang Trọng)',
        'surfaceGroup': 'van-go',
        'categoryName': 'Tấm Ốp Than Tre Vân Gỗ',
        'price': 305000,
        'priceFormatted': '305.000 đ/m²',
        'colorHex': '#7a5230',
        'swatch': '/images/ecobamboo/EB66006_sm.webp',
        'mainImage': '/images/ecobamboo/EB66006-w800.webp',
        'fullBoard': '/images/ecobamboo/EB66006-tam-w400.webp',
        'scene': '/images/ecobamboo/1EB66006-1-scaled-9050b8.webp',
        'lamSong': '/images/ecobamboo/EBL66006_sm.webp',
        'badge': 'Bán chạy nhất'
    },
    'EB68038': {
        'id': 'eb68038',
        'name': 'White EB68038 (Trắng Tinh Khiết Siêu Mờ)',
        'surfaceGroup': 'don-sac',
        'categoryName': 'Tấm Ốp Than Tre Đơn Sắc',
        'price': 240000,
        'priceFormatted': '240.000 đ/m²',
        'colorHex': '#f4f4f4',
        'swatch': '/images/ecobamboo/EB68038_sm.webp',
        'mainImage': '/images/ecobamboo/EB68038-w800.webp',
        'fullBoard': '/images/ecobamboo/EB68038-w400.webp',
        'scene': '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
        'lamSong': '/images/ecobamboo/EBL68038_sm.webp' if os.path.exists('public/images/ecobamboo/EBL68038_sm.webp') else '/images/ecobamboo/Lam-song.webp',
        'badge': 'Giá tốt nhất'
    },
    'EB68032G': {
        'id': 'eb68032g',
        'name': 'Glossy Light Grey EB68032G (Xám Nhạt Bóng Gương)',
        'surfaceGroup': 'don-sac',
        'categoryName': 'Tấm Ốp Than Tre Đơn Sắc Bóng Gương',
        'price': 350000,
        'priceFormatted': '350.000 đ/m²',
        'colorHex': '#d6d7d9',
        'swatch': '/images/ecobamboo/EB68032G_sm.webp',
        'mainImage': '/images/ecobamboo/EB68032G-w800.webp',
        'fullBoard': '/images/ecobamboo/EB68032G-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB68032G-tam-w400.webp') else '/images/ecobamboo/EB68032G-w400.webp',
        'scene': '/images/ecobamboo/2EB68032G-1-scaled-c6628c.webp' if os.path.exists('public/images/ecobamboo/2EB68032G-1-scaled-c6628c.webp') else '/images/ecobamboo/EB68032G-w400.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Bóng gương PETG'
    },
    'EB68031G': {
        'id': 'eb68031g',
        'name': 'Glossy White EB68031G (Trắng Bóng Gương)',
        'surfaceGroup': 'don-sac',
        'categoryName': 'Tấm Ốp Than Tre Đơn Sắc Bóng Gương',
        'price': 350000,
        'priceFormatted': '350.000 đ/m²',
        'colorHex': '#ffffff',
        'swatch': '/images/ecobamboo/EB68031G_sm.webp',
        'mainImage': '/images/ecobamboo/EB68031G-w800.webp',
        'fullBoard': '/images/ecobamboo/EB68031G-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB68031G-tam-w400.webp') else '/images/ecobamboo/EB68031G-w400.webp',
        'scene': '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Bóng gương PETG'
    },
    'EB89028': {
        'id': 'eb89028',
        'name': 'Luxe EB89028 (Vân Đá Luxe Tự Nhiên)',
        'surfaceGroup': 'van-da',
        'categoryName': 'Tấm Ốp Than Tre Vân Đá',
        'price': 310000,
        'priceFormatted': '310.000 đ/m²',
        'colorHex': '#8d877e',
        'swatch': '/images/ecobamboo/EB89028_sm.webp',
        'mainImage': '/images/ecobamboo/EB89028-w800.webp',
        'fullBoard': '/images/ecobamboo/EB89028-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB89028-tam-w400.webp') else '/images/ecobamboo/EB89028-w400.webp',
        'scene': '/images/ecobamboo/1EB89028-scaled-358045.webp' if os.path.exists('public/images/ecobamboo/1EB89028-scaled-358045.webp') else '/images/ecobamboo/EB89028-w400.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Vân đá cẩm thạch'
    },
    'EB68033G': {
        'id': 'eb68033g',
        'name': 'Glossy Dark Grey EB68033G (Xám Đậm Bóng Gương)',
        'surfaceGroup': 'don-sac',
        'categoryName': 'Tấm Ốp Than Tre Đơn Sắc Bóng Gương',
        'price': 350000,
        'priceFormatted': '350.000 đ/m²',
        'colorHex': '#4f5358',
        'swatch': '/images/ecobamboo/EB68033G_sm.webp',
        'mainImage': '/images/ecobamboo/EB68033G-w800.webp',
        'fullBoard': '/images/ecobamboo/EB68033G-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB68033G-tam-w400.webp') else '/images/ecobamboo/EB68033G-w400.webp',
        'scene': '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Bóng gương PETG'
    },
    'EB68017': {
        'id': 'eb68017',
        'name': 'Light-grey Skin EB68017 (Màu Be Xám Siêu Mịn)',
        'surfaceGroup': 'don-sac',
        'categoryName': 'Tấm Ốp Than Tre Đơn Sắc Skin',
        'price': 330000,
        'priceFormatted': '330.000 đ/m²',
        'colorHex': '#c9c2b9',
        'swatch': '/images/ecobamboo/EB68017_sm.webp',
        'mainImage': '/images/ecobamboo/EB68017-w800.webp',
        'fullBoard': '/images/ecobamboo/EB68017-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB68017-tam-w400.webp') else '/images/ecobamboo/EB68017-w400.webp',
        'scene': '/images/ecobamboo/2EB68017-scaled-c91008.webp' if os.path.exists('public/images/ecobamboo/2EB68017-scaled-c91008.webp') else '/images/ecobamboo/2EB68017-scaled.webp',
        'lamSong': '/images/ecobamboo/EBL68017_sm.webp' if os.path.exists('public/images/ecobamboo/EBL68017_sm.webp') else '/images/ecobamboo/Lam-song.webp',
        'badge': 'Bề mặt Skin mờ'
    },
    'EB68037': {
        'id': 'eb68037',
        'name': 'Light Grey EB68037 (Xám Ghi Nhạt Mờ)',
        'surfaceGroup': 'don-sac',
        'categoryName': 'Tấm Ốp Than Tre Đơn Sắc Mờ',
        'price': 330000,
        'priceFormatted': '330.000 đ/m²',
        'colorHex': '#b8bac0',
        'swatch': '/images/ecobamboo/EB68037_sm.webp' if os.path.exists('public/images/ecobamboo/EB68037_sm.webp') else '/images/ecobamboo/EB68037-w400.webp',
        'mainImage': '/images/ecobamboo/EB68037-w800.webp',
        'fullBoard': '/images/ecobamboo/EB68037-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB68037-tam-w400.webp') else '/images/ecobamboo/EB68037-w400.webp',
        'scene': '/images/ecobamboo/EB68037-1-scaled-a9d0d8.webp' if os.path.exists('public/images/ecobamboo/EB68037-1-scaled-a9d0d8.webp') else '/images/ecobamboo/EB68037-w400.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Màu hiện đại'
    },
    'EB68040G': {
        'id': 'eb68040',
        'name': 'Glossy Latte EB68040G (Latte Ánh Vàng Kem)',
        'surfaceGroup': 'don-sac',
        'categoryName': 'Tấm Ốp Than Tre Đơn Sắc Bóng Gương',
        'price': 350000,
        'priceFormatted': '350.000 đ/m²',
        'colorHex': '#cfbca6',
        'swatch': '/images/ecobamboo/EB68040G_sm.webp' if os.path.exists('public/images/ecobamboo/EB68040G_sm.webp') else '/images/ecobamboo/EB68040G-w400.webp',
        'mainImage': '/images/ecobamboo/EB68040G-w800.webp',
        'fullBoard': '/images/ecobamboo/EB68040G-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB68040G-tam-w400.webp') else '/images/ecobamboo/EB68040G-w400.webp',
        'scene': '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Bóng gương PETG'
    },
    'EB79019': {
        'id': 'eb79019',
        'name': 'Beige Cream EB79019 (Vân Vải Lanh Kem Be)',
        'surfaceGroup': 'van-vai',
        'categoryName': 'Tấm Ốp Than Tre Vân Vải',
        'price': 310000,
        'priceFormatted': '310.000 đ/m²',
        'colorHex': '#ded5c7',
        'swatch': '/images/ecobamboo/EB79019_sm.webp' if os.path.exists('public/images/ecobamboo/EB79019_sm.webp') else '/images/ecobamboo/EB79019-w400.webp',
        'mainImage': '/images/ecobamboo/EB79019-w800.webp',
        'fullBoard': '/images/ecobamboo/EB79019-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB79019-tam-w400.webp') else '/images/ecobamboo/EB79019-w400.webp',
        'scene': '/images/ecobamboo/1EB79019-scaled-79b7dc.webp' if os.path.exists('public/images/ecobamboo/1EB79019-scaled-79b7dc.webp') else '/images/ecobamboo/EB79019-scaled.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Vân vải lanh mộc'
    },
    'EB79021': {
        'id': 'eb79021',
        'name': 'Rimini EB79021 (Vân Vải Xám Rimini Ý)',
        'surfaceGroup': 'van-vai',
        'categoryName': 'Tấm Ốp Than Tre Vân Vải',
        'price': 310000,
        'priceFormatted': '310.000 đ/m²',
        'colorHex': '#b0aba2',
        'swatch': '/images/ecobamboo/EB79021_sm.webp' if os.path.exists('public/images/ecobamboo/EB79021_sm.webp') else '/images/ecobamboo/EB79021-w400.webp',
        'mainImage': '/images/ecobamboo/EB79021-w800.webp',
        'fullBoard': '/images/ecobamboo/EB79021-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB79021-tam-w400.webp') else '/images/ecobamboo/EB79021-w400.webp',
        'scene': '/images/ecobamboo/4EB79021-5-scaled-50627f.webp' if os.path.exists('public/images/ecobamboo/4EB79021-5-scaled-50627f.webp') else '/images/ecobamboo/EB79021-w400.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Vân vải Ý sang trọng'
    },
    'EB89019G': {
        'id': 'eb89019g',
        'name': 'Calacatta PET-G EB89019G (Đá Trắng Hy Lạp Calacatta)',
        'surfaceGroup': 'van-da',
        'categoryName': 'Tấm Ốp Than Tre Vân Đá PETG Cao Cấp',
        'price': 550000,
        'priceFormatted': '550.000 đ/m²',
        'colorHex': '#eae8e4',
        'swatch': '/images/ecobamboo/EB89019G_sm.webp' if os.path.exists('public/images/ecobamboo/EB89019G_sm.webp') else '/images/ecobamboo/EB89019G-w400.webp',
        'mainImage': '/images/ecobamboo/EB89019G-w800.webp',
        'fullBoard': '/images/ecobamboo/EB89019G-tam-w400.webp' if os.path.exists('public/images/ecobamboo/EB89019G-tam-w400.webp') else '/images/ecobamboo/EB89019G-w400.webp',
        'scene': '/images/ecobamboo/Untitled-1-11-3-scaled-4bf19b.webp' if os.path.exists('public/images/ecobamboo/Untitled-1-11-3-scaled-4bf19b.webp') else '/images/ecobamboo/EB89019G-w400.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Dòng PET-G Cao Cấp'
    }
}

# Also 3 special main category products for 17mm, lam-song, nep
extra_products = [
    {
        'id': 'tam-noi-that-17mm',
        'code': 'EB17MM',
        'url': '/tam-than-tre-17mm',
        'name': 'Tấm Nội Thất Than Tre 17mm Đóng Cánh Tủ',
        'category': 'tam-than-tre-17mm',
        'surfaceGroup': 'don-sac',
        'categoryName': 'Tấm Than Tre 17mm',
        'price': 650000,
        'priceFormatted': '650.000 đ/tấm',
        'colorHex': '#212429',
        'swatch': '/images/ecobamboo/17mmArtboard-2-copy-2.webp',
        'mainImage': '/images/ecobamboo/tam-than-tre-17mm.jpg' if os.path.exists('public/images/ecobamboo/tam-than-tre-17mm.jpg') else '/images/ecobamboo/17mmArtboard-2-copy-2.webp',
        'fullBoard': '/images/ecobamboo/so-sanh-tam-than-tre-17mm-go-cong-nghiep-4daaf2.webp',
        'scene': '/images/ecobamboo/tu-lavabo-tam-than-tre-17mm-a2fefa.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Chuyên Đóng Cánh Tủ',
        'dimensions': '1220 x 2440 mm',
        'thickness': '17mm',
        'finish': 'Phủ film 1 hoặc 2 mặt, bọc cạnh không lộ cốt'
    },
    {
        'id': 'lam-song-than-tre',
        'code': 'EBL-ALL',
        'url': '/san-pham-chinh/lam-song',
        'name': 'Lam Sóng Trang Trí Than Tre (Lam Vuông & Bán Nguyệt)',
        'category': 'lam-song',
        'surfaceGroup': 'van-go',
        'categoryName': 'Lam Sóng Trang Trí Than Tre',
        'price': 185000,
        'priceFormatted': '185.000 đ/thanh',
        'colorHex': '#7b5434',
        'swatch': '/images/ecobamboo/Lam-song.webp',
        'mainImage': '/images/ecobamboo/Lam-song.webp',
        'fullBoard': '/images/ecobamboo/Lam-vuong-co-to-mau-go-oc-cho-EBL88004-scaled-0c772b.webp',
        'scene': '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Điểm Nhấn Vách 3D',
        'dimensions': 'Rộng 150-200mm x Dài 2800 / 3000mm',
        'thickness': '15mm - 20mm',
        'finish': 'Đồng bộ 100% mã màu film với tấm ốp phẳng'
    },
    {
        'id': 'nep-nhom-dong-bo',
        'code': 'EBN-ALL',
        'url': '/san-pham-chinh/nep',
        'name': 'Hệ Nẹp Nhôm Hoàn Thiện & Hắt Sáng LED (30+ Mã)',
        'category': 'nep',
        'surfaceGroup': 'don-sac',
        'categoryName': 'Phụ Kiện Nẹp Nhôm Đồng Bộ',
        'price': 65000,
        'priceFormatted': '65.000 đ/thanh',
        'colorHex': '#c8a86b',
        'swatch': '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
        'mainImage': '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
        'fullBoard': '/images/ecobamboo/anh-nep-EcoBamboo-scaled.webp',
        'scene': '/images/ecobamboo/vach-tivi-khe-doc.jpg',
        'lamSong': '/images/ecobamboo/Lam-song.webp',
        'badge': 'Mạ Anode Cao Cấp',
        'dimensions': 'Dài 2800mm / 3000mm',
        'thickness': 'Dùng cho tấm 5mm & 8mm',
        'finish': 'Vàng gương, Vàng mờ, Đen bóng, Đen mờ, Inox, Bạc'
    }
]

js_content = """// Database sản phẩm chính xác đối chiếu 100% với website gốc ecobamboo.vn
// Kèm theo hình ảnh chụp thật tải trực tiếp từ server ecobamboo.vn

export const CATEGORY_FILTERS = [
  { id: 'all', name: 'Tất cả sản phẩm', count: 15 },
  { id: 'tam-op-than-tre', name: 'Tấm Ốp Than Tre 5mm & 8mm', count: 12 },
  { id: 'tam-than-tre-17mm', name: 'Tấm Nội Thất 17mm', count: 1 },
  { id: 'lam-song', name: 'Lam Sóng Trang Trí', count: 1 },
  { id: 'nep', name: 'Nẹp Nhôm Hoàn Thiện', count: 1 },
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
  { criteria: 'Keo dán ép film', value: 'PUR nóng chảy Jowat nhập khẩu Đức' },
];

export const PRODUCTS = [
"""

for item in extracted:
    code = item['code']
    meta = product_meta.get(code, {})
    if not meta:
        continue

    # Build image gallery
    gallery_images = [
        meta['mainImage'],
        meta['swatch'],
        meta['fullBoard'],
        meta['scene'],
        '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ]

    clean_desc = item.get('description', '') or 'Vật liệu tấm ốp than tre sinh thái Eco Bamboo đạt chuẩn phát thải E0, chống nước 100%, kháng cháy B1 và uốn cong 90° linh hoạt.'
    
    js_content += f"""  {{
    id: '{meta['id']}',
    code: '{code}',
    url: '{code.lower()}.html',
    canonicalUrl: '/san-pham/tam-op-than-tre/{meta['surfaceGroup']}/{meta['id']}.html',
    name: '{meta['name']}',
    category: 'tam-op-than-tre',
    surfaceGroup: '{meta['surfaceGroup']}',
    categoryName: '{meta['categoryName']}',
    pricePerM2: {meta['price']},
    priceFormatted: '{meta['priceFormatted']}',
    thickness: '5mm / 8mm',
    thicknessOptions: ['5mm', '8mm', '17mm'],
    dimensions: '1220 x 2440 / 2800 / 3200 mm',
    finish: 'Phủ film PVC/PETG cao cấp chống trầy xước, lau chùi dầu mỡ dễ dàng',
    core: 'Bột than tre hoạt tính tỷ trọng cao (0.70 - 0.90 g/cm³)',
    glue: 'Keo PUR nóng chảy Jowat nhập khẩu CHLB Đức',
    standard: 'Đạt chuẩn phát thải Formaldehyde E0 Đức, Cản cháy lan B1',
    warranty: 'Bảo hành kết cấu 10 năm chính hãng',
    inStock: true,
    badge: '{meta['badge']}',
    colorHex: '{meta['colorHex']}',
    image: '{meta['mainImage']}',
    swatchImage: '{meta['swatch']}',
    fullBoardImage: '{meta['fullBoard']}',
    sceneImage: '{meta['scene']}',
    lamSongImage: '{meta['lamSong']}',
    gallery: [
      '{meta['mainImage']}',
      '{meta['swatch']}',
      '{meta['fullBoard']}',
      '{meta['scene']}',
      '/images/ecobamboo/anh-cau-tao-tam-copy-d7de2f.webp'
    ],
    shortDesc: '{clean_desc}',
    specs: [
      {{ label: 'Quy cách khổ', value: '1220 × 2440 / 2800 / 3200 mm' }},
      {{ label: 'Độ dày', value: '5mm (uốn cong) / 8mm (chuẩn vách)' }},
      {{ label: 'Mật độ nén', value: '0.70 g/cm³ (Bản chống va đập 0.90 g/cm³)' }},
      {{ label: 'Tỷ lệ nhựa PVC', value: '≥ 45–50% cốt tấm' }},
      {{ label: 'Phát thải Formaldehyde', value: '0.40 mg/L — Cấp E0 an toàn' }},
      {{ label: 'Công nghệ ép', value: 'Dây chuyền PUR tự động hóa' }}
    ]
  }},
"""

for extra in extra_products:
    js_content += f"""  {{
    id: '{extra['id']}',
    code: '{extra['code']}',
    url: '{extra['url']}',
    canonicalUrl: '{extra['url']}',
    name: '{extra['name']}',
    category: '{extra['category']}',
    surfaceGroup: '{extra['surfaceGroup']}',
    categoryName: '{extra['categoryName']}',
    pricePerM2: {extra['price']},
    priceFormatted: '{extra['priceFormatted']}',
    thickness: '{extra['thickness']}',
    thicknessOptions: ['{extra['thickness']}'],
    dimensions: '{extra['dimensions']}',
    finish: '{extra['finish']}',
    core: 'Bột than tre hoạt tính nén tỷ trọng cao',
    glue: 'Keo PUR nóng chảy Jowat Đức',
    standard: 'Tiêu chuẩn E0 Đức, Chống cháy lan B1',
    warranty: '10 năm chính hãng',
    inStock: true,
    badge: '{extra['badge']}',
    colorHex: '{extra['colorHex']}',
    image: '{extra['mainImage']}',
    swatchImage: '{extra['swatch']}',
    fullBoardImage: '{extra['fullBoard']}',
    sceneImage: '{extra['scene']}',
    lamSongImage: '{extra['lamSong']}',
    gallery: [
      '{extra['mainImage']}',
      '{extra['fullBoard']}',
      '{extra['scene']}'
    ],
    shortDesc: '{extra['name']} đồng bộ mã màu với hệ tấm ốp than tre Eco Bamboo.',
    specs: [
      {{ label: 'Quy cách', value: '{extra['dimensions']}' }},
      {{ label: 'Độ dày / Biên dạng', value: '{extra['thickness']}' }},
      {{ label: 'Bề mặt hoàn thiện', value: '{extra['finish']}' }},
      {{ label: 'Tiêu chuẩn an toàn', value: 'E0 Châu Âu' }}
    ]
  }},
"""

js_content += "];\n"

with open('src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Generated src/data/products.js successfully with real images!")

