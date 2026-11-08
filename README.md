# Mentix Tools

Thirty free browser-based utilities for text, development, images, design, PDFs, conversions, and everyday calculations. Built with **Next.js 15 App Router, TypeScript, Tailwind CSS, DM Sans, Public Sans, and Lucide**. Exported as a static website: no processing APIs, database, account system, or uploaded files.

## Project structure

```text
app/
  layout.tsx                       Shared navigation, footer, fonts, motion
  globals.css                      Midnight / porcelain / soft-citron design system
  page.tsx                         Homepage with working interactive preview
  tools/page.tsx                   Searchable, category-filtered A–Z directory
  tools/[slug]/page.tsx             All 30 statically generated utility pages
  tools/category/[category]/page.tsx
  about/page.tsx
  contact/page.tsx
  privacy-policy/page.tsx
  terms/page.tsx
  sitemap.ts
  robots.ts
  og/[image]/route.tsx              43 PNG sharing images, generated at build time
  not-found.tsx
components/
  tools/<slug>.tsx                 One working implementation per utility
  tools/ToolRenderer.tsx           Individual lazy imports and recovery boundary
  ui/index.tsx                     Accessible controls, dropzone, results, copy/download
  seo/JsonLd.tsx
  ads/AdSlot.tsx
  ads/AffiliateCard.tsx
  LiveWorkbench.tsx                Real text, JSON, and color previews
  Motion.tsx                       Native scroll reveals, progress, back-to-top
  Ticker.tsx                       Scrolling strip with pause/resume control
  ToolCard.tsx
  ToolDirectory.tsx
  ToolSearch.tsx
  ToolIcon.tsx
  ContactForm.tsx
  Consent.tsx
  PrivacySettings.tsx
lib/
  tools.ts                         Single typed registry and editorial content
  site.ts                          Site identity, domain and metadata builder
  calculations.ts                  Tested text, date, unit and loan calculations
  image.ts                         Local canvas processing and object URL lifecycle
  pdf.ts                           PDF validation and locally generated examples
  regex.worker.ts                  Terminable regex worker
  analytics.ts                     Content-free usage event adapter
public/
  favicon.svg
  pdf.worker.min.mjs               Same-origin PDF.js worker
  _headers                         Static hosting security headers
scripts/
  copy-assets.mjs                  Synchronizes PDF.js worker before build
  registry.py                      Original editorial bootstrap; not the source of truth
tests/
  calculations.test.ts
  tools.spec.ts
  design.spec.ts
next.config.ts
postcss.config.js
tailwind.config.ts
tsconfig.json
playwright.config.ts
ecosystem.config.cjs
netlify.toml
package.json
package-lock.json
.env.example
```

## Setup

Use Node.js 22 LTS and npm. Build on Linux or Linux CI for consistency.

```bash
npm install
cp .env.example .env.local
# Configure the actual domain and operator details.
npm run dev
```

Development listens on `http://localhost:3000`. For the complete production static export:

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

`npm run build` exports everything to `out/`. No Next server, OpenNext adapter, Cloudflare Worker runtime, or server API is required. `next/og` runs at **build time**, not as a dynamic deployed endpoint. next/font fetches fonts during the build and self-hosts them in the output. The initial font build needs network access.

In the project sandbox, the static preview runs under PM2 using `ecosystem.config.cjs` after a successful build. Run `pm2 logs webapp --nostream` to inspect logs. Do not use an unmanaged foreground server for the sandbox preview.

## Configuration

