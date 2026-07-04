"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Pencil, EyeOff, Eye, ExternalLink, Copy, Tag } from "lucide-react";
import type { Place, PlaceFilter, PlaceStatus, List } from "@/types/world";
import type { PlaceOverride, OverridesMap } from "@/lib/admin/override";
import { applyOverride } from "@/lib/admin/override";
import {
  categoryLabel,
  countryLabel,
  CATEGORY_LABELS,
} from "@/lib/world-places";
import { filterPlaces, countryCounts } from "@/lib/place-filter";
import { Picker } from "@/components/ui/picker";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuLabel,
} from "@/components/ui/context-menu";
import { AdminEditDrawer } from "./AdminEditDrawer";

const STATUS_OPTIONS: { value: PlaceStatus; label: string }[] = [
  { value: "visited", label: "Visited" },
  { value: "want-to-go", label: "Want to go" },
  { value: "favorite", label: "Favorite" },
  { value: "unknown", label: "Unknown" },
];

type StatusFilter = PlaceStatus | undefined;
type NoteFilter = "has-note" | "no-note" | undefined;
type HiddenFilter = "visible" | "hidden" | "any";

interface Props {
  places: Place[];
  lists: List[];
  initialOverrides: OverridesMap;
}

interface MergedRow {
  raw: Place;
  place: Place; // raw with override applied — for display/filtering
  ov?: PlaceOverride;
}

