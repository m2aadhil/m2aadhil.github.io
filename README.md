# aadhil.me — Portfolio v6

Plain HTML, CSS and JavaScript. No build step, no frameworks, no external fonts, no tracking.

## Preview

    python3 -m http.server 8080   # then open http://localhost:8080

## Deploy (GitHub Pages, same as the old site)

1. Replace the contents of the `m2aadhil.github.io` repo with this folder.
2. `CNAME` already contains `aadhil.me`, so the custom domain keeps working.
3. Delete the old `forms/contact.php` and PHPMailer vendor folder; GitHub Pages can't run PHP anyway.

Works on any static host (Cloudflare Pages, Netlify, nginx) too.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page |
| `styles.css` | Styles, ordered to match page sections, responsive rules at the bottom |
| `script.js` | Mobile nav, scroll-spy, reveal-on-scroll, project filter, screenshot lightbox, copy-email |
| `assets/og-image.png` | 1200×630 link-preview image (LinkedIn, Slack, WhatsApp…) |
| `assets/apple-touch-icon.png` | iOS home-screen icon |
| `assets/archive/*.webp` | Earlier-work screenshots (converted from PNG, ~95% smaller) |
| `robots.txt`, `sitemap.xml`, `CNAME` | SEO and hosting |

## Changes from v5

- Removed internal/disclaimer copy that leaked onto the page ("ACTUAL APPLICATION SCREENSHOT", "NOT LIBRARY API", etc.).
- Added CV numbers to the experience section.
- Restored testimonials and the Fortude Certificate of Excellence from the old site.
- numeric-formatter now shows real usage of the library instead of made-up code.
- Engineering card shows real platform outcomes instead of a placeholder diagram.
- Earlier work: click-to-enlarge lightbox, YouTube demo links for both games.
- Archive images 4.6 MB → ~210 KB; added Open Graph/Twitter cards, scroll-spy nav, reveal animations (respects reduced motion).
- Stylesheet rewritten readable, dead rules from v3/v4 removed.
- Earlier-work cards: action row on every card (screenshot, Google Play / demo / source where public, "private" label where not).
- All text now meets WCAG AA contrast; minimum text size raised to ~11px.
- Lab icons replaced with consistent SVG line icons.
