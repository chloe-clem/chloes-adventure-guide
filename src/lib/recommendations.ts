export const interestTaxonomy = [
  'food',
  'cafes',
  'activities',
  'nature',
  'museums',
  'shopping',
  'day-trips',
  'nightlife',
  'hidden-gems',
] as const;

export type Interest = (typeof interestTaxonomy)[number];

export const interestLabels: Record<Interest, string> = {
  food: 'Food',
  cafes: 'Cafés',
  activities: 'Activities',
  nature: 'Nature',
  museums: 'Museums',
  shopping: 'Shopping',
  'day-trips': 'Day Trips',
  nightlife: 'Nightlife',
  'hidden-gems': 'Hidden Gems',
};

export interface Recommendation {
  id: string;
  name: string;
  interests: Interest[];
  shortDescription: string;
  whyIRecommendIt: string;
  address: string;
  latitude?: number;
  longitude?: number;
  priceLevel: string;
  website: string;
  instagram?: string;
  image: string;
  imageAlt: string;
}

export const getAvailableInterests = (recommendations: Recommendation[]) =>
  interestTaxonomy.filter((interest) =>
    recommendations.some((recommendation) => recommendation.interests.includes(interest)),
  );

// A recommendation is plotted on the map once it has real coordinates. There's
// no separate "verified" flag: every recommendation in content that includes
// latitude/longitude was placed there deliberately, so presence is trust.
export const hasCoordinates = (
  recommendation: Recommendation,
): recommendation is Recommendation & { latitude: number; longitude: number } =>
  typeof recommendation.latitude === 'number' &&
  Number.isFinite(recommendation.latitude) &&
  recommendation.latitude >= -90 &&
  recommendation.latitude <= 90 &&
  typeof recommendation.longitude === 'number' &&
  Number.isFinite(recommendation.longitude) &&
  recommendation.longitude >= -180 &&
  recommendation.longitude <= 180;

export const getExternalMapLinks = (recommendation: Recommendation) => {
  if (!hasCoordinates(recommendation)) return null;

  const label = recommendation.name;
  const coordinates = `${recommendation.latitude},${recommendation.longitude}`;

  return {
    google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${label} ${coordinates}`)}`,
    apple: `https://maps.apple.com/?ll=${encodeURIComponent(coordinates)}&q=${encodeURIComponent(label)}`,
  };
};
