import React, { useState, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND from '../config/brandConfig';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const CalculatorIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2"/>
    <line x1="8" x2="16" y1="6" y2="6"/>
    <line x1="16" x2="16" y1="14" y2="18"/>
    <path d="M16 10h.01"/>
    <path d="M12 10h.01"/>
    <path d="M8 10h.01"/>
    <path d="M12 14h.01"/>
    <path d="M8 14h.01"/>
    <path d="M12 18h.01"/>
    <path d="M8 18h.01"/>
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

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const RefreshCwIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M8 16H3v5"/>
  </svg>
);

const GridIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="14" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

// Format currency
const formatVND = (num) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
};

// ==========================================
// COST CALCULATOR & WALL DESIGNER COMPONENT
// ==========================================
export default function CostCalculator() {
  // Input Dimensions
  const [wallWidth, setWallWidth] = useState(4.2); // mét (chiều dài)
  const [wallHeight, setWallHeight] = useState(2.8); // mét (chiều cao)

  // Material selection
  const [panelType, setPanelType] = useState('tam-op-8mm');
  const [surfaceType, setSurfaceType] = useState('van-go'); // van-go | van-da | don-sac-petg | trang-guong
  const [panelSize, setPanelSize] = useState('2800'); // '2800' (1.22x2.8) hoặc '2440' (1.22x2.44)

  // Accessories selection
  const [includeTrim, setIncludeTrim] = useState(true);
  const [trimType, setTrimType] = useState('nep-t'); // nep-t | nep-led | nep-v
  const [includeGlue, setIncludeGlue] = useState(true);
  const [includeLabor, setIncludeLabor] = useState(true);
  const [includeVAT, setIncludeVAT] = useState(false);

  // Wall Designer partition mode: 'auto' | '2-panels' | '3-panels' | '4-panels'
  const [partitionMode, setPartitionMode] = useState('auto');
  const [designerLedLight, setDesignerLedLight] = useState(true);

  // Success toast
  const [toastMessage, setToastMessage] = useState('');

  // PRICING MATRIX PER M2 & UNIT
  const unitPrices = useMemo(() => {
    let panelPricePerM2 = 365000; // Mặc định vân gỗ 8mm

    if (panelType === 'tam-op-5mm') {
      panelPricePerM2 = surfaceType === 'van-da' ? 330000 : 295000;
    } else if (panelType === 'tam-op-8mm') {
      if (surfaceType === 'van-vai') panelPricePerM2 = 345000;
      else if (surfaceType === 'van-go') panelPricePerM2 = 365000;
      else if (surfaceType === 'van-da') panelPricePerM2 = 385000;
      else if (surfaceType === 'don-sac-petg') panelPricePerM2 = 480000;
      else if (surfaceType === 'trang-guong') panelPricePerM2 = 690000;
    } else if (panelType === 'tam-op-17mm') {
      panelPricePerM2 = 780000;
    } else if (panelType === 'lam-song') {
      panelPricePerM2 = 490000; // Trung bình theo diện tích
    }

    // Giá nẹp theo thanh 2.8m
    let trimPricePerUnit = 55000; // Nẹp T
    if (trimType === 'nep-led') trimPricePerUnit = 95000;
    else if (trimType === 'nep-v') trimPricePerUnit = 65000;

    const gluePricePerBottle = 75000; // Chai 300ml dán ~3.5m2
    const laborPricePerM2 = 140000; // Nhân công thi công hoàn thiện

    return {
      panelPricePerM2,
      trimPricePerUnit,
      gluePricePerBottle,
      laborPricePerM2
    };
  }, [panelType, surfaceType, trimType]);

  // CALCULATION LOGIC
  const calculation = useMemo(() => {
    const w = parseFloat(wallWidth) || 0;
    const h = parseFloat(wallHeight) || 0;
    const totalArea = Math.round(w * h * 100) / 100; // m2

    // Kích thước 1 tấm chuẩn
    const sheetLength = panelSize === '2440' ? 2.44 : 2.8;
    const sheetWidth = 1.22;
    const sheetArea = Math.round(sheetWidth * sheetLength * 1000) / 1000; // ~3.416m2

    // Hệ số hao hụt thi công 5%
    const totalAreaWithWaste = totalArea * 1.05;
    const sheetsNeeded = totalArea > 0 ? Math.ceil(totalAreaWithWaste / sheetArea) : 0;

    // Chi phí tấm ốp
    const panelTotalCost = sheetsNeeded * (sheetArea * unitPrices.panelPricePerM2);

    // Tính số thanh nẹp cần dùng:
    // Nẹp dọc giữa các tấm: (số tấm ngang - 1)
    const horizontalSheets = Math.ceil(w / sheetWidth);
    const verticalJoints = Math.max(0, horizontalSheets - 1);
    // Cộng nẹp viền quanh nếu có
    const perimeterTrims = Math.ceil((w * 2 + h * 2) / sheetLength);
    const trimsNeeded = includeTrim ? (verticalJoints + Math.ceil(w / sheetLength)) : 0;
    const trimTotalCost = trimsNeeded * unitPrices.trimPricePerUnit;

    // Tính lượng keo dán: 1 tuýp dán ~3.5 m2
    const glueBottlesNeeded = includeGlue ? Math.ceil(totalArea / 3.5) : 0;
    const glueTotalCost = glueBottlesNeeded * unitPrices.gluePricePerBottle;

    // Chi phí nhân công
    const laborTotalCost = includeLabor ? Math.round(totalArea * unitPrices.laborPricePerM2) : 0;

    // Tổng phụ & VAT
    const subtotal = Math.round(panelTotalCost + trimTotalCost + glueTotalCost + laborTotalCost);
    const vatCost = includeVAT ? Math.round(subtotal * 0.08) : 0;
    const grandTotal = subtotal + vatCost;

    return {
      totalArea,
      sheetArea,
      sheetsNeeded,
      panelTotalCost,
      trimsNeeded,
      trimTotalCost,
      glueBottlesNeeded,
      glueTotalCost,
      laborTotalCost,
      subtotal,
      vatCost,
      grandTotal,
      horizontalSheets
    };
  }, [wallWidth, wallHeight, panelSize, unitPrices, includeTrim, includeGlue, includeLabor, includeVAT]);

  // Wall Designer Partitions calculation
  const partitions = useMemo(() => {
    const w = parseFloat(wallWidth) || 4.2;
    if (partitionMode === '2-panels') {
      const half = (w / 2).toFixed(2);
      return [half, half];
    } else if (partitionMode === '3-panels') {
      // Tỷ lệ: 1/4 - 1/2 - 1/4 (kinh điển vách tivi)
      const side = (w * 0.25).toFixed(2);
      const center = (w * 0.5).toFixed(2);
      return [side, center, side];
    } else if (partitionMode === '4-panels') {
      const quad = (w / 4).toFixed(2);
      return [quad, quad, quad, quad];
    } else {
      // Auto: theo khổ 1.22m
      const count = Math.ceil(w / 1.22);
      const widthEach = (w / count).toFixed(2);
      return Array(count).fill(widthEach);
    }
  }, [wallWidth, partitionMode]);

  const handleExportPDF = () => {
    setToastMessage(`Đang kết xuất file PDF: Du_Toan_Vat_Tu_${BRAND.brandName}.pdf`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSendZalo = () => {
    const text = encodeURIComponent(
      `Chào ${BRAND.brandName}, tôi cần báo giá vách ${wallWidth}m x ${wallHeight}m (${calculation.totalArea}m2). Dự toán tạm tính: ${formatVND(calculation.grandTotal)}`
    );
    window.open(`${BRAND.socialLinks.zalo}?text=${text}`, '_blank');
  };

  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-12 border-b border-bamboo-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bamboo-800/80 border border-bamboo-600/40 text-bamboo-300 text-xs font-bold uppercase tracking-wider">
              <CalculatorIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Công Cụ Bóc Tách Khối Lượng Tự Động</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Tính Chi Phí & Tự Thiết Kế Vách
            </h1>

            <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
              Nhập kích thước mảng tường thực tế, hệ thống sẽ tự động tính số lượng tấm ốp than tre cần mua, hao hụt thi công 5%, số thanh nẹp và khối lượng keo dán tương ứng.
            </p>
          </div>
        </div>
      </div>

      {/* TOAST MESSAGE */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-eco-gray-900 text-white px-5 py-2.5 rounded-2xl shadow-2xl border border-bamboo-500 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. MAIN CALCULATOR WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* CỘT TRÁI: FORM NHẬP THÔNG SỐ VÁCH (5 Cột) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-eco-gray-200 p-6 shadow-soft space-y-6">

            <div className="flex items-center justify-between pb-3 border-b border-eco-gray-200">
              <h2 className="text-base font-extrabold text-eco-gray-900 flex items-center">
                <CalculatorIcon className="w-4 h-4 mr-2 text-bamboo-700" />
                1. Thông Số Mảng Tường
              </h2>
              <span className="text-xs font-bold text-bamboo-800 bg-bamboo-50 px-2.5 py-1 rounded-lg">
                Diện tích: {calculation.totalArea} m²
              </span>
            </div>

            {/* Chiều dài & Chiều cao */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1">
                  Chiều dài vách (m) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="30"
                    value={wallWidth}
                    onChange={(e) => setWallWidth(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-eco-gray-400">mét</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1">
                  Chiều cao vách (m) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="6"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-eco-gray-400">mét</span>
                </div>
              </div>
            </div>

            {/* Chọn Loại Tấm & Khổ Tấm */}
            <div className="space-y-4 pt-2 border-t border-eco-gray-100">
              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1.5 uppercase tracking-wider">
                  Chọn Loại Tấm Ốp:
                </label>
                <select
                  value={panelType}
                  onChange={(e) => setPanelType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-eco-gray-300 bg-white focus:outline-none focus:border-bamboo-600 text-eco-gray-900"
                >
                  <option value="tam-op-8mm">Tấm ốp than tre đa năng 8mm (Phổ biến nhất)</option>
                  <option value="tam-op-5mm">Tấm ốp than tre đa năng 5mm (Uốn cong 90°)</option>
                  <option value="tam-op-17mm">Tấm nội thất than tre 17mm (Làm cánh tủ)</option>
                  <option value="lam-song">Lam sóng than tre nghệ thuật (Vách 3D)</option>
                </select>
              </div>

              {/* Dòng vân bề mặt */}
              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1.5 uppercase tracking-wider">
                  Chọn Dòng Bề Mặt:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSurfaceType('van-go')}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                      surfaceType === 'van-go'
                        ? 'border-bamboo-600 bg-bamboo-50 text-bamboo-900'
                        : 'border-eco-gray-200 text-eco-gray-700 hover:border-bamboo-300'
                    }`}
                  >
                    Vân Gỗ (365k/m²)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSurfaceType('van-da')}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                      surfaceType === 'van-da'
                        ? 'border-bamboo-600 bg-bamboo-50 text-bamboo-900'
                        : 'border-eco-gray-200 text-eco-gray-700 hover:border-bamboo-300'
                    }`}
                  >
                    Vân Đá Men UV (385k/m²)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSurfaceType('don-sac-petg')}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                      surfaceType === 'don-sac-petg'
                        ? 'border-bamboo-600 bg-bamboo-50 text-bamboo-900'
                        : 'border-eco-gray-200 text-eco-gray-700 hover:border-bamboo-300'
                    }`}
                  >
                    Đơn Sắc PETG (480k/m²)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSurfaceType('trang-guong')}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                      surfaceType === 'trang-guong'
                        ? 'border-bamboo-600 bg-bamboo-50 text-bamboo-900'
                        : 'border-eco-gray-200 text-eco-gray-700 hover:border-bamboo-300'
                    }`}
                  >
                    Tráng Gương (690k/m²)
                  </button>
                </div>
              </div>

              {/* Khổ tấm */}
              <div>
                <label className="block text-xs font-bold text-eco-gray-700 mb-1.5 uppercase tracking-wider">
                  Khổ Chiều Cao Tấm:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPanelSize('2800')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
                      panelSize === '2800'
                        ? 'border-bamboo-600 bg-bamboo-50 text-bamboo-900'
                        : 'border-eco-gray-200 text-eco-gray-700 hover:border-bamboo-300'
                    }`}
                  >
                    Khổ 1220 x 2800mm
                  </button>
                  <button
                    type="button"
                    onClick={() => setPanelSize('2440')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
                      panelSize === '2440'
                        ? 'border-bamboo-600 bg-bamboo-50 text-bamboo-900'
                        : 'border-eco-gray-200 text-eco-gray-700 hover:border-bamboo-300'
                    }`}
                  >
                    Khổ 1220 x 2440mm
                  </button>
                </div>
              </div>
            </div>

            {/* Phụ Kiện Nẹp & Dịch Vụ Đi Kèm */}
            <div className="space-y-3 pt-3 border-t border-eco-gray-100 text-xs">
              <label className="block text-xs font-bold text-eco-gray-700 uppercase tracking-wider">
                Phụ Kiện & Dịch Vụ Bổ Sung:
              </label>

              {/* Nẹp check */}
              <div className="p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 font-bold text-eco-gray-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeTrim}
                      onChange={(e) => setIncludeTrim(e.target.checked)}
                      className="rounded text-bamboo-600 focus:ring-bamboo-500 w-4 h-4"
                    />
                    <span>Hệ nẹp nhôm trang trí</span>
                  </label>
                  <span className="text-[11px] text-eco-gray-500 font-semibold">
                    {calculation.trimsNeeded} thanh (~{formatVND(calculation.trimTotalCost)})
                  </span>
                </div>

                {includeTrim && (
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setTrimType('nep-t')}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-colors ${
                        trimType === 'nep-t' ? 'bg-bamboo-700 text-white border-bamboo-700' : 'bg-white text-eco-gray-700 border-eco-gray-200'
                      }`}
                    >
                      Nẹp T (55k)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrimType('nep-led')}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-colors ${
                        trimType === 'nep-led' ? 'bg-bamboo-700 text-white border-bamboo-700' : 'bg-white text-eco-gray-700 border-eco-gray-200'
                      }`}
                    >
                      Nẹp LED (95k)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrimType('nep-v')}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-colors ${
                        trimType === 'nep-v' ? 'bg-bamboo-700 text-white border-bamboo-700' : 'bg-white text-eco-gray-700 border-eco-gray-200'
                      }`}
                    >
                      Nẹp V (65k)
                    </button>
                  </div>
                )}
              </div>

              {/* Keo check */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200">
                <label className="flex items-center space-x-2 font-bold text-eco-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGlue}
                    onChange={(e) => setIncludeGlue(e.target.checked)}
                    className="rounded text-bamboo-600 focus:ring-bamboo-500 w-4 h-4"
                  />
                  <span>Keo dán chuyên dụng {BRAND.shortName}</span>
                </label>
                <span className="text-[11px] text-eco-gray-500 font-semibold">
                  {calculation.glueBottlesNeeded} tuýp ({formatVND(calculation.glueTotalCost)})
                </span>
              </div>

              {/* Nhân công check */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200">
                <label className="flex items-center space-x-2 font-bold text-eco-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLabor}
                    onChange={(e) => setIncludeLabor(e.target.checked)}
                    className="rounded text-bamboo-600 focus:ring-bamboo-500 w-4 h-4"
                  />
                  <span>Nhân công thi công hoàn thiện</span>
                </label>
                <span className="text-[11px] text-eco-gray-500 font-semibold">
                  {formatVND(calculation.laborTotalCost)}
                </span>
              </div>

              {/* VAT check */}
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center space-x-2 text-eco-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeVAT}
                    onChange={(e) => setIncludeVAT(e.target.checked)}
                    className="rounded text-bamboo-600 focus:ring-bamboo-500 w-4 h-4"
                  />
                  <span>Xuất hóa đơn GTGT (VAT 8%)</span>
                </label>
                {includeVAT && (
                  <span className="text-[11px] text-eco-gray-500 font-bold">
                    +{formatVND(calculation.vatCost)}
                  </span>
                )}
              </div>

            </div>

          </div>

          {/* CỘT PHẢI: KẾT QUẢ DỰ TOÁN & TỰ THIẾT KẾ VÁCH (7 Cột) */}
          <div className="lg:col-span-7 space-y-6">

            {/* MODULE 3: TỰ THIẾT KẾ VÁCH (WALL DESIGNER CANVAS PREVIEW) */}
            <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-bamboo-700 tracking-wider">
                    Mô Phỏng Trực Quan
                  </span>
                  <h3 className="text-base font-extrabold text-eco-gray-900">
                    Sơ Đồ Chia Tỉ Lệ Mảng Vách ({wallWidth}m × {wallHeight}m)
                  </h3>
                </div>

                {/* Modul partition options */}
                <div className="flex items-center space-x-1.5 bg-eco-gray-100 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => setPartitionMode('auto')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      partitionMode === 'auto' ? 'bg-white text-bamboo-800 shadow-sm' : 'text-eco-gray-600'
                    }`}
                  >
                    Khổ chuẩn
                  </button>
                  <button
                    onClick={() => setPartitionMode('2-panels')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      partitionMode === '2-panels' ? 'bg-white text-bamboo-800 shadow-sm' : 'text-eco-gray-600'
                    }`}
                  >
                    2 mảng
                  </button>
                  <button
                    onClick={() => setPartitionMode('3-panels')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      partitionMode === '3-panels' ? 'bg-white text-bamboo-800 shadow-sm' : 'text-eco-gray-600'
                    }`}
                  >
                    3 mảng TV
                  </button>
                  <button
                    onClick={() => setPartitionMode('4-panels')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      partitionMode === '4-panels' ? 'bg-white text-bamboo-800 shadow-sm' : 'text-eco-gray-600'
                    }`}
                  >
                    4 mảng
                  </button>
                </div>
              </div>

              {/* Simulated Wall Canvas */}
              <div className="h-64 sm:h-72 w-full rounded-2xl bg-eco-gray-900 p-5 flex flex-col justify-between relative overflow-hidden shadow-inner border border-eco-gray-800">

                {/* Ceiling LED Light bar */}
                <div className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                  designerLedLight ? 'bg-amber-300 shadow-[0_0_20px_5px_rgba(252,211,77,0.7)]' : 'bg-white/20'
                }`} />

                {/* The Panels Grid */}
                <div className="flex-1 my-3 flex items-stretch space-x-1.5 relative">
                  {partitions.map((width, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-xl bg-gradient-to-tr from-[#946638] via-[#b58a5b] to-[#734b22] border-2 border-amber-400/30 shadow-lg relative flex flex-col justify-between p-2 text-white group"
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono opacity-80">
                        <span>Khoang {idx + 1}</span>
                        <span>{width}m</span>
                      </div>

                      <div className="text-center my-auto">
                        <span className="text-[11px] font-bold text-white drop-shadow block">
                          Tấm Ốp Than Tre
                        </span>
                        <span className="text-[9px] text-amber-200">Cao {wallHeight}m</span>
                      </div>

                      {/* Trim Indicator on border */}
                      {idx < partitions.length - 1 && includeTrim && (
                        <div className="absolute -right-1.5 top-0 bottom-0 w-2 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)] z-10"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Floor */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pt-1 border-t border-white/10">
                  <span>Tổng chiều dài: {wallWidth}m</span>
                  <button
                    onClick={() => setDesignerLedLight(!designerLedLight)}
                    className="text-amber-300 hover:underline text-[10px]"
                  >
                    {designerLedLight ? 'Tắt đèn hắt LED' : 'Bật đèn hắt LED'}
                  </button>
                  <span>Chiều cao: {wallHeight}m</span>
                </div>

              </div>
            </div>

            {/* BẢNG BÓC TÁCH KHỐI LƯỢNG & TỔNG CHI PHÍ */}
            <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 shadow-soft space-y-5">

              <div className="flex items-center justify-between pb-3 border-b border-eco-gray-200">
                <div>
                  <h3 className="text-base font-extrabold text-eco-gray-900">
                    Bảng Dự Toán Chi Phí Chi Tiết
                  </h3>
                  <span className="text-xs text-eco-gray-500">
                    Đã cộng 5% hao hụt thi công cắt góc
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-eco-gray-500">Tổng chi phí ước tính:</div>
                  <div className="text-xl sm:text-2xl font-black text-bamboo-700">
                    {formatVND(calculation.grandTotal)}
                  </div>
                </div>
              </div>

              {/* Bảng chi tiết vật tư */}
              <div className="space-y-3 text-xs">
                {/* 1. Tấm ốp */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200">
                  <div>
                    <div className="font-bold text-eco-gray-900">
                      Tấm ốp than tre {surfaceType.replace('-', ' ').toUpperCase()} ({panelSize}mm)
                    </div>
                    <div className="text-[11px] text-eco-gray-500">
                      Cần mua: <strong className="text-bamboo-800">{calculation.sheetsNeeded} tấm</strong> (Đơn giá: {formatVND(calculation.sheetArea * unitPrices.panelPricePerM2)}/tấm)
                    </div>
                  </div>
                  <div className="font-extrabold text-eco-gray-900 text-sm">
                    {formatVND(calculation.panelTotalCost)}
                  </div>
                </div>

                {/* 2. Nẹp nhôm */}
                {includeTrim && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200">
                    <div>
                      <div className="font-bold text-eco-gray-900">
                        Hệ nẹp nhôm mạ Anode ({trimType.toUpperCase()})
                      </div>
                      <div className="text-[11px] text-eco-gray-500">
                        Cần mua: <strong className="text-bamboo-800">{calculation.trimsNeeded} thanh</strong> dài {panelSize}mm
                      </div>
                    </div>
                    <div className="font-extrabold text-eco-gray-900 text-sm">
                      {formatVND(calculation.trimTotalCost)}
                    </div>
                  </div>
                )}

                {/* 3. Keo dán */}
                {includeGlue && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200">
                    <div>
                      <div className="font-bold text-eco-gray-900">
                        Keo dán chuyên dụng {BRAND.shortName} (Chai 300ml)
                      </div>
                      <div className="text-[11px] text-eco-gray-500">
                        Cần dùng: <strong className="text-bamboo-800">{calculation.glueBottlesNeeded} tuýp</strong> (1 tuýp / 3.5m²)
                      </div>
                    </div>
                    <div className="font-extrabold text-eco-gray-900 text-sm">
                      {formatVND(calculation.glueTotalCost)}
                    </div>
                  </div>
                )}

                {/* 4. Nhân công */}
                {includeLabor && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-eco-gray-50 border border-eco-gray-200">
                    <div>
                      <div className="font-bold text-eco-gray-900">
                        Nhân công thi công & bảo hành hoàn thiện
                      </div>
                      <div className="text-[11px] text-eco-gray-500">
                        Khối lượng: {calculation.totalArea} m² ({formatVND(unitPrices.laborPricePerM2)}/m²)
                      </div>
                    </div>
                    <div className="font-extrabold text-eco-gray-900 text-sm">
                      {formatVND(calculation.laborTotalCost)}
                    </div>
                  </div>
                )}

                {/* Thuế VAT */}
                {includeVAT && (
                  <div className="flex items-center justify-between p-2 text-eco-gray-600 font-semibold border-t border-eco-gray-100">
                    <span>Thuế GTGT (VAT 8%):</span>
                    <span>+{formatVND(calculation.vatCost)}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleSendZalo}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center"
                >
                  Gửi Dự Toán Qua Zalo Báo Giá
                </button>

                <button
                  onClick={handleExportPDF}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center"
                >
                  <DownloadIcon className="w-4 h-4 mr-1.5" />
                  Xuất File Bảng Dự Toán (PDF)
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}
