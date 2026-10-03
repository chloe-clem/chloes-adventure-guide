# Adding a destination

Every destination is one Markdown file in `src/content/destinations/`. The filename becomes the page's URL, so `pompeii.md` becomes `/destinations/pompeii/`.

## The minimum

This is a complete, valid destination — it's the actual content of `src/content/destinations/pompeii.md`:

```markdown
---
name: Pompeii
country: Italy
continent: Europe
latitude: 40.7462
longitude: 14.4989
categories:
  - historical
note: An astonishingly advanced ancient city best explored slowly and with a guide.
visitLabel: Study abroad
---

Pompeii was one of my favorite trips. Going outside the crowded summer season made it easier to spend the entire day exploring.

I highly recommend a guided tour because the guides explain how the city worked and what the buildings used to be.
```

That's it — a real, complete page. To add a new destination, copy this shape, change the details, and write your own paragraphs below the `---`.

- **`categories`** must be slugs from `src/data/categories.ts`: `big-city`, `historical`, `nature`, `small-town`, `beach`. A destination can have more than one, and appears on each matching category page. The build fails with a clear error if one is misspelled.
- **`note`** is the one-line description shown on category pages and in the homepage destination list.
- **`visitLabel`** is optional — a short tag like "Study abroad" or "Day trip" shown next to the country name. Leave it out if it doesn't add anything.
- The text below the `---` is the destination's story. Write as many paragraphs as you want, separated by a blank line.

## Adding photos

Drop images in `public/photos/<slug>/` (e.g. `public/photos/pompeii/`), then reference them in the frontmatter:

```yaml
featuredImage: photos/pompeii/img_1234.jpg
```

`featuredImage` becomes the destination page's hero photo if you don't set a separate `heroImage`. If neither is set, the page uses a text-only hero instead. That's a normal, finished-looking state, not a placeholder.

## Everything else is optional, and only shows up if you fill it in

The destination page shows a section only when there's content for it — there's no toggle to remember to flip. Leiden ([src/content/destinations/leiden.md](../src/content/destinations/leiden.md)) is the example that uses every field:

| Field | What it does |
|---|---|
| `heroImage` / `heroImageAlt` | A hero photo distinct from `featuredImage`, if you want one. |
| `characteristics` | Short tags shown under the hero title (e.g. "Walkable", "Bike-friendly"). |
| `storyHeading` | Heading above the story text. Defaults to "The Story". |
| `pullQuote` | A short quote featured next to the story. |
| `storyImage` / `storyImageAlt` | A second photo shown alongside the story text. |
| `recommendationsHeading` | Heading above the recommendations grid. Defaults to "Choose what matters to you." |
| `recommendations` | A list of places — see below. Adding even one turns on the recommendations grid, the interest filters, and the map, all at once. |
| `stories` | A list of photos with short captions for the "Stories left untold" gallery. Adding one turns the gallery on. |

### Adding a recommendation

Each entry under `recommendations:` looks like this:

```yaml
recommendations:
  - id: some-unique-slug
    name: Restaurant Waag
    interests:
      - food
    shortDescription: Enjoy a meal inside one of Leiden's most historic landmark buildings.
    whyIRecommendIt: Ask for a table by the window.
    address: Aalmarkt 21, 2311 EC Leiden, Netherlands
    latitude: 52.1593318
    longitude: 4.4904674
    website: https://waagleiden.nl/
    images:
      - src: photos/leiden/some-photo.jpg
        alt: Description of the photo.
      - src: photos/leiden/some-other-photo.jpg
        alt: Description of the second photo.
```

Only `id`, `name`, `interests`, and `shortDescription` are required. `interests` must come from the fixed list in [src/lib/recommendations.ts](../src/lib/recommendations.ts) (`food`, `cafes`, `activities`, `nature`, `museums`, `shopping`, `day-trips`, `nightlife`, `hidden-gems`) — the build will fail with a clear error if you typo one, which is deliberate.

`images` is a list, so add as many photos as you have, or leave it out entirely — that's a normal, finished-looking state, not a placeholder. A recommendation with more than one photo gets a small count badge on its card (e.g. "1 / 3"); clicking the card opens all of them in a gallery with next/previous buttons, alongside the full description and a "Show on map" button.

A recommendation only gets a pin on the map once **both** `latitude` and `longitude` are set. There's no separate "verified" checkbox to remember — if the coordinates are there, it's trusted and plotted.

## Checking your work

```bash
npm run dev
```

Then open `http://localhost:4321/chloes-adventure-guide/destinations/<your-slug>/` and look at it. `npm run build` will fail loudly (with a specific field and reason) if a required field is missing or an interest is misspelled, so a clean build is a real signal the content is valid — not just that the file exists.
