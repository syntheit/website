export interface MapList {
  id: string;
  label: string;
  status: "visited" | "recommended";
  googleMapsUrl: string;
}

export const mapLists: MapList[] = [
  // ── Restaurants ──
  { id: "restaurants", label: "Restaurants", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/u2HhynD4SEHeZZ1MA" },
  { id: "restaurants-to-go", label: "Restaurants", status: "recommended", googleMapsUrl: "https://maps.app.goo.gl/JDJYLvJccNWNkeGS7" },

  // ── Cafes ──
  { id: "cafes", label: "Cafes", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/kem941aCJqVd7Uns5" },
  { id: "cafes-to-go", label: "Cafes", status: "recommended", googleMapsUrl: "https://maps.app.goo.gl/qWfn8nxv6FJx5LKm7" },

  // ── Bars ──
  { id: "bars", label: "Bars", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/5nzqzJEKVkFccnBEA" },
  { id: "bars-to-go", label: "Bars", status: "recommended", googleMapsUrl: "https://maps.app.goo.gl/fKEAovBKsPs3XmAaA" },

  // ── Other global categories ──
  { id: "stores", label: "Stores", status: "visited", googleMapsUrl: "URL_HERE" },
  { id: "cool-places", label: "Cool Spots", status: "visited", googleMapsUrl: "URL_HERE" },
  { id: "museums", label: "Museums", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/9H2gDimwsyGCopzj7" },
  { id: "museums-to-go", label: "Museums", status: "recommended", googleMapsUrl: "https://maps.app.goo.gl/Mi7DfMz7CTcNDLeS9" },
  { id: "cultural-centers", label: "Cultural Centers", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/hkCGFth4GwpHADo78" },
  { id: "hikes", label: "Hikes", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/kVFUQDjBoiaEP2Ve9" },
  { id: "libraries", label: "Libraries", status: "visited", googleMapsUrl: "URL_HERE" },
  { id: "clubs-to-go", label: "Clubs", status: "recommended", googleMapsUrl: "URL_HERE" },
  { id: "urbex", label: "Urbex", status: "visited", googleMapsUrl: "URL_HERE" },
  { id: "street-signs", label: "Street Signs", status: "visited", googleMapsUrl: "URL_HERE" },
  { id: "photo-spots", label: "Photo Spots", status: "visited", googleMapsUrl: "URL_HERE" },

  // ── Country-specific landmarks ──
  { id: "argentina-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/Czr4EndrCXUpUGHD7" },
  { id: "argentina-tourism", label: "Landmarks", status: "recommended", googleMapsUrl: "URL_HERE" },
  { id: "brazil-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/5rXi7bfAxLksMCRU7" },
  { id: "paraguay-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/omFehCW65uwMEQU96" },
  { id: "uruguay-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/MpiSVksGHsJMCnVBA" },
  { id: "dc-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "URL_HERE" },
  { id: "hungary-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/m4txoJFDbLFULjNw8" },
  { id: "belgium-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/mryG4ym62dV9n2X58" },
  { id: "poland-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/gRJ1JD7LAQytBqNx8" },
  { id: "czechia-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "URL_HERE" },
  { id: "slovakia-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/eRL9x9eor57na8CX8" },
  { id: "austria-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/ZtxKxTEq5GxkyzTv9" },
  { id: "canada-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/P8VM94oZx3FKddHw5" },
  { id: "germany-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/mduMbVKsmRLm5ii46" },
  { id: "moldova-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "https://maps.app.goo.gl/MVANy4uvV6KwhrD57" },
  { id: "turkey-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "URL_HERE" },
  { id: "china-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "URL_HERE" },
  { id: "france-landmarks", label: "Landmarks", status: "visited", googleMapsUrl: "URL_HERE" },
];

/** Look up a map list by its ID */
export function getMapList(id: string): MapList | undefined {
  return mapLists.find((l) => l.id === id);
}

/** Get all map lists matching a set of IDs */
export function getMapListsById(ids: string[]): MapList[] {
  return ids.map((id) => mapLists.find((l) => l.id === id)).filter(Boolean) as MapList[];
}

/** Get unique category labels from a set of list IDs */
export function getCategoryLabels(listIds: string[]): string[] {
  const lists = getMapListsById(listIds);
  return [...new Set(lists.map((l) => l.label))];
}

/** Get lists for a specific category label from a set of list IDs */
export function getListsForCategory(listIds: string[], category: string): MapList[] {
  return getMapListsById(listIds).filter((l) => l.label === category);
}
