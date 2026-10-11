import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './content/**/*.md'
  ],
  // Avoid resetting the rest of the site (shared design tokens in main.css)
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        ink: '#080808',
        line: '#bbb2a3',
        paper: '#ebe4d8',
        'paper-2': '#ded6c8',
        hot: '#ff3d00',
        acid: '#c8ff00',
        sky: '#2563ff',
        lemon: '#ffd60a',
        grape: '#6c2bd9',
        pink: '#ff2e93'
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        serif: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace']
      },
      maxWidth: {
        measure: '65ch'
      },
      typography: {
        blog: {
          css: {
            '--tw-prose-body': '#080808',
            '--tw-prose-headings': '#080808',
            '--tw-prose-bold': '#080808',
            '--tw-prose-bullets': '#ff3d00',
            '--tw-prose-counters': '#080808',
            '--tw-prose-quotes': '#080808',
            '--tw-prose-quote-borders': '#080808',
            '--tw-prose-captions': '#565149',
            '--tw-prose-links': '#2563ff',
            '--tw-prose-code': '#080808',
            '--tw-prose-th-borders': '#080808',
            '--tw-prose-td-borders': '#bbb2a3',
            maxWidth: 'none',
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: '1.0625rem',
            lineHeight: '1.65',
            '> :first-child': { marginTop: '0' },
            h2: {
              fontFamily: "'Anton', Impact, sans-serif",
              fontWeight: '500',
              textTransform: 'none',
              letterSpacing: '-0.02em',
              lineHeight: '1.05',
              marginTop: '2.25rem',
              marginBottom: '0.75rem',
              paddingBottom: '0.35rem',
              borderBottom: '1px solid #bbb2a3'
            },
            h3: {
              fontFamily: "'Anton', Impact, sans-serif",
              fontWeight: '500',
              textTransform: 'none',
              letterSpacing: '-0.01em',
              fontSize: '1.25rem',
              lineHeight: '1.15',
              marginTop: '1.75rem',
              marginBottom: '0.5rem'
            },
            h4: {
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontWeight: '700',
              textTransform: 'none',
              letterSpacing: '0.12em',
              fontSize: '0.8rem',
              marginTop: '1.5rem',
              marginBottom: '0.5rem'
            },
            a: {
              fontWeight: '700',
              textDecoration: 'underline',
              textDecorationThickness: '2px',
              textUnderlineOffset: '4px'
            },
            'a:hover': {
              color: '#ff3d00'
            },
            strong: {
              fontWeight: '700',
              color: '#080808'
            },
            blockquote: {
              borderLeftWidth: '5px',
              borderLeftColor: '#080808',
              backgroundColor: '#ded6c8',
              paddingTop: '0.875rem',
              paddingBottom: '0.875rem',
              paddingRight: '1rem',
              fontStyle: 'italic',
              fontWeight: '500',
              boxShadow: 'none'
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            hr: {
              borderColor: '#080808',
              borderTopWidth: '3px',
              marginTop: '2.5rem',
              marginBottom: '2.5rem'
            },
            img: {
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderWidth: '1px',
              borderColor: '#080808',
              borderRadius: '0',
              boxShadow: 'none',
              marginTop: '1.5rem',
              marginBottom: '1.5rem'
            },
            code: {
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: '0.88em',
              fontWeight: '500',
              backgroundColor: '#ded6c8',
              borderWidth: '1px',
              borderColor: '#080808',
              padding: '0.15em 0.35em',
              borderRadius: '0'
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: '0.88rem',
              lineHeight: '1.55',
              backgroundColor: '#0b0e09',
              color: '#c8ff00',
              borderWidth: '1px',
              borderColor: '#080808',
              borderRadius: '0',
              boxShadow: 'none',
              padding: '1rem 1.15rem'
            },
            'pre code': {
              fontFamily: 'inherit',
              fontWeight: '500',
              backgroundColor: 'transparent',
              borderWidth: '0',
              padding: '0',
              color: 'inherit'
            },
            ul: {
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: '0.92em'
            },
            ol: {
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: '0.92em'
            },
            table: {
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: '0.85em',
              borderCollapse: 'collapse',
              borderWidth: '1px',
              borderColor: '#080808'
            },
            thead: {
              borderBottomWidth: '3px',
              borderBottomColor: '#080808',
              backgroundColor: '#ded6c8',
              fontWeight: '700',
              textTransform: 'none',
              letterSpacing: '0.06em'
            },
            th: {
              padding: '0.5rem 0.75rem',
              borderWidth: '1px',
              borderColor: '#080808'
            },
            td: {
              padding: '0.5rem 0.75rem',
              borderWidth: '1px',
              borderColor: '#bbb2a3'
            }
          }
        }
      }
    }
  },
  plugins: [typography]
} satisfies Config
