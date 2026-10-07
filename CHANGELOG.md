# Changelog

All notable changes to this project are documented in this file.

## [0.1.0] - 2026-10-07

First build of the Home of Detail website, replacing the Create Next App starter.

### Added

- **Pages**
  - Home page (`/`) with hero, stats bar, services, results, reasons, process, testimonials, FAQ, location, membership and final call-to-action sections.
  - Services overview (`/services`), category pages for major and minor services (`/services/major`, `/services/minor`) and a page per service (`/services/[slug]`).
  - Gallery (`/gallery`) with per-service filtering (`/gallery/[slug]`).
  - Videos page (`/videos`) with a filterable video library that uses YouTube thumbnails.
  - Reviews (`/reviews`), FAQ (`/faq`) and Location (`/location`) pages.
  - Booking page (`/book`) with a booking form; a service can be preselected with `?service=<slug>`.
  - Custom 404 page.
- **Components**: `Header`, `Footer`, `MobileBookBar`, `BackToTop`, `BookingForm`, `BeforeAfterSlider`, `CarArt`, `VideoLibrary`, `ServiceCategoryPage`, shared page sections (`sections.tsx`), media helpers (`media.tsx`) and UI primitives such as buttons, logo, headings, stars and icons (`ui.tsx`).
- **Site configuration** (`src/lib/site.ts`): business details, contact links (phone, WhatsApp, Messenger, Facebook, Instagram, email), opening hours, service areas, stats and service data.
- **Menu configuration** (`src/lib/menu.ts`): navigation items that can be switched on or off. Pages for disabled items return a 404.
- **Theming** (`src/lib/theme.ts`): color tokens exposed as CSS variables, several theme presets and an on-page `ThemeEditor` for trying colors (controlled by `showThemeEditor`). The chosen theme is saved in the browser.
- **SEO**: page title template, description and Open Graph metadata, `AutoWash` structured data (JSON-LD), `robots.txt` and `sitemap.xml`.
- **Branding**: new favicon, app icon, Apple touch icon and `public/images/logo.jpg`.
- **Accessibility**: "Skip to content" link and a focusable main content area.
- `lucide-react` dependency for icons.

### Changed

- `layout.tsx`: replaced the Geist fonts with Inter (body) and Sora (headings), and added the site header, footer, mobile booking bar, back-to-top button and theme editor to every page.
- `globals.css`: new styling built on the theme color variables.
- `next.config.ts`: hid the Next.js dev-tools badge, set the Turbopack root and allowed images from `i.ytimg.com` for video thumbnails.

### Notes

- The Reviews and FAQ menu items are hidden (`visible: false` in `src/lib/menu.ts`), so `/reviews` and `/faq` currently return 404.
- The address and service areas in `src/lib/site.ts` are placeholders and must be replaced with real values before launch.
