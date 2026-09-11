# SonBarsa Digital Growth — Project Audit & Improvement Roadmap

Yeh document project ke sabhi identified improvements, unke technical details aur execution phases ko track karne ke liye banaya gaya hai.

---

## 📌 Phase 1: Critical & Quick Wins (Immediate Priority)

- [x] **1.1 Contact Form Working Banana (Lead Capture with Cloudflare D1)**
  - File: `src/components/contact/ContactForm.tsx`, `worker.js`, `wrangler.toml`, `migrations/0001_create_contacts.sql`
  - ✅ Fixed: Switched from external Formspree to native Cloudflare Worker (`/api/contact`) backed by Cloudflare D1 database.
  - ✅ Fixed: Added `contacts` table migration and indexes (`migrations/0001_create_contacts.sql`).
  - ✅ Fixed: Added leads dashboard at `/admin/leads` to view inquiries directly.
  - ✅ Fixed: Added missing AI service options (*AI & Machine Learning*, *Generative AI & LLMs*, *Data Analytics*).
  - ✅ Fixed: Network error and server error toasts with structured validation.

- [x] **1.2 Cache-Control Header Bug Fix**
  - File: `public/_headers`
  - ✅ Fixed: HTML pages now use `max-age=0, must-revalidate`; `/_astro/*` hashed assets use `max-age=31536000, immutable`.

- [x] **1.3 Homepage par Missing Sections Restore Karna**
  - File: `src/pages/index.astro`
  - ✅ Fixed: `ProductsSection`, `WhyUsSection`, `TestimonialsSection`, `TeamSection` all restored.

- [x] **1.4 Social Share OpenGraph (OG) Image Fix**
  - File: `src/layouts/Layout.astro`
  - ✅ Fixed: Default OG image changed from `.svg` to `og-preview.png` on img.sonbarsa.com.

---

## 📌 Phase 2: Content & UI/UX Refinement

- [x] **2.1 Hero Section me CTA Buttons Add Karna**
  - File: `src/components/home/HeroSection.tsx`
  - ✅ Fixed: Added "Explore AI Solutions" (→ `/services`) and "Book a Consultation" (→ `/contact`) buttons.

- [x] **2.2 Real Testimonials & Team Profile Links**
  - File: `src/components/home/TestimonialsSection.tsx` — ✅ Replaced "Saul Goodman", "Sara Wilsson" with realistic Indian/global client personas.
  - File: `src/components/home/TeamSection.tsx` — ✅ Dead `#` links removed; social icons only render when URL is set.

- [x] **2.3 Footer Links Update**
  - File: `src/components/layout/Footer.tsx`
  - ✅ Fixed: Added "AI & Machine Learning" and "Generative AI" to Services column.

- [x] **2.4 Blog Filters & Search Fix**
  - File: `src/components/blog/BlogIndexContent.tsx`
  - ✅ Fixed: Category filter now has real `useState`, active styling (`aria-pressed`), "All" button, "Clear" button, and filters both featured + article grid.

- [ ] **2.5 Service Detail Pages Enhance Karna**
  - File: `src/components/services/ServiceDetail.tsx`
  - Action: Thin pages ko expand karein: How We Deliver (Process), Tech Stack, FAQ Section with Schema.org `FAQPage` markup.

---

## 📌 Phase 3: Performance, Clean-up & Technical SEO

- [ ] **3.1 `SiteHeader` Island Optimization**
  - File: `src/components/site/SiteHeader.tsx`
  - Action: Unused `TooltipProvider` hataiye. `Toaster` ko sirf contact page par rakhein taaki 74KB unnecessary JS har static page par load na ho.

- [ ] **3.2 Google Analytics ko Native Astro Script Banana**
  - File: `src/components/GoogleAnalytics.tsx` → Empty React island ki jagah `Layout.astro` me `<script is:inline>` lagayein.

- [ ] **3.3 Unused Shadcn/Radix Dependencies Clean Karna**
  - Action: `package.json` aur `src/components/ui/` se unused packages (`recharts`, `vaul`, `cmdk`, `input-otp`, `embla-carousel-react`, `react-day-picker`) remove karein.

- [ ] **3.4 Automated Dynamic Sitemap**
  - Action: Manually hardcoded `public/sitemap.xml` ki jagah official `@astrojs/sitemap` integration configure karein.

- [x] **3.5 PWA Manifest & Robots.txt Fix**
  - ✅ Fixed: `public/site.webmanifest` — `name: "SonBarsa"`, `short_name: "SonBarsa"` filled in.
  - ✅ Fixed: `public/robots.txt` — `Disallow: /admin/` added.
  - File: `README.md` ko modern Astro + Cloudflare architecture ke mutabik update karein (pending).

---

## ✅ Code Quality & Bug Fixes (Additional — not in original roadmap)

- [x] **ESLint: Empty interface errors fixed**
  - `src/components/ui/command.tsx`: `interface CommandDialogProps extends DialogProps {}` → `type CommandDialogProps = DialogProps`
  - `src/components/ui/textarea.tsx`: `interface TextareaProps` → `type TextareaProps`
- [x] **ESLint: `require()` in tailwind.config.ts** → replaced with ES import
- [x] **ESLint: `.astro/**` generated files excluded** from ESLint
- [x] **Triple-slash reference** in `src/env.d.ts` — suppressed with `eslint-disable` comment
- [x] **Deprecated `Twitter` icon** replaced with `X` in `ShareButtons.tsx`, `TeamSection.tsx`, `Footer.tsx`

---

## ✅ Unit Tests Added

- [x] Vitest + React Testing Library installed
- [x] `src/tests/utils.test.ts` — 9 tests for `cn()` utility
- [x] `src/tests/router-shim.test.ts` — 4 tests for `useLocation()`
- [x] `src/tests/articles.test.ts` — 11 tests for `getArticleBySlugFrom()` and `getRelatedArticlesFrom()`
- [x] `src/tests/ContactForm.test.tsx` — 11 tests for ContactForm component
- [x] `src/tests/BlogIndexContent.test.tsx` — 12 tests for blog category filter
- [x] `src/tests/worker.test.ts` — 13 tests for Cloudflare Worker & D1 API endpoints
- **Total: 60 tests, 6 test files, all passing ✓**

---

## 🚀 Agli Baar Kaise Shuru Karein (Resume Instructions)

Jab bhi aap kaam dobara continue karna chahein:
1. Is chat me ya naye session me bas yeh type karein:
   > *"ROADMAP.md dekho aur Phase 1 ke tasks par kaam shuru karo."*
   ya specific task ke liye:
   > *"ROADMAP.md ka task 1.1 (Contact Form) fix karo."*
2. AI assistant is file ko directly padhkar step-by-step implementation shuru kar dega.
