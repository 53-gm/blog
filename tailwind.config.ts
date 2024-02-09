import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        ZenKakuGothicNew: ["var(--font-ZenKakuGothicNew)"],
      },
      colors: {
        "nb" : "#0a224e",
        "nb2" : "#0a254e",
        "w2" : "#fdf5e6",
      }
    },
  },
  plugins: [],
}
export default config
