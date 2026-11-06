/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Màu chủ đạo nhận diện AMC & Gỗ Nhựa
        amc: {
          50: '#fdfbf6',
          100: '#fbf5e9',
          200: '#f5e7c8',
          300: '#edd49f',
          400: '#e5be6b',
          500: '#deaa26', // AMC Gold chủ đạo
          600: '#ca941c',
          700: '#a57416',
          800: '#845b17',
          900: '#3d372e',
          950: '#23201d',
          gold: '#deaa26',
          blue: '#27a8e0',
          dark: '#2e2b27',
        },
        brand: {
          primary: '#deaa26',
          secondary: '#d1a56c',
          dark: '#2e2b27',
          accent: '#27a8e0',
        },
        // YÊU CẦU 3: Ánh xạ hệ màu bamboo sang hệ màu vàng kim hoàng gia & than ấm của Nhựa AMC
        bamboo: {
          50: '#fdfbf6',
          100: '#fbf5e9',
          200: '#f5e7c8',
          300: '#edd49f',
          400: '#e5be6b',
          500: '#deaa26', // Vàng kim AMC chính
          600: '#b88b1b', // Vàng kim đậm (hover/active)
          700: '#997112', // Vàng kim nhấn
          800: '#6c4a17', // Nâu vàng sang trọng
          900: '#332f2a', // Nâu than đậm
          950: '#1e1c19', // Đen than tối sâu
          accent: '#deaa26',
          leaf: '#d1a56c',
        },
        // Màu gỗ & đất tự nhiên (Wood / Timber)
        wood: {
          50: '#faf6f2',
          100: '#f5ede3',
          200: '#ebd9c6',
          300: '#ddc0a2',
          400: '#cfa37d',
          500: '#d1a56c', // Màu vân gỗ tự nhiên AMC
          600: '#b6844f',
          700: '#97663e',
          800: '#7a5135',
          900: '#64432d',
          950: '#362216',
        },
        // Màu xám xi măng / đá công nghiệp
        'eco-gray': {
          50: '#f8faf9',
          100: '#f1f5f3',
          200: '#e2e8e5',
          300: '#cbd5d0',
          400: '#94a39d',
          500: '#64746f',
          600: '#475551',
          700: '#333e3b',
          800: '#1f2624',
          900: '#111413',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        'dropdown': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-bamboo': 'linear-gradient(135deg, #2e2b27 0%, #deaa26 50%, #b88b1b 100%)',
        'gradient-wood': 'linear-gradient(135deg, #d1a56c 0%, #be9054 100%)',
      }
    },
  },
  plugins: [],
}
