# DRobbMedia Website

Premium React website for DRobbMedia sports, events, wedding, portrait, and content photography.

## Replace Images

All replaceable image paths live in:

```text
src/data.js
```

Update these arrays when final photography is ready:

- `heroSlides`
- `portfolioCategories`
- `galleryImages`

Recommended workflow:

1. Add final images to `assets/photos` or a new `images` folder.
2. Replace the `src` values in `src/data.js`.
3. Keep the same `category` values for filters: `Sport`, `Weddings`, `Events`, `Portraits`.

## Update Business Details

Contact placeholders live in `src/data.js` under `contactLinks`.

The enquiry form currently uses:

```text
mailto:hello@drobbmedia.com
```

Replace that in `src/main.js` if you want to connect Formspree, Netlify Forms, a CRM, or a custom backend later.

## Local Preview

This machine does not currently have Node/npm installed, so the site can be previewed as a static app:

```bash
ruby -run -e httpd . -p 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

When Node is installed, use the included scripts:

```bash
npm install
npm run dev
npm run build
```

Last deployment trigger: 2026-06-23 16:16 AEST.
