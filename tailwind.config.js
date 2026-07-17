/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1B365D',
          'navy-dark': '#0F2744',
          blue: '#0072CE',
          teal: '#45A29E',
          'teal-light': '#5BBFB8',
          gold: '#C9A25A',
        },
        royal: {
          DEFAULT: '#1B365D',
          50: '#EEF4FA',
          100: '#D5E4F2',
          200: '#A8C8E5',
          300: '#6BA3D1',
          400: '#0072CE',
          500: '#1B5A8A',
          600: '#1B365D',
          700: '#152B4A',
          800: '#0F2744',
          900: '#0A1C30',
        },
        deep: {
          DEFAULT: '#0F2744',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F2744',
          950: '#071525',
        },
        teal: {
          DEFAULT: '#45A29E',
          50: '#EDFAF9',
          100: '#D0F0EE',
          200: '#A3E0DC',
          300: '#5BBFB8',
          400: '#45A29E',
          500: '#3A8A87',
          600: '#2F7270',
        },
        // Warm ivory canvas + soft sand neutrals for a premium, human feel
        sand: {
          50: '#FDFCFA',
          100: '#F7F5F0',
          200: '#EFEBE2',
          300: '#E2DBCC',
          400: '#C9BFA9',
        },
        // Signature muted gold accent for premium highlights
        gold: {
          DEFAULT: '#C9A25A',
          50: '#FBF7EE',
          100: '#F3E9D0',
          200: '#E7D3A3',
          300: '#D8B978',
          400: '#C9A25A',
          500: '#AE8641',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid display scale for hero + section titles
        'display-sm': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.5rem, 5.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(3rem, 7vw, 5.25rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        // Layered ambient shadows for realistic depth
        soft: '0 1px 2px rgba(15, 39, 68, 0.04), 0 4px 16px rgba(15, 39, 68, 0.06)',
        card: '0 2px 4px rgba(15, 39, 68, 0.05), 0 12px 32px rgba(27, 54, 93, 0.10)',
        lift: '0 8px 16px rgba(15, 39, 68, 0.08), 0 24px 48px rgba(27, 54, 93, 0.16)',
        glow: '0 0 0 1px rgba(69, 162, 158, 0.08), 0 12px 48px rgba(69, 162, 158, 0.28)',
        'glow-royal': '0 12px 48px rgba(27, 54, 93, 0.35)',
        ring: '0 0 0 1px rgba(255, 255, 255, 0.6) inset',
        'inner-soft': 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1B365D 0%, #0072CE 50%, #45A29E 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #1B5A8A 0%, #0072CE 55%, #5BBFB8 100%)',
        'gradient-hero':
          'linear-gradient(115deg, rgba(7, 21, 37, 0.94) 0%, rgba(15, 39, 68, 0.88) 32%, rgba(27, 54, 93, 0.82) 58%, rgba(0, 114, 206, 0.72) 100%)',
        'gradient-hero-overlay':
          'linear-gradient(180deg, rgba(7, 21, 37, 0.55) 0%, transparent 40%, rgba(7, 21, 37, 0.75) 100%)',
        'gradient-soft': 'linear-gradient(180deg, #FDFCFA 0%, #F1F5F9 100%)',
        'gradient-mesh':
          'radial-gradient(at 15% 15%, rgba(0, 114, 206, 0.14) 0px, transparent 45%), radial-gradient(at 85% 20%, rgba(69, 162, 158, 0.14) 0px, transparent 45%), radial-gradient(at 50% 90%, rgba(27, 54, 93, 0.10) 0px, transparent 45%)',
        'gradient-gold': 'linear-gradient(135deg, #D8B978 0%, #C9A25A 100%)',
        'grid-lines':
          'linear-gradient(to right, rgba(15, 39, 68, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 39, 68, 0.05) 1px, transparent 1px)',
        'dot-grid': 'radial-gradient(rgba(15, 39, 68, 0.10) 1px, transparent 1px)',
        shine: 'linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.5) 48%, transparent 62%)',
      },
      backgroundSize: {
        grid: '48px 48px',
        dots: '22px 22px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        shine: 'shine 1.1s ease forwards',
        'gradient-pan': 'gradientPan 6s ease infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        gradientPan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