export function AdminPlacesBrowser({ places, lists, initialOverrides }: Props) {
  const [overrides, setOverrides] = useState<OverridesMap>(initialOverrides);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [status, setStatus] = useState<StatusFilter>(undefined);
  const [listFilter, setListFilter] = useState<string | undefined>();
  const [noteFilter, setNoteFilter] = useState<NoteFilter>(undefined);
  const [hiddenFilter, setHiddenFilter] = useState<HiddenFilter>("visible");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // ── URL state ──
  // Mount-time hydration from search params, then mirror filter state back to
  // the URL so a filtered view (e.g. ?list=restaurants) is shareable + back-
  // button-friendly. Lets context-menu items in AdminListsBrowser deep-link
  // here with a list pre-selected.
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const q = sp.get("q");
    if (q) setSearch(q);
    const c = sp.get("country");
    if (c) setCountry(c);
    const cat = sp.get("category");
    if (cat) setCategory(cat);
    const st = sp.get("status");
    if (st) setStatus(st as PlaceStatus);
    const lf = sp.get("list");
    if (lf) setListFilter(lf);
    const nf = sp.get("note");
    if (nf === "has-note" || nf === "no-note") setNoteFilter(nf);
    const vis = sp.get("vis");
    if (vis === "visible" || vis === "hidden" || vis === "any")
      setHiddenFilter(vis);
  }, []);

  const skipFirstUrlWrite = useRef(true);
  useEffect(() => {
    if (skipFirstUrlWrite.current) {
      skipFirstUrlWrite.current = false;
      return;
    }
    const sp = new URLSearchParams();
    if (search.trim()) sp.set("q", search.trim());
    if (country) sp.set("country", country);
    if (category) sp.set("category", category);
    if (status) sp.set("status", status);
    if (listFilter) sp.set("list", listFilter);
    if (noteFilter) sp.set("note", noteFilter);
    if (hiddenFilter !== "visible") sp.set("vis", hiddenFilter);
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [
    search,
    country,
    category,
    status,
    listFilter,
    noteFilter,
    hiddenFilter,
    pathname,
    router,
  ]);

  const listLabelById = useMemo(() => {
    const m = new Map<string, string>();
    for (const l of lists) m.set(l.id, l.label);
    return m;
  }, [lists]);

  const merged: MergedRow[] = useMemo(
    () =>
      places.map((p) => {
        const ov = overrides[p.id];
        return ov ? { raw: p, place: applyOverride(p, ov), ov } : { raw: p, place: p };
      }),
    [places, overrides],
  );

  const filtered: MergedRow[] = useMemo(() => {
    const placeFilter: PlaceFilter = {
      country,
      category,
      status,
      search: search.trim() || undefined,
    };
    const passingIds = new Set(
      filterPlaces(
        merged.map((m) => m.place),
        placeFilter,
      ).map((p) => p.id),
    );
    return merged.filter(({ place, ov }) => {
      if (!passingIds.has(place.id)) return false;
      if (listFilter && !place.listIds.includes(listFilter)) return false;
      if (noteFilter === "has-note" && !ov?.note) return false;
      if (noteFilter === "no-note" && ov?.note) return false;
      if (hiddenFilter === "visible" && ov?.hidden) return false;
      if (hiddenFilter === "hidden" && !ov?.hidden) return false;
      return true;
    });
  }, [merged, search, country, category, status, listFilter, noteFilter, hiddenFilter]);

  const countryOptions = useMemo(() => {
    const counts = countryCounts(places);
    counts.delete("unknown");
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([slug, count]) => ({
        value: slug,
        label: countryLabel(slug),
        count,
      }));
  }, [places]);

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const { place } of merged) {
      for (const c of place.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    return Object.keys(CATEGORY_LABELS)
      .map((slug) => ({
        value: slug,
        label: categoryLabel(slug),
        count: counts.get(slug) ?? 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [merged]);

  const listOptions = useMemo(
    () =>
      lists
        .filter((l) => l.placeCount > 0)
        .map((l) => ({ value: l.id, label: l.label, count: l.placeCount }))
        .sort((a, b) => b.count - a.count),
    [lists],
  );

  const statusOptions = [
    { value: "visited", label: "Visited" },
    { value: "want-to-go", label: "Want to Go" },
    { value: "favorite", label: "Favorite" },
    { value: "unknown", label: "Unknown" },
  ];

  const noteOptions = [
    { value: "has-note", label: "Has note" },
    { value: "no-note", label: "No note" },
  ];

  const hiddenOptions = [
    { value: "visible", label: "Visible only" },
    { value: "hidden", label: "Hidden only" },
    { value: "any", label: "All (incl. hidden)" },
  ];

  const selectedRow = useMemo(
    () => (selectedId ? merged.find((m) => m.place.id === selectedId) : undefined),
    [selectedId, merged],
  );

  const counts = useMemo(() => {
    let withNote = 0;
    let hidden = 0;
    for (const { ov } of merged) {
      if (ov?.note) withNote++;
      if (ov?.hidden) hidden++;
    }
    return { total: places.length, filtered: filtered.length, withNote, hidden };
  }, [merged, filtered.length, places.length]);

  const handleSave = useCallback(
    (placeId: string, patch: Partial<PlaceOverride>) => {
      startTransition(async () => {
        const res = await fetch(
          `/api/admin/overrides/${encodeURIComponent(placeId)}`,
          {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(patch),
          },
        );
        if (!res.ok) {
          console.error("Save failed", await res.text());
          return;
        }
        const { override } = (await res.json()) as {
          override: PlaceOverride | null;
        };
        setOverrides((prev) => {
          const next = { ...prev };
          if (override === null) delete next[placeId];
          else next[placeId] = override;
          return next;
        });
      });
    },
    [],
  );

  const clearAll = () => {
    setSearch("");
    setCountry(undefined);
    setCategory(undefined);
    setStatus(undefined);
    setListFilter(undefined);
    setNoteFilter(undefined);
    setHiddenFilter("visible");
  };

  const hasActiveFilter =
    Boolean(search.trim()) ||
    !!country ||
    !!category ||
    !!status ||
    !!listFilter ||
    !!noteFilter ||
    hiddenFilter !== "visible";

  return (
    <div className="flex h-[calc(100vh-49px)]">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-4 py-3 border-b border-[rgba(59,35,20,0.08)] bg-[#F5EBD9] flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, address, note…"
            className="w-[240px] px-3 py-[6px] bg-white/70 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-full text-[12px] outline-none focus:border-[#D4581A]"
          />
          <Picker
            value={country}
            onChange={setCountry}
            options={countryOptions}
            placeholder="All countries"
            clearLabel={`All countries (${places.length})`}
            searchable
            contentWidth={260}
          />
          <Picker
            value={category}
            onChange={setCategory}
            options={categoryOptions}
            placeholder="Any category"
            clearLabel="Any category"
          />
          <Picker
            value={status}
            onChange={(v) => setStatus(v as StatusFilter)}
            options={statusOptions}
            placeholder="Any status"
            clearLabel="Any status"
          />
          <Picker
            value={listFilter}
            onChange={setListFilter}
            options={listOptions}
            placeholder="Any list"
            clearLabel="Any list"
            searchable
            contentWidth={280}
          />
          <Picker
            value={noteFilter}
            onChange={(v) => setNoteFilter(v as NoteFilter)}
            options={noteOptions}
            placeholder="Any (notes)"
            clearLabel="Any (notes)"
          />
          <Picker
            value={hiddenFilter}
            onChange={(v) => setHiddenFilter((v as HiddenFilter) ?? "visible")}
            options={hiddenOptions}
            placeholder="Visible only"
          />
          {hasActiveFilter && (
            <button
              onClick={clearAll}
              className="text-[11px] text-[#7A5C42] hover:text-[#D4581A] cursor-pointer px-2 py-1"
            >
              Clear all
            </button>
          )}
          <div className="ml-auto text-[12px] font-mono text-[#7A5C42]">
            {counts.filtered.toLocaleString()} / {counts.total.toLocaleString()}
            <span className="mx-2 opacity-50">·</span>
            {counts.withNote} noted
            <span className="mx-2 opacity-50">·</span>
            {counts.hidden} hidden
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-[12px]">
            <thead className="sticky top-0 bg-[#E0CBA8] text-[10px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold z-10">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Country</th>
                <th className="px-4 py-2 text-left">Categories</th>
                <th className="px-4 py-2 text-left">Lists</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Note</th>
                <th className="px-4 py-2 text-left">Flags</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ place, ov }) => (
                <ContextMenu key={place.id}>
                  <ContextMenuTrigger asChild>
                <tr
                  onClick={() => setSelectedId(place.id)}
                  className={`border-b border-[rgba(59,35,20,0.05)] cursor-pointer transition-colors ${
                    selectedId === place.id
                      ? "bg-[rgba(212,88,26,0.1)]"
                      : "hover:bg-[rgba(59,35,20,0.04)]"
                  }`}
                >
                  <td className="px-4 py-2 align-top">
                    <div className="font-medium text-[#3B2314]">{place.name}</div>
                    {place.address && (
                      <div className="text-[10px] text-[#7A5C42] truncate max-w-[400px]">
                        {place.address}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 align-top text-[#7A5C42]">
                    {countryLabel(place.country)}
                  </td>
                  <td className="px-4 py-2 align-top">
                    {place.categories.length === 0 ? (
                      <span className="text-[10px] text-[#7A5C42] opacity-60">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {place.categories.map((c) => (
                          <span
                            key={c}
                            className="px-1.5 py-[1px] rounded bg-[rgba(212,88,26,0.1)] text-[#D4581A] text-[10px] font-medium"
                          >
                            {categoryLabel(c)}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 align-top max-w-[200px]">
                    <div className="flex flex-wrap gap-1">
                      {place.listIds.slice(0, 3).map((lid) => (
                        <span
                          key={lid}
                          className="px-1.5 py-[1px] rounded bg-[rgba(59,35,20,0.06)] text-[#7A5C42] text-[10px]"
                        >
                          {listLabelById.get(lid) ?? lid}
                        </span>
                      ))}
                      {place.listIds.length > 3 && (
                        <span className="text-[10px] text-[#7A5C42] opacity-70">
                          +{place.listIds.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 align-top text-[#7A5C42]">
                    {place.status}
                  </td>
                  <td className="px-4 py-2 align-top max-w-[260px]">
                    <div className="truncate text-[#3B2314]">
                      {ov?.note ?? <span className="text-[#7A5C42] opacity-60">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-2 align-top text-[10px] text-[#7A5C42]">
                    {ov?.hidden && (
                      <span className="px-1.5 py-[1px] rounded bg-[#3B2314] text-[#F5EBD9] mr-1">
                        hidden
                      </span>
                    )}
                    {ov?.rating != null && (
                      <span className="text-[#D4581A]">★{ov.rating}</span>
                    )}
                  </td>
                </tr>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onSelect={() => setSelectedId(place.id)}>
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </ContextMenuItem>
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>
                        <Tag className="h-3.5 w-3.5" /> Set status
                      </ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        <ContextMenuLabel>Current: {place.status}</ContextMenuLabel>
                        {STATUS_OPTIONS.map((s) => (
                          <ContextMenuItem
                            key={s.value}
                            onSelect={() =>
                              handleSave(place.id, { statusOverride: s.value })
                            }
                          >
                            {s.label}
                          </ContextMenuItem>
                        ))}
                        {ov?.statusOverride && (
                          <>
                            <ContextMenuSeparator />
                            <ContextMenuItem
                              onSelect={() =>
                                handleSave(place.id, { statusOverride: undefined })
                              }
                            >
                              Clear status override
                            </ContextMenuItem>
                          </>
                        )}
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuItem
                      onSelect={() =>
                        handleSave(place.id, { hidden: !ov?.hidden })
                      }
                    >
                      {ov?.hidden ? (
                        <>
                          <Eye className="h-3.5 w-3.5" /> Unhide
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3.5 w-3.5" /> Hide
                        </>
                      )}
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem
                      onSelect={() => window.open(place.googleMapsUrl, "_blank")}
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Open in Google Maps
                    </ContextMenuItem>
                    {place.address && (
                      <ContextMenuItem
                        onSelect={() =>
                          void navigator.clipboard.writeText(place.address ?? "")
                        }
                      >
                        <Copy className="h-3.5 w-3.5" /> Copy address
                      </ContextMenuItem>
                    )}
                  </ContextMenuContent>
                </ContextMenu>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-[#7A5C42] italic"
                  >
                    No places match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRow && (
        <AdminEditDrawer
          place={selectedRow.place}
          rawPlace={selectedRow.raw}
          override={selectedRow.ov}
          lists={lists}
          listLabelById={listLabelById}
          onClose={() => setSelectedId(null)}
          onSave={(patch) => handleSave(selectedRow.place.id, patch)}
          saving={isPending}
        />
      )}
    </div>
  );
}
