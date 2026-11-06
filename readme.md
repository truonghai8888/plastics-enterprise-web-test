# Nhựa AMC — Website Doanh Nghiệp & 3D Wall Studio (Plastics Enterprise Web)

Hệ thống website doanh nghiệp sản xuất gỗ nhựa, tấm ốp than tre đa năng tích hợp công cụ trực tuyến **Tự thiết kế vách 3D Studio** (WebGL Interactive 3D Wall Studio) đạt chuẩn an toàn formaldehyde E0 và chống cháy B1.

---

## 📑 Mục Lục
1. [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
2. [Khởi Chạy Cục Bộ Bằng Docker](#-khởi-chạy-cục-bộ-bằng-docker)
3. [Hướng Dẫn Build & Xuất Bản Lên GitHub Pages](#-hướng-dẫn-build--xuất-bản-lên-github-pages)
4. [Cơ Chế Kỹ Thuật Đặc Thù](#-cơ-chế-kỹ-thuật-đặc-thù)
5. [Cấu Trúc Thư Mục Dự Án](#-cấu-trúc-thư-mục-dự-án)

---

## 🛠 Công Nghệ Sử Dụng
- **Giao diện & Ứng dụng**: React 18, Vite 5, Tailwind CSS
- **3D Studio Engine**: WebGL 3D Viewer thuần, Canvas 2D kỹ thuật bổ chi tiết, thư viện vật liệu & nẹp
- **Server Production Local**: Nginx Alpine trong Docker đa tầng (Multi-stage build)
- **Tự động hóa CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)

---

## 🐳 Khởi Chạy Cục Bộ Bằng Docker

Dự án được đóng gói đầy đủ trong Docker Container `plastics-enterprise-web` (chạy trên cổng `3000`):

```bash
# Build và khởi chạy container chạy ngầm
docker compose up -d --build

# Xem nhật ký logs hoạt động của container
docker compose logs -f

# Tạm dừng container
docker compose stop

# Khởi động lại container sau khi tạm dừng
docker compose start

# Tắt và xóa container
docker compose down
```

Sau khi chạy, truy cập website tại: **`http://localhost:3000`** (3D Studio tại: **`http://localhost:3000/tu-thiet-ke-vach`**).

---

## 🚀 Hướng Dẫn Build & Xuất Bản Lên GitHub Pages

Dự án đã được tích hợp quy trình CI/CD hoàn toàn tự động thông qua **GitHub Actions**, cho phép build và publish trực tiếp lên GitHub Pages **100% miễn phí, không phụ thuộc bên thứ ba**.

### 1. Kích hoạt tính năng GitHub Pages trên Repository (Bắt buộc làm 1 lần)
Mặc định trên GitHub, tính năng Pages chưa được bật tự động. Bạn cần kích hoạt theo các bước sau:
1. Mở trình duyệt và truy cập trang cài đặt Pages của kho chứa:
   `https://github.com/<tai-khoan>/<ten-repo>/settings/pages`
   *(Ví dụ: `https://github.com/<tai-khoan>/plastics-enterprise-web/settings/pages`)*
2. Tại phần **Build and deployment**:
   - Ở ô dropdown **Source**, chọn: **GitHub Actions** (thay vì *Deploy from a branch*).
3. Lưu lại.

### 2. Các lệnh Git đẩy mã nguồn lên GitHub (Thực hiện thủ công)
Khi có bất kỳ thay đổi nào trong mã nguồn, bạn thực hiện đẩy code bằng các lệnh sau:

```bash
# 1. Kiểm tra các tệp đã thay đổi
git status

# 2. Thêm tất cả thay đổi vào stage
git add .

# 3. Ghi lại commit với thông điệp rõ ràng
git commit -m "feat: cap nhat tinh nang moi"

# 4. Đẩy mã nguồn lên nhánh chính của GitHub
git push origin main
```

### 3. Theo dõi tiến trình triển khai
1. Truy cập tab **Actions** trên GitHub: `https://github.com/<tai-khoan>/<ten-repo>/actions`
2. Workflow **Deploy to GitHub Pages** sẽ tự động thực hiện:
   - Cài đặt thư viện bằng `npm ci`
   - Biên dịch ứng dụng bằng `npm run build`
   - Tự động tạo entrypoints và file điều hướng SPA `404.html`
   - Đẩy bản build lên máy chủ GitHub Pages
3. Sau khi hiển thị biểu tượng xanh (Success ✅), website của bạn đã online tại:
   - **Dạng Project Site**: `https://<tai-khoan>.github.io/<ten-repo>/`
   - **Dạng User Site**: `https://<tai-khoan>.github.io/`

---

## ⚙️ Cơ Chế Kỹ Thuật Đặc Thù

### 1. Điều Hướng SPA Không Lỗi 404 (`/tu-thiet-ke-vach`, `/san-pham-chinh`,...)
- GitHub Pages là máy chủ tĩnh thuần túy không hỗ trợ URL rewrite động như Nginx.
- Dự án đã tích hợp kịch bản chuyển tiếp thông minh tại `public/404.html` kết hợp với entrypoint tĩnh tạo sẵn tại `dist/tu-thiet-ke-vach/index.html`.
- Người dùng khi truy cập trực tiếp link con hoặc bấm F5 tải lại trang đều nhận được phản hồi chính xác mã HTTP 200 mà không bao giờ bị trang 404 của GitHub.

### 2. Tự Động Phù Hợp Đường Dẫn Assets, Font & Video Trên GitHub Subpath
- Khi deploy dưới dạng thư mục con (ví dụ: `/<ten-repo>/`), các đường dẫn tuyệt đối như `/assets/...`, `/images/...`, `/videos/...` thường bị trình duyệt hiểu nhầm là ở gốc domain.
- Ứng dụng đã xử lý bằng hệ thống hook `getBasePath()` và bộ lọc tương thích tại `index.html`:
  - Video giới thiệu nhà máy (`/videos/amc-factory-intro.mp4`) tự động nhận đúng URL gốc của kho chứa.
  - Bộ WebGL Engine `vach.js`, `vach-data.js` và bảng mã vật tư `vach.css` luôn được nạp đầy đủ.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
plastics_enterprise_web/
├── .github/workflows/deploy.yml   # Kịch bản CI/CD GitHub Actions
├── public/                        # Tài nguyên tĩnh trực tiếp
│   ├── assets/                    # CSS, JS (3D Studio WebGL engine), fonts, icons
│   ├── images/                    # Thư viện ảnh mẫu màu, vật liệu, phối cảnh
│   ├── videos/                    # Video giới thiệu nhà máy AMC (amc-factory-intro.mp4)
│   └── 404.html                   # Bộ điều hướng SPA fallback cho GitHub Pages
├── src/
│   ├── components/                # Header, Footer, Navbar, Modal dùng chung
│   ├── config/brandConfig.js      # Thiết lập thương hiệu Nhựa AMC
│   ├── data/                      # Dữ liệu sản phẩm, mã màu, nẹp, catalogue
│   ├── pages/                     # Các trang: HomePage, WallDesignerPage (3D Studio),...
│   ├── App.jsx                    # Routing toàn cục và xử lý BasePath đa nền tảng
│   └── main.jsx                   # Entrypoint React
├── Dockerfile                     # Multi-stage Docker build (Node builder + Nginx serve)
├── docker-compose.yml             # Cấu hình container plastics-enterprise-web
├── package.json                   # Danh mục dependencies và scripts
├── tailwind.config.js             # Bảng màu thương hiệu AMC và style system
├── vite.config.js                 # Cấu hình Vite với base tương đối
└── readme.md                      # Tài liệu hướng dẫn dự án
```
