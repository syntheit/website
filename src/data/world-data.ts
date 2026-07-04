export interface MapViewport {
  lat: number;
  lng: number;
  zoom: number;
}

export interface NoteEntry {
  title: string;
  description: string;
  url: string;
  category: string;
}

export interface AreaFilter {
  label: string;
  viewport: MapViewport;
}

export interface Location {
  slug: string;
  name: string;
  nameAccent?: string;
  type: "country" | "city" | "region";
  parentSlug?: string;
  region: string;
  status: "living" | "visited" | "want-to-visit";
  placeCount?: number;
  meta: Record<string, string>;
  viewport: MapViewport;
  availableCategories: string[];
  availableLists: string[];
  areaFilters?: AreaFilter[];
  notes: NoteEntry[];
}

export const REGION_ORDER = [
  "South America",
  "North America",
  "Europe",
  "Asia",
  "Oceania",
  "Africa",
];

// ── List assignment helpers ──

const GLOBAL_ALL = [
  "restaurants", "restaurants-to-go",
  "cafes", "cafes-to-go",
  "bars", "bars-to-go",
  "stores", "cool-places",
  "museums", "museums-to-go",
  "cultural-centers", "hikes", "libraries",
  "clubs-to-go", "urbex", "street-signs", "photo-spots",
];

const GLOBAL_HIGH = [
  "restaurants", "restaurants-to-go",
  "cafes", "cafes-to-go",
  "bars", "bars-to-go",
  "stores", "cool-places",
  "museums", "museums-to-go",
  "hikes",
];

const GLOBAL_MED = [
  "restaurants", "restaurants-to-go",
  "cafes", "cafes-to-go",
  "bars", "cool-places",
];

const GLOBAL_LOW = [
  "restaurants", "cafes", "cool-places",
];

function deriveCats(listIds: string[]): string[] {
  const labelMap: Record<string, string> = {
    "restaurants": "Restaurants", "restaurants-to-go": "Restaurants",
    "cafes": "Cafes", "cafes-to-go": "Cafes",
    "bars": "Bars", "bars-to-go": "Bars",
    "stores": "Stores",
    "cool-places": "Cool Spots",
    "museums": "Museums", "museums-to-go": "Museums",
    "cultural-centers": "Cultural Centers",
    "hikes": "Hikes",
    "libraries": "Libraries",
    "clubs-to-go": "Clubs",
    "urbex": "Urbex",
    "street-signs": "Street Signs",
    "photo-spots": "Photo Spots",
  };
  // Any id containing "landmarks" or "tourism" → "Landmarks"
  const cats = new Set<string>();
  for (const id of listIds) {
    if (id.includes("landmarks") || id.includes("tourism")) {
      cats.add("Landmarks");
    } else if (labelMap[id]) {
      cats.add(labelMap[id]);
    }
  }
  return [...cats];
}

function shell(
  slug: string,
  name: string,
  region: string,
  places: number,
  trips: number,
  viewport: MapViewport,
  landmarkIds: string[] = [],
): Location {
  let globalLists: string[];
  if (places >= 50) globalLists = GLOBAL_ALL;
  else if (places >= 20) globalLists = GLOBAL_HIGH;
  else if (places >= 5) globalLists = GLOBAL_MED;
  else if (places >= 1) globalLists = GLOBAL_LOW;
  else globalLists = [];

  const allLists = [...globalLists, ...landmarkIds];

  return {
    slug,
    name,
    type: "country",
    region,
    status: "visited",
    placeCount: places,
    meta: {
      Status: "Visited",
      Trips: String(trips),
    },
    viewport,
    availableCategories: deriveCats(allLists),
    availableLists: allLists,
    notes: [],
  };
}

