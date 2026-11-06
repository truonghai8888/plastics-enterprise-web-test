import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Giúp assets được nạp tương đối linh hoạt trên GitHub Pages & Custom Domain
});
