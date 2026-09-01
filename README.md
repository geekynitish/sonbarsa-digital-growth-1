# SonBarsa — AI, ML & Digital Growth Website

The official  website for **SonBarsa** — an AI &amp; Machine Learning company delivering generative AI, LLM, computer vision, predictive analytics, cloud, web, mobile, and digital marketing solutions since 2008.

**Live site:** [https://sonbarsa.com](https://sonbarsa.com)

Developed by **[SonBarsa](https://sonbarsa.com)**.

## Tech Stack

- **[Vite](https://vitejs.dev/)** — build tool and dev server
- **[React 18](https://react.dev/)** + **TypeScript** — UI and type safety
- **[React Router](https://reactrouter.com/)** — client-side routing, with route-based code splitting
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** + **[Radix UI](https://www.radix-ui.com/)** — accessible component primitives
- **[react-helmet-async](https://github.com/staylor/react-helmet-async)** — per-page SEO metadata
- **[react-markdown](https://github.com/remarkjs/react-markdown)** — blog article rendering
- **[Lucide](https://lucide.dev/)** — icons

## Getting Started

Requires Node.js and npm.

```sh
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Type-check
npx tsc --noEmit -p tsconfig.app.json

# Production build (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

## Project Structure

```
src/
  components/
    home/       # Homepage-only sections (Hero, Services, Team, etc.)
    layout/     # Navbar, Footer
    ui/         # shadcn/ui primitives
  data/         # Static content (blog articles, tech stack list)
  hooks/        # Shared React hooks
  pages/        # Route-level page components
public/
  robots.txt
  sitemap.xml
  _redirects    # SPA fallback for Cloudflare Pages / Netlify
vercel.json     # SPA fallback for Vercel
```

## SEO

- Every route sets its own `<title>`, meta description, canonical URL, Open Graph, and Twitter Card tags via `react-helmet-async`.
- `public/sitemap.xml` and `public/robots.txt` are kept in sync with all routes (pages, service detail pages, blog articles).
- The 404 page is explicitly marked `noindex` so it never gets indexed.
- Since this is a client-rendered single-page app, the hosting platform **must** rewrite all paths to `index.html` (already configured for Vercel via `vercel.json`, and for Cloudflare Pages / Netlify via `public/_redirects`) — otherwise deep links like `/about` or `/services/ai-ml` will 404.

## Deployment

The project deploys as a static site (`npm run build` → `dist/`). It's currently configured for **Vercel** (auto-detected Vite project, routing handled by `vercel.json`). To deploy elsewhere, run the build and serve the `dist/` folder with SPA fallback enabled.

## License

© SonBarsa. All rights reserved @2026.
