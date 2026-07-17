# River of Life Home Healthcare Agency

Premium home healthcare website built with **Create React App**, **React 19**, **Tailwind CSS**, **Framer Motion**, and **GSAP**.

## Brand

- **Company:** River of Life Home Healthcare Agency LLC
- **Tagline:** Compassionate Care. Trusted Support.
- **Slogan:** Your Health. Our Priority.

## Tech Stack

- React 19 + React Router
- JavaScript (no TypeScript)
- Tailwind CSS
- Framer Motion & GSAP animations
- React Helmet Async (SEO)
- React Hook Form, Swiper, AOS, react-hot-toast, and more

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run build
```

## Deployment

### Vercel / Netlify
- Connect the repository — `vercel.json` and `public/_redirects` handle SPA routing.

### Traditional Hosting
- Run `npm run build` and upload the `build/` folder to your web server.
- Configure your server to serve `index.html` for all routes.

## Project Structure

```
src/
├── components/     # UI, layout, sections, popups, chatbot
├── layouts/        # Main layout wrapper
├── pages/          # Route pages (home, services, blog, etc.)
├── data/           # Services, blogs, FAQs, testimonials, team
├── constants/      # Company info, image URLs
├── seo/            # SEO component & JSON-LD schemas
├── hooks/          # Custom hooks (scroll, GSAP, localStorage)
├── routes/         # React Router configuration
└── utils/          # Helpers
```

## Form Backend

Copy `.env.example` to `.env.local` and configure **one** option:

```bash
# Formspree (recommended) — emails to riveroflifehhc@gmail.com
REACT_APP_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# OR Web3Forms
REACT_APP_WEB3FORMS_ACCESS_KEY=your_key
```

Without configuration, forms work in **dev mode** (console log + success toast).

## Brand Assets

Logo files are in `public/images/`:

| File | Use |
|------|-----|
| `logo-full.png` | Welcome modal, OG image, print |
| `logo-nav.png` | Header & footer |
| `logo-icon.png` | Mobile header, chatbot avatar |
| `favicon.ico` / `favicon-*.png` | Browser tab icons |
| `logo192.png` / `logo512.png` | PWA manifest |

Brand colors: Navy `#1B365D`, Blue `#0072CE`, Teal `#45A29E` (see `tailwind.config.js`).

## Image Assets

Placeholder images are defined in `src/constants/images.js` using Unsplash URLs. Replace with local assets in `src/assets/` when ready.

## Features

- Sticky navigation with Services & Resources mega menus
- 13 individual service detail pages
- Blog with categories, search, and article pages
- Global search, FAQ accordion, contact forms
- Simulated AI chatbot with predefined intents
- Welcome modal, cookie consent, exit intent, newsletter popup
- Floating phone/WhatsApp CTAs, reading progress, scroll-to-top
- Full SEO: meta tags, Open Graph, JSON-LD schemas, sitemap, robots.txt
- WCAG-focused accessibility patterns

## Contact

- **Email:** riveroflifehhc@gmail.com
- **Phone:** (267) 584-0431
