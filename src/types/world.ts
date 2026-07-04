export interface Place {
  id: string;
  ftid: string;
  name: string;
  title: string;
  lat: number;
  lng: number;
  address?: string;
  country: string;
  category?: string;
  categories: string[];
  status: "visited" | "want-to-go" | "favorite" | "unknown";
  tags: string[];
  scope?: string;
  scopes: string[];
  googleMapsUrl: string;
  listIds: string[];
  takeoutNotes: string[];
  publicByDefault: boolean;
  note?: string;
  rating?: number;
  lastVisited?: string;
  /** Admin-only note; never rendered publicly. */
  internalNote?: string;
  /** ISO timestamp of last admin edit. */
  updatedAt?: string;
}

export interface List {
  id: string;
  label: string;
  category?: string;
  status?: "visited" | "want-to-go" | "favorite";
  scope?: string;
  tags?: string[];
  /** True for admin-created lists (id is `custom_…`), false/absent for Takeout-derived. */
  custom?: boolean;
  placeCount: number;
  placeIds: string[];
}

export interface WorldIndex {
  totalPlaces: number;
  privateCount: number;
  byCountry: Record<string, number>;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
  countryToPlaceIds: Record<string, string[]>;
}

export type PlaceStatus = Place["status"];

export interface PlaceFilter {
  country?: string;
  category?: string;
  status?: PlaceStatus;
  search?: string;
  // Geographic filter — used by city/region pages where we want only places
  // inside the location's bounding box, regardless of country.
  bbox?: { minLat: number; maxLat: number; minLng: number; maxLng: number };
}
