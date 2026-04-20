"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink, Copy, Check } from "lucide-react";
import { type Location, type NoteEntry, locations } from "@/data/world-data";
import { getMapListsById, type MapList } from "@/data/world-maps";

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

function MapEmbed({
  location,
  lists,
}: {
  location: Location;
  lists: MapList[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>(
    location.availableCategories[0] ?? "",
  );
  const [activeStatus, setActiveStatus] = useState<"visited" | "recommended">(
    "visited",
  );

  const categoryLists = useMemo(() => {
    const map: Record<string, MapList[]> = {};
    for (const cat of location.availableCategories) {
      map[cat] = lists.filter((l) => l.label === cat);
    }
    return map;
  }, [location.availableCategories, lists]);

  const currentCatLists = categoryLists[activeCategory] ?? [];
  const hasSubToggle = currentCatLists.length > 1;
  const activeList =
    currentCatLists.find((l) => l.status === activeStatus) ??
    currentCatLists[0];

  const hasUrl = activeList && activeList.googleMapsUrl !== "URL_HERE";

  return (
    <div className="mb-6">
      {/* Category toggles */}
      <div className="flex items-center gap-3 mb-[10px] flex-wrap">
        <div className="text-[11px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold mr-1">
          Google Maps lists
        </div>
        <div className="flex gap-[6px] flex-wrap">
          {location.availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                const catLists = categoryLists[cat] ?? [];
                if (!catLists.some((l) => l.status === activeStatus)) {
                  setActiveStatus(
                    catLists[0]?.status === "recommended"
                      ? "recommended"
                      : "visited",
                  );
                }
              }}
              className={`px-3 py-[5px] border-[1.5px] rounded-full text-[12px] font-medium font-sans transition-all duration-150 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#D4581A] text-white border-[#D4581A]"
                  : "bg-transparent text-[#7A5C42] border-[rgba(59,35,20,0.2)] hover:border-[#D4581A] hover:text-[#D4581A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Visited / Recommended sub-toggle */}
      {hasSubToggle && (
        <div className="flex gap-[6px] mb-3">
          {(["visited", "recommended"] as const).map((status) => {
            const exists = currentCatLists.some((l) => l.status === status);
            if (!exists) return null;
            return (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-3 py-[4px] rounded-full text-[11px] font-medium font-sans transition-all duration-150 cursor-pointer capitalize ${
                  activeStatus === status
                    ? "bg-[#3B2314] text-[#F5EBD9]"
                    : "bg-transparent text-[#7A5C42] border border-[#3B2314] hover:text-[#D4581A] hover:border-[#D4581A]"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      )}

      {/* List open card */}
      <div className="bg-[#F5EBD9] rounded-2xl border-[1.5px] border-[rgba(59,35,20,0.08)] px-6 py-5 mb-9 flex items-center justify-between gap-4">
        <div>
          <div className="text-[15px] font-serif font-bold text-[#3B2314]">
            {activeCategory}
            {hasSubToggle && (
              <span className="text-[13px] font-sans font-normal text-[#7A5C42] ml-2">
                · {activeStatus}
              </span>
            )}
          </div>
          <div className="text-[13px] text-[#7A5C42] mt-[2px]">
            Saved places on Google Maps
          </div>
        </div>
        {hasUrl ? (
          <a
            href={activeList.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[6px] shrink-0 px-4 py-[9px] bg-[#3B2314] text-[#F5EBD9] text-[13px] font-medium rounded-xl no-underline hover:bg-[#D4581A] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open in Google Maps
          </a>
        ) : (
          <span className="shrink-0 px-4 py-[9px] text-[#7A5C42] text-[13px] italic">
            Coming soon
          </span>
        )}
      </div>
    </div>
  );
}

export function LocationDetail({ location }: { location: Location }) {
  const [noteSearch, setNoteSearch] = useState("");
  const [activeNoteCategory, setActiveNoteCategory] = useState("All");

  const parent = location.parentSlug
    ? locations.find((l) => l.slug === location.parentSlug)
    : null;

  const lists = useMemo(
    () => getMapListsById(location.availableLists),
    [location.availableLists],
  );

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

  const renderName = () => {
    if (!location.nameAccent) return location.name;
    const idx = location.name.indexOf(location.nameAccent);
    if (idx === -1) return location.name;
    return (
      <>
        {location.name.slice(0, idx)}
        <span className="text-[#D4581A] italic">{location.nameAccent}</span>
        {location.name.slice(idx + location.nameAccent.length)}
      </>
    );
  };

  // Render meta entries
  const metaEntries = Object.entries(location.meta);

  return (
    <div className="px-6 py-9 md:px-12 pb-16">
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

        <h1 className="font-serif text-[32px] md:text-[42px] font-black mb-[10px]">
          {renderName()}
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
          {location.placeCount != null && (
            <div>
              <div className="text-[11px] uppercase tracking-[1px] text-[#D4581A] font-semibold mb-[2px]">
                Places
              </div>
              <div className="text-[14px] font-mono">{location.placeCount}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Map section ── */}
      {location.availableCategories.length > 0 && (
        <MapEmbed location={location} lists={lists} />
      )}

      {/* ── Area filters ── */}
      {location.areaFilters && location.areaFilters.length > 0 && (
        <div className="mb-7">
          <div className="text-[11px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold mb-[10px]">
            {location.type === "city"
              ? "Filter by neighborhood"
              : location.type === "region"
                ? "Filter by area"
                : "Filter by region"}
          </div>
          <div className="flex gap-2 flex-wrap">
            {location.areaFilters.map((f) => (
              <button
                key={f.label}
                className="px-4 py-[7px] border-[1.5px] rounded-full text-[13px] font-medium font-sans transition-all duration-150 cursor-default select-none bg-transparent text-[#7A5C42] border-[#3B2314] hover:border-[#D4581A] hover:text-[#D4581A]"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Stripe divider ── */}
      <div className="flex h-[6px] rounded-[3px] overflow-hidden my-9">
        <div className="flex-1 bg-[#3B2314]" />
        <div className="flex-1 bg-[#D4581A]" />
        <div className="flex-1 bg-[#E8941A]" />
        <div className="flex-1 bg-[#E8C95A]" />
      </div>

      {/* ── Notes section ── */}
      {location.notes.length > 0 ? (
        <div>
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
      ) : (
        <div className="text-center py-16 text-[#7A5C42]">
          <p className="text-[16px] font-medium mb-2">No notes yet</p>
          <p className="text-[13px]">
            Notes and resources for {location.name} will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
