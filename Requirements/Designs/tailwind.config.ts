/**
 * NT Green Market — Tailwind CSS Configuration
 * Extends Tailwind with NashTech brand tokens
 * Copy this file to the project root when scaffolding the app
 */

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Colors ───────────────────────────────────────
      colors: {
        primary: {
          DEFAULT: '#D6001C',
          hover:   '#BD0019',
          dark:    '#A70218',
        },
        secondary: {
          DEFAULT: '#6A1F7A',
        },
        accent: {
          DEFAULT: '#2D7A4F',   // Market Green
          light:   '#48A570',
        },
        // Neutrals mapped to NashTech palette
        gray: {
          50:  '#F6F7F8',
          200: '#D9D9D9',
          400: '#99A4B5',
          500: '#6C7685',
          700: '#4E5761',
          900: '#2A2E3A',
        },
        // Semantic
        success: '#2D7A4F',
        warning: '#F4AD33',
        info:    '#0094D5',
        error:   '#D6001C',
      },

      // ─── Typography ─────────────────────────────────────────
      fontFamily: {
        heading: ['Mulish', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],  // default sans
      },
      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1.4' }],
        sm:   ['0.875rem', { lineHeight: '1.4' }],
        base: ['1rem',     { lineHeight: '1.65' }],
        lg:   ['1.125rem', { lineHeight: '1.5' }],
        xl:   ['1.25rem',  { lineHeight: '1.4' }],
        '2xl':['1.5rem',   { lineHeight: '1.3' }],
        '3xl':['1.875rem', { lineHeight: '1.2' }],
        '4xl':['2.25rem',  { lineHeight: '1.2' }],
        '5xl':['3rem',     { lineHeight: '1.1' }],
      },

      // ─── Spacing ─────────────────────────────────────────────
      // Tailwind's default 4px base unit is used — no overrides needed

      // ─── Border Radius ───────────────────────────────────────
      borderRadius: {
        sm:   '2px',
        DEFAULT: '4px',
        md:   '6px',
        lg:   '8px',
        xl:   '12px',
        full: '9999px',
      },

      // ─── Box Shadows ─────────────────────────────────────────
      boxShadow: {
        sm:  '0 1px 3px rgba(15, 15, 26, 0.08)',
        md:  '0 4px 16px rgba(15, 15, 26, 0.10)',
        lg:  '0 10px 40px rgba(15, 15, 26, 0.12)',
      },

      // ─── Background Gradients ────────────────────────────────
      backgroundImage: {
        'gradient-brand':   'linear-gradient(270deg, #D6001C 13.02%, #6A1F7A 98.28%)',
        'gradient-green':   'linear-gradient(135deg, #2D7A4F, #48A570)',
        'gradient-overlay': 'linear-gradient(180deg, rgba(18,18,22,0.5), rgba(18,18,22,0.7))',
      },

      // ─── Container ───────────────────────────────────────────
      maxWidth: {
        container: '1280px',
      },

      // ─── Animation ───────────────────────────────────────────
      transitionDuration: {
        fast:   '150ms',
        normal: '200ms',
        slow:   '300ms',
      },

      // ─── Z-Index Scale ───────────────────────────────────────
      zIndex: {
        raised:   '10',
        dropdown: '20',
        sticky:   '30',
        modal:    '50',
        toast:    '60',
      },
    },
  },
  plugins: [],
}

export default config
