/**
 * Maps each Google Takeout list (by its slugified filename) to its semantic role
 * in our world dataset: what category does it confer, what status, what tags.
 *
 * Resolution rules when a place appears in multiple lists:
 * - Category: most-specific wins (a list with `category` set beats a list without).
 *   If multiple specific categories, the first encountered wins.
 * - Status: "visited" > "favorite" > "want-to-go". (Visited wins on conflict.)
 *   A list with no explicit status doesn't contribute.
 * - Tags: union of all list tags.
 * - publicByDefault: AND across all lists (any list saying false makes it private).
 */

export interface ListMeta {
  category?: string;
  status?: "visited" | "want-to-go" | "favorite";
  tags?: string[];
  scope?: string;          // a country/city slug this list is anchored to
  publicByDefault?: boolean;
  drop?: boolean;          // drop these entirely from the world dataset
  label: string;           // human-readable name for UI
}

export const LIST_MAPPING: Record<string, ListMeta> = {
  // ── Category-axis: visited ──
  "restaurants": { category: "restaurants", status: "visited", label: "Restaurants" },
  "cafes": { category: "cafes", status: "visited", label: "Cafes" },
  "bars": { category: "bars", status: "visited", label: "Bars" },
  "museums": { category: "museums", status: "visited", label: "Museums" },
  "store": { category: "stores", status: "visited", label: "Stores" },
  "thrift-stores": { category: "stores", status: "visited", tags: ["thrift"], label: "Thrift Stores" },
  "cool-places": { status: "visited", tags: ["cool-place"], label: "Cool Places" },
  "cultural-centers": { category: "cultural-centers", status: "visited", label: "Cultural Centers" },
  "libraries": { category: "libraries", status: "visited", label: "Libraries" },
  "hikes": { category: "hikes", status: "visited", label: "Hikes" },
  "photo-spots": { category: "photo-spots", status: "visited", label: "Photo Spots" },
  "street-signs": { status: "visited", tags: ["street-sign"], label: "Street Signs" },
  "urbex": { status: "visited", tags: ["urbex"], label: "Urbex" },
  "hostels": { status: "visited", tags: ["hostel", "accommodation"], label: "Hostels" },
  "accomodations": { status: "visited", tags: ["accommodation"], label: "Accommodations" },
  "granja": { category: "stores", status: "visited", tags: ["granja"], label: "Granja" },
  "ba-granjas": { category: "stores", status: "visited", tags: ["granja"], scope: "buenos-aires", label: "BA Granjas" },
  "dc-embassies": { status: "visited", tags: ["embassy"], scope: "dc", label: "DC Embassies" },
  "ugliest-buildings-in-dc": { status: "visited", tags: ["landmark", "ugly"], scope: "dc", label: "Ugliest Buildings in DC" },
  "borders": { status: "visited", tags: ["border", "geographic-curiosity"], label: "Borders" },

  // ── Category-axis: want-to-go ──
  "restaurants-to-go-to": { category: "restaurants", status: "want-to-go", label: "Restaurants (want to go)" },
  "cafes-to-go-to": { category: "cafes", status: "want-to-go", label: "Cafes (want to go)" },
  "bars-to-go-to": { category: "bars", status: "want-to-go", label: "Bars (want to go)" },
  "museums-to-go-to": { category: "museums", status: "want-to-go", label: "Museums (want to go)" },
  "clubs-to-go-to": { category: "clubs", status: "want-to-go", label: "Clubs (want to go)" },

  // ── Country/region scope lists (no category contribution) ──
  "argentina": { scope: "argentina", label: "Argentina" },
  "argentina-tourism": { scope: "argentina", status: "want-to-go", tags: ["tourism"], label: "Argentina Tourism" },
  "buenos-aires": { scope: "buenos-aires", label: "Buenos Aires" },
  "brazil": { scope: "brazil", label: "Brazil" },
  "uruguay": { scope: "uruguay", label: "Uruguay" },
  "paraguay": { scope: "paraguay", label: "Paraguay" },
  "bolivia": { scope: "bolivia", label: "Bolivia" },
  "chile": { scope: "chile", label: "Chile" },
  "colombia": { scope: "colombia", label: "Colombia" },
  "peru": { scope: "peru", label: "Peru" },
  "el-salvador": { scope: "el-salvador", label: "El Salvador" },
  "mexico": { scope: "mexico", label: "Mexico" },
  "canada": { scope: "canada", label: "Canada" },
  "dc": { scope: "dc", label: "Washington, D.C." },
  "california": { scope: "united-states", tags: ["state:california"], label: "California" },
  "arizona": { scope: "united-states", tags: ["state:arizona"], label: "Arizona" },
  "arizona-1": { scope: "united-states", tags: ["state:arizona"], label: "Arizona (extra)" },
  "delaware": { scope: "united-states", tags: ["state:delaware"], label: "Delaware" },
  "maine": { scope: "united-states", tags: ["state:maine"], label: "Maine" },
  "maryland": { scope: "united-states", tags: ["state:maryland"], label: "Maryland" },
  "mississippi": { scope: "united-states", tags: ["state:mississippi"], label: "Mississippi" },
  "pennsylvania": { scope: "united-states", tags: ["state:pennsylvania"], label: "Pennsylvania" },
  "south-carolina": { scope: "united-states", tags: ["state:south-carolina"], label: "South Carolina" },
  "tennessee": { scope: "united-states", tags: ["state:tennessee"], label: "Tennessee" },
  "hungary": { scope: "hungary", label: "Hungary" },
  "belgium": { scope: "belgium", label: "Belgium" },
  "poland": { scope: "poland", label: "Poland" },
  "czechia": { scope: "czechia", label: "Czechia" },
  "slovakia": { scope: "slovakia", label: "Slovakia" },
  "austria": { scope: "austria", label: "Austria" },
  "germany": { scope: "germany", label: "Germany" },
  "france": { scope: "france", label: "France" },
  "united-kingdom": { scope: "united-kingdom", label: "United Kingdom" },
  "netherlands": { scope: "netherlands", label: "Netherlands" },
  "switzerland": { scope: "switzerland", label: "Switzerland" },
  "sweden": { scope: "sweden", label: "Sweden" },
  "norway": { scope: "norway", label: "Norway" },
  "romania": { scope: "romania", label: "Romania" },
  "north-macedonia": { scope: "north-macedonia", label: "North Macedonia" },
  "moldova": { scope: "moldova", label: "Moldova" },
  "turkey": { scope: "turkey", label: "Turkey" },
  "china": { scope: "china", label: "China" },
  "japan": { scope: "japan", label: "Japan" },
  "thailand": { scope: "thailand", label: "Thailand" },
  "india": { scope: "india", label: "India" },
  "russia": { scope: "russia", label: "Russia" },
  "uzbekistan": { scope: "uzbekistan", label: "Uzbekistan" },
  "armenia": { scope: "armenia", label: "Armenia" },
  "yemen": { scope: "yemen", label: "Yemen" },
  "iraq": { scope: "iraq", label: "Iraq" },
  "iran": { scope: "iran", label: "Iran" },
  "pakistan": { scope: "pakistan", label: "Pakistan" },
  "australia": { scope: "australia", label: "Australia" },
  "south-africa": { scope: "south-africa", label: "South Africa" },
  "kenya": { scope: "kenya", label: "Kenya" },
  "madagascar": { scope: "madagascar", label: "Madagascar" },
  "uganda": { scope: "uganda", label: "Uganda" },

  // ── Status-only meta lists ──
  "want-to-go": { status: "want-to-go", label: "Want to Go" },
  "favorite-places": { status: "favorite", label: "Favorites" },
  "saved-for-later": { drop: true, label: "Saved for later (articles)" },

  // ── Private / personal ──
  "friends": { publicByDefault: false, tags: ["friends"], label: "Friends" },

  // ── Drop ──
  "images": { drop: true, label: "Images (articles)" },
};

// Status precedence (most committed wins): visited > favorite > want-to-go
export const STATUS_RANK: Record<NonNullable<ListMeta["status"]>, number> = {
  visited: 3,
  favorite: 2,
  "want-to-go": 1,
};

// Category precedence: more-specific categories outrank "cool-places" (the catch-all).
export const CATEGORY_SPECIFICITY: Record<string, number> = {
  restaurants: 10,
  cafes: 10,
  bars: 10,
  museums: 10,
  clubs: 10,
  "cultural-centers": 8,
  libraries: 8,
  hikes: 8,
  stores: 7,
  "photo-spots": 6,
};
