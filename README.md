# Chloe's Travel Atlas, V4.1

Astro foundation configured for GitHub Pages at:

`https://chloe-clem.github.io/travel-atlas/`

## Included
- Approved V3.9 homepage and Earth intro
- 18 destinations recovered from the original blog text
- Six feeling collections assigned from Chloe's descriptions
- Source-derived story text on every destination page
- Leiden's existing full visual prototype
- Photo-ready generated pages for the remaining destinations
- GitHub Actions deployment workflow

## Run locally
```bash
npm install
npm run dev
```

The interactive map uses MapLibre GL JS with OpenFreeMap and does not require an account, API key, token, `.env` file, or repository secret.

## Publish
1. Create the repository `travel-atlas` under `chloe-clem`.
2. Push this project to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. The included workflow will build and publish the site.

## Next content step
Create one photo folder per destination under `public/photos/<slug>/`. The next implementation pass will connect those images to hero sections, galleries, map pins, recommendations, and scorecards.
