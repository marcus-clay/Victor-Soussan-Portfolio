export default function CursorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        @font-face {
          font-family: 'CursorGothic';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('https://cursor.com/media/CursorGothic_Regular-s.p.05-84umc_47y9.woff2') format('woff2');
        }
        @font-face {
          font-family: 'CursorGothic';
          font-style: italic;
          font-weight: 400;
          font-display: swap;
          src: url('https://cursor.com/media/CursorGothic_Italic-s.p.0klm.ze1la4ej.woff2') format('woff2');
        }
        @font-face {
          font-family: 'CursorGothic';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url('https://cursor.com/media/CursorGothic_Bold-s.p.15hkw~ebmtjvr.woff2') format('woff2');
        }
        @font-face {
          font-family: 'CursorGothic';
          font-style: italic;
          font-weight: 700;
          font-display: swap;
          src: url('https://cursor.com/media/CursorGothic_BoldItalic-s.p.0cqzqaem~_s9y.woff2') format('woff2');
        }
        @font-face {
          font-family: 'BerkeleyMono';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('https://cursor.com/media/BerkeleyMono_Regular.p.0x~g-6.~uijej.woff2') format('woff2');
        }
        @font-face {
          font-family: 'BerkeleyMono';
          font-style: oblique;
          font-weight: 400;
          font-display: swap;
          src: url('https://cursor.com/media/BerkeleyMono_Oblique.p.0ljxuk9ar7~k_.woff2') format('woff2');
        }
      `}</style>
      <div style={{
        '--font-cursor-sans': "'CursorGothic', system-ui, sans-serif",
        '--font-cursor-mono': "'BerkeleyMono', 'Courier New', monospace",
      } as React.CSSProperties}>
        {children}
      </div>
    </>
  )
}
