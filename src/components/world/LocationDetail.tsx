"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink, Copy, Check } from "lucide-react";
import { type Location, type NoteEntry, locations } from "@/data/world-data";
import {
  WORLD_INDEX,
  bboxFromViewport,
  countPlacesInBbox,
} from "@/lib/world-places";
import { PlaceExplorer } from "./PlaceExplorer";
import type { PlaceFilter } from "@/types/world";
import type { EnrichedResource } from "@/lib/resources";

function NoteCard({ note }: { note: NoteEntry }) {
  const [copied, setCopied] = useState(false);

  const displayUrl = note.url
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(note.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="bg-[#F5EBD9] rounded-xl p-5 border-[1.5px] border-[rgba(59,35,20,0.08)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(59,35,20,0.08)] hover:border-[#D4581A] flex flex-col">
      <span className="inline-block self-start text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold px-2 py-[3px] bg-[rgba(212,88,26,0.08)] rounded mb-[10px]">
        {note.category}
      </span>
      <h3 className="font-serif text-[15px] font-bold mb-[6px] leading-[1.3]">
        {note.title}
      </h3>
      <p className="text-[13px] text-[#7A5C42] leading-[1.55] mb-[10px]">
        {note.description}
      </p>
      <div className="mt-auto flex items-center gap-[6px] pt-[10px] border-t border-[rgba(59,35,20,0.06)] text-[11px] text-[#7A5C42] overflow-hidden">
        <a
          href={note.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D4581A] text-[11px] no-underline hover:underline truncate"
        >
          {displayUrl}
        </a>
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <button
            onClick={copyUrl}
            className="cursor-pointer p-1 text-[#7A5C42] hover:text-[#D4581A] transition-colors rounded"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
          <a
            href={note.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-[#7A5C42] hover:text-[#D4581A] transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  resource,
  onTopicClick,
}: {
  resource: EnrichedResource;
  onTopicClick?: (topic: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const displayUrl = resource.url
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(resource.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="bg-[#F5EBD9] rounded-xl p-5 border-[1.5px] border-[rgba(59,35,20,0.08)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(59,35,20,0.08)] hover:border-[#D4581A] flex flex-col">
      <span className="inline-block self-start text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold px-2 py-[3px] bg-[rgba(212,88,26,0.08)] rounded mb-[10px]">
        {resource.category}
      </span>
      <h3 className="font-serif text-[15px] font-bold mb-[6px] leading-[1.3]">
        {resource.title}
      </h3>
      <p className="text-[13px] text-[#7A5C42] leading-[1.55] mb-[10px]">
        {resource.description}
      </p>
      {resource.topics.length > 0 && (
        <div className="flex flex-wrap gap-[5px] mb-[10px]">
          {resource.topics.slice(0, 5).map((t) =>
            onTopicClick ? (
              <button
                key={t}
                onClick={() => onTopicClick(t)}
                className="cursor-pointer text-[10px] text-[#7A5C42] bg-[rgba(59,35,20,0.06)] hover:bg-[rgba(212,88,26,0.15)] hover:text-[#D4581A] px-[7px] py-[2px] rounded-full font-mono transition-colors"
              >
                {t}
              </button>
            ) : (
              <span
                key={t}
                className="text-[10px] text-[#7A5C42] bg-[rgba(59,35,20,0.06)] px-[7px] py-[2px] rounded-full font-mono"
              >
                {t}
              </span>
            ),
          )}
        </div>
      )}
      <div className="mt-auto flex items-center gap-[6px] pt-[10px] border-t border-[rgba(59,35,20,0.06)] text-[11px] text-[#7A5C42] overflow-hidden">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D4581A] text-[11px] no-underline hover:underline truncate"
        >
          {displayUrl}
        </a>
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <button
            onClick={copyUrl}
            className="cursor-pointer p-1 text-[#7A5C42] hover:text-[#D4581A] transition-colors rounded"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-[#7A5C42] hover:text-[#D4581A] transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Build the filter + initial view + live place count for a location.
function deriveExplorerProps(location: Location): {
  filter: PlaceFilter;
  initialViewState: { latitude: number; longitude: number; zoom: number };
  livePlaceCount: number;
  areaFilterLabel: string;
} {
  const initialViewState = {
    latitude: location.viewport.lat,
    longitude: location.viewport.lng,
    zoom: location.viewport.zoom,
  };
  if (location.type === "country") {
    return {
      filter: { country: location.slug },
      initialViewState,
      livePlaceCount: WORLD_INDEX.byCountry[location.slug] ?? 0,
      areaFilterLabel: "Regions",
    };
  }
  // city or region: bbox-filter based on viewport
  const bbox = bboxFromViewport(location.viewport);
  return {
    filter: { bbox },
    initialViewState,
    livePlaceCount: countPlacesInBbox(bbox),
    areaFilterLabel: location.type === "city" ? "Neighborhoods" : "Areas",
  };
}

export function LocationDetail({
  location,
  resources,
}: {
  location: Location;
  resources: EnrichedResource[];
}) {
  const [noteSearch, setNoteSearch] = useState("");
  const [activeNoteCategory, setActiveNoteCategory] = useState("All");
  const [resourceSearch, setResourceSearch] = useState("");
  const [activeResourceCategory, setActiveResourceCategory] = useState("All");

  const parent = location.parentSlug
    ? locations.find((l) => l.slug === location.parentSlug)
    : null;

  const explorer = useMemo(() => deriveExplorerProps(location), [location]);

  // Derive note categories from notes
  const noteCategories = useMemo(() => {
    if (location.notes.length === 0) return [];
    const cats = new Set(location.notes.map((n) => n.category));
    return ["All", ...cats];
  }, [location.notes]);

  const filteredNotes = useMemo(() => {
    let notes = location.notes;
    if (activeNoteCategory !== "All") {
      notes = notes.filter((n) => n.category === activeNoteCategory);
    }
    if (noteSearch.trim()) {
      const q = noteSearch.toLowerCase();
      notes = notes.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q),
      );
    }
    return notes;
  }, [location.notes, activeNoteCategory, noteSearch]);

  const noteCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: location.notes.length };
    for (const note of location.notes) {
      counts[note.category] = (counts[note.category] ?? 0) + 1;
    }
    return counts;
  }, [location.notes]);

  // ── Resource derivations: same shape as notes, sourced from enriched JSON ──
  const resourceCategories = useMemo(() => {
    if (resources.length === 0) return [];
    const cats = new Set(resources.map((r) => r.category));
    return ["All", ...cats];
  }, [resources]);

  const filteredResources = useMemo(() => {
    let rs = resources;
    if (activeResourceCategory !== "All") {
      rs = rs.filter((r) => r.category === activeResourceCategory);
    }
    if (resourceSearch.trim()) {
      const q = resourceSearch.toLowerCase();
      rs = rs.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.topics.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return rs;
  }, [resources, activeResourceCategory, resourceSearch]);

  const resourceCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: resources.length };
    for (const r of resources) {
      counts[r.category] = (counts[r.category] ?? 0) + 1;
    }
    return counts;
  }, [resources]);

  const metaEntries = Object.entries(location.meta);

  return (
    <div className="h-full overflow-y-auto px-6 py-9 md:px-12 pb-16">
      {/* ── Header ── */}
      <div className="mb-7 pb-5 border-b-2 border-[#3B2314]">
        {parent && (
          <div className="text-[13px] text-[#7A5C42] mb-2">
            <Link
              href={`/world/${parent.slug}`}
              className="text-[#D4581A] no-underline hover:underline"
            >
              {parent.name}
            </Link>
            {" / "}
            {location.name}
          </div>
        )}

        <h1 className="font-serif text-[32px] md:text-[42px] font-black mb-[10px] text-[#3B2314]">
          {location.name}
        </h1>

        <div className="flex flex-wrap gap-6 md:gap-8">
          {metaEntries.map(([label, value]) => (
            <div key={label}>
              <div className="text-[11px] uppercase tracking-[1px] text-[#D4581A] font-semibold mb-[2px]">
                {label}
              </div>
              <div className="text-[14px]">
                {value.startsWith("http") || value === "#" ? (
                  <a
                    href={value === "#" ? undefined : value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4581A] no-underline font-medium hover:opacity-70 transition-opacity"
                  >
                    {label === "Photos" ? "View album →" : value}
                  </a>
                ) : (
                  value
                )}
              </div>
            </div>
          ))}
          {explorer.livePlaceCount > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-[1px] text-[#D4581A] font-semibold mb-[2px]">
                Places
              </div>
              <div className="text-[14px] font-mono">{explorer.livePlaceCount}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Embedded explorer: map + filterable list, scoped to this location.
          `key` forces a clean remount when navigating between locations so
          internal state (selection, hover, area chip) doesn't bleed across.
          Hidden for locations with no places (resource-only countries). ── */}
      {explorer.livePlaceCount > 0 && (
        <div className="h-[640px] rounded-2xl overflow-hidden border-[1.5px] border-[rgba(59,35,20,0.08)] mb-9">
          <PlaceExplorer
            key={location.slug}
            initialFilter={explorer.filter}
            initialViewState={explorer.initialViewState}
            areaFilters={location.areaFilters}
            areaFilterLabel={explorer.areaFilterLabel}
          />
        </div>
      )}

      {/* ── Notes section ── */}
      {location.notes.length > 0 && (
        <div>
          <div className="flex h-[6px] rounded-[3px] overflow-hidden my-9">
            <div className="flex-1 bg-[#3B2314]" />
            <div className="flex-1 bg-[#D4581A]" />
            <div className="flex-1 bg-[#E8941A]" />
            <div className="flex-1 bg-[#E8C95A]" />
          </div>
          <h2 className="font-serif text-[24px] font-bold mb-4">Notes</h2>

          <div className="flex gap-3 mb-4 items-center flex-wrap">
            <input
              type="text"
              value={noteSearch}
              onChange={(e) => setNoteSearch(e.target.value)}
              placeholder="Search notes..."
              className="flex-1 max-w-[280px] px-[14px] py-2 bg-[#F5EBD9] border-[1.5px] border-[rgba(59,35,20,0.08)] rounded-[10px] text-[13px] text-[#3B2314] outline-none focus:border-[#D4581A] placeholder:text-[#7A5C42] font-sans"
            />
            <div className="flex gap-[6px] flex-wrap">
              {noteCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveNoteCategory(cat)}
                  className={`px-3 py-[5px] border-[1.5px] rounded-full text-[12px] font-medium font-sans transition-all duration-150 cursor-pointer ${
                    activeNoteCategory === cat
                      ? "bg-[#3B2314] text-[#F5EBD9] border-[#3B2314]"
                      : "bg-transparent text-[#7A5C42] border-[#3B2314] hover:border-[#D4581A] hover:text-[#D4581A]"
                  }`}
                >
                  {cat}
                  <span className="font-mono text-[10px] ml-[3px] opacity-70">
                    {noteCategoryCounts[cat] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="font-mono text-[11px] text-[#7A5C42] text-right mb-3">
            {filteredNotes.length}{" "}
            {filteredNotes.length === 1 ? "note" : "notes"}
          </div>

          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
              {filteredNotes.map((note, i) => (
                <NoteCard key={i} note={note} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#7A5C42] text-[14px] italic">
              No notes found
            </div>
          )}
        </div>
      )}

      {/* ── Reading & References: enriched resources tagged with this location ── */}
      {resources.length > 0 && (
        <>
          <div className="flex h-[6px] rounded-[3px] overflow-hidden my-9">
            <div className="flex-1 bg-[#3B2314]" />
            <div className="flex-1 bg-[#D4581A]" />
            <div className="flex-1 bg-[#E8941A]" />
            <div className="flex-1 bg-[#E8C95A]" />
          </div>

          <div>
            <h2 className="font-serif text-[24px] font-bold mb-4">
              Reading &amp; References
            </h2>

            <div className="flex gap-3 mb-4 items-center flex-wrap">
              <input
                type="text"
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
                placeholder="Search resources..."
                className="flex-1 max-w-[280px] px-[14px] py-2 bg-[#F5EBD9] border-[1.5px] border-[rgba(59,35,20,0.08)] rounded-[10px] text-[13px] text-[#3B2314] outline-none focus:border-[#D4581A] placeholder:text-[#7A5C42] font-sans"
              />
              <div className="flex gap-[6px] flex-wrap">
                {resourceCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveResourceCategory(cat)}
                    className={`px-3 py-[5px] border-[1.5px] rounded-full text-[12px] font-medium font-sans transition-all duration-150 cursor-pointer ${
                      activeResourceCategory === cat
                        ? "bg-[#3B2314] text-[#F5EBD9] border-[#3B2314]"
                        : "bg-transparent text-[#7A5C42] border-[#3B2314] hover:border-[#D4581A] hover:text-[#D4581A]"
                    }`}
                  >
                    {cat}
                    <span className="font-mono text-[10px] ml-[3px] opacity-70">
                      {resourceCategoryCounts[cat] ?? 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="font-mono text-[11px] text-[#7A5C42] text-right mb-3">
              {filteredResources.length}{" "}
              {filteredResources.length === 1 ? "resource" : "resources"}
            </div>

            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                {filteredResources.map((r) => (
                  <ResourceCard
                    key={r.id}
                    resource={r}
                    onTopicClick={(t) => setResourceSearch(t)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-[#7A5C42] text-[14px] italic">
                No resources match this filter
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
