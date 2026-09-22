/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#001F3F',   // deep navy — sidebar, headers, primary actions
          primaryLight: '#0A3A6B',
          secondary: '#00A960', // success green — online status, resolved
        },
        severity: {
          critical: '#FF4136',
          high: '#FF851B',
          medium: '#FFC145',
          low: '#2ECC40',
          info: '#0074D9',
        },
        surface: {
          bg: '#F4F4F4',        // app canvas
          card: '#FFFFFF',
          border: '#E2E5E9',
          muted: '#6B7684',
          text: '#1A2433',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.08)',
      },
    },
  },
  plugins: [],
}