export const locations: Location[] = [
  // ══════════════════════════════════════════
  // South America
  // ══════════════════════════════════════════
  {
    slug: "argentina",
    name: "Argentina",
    type: "country",
    region: "South America",
    status: "living",
    placeCount: 99,
    meta: {
      Status: "Living here",
      Since: "2024",
      Photos: "#",
    },
    viewport: { lat: -38.4, lng: -63.6, zoom: 4 },
    availableCategories: deriveCats([...GLOBAL_ALL, "argentina-landmarks", "argentina-tourism"]),
    availableLists: [...GLOBAL_ALL, "argentina-landmarks", "argentina-tourism"],
    areaFilters: [
      { label: "Mendoza", viewport: { lat: -32.89, lng: -68.83, zoom: 10 } },
      { label: "Jujuy", viewport: { lat: -23.32, lng: -65.76, zoom: 9 } },
      { label: "Patagonia", viewport: { lat: -44.0, lng: -68.5, zoom: 6 } },
      { label: "Córdoba", viewport: { lat: -31.42, lng: -64.18, zoom: 10 } },
      { label: "Salta", viewport: { lat: -24.79, lng: -65.41, zoom: 10 } },
      { label: "Misiones", viewport: { lat: -27.37, lng: -54.44, zoom: 9 } },
    ],
    notes: [
      {
        title: "Argentina's parallel exchange rate system",
        description:
          "Explainer on the official rate, blue dollar, MEP, CCL, and why Argentina has been running multiple exchange rates simultaneously for years.",
        url: "https://www.economist.com/the-americas/2023/argentina-exchange-rates",
        category: "Economy",
      },
      {
        title: "Why asado is Argentina's social infrastructure",
        description:
          "Asado isn't just food. It's the primary way Argentines build and maintain relationships. The ritual matters more than the meat.",
        url: "https://www.bbc.com/travel/argentina-asado",
        category: "Culture",
      },
      {
        title: "The Salinas Grandes at 3,400m",
        description:
          "A massive salt flat in Jujuy. One of the most alien landscapes in South America. Completely empty, perfectly white.",
        url: "https://en.wikipedia.org/wiki/Salinas_Grandes",
        category: "Geography",
      },
      {
        title: "How Italian immigration shaped Buenos Aires",
        description:
          "Nearly half of Argentines have Italian ancestry. How this wave of immigration defined the food, language, and culture of the country.",
        url: "https://www.jstor.org/stable/italian-immigration-argentina",
        category: "History",
      },
      {
        title: "Understanding Argentina's inflation cycles",
        description:
          "A brief history of hyperinflation, currency pegs, and the economic patterns that keep repeating every 10-15 years.",
        url: "https://www.brookings.edu/articles/argentina-inflation",
        category: "Economy",
      },
      {
        title: "Mate: more than a drink",
        description:
          "Sharing mate is an act of trust and friendship. Refusing is considered rude. The ritual is more important than the drink itself.",
        url: "https://www.atlasobscura.com/foods/mate-argentina",
        category: "Culture",
      },
    ],
  },
  {
    slug: "buenos-aires",
    name: "Buenos Aires",
    nameAccent: "Aires",
    type: "city",
    parentSlug: "argentina",
    region: "South America",
    status: "living",
    placeCount: 84,
    meta: {
      Status: "Home base",
      Since: "2024",
      Photos: "#",
    },
    viewport: { lat: -34.6, lng: -58.4, zoom: 12 },
    availableCategories: deriveCats([...GLOBAL_ALL, "argentina-landmarks", "argentina-tourism"]),
    availableLists: [...GLOBAL_ALL, "argentina-landmarks", "argentina-tourism"],
    areaFilters: [
      { label: "Palermo", viewport: { lat: -34.58, lng: -58.43, zoom: 14 } },
      { label: "Villa Crespo", viewport: { lat: -34.60, lng: -58.44, zoom: 15 } },
      { label: "San Telmo", viewport: { lat: -34.62, lng: -58.37, zoom: 15 } },
      { label: "Recoleta", viewport: { lat: -34.59, lng: -58.39, zoom: 15 } },
      { label: "Belgrano", viewport: { lat: -34.56, lng: -58.46, zoom: 14 } },
      { label: "Colegiales", viewport: { lat: -34.57, lng: -58.45, zoom: 15 } },
      { label: "Monserrat", viewport: { lat: -34.61, lng: -58.38, zoom: 15 } },
      { label: "Caballito", viewport: { lat: -34.62, lng: -58.44, zoom: 15 } },
      { label: "Nuñez", viewport: { lat: -34.55, lng: -58.46, zoom: 15 } },
    ],
    notes: [
      {
        title: "The bodegón: BA's best-kept secret",
        description:
          "Forget the tourist parrillas. The real eating in Buenos Aires happens at bodegones — old-school neighborhood joints with no English menus and massive portions.",
        url: "https://www.bbc.com/travel/buenos-aires-bodegones",
        category: "Food",
      },
      {
        title: "Palermo's sub-neighborhoods explained",
        description:
          "Palermo Soho, Palermo Hollywood, Palermo Viejo, Palermo Chico. They're all different and locals will judge you for confusing them.",
        url: "https://wikitravel.org/en/Buenos_Aires/Palermo",
        category: "Neighborhoods",
      },
      {
        title: "Buenos Aires has the most bookstores per capita in the world",
        description:
          "There are over 700 bookstores in BA. El Ateneo Grand Splendid, a converted theater, is consistently ranked among the world's most beautiful.",
        url: "https://www.theguardian.com/books/buenos-aires-bookstores",
        category: "Culture",
      },
      {
        title: "Getting around BA without a car",
        description:
          "The subte, colectivos, and cycling infrastructure. How porteños actually move around the city and what apps to use.",
        url: "https://www.reddit.com/r/BuenosAires/wiki/transport",
        category: "Practical",
      },
    ],
  },
  {
    slug: "brazil",
    name: "Brazil",
    type: "country",
    region: "South America",
    status: "visited",
    placeCount: 77,
    meta: {
      Status: "Visited",
      Trips: "3",
      Photos: "#",
    },
    viewport: { lat: -14.2, lng: -51.9, zoom: 4 },
    availableCategories: deriveCats([...GLOBAL_ALL, "brazil-landmarks"]),
    availableLists: [...GLOBAL_ALL, "brazil-landmarks"],
    areaFilters: [
      { label: "Santa Catarina", viewport: { lat: -27.24, lng: -50.22, zoom: 8 } },
      { label: "Paraná", viewport: { lat: -24.89, lng: -51.55, zoom: 8 } },
      { label: "Rio Grande do Sul", viewport: { lat: -30.03, lng: -51.23, zoom: 8 } },
      { label: "São Paulo", viewport: { lat: -23.55, lng: -46.63, zoom: 8 } },
    ],
    notes: [
      {
        title: "Why Spanish and Portuguese are almost the same language",
        description:
          "They share so much architecture that growth in one feeds the other automatically. Lexical similarity is around 89%.",
        url: "https://en.wikipedia.org/wiki/Comparison_of_Portuguese_and_Spanish",
        category: "Language",
      },
      {
        title: "Southern Brazil is a different country",
        description:
          "Curitiba, Florianópolis, Porto Alegre. European architecture, colder climate, chimarrão instead of mate. Nothing like Rio.",
        url: "https://www.theguardian.com/travel/southern-brazil",
        category: "Culture",
      },
      {
        title: "Lençóis Maranhenses: desert with lagoons",
        description:
          "Sand dunes with crystal-clear freshwater lagoons between them. Looks like another planet. Only accessible part of the year.",
        url: "https://en.wikipedia.org/wiki/Len%C3%A7%C3%B3is_Maranhenses_National_Park",
        category: "Geography",
      },
      {
        title: "The gaúcho tradition in Rio Grande do Sul",
        description:
          "Argentine and Brazilian gaúcho culture diverged but share the same roots. Chimarrão vs mate, asado vs churrasco.",
        url: "https://www.jstor.org/stable/gaucho-culture",
        category: "Culture",
      },
    ],
  },
  shell("paraguay", "Paraguay", "South America", 17, 1, { lat: -23.4, lng: -58.4, zoom: 6 }, ["paraguay-landmarks"]),
  shell("uruguay", "Uruguay", "South America", 24, 2, { lat: -32.5, lng: -55.8, zoom: 7 }, ["uruguay-landmarks"]),
  shell("bolivia", "Bolivia", "South America", 2, 1, { lat: -16.3, lng: -63.6, zoom: 6 }),
  shell("chile", "Chile", "South America", 2, 1, { lat: -35.7, lng: -71.5, zoom: 4 }),
  shell("colombia", "Colombia", "South America", 2, 1, { lat: 4.6, lng: -74.3, zoom: 6 }),
  shell("peru", "Peru", "South America", 4, 1, { lat: -9.2, lng: -75.0, zoom: 5 }),
  shell("ecuador", "Ecuador", "South America", 1, 1, { lat: -1.8, lng: -78.2, zoom: 7 }),
  shell("el-salvador", "El Salvador", "South America", 1, 1, { lat: 13.8, lng: -88.9, zoom: 8 }),

  // ══════════════════════════════════════════
  // North America
  // ══════════════════════════════════════════
  {
    slug: "united-states",
    name: "United States",
    type: "country",
    region: "North America",
    status: "visited",
    placeCount: 80,
    meta: {
      Status: "Visited",
      Trips: "5",
    },
    viewport: { lat: 37.1, lng: -95.7, zoom: 4 },
    availableCategories: deriveCats([...GLOBAL_ALL, "dc-landmarks"]),
    availableLists: [...GLOBAL_ALL, "dc-landmarks"],
    notes: [],
  },
  {
    slug: "dc",
    name: "Washington, D.C.",
    nameAccent: "D.C.",
    type: "city",
    parentSlug: "united-states",
    region: "North America",
    status: "visited",
    placeCount: 47,
    meta: {
      Status: "Visited",
      Trips: "3",
    },
    viewport: { lat: 38.9, lng: -77.0, zoom: 12 },
    availableCategories: deriveCats([...GLOBAL_ALL, "dc-landmarks"]),
    availableLists: [...GLOBAL_ALL, "dc-landmarks"],
    areaFilters: [
      { label: "Downtown", viewport: { lat: 38.90, lng: -77.03, zoom: 14 } },
      { label: "Georgetown", viewport: { lat: 38.91, lng: -77.06, zoom: 15 } },
      { label: "Dupont Circle", viewport: { lat: 38.91, lng: -77.04, zoom: 15 } },
      { label: "Capitol Hill", viewport: { lat: 38.89, lng: -76.99, zoom: 15 } },
      { label: "Adams Morgan", viewport: { lat: 38.92, lng: -77.04, zoom: 15 } },
    ],
    notes: [],
  },
  {
    slug: "chicagoland",
    name: "Chicagoland",
    type: "region",
    parentSlug: "united-states",
    region: "North America",
    status: "visited",
    placeCount: 20,
    meta: {
      Status: "Visited",
    },
    viewport: { lat: 41.9, lng: -87.6, zoom: 10 },
    availableCategories: deriveCats(GLOBAL_HIGH),
    availableLists: [...GLOBAL_HIGH],
    notes: [],
  },
  {
    slug: "upstate-ny",
    name: "Upstate NY",
    type: "region",
    parentSlug: "united-states",
    region: "North America",
    status: "visited",
    meta: {
      Status: "Visited",
    },
    viewport: { lat: 42.9, lng: -75.3, zoom: 7 },
    availableCategories: deriveCats(GLOBAL_HIGH),
    availableLists: [...GLOBAL_HIGH],
    notes: [],
  },
  shell("mexico", "Mexico", "North America", 4, 1, { lat: 23.6, lng: -102.6, zoom: 5 }),
  shell("canada", "Canada", "North America", 12, 2, { lat: 56.1, lng: -106.3, zoom: 4 }, ["canada-landmarks"]),
  shell("jamaica", "Jamaica", "North America", 1, 1, { lat: 18.1, lng: -77.3, zoom: 9 }),

  // ══════════════════════════════════════════
  // Europe
  // ══════════════════════════════════════════
  shell("hungary", "Hungary", "Europe", 66, 3, { lat: 47.2, lng: 19.5, zoom: 7 }, ["hungary-landmarks"]),
  shell("belgium", "Belgium", "Europe", 35, 2, { lat: 50.5, lng: 4.5, zoom: 8 }, ["belgium-landmarks"]),
  shell("poland", "Poland", "Europe", 33, 2, { lat: 51.9, lng: 19.1, zoom: 6 }, ["poland-landmarks"]),
  shell("czechia", "Czechia", "Europe", 27, 2, { lat: 49.8, lng: 15.5, zoom: 7 }, ["czechia-landmarks"]),
  shell("slovakia", "Slovakia", "Europe", 27, 2, { lat: 48.7, lng: 19.7, zoom: 7 }, ["slovakia-landmarks"]),
  shell("austria", "Austria", "Europe", 31, 2, { lat: 47.5, lng: 14.6, zoom: 7 }, ["austria-landmarks"]),
  shell("germany", "Germany", "Europe", 11, 1, { lat: 51.2, lng: 10.4, zoom: 6 }, ["germany-landmarks"]),
  shell("moldova", "Moldova", "Europe", 11, 1, { lat: 47.4, lng: 28.4, zoom: 8 }, ["moldova-landmarks"]),
  shell("france", "France", "Europe", 4, 1, { lat: 46.6, lng: 2.2, zoom: 6 }, ["france-landmarks"]),
  shell("united-kingdom", "United Kingdom", "Europe", 3, 1, { lat: 55.4, lng: -3.4, zoom: 6 }),
  shell("netherlands", "Netherlands", "Europe", 3, 1, { lat: 52.1, lng: 5.3, zoom: 8 }),
  shell("switzerland", "Switzerland", "Europe", 2, 1, { lat: 46.8, lng: 8.2, zoom: 8 }),
  shell("sweden", "Sweden", "Europe", 2, 1, { lat: 60.1, lng: 18.6, zoom: 5 }),
  shell("norway", "Norway", "Europe", 2, 1, { lat: 60.5, lng: 8.5, zoom: 5 }),
  shell("romania", "Romania", "Europe", 1, 1, { lat: 45.9, lng: 25.0, zoom: 7 }),
  shell("north-macedonia", "North Macedonia", "Europe", 1, 1, { lat: 41.5, lng: 21.7, zoom: 9 }),

  // ══════════════════════════════════════════
  // Asia
  // ══════════════════════════════════════════
  shell("turkey", "Turkey", "Asia", 6, 1, { lat: 38.9, lng: 35.2, zoom: 6 }, ["turkey-landmarks"]),
  shell("china", "China", "Asia", 6, 1, { lat: 35.9, lng: 104.2, zoom: 4 }, ["china-landmarks"]),
  shell("japan", "Japan", "Asia", 3, 1, { lat: 36.2, lng: 138.3, zoom: 6 }),
  shell("thailand", "Thailand", "Asia", 2, 1, { lat: 15.9, lng: 100.9, zoom: 6 }),
  shell("india", "India", "Asia", 2, 1, { lat: 20.6, lng: 78.9, zoom: 5 }),
  shell("russia", "Russia", "Asia", 1, 1, { lat: 61.5, lng: 105.3, zoom: 3 }),
  shell("kazakhstan", "Kazakhstan", "Asia", 1, 1, { lat: 48.0, lng: 68.0, zoom: 5 }),
  shell("kyrgyzstan", "Kyrgyzstan", "Asia", 1, 1, { lat: 41.2, lng: 74.8, zoom: 7 }),
  shell("tajikistan", "Tajikistan", "Asia", 1, 1, { lat: 38.9, lng: 71.3, zoom: 7 }),
  shell("uzbekistan", "Uzbekistan", "Asia", 1, 1, { lat: 41.4, lng: 64.6, zoom: 6 }),
  shell("armenia", "Armenia", "Asia", 1, 1, { lat: 40.1, lng: 44.5, zoom: 8 }),
  shell("yemen", "Yemen", "Asia", 1, 1, { lat: 15.6, lng: 48.5, zoom: 6 }),
  shell("iraq", "Iraq", "Asia", 1, 1, { lat: 33.2, lng: 43.7, zoom: 6 }),

  // ══════════════════════════════════════════
  // Oceania
  // ══════════════════════════════════════════
  shell("australia", "Australia", "Oceania", 2, 1, { lat: -25.3, lng: 133.8, zoom: 4 }),

  // ══════════════════════════════════════════
  // Africa
  // ══════════════════════════════════════════
  shell("south-africa", "South Africa", "Africa", 1, 1, { lat: -30.6, lng: 22.9, zoom: 6 }),
  shell("kenya", "Kenya", "Africa", 1, 1, { lat: -0.02, lng: 37.9, zoom: 6 }),
  shell("madagascar", "Madagascar", "Africa", 1, 1, { lat: -18.8, lng: 46.9, zoom: 6 }),
];
