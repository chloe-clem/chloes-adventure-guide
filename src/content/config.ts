import { defineCollection, z } from 'astro:content';
import { interestTaxonomy } from '../lib/recommendations';

// A recommendation is a single place (café, museum, viewpoint...) Chloe
// personally recommends within a destination. Coordinates are optional
// because not every recommendation has been placed on the map yet; a
// recommendation is only plotted once both latitude and longitude are set.
const recommendation = z.object({
  id: z.string(),
  name: z.string(),
  interests: z.array(z.enum(interestTaxonomy)),
  shortDescription: z.string(),
  whyIRecommendIt: z.string().default(''),
  address: z.string().default(''),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  priceLevel: z.string().default(''),
  website: z.string().default(''),
  instagram: z.string().optional(),
  image: z.string().default(''),
  imageAlt: z.string().default(''),
});

// One photo in a destination's "stories left untold" gallery, with a short
// caption-length story rather than the long-form narrative in the page body.
const story = z.object({
  image: z.string(),
  imageAlt: z.string(),
  title: z.string(),
  story: z.string(),
});

const destinations = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    country: z.string(),
    continent: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    visitLabel: z.string().default(''),
    // One of the slugs in src/data/feelings.ts (immersed, wild, inspired, energized, relaxed).
    feelings: z.array(z.string()),
    // Short one-line description shown on feeling-collection cards and in atlas search results.
    note: z.string(),
    // Used as the feeling-collection card background, and as the page hero photo if heroImage is unset.
    featuredImage: z.string().default(''),
    heroImage: z.string().default(''),
    heroImageAlt: z.string().default(''),
    characteristics: z.array(z.string()).default([]),
    // A second photo shown alongside the story text, distinct from the hero image.
    storyImage: z.string().default(''),
    storyImageAlt: z.string().default(''),
    // Optional pull-quote featured alongside the story.
    pullQuote: z.string().optional(),
    storyHeading: z.string().default('The Story'),
    recommendationsHeading: z.string().default('Choose what matters to you.'),
    recommendations: z.array(recommendation).default([]),
    stories: z.array(story).default([]),
  }),
});

export const collections = { destinations };
