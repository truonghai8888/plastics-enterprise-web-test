import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import BRAND, { getYearSpan } from '../config/brandConfig';

export default function AboutPage() {
  return (
    <MainLayout>
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-bamboo-950 via-bamboo-900 to-bamboo-950 text-white py-14 border-b border-bamboo-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/30">
            Giới Thiệu Về {BRAND.brandName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {BRAND.legalName}
          </h1>
          <p className="text-xs sm:text-sm text-eco-gray-200 leading-relaxed font-light">
            {BRAND.slogan}
          </p>
        </div>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* SECTION A: GIỚI THIỆU VỀ NHÀ MÁY & VIDEO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-sm text-eco-gray-700 leading-relaxed">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              Hành Trình Kiến Tạo & Phát Triển
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-eco-gray-900 tracking-tight">
              GIỚI THIỆU VỀ NHÀ MÁY NHỰA {BRAND.shortName}
            </h2>
            <p>
              Với tâm huyết tạo ra những sản phẩm nhựa chất lượng cao, <strong>{BRAND.shortName}</strong> cam kết mang đến những giải pháp bền vững, thân thiện với môi trường và đáp ứng mọi nhu cầu của khách hàng. Chúng tôi không chỉ đơn thuần sản xuất nhựa, mà còn góp phần xây dựng một cuộc sống tiện nghi và hiện đại hơn.
            </p>
            <p>
              Ra đời từ năm <strong>{BRAND.establishedYear}</strong> ({getYearSpan(BRAND.establishedYear)}), {BRAND.shortName} tự hào là một trong những nhà sản xuất nhựa chất lượng hàng đầu tại Việt Nam. Với hệ thống sản xuất hiện đại đạt tiêu chuẩn quốc tế, {BRAND.shortName} cam kết mang đến những sản phẩm nhựa chất lượng tốt nhất, đáp ứng mọi yêu cầu khắt khe của khách hàng. Thương hiệu {BRAND.shortName} đã nhanh chóng khẳng định vị thế và được đông đảo khách hàng tin tưởng lựa chọn.
            </p>
            <p>
              Mỗi sản phẩm {BRAND.shortName} đều được tạo ra với sự tỉ mỉ và tinh tế, đảm bảo tính thẩm mỹ cao, dễ dàng vệ sinh và sử dụng lâu dài. Chúng tôi tin rằng, một ngôi nhà đẹp và bền vững bắt đầu từ những chi tiết nhỏ nhất, và {BRAND.shortName} tự hào là người đồng hành đáng tin cậy trong từng bước hoàn thiện không gian sống của bạn.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-center">
                <div className="text-xl sm:text-2xl font-black text-amber-800">E0</div>
                <div className="text-[11px] text-eco-gray-600 font-semibold mt-0.5">Chuẩn an toàn Châu Âu</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-wood-50/80 border border-wood-200/70 text-center">
                <div className="text-xl sm:text-2xl font-black text-wood-800">{BRAND.warrantyYears} Năm</div>
                <div className="text-[11px] text-eco-gray-600 font-semibold mt-0.5">Bảo hành bằng văn bản</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-center">
                <div className="text-xl sm:text-2xl font-black text-amber-800">160+</div>
                <div className="text-[11px] text-eco-gray-600 font-semibold mt-0.5">Mã màu độc quyền</div>
              </div>
            </div>
          </div>

          {/* KHUNG VIDEO NHÀ MÁY THỰC TẾ */}
          <div className="lg:col-span-6 space-y-3">
            <div className="rounded-3xl overflow-hidden border border-eco-gray-300 shadow-2xl bg-black relative">
              <video
                controls
                className="w-full aspect-video object-cover"
                poster="/images/nhuaamc/473728285_122162385302280460_5265071145712265862_n-1.jpg"
              >
                <source src="/videos/amc-factory-intro.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ phát video HTML5.
              </video>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-eco-gray-200 text-xs text-eco-gray-600 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="font-bold text-eco-gray-900">Video giới thiệu nhà máy và dây chuyền sản xuất {BRAND.shortName}</span>
              </div>
              <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">CCN Kim Bình</span>
            </div>
          </div>
        </div>

        {/* SECTION B: 3 TRỤ CỘT TẦM NHÌN - SỨ MỆNH - TRIẾT LÝ KINH DOANH */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              Định Hướng Chiến Lược
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-eco-gray-900">
              TẦM NHÌN • SỨ MỆNH • TRIẾT LÝ KINH DOANH
            </h3>
            <p className="text-xs text-eco-gray-500">
              Kim chỉ nam trong mọi hoạt động sản xuất và vận hành của tập thể cán bộ công nhân viên {BRAND.shortName}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tầm nhìn */}
            <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 sm:p-7 shadow-soft space-y-4 hover:shadow-hover hover:border-amber-400 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center p-2.5">
                  <img
                    src="/images/nhuaamc/icons8-vision-100.png"
                    alt="Tầm nhìn"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-lg font-black text-eco-gray-900">Tầm Nhìn</h4>
                <p className="text-xs text-eco-gray-600 leading-relaxed">
                  Với tầm nhìn trở thành một doanh nghiệp sản xuất gỗ nhựa chất lượng hàng đầu Việt Nam, có thể phân hủy và thân thiện với môi trường. Chúng tôi đã không ngừng đổi mới, nâng cao chất lượng sản phẩm và dịch vụ, đồng thời cam kết tuân thủ nghiêm ngặt các tiêu chuẩn trong nước và quốc tế.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-bold text-amber-700">Top đầu sản xuất gỗ nhựa Việt Nam &rarr;</div>
            </div>

            {/* Sứ mệnh */}
            <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 sm:p-7 shadow-soft space-y-4 hover:shadow-hover hover:border-amber-400 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center p-2.5">
                  <img
                    src="/images/nhuaamc/icons8-mission-100.png"
                    alt="Sứ mệnh"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-lg font-black text-eco-gray-900">Sứ Mệnh</h4>
                <p className="text-xs text-eco-gray-600 leading-relaxed">
                  {BRAND.shortName} hướng đến việc trở thành nhà sản xuất các sản phẩm gỗ nhựa chất lượng cao, giá cả hợp lý, mang đến cho khách hàng những trải nghiệm sống bền vững và đẳng cấp. Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu và cam kết đồng hành cùng khách hàng trong mọi công trình.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-bold text-amber-700">Đồng hành trong từng công trình &rarr;</div>
            </div>

            {/* Triết lý kinh doanh */}
            <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 sm:p-7 shadow-soft space-y-4 hover:shadow-hover hover:border-amber-400 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center p-2.5">
                  <img
                    src="/images/nhuaamc/icons8-business-100-1.png"
                    alt="Triết lý kinh doanh"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-lg font-black text-eco-gray-900">Triết Lý Kinh Doanh</h4>
                <p className="text-xs text-eco-gray-600 leading-relaxed">
                  Với triết lý kinh doanh <strong>&ldquo;Bền vững – Chất lượng – Đổi mới&rdquo;</strong>, chúng tôi không ngừng nỗ lực để trở thành doanh nghiệp hàng đầu trong lĩnh vực sản xuất gỗ nhựa, mang đến những giải pháp tối ưu sản xuất nhựa, mà còn góp phần xây dựng một cuộc sống tiện nghi và hiện đại hơn cho khách hàng.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-bold text-amber-700">Bền vững • Chất lượng • Đổi mới &rarr;</div>
            </div>
          </div>
        </div>

        {/* SECTION C: TẠI SAO CHỌN NHỰA AMC ? (TỪ TRANG CHỦ THEO YÊU CẦU TODO ITEM 3) */}
        <div className="bg-gradient-to-br from-amber-50/60 via-white to-wood-50/60 rounded-3xl border border-amber-200/80 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md">
              Ưu Thế Vượt Trội
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-eco-gray-900">
              TẠI SAO CHỌN NHỰA {BRAND.shortName} ?
            </h3>
            <p className="text-xs sm:text-sm text-eco-gray-600">
              Nhà máy sản xuất gỗ nhựa chất lượng hàng đầu Việt Nam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-eco-gray-200 shadow-sm text-center space-y-3 flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center p-3">
                <img
                  src="/images/nhuaamc/icons8-best-seller-100.png"
                  alt="Chất lượng đạt tiêu chuẩn quốc tế"
                  className="w-14 h-14 object-contain"
                />
              </div>
              <h4 className="font-extrabold text-base text-eco-gray-900">
                Chất Lượng Đạt Tiêu Chuẩn Quốc Tế
              </h4>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Sự khác biệt của {BRAND.shortName} đến từ công nghệ sản xuất tiên tiến & tay nghề của đội ngũ kỹ thuật của nhà máy. Giá cả cạnh tranh chỉ là một trong những lợi thế của {BRAND.shortName}.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-eco-gray-200 shadow-sm text-center space-y-3 flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center p-3">
                <img
                  src="/images/nhuaamc/icons8-growth-100-1.png"
                  alt="Thân thiện với môi trường"
                  className="w-14 h-14 object-contain"
                />
              </div>
              <h4 className="font-extrabold text-base text-eco-gray-900">
                Thân Thiện Với Môi Trường
              </h4>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Với cấu tạo từ nhựa nguyên sinh, sản phẩm không chỉ thân thiện với môi trường mà còn sở hữu khả năng chống chịu vượt trội với mọi điều kiện thời tiết khắc nghiệt.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-eco-gray-200 shadow-sm text-center space-y-3 flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center p-3">
                <img
                  src="/images/nhuaamc/icons8-forever-100.png"
                  alt="Bền vững theo năm tháng"
                  className="w-14 h-14 object-contain"
                />
              </div>
              <h4 className="font-extrabold text-base text-eco-gray-900">
                Bền Vững Theo Năm Tháng
              </h4>
              <p className="text-xs text-eco-gray-600 leading-relaxed">
                Dù là nắng mưa thất thường hay khí hậu nồm ẩm nhiệt đới, nhựa {BRAND.shortName} vẫn giữ nguyên được vẻ đẹp và độ bền, bảo vệ ngôi nhà của bạn bền đẹp dài lâu.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION D: KHÁCH HÀNG NÓI GÌ VỀ NHỰA AMC */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              Đánh Giá Thực Tế
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-eco-gray-900">
              KHÁCH HÀNG NÓI GÌ VỀ NHỰA {BRAND.shortName}
            </h3>
            <p className="text-xs text-eco-gray-500">
              Sự hài lòng của khách hàng và nhà phân phối là minh chứng rõ nhất cho chất lượng sản phẩm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 sm:p-8 shadow-soft space-y-4 flex flex-col sm:flex-row gap-5 items-start">
              <img
                src="/images/nhuaamc/khach-hang-1-150x150-1.jpg"
                alt="Khách hàng đại lý"
                className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-amber-400 shadow-sm"
              />
              <div className="space-y-2">
                <div className="flex items-center space-x-1 text-amber-400 text-sm">
                  {'★★★★★'}
                </div>
                <p className="text-xs sm:text-sm text-eco-gray-700 leading-relaxed italic">
                  &ldquo;Anh biết đến nhựa {BRAND.shortName} thông qua 1 người bạn ở Hà Nam. Sau khi tìm hiểu về dòng sản phẩm này, anh quyết định mua về ốp thử xem chất lượng thế nào. Nhận thấy chất lượng của nhựa {BRAND.shortName} rất tốt, hơn nữa thị trường gỗ nhựa cũng đang tiềm năng và có cơ hội phát triển trong tương lai, anh quyết định nhập hàng về phân phối cho các đại lý. Trộm vía cũng được mọi người tin tưởng và ủng hộ nhiều.&rdquo;
                </p>
                <div className="text-xs font-bold text-eco-gray-900">
                  Anh Tuấn — <span className="font-normal text-eco-gray-500">Đại lý phân phối vật tư, Hà Nam</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-eco-gray-200 p-6 sm:p-8 shadow-soft space-y-4 flex flex-col sm:flex-row gap-5 items-start">
              <img
                src="/images/nhuaamc/khach-hang-2-150x150-1.jpg"
                alt="Khách hàng gia đình"
                className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-amber-400 shadow-sm"
              />
              <div className="space-y-2">
                <div className="flex items-center space-x-1 text-amber-400 text-sm">
                  {'★★★★★'}
                </div>
                <p className="text-xs sm:text-sm text-eco-gray-700 leading-relaxed italic">
                  &ldquo;Chị quyết định ốp toàn bộ ngôi nhà mình full nhựa của {BRAND.shortName} sau khi đến thăm nhà bạn chị vì nhà bạn chị cũng sử dụng tấm ốp {BRAND.shortName} lâu rồi. Thấy nó bảo bền và đẹp lắm, còn dễ dàng vệ sinh nữa nên nhà có con nhỏ cũng yên tâm.&rdquo;
                </p>
                <div className="text-xs font-bold text-eco-gray-900">
                  Chị Mai Hương — <span className="font-normal text-eco-gray-500">Chủ căn hộ chung cư cao cấp</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION E: HỆ THỐNG TRỤ SỞ & NHÀ MÁY SẢN XUẤT */}
        <div className="bg-white rounded-3xl border border-eco-gray-200 p-8 sm:p-10 shadow-sm space-y-6">
          <h3 className="text-lg font-extrabold text-eco-gray-900 border-l-4 border-amber-600 pl-3">
            Hệ Thống Trụ Sở & Cơ Sở Sản Xuất {BRAND.brandName}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-eco-gray-700 leading-relaxed">
            <div className="p-5 rounded-2xl bg-eco-gray-50 border border-eco-gray-200 space-y-3">
              {BRAND.factory?.mapUrl ? (
                <a
                  href={BRAND.factory.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold text-sm text-amber-900 hover:text-amber-700 underline decoration-amber-400/60 flex items-center justify-between group"
                  title="Mở vị trí trên Google Maps"
                >
                  <span>{BRAND.factory?.title || 'Nhà Máy Sản Xuất & Tổng Kho'}</span>
                  <span className="text-xs font-semibold text-amber-700 group-hover:translate-x-0.5 transition-transform">📍 Mở Google Maps ↗</span>
                </a>
              ) : (
                <div className="font-extrabold text-sm text-amber-900">{BRAND.factory?.title || 'Nhà Máy Sản Xuất & Tổng Kho'}</div>
              )}
              <p>
                <strong>Địa chỉ:</strong>{' '}
                {BRAND.factory?.mapUrl ? (
                  <a
                    href={BRAND.factory.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-800 hover:underline"
                    title="Mở vị trí trên Google Maps"
                  >
                    {BRAND.factory?.address || BRAND.factoryAddress}
                  </a>
                ) : (
                  BRAND.factory?.address || BRAND.factoryAddress
                )}
              </p>
              <p><strong>Năng lực sản xuất:</strong> {BRAND.factory?.capacity || 'Dây chuyền sản xuất tấm ốp, lam sóng và sàn nhựa tự động liên tục công suất hàng chục ngàn m²/tháng.'}</p>
              <p><strong>Hotline xuất xưởng:</strong> <a href={`tel:${BRAND.hotline.replace(/\./g, '')}`} className="text-amber-800 font-bold hover:underline">{BRAND.hotlineDisplay}</a></p>
            </div>

            <div className="p-5 rounded-2xl bg-eco-gray-50 border border-eco-gray-200 space-y-3">
              {BRAND.office?.mapUrl ? (
                <a
                  href={BRAND.office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold text-sm text-wood-900 hover:text-wood-700 underline decoration-wood-400/60 flex items-center justify-between group"
                  title="Mở vị trí trên Google Maps"
                >
                  <span>{BRAND.office?.title || 'Văn Phòng Điều Hành & CSKH'}</span>
                  <span className="text-xs font-semibold text-wood-700 group-hover:translate-x-0.5 transition-transform">📍 Mở Google Maps ↗</span>
                </a>
              ) : (
                <div className="font-extrabold text-sm text-wood-900">{BRAND.office?.title || 'Văn Phòng Điều Hành & CSKH'}</div>
              )}
              <p>
                <strong>Địa chỉ:</strong>{' '}
                {BRAND.office?.mapUrl ? (
                  <a
                    href={BRAND.office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-wood-800 hover:underline"
                    title="Mở vị trí trên Google Maps"
                  >
                    {BRAND.office?.address || BRAND.officeAddress}
                  </a>
                ) : (
                  BRAND.office?.address || BRAND.officeAddress
                )}
              </p>
              <p><strong>Chức năng:</strong> Tiếp nhận yêu cầu đăng ký đại lý, cung cấp xâu mẫu (sample box) và hỗ trợ kỹ thuật công trình.</p>
              <p><strong>Email chính thức:</strong> <a href={BRAND.socialLinks.email} className="hover:underline">{BRAND.email}</a></p>
            </div>
          </div>
        
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
          )}
        </div>

      </div>
    </MainLayout>
  );
}
