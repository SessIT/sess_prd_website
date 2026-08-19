// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}", // Includes React files
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */

/* ============================================================
   SRI EASWARI SCIENTIFIC SOLUTIONS PVT LTD
   Tailwind Config — maps CSS variables → Tailwind utilities
   ============================================================ */

export default {
  // ── Class-based dark mode (add class="dark" on <html>) ────
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {

      /* ── FONTS ─────────────────────────────────────────── */
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
        sans:    ['var(--font-body)',    'sans-serif'],  // Tailwind default override
      },

      /* ── FONT SIZES ─────────────────────────────────────── */
      fontSize: {
        '2xs':  ['var(--text-2xs)', { lineHeight: 'var(--leading-normal)' }],
        xs:     ['var(--text-xs)',  { lineHeight: 'var(--leading-normal)' }],
        sm:     ['var(--text-sm)',  { lineHeight: 'var(--leading-normal)' }],
        base:   ['var(--text-base)',{ lineHeight: 'var(--leading-normal)' }],
        md:     ['var(--text-md)',  { lineHeight: 'var(--leading-snug)'   }],
        lg:     ['var(--text-lg)',  { lineHeight: 'var(--leading-snug)'   }],
        xl:     ['var(--text-xl)',  { lineHeight: 'var(--leading-snug)'   }],
        '2xl':  ['var(--text-2xl)', { lineHeight: 'var(--leading-tight)'  }],
        '3xl':  ['var(--text-3xl)', { lineHeight: 'var(--leading-tight)'  }],
        '4xl':  ['var(--text-4xl)', { lineHeight: 'var(--leading-tight)'  }],
        '5xl':  ['var(--text-5xl)', { lineHeight: 'var(--leading-none)'   }],
        '6xl':  ['var(--text-6xl)', { lineHeight: 'var(--leading-none)'   }],
        '7xl':  ['var(--text-7xl)', { lineHeight: 'var(--leading-none)'   }],
      },

      /* ── FONT WEIGHTS ───────────────────────────────────── */
      fontWeight: {
        light:     'var(--font-weight-light)',
        normal:    'var(--font-weight-regular)',
        medium:    'var(--font-weight-medium)',
        semibold:  'var(--font-weight-semibold)',
        bold:      'var(--font-weight-bold)',
        extrabold: 'var(--font-weight-extrabold)',
      },

      /* ── LETTER SPACING ─────────────────────────────────── */
      letterSpacing: {
        tighter: 'var(--tracking-tighter)',
        tight:   'var(--tracking-tight)',
        normal:  'var(--tracking-normal)',
        wide:    'var(--tracking-wide)',
        wider:   'var(--tracking-wider)',
        widest:  'var(--tracking-widest)',
      },

      /* ── COLOURS ────────────────────────────────────────── */
      colors: {

        /* Primary — Teal */
        primary: {
          50:  'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)',
          DEFAULT: 'var(--color-primary-500)',
        },

        /* Secondary — Navy */
        secondary: {
          50:  'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
          950: 'var(--color-secondary-950)',
          DEFAULT: 'var(--color-secondary-500)',
        },

        /* Accent — Amber */
        accent: {
          50:  'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
          DEFAULT: 'var(--color-accent-500)',
        },

        /* Neutral */
        neutral: {
          0:   'var(--color-neutral-0)',
          50:  'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },

        /* Semantic tokens */
        success: {
          light:   'var(--color-success-light)',
          DEFAULT: 'var(--color-success)',
          dark:    'var(--color-success-dark)',
        },
        warning: {
          light:   'var(--color-warning-light)',
          DEFAULT: 'var(--color-warning)',
          dark:    'var(--color-warning-dark)',
        },
        error: {
          light:   'var(--color-error-light)',
          DEFAULT: 'var(--color-error)',
          dark:    'var(--color-error-dark)',
        },
        info: {
          light:   'var(--color-info-light)',
          DEFAULT: 'var(--color-info)',
          dark:    'var(--color-info-dark)',
        },

        /* Semantic surface / text */
        bg: {
          base:    'var(--bg-base)',
          subtle:  'var(--bg-subtle)',
          muted:   'var(--bg-muted)',
        },
        surface: {
          DEFAULT: 'var(--surface-default)',
          raised:  'var(--surface-raised)',
          overlay: 'var(--surface-overlay)',
          sunken:  'var(--surface-sunken)',
        },
        text: {
          heading:  'var(--text-heading)',
          body:     'var(--text-body)',
          muted:    'var(--text-muted)',
          disabled: 'var(--text-disabled)',
          inverse:  'var(--text-inverse)',
          brand:    'var(--text-brand)',
          link:     'var(--text-link)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          muted:   'var(--border-muted)',
          strong:  'var(--border-strong)',
          brand:   'var(--border-brand)',
          focus:   'var(--border-focus)',
          error:   'var(--border-error)',
          success: 'var(--border-success)',
        },
      },

      /* ── BORDER RADIUS ──────────────────────────────────── */
      borderRadius: {
        none:  'var(--border-radius-none)',
        xs:    'var(--border-radius-xs)',
        sm:    'var(--border-radius-sm)',
        md:    'var(--border-radius-md)',
        lg:    'var(--border-radius-lg)',
        xl:    'var(--border-radius-xl)',
        '2xl': 'var(--border-radius-2xl)',
        '3xl': 'var(--border-radius-3xl)',
        full:  'var(--border-radius-full)',
        DEFAULT: 'var(--border-radius-md)',
      },

      /* ── BORDER WIDTHS ──────────────────────────────────── */
      borderWidth: {
        thin:  'var(--border-width-thin)',
        base:  'var(--border-width-base)',
        thick: 'var(--border-width-thick)',
        heavy: 'var(--border-width-heavy)',
        DEFAULT: 'var(--border-width-thin)',
      },

      /* ── OUTLINE ────────────────────────────────────────── */
      outlineWidth: {
        DEFAULT: 'var(--outline-width)',
      },
      outlineOffset: {
        DEFAULT: 'var(--outline-offset)',
      },
      outlineColor: {
        DEFAULT: 'var(--outline-color)',
        error:   'var(--outline-color-error)',
      },

      /* ── SPACING ────────────────────────────────────────── */
      spacing: {
        'px':    '1px',
        '0.5':   'var(--space-0-5)',
        '1':     'var(--space-1)',
        '1.5':   'var(--space-1-5)',
        '2':     'var(--space-2)',
        '2.5':   'var(--space-2-5)',
        '3':     'var(--space-3)',
        '4':     'var(--space-4)',
        '5':     'var(--space-5)',
        '6':     'var(--space-6)',
        '8':     'var(--space-8)',
        '10':    'var(--space-10)',
        '12':    'var(--space-12)',
        '16':    'var(--space-16)',
        '20':    'var(--space-20)',
        '24':    'var(--space-24)',
        '32':    'var(--space-32)',
      },

      /* ── BOX SHADOWS ────────────────────────────────────── */
      boxShadow: {
        xs:           'var(--shadow-xs)',
        sm:           'var(--shadow-sm)',
        md:           'var(--shadow-md)',
        lg:           'var(--shadow-lg)',
        xl:           'var(--shadow-xl)',
        '2xl':        'var(--shadow-2xl)',
        inner:        'var(--shadow-inner)',
        none:         'var(--shadow-none)',
        'brand-sm':   'var(--shadow-brand-sm)',
        'brand-md':   'var(--shadow-brand-md)',
        'brand-lg':   'var(--shadow-brand-lg)',
        'secondary-sm': 'var(--shadow-secondary-sm)',
        'secondary-md': 'var(--shadow-secondary-md)',
        'accent-sm':  'var(--shadow-accent-sm)',
        DEFAULT: 'var(--shadow-sm)',
      },

      /* ── TRANSITION TIMING ──────────────────────────────── */
      transitionDuration: {
        fast:   '150ms',
        base:   '200ms',
        slow:   '300ms',
        slower: '500ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      /* ── MAX WIDTHS (container) ─────────────────────────── */
      maxWidth: {
        xs:    'var(--container-xs)',
        sm:    'var(--container-sm)',
        md:    'var(--container-md)',
        lg:    'var(--container-lg)',
        xl:    'var(--container-xl)',
        // '2xl': 'var(--container-2xl)',
        // 'max': 'var(--container-max)',
      },

      /* ── Z-INDEX ────────────────────────────────────────── */
      zIndex: {
        below:    'var(--z-below)',
        base:     'var(--z-base)',
        raised:   'var(--z-raised)',
        dropdown: 'var(--z-dropdown)',
        sticky:   'var(--z-sticky)',
        overlay:  'var(--z-overlay)',
        modal:    'var(--z-modal)',
        toast:    'var(--z-toast)',
        tooltip:  'var(--z-tooltip)',
      },

      /* ── BACKGROUND GRADIENTS ───────────────────────────── */
      backgroundImage: {
        'gradient-brand':       'var(--gradient-brand)',
        'gradient-brand-soft':  'var(--gradient-brand-soft)',
        'gradient-accent':      'var(--gradient-accent)',
        'gradient-dark':        'var(--gradient-dark)',
        'gradient-hero':        'var(--gradient-hero)',
      },

      /* ── HEIGHTS (buttons / inputs) ─────────────────────── */
      height: {
        'btn-xs': 'var(--btn-height-xs)',
        'btn-sm': 'var(--btn-height-sm)',
        'btn-md': 'var(--btn-height-md)',
        'btn-lg': 'var(--btn-height-lg)',
        'btn-xl': 'var(--btn-height-xl)',
        'nav':    'var(--nav-height)',
      },

    }, // end extend
  },

  plugins: [],
};