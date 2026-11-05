import React from 'react';
import ArticleLayout from './ArticleLayout';

export default function TermsPage() {
  return (
    <ArticleLayout
      title="Điều Khoản Sử Dụng Website & Sở Hữu Trí Tuệ - Eco Bamboo"
      category="Văn Bản Pháp Lý"
      author="Ban Pháp Chế Eco Bamboo"
      publishDate="01/01/2025"
      readTime="3 phút đọc"
      breadcrumb={[
        { name: "Trang chủ", link: "/" },
        { name: "Điều khoản sử dụng", link: "/dieu-khoan" }
      ]}
    >
      <div className="space-y-4">
        <p className="text-base text-eco-gray-800 leading-relaxed font-medium bg-eco-gray-50 p-4 rounded-xl border-l-4 border-wood-600">
          Khi truy cập và sử dụng dịch vụ trên website <em>ecobamboo.vn</em>, quý khách hàng mặc nhiên đồng thuận với các điều khoản và quy định pháp lý dưới đây.
        </p>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">1. Khuyến Nghị Về Hình Ảnh & Màu Sắc Mẫu Vật Liệu</h2>
        <p>
          Toàn bộ hình ảnh mã màu trên website được chụp từ sản phẩm mẫu thực tế của nhà máy. Tuy nhiên, do sự khác biệt về độ phân giải, độ sáng màn hình điện thoại hoặc máy tính của từng người dùng, màu sắc hiển thị có thể có độ sai lệch nhẹ (dưới 5%) so với thực tế ngoài trời. Eco Bamboo luôn khuyến nghị quý khách hàng đăng ký nhận bộ xâu mẫu cắt thực tế (Sample Box) miễn phí trước khi quyết định đặt hàng số lượng lớn.
        </p>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">2. Quyền Sở Hữu Trí Tuệ & Thương Hiệu</h2>
        <p>
          Thương hiệu <strong>ECO BAMBOO</strong>, logo biểu tượng, hình ảnh công trình, bộ mã màu (EB66xxx, EB68xxx, EB89xxx...) và các tài liệu kỹ thuật đăng tải trên website đều thuộc quyền sở hữu trí tuệ hợp pháp của Công ty Cổ phần Công nghiệp Eco Bamboo. Mọi hành vi sao chép, trích dẫn giả mạo thương hiệu để bán hàng kém chất lượng đều vi phạm pháp luật và sẽ bị xử lý theo Luật Sở hữu trí tuệ Việt Nam.
        </p>

        <h2 className="text-xl font-black text-eco-gray-900 pt-3">3. Trách Nhiệm Về Đơn Giá & Báo Giá Bóc Tách</h2>
        <p>
          Bảng giá niêm yết trên website là đơn giá xuất kho tại nhà máy Sơn Đồng tại thời điểm công bố. Giá có thể được điều chỉnh theo biến động giá nguyên vật liệu và chính sách chiết khấu theo sản lượng thực tế của từng đơn hàng.
        </p>
      </div>
    </ArticleLayout>
  );
}
