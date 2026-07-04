"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { PlaceFilter, PlaceStatus } from "@/types/world";
import { publicPlaces, getPlace, bboxFromViewport } from "@/lib/world-places";
import { filterPlaces } from "@/lib/place-filter";
import { PlaceMap, type PlaceMapHandle } from "./PlaceMap";
import { PlaceList } from "./PlaceList";
import { PlaceDetail } from "./PlaceDetail";
import { FilterChips } from "./FilterChips";

export interface AreaFilter {
  label: string;
  viewport: { lat: number; lng: number; zoom: number };
}

interface Props {
  /**
   * Filter applied at mount. To switch scope (e.g. country page → city page),
   * pass a different `key` so the component remounts cleanly rather than
   * trying to migrate transient state across scopes.
   */
  initialFilter?: PlaceFilter;
  initialViewState?: { longitude: number; latitude: number; zoom: number };
  /** Area chips (Palermo, San Telmo, …) — clicking flies the map AND narrows the list. */
  areaFilters?: AreaFilter[];
  /** Label for the area row. */
  areaFilterLabel?: string;
}

function hasAnyFilter(f: PlaceFilter): boolean {
  return Boolean(f.country ?? f.category ?? f.status ?? f.search ?? f.bbox);
}

export function PlaceExplorer({
  initialFilter = {},
  initialViewState,
  areaFilters,
  areaFilterLabel = "Areas",
}: Props) {
  const [filter, setFilter] = useState<PlaceFilter>(initialFilter);
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const mapHandleRef = useRef<PlaceMapHandle | null>(null);

  const isScoped = Boolean(initialFilter.country ?? initialFilter.bbox);
  const allPlaces = useMemo(() => publicPlaces(), []);

  // ── URL state ────────────────────────────────────────────────────────
  // Hydrate filter/area from search params once on mount, then mirror state
  // back to the URL so a filtered view is shareable + survives reload.
  // Country is only honoured from the URL when not already locked by the
  // page scope (e.g. /world/argentina locks country, /world doesn't).
  const router = useRouter();
  const pathname = usePathname();
  const lockedCountry = Boolean(initialFilter.country);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setFilter((prev) => {
      const next: PlaceFilter = { ...prev };
      if (!lockedCountry) {
        const c = sp.get("country");
        if (c) next.country = c;
      }
      const cat = sp.get("category");
      if (cat) next.category = cat;
      const st = sp.get("status");
      if (st) next.status = st as PlaceStatus;
      const q = sp.get("q");
      if (q) next.search = q;
      return next;
    });
    const area = sp.get("area");
    if (area) setActiveArea(area);
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Skip the very first invocation so we don't clobber URL params before
  // hydration's setState has taken effect.
  const skipFirstUrlWrite = useRef(true);
  useEffect(() => {
    if (skipFirstUrlWrite.current) {
      skipFirstUrlWrite.current = false;
      return;
    }
    const sp = new URLSearchParams();
    if (!lockedCountry && filter.country) sp.set("country", filter.country);
    if (filter.category) sp.set("category", filter.category);
    if (filter.status) sp.set("status", filter.status);
    if (filter.search?.trim()) sp.set("q", filter.search.trim());
    if (activeArea) sp.set("area", activeArea);
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [filter, activeArea, pathname, router, lockedCountry]);

  // When an area chip is active, its bbox overrides any bbox in `filter`. For
  // country pages this AND's with the country constraint. For city pages it
  // replaces the city's wider bbox with the narrower area bbox.
  const effectiveFilter = useMemo<PlaceFilter>(() => {
    if (!activeArea) return filter;
    const a = areaFilters?.find((f) => f.label === activeArea);
    if (!a) return filter;
    return { ...filter, bbox: bboxFromViewport(a.viewport) };
  }, [filter, activeArea, areaFilters]);

  const filtered = useMemo(
    () => filterPlaces(allPlaces, effectiveFilter),
    [allPlaces, effectiveFilter],
  );

  // Drop transient selection/hover state if the filter excludes them.
  useEffect(() => {
    const visible = (id: string | null) =>
      id !== null && filtered.some((p) => p.id === id);
    if (selectedId && !visible(selectedId)) setSelectedId(null);
    if (hoveredId && !visible(hoveredId)) setHoveredId(null);
  }, [filtered, selectedId, hoveredId]);

  const selectedPlace = selectedId ? (getPlace(selectedId) ?? null) : null;

  const handleAreaClick = (a: AreaFilter) => {
    if (activeArea === a.label) {
      // Toggle off: release the bbox narrowing and refit to the parent scope.
      setActiveArea(null);
      return;
    }
    setActiveArea(a.label);
    mapHandleRef.current?.flyTo(a.viewport);
  };

  // Clearing all filters also releases any active area selection.
  const handleFilterChange = (next: PlaceFilter) => {
    setFilter(next);
    if (!hasAnyFilter(next)) setActiveArea(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5EBD9]">
      <FilterChips
        allPlaces={allPlaces}
        filter={filter}
        onChange={handleFilterChange}
        hideCountry={isScoped}
      />
      {areaFilters && areaFilters.length > 0 && (
        <div className="px-4 py-2 border-b border-[rgba(59,35,20,0.06)] flex flex-wrap items-center gap-2 bg-[#F5EBD9]">
          <span className="text-[10px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold mr-1">
            {areaFilterLabel}
          </span>
          {areaFilters.map((a) => {
            const isActive = activeArea === a.label;
            return (
              <button
                key={a.label}
                onClick={() => handleAreaClick(a)}
                className={`px-3 py-[4px] rounded-full text-[11px] font-medium font-sans transition-all cursor-pointer border-[1.5px] ${
                  isActive
                    ? "bg-[#D4581A] text-white border-[#D4581A]"
                    : "bg-transparent text-[#7A5C42] border-[rgba(59,35,20,0.15)] hover:border-[#D4581A] hover:text-[#D4581A]"
                }`}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      )}
      <div className="flex flex-1 overflow-hidden relative">
        <div className="hidden md:flex w-[380px] shrink-0 border-r-[1.5px] border-[rgba(59,35,20,0.08)] bg-[#F5EBD9] flex-col">
          <PlaceList
            places={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onHover={setHoveredId}
          />
        </div>
        <div className="flex-1 relative">
          <PlaceMap
            ref={mapHandleRef}
            places={filtered}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={setSelectedId}
            onHover={setHoveredId}
            initialViewState={initialViewState}
          />
        </div>
        {selectedPlace && (
          <PlaceDetail place={selectedPlace} onClose={() => setSelectedId(null)} />
        )}
      </div>
    </div>
  );
}
