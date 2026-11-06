import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ColorLibraryPage from './pages/ColorLibraryPage';
import RoomVisualizerPage from './pages/RoomVisualizerPage';
import PricingTable from './pages/PricingTable';
import CostCalculator from './pages/CostCalculator';
import WallDesignerPage from './pages/WallDesignerPage';
import LeadForms from './pages/LeadForms';
import ProjectsGallery from './pages/ProjectsGallery';
import ConstructionGuide from './pages/ConstructionGuide';
import ArticleLayout from './pages/ArticleLayout';
import NewsPage from './pages/NewsPage';
import FAQPage from './pages/FAQPage';
import CertificatesPage from './pages/CertificatesPage';
import AboutPage from './pages/AboutPage';
import DistributorPage from './pages/DistributorPage';
import WarrantyPolicyPage from './pages/WarrantyPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import { PRODUCTS } from './data/products';
import BRAND, { getCurrentYear } from './config/brandConfig';

// Danh sách các top-level route của website để phân biệt giữa project repo subpath và user-site/custom domain
export const KNOWN_TOP_ROUTES = [
  'tu-thiet-ke-vach', 'san-pham-chinh', 'thu-vien-ma-mau', 'bang-gia',
  'tinh-chi-phi', 'cong-trinh', 'tai-catalogue', 'huong-dan-thi-cong',
  'tin-tuc', 'hoi-dap', 'gioi-thieu', 'chung-chi-chung-nhan',
  'chinh-sach-bao-hanh', 'lien-he', 'nhan-mau', 'san-pham',
  'chinh-sach-bao-mat', 'dieu-khoan', 'nha-phan-phoi', 'tam-than-tre-17mm'
];

// Hỗ trợ tự động phát hiện basePath khi deploy trên GitHub Pages (cả User site lẫn Project site)
export const getBasePath = () => {
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    const parts = window.location.pathname.split('/').filter(Boolean);
    // Nếu segment đầu tiên KHÔNG nằm trong danh sách routes, đó chính là tên repository subpath (vd: /plastics-enterprise-web-test/)
    if (parts.length > 0 && !KNOWN_TOP_ROUTES.includes(parts[0])) {
      return '/' + parts[0] + '/';
    }
  }
  return '/';
};

// 38 URLs từ file ecobamboo.md
export const normalizePath = (p) => {
  if (!p) return '/';
  const clean = p.split('?')[0].split('#')[0];
  const base = getBasePath();
  let path = clean;
  if (base !== '/' && path.startsWith(base)) {
    path = '/' + path.slice(base.length);
  }
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
};

