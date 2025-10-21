/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.5' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        h1: ['2rem', { lineHeight: '1.25' }],
        h2: ['1.75rem', { lineHeight: '1.25' }],
        h3: ['1.5rem', { lineHeight: '1.25' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        loose: '1.75',
      },
      colors: {
        primary: '#4F46E5',
        secondary: '#6366F1',
        accent: '#FACC15',
        background: '#F9FAFB',
        text_primary: '#111827',
        text_secondary: '#6B7280',
        error: '#EF4444',
        success: '#10B981',
      },
      borderRadius: {
        md: '0.375rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4,0,0.2,1)',
        soft: 'cubic-bezier(0.2,0.9,0.2,1)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        'content-max': '1200px',
      },
    },
  },
  plugins: [],
}