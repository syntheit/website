"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Place, PlaceFilter } from "@/types/world";
import { categoryLabel, CATEGORY_LABELS } from "@/lib/world-places";
import {
  filterPlaces,
  categoryCounts as categoryCountsFn,
  countryCounts as countryCountsFn,
} from "@/lib/place-filter";
import { Picker } from "@/components/ui/picker";
import { countryLabel } from "@/lib/world-places";

interface Props {
  allPlaces: Place[];
  filter: PlaceFilter;
  onChange: (next: PlaceFilter) => void;
  /** Hide the country dropdown when we're already scoped to one (e.g. on a country page). */
  hideCountry?: boolean;
}

const STATUS_OPTIONS: { value: PlaceFilter["status"]; label: string }[] = [
  { value: "visited", label: "Visited" },
  { value: "want-to-go", label: "Want to Go" },
  { value: "favorite", label: "Favorites" },
];

export function FilterChips({ allPlaces, filter, onChange, hideCountry }: Props) {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Category chip counts reflect what each chip *would* select if clicked. So
  // we apply the current filter EXCLUDING category — search, status, country
  // all narrow the candidate set, but category is the dimension we're counting.
  const filterMinusCategory = useMemo<PlaceFilter>(() => {
    const next: PlaceFilter = { ...filter };
    delete next.category;
    return next;
  }, [filter]);

  const categoryCandidates = useMemo(
    () => filterPlaces(allPlaces, filterMinusCategory),
    [allPlaces, filterMinusCategory],
  );

  const catCounts = useMemo(
    () => categoryCountsFn(categoryCandidates),
    [categoryCandidates],
  );

  // Country dropdown shows the global count per country (it's a navigation,
  // not a refinement) so user can jump freely without counts shifting.
  const ctryCounts = useMemo(() => countryCountsFn(allPlaces), [allPlaces]);

  const sortedCategories = useMemo(() => {
    return Object.keys(CATEGORY_LABELS)
      .map((slug) => ({ slug, count: catCounts.get(slug) ?? 0 }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [catCounts]);

  const sortedCountries = useMemo(() => {
    return [...ctryCounts.entries()]
      .filter(([c]) => c !== "unknown")
      .sort((a, b) => b[1] - a[1]);
  }, [ctryCounts]);

  const visibleCategories = showAllCategories
    ? sortedCategories
    : sortedCategories.slice(0, 8);

  const setStatus = (s: PlaceFilter["status"]) =>
    onChange({ ...filter, status: filter.status === s ? undefined : s });
  const setCategory = (c: string) =>
    onChange({ ...filter, category: filter.category === c ? undefined : c });
  const setCountry = (c: string | undefined) =>
    onChange({ ...filter, country: c });
  const setSearch = (s: string) =>
    onChange({ ...filter, search: s === "" ? undefined : s });

  const hasAny = Boolean(
    filter.status ?? filter.category ?? filter.country ?? filter.search,
  );

  return (
    <div className="border-b-[1.5px] border-[rgba(59,35,20,0.08)] bg-[#F5EBD9]">
      <div className="px-4 py-3 flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#7A5C42] pointer-events-none" />
          <input
            type="text"
            value={filter.search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search places..."
            className="pl-8 pr-3 py-[6px] w-[200px] bg-white/60 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-full text-[12px] text-[#3B2314] outline-none focus:border-[#D4581A] placeholder:text-[#7A5C42] font-sans"
          />
        </div>

        <div className="h-5 w-px bg-[rgba(59,35,20,0.15)] mx-1" />

        {!hideCountry && (
          <>
            <Picker
              value={filter.country}
              onChange={setCountry}
              options={sortedCountries.map(([slug, count]) => ({
                value: slug,
                label: countryLabel(slug),
                count,
              }))}
              placeholder="All countries"
              clearLabel={`All countries (${allPlaces.length})`}
              searchable
              contentWidth={260}
            />
            <div className="h-5 w-px bg-[rgba(59,35,20,0.15)] mx-1" />
          </>
        )}

        {/* Status chips */}
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={`px-3 py-[5px] rounded-full text-[12px] font-medium font-sans transition-all cursor-pointer border-[1.5px] ${
              filter.status === s.value
                ? "bg-[#3B2314] text-[#F5EBD9] border-[#3B2314]"
                : "bg-transparent text-[#7A5C42] border-[rgba(59,35,20,0.15)] hover:border-[#D4581A] hover:text-[#D4581A]"
            }`}
          >
            {s.label}
          </button>
        ))}

        {hasAny && (
          <>
            <div className="h-5 w-px bg-[rgba(59,35,20,0.15)] mx-1" />
            <button
              onClick={() => onChange({})}
              className="text-[11px] text-[#7A5C42] hover:text-[#D4581A] cursor-pointer flex items-center gap-1 px-2 py-1"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          </>
        )}
      </div>

      {/* Category row */}
      <div className="px-4 pb-3 flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold mr-1">
          Category
        </span>
        {visibleCategories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug)}
            className={`px-3 py-[4px] rounded-full text-[11px] font-medium font-sans transition-all cursor-pointer border ${
              filter.category === c.slug
                ? "bg-[#D4581A] text-white border-[#D4581A]"
                : "bg-transparent text-[#7A5C42] border-[rgba(59,35,20,0.15)] hover:border-[#D4581A] hover:text-[#D4581A]"
            }`}
          >
            {categoryLabel(c.slug)}
            <span className="ml-1 opacity-60 font-mono text-[10px]">
              {c.count}
            </span>
          </button>
        ))}
        {sortedCategories.length > 8 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="text-[11px] text-[#D4581A] hover:opacity-70 cursor-pointer font-medium"
          >
            {showAllCategories ? "Show less" : `+${sortedCategories.length - 8} more`}
          </button>
        )}
      </div>
    </div>
  );
}
