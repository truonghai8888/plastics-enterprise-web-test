import BRAND, { getCurrentYear, getCatalogTitle } from '../config/brandConfig';
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { downloadCataloguePdf } from '../utils/fileDownload';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneCallIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
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

const ShieldCheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

// ==========================================
// FORM CONFIGS BY PURPOSE
// ==========================================
export const FORM_PURPOSES = {
  dealer: {
    id: 'dealer',
    badge: 'Hợp Tác Phân Phối',
    title: 'Đăng Ký Làm Đại Lý / Nhà Phân Phối',
    desc: `Nhận chính sách chiết khấu trực tiếp từ nhà máy ${BRAND.shortName} lên tới 25%, bảo hộ khu vực độc quyền và hỗ trợ bảng hiệu showroom 100%.`,
    buttonText: 'Gửi Đăng Ký Đại Lý Ngay',
    successMsg: `Cảm ơn quý đối tác! Giám đốc kinh doanh khu vực ${BRAND.shortName} sẽ liên hệ gửi hợp đồng mẫu và chính sách chiết khấu trong 15 phút.`
  },
  sample: {
    id: 'sample',
    badge: 'Xâu Mẫu Thực Tế',
    title: 'Đăng Ký Nhận Mẫu Vật Liệu Tận Nơi (Sample Box)',
    desc: `${BRAND.shortName} gửi miễn phí bộ mẫu cắt thực tế kích thước 15x20cm gồm các dòng vân gỗ, vân đá cẩm thạch và lam sóng để kiểm nghiệm chất lượng.`,
    buttonText: 'Gửi Yêu Cầu Nhận Mẫu Miễn Phí',
    successMsg: `Đã tiếp nhận yêu cầu gửi mẫu! Nhân viên điều phối kho ${BRAND.shortName} sẽ đóng gói Sample Box và gửi chuyển phát nhanh đến địa chỉ của bạn trong 24h.`
  },
  catalogue: {
    id: 'catalogue',
    badge: `Tài Liệu ${getCurrentYear()}`,
    title: 'Tải Trọn Bộ Catalogue & Bảng Giá PDF (60 Trang)',
    desc: `Xem trọn bộ 160+ mã màu thớ vân độ phân giải cao của ${BRAND.brandName}, kèm bảng báo giá niêm yết và hướng dẫn thi công chi tiết.`,
    buttonText: 'Tải Xuống Bản Đầy Đủ (PDF)',
    successMsg: `Đang tải xuống bộ tài liệu Catalogue_${BRAND.brandName}_${getCurrentYear()}.pdf và Báo giá niêm yết ${BRAND.shortName}.`
  },
  contact: {
    id: 'contact',
    badge: 'Tư Vấn Trực Tiếp',
    title: 'Liên Hệ Nhà Máy & Tư Vấn Kỹ Thuật Công Trình',
    desc: `Giải đáp thắc mắc về kỹ thuật soi rãnh V, phương án uốn vòm cong hoặc bóc tách khối lượng vật tư tấm ốp ${BRAND.shortName} theo bản vẽ CAD/3D.`,
    buttonText: 'Gửi Yêu Cầu Tư Vấn Ngay',
    successMsg: `Cảm ơn bạn! Kỹ sư vật liệu ${BRAND.shortName} sẽ gọi lại giải đáp chi tiết cho bạn ngay.`
  }
};

