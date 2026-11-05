import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const ShieldCheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const DownloadIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const EyeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const AwardIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

// CERTIFICATE ITEMS VỚI ẢNH GỐC TẢI TỪ ECOBAMBOO.VN
export const CERTIFICATE_ITEMS = [
  {
    id: 1,
    title: "Chứng Nhận Hợp Chuẩn TCVN 11353:2016",
    certCode: "TCVN-11353/EB",
    issuer: "Viện Kiểm Định Vật Liệu Xây Dựng",
    dateIssued: "2024 - 2025",
    standard: "TCVN 11353:2016 Tiêu chuẩn Quốc gia về ván ốp tường sinh thái",
    testResult: "Đạt toàn bộ các chỉ tiêu cơ lý, độ bền uốn và độ bám dính màng film",
    image: "/images/ecobamboo/eco-bamboo-chung-nhan-hop-chuan-tcvn-11353-2016-85aba2.webp",
    badge: "Hợp Chuẩn TCVN",
    desc: "Chứng nhận chất lượng hợp chuẩn quốc gia TCVN cấp cho các dòng tấm ốp than tre Eco Bamboo."
  },
  {
    id: 2,
    title: "Certificate of Compliance TCVN 11353:2016 (Bản Quốc Tế)",
    certCode: "TCVN-11353-EN/EB",
    issuer: "Quatest / Construction Material Verification Institute",
    dateIssued: "2024 - 2025",
    standard: "International Compliance Certificate (English Version)",
    testResult: "Formaldehyde emission E0 level ≤ 0.40 mg/L, High density core",
    image: "/images/ecobamboo/eco-bamboo-certificate-tcvn-11353-2016-en-c70e5f.webp",
    badge: "International Cert",
    desc: "Bản chứng thư chất lượng tiếng Anh phục vụ hồ sơ năng lực dự án FDI và công trình quốc tế."
  },
  {
    id: 3,
    title: "Kết Quả Thử Nghiệm Cốt Đen Than Tre (Trang 1)",
    certCode: "TEST-COT-DEN-P1",
    issuer: "Trung Tâm Kiểm Định Tiêu Chuẩn Đo Lường Chất Lượng",
    dateIssued: "Định kỳ 2025",
    standard: "Kiểm nghiệm độ bền kéo nhổ đinh, độ trương nở ngâm nước",
    testResult: "Độ trương nở khi hút nước chỉ 0.21% (chuẩn yêu cầu ≤ 0.5%)",
    image: "/images/ecobamboo/eco-bamboo-ket-qua-thu-nghiem-cot-den-trang-1-a5c424.webp",
    badge: "Thử Nghiệm Cốt Đen",
    desc: "Kết quả thử nghiệm độc lập trên mẫu cốt tấm than tre đen Loại 1 mật độ cao 0.70 - 0.73 g/cm³."
  },
  {
    id: 4,
    title: "Kết Quả Thử Nghiệm Cốt Đen Than Tre (Trang 2)",
    certCode: "TEST-COT-DEN-P2",
    issuer: "Trung Tâm Kiểm Định Tiêu Chuẩn Đo Lường Chất Lượng",
    dateIssued: "Định kỳ 2025",
    standard: "Kiểm nghiệm nồng độ phát thải Formaldehyde và kim loại nặng",
    testResult: "Formaldehyde 0.40 mg/L đạt cấp E0; Không phát hiện kim loại nặng độc hại",
    image: "/images/ecobamboo/eco-bamboo-ket-qua-thu-nghiem-cot-den-trang-2-dd0594.webp",
    badge: "Phát Thải E0",
    desc: "Chứng nhận mức độ an toàn sinh thái cao nhất, không chứa chất độc hại cho người già và trẻ nhỏ."
  },
  {
    id: 5,
    title: "Kết Quả Thử Nghiệm Khả Năng Cản Cháy Lan B1",
    certCode: "FIRE-TEST-B1/2025",
    issuer: "Viện Chuyên Ngành PCCC & Vật Liệu Chịu Nhiệt",
    dateIssued: "Định kỳ 2025",
    standard: "Đo lường cường độ thông lượng nhiệt tới hạn và lan truyền lửa",
    testResult: "Thông lượng nhiệt tới hạn ≥ 11 kW/m², thời gian dập tắt 5:56, không bắt lửa lan",
    image: "/images/ecobamboo/eco-bamboo-ket-qua-thu-nghiem-lan-truyen-lua-trang-1-8933ab.webp",
    badge: "Kháng Cháy Lan B1",
    desc: "Văn bản thử nghiệm phục vụ hồ sơ nghiệm thu phòng cháy chữa cháy cho các dự án và tòa nhà."
  },
  {
    id: 6,
    title: "Chứng Chỉ An Toàn E0 Formaldehyde Tấm Ốp Eco Bamboo",
    certCode: "E0-EMISSION-CERT",
    issuer: "Phòng Thử Nghiệm Vật Liệu Nội Thất Sinh Thái",
    dateIssued: "2025",
    standard: "EN 717-1 / TCVN 11353:2016",
    testResult: "Phát thải Formaldehyde tự do ≤ 0.40 mg/L (Giới hạn cấp E0 Châu Âu là ≤ 0.50 mg/L)",
    image: "/images/ecobamboo/chung-chi-e0-tam-op-than-tre-eco-bamboo-1x_1-d72574.webp",
    badge: "Eco E0 Standard",
    desc: "Bảo chứng cam kết an toàn môi trường sống và sức khỏe của nhà sản xuất Eco Bamboo."
  },
  {
    id: 7,
    title: "Chứng Nhận Hệ Thống Quản Lý Chất Lượng ISO 9001:2015",
    certCode: "ISO-9001-QMS",
    issuer: "Tổ chức Chứng nhận Quốc tế",
    dateIssued: "2024 - 2027",
    standard: "ISO 9001:2015 / TCVN ISO 9001:2015",
    testResult: "Quy trình kiểm soát chất lượng từ khâu nén ép cốt, phủ keo PUR đến phân loại",
    image: "/images/ecobamboo/chung-chi-e0-tam-op-than-tre-eco-bamboo-1x_1-d72574.webp",
    badge: "ISO 9001:2015",
    desc: "Quy trình sản xuất tự động hóa khép kín tại nhà máy Sơn Đồng đảm bảo 100% thành phẩm xuất xưởng có độ dày và màu sắc đồng đều hoàn hảo."
  },
  {
    id: 8,
    title: "Top 10 Thương Hiệu Vật Liệu Xanh Tiêu Biểu Vì Môi Trường",
    certCode: "GREEN-AWARDS-2024",
    issuer: "Hội đồng Doanh nghiệp Phát triển Bền vững Việt Nam",
    dateIssued: "20/10/2024",
    standard: "Tiêu chí sản phẩm sinh thái, giảm phát thải carbon và thân thiện môi trường",
    testResult: "Vật liệu xanh có thể tái chế, thay thế gỗ rừng tự nhiên và gạch đá nặng nề",
    gradient: "from-emerald-950 to-stone-900",
    badge: "Vật Liệu Xanh Xanh",
    desc: "Ghi nhận đóng góp của thương hiệu Eco Bamboo trong sứ mệnh tiên phong mang các giải pháp nội thất sinh thái bền vững đến hàng triệu ngôi nhà Việt."
  }
];