All `NEXT_PUBLIC_*` values are embedded at build time and are public. Rebuild after changing them. Never put secrets into these variables.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Set before launch:** absolute canonical origin. Defaults to reserved `https://example.com`, not a real production domain. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | **Set before launch:** actual support mailbox. Defaults to an explicitly marked example. |
| `NEXT_PUBLIC_LEGAL_ENTITY` | **Set before launch:** actual operator name. Privacy policy retains a clearly marked placeholder until configured. |
| `NEXT_PUBLIC_GA_ID` | Optional GA4 measurement ID. Blank disables GA4. |
| `NEXT_PUBLIC_ADSENSE_ID` | Optional AdSense publisher ID. Blank disables its script. |
| `NEXT_PUBLIC_ADS_ENABLED` | Must equal `true` to render configured ad areas. Default false. |
| `NEXT_PUBLIC_AD_SLOT_1`, `NEXT_PUBLIC_AD_SLOT_2` | Actual slot IDs; blank slots render nothing. At most two per utility page, never above the interface. |
| `NEXT_PUBLIC_AFFILIATE_URL` | Optional disclosed affiliate destination; shown only on PDF/image pages. |
| `NEXT_PUBLIC_AFFILIATE_TITLE`, `NEXT_PUBLIC_AFFILIATE_DESCRIPTION` | Affiliate copy. |
| `NEXT_TELEMETRY_DISABLED=1` | Optional Next.js build telemetry opt-out. |

The legal policy and terms are templates requiring operator review. Do not publish the example identity or mailbox as real contact details.

## Completed utilities and paths

Every utility is available at `/tools/<slug>/` and opens with a sample input. Image/PDF samples are generated locally in the browser. Enter your own values or select a file, adjust settings, then copy or download the result.

| Category | Exact slug | Main behavior |
| --- | --- | --- |
| Text | `word-counter` | Words, Unicode characters, whitespace-excluded count, sentences, paragraphs, reading at 238 wpm, speaking at 130 wpm |
| Text | `case-converter` | Upper/lower/title/sentence/camel/snake/kebab case |
| Text | `lorem-ipsum-generator` | Words/sentences/paragraphs with optional Lorem ipsum prefix |
| Text | `readability-score` | Flesch Reading Ease and Flesch-Kincaid, English syllable-rule algorithm |
| Text | `slug-generator` | Case, stop words, maximum length, separators, accent normalization |
| Text | `markdown-preview` | marked + DOMPurify split preview and sanitized HTML copy |
| Text | `regex-tester` | g/i/m/s/u, highlights/groups, five presets, worker timeout |
| Text | `meta-tag-generator` | Escaped title/meta/OG/Twitter tags, search/social previews |
| Developer | `json-formatter` | 2/4/tab indentation, minify, validate, line/column, copy/download |
| Developer | `base64-encoder-decoder` | UTF-8 encode/decode, files under 2 MB to data URI |
| Developer | `hash-generator` | MD5/SHA-1/SHA-256/SHA-512; files under 50 MB |
| Developer | `timestamp-converter` | Seconds/milliseconds, UTC/local, reverse, live clock |
| Developer | `password-generator` | 8–64 characters, groups, ambiguous-character exclusion, secure rejection sampling |
| Image | `image-compressor` | Local compression, quality, maximum width, before/after, download |
| Image | `image-resizer` | Pixels/percentage, aspect control, dimensions, PNG export |
| Image | `image-format-converter` | JPG/PNG/WebP, GIF first frame, quality, white JPEG background |
| Image | `qr-code-generator` | PNG/SVG, size, colors, correction level |
| Design | `color-picker` | HEX/RGB/HSL/approximate CMYK, shades, complement, copy |
| Design | `css-gradient-generator` | Linear/radial, angle, positioned stops, CSS output |
| PDF | `pdf-merge` | Page counts, drag or button ordering, encrypted-document warnings |
| PDF | `pdf-split` | Validated ranges, extraction, ZIP of individual pages |
| PDF | `pdf-compress` | PDF.js rasterization at 72/110/150 DPI, JPEG rebuild, size comparison |
| Converters | `unit-converter` | Length, mass, volume, area, speed, decimal/binary storage |
| Converters | `currency-converter` | Frankfurter reference rates, rate date, tab-memory cache, clear failures |
| Converters | `temperature-converter` | Celsius/Fahrenheit/Kelvin, formula, absolute-zero validation |
| Converters | `percentage-calculator` | Portion/share/change, zero-reference validation |
| Calculators | `age-calculator` | Calendar age, elapsed days, birthday countdown, weekday |
| Calculators | `bmi-calculator` | Adult metric/imperial screening with medical disclaimer |
| Calculators | `loan-emi-calculator` | Stable EMI formula, zero interest, yearly amortization, SVG chart |
| Calculators | `pomodoro-timer` | Editable 25/5 defaults, start/pause/reset, cycles, notifications/sound |

