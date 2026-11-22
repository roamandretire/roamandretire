// Curated list of slugs that have dedicated WebP hero images in:
// public/images/destinations/[slug].webp
const DEDICATED_DESTINATION_SLUGS = new Set<string>([
  'chiang-mai-thailand',
  'da-nang-vietnam',
]);

// Map database `region` values to fallback WebP assets in:
// public/images/fallback/[region-key].webp
function normalizeRegionKey(region: string): string {
  const key = region.trim().toLowerCase();

  if (key.includes('asia') || key.includes('southeast') || key.includes('east asia')) {
    return 'asia';
  }
  if (key.includes('europe')) {
    return 'europe';
  }
  if (
    key.includes('latin') ||
    key.includes('latam') ||
    key.includes('south america') ||
    key.includes('central america') ||
    key.includes('caribbean') ||
    key.includes('mexico')
  ) {
    return 'latam';
  }
  if (key.includes('north america') || key.includes('usa') || key.includes('canada')) {
    return 'north-america';
  }
  if (
    key.includes('middle east') ||
    key.includes('africa') ||
    key.includes('oceania') ||
    key.includes('pacific')
  ) {
    return 'global';
  }

  return 'global';
}

export function getDestinationHeroImage(slug: string, region: string): {
  src: string;
  isDedicated: boolean;
} {
  const normalizedSlug = slug.trim().toLowerCase();

  if (DEDICATED_DESTINATION_SLUGS.has(normalizedSlug)) {
    return {
      src: `/images/destinations/${normalizedSlug}.webp`,
      isDedicated: true,
    };
  }

  const fallbackKey = normalizeRegionKey(region);
  return {
    src: `/images/fallback/${fallbackKey}.webp`,
    isDedicated: false,
  };
}