// ==========================================
// REUSABLE LEAD CAPTURE FORM COMPONENT
// ==========================================
export function LeadCaptureForm({
  purpose = 'dealer',
  customTitle,
  customDesc,
  embedded = false,
  onLeadSubmitted
}) {
  const config = FORM_PURPOSES[purpose] || FORM_PURPOSES.dealer;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    role: 'Đại lý / Cửa hàng nội thất',
    note: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadCode = `AMC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newLead = {
      code: leadCode,
      purposeId: purpose,
      purposeTitle: config.title,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
      address: formData.address.trim(),
      role: formData.role,
      note: formData.note.trim(),
      companyName: BRAND.legalName,
      brandShort: BRAND.shortName,
      status: 'Đã tiếp nhận thành công',
      createdAt: new Date().toISOString(),
      displayTime: new Date().toLocaleString('vi-VN')
    };

    try {
      const existing = JSON.parse(localStorage.getItem('plastics_enterprise_leads') || '[]');
      existing.unshift(newLead);
      localStorage.setItem('plastics_enterprise_leads', JSON.stringify(existing));
      if (onLeadSubmitted) onLeadSubmitted(newLead);
      window.dispatchEvent(new CustomEvent('plastics_enterprise_lead_added', { detail: newLead }));
    } catch (_) {}

    // Tự động tải file catalogue nếu người dùng đăng ký tải catalogue
    if (purpose === 'catalogue') {
      try {
        downloadCataloguePdf(BRAND.brandName);
      } catch (_) {}
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedLead(newLead);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedLead(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      city: '',
      address: '',
      role: 'Đại lý / Cửa hàng nội thất',
      note: ''
    });
  };

  return (
    <div className={`bg-white rounded-3xl border border-eco-gray-200 p-6 sm:p-8 shadow-card ${embedded ? '' : 'max-w-xl w-full'}`}>
      {/* Header */}
      <div className="space-y-1.5 mb-6">
        <span className="inline-flex items-center text-[10px] font-extrabold uppercase text-bamboo-700 bg-bamboo-50 px-3 py-1 rounded-full border border-bamboo-200">
          <ShieldCheckIcon className="w-3.5 h-3.5 mr-1 text-amber-600" />
          {config.badge}
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-eco-gray-900 leading-tight">
          {customTitle || config.title}
        </h3>
        <p className="text-xs text-eco-gray-600 leading-relaxed font-normal">
          {customDesc || config.desc}
        </p>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div>
          <label className="block text-xs font-bold text-eco-gray-700 mb-1">
            Họ và tên của bạn *
          </label>
          <input
            type="text"
            required
            placeholder="VD: Nguyễn Văn A"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600 bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-eco-gray-700 mb-1">
              Số điện thoại / Zalo *
            </label>
            <input
              type="tel"
              required
              placeholder="09xx xxx xxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-eco-gray-700 mb-1">
              Tỉnh / Thành phố *
            </label>
            <input
              type="text"
              required
              placeholder="Hà Nội, Hải Phòng, TP.HCM..."
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-eco-gray-700 mb-1">
              Địa chỉ Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-eco-gray-700 mb-1">
              Bạn đang là đối tượng nào?
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-eco-gray-300 bg-white focus:outline-none focus:border-bamboo-600 text-eco-gray-800"
            >
              <option value="Đại lý / Cửa hàng nội thất">Đại lý / Cửa hàng vật liệu nội thất</option>
              <option value="Thợ thi công / Tổ đội">Thợ thi công / Đội thợ hoàn thiện</option>
              <option value="Kiến trúc sư / Thiết kế">Kiến trúc sư / Công ty thiết kế</option>
              <option value="Chủ đầu tư / Chủ nhà">Chủ nhà / Chủ đầu tư công trình</option>
            </select>
          </div>
        </div>

        {purpose === 'sample' && (
          <div>
            <label className="block text-xs font-bold text-eco-gray-700 mb-1">
              Địa chỉ nhận mẫu chính xác *
            </label>
            <input
              type="text"
              required
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600 bg-white"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-eco-gray-700 mb-1">
            Ghi chú nhu cầu cụ thể
          </label>
          <textarea
            rows="2"
            placeholder="Cần mẫu vân gỗ EB66006, tư vấn mở đại lý tại Nam Định, báo giá 150m2..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-eco-gray-300 focus:outline-none focus:border-bamboo-600 focus:ring-1 focus:ring-bamboo-600 bg-white"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-hover hover:scale-[1.01] transition-all flex items-center justify-center disabled:opacity-70"
        >
          {isSubmitting ? 'Đang gửi thông tin...' : config.buttonText}
        </button>

        {isSuccess && submittedLead && (
          <div className="p-4 rounded-2xl bg-amber-50 text-amber-900 border border-amber-300 space-y-3 animate-fade-in">
            <div className="flex items-center text-sm font-bold text-amber-800">
              <CheckCircleIcon className="w-5 h-5 mr-2 text-amber-600 shrink-0" />
              <span>Đăng ký thành công tại {BRAND.shortName}!</span>
            </div>
            <p className="text-xs text-eco-gray-700 leading-relaxed font-medium">
              {config.successMsg}
            </p>
            <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-eco-gray-500">Mã tiếp nhận:</span>
                <span className="font-mono font-black text-amber-800">{submittedLead.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-eco-gray-500">Người đăng ký:</span>
                <span className="font-bold text-eco-gray-800">{submittedLead.fullName} - {submittedLead.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-eco-gray-500">Doanh nghiệp:</span>
                <span className="font-semibold text-bamboo-800">{BRAND.legalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-eco-gray-500">Thời gian gửi:</span>
                <span className="text-eco-gray-600">{submittedLead.displayTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-eco-gray-500">Trạng thái:</span>
                <span className="font-bold text-green-700">✓ Đã lưu trên hệ thống ({BRAND.shortName})</span>
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 underline"
              >
                + Gửi thêm yêu cầu khác
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

// ==========================================
// COMPREHENSIVE CONTACT & LEAD PAGE
// ==========================================
export default function LeadForms() {
  const [activeTab, setActiveTab] = useState('dealer');
  const [leadList, setLeadList] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadLeads = () => {
    try {
      const items = JSON.parse(localStorage.getItem('plastics_enterprise_leads') || '[]');
      setLeadList(items);
    } catch (_) {}
  };

  useEffect(() => {
    loadLeads();
    const handleLeadAdded = () => loadLeads();
    window.addEventListener('plastics_enterprise_lead_added', handleLeadAdded);
    return () => window.removeEventListener('plastics_enterprise_lead_added', handleLeadAdded);
  }, []);

  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-14 border-b border-bamboo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-3">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border shadow-sm"
            style={{
              backgroundColor: `${BRAND.colors.primary}20`,
              borderColor: `${BRAND.colors.primary}50`,
              color: BRAND.colors.primary
            }}
          >
            Hợp Tác & Chăm Sóc Khách Hàng
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Liên Hệ Nhà Máy & Đăng Ký Đại Lý
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
            Nhà máy sản xuất tấm ốp than tre {BRAND.shortName} luôn sẵn sàng đồng hành cùng các đại lý, kiến trúc sư và thợ thi công trên toàn quốc.
          </p>
        </div>
      </div>

      {/* 2. FORM TABS & CONTACT WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

        {/* Purpose Tab Switcher */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-10 text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('dealer')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'dealer'
                ? 'bg-bamboo-700 text-white shadow-md'
                : 'bg-white text-eco-gray-700 border border-eco-gray-200 hover:bg-eco-gray-50'
            }`}
          >
            Đăng Ký Làm Đại Lý
          </button>

          <button
            onClick={() => setActiveTab('sample')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'sample'
                ? 'bg-bamboo-700 text-white shadow-md'
                : 'bg-white text-eco-gray-700 border border-eco-gray-200 hover:bg-eco-gray-50'
            }`}
          >
            Nhận Mẫu Thử (Sample Box)
          </button>

          <button
            onClick={() => setActiveTab('catalogue')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'catalogue'
                ? 'bg-bamboo-700 text-white shadow-md'
                : 'bg-white text-eco-gray-700 border border-eco-gray-200 hover:bg-eco-gray-50'
            }`}
          >
            Tải Catalogue & Báo Giá
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'contact'
                ? 'bg-bamboo-700 text-white shadow-md'
                : 'bg-white text-eco-gray-700 border border-eco-gray-200 hover:bg-eco-gray-50'
            }`}
          >
            Tư Vấn Kỹ Thuật Công Trình
          </button>
        </div>

        {/* 2-Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* CỘT TRÁI: LEAD FORM TEMPLATE TƯƠNG TÁC (7 Cột) */}
          <div className="lg:col-span-7 flex justify-center">
            <LeadCaptureForm purpose={activeTab} embedded={true} />
          </div>

          {/* CỘT PHẢI: THÔNG TIN TRỰC TIẾP NHÀ MÁY & VĂN PHÒNG (5 Cột) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Direct Contacts Card */}
            <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 shadow-sm space-y-5">
              <h3 className="text-base font-extrabold text-eco-gray-900 border-l-2 border-bamboo-600 pl-3">
                Thông Tin Trụ Sở & Nhà Máy
              </h3>

              <div className="space-y-4 text-xs text-eco-gray-600 leading-relaxed">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-bamboo-100 text-bamboo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-eco-gray-900 block font-bold">{BRAND.factory?.title || 'Nhà Máy Sản Xuất'}:</strong>
                    <span>{BRAND.factory?.address || BRAND.factoryAddress}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-wood-100 text-wood-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-eco-gray-900 block font-bold">{BRAND.office?.title || 'Văn Phòng Đại Diện Hà Nội'}:</strong>
                    <span>{BRAND.office?.address || BRAND.officeAddress}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <PhoneCallIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-eco-gray-900 block font-bold">Hotline Bán Hàng & Dự Án:</strong>
                    <a href={`tel:${BRAND.hotline.replace(".", "")}`} className="text-bamboo-800 font-bold hover:underline text-sm">{BRAND.hotlineDisplay} (Zalo 24/7)</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-bamboo-100 text-bamboo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-eco-gray-900 block font-bold">Email Tiếp Nhận:</strong>
                    <a href={BRAND.socialLinks.email} className="hover:underline">{BRAND.email}</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-eco-gray-100 text-eco-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ClockIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-eco-gray-900 block font-bold">Thời Gian Làm Việc:</strong>
                    <span>Thứ 2 - Thứ 7: 8h00 - 18h00 (Bộ phận xuất kho làm việc cả Chủ Nhật)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Commitments Card */}
            <div className="bg-gradient-to-br from-bamboo-900 to-bamboo-950 text-white rounded-3xl p-6 space-y-3 border border-bamboo-800">
              <h4 className="text-sm font-bold text-white flex items-center">
                <ShieldCheckIcon className="w-4 h-4 mr-2 text-amber-400" />
                Cam Kết Từ Nhà Sản Xuất {BRAND.shortName}
              </h4>
              <ul className="space-y-2 text-xs text-eco-gray-200">
                <li className="flex items-center">
                  <CheckCircleIcon className="w-3.5 h-3.5 mr-2 text-amber-400 shrink-0" />
                  <span>Sẵn sàng cung cấp chứng chỉ xuất xưởng CO/CQ đầy đủ</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-3.5 h-3.5 mr-2 text-amber-400 shrink-0" />
                  <span>Bảo hành chính hãng {BRAND.warrantyYears} năm độ bền vật liệu</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-3.5 h-3.5 mr-2 text-amber-400 shrink-0" />
                  <span>Cắt tấm theo kích thước bản vẽ không tính phụ phí</span>
                </li>
              </ul>
            </div>

            {/* Real Sample Shelf Photo */}
            <div className="rounded-3xl overflow-hidden border border-eco-gray-200 shadow-sm bg-white p-3 space-y-2">
              <img
                src="/images/ecobamboo/gia-bang-mau-tam-op-than-tre-eco-bamboo.webp"
                alt="Giá bảng mẫu và xâu mẫu vật liệu tấm ốp than tre {BRAND.shortName}"
                className="w-full h-48 object-cover rounded-2xl"
              />
              <p className="text-[11px] text-eco-gray-500 text-center italic">
                Giá trưng bày mẫu và xâu mẫu màu thực tế cấp phát cho hệ thống đại lý & showroom
              </p>
            </div>

          </div>

        </div>

        {/* 3. LỊCH SỬ TIẾP NHẬN YÊU CẦU & KIỂM TRA HOẠT ĐỘNG */}
        <div className="mt-12 pt-8 border-t border-eco-gray-200">
          <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-eco-gray-900 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-bamboo-600" />
                  Kiểm Tra Kết Quả Hoạt Động & Lịch Sử Đăng Ký ({leadList.length})
                </h4>
                <p className="text-xs text-eco-gray-500 mt-0.5">
                  Tất cả các thông tin đăng ký làm đại lý, nhận mẫu, tải catalogue và tư vấn tại {BRAND.legalName} được lưu trữ minh bạch.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="px-3.5 py-1.5 rounded-xl border border-bamboo-300 text-bamboo-700 hover:bg-bamboo-50 font-bold text-xs transition-colors"
              >
                {showHistory ? 'Thu gọn danh sách' : 'Xem chi tiết kết quả'}
              </button>
            </div>

            {showHistory && (
              <div className="space-y-3 pt-2">
                {leadList.length === 0 ? (
                  <div className="text-center py-6 text-eco-gray-400 text-xs italic">
                    Chưa có yêu cầu nào được gửi trong phiên này. Hãy gửi thử một biểu mẫu ở phía trên để kiểm tra kết quả ngay!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-eco-gray-200 rounded-xl overflow-hidden">
                      <thead className="bg-eco-gray-50 text-eco-gray-700 font-bold border-b border-eco-gray-200">
                        <tr>
                          <th className="p-3">Mã đơn</th>
                          <th className="p-3">Loại yêu cầu</th>
                          <th className="p-3">Khách hàng</th>
                          <th className="p-3">Số điện thoại</th>
                          <th className="p-3">Khu vực / Địa chỉ</th>
                          <th className="p-3">Thời gian gửi</th>
                          <th className="p-3">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-eco-gray-100">
                        {leadList.map((lead, idx) => (
                          <tr key={idx} className="hover:bg-bamboo-50/40">
                            <td className="p-3 font-mono font-bold text-bamboo-800">{lead.code}</td>
                            <td className="p-3 font-semibold text-eco-gray-800">{lead.purposeTitle}</td>
                            <td className="p-3">{lead.fullName}</td>
                            <td className="p-3 font-mono">{lead.phone}</td>
                            <td className="p-3">{lead.city || lead.address || '-'}</td>
                            <td className="p-3 text-eco-gray-500">{lead.displayTime}</td>
                            <td className="p-3 font-semibold text-green-700">✓ {lead.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
