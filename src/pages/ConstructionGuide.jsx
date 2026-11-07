import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND from '../config/brandConfig';
import { downloadGuidePdf } from '../utils/fileDownload';

// ==========================================
// ICON HELPER COMPONENTS (Lucide Style SVG)
// ==========================================
const PlayIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
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

const AlertTriangleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" x2="12" y1="9" y2="13"/>
    <line x1="12" x2="12.01" y1="17" y2="17"/>
  </svg>
);

// 6 STEPS OF CONSTRUCTION
export const CONSTRUCTION_STEPS = [
  {
    step: '01',
    title: 'Khảo Sát & Xử Lý Bề Mặt Tường',
    timeEst: 'Bước chuẩn bị',
    desc: 'Kiểm tra độ phẳng và độ ẩm tường gạch hoặc thạch cao. Trường hợp tường ẩm mốc nặng hoặc nồm ẩm rỉ nước, cần dựng hệ khung xương sắt hộp 20x20mm hoặc khung gỗ nhựa trước khi ốp.',
    keyPoints: [
      'Làm sạch bụi bẩn và dầu mỡ trên bề mặt tường',
      'Đảm bảo bề mặt cốt phẳng sai số không quá ±2mm',
      'Xác định vị trí đi dây điện ngầm cho nẹp LED hắt sáng'
    ]
  },
  {
    step: '02',
    title: 'Đo Đạc & Cắt Tấm Theo Kích Thước Bản Vẽ',
    timeEst: 'Cắt gọt chuẩn xác',
    desc: 'Dùng thước cuộn đo đạc chính xác chiều cao và chiều rộng mảng tường. Cắt tấm than tre bằng máy cưa bàn hoặc máy cắt cầm tay gắn đĩa cắt gỗ hợp kim đa năng nhiều răng.',
    keyPoints: [
      'Dùng lưỡi cưa hợp kim 80-100 răng để vết cắt mịn, không mẻ film',
      'Đặt mặt có film bảo vệ hướng lên trên khi cắt',
      'Để lại khe giãn nở 2mm ở chân tường và đỉnh trần'
    ]
  },
  {
    step: '03',
    title: 'Kỹ Thuật Soi Rãnh V Gập Vuông 90° & Uốn Vòm Cong R',
    timeEst: 'Kỹ thuật cốt lõi',
    desc: `Đây là ưu điểm vượt trội chỉ có ở tấm than tre ${BRAND.shortName}. Sử dụng máy phay cầm tay gắn mũi dao chữ V 90° để soi rãnh mặt sau tấm, chừa lại lớp màng film PETG bề mặt (~0.3mm) rồi bẻ gập nhẹ nhàng.`,
    keyPoints: [
      'Chỉnh cữ phay ăn sâu vừa chạm lớp film, tránh phay đứt film',
      'Đối với góc bo tròn: soi các đường rãnh song song cách nhau 8-10mm',
      'Bơm keo chuyên dụng vào rãnh V trước khi gập để khóa cố định góc'
    ]
  },
  {
    step: '04',
    title: 'Bơm Keo Dán Chuyên Dụng & Băng Keo Xốp Định Vị',
    timeEst: 'Gắn kết bền bỉ',
    desc: `Bơm keo chuyên dụng dán than tre ${BRAND.shortName} (hoặc keo Titebond) theo đường zíc zắc đều khắp mặt sau tấm với định mức 1 tuýp 300ml dán được ~3.5 m².`,
    keyPoints: [
      'Dán thêm các đoạn băng keo xốp 2 mặt để cố định tấm tức thì trong lúc chờ keo khô',
      'Không bôi keo quá sát mép (cách mép 2cm) để tránh keo tràn ra ngoài mạch',
      'Keo đạt độ kết dính chịu lực tối đa sau 12 - 24 giờ'
    ]
  },
  {
    step: '05',
    title: 'Ốp Tấm Lên Tường & Lắp Đặt Hệ Nẹp Nhôm / LED',
    timeEst: 'Lắp ghép hoàn thiện',
    desc: 'Đưa tấm lên vị trí, dùng búa cao su gõ nhẹ đều khắp bề mặt để keo dàn đều bám chắc vào cốt tường. Cài các thanh nẹp chỉ chữ T nối tấm, nẹp góc V và luồn dây LED hắt sáng định hình.',
    keyPoints: [
      'Dùng máy cân mực laser kiểm tra độ thẳng đứng tuyệt đối của mạch ghép',
      'Cài chân nẹp nhôm trước khi ốp tấm tiếp theo',
      'Kiểm tra độ khít của nắp chụp tán quang silicone nẹp LED'
    ]
  },
  {
    step: '06',
    title: 'Vệ Sinh Bề Mặt & Lột Màng Film Bảo Vệ PETG',
    timeEst: 'Nghiệm thu bàn giao',
    desc: 'Sau khi hoàn thiện toàn bộ công trình, lau sạch bụi và vết keo thừa (nếu có) bằng khăn ẩm mềm. Tiến hành lột lớp màng nilon bảo vệ bề mặt và bàn giao công trình cho gia chủ.',
    keyPoints: [
      'Chỉ lột màng nilon sau khi đã hoàn tất các hạng mục sơn bả trần xung quanh',
      'Không dùng các vật sắc nhọn kim loại để cạo vết bẩn',
      'Hướng dẫn chủ nhà vệ sinh bằng nước sạch hoặc dung dịch lau kính thông thường'
    ]
  }
];

