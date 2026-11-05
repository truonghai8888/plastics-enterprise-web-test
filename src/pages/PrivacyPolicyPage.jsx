import React from 'react';
import ArticleLayout from './ArticleLayout';

export default function PrivacyPolicyPage() {
  return (
    <ArticleLayout
      title="Chính Sách Bảo Mật Thông Tin Khách Hàng - Eco Bamboo"
      category="Văn Bản Pháp Lý"
      author="Ban Giám Đốc Eco Bamboo"
      publishDate="01/01/2025"
      readTime="3 phút đọc"
      breadcrumb={[
        { name: "Trang chủ", link: "/" },
        { name: "Chính sách bảo mật", link: "/chinh-sach-bao-mat" }
      ]}
    >
      <div className="space-y-4">
        <p className="text-base text-eco-gray-800 leading-relaxed font-medium bg-eco-gray-50 p-4 rounded-xl border-l-4 border-bamboo-600">
          Công ty Cổ phần Công nghiệp Eco Bamboo cam kết bảo mật tuyệt đối các thông tin cá nhân và dữ liệu liên hệ của khách hàng, đối tác theo đúng quy định pháp luật Việt Nam.
        </p>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">1. Mục Đích Thu Thập Thông Tin</h2>
        <p>
          Các thông tin như họ tên, số điện thoại, địa chỉ giao nhận hàng và email chỉ được thu thập khi người dùng chủ động điền vào các biểu mẫu: Đăng ký nhận mẫu vật liệu (Sample Box), Tải bảng giá/Catalogue hoặc Đăng ký làm đại lý phân phối.
        </p>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">2. Cơ Chế Sử Dụng Cookie & Bộ Nhớ Trình Duyệt</h2>
        <p>
          Hệ thống website <em>ecobamboo.vn</em> sử dụng cookie và Local Storage trên thiết bị người dùng nhằm mục đích lưu trữ tạm thời các cấu hình tiện ích như: thông số kích thước vách tường đã nhập trong công cụ tính chi phí, mã màu yêu thích trong Room Visualizer. Dữ liệu này được lưu trữ cục bộ trên máy của bạn và <strong>không truyền tải về máy chủ trung tâm</strong> để theo dõi trái phép.
        </p>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">3. Quyền Chỉnh Sửa & Xóa Bỏ Dữ Liệu</h2>
        <p>
          Khách hàng có quyền yêu cầu Eco Bamboo cập nhật hoặc xóa bỏ hoàn toàn dữ liệu liên hệ của mình khỏi hệ thống chăm sóc khách hàng bất cứ lúc nào bằng cách gọi hotline <strong>0915.189.389</strong> hoặc gửi yêu cầu qua email <em>sale.ecobamboo@gmail.com</em>.
        </p>
      </div>
    </ArticleLayout>
  );
}
