import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import BRAND from './config/brandConfig';

// Đồng bộ Title & Meta Description theo thương hiệu trung tâm
if (typeof document !== 'undefined') {
  document.title = `${BRAND.shortName} - ${BRAND.slogan}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${BRAND.shortName} - ${BRAND.aboutSummary}`);
  }
  const favicon = document.querySelector("link[rel*='icon']");
  if (favicon && BRAND.logo.squareUrl) {
    favicon.href = BRAND.logo.squareUrl;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
