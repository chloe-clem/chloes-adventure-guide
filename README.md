# Chloe's Adventure Guide

Astro foundation configured for GitHub Pages at:

`https://chloe-clem.github.io/travel-atlas/`

## Included
- Calm editorial homepage built around a photo of Chloe
- 18 destinations, each a single Markdown file in `src/content/destinations/`
- Five feeling collections assigned from Chloe's descriptions
- Source-derived story text on every destination page
- Leiden's full destination experience (recommendations, map, photo gallery)
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

## Adding content
See [docs/adding-a-destination.md](docs/adding-a-destination.md) for how to add a destination, its photos, and its recommendations.