export const PLASTICS_ENTERPRISE_URLS = [
  { url: '/', label: '1. Trang chủ (#main)', page: 'home' },
  { url: '/nha-phan-phoi', label: '2. Nhà phân phối', page: 'distributor' },
  { url: '/san-pham-chinh', label: '4. Sản phẩm chính (Tất cả)', page: 'category', categoryId: 'all' },
  { url: '/san-pham-chinh/tam-op-than-tre', label: '5. Tấm ốp than tre', page: 'category', categoryId: 'tam-op-than-tre' },
  { url: '/tam-than-tre-17mm', label: '6. Tấm than tre 17mm', page: 'category', categoryId: 'tam-than-tre-17mm' },
  { url: '/san-pham-chinh/lam-song', label: '7. Lam sóng than tre', page: 'category', categoryId: 'lam-song' },
  { url: '/san-pham-chinh/nep', label: '8. Nẹp nhôm hoàn thiện', page: 'category', categoryId: 'nep' },
  { url: '/thu-vien-ma-mau', label: '9. Thư viện mã màu (160+)', page: 'colors' },
  { url: '/thu-vien-ma-mau/phoi-mau/', label: '10. Phối màu 3D (Visualizer)', page: 'visualizer' },
  { url: '/bang-gia', label: `11. Bảng giá vật tư ${getCurrentYear()}`, page: 'pricing' },
  { url: '/tinh-chi-phi', label: '12. Tính chi phí vật tư', page: 'calculator' },
  { url: '/tu-thiet-ke-vach', label: '13. Tự thiết kế chia mảng vách', page: 'wall-designer' },
  { url: '/cong-trinh', label: '14. Công trình thực tế', page: 'projects' },
  { url: '/tai-catalogue', label: '15. Tải catalogue PDF', page: 'leads', leadPurpose: 'catalogue' },
  { url: '/huong-dan-thi-cong', label: '16. Hướng dẫn thi công & uốn 90°', page: 'guide' },
  { url: '/tin-tuc', label: '17. Tin tức & cẩm nang', page: 'news' },
  { url: '/hoi-dap', label: '18. Hỏi đáp thường gặp (FAQ)', page: 'faq' },
  { url: '/gioi-thieu', label: `19. Giới thiệu ${BRAND.brandName} & nhà máy`, page: 'about' },
  { url: '/chung-chi-chung-nhan', label: '20. Chứng chỉ E0, B1, PUR', page: 'certificates' },
  { url: '/chinh-sach-bao-hanh', label: `21. Chính sách bảo hành ${BRAND.warrantyYears} năm`, page: 'warranty' },
  { url: '/lien-he', label: '22. Liên hệ nhà máy', page: 'leads', leadPurpose: 'contact' },
  { url: '/nhan-mau', label: '23. Nhận mẫu thử (Sample Box)', page: 'leads', leadPurpose: 'sample' },
  { url: '/lien-he?nc=dai-ly', label: '24. Đăng ký đại lý', page: 'leads', leadPurpose: 'dealer' },
  { url: '/san-pham/tam-op-than-tre/van-go/tam-op-van-go-eb66006.html', label: '25. SP: Vân gỗ EB66006', page: 'detail', productCode: 'EB66006' },
  { url: '/san-pham/tam-op-than-tre/don-sac/whiteeb68038.html', label: '26. SP: White EB68038', page: 'detail', productCode: 'EB68038' },
  { url: '/san-pham/tam-op-than-tre/don-sac/glossy-light-greyeb68032g.html', label: '27. SP: Glossy Light Grey EB68032G', page: 'detail', productCode: 'EB68032G' },
  { url: '/san-pham/tam-op-than-tre/don-sac/glossy-whiteeb68031g.html', label: '28. SP: Glossy White EB68031G', page: 'detail', productCode: 'EB68031G' },
  { url: '/san-pham/tam-op-than-tre/van-da/luxe-eb89028.html', label: '29. SP: Vân đá Luxe EB89028', page: 'detail', productCode: 'EB89028' },
  { url: '/san-pham/tam-op-than-tre/don-sac/glossy-dark-greyeb68033g.html', label: '30. SP: Glossy Dark Grey EB68033G', page: 'detail', productCode: 'EB68033G' },
  { url: '/san-pham/tam-op-than-tre/don-sac/tam-op-don-sac-eb68017.html', label: '31. SP: Light-grey Skin EB68017', page: 'detail', productCode: 'EB68017' },
  { url: '/san-pham/tam-op-than-tre/don-sac/light-greyeb68037.html', label: '32. SP: Light Grey EB68037', page: 'detail', productCode: 'EB68037' },
  { url: '/san-pham/tam-op-than-tre/don-sac/glossy-latteeb68040.html', label: '33. SP: Glossy Latte EB68040', page: 'detail', productCode: 'EB68040' },
  { url: '/san-pham/tam-op-than-tre/van-vai/tam-op-van-vai-eb79019.html', label: '34. SP: Vân vải Beige Cream EB79019', page: 'detail', productCode: 'EB79019' },
  { url: '/san-pham/tam-op-than-tre/van-vai/tam-op-van-vai-eb79021.html', label: '35. SP: Vân vải Rimini EB79021', page: 'detail', productCode: 'EB79021' },
  { url: '/san-pham/tam-op-than-tre/van-da/tam-op-van-da-petg-eb89019g.html', label: '36. SP: Calacatta PET-G EB89019G', page: 'detail', productCode: 'EB89019G' },
  { url: '/chinh-sach-bao-mat', label: '37. Chính sách bảo mật', page: 'privacy' },
  { url: '/dieu-khoan', label: '38. Điều khoản sử dụng', page: 'terms' },
];

