/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ai: {
          bg: '#09090b',
          surface: '#121316',
          surfaceRaised: '#18191e',
          surfaceGlass: 'rgba(18, 19, 22, 0.75)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.18)',
          accent: '#ffffff',
          accentDim: '#d4d4d8',
          metallic: '#a1a1aa',
          text: '#f4f4f5',
          textMuted: '#a1a1aa',
          textDim: '#52525b',
        },
        severity: {
          critical: '#ff4757',
          high: '#ff6b35',
          medium: '#ffc048',
          low: '#2ed573',
          info: '#ffffff',
        },
        surface: {
          bg: '#09090b',
          card: '#121316',
          border: 'rgba(255, 255, 255, 0.08)',
          muted: '#a1a1aa',
          text: '#f4f4f5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.02)',
        glow: '0 0 20px rgba(255,255,255,0.12), 0 0 40px rgba(255,255,255,0.03)',
        glowSm: '0 0 10px rgba(255,255,255,0.08)',
        glowTitanium: '0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(200,205,215,0.08)',
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        slideIn: {
          from: { transform: 'translateX(-8px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
