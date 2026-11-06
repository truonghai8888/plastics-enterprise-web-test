import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import BRAND from './config/brandConfig';

// Đồng bộ Title, Meta Description & Favicon theo thương hiệu trung tâm
if (typeof document !== 'undefined') {
  document.title = `${BRAND.shortName} - ${BRAND.slogan}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${BRAND.shortName} - ${BRAND.aboutSummary}`);
  }
  const favIconUrl = BRAND.logo.faviconUrl || BRAND.logo.squareUrl;
  if (favIconUrl) {
    document.querySelectorAll("link[rel*='icon']").forEach((el) => {
      if (el.getAttribute('type') !== 'image/x-icon') {
        el.type = 'image/png';
        el.href = favIconUrl;
      }
    });
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