// ==========================================
// CERTIFICATES PAGE COMPONENT
// ==========================================
export default function CertificatesPage() {
  const [selectedLightboxCert, setSelectedLightboxCert] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleDownloadAllPDF = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-14 border-b border-bamboo-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600/30">
            Minh Bạch Chất Lượng & Pháp Lý
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Chứng Chỉ & Kiểm Định Chất Lượng
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
            Toàn bộ sản phẩm tấm ốp than tre Eco Bamboo đều trải qua các quy trình kiểm nghiệm định kỳ độc lập tại các viện nghiên cứu đầu ngành về an toàn phát thải E0, chống cháy B1 và keo PUR Đức.
          </p>

          <div className="pt-3 flex justify-center gap-3">
            <button
              onClick={handleDownloadAllPDF}
              className="px-5 py-2.5 rounded-xl bg-wood-500 hover:bg-wood-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center hover:scale-105"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Tải Trọn Bộ Hồ Sơ Kiểm Định (PDF)
            </button>
          </div>

          {downloadNotice && (
            <div className="p-3 rounded-xl bg-bamboo-900/90 text-bamboo-200 text-xs font-bold border border-bamboo-500 flex items-center justify-center animate-fade-in mt-3">
              <ShieldCheckIcon className="w-4 h-4 mr-2 text-emerald-400" />
              Đang tải xuống bộ hồ sơ chứng chỉ nghiệm thu: Ho_So_Kiem_Dinh_EcoBamboo_2025.pdf
            </div>
          )}
        </div>
      </div>

      {/* 2. GRID OF CERTIFICATES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-eco-gray-900 tracking-tight">
              Văn Bản Kiểm Nghiệm Tiêu Chuẩn Quốc Tế
            </h2>
            <p className="text-xs text-eco-gray-500 mt-0.5">
              Click vào từng chứng thư để mở ảnh Lightbox và tra cứu số hiệu văn bản kiểm định gốc.
            </p>
          </div>

          <span className="text-xs font-bold text-eco-gray-600 bg-eco-gray-100 px-3 py-1.5 rounded-lg hidden sm:inline">
            6 Chứng chỉ kiểm định chính thức
          </span>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATE_ITEMS.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedLightboxCert(cert)}
              className="group cursor-pointer rounded-3xl bg-white border border-eco-gray-200 overflow-hidden shadow-soft hover:shadow-card hover:border-bamboo-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Certificate Scan Frame */}
                <div className="h-64 w-full bg-eco-gray-100 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 text-white font-mono text-[10px] font-bold backdrop-blur-md">
                      Số: {cert.certCode}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow">
                      {cert.badge}
                    </span>
                  </div>

                  {/* Hover Inspect overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="px-4 py-2 rounded-xl bg-white text-bamboo-900 font-extrabold text-xs shadow-lg flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1.5 text-bamboo-700" />
                      Mở Xem Chứng Chỉ Gốc (Lightbox)
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-sm font-extrabold text-eco-gray-900 group-hover:text-bamboo-800 transition-colors line-clamp-2 leading-snug">
                    {cert.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-eco-gray-600 pt-1">
                    <div>
                      <strong className="text-eco-gray-900">Cơ quan cấp:</strong> {cert.issuer}
                    </div>
                    <div>
                      <strong className="text-eco-gray-900">Tiêu chuẩn:</strong> {cert.standard}
                    </div>
                    <div className="p-2 rounded-xl bg-bamboo-50/70 border border-bamboo-200/80 text-[11px] text-bamboo-900">
                      <strong>Kết quả đo:</strong> {cert.testResult}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-1 border-t border-eco-gray-100 flex items-center justify-between text-xs font-bold text-bamboo-700 group-hover:text-bamboo-900">
                <span>Ngày cấp: {cert.dateIssued}</span>
                <span>Phóng to &rarr;</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 3. LIGHTBOX MODAL: XEM CHỨNG CHỈ GỐC ĐỘ NÉT CAO */}
      {selectedLightboxCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-eco-gray-200 space-y-5 max-h-[92vh] overflow-y-auto">

            <button
              onClick={() => setSelectedLightboxCert(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-eco-gray-400 hover:text-eco-gray-700 hover:bg-eco-gray-100 transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            {/* Lightbox Header */}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-bamboo-700 bg-bamboo-50 px-2.5 py-0.5 rounded border border-bamboo-200">
                  {selectedLightboxCert.certCode}
                </span>
                <span className="text-xs font-bold text-eco-gray-500">
                  Ngày cấp: {selectedLightboxCert.dateIssued}
                </span>
              </div>
              <h3 className="text-xl font-black text-eco-gray-900 mt-1">
                {selectedLightboxCert.title}
              </h3>
              <p className="text-xs text-eco-gray-500">
                Đơn vị kiểm nghiệm: {selectedLightboxCert.issuer}
              </p>
            </div>

            {/* Real Certificate Preview in Lightbox */}
            <div className="max-h-[60vh] overflow-y-auto rounded-2xl border border-eco-gray-200 bg-eco-gray-100 flex items-center justify-center p-2">
              <img
                src={selectedLightboxCert.image}
                alt={selectedLightboxCert.title}
                className="max-h-[55vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Description & Application */}
            <div className="space-y-2 text-xs text-eco-gray-700 leading-relaxed bg-eco-gray-50 p-4 rounded-2xl border border-eco-gray-200">
              <strong className="block text-eco-gray-900 font-bold">Mục đích sử dụng tài liệu:</strong>
              <p>{selectedLightboxCert.desc}</p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  alert(`Đang tải file scan chứng chỉ: ${selectedLightboxCert.certCode}.pdf`);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-bamboo hover:bg-bamboo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Tải Bản Scan PDF Độ Nét Cao
              </button>
              <button
                onClick={() => setSelectedLightboxCert(null)}
                className="px-6 py-3 rounded-xl bg-eco-gray-100 hover:bg-eco-gray-200 text-eco-gray-800 text-xs font-bold transition-colors"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </MainLayout>
  );
}
