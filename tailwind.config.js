/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Màu chủ đạo xanh lá Eco Bamboo
        bamboo: {
          50: '#f2f9f4',
          100: '#e1f2e6',
          200: '#c4e5ce',
          300: '#97d1ab',
          400: '#64b681',
          500: '#3b9b60',
          600: '#2d804d', // Eco Green chủ đạo
          700: '#25663f',
          800: '#1f5234',
          900: '#1b432c',
          950: '#0b2617', // Xanh rừng sâu cao cấp
          accent: '#10B981',
          leaf: '#2E7D32',
        },
        // Màu gỗ & đất tự nhiên (Wood / Timber)
        wood: {
          50: '#faf6f2',
          100: '#f3ece2',
          200: '#e7d8c4',
          300: '#d7be9f',
          400: '#c39e76',
          500: '#af8053', // Nâu gỗ ấm áp
          600: '#9e6d45',
          700: '#83553a',
          800: '#6c4533',
          900: '#593a2c',
          950: '#311c14',
          warm: '#8B5A2B',
          dark: '#3D2314',
        },
        // Nền sáng và dải trung tính hơi hướng eco
        'eco-gray': {
          50: '#F9FAF9', // Nền trang nhã
          100: '#F3F5F4',
          200: '#E5EAE7',
          300: '#D1DAD4',
          400: '#9AA8A0',
          500: '#6B7A72',
          600: '#4E5A54',
          700: '#3A443F',
          800: '#272E2B',
          900: '#141816', // Chữ đen đậm
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'Inter',
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 67, 44, 0.08)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 10px -2px rgba(0, 0, 0, 0.02)',
        'dropdown': '0 20px 40px -10px rgba(11, 38, 23, 0.15)',
        'hover': '0 16px 32px -8px rgba(45, 128, 77, 0.18)',
      },
      backgroundImage: {
        'gradient-bamboo': 'linear-gradient(135deg, #2d804d 0%, #1f5234 100%)',
        'gradient-wood': 'linear-gradient(135deg, #af8053 0%, #83553a 100%)',
        'gradient-surface': 'linear-gradient(180deg, #F9FAF9 0%, #F3F5F4 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulse-subtle 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}

