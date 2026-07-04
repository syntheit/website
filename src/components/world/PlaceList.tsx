"use client";

import { memo, useEffect, useRef } from "react";
import { MapPin, Heart, Check } from "lucide-react";
import type { Place } from "@/types/world";
import { categoryLabel, countryLabel } from "@/lib/world-places";

interface Props {
  places: Place[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

function PlaceListInner({ places, selectedId, onSelect, onHover }: Props) {
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  // When the selection changes (e.g. from a pin click), bring the matching
  // list row into view. Querying the DOM by data-attribute is safer than the
  // prior ref-on-conditional-element pattern, which left a stale ref when the
  // selected item was filtered out.
  useEffect(() => {
    if (!selectedId) return;
    const root = scrollRootRef.current;
    if (!root) return;
    const el = root.querySelector<HTMLElement>(`[data-place-id="${CSS.escape(selectedId)}"]`);
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedId, places]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[rgba(59,35,20,0.08)] flex items-baseline justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold">
            Places
          </div>
          <div className="font-mono text-[13px] text-[#3B2314]">
            {places.length.toLocaleString()}{" "}
            {places.length === 1 ? "match" : "matches"}
          </div>
        </div>
      </div>

      <div
        ref={scrollRootRef}
        className="flex-1 overflow-y-auto overscroll-contain"
      >
        {places.length === 0 ? (
          <div className="px-6 py-12 text-center text-[13px] text-[#7A5C42] italic">
            No places match your filters.
          </div>
        ) : (
          <ul>
            {places.map((p) => (
              <li key={p.id}>
                <button
                  data-place-id={p.id}
                  onClick={() => onSelect(p.id)}
                  onMouseEnter={() => onHover(p.id)}
                  onMouseLeave={() => onHover(null)}
                  className={`w-full text-left px-4 py-3 border-b border-[rgba(59,35,20,0.06)] cursor-pointer transition-colors ${
                    p.id === selectedId
                      ? "bg-[rgba(212,88,26,0.1)]"
                      : "hover:bg-[rgba(59,35,20,0.04)]"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-[14px] font-bold text-[#3B2314] leading-tight truncate">
                        {p.name}
                      </div>
                      {p.address && (
                        <div className="text-[11px] text-[#7A5C42] mt-[2px] truncate flex items-center gap-1">
                          <MapPin className="h-2.5 w-2.5 shrink-0" />
                          {p.address}
                        </div>
                      )}
                      {p.note && (
                        <div className="text-[11px] text-[#3B2314] italic mt-[4px] line-clamp-2 leading-snug">
                          {p.note}
                        </div>
                      )}
                      <div className="flex items-center gap-[6px] mt-[6px] flex-wrap">
                        {p.category && (
                          <span className="text-[10px] uppercase tracking-[1px] text-[#D4581A] font-semibold">
                            {categoryLabel(p.category)}
                          </span>
                        )}
                        <span className="text-[10px] text-[#7A5C42]">·</span>
                        <span className="text-[10px] text-[#7A5C42]">
                          {countryLabel(p.country)}
                        </span>
                        {p.status === "visited" && (
                          <Check
                            className="h-3 w-3 text-[#5C8B5C]"
                            aria-label="visited"
                          />
                        )}
                        {p.status === "favorite" && (
                          <Heart
                            className="h-3 w-3 fill-[#D4581A] text-[#D4581A]"
                            aria-label="favorite"
                          />
                        )}
                        {p.status === "want-to-go" && (
                          <span
                            className="text-[10px] italic text-[#7A5C42]"
                            aria-label="want to go"
                          >
                            want to go
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Memoized so hover-state churn at the parent doesn't cascade into re-rendering
// every row in a 84+ item list. Only re-renders when `places` or `selectedId`
// actually change (onSelect/onHover from useState are stable references).
export const PlaceList = memo(PlaceListInner);
