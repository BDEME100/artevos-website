# ArtEvos Interiors — artevosinfra.in

Static website for ArtEvos Interiors, an interior design studio in Bhubaneswar.

This repository holds **only the public website** and is deployed as-is on
Cloudflare Pages (framework: None, build command: empty, output directory: `/`).

- `index.html` and the page folders (`services/`, `contact/`, …) — the pages
- `assets/` — CSS, JS, fonts and images
- `_headers`, `_redirects` — Cloudflare security headers, caching and redirects
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` — SEO and install metadata

The pages are generated. Edit them in the separate `site-source` folder
(`build.py` + `src/`), run `python build.py`, then commit and push this folder.
