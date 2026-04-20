"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X, Menu } from "lucide-react";
import { locations, REGION_ORDER } from "@/data/world-data";

const DEFAULT_COLLAPSED = new Set(["Europe", "Asia", "Oceania", "Caribbean"]);

export function WorldSidebar() {
  const pathname = usePathname();
  const activeSlug = pathname.replace("/world/", "") || "argentina";

  const [search, setSearch] = useState("");
  const [collapsedRegions, setCollapsedRegions] = useState<Set<string>>(
    () => new Set(DEFAULT_COLLAPSED),
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const countries = useMemo(
    () => locations.filter((l) => l.type === "country"),
    [],
  );

  const getSubLocations = (countrySlug: string) =>
    locations.filter(
      (l) =>
        (l.type === "city" || l.type === "region") &&
        l.parentSlug === countrySlug,
    );

  const regionGroups = useMemo(() => {
    return REGION_ORDER.map((region) => ({
      name: region,
      countries: countries
        .filter((c) => c.region === region)
        .sort((a, b) => (b.placeCount ?? 0) - (a.placeCount ?? 0)),
    })).filter((g) => g.countries.length > 0);
  }, [countries]);

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return regionGroups;
    const q = search.toLowerCase();
    return regionGroups
      .map((group) => ({
        ...group,
        countries: group.countries.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            locations
              .filter(
                (l) =>
                  (l.type === "city" || l.type === "region") &&
                  l.parentSlug === c.slug,
              )
              .some((sub) => sub.name.toLowerCase().includes(q)),
        ),
      }))
      .filter((g) => g.countries.length > 0);
  }, [search, regionGroups]);

  const totalCountries = countries.length;
  const totalPlaces = locations.reduce((sum, l) => sum + (l.placeCount ?? 0), 0);

  const toggleRegion = (region: string) => {
    setCollapsedRegions((prev) => {
      const next = new Set(prev);
      if (next.has(region)) next.delete(region);
      else next.add(region);
      return next;
    });
  };

  const sidebarContent = (
    <>
      {/* Search */}
      <div className="p-5 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#7A5C42]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search countries or cities..."
            className="w-full pl-9 pr-8 py-[10px] bg-[#F5EBD9] border-[1.5px] border-[rgba(59,35,20,0.08)] rounded-[10px] text-[13px] text-[#3B2314] outline-none focus:border-[#D4581A] placeholder:text-[#7A5C42] font-sans"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C42] hover:text-[#D4581A] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Summary count */}
      <div className="px-5 pb-3 font-mono text-[11px] text-[#7A5C42]">
        {totalCountries} countries · {totalPlaces} places
      </div>

      {/* Region groups */}
      <div className="flex-1 overflow-y-auto pb-5">
        {filteredGroups.map((group) => {
          const isCollapsed = collapsedRegions.has(group.name) && !search;
          return (
            <div key={group.name} className="mb-[2px]">
              <button
                onClick={() => toggleRegion(group.name)}
                className="flex items-center w-full px-5 py-[9px] text-[11px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold hover:bg-[rgba(59,35,20,0.04)] transition-[background] duration-150 cursor-pointer select-none"
              >
                {group.name}
                <span className="font-mono text-[11px] text-[#7A5C42] ml-auto mr-2">
                  {group.countries.length}
                </span>
                <span className="text-[10px] text-[#7A5C42]">
                  {isCollapsed ? "▸" : "▾"}
                </span>
              </button>

              {!isCollapsed &&
                group.countries.map((country) => {
                  const subs = getSubLocations(country.slug);
                  return (
                    <div key={country.slug}>
                      <Link
                        href={`/world/${country.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className={`flex justify-between items-center py-[7px] px-5 pl-8 text-[14px] no-underline transition-all duration-[120ms] ${
                          activeSlug === country.slug
                            ? "bg-[#F5EBD9] text-[#D4581A] font-semibold border-r-[3px] border-r-[#D4581A]"
                            : "text-[#3B2314] hover:bg-[rgba(59,35,20,0.04)] hover:text-[#D4581A]"
                        }`}
                      >
                        {country.name}
                        <span className="font-mono text-[11px] text-[#7A5C42]">
                          {country.placeCount ?? 0}
                        </span>
                      </Link>
                      {subs.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/world/${sub.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className={`flex justify-between items-center py-[6px] px-5 pl-[44px] text-[13px] no-underline transition-all duration-[120ms] ${
                            activeSlug === sub.slug
                              ? "text-[#D4581A] font-semibold bg-[#F5EBD9] border-r-[3px] border-r-[#D4581A]"
                              : "text-[#7A5C42] hover:text-[#D4581A] hover:bg-[rgba(59,35,20,0.04)]"
                          }`}
                        >
                          {sub.name}
                          <span className="font-mono text-[10px] text-[#7A5C42]">
                            {sub.placeCount ?? 0}
                          </span>
                        </Link>
                      ))}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[280px] shrink-0 bg-[#E0CBA8] border-r border-[rgba(59,35,20,0.1)] flex-col overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-5 left-5 z-40 p-3 bg-[#3B2314] text-[#F5EBD9] rounded-full shadow-lg hover:bg-[#D4581A] transition-colors cursor-pointer"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#E0CBA8] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(59,35,20,0.08)]">
              <span className="font-serif text-[18px] font-extrabold text-[#3B2314]">
                World
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-[#7A5C42] hover:text-[#D4581A] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
