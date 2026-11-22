// Curated list of slugs that have dedicated WebP hero images in:
// public/images/destinations/[slug].webp
const DEDICATED_DESTINATION_SLUGS = new Set<string>([
  'chania-crete-greece',
  'boquete-panama',
  'lagos-algarve-portugal',
  'chiang-mai-thailand',
  'lake-chapala-ajijic-mexico',
  'george-town-penang-malaysia',
  'valencia-spain',
  'panama-city-panama',
  'lisbon-portugal',
  'medellin-colombia',
  'merida-mexico',
  'cuenca-ecuador',
  'da-nang-vietnam',
  'dumaguete-philippines',
  'porto-portugal',
  'malaga-spain',
  'athens-greece',
  'san-miguel-de-allende-mexico',
  'tavira-algarve-portugal',
  'alicante-spain',
  'puerto-vallarta-mexico',
  'bangkok-thailand',
  'makati-manila-philippines',
  'abruzzo-pescara-hill-towns-italy',
  'aix-en-provence-france',
  'antalya-turkiye',
  'antigua-guatemala',
  'barcelona-spain',
  'bodrum-turkiye',
  'bonifacio-global-city-bgc-philippines',
  'bordeaux-france',
  'budapest-hungary',
  'budva-montenegro',
  'buenos-aires-argentina',
  'cadiz-jerez-spain',
  'cape-town-south-africa',
  'cascais-portugal',
  'cebu-city-philippines',
  'chiang-rai-thailand',
  'coimbra-portugal',
  'corfu-greece',
  'da-lat-vietnam',
  'dordogne-france',
  'freiburg-germany',
  'funchal-madeira-portugal',
  'galway-ireland',
  'granada-city-spain',
  'granada-nicaragua',
  'graz-austria',
  'hoi-an-vietnam',
  'ipoh-malaysia',
  'istanbul-turkiye',
  'kalamata-peloponnese-greece',
  'kotor-montenegro',
  'krakow-poland',
  'kuala-lumpur-malaysia',
  'las-terrenas-dominican-republic',
  'le-marche-urbino-coast-italy',
  'lecce-puglia-towns-italy',
  'limassol-cyprus',
  'marrakech-morocco',
  'montevideo-uruguay',
  'montpellier-languedoc-france',
  'murcia-spain',
  'nha-trang-vietnam',
  'nice-french-riviera-france',
  'oaxaca-city-mexico',
  'palermo-sicily-italy',
  'palma-mallorca-spain',
  'paphos-cyprus',
  'pattaya-jomtien-thailand',
  'phuket-thailand',
  'playa-del-carmen-mexico',
  'plovdiv-bulgaria',
  'prague-czechia',
  'rhodes-greece',
  'rome-italy',
  'rovinj-istria-croatia',
  'san-pedro-ambergris-caye-belize',
  'sanur-bali-indonesia',
  'sarande-albania',
  'siem-reap-cambodia',
  'silver-coast-caldas-da-rainha-portugal',
  'sliema-valletta-malta',
  'split-croatia',
  'syros-cyclades-greece',
  'tamarindo-guanacaste-costa-rica',
  'tbilisi-georgia',
  'tenerife-canary-islands-spain',
  'thessaloniki-greece',
  'tirana-albania',
  'torrevieja-spain',
  'turin-italy',
  'ubud-bali-indonesia',
  'umbria-perugia-spoleto-italy',
  'utrecht-netherlands',
  'vannes-brittany-france',
  'vlore-albania',
  'mazatlan-mexico',
  'tulum-mexico',
  'cozumel-mexico',
  'queretaro-mexico',
  'guanajuato-mexico',
  'puerto-escondido-mexico',
  'uvita-dominical-costa-rica',
  'lake-arenal-nuevo-arenal-costa-rica',
  'escazu-san-jose-costa-rica',
  'el-valle-de-anton-panama',
  'cartagena-colombia',
  'bogota-colombia',
  'santa-marta-colombia',
  'pereira-coffee-region-colombia',
  'quito-ecuador',
  'cotacachi-ecuador',
  'placencia-belize',
  'san-juan-del-sur-nicaragua',
  'panajachel-lake-atitlan-guatemala',
  'cabarete-sosua-dominican-republic',
  'punta-cana-bavaro-dominican-republic',
  'punta-del-este-uruguay',
  'mendoza-argentina',
  'bariloche-argentina',
  'florianopolis-brazil',
  'salvador-brazil',
  'miraflores-lima-peru',
  'cusco-sacred-valley-peru',
  'santiago-chile',
  'vina-del-mar-valparaiso-chile',
  'barbados-caribbean',
  'curacao-caribbean',
  'grenada-caribbean',
  'iloilo-city-philippines',
  'davao-city-philippines',
  'baguio-philippines',
  'panglao-island-bohol-philippines',
  'tagaytay-philippines',
  'ho-chi-minh-city-vietnam',
  'hanoi-vietnam',
  'vung-tau-vietnam',
  'johor-bahru-malaysia',
  'langkawi-malaysia',
  'yogyakarta-indonesia',
  'phnom-penh-cambodia',
  'kampot-cambodia',
  'colombo-sri-lanka',
  'galle-sri-lanka',
  'kandy-sri-lanka',
  'pokhara-nepal',
  'naha-okinawa-japan',
  'fukuoka-japan',
  'busan-south-korea',
  'taipei-taiwan',
  'kaohsiung-taiwan',
  'goa-india',
  'kochi-kerala-india',
  'luang-prabang-laos',
  'vientiane-laos',
  'koh-samui-thailand',
  'krabi-ao-nang-thailand',
  'essaouira-morocco',
  'agadir-morocco',
  'tangier-morocco',
  'hurghada-egypt',
  'maadi-cairo-egypt',
  'grand-baie-mauritius',
  'tamarin-flic-en-flac-mauritius',
  'knysna-garden-route-south-africa',
  'stellenbosch-south-africa',
  'nairobi-kenya',
  'diani-beach-kenya',
  'zanzibar-tanzania',
  'santa-maria-sal-cape-verde',
  'mindelo-sao-vicente-cape-verde',
  'swakopmund-namibia',
  'dubai-uae',
  'abu-dhabi-uae',
  'hammamet-tunisia',
  'sunshine-coast-noosa-australia',
  'gold-coast-australia',
  'hobart-tasmania-australia',
  'adelaide-australia',
  'tauranga-new-zealand',
  'nelson-new-zealand',
  'dunedin-new-zealand',
  'suva-fiji',
  'denarau-nadi-fiji',
  'tahiti-moorea-french-polynesia',
  'noumea-new-caledonia',
  'rarotonga-cook-islands',
  'apia-samoa',
  'guam-usa-territory',
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
