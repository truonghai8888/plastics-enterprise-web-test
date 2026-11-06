import React from 'react';
import ArticleLayout from './ArticleLayout';
import BRAND, { getCurrentYear, getCurrentDateFormatted } from '../config/brandConfig';

export default function WarrantyPolicyPage() {
  return (
    <ArticleLayout
      title={`Chính Sách Bảo Hành ${BRAND.warrantyYears} Năm Bằng Văn Bản - ${BRAND.brandName}`}
      category="Chính Sách & Hỗ Trợ"
      author={`Phòng Chăm Sóc Khách Hàng ${BRAND.brandName}`}
      publishDate={getCurrentDateFormatted()}
      readTime="4 phút đọc"
      breadcrumb={[
        { name: "Trang chủ", link: "/" },
        { name: "Chính sách", link: "/chinh-sach" },
        { name: "Chính sách bảo hành", link: "/chinh-sach-bao-hanh" }
      ]}
    >
      <div className="space-y-4">
        <p className="text-base text-eco-gray-800 leading-relaxed font-medium bg-amber-50 p-4 rounded-xl border-l-4 border-amber-600">
          {BRAND.legalName} cam kết chính sách bảo hành chính hãng lên đến <strong>{BRAND.warrantyYears} năm</strong> bằng văn bản (tính từ ngày giao nhận hàng hóa ghi trên phiếu xuất kho) cho toàn bộ các dòng sản phẩm tấm ốp than tre, lam sóng và phụ kiện.
        </p>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">1. Phạm Vi Áp Dụng</h2>
        <p>
          Áp dụng thống nhất cho tất cả các khách hàng, nhà thầu thi công, kiến trúc sư và đại lý phân phối mua sản phẩm chính hãng mang thương hiệu {BRAND.brandName} trên toàn lãnh thổ Việt Nam.
        </p>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">2. Các Trường Hợp Được Bảo Hành Miễn Phí (Đổi 1-1)</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Cốt tấm bị cong vênh, co ngót hoặc nứt nẻ tự nhiên trong điều kiện sử dụng nội thất bình thường.</li>
          <li>Màng film PETG bề mặt bị bong tróc, phồng rộp lớp keo dán nhiệt PUR do lỗi kỹ thuật sản xuất của nhà máy.</li>
          <li>Độ bền màu sắc bề mặt bị biến đổi bất thường mà không do tác động ngoại lực hay hóa chất tẩy rửa mạnh.</li>
          <li>Sản phẩm bị mối mọt xâm hại hoặc mục mủn do nồm ẩm môi trường.</li>
        </ul>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">3. Các Trường Hợp Từ Chối Bảo Hành</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Sản phẩm bị hư hỏng do lỗi thi công sai kỹ thuật (bơm keo không đúng chủng loại, cắt phay rãnh đứt film bề mặt).</li>
          <li>Sử dụng ngoài trời chịu nắng mưa trực tiếp (sản phẩm được thiết kế chuyên dụng cho nội thất).</li>
          <li>Hư hại do thiên tai, hỏa hoạn vượt quá ngưỡng chịu nhiệt B1 hoặc va đập cơ học nặng.</li>
        </ul>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">4. Quy Trình Tiếp Nhận & Xử Lý Bảo Hành</h2>
        <p>
          Khách hàng chụp ảnh/quay video hiện trạng lỗi và liên hệ hotline hỗ trợ kỹ thuật: <strong>{BRAND.hotlineDisplay}</strong> hoặc gửi email về <em>{BRAND.email}</em>. Chuyên viên kỹ thuật sẽ kiểm tra và xác nhận phương án đổi trả bù tấm mới trong vòng 24 - 48 giờ làm việc.
        </p>
      </div>
    </ArticleLayout>
  );
}