Other entry URIs:

- `/` — homepage and functioning lightweight previews
- `/tools/` — A–Z directory; optional `?q=pdf` search
- `/tools/category/{text,developer,image,design,pdf,converters,calculators}/`
- `/about/`, `/contact/`, `/privacy-policy/`, `/terms/`
- `/sitemap.xml`, `/robots.txt`
- `/og/<page-or-tool-slug>.png`

## Data architecture and privacy

The `Tool` registry in `lib/tools.ts` contains each slug, full name, description, category, keywords, icon, SEO title/description, intro, steps, 150+ words of relevant explanation, four FAQs, and three related slugs.

Tool input lives in React/browser memory only. No file processing occurs on a server. Downloads are browser-generated files; object URLs are released. Closing or refreshing the tab resets tool state. Only selected currency codes go to Frankfurter; entered amounts are calculated locally.

Optional analytics/ad scripts add third-party requests only after affirmative consent. The `mentix-tools-consent` localStorage key stores the preference, not utility input. GA events `tool_used` and `file_processed` include a utility slug only, never text, names, contents, passwords, or entered amounts. Fonts and PDF/regex workers are same-origin; Markdown previews block remote media and style-bearing attributes. Social-image previews do not fetch arbitrary input URLs.

AdSense publishers may need a certified CMP and region-specific consent flows before enabling advertisements. The included small preference banner is **not** a certified Google CMP. Configure legal/retention/publisher policies before monetizing.

## Design and motion

The November 2026 refresh replaces the serif/terracotta look with **midnight `#142326`, porcelain `#F7F8F4`, and soft citron `#D4E8AF`**, with DM Sans headings and Public Sans body.

- Live text counting, JSON formatting, and color preview on the homepage.
- Distinct CSS/Lucide artwork on featured cards; no stock photos or external image requests.
- Native IntersectionObserver and Web Animations API produce short, one-time scroll reveals. There is no animation framework or scroll-hijacking library.
- A passive scroll listener with requestAnimationFrame updates a transform-only progress bar and back-to-top control without React render loops.
- A scrolling editorial strip has pause/resume controls and pauses on hover/focus.
- All motion respects `prefers-reduced-motion`. Content remains visible and functional without animation initialization.
- Sticky navigation, touch-friendly mobile menu, responsive workspaces, visible focus rings, labeled inputs, polite results, alert errors, and reduced-motion support.

All utilities and heavy libraries are dynamically imported. The home page does not load PDF.js, PDF-lib, image compression, QR, CryptoJS, or Markdown libraries. Do not interpret a successful static build as a guarantee of field Core Web Vitals. Measure the final published domain with representative devices and real traffic, especially if adding advertisements.

## Per-page SEO and Google indexing

Every public content page has a unique title and description, canonical URL, Open Graph/Twitter metadata, and a generated sharing image. All 30 utility pages also have keywords, SoftwareApplication, FAQPage, BreadcrumbList, visible FAQs, instructions, editorial content, and internal related links. Sitemap/robots are generated from the registry. `generateStaticParams` exports all utility/category/image routes.

A few metadata names are shortened to honor the under-60-character title budget; H1s retain the exact full names. FAQ markup does not guarantee Google FAQ rich results.

**Before requesting Google indexing:**

1. Configure `NEXT_PUBLIC_SITE_URL` with the actual domain and rebuild.
2. Publish the static output to a permanent public host.
3. Verify domain ownership in Google Search Console.
4. Submit `https://YOUR_DOMAIN/sitemap.xml` and inspect representative URLs.
5. Allow time for crawling. Search engines decide inclusion and ranking; neither is guaranteed.

The reserved example.com canonical and temporary sandbox preview are not a production SEO launch.

## Tests

```bash
npm test
npm run typecheck
npm run build
npm run preview                       # Separate terminal, or PM2 in sandbox
npx playwright install --with-deps chromium
npm run test:e2e
npm audit
```

