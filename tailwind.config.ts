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
  // Avoid resetting the rest of the site (brutalist global CSS in main.css)
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        paper: '#f6f1e4',
        'paper-2': '#ece4cf',
        hot: '#ff3d00',
        acid: '#c8ff00',
        sky: '#2563ff',
        lemon: '#ffd60a',
        grape: '#6c2bd9',
        pink: '#ff2e93'
      },
      fontFamily: {
        display: ['Archivo Black', 'Helvetica Neue', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['Space Mono', 'ui-monospace', 'monospace']
      },
      maxWidth: {
        measure: '65ch'
      },
      typography: {
        blog: {
          css: {
            '--tw-prose-body': '#0a0a0a',
            '--tw-prose-headings': '#0a0a0a',
            '--tw-prose-bold': '#0a0a0a',
            '--tw-prose-bullets': '#ff3d00',
            '--tw-prose-counters': '#0a0a0a',
            '--tw-prose-quotes': '#0a0a0a',
            '--tw-prose-quote-borders': '#0a0a0a',
            '--tw-prose-captions': 'rgba(10,10,10,0.65)',
            '--tw-prose-links': '#2563ff',
            '--tw-prose-code': '#0a0a0a',
            '--tw-prose-th-borders': '#0a0a0a',
            '--tw-prose-td-borders': 'rgba(10,10,10,0.35)',
            maxWidth: 'none',
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: '1.0625rem',
            lineHeight: '1.65',
            '> :first-child': { marginTop: '0' },
            h2: {
              fontFamily: "'Archivo Black', 'Helvetica Neue', sans-serif",
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: '1.05',
              marginTop: '2.25rem',
              marginBottom: '0.75rem',
              paddingBottom: '0.35rem',
              borderBottom: '3px solid #0a0a0a'
            },
            h3: {
              fontFamily: "'Archivo Black', 'Helvetica Neue', sans-serif",
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              fontSize: '1.25rem',
              lineHeight: '1.15',
              marginTop: '1.75rem',
              marginBottom: '0.5rem'
            },
            h4: {
              fontFamily: "'Space Mono', ui-monospace, monospace",
              fontWeight: '700',
              textTransform: 'uppercase',
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
              color: '#0a0a0a'
            },
            blockquote: {
              borderLeftWidth: '5px',
              borderLeftColor: '#0a0a0a',
              backgroundColor: '#ece4cf',
              paddingTop: '0.875rem',
              paddingBottom: '0.875rem',
              paddingRight: '1rem',
              fontStyle: 'italic',
              fontWeight: '400',
              boxShadow: '6px 6px 0 0 #0a0a0a'
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            hr: {
              borderColor: '#0a0a0a',
              borderTopWidth: '3px',
              marginTop: '2.5rem',
              marginBottom: '2.5rem'
            },
            img: {
              borderWidth: '3px',
              borderColor: '#0a0a0a',
              borderRadius: '0',
              boxShadow: '6px 6px 0 0 #0a0a0a',
              marginTop: '1.5rem',
              marginBottom: '1.5rem'
            },
            code: {
              fontFamily: "'Space Mono', ui-monospace, monospace",
              fontSize: '0.88em',
              fontWeight: '500',
              backgroundColor: '#ece4cf',
              borderWidth: '2px',
              borderColor: '#0a0a0a',
              padding: '0.15em 0.35em',
              borderRadius: '0'
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              fontFamily: "'Space Mono', ui-monospace, monospace",
              fontSize: '0.88rem',
              lineHeight: '1.55',
              backgroundColor: '#0a0a0a',
              color: '#c8ff00',
              borderWidth: '3px',
              borderColor: '#0a0a0a',
              borderRadius: '0',
              boxShadow: '6px 6px 0 0 #ff3d00',
              padding: '1rem 1.15rem'
            },
            'pre code': {
              fontFamily: 'inherit',
              fontWeight: '400',
              backgroundColor: 'transparent',
              borderWidth: '0',
              padding: '0',
              color: 'inherit'
            },
            ul: {
              fontFamily: "'Space Mono', ui-monospace, monospace",
              fontSize: '0.92em'
            },
            ol: {
              fontFamily: "'Space Mono', ui-monospace, monospace",
              fontSize: '0.92em'
            },
            table: {
              fontFamily: "'Space Mono', ui-monospace, monospace",
              fontSize: '0.85em',
              borderCollapse: 'collapse',
              borderWidth: '3px',
              borderColor: '#0a0a0a'
            },
            thead: {
              borderBottomWidth: '3px',
              borderBottomColor: '#0a0a0a',
              backgroundColor: '#ece4cf',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            },
            th: {
              padding: '0.5rem 0.75rem',
              borderWidth: '2px',
              borderColor: '#0a0a0a'
            },
            td: {
              padding: '0.5rem 0.75rem',
              borderWidth: '1px',
              borderColor: 'rgba(10,10,10,0.25)'
            }
          }
        }
      }
    }
  },
  plugins: [typography]
} satisfies Config