export const ECOBAMBOO_URLS = PLASTICS_ENTERPRISE_URLS;

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    // Check initial pathname & strip trailing slash if any
    const rawPath = window.location.pathname;
    const cleanPath = normalizePath(rawPath);
    const matched = PLASTICS_ENTERPRISE_URLS.find(u => normalizePath(u.url) === cleanPath);
    if (matched) return matched;
    // URL không tồn tại / không hoạt động -> Tự động chuyển hướng về trang chủ
    if (cleanPath !== '/' && typeof window !== 'undefined' && window.history) {
      const base = getBasePath();
      window.history.replaceState({}, '', base);
    }
    return PLASTICS_ENTERPRISE_URLS[0];
  });

  const [selectedProduct, setSelectedProduct] = useState(() => {
    return PRODUCTS[0];
  });

  const [visualizerCode, setVisualizerCode] = useState('EB66006');
  const [categoryFilterId, setCategoryFilterId] = useState('all');

  // Listen to popstate and global internal link clicks
  useEffect(() => {
    const handlePopState = () => {
      const rawPath = window.location.pathname;
      const cleanPath = normalizePath(rawPath);
      const matched = PLASTICS_ENTERPRISE_URLS.find(u => normalizePath(u.url) === cleanPath);
      // Nếu URL popstate không hoạt động -> chuyển về trang chủ
      if (!matched && cleanPath !== '/' && window.history) {
        const base = getBasePath();
        window.history.replaceState({}, '', base);
      }
      navigateTo(matched || PLASTICS_ENTERPRISE_URLS[0], false);
    };

    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      
      // Ignore mailto, tel, external links
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://')) {
        return;
      }
      
      // Handle #main or root
      if (href === '/#main' || href === '#main' || href === '/') {
        e.preventDefault();
        navigateTo(PLASTICS_ENTERPRISE_URLS[0]);
        return;
      }

      // Check against URLs
      const cleanPath = normalizePath(href);

      const matched = PLASTICS_ENTERPRISE_URLS.find(u => normalizePath(u.url) === cleanPath);
      if (matched) {
        e.preventDefault();
        navigateTo(matched);
      } else {
        // YÊU CẦU: Bất kỳ URL nào không hoạt động -> Tự động trả về trang chủ!
        e.preventDefault();
        navigateTo(PLASTICS_ENTERPRISE_URLS[0]);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const navigateTo = (targetRoute, pushState = true) => {
    setCurrentRoute(targetRoute);

    if (targetRoute.productCode) {
      const prod = PRODUCTS.find(p => p.code.toLowerCase() === targetRoute.productCode.toLowerCase());
      if (prod) setSelectedProduct(prod);
    }

    if (targetRoute.categoryId) {
      setCategoryFilterId(targetRoute.categoryId);
    }

    if (pushState && window.history && targetRoute.url) {
      const base = getBasePath();
      const finalUrl = base === '/' ? targetRoute.url : (base + (targetRoute.url === '/' ? '' : targetRoute.url.replace(/^\//, '')));
      window.history.pushState({}, '', finalUrl);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    const matched = PLASTICS_ENTERPRISE_URLS.find(u => u.productCode === prod.code) || {
      url: `/san-pham/${prod.id}`,
      label: prod.name,
      page: 'detail',
      productCode: prod.code
    };
    navigateTo(matched);
  };

  const handleOpenVisualizer = (code = 'EB66006') => {
    setVisualizerCode(code);
    const visualizerRoute = PLASTICS_ENTERPRISE_URLS.find(u => u.page === 'visualizer');
    navigateTo(visualizerRoute);
  };

  return (
    <div className="relative">
      {/* RENDER KHỚP VỚI CÁC TRANG CỦA WEBSITE */}
      {currentRoute.page === 'home' && <HomePage />}
      {currentRoute.page === 'distributor' && <DistributorPage />}
      {currentRoute.page === 'category' && (
        <CategoryPage 
          onSelectProduct={handleSelectProduct} 
          initialCategory={categoryFilterId || 'all'} 
        />
      )}
      {currentRoute.page === 'detail' && (
        <ProductDetailPage 
          product={selectedProduct} 
          onSelectProduct={handleSelectProduct} 
        />
      )}
      {currentRoute.page === 'colors' && (
        <ColorLibraryPage onOpenVisualizer={handleOpenVisualizer} />
      )}
      {currentRoute.page === 'visualizer' && (
        <RoomVisualizerPage 
          initialCode={visualizerCode} 
          onNavigateProduct={(code) => {
            const p = PRODUCTS.find(x => x.code === code);
            if (p) handleSelectProduct(p);
          }} 
        />
      )}
      {currentRoute.page === 'pricing' && (
        <PricingTable onOpenCalculator={() => {
          const calcRoute = PLASTICS_ENTERPRISE_URLS.find(u => u.page === 'calculator');
          navigateTo(calcRoute);
        }} />
      )}
      {currentRoute.page === 'calculator' && <CostCalculator />}
      {currentRoute.page === 'wall-designer' && <WallDesignerPage />}
      {currentRoute.page === 'projects' && <ProjectsGallery />}
      {currentRoute.page === 'guide' && <ConstructionGuide />}
      {currentRoute.page === 'news' && <NewsPage />}
      {currentRoute.page === 'article' && <ArticleLayout />}
      {currentRoute.page === 'faq' && <FAQPage />}
      {currentRoute.page === 'about' && <AboutPage />}
      {currentRoute.page === 'certificates' && <CertificatesPage />}
      {currentRoute.page === 'warranty' && <WarrantyPolicyPage />}
      {currentRoute.page === 'privacy' && <PrivacyPolicyPage />}
      {currentRoute.page === 'terms' && <TermsPage />}
      {currentRoute.page === 'leads' && (
        <LeadForms key={currentRoute.leadPurpose} />
      )}
      {/* Fallback cho bất kỳ URL không hoạt động hoặc không tồn tại -> trở về trang chủ */}
      {!['home', 'distributor', 'category', 'detail', 'colors', 'visualizer', 'pricing', 'calculator', 'wall-designer', 'projects', 'guide', 'news', 'article', 'faq', 'about', 'certificates', 'warranty', 'privacy', 'terms', 'leads'].includes(currentRoute.page) && (
        <HomePage />
      )}
    </div>
  );
}