`tests/calculations.test.ts` covers registry integrity, title/description budgets, editorial length, links, dates, syllables/formulas, unit references, PDF ranges, and EMI edge cases.

The 59-test Playwright suite covers all 30 utilities at 360px for exceptions/overflow; actual outputs (PDF page counts, ZIP entries, image signatures, QR SVG); UTF-8 roundtrips; known hashes; invalid patterns and regex timeout; calculator results; currency success/failure/memory cache; live homepage interactions; pause/reduced-motion behavior; mobile navigation; metadata across all 43 public content pages; and representative WCAG AA audits. Currency network tests are mocked for determinism, not a claim of live provider uptime. Screenshots/output are in ignored `test-results/`.

## Add a utility

1. Add a complete `Tool` entry to `lib/tools.ts`, including real instructions, unique metadata/content, FAQs, and three valid related slugs.
2. Create `components/tools/<slug>.tsx` with typed client-side logic, a sample, labels, graceful errors, and copy/download output.
3. Register its dynamic import in `components/tools/ToolRenderer.tsx`. Keep heavy imports inside its component.
4. Register a new Lucide icon in `components/ToolIcon.tsx` if necessary.
5. Add functional/invalid-input tests and update the original 30-item count assertions and count labels if expanding the collection.
6. Rebuild; routes, sitemap, category lists, and sharing images follow the registry.

`lib/tools.ts` is authoritative. `scripts/registry.py` is the initial bootstrap, not a required build step; rerunning it replaces hand-edited content.

## Deployment

### Netlify

Connect the GitHub repository, choose a **static** build with Node 22, `npm run build`, and publish directory `out`. `netlify.toml` includes these settings. Configure the real domain, support mailbox, and entity before the build. Do not enable an SSR adapter: there is no Next runtime to deploy. Verify deep routes, fonts, sharing PNGs, sitemap/canonicals, PDF worker MIME type, and 404 behavior.

### Cloudflare Pages

Choose a static/None preset, Node 22 on Linux, build command `npm run build`, output `out`. No D1, KV, R2, or server secrets are needed. `_headers` is included in the output. A manually authorized deployment to your own Cloudflare account can publish `out` with Wrangler; keep deployment credentials out of source/client code.

The in-platform one-click pipeline targets the default Hono stack, not a Next.js project. This project intentionally preserves the requested Next.js stack and uses a separately managed static preview. A production deployment destination must be selected and authorized separately.

## Links and launch status

- Repository: https://github.com/timekikami-design/Mentix-Tools
- Local preview: http://localhost:3000
- Temporary sandbox preview: supplied in the delivery message.
- Production hosting: not published in this implementation session.
- Storage services: none. All document/image/text processing is local browser work.

### Required before public launch

Configure the permanent domain, real contact mailbox, and legal operator; review privacy/terms; verify field performance and target-browser behavior; set up Search Console; and meet applicable consent/publisher obligations before enabling optional monetization.

### Deliberate limitations

- English syllables/readability are algorithmic estimates, especially for names or irregular words.
- PDF raster compression removes selectable text, links, forms, signatures, and accessibility structure, and can enlarge text-only files. It is not OCR or archival preservation. Encrypted PDFs are rejected. Merging may not preserve bookmarks, forms, or document structure.
- Images are limited to 50 MB / 40 megapixels. Metadata may be removed; GIF export is one frame. PNG quality is not lossy. Source/output size varies.
- Base64 file inputs are below 2 MB; hashes below 50 MB; individual PDFs at most 50 MB. Browser memory remains a practical limit.
- MD5/SHA-1 are legacy compatibility checksums, not new security recommendations. CryptoJS is included only for MD5 compatibility and is no longer actively maintained. Plain fast hashes are not password storage algorithms.
- Currency quotes are reference data, not executable bank/trading rates. Units use US volume and explicit decimal/binary storage. CMYK is approximate, not a print proof.
- BMI is adult screening only, not diagnosis. Age uses February 28 for leap birthdays in non-leap years. Loan estimates exclude fees/taxes/insurance. These calculators are not professional advice.
- Pomodoro phases wait for manual start; a timestamp deadline handles background throttling. Closing the tab clears state.