// ==========================================
// CONSTRUCTION GUIDE PAGE COMPONENT
// ==========================================
export default function ConstructionGuide() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPDF = () => {
    try {
      downloadGuidePdf(BRAND.brandName);
    } catch (_) {}
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-14 border-b border-bamboo-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/30">
            Cẩm Nang Kỹ Thuật Độc Quyền
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Hướng Dẫn Thi Công Tấm Ốp Than Tre
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
            Quy trình 6 bước chuẩn kỹ thuật từ chuyên gia {BRAND.shortName}. Nắm vững bí quyết soi rãnh V gập vuông góc 90° và uốn vòm cong R sắc sảo không vết lộ.
          </p>

          <div className="pt-3 flex justify-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-xl bg-wood-500 hover:bg-wood-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center hover:scale-105"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Tải Sổ Tay Thi Công Bản In (PDF)
            </button>
          </div>

          {downloadSuccess && (
            <div className="p-3 rounded-xl bg-bamboo-900/90 text-bamboo-200 text-xs font-bold border border-bamboo-500 flex items-center justify-center animate-fade-in mt-3">
              <CheckCircleIcon className="w-4 h-4 mr-2 text-amber-400" />
              {`Đang tải xuống: So_Tay_Huong_Dan_Thi_Cong_${BRAND.id.toUpperCase()}_${getCurrentYear()}.pdf`}
            </div>
          )}
        </div>

        {/* SƠ ĐỒ QUY TRÌNH THỰC TẾ */}
        <div className="mt-8 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-eco-gray-200 bg-white">
          <img
            src="/images/ecobamboo/so-do-8-buoc-thi-cong-tam-op-eco-bamboo.webp"
            alt={`Sơ đồ 8 bước thi công tấm ốp than tre ${BRAND.shortName}`}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* 2. KHUNG VIDEO YOUTUBE NHÚNG / MÔ PHỎNG THỰC TẾ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="rounded-3xl overflow-hidden bg-black border-4 border-white shadow-2xl aspect-[16/9] max-w-4xl mx-auto relative group">

          {isPlayingVideo ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title={`Hướng Dẫn Thi Công Tấm Ốp Than Tre ${BRAND.shortName}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="w-full h-full cursor-pointer relative overflow-hidden flex flex-col items-center justify-center p-6 text-center text-white group"
            >
              <img
                src="/images/ecobamboo/thi-cong-tam-op-than-tre-9c1301.webp"
                alt={`Thực tế thi công tấm ốp than tre ${BRAND.shortName}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>

              {/* Play Button */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow-[0_0_40px_rgba(222,170,38,0.7)] group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300 pl-1 mb-4">
                <PlayIcon className="w-8 h-8" />
              </div>

              <div className="relative z-10 space-y-1">
                <span className="px-3 py-1 rounded-full bg-black/60 text-xs font-bold text-amber-300 uppercase tracking-wider backdrop-blur-md">
                  Video Kỹ Thuật Trực Tiếp Từ Nhà Máy
                </span>
                <h3 className="text-xl sm:text-2xl font-black drop-shadow">
                  Xem Video Thực Tế Soi Rãnh V & Uốn Cong 90° Tấm Than Tre
                </h3>
                <p className="text-xs text-eco-gray-200 drop-shadow">
                  Thời lượng: 6 phút 30 giây • Thao tác từng bước của thợ kỹ thuật lành nghề
                </p>
              </div>
            </div>
          )}

        </div>

        {/* SƠ ĐỒ QUY TRÌNH THỰC TẾ */}
        <div className="mt-8 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-eco-gray-200 bg-white">
          <img
            src="/images/ecobamboo/so-do-8-buoc-thi-cong-tam-op-eco-bamboo.webp"
            alt={`Sơ đồ 8 bước thi công tấm ốp than tre ${BRAND.shortName}`}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* 3. QUY TRÌNH 6 BƯỚC THI CÔNG TUẦN TỰ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-bamboo-700 uppercase tracking-widest bg-bamboo-100 px-3 py-1 rounded-full">
            Quy Trình Chuẩn
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-eco-gray-900 mt-2 tracking-tight">
            6 Bước Thi Công Hoàn Thiện Tấm Than Tre
          </h2>
          <p className="text-xs sm:text-sm text-eco-gray-500 mt-2">
            Đảm bảo độ bền kết cấu trên 20 năm, triệt tiêu khe hở và tạo nên những góc bẻ vuông vắn sắc nét.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONSTRUCTION_STEPS.map((stepItem, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-eco-gray-200 p-6 sm:p-7 shadow-soft hover:shadow-card hover:border-bamboo-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-bamboo-200 group-hover:text-bamboo-600 transition-colors">
                    {stepItem.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-bamboo-50 text-bamboo-800 text-[11px] font-bold border border-bamboo-100">
                    {stepItem.timeEst}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-eco-gray-900 leading-snug">
                  {stepItem.title}
                </h3>

                <p className="text-xs text-eco-gray-600 leading-relaxed font-normal">
                  {stepItem.desc}
                </p>

                {/* Key Points */}
                <div className="pt-3 border-t border-eco-gray-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-wood-700 tracking-wider block">
                    Điểm cần lưu ý:
                  </span>
                  {stepItem.keyPoints.map((kp, kIdx) => (
                    <div key={kIdx} className="flex items-start text-xs text-eco-gray-700">
                      <CheckCircleIcon className="w-3.5 h-3.5 mr-2 text-amber-600 shrink-0 mt-0.5" />
                      <span>{kp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. KHỐI LƯU Ý "SỐNG CÒN" KHI THI CÔNG */}
        <div className="mt-16 rounded-3xl bg-amber-50 border-2 border-amber-300 p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-3 text-amber-900">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangleIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black">Các Lưu Ý "Sống Còn" Khi Thao Tác Với Tấm Ốp Than Tre</h3>
              <p className="text-xs text-amber-800">Tránh hư hỏng vật tư và sai hỏng kỹ thuật ngoài công trình</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-amber-950 pt-2">
            <div className="p-4 rounded-xl bg-white/80 border border-amber-200 space-y-1">
              <strong>1. Cữ Dao Phay Rãnh V:</strong>
              <p className="text-eco-gray-700 text-[11px] leading-relaxed">
                Tuyệt đối không để mũi dao ăn sâu đứt màng film PETG. Luôn thử cữ trên một mẩu phôi thừa trước khi soi tấm chính.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-amber-200 space-y-1">
              <strong>2. Bê Tấm Khi Vận Chuyển:</strong>
              <p className="text-eco-gray-700 text-[11px] leading-relaxed">
                Luôn bê tấm theo phương thẳng đứng (dựng nghiêng). Không bê tấm theo phương nằm ngang khiến tấm bị võng gãy cốt than tre.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-amber-200 space-y-1">
              <strong>3. Loại Keo Thi Công:</strong>
              <p className="text-eco-gray-700 text-[11px] leading-relaxed">
                Chỉ sử dụng keo chuyên dụng không chứa dung môi ăn mòn. Không dùng cồn hoặc dung môi axeton để lau chùi bề mặt film.
              </p>
            </div>
          </div>
        </div>

        {/* 5. BANNER ĐÀO TẠO THỢ THI CÔNG */}
        <div className="mt-12 rounded-3xl bg-gradient-bamboo text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-hover">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-black">Bạn Là Thợ Thi Công Muốn Nâng Cao Tay Nghề?</h3>
            <p className="text-xs sm:text-sm text-bamboo-100">
              {BRAND.factoryName} tổ chức các buổi Workshop thực hành uốn vòm cong và soi rãnh V miễn phí hàng tháng tại {BRAND.factoryAddress.split(',').slice(-2).join(',')}.
            </p>
          </div>
          <a
            href={`tel:${BRAND.hotline.replace(/\./g, '')}`}
            className="shrink-0 px-6 py-3 rounded-xl bg-wood-500 hover:bg-wood-600 text-white font-extrabold text-xs uppercase tracking-wider shadow hover:scale-105 transition-all"
          >
            Đăng Ký Tham Gia Workshop ({BRAND.hotlineDisplay})
          </a>
        </div>

      </div>
    </MainLayout>
  );
}
