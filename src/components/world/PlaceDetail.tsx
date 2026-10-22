"use client";

import { useEffect } from "react";
import {
  X,
  ExternalLink,
  Copy,
  Heart,
  Check,
  Tag,
  Send,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { FiInstagram } from "react-icons/fi";
import type { Place } from "@/types/world";
import { categoryLabel, countryLabel } from "@/lib/world-places";

interface Props {
  place: Place | null;
  onClose: () => void;
}

const ACCESS_LABELS: Record<NonNullable<Place["access"]>, string> = {
  "walk-in": "Walk-in",
  message: "Message ahead",
  delivery: "Delivery",
  appointment: "By appointment",
};

function cultureLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function normalizeContactHref(kind: "telegram" | "instagram", value: string): string {
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  const handle = v.replace(/^@/, "");
  return kind === "telegram"
    ? `https://t.me/${handle}`
    : `https://instagram.com/${handle}`;
}

export function PlaceDetail({ place, onClose }: Props) {
  const [copied, setCopied] = useState<"address" | "url" | null>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!place) return null;

  const copy = async (text: string, which: "address" | "url") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <aside
      className="absolute top-0 right-0 h-full w-[380px] max-w-[90vw] bg-[#F5EBD9] border-l-[1.5px] border-[rgba(59,35,20,0.12)] shadow-[-8px_0_24px_rgba(59,35,20,0.06)] flex flex-col z-20 animate-[slideInRight_180ms_ease-out]"
      style={{
        animation: "slideInRight 180ms ease-out",
      }}
    >
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-[rgba(59,35,20,0.08)] flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-[6px]">
            {place.category && (
              <span className="text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold">
                {categoryLabel(place.category)}
              </span>
            )}
            {place.status === "visited" && (
              <Check className="h-3 w-3 text-[#5C8B5C]" aria-label="visited" />
            )}
            {place.status === "favorite" && (
              <Heart
                className="h-3 w-3 fill-[#D4581A] text-[#D4581A]"
                aria-label="favorite"
              />
            )}
            {place.status === "want-to-go" && (
              <span className="text-[10px] italic text-[#7A5C42]">want to go</span>
            )}
          </div>
          <h2 className="font-serif text-[20px] font-bold text-[#3B2314] leading-tight">
            {place.name}
          </h2>
          <div className="text-[12px] text-[#7A5C42] mt-1">
            {countryLabel(place.country)}
          </div>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1 -m-1 text-[#7A5C42] hover:text-[#D4581A] cursor-pointer transition-colors"
          aria-label="Close detail"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {place.note && (
          <div>
            <div className="text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-1">
              Note
            </div>
            <p className="text-[14px] text-[#3B2314] leading-relaxed">{place.note}</p>
          </div>
        )}

        {place.takeoutNotes.length > 0 && !place.note && (
          <div>
            <div className="text-[10px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold mb-1">
              From Google Maps
            </div>
            <p className="text-[13px] text-[#7A5C42] italic">
              {place.takeoutNotes.join(" · ")}
            </p>
          </div>
        )}

        {place.address && (
          <div>
            <div className="text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-1">
              Address
            </div>
            <div className="flex items-start gap-2">
              <p className="text-[13px] text-[#3B2314] flex-1">{place.address}</p>
              <button
                onClick={() => copy(place.address!, "address")}
                className="shrink-0 p-1 text-[#7A5C42] hover:text-[#D4581A] cursor-pointer transition-colors"
                aria-label="Copy address"
              >
                {copied === "address" ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>
        )}

        {(place.categories.length > 1 || place.tags.length > 0) && (
          <div>
            <div className="text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-1 flex items-center gap-1">
              <Tag className="h-2.5 w-2.5" />
              Also
            </div>
            <div className="flex flex-wrap gap-[6px]">
              {place.categories
                .filter((c) => c !== place.category)
                .map((c) => (
                  <span
                    key={c}
                    className="text-[11px] px-2 py-[2px] bg-[rgba(212,88,26,0.08)] text-[#D4581A] rounded font-medium"
                  >
                    {categoryLabel(c)}
                  </span>
                ))}
              {place.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-[2px] bg-[rgba(59,35,20,0.08)] text-[#3B2314] rounded font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {(place.culture ?? place.access) && (
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {place.culture && (
              <div>
                <div className="text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-1">
                  Culture
                </div>
                <p className="text-[13px] text-[#3B2314]">
                  {cultureLabel(place.culture)}
                </p>
              </div>
            )}
            {place.access && (
              <div>
                <div className="text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-1">
                  Access
                </div>
                <p className="text-[13px] text-[#3B2314]">
                  {ACCESS_LABELS[place.access]}
                </p>
              </div>
            )}
          </div>
        )}

        {place.contacts &&
          (place.contacts.telegram ??
            place.contacts.instagram ??
            place.contacts.googleMaps) && (
            <div>
              <div className="text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-1">
                Contact
              </div>
              <div className="flex flex-col gap-[6px]">
                {place.contacts.telegram && (
                  <a
                    href={normalizeContactHref(
                      "telegram",
                      place.contacts.telegram,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] text-[#3B2314] hover:text-[#D4581A] transition-colors no-underline"
                  >
                    <Send className="h-3.5 w-3.5 text-[#7A5C42]" />
                    {place.contacts.telegram.trim().replace(/^https?:\/\/(t\.me\/)?/i, "").replace(/^@?/, "@")}
                  </a>
                )}
                {place.contacts.instagram && (
                  <a
                    href={normalizeContactHref(
                      "instagram",
                      place.contacts.instagram,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] text-[#3B2314] hover:text-[#D4581A] transition-colors no-underline"
                  >
                    <FiInstagram className="h-3.5 w-3.5 text-[#7A5C42]" />
                    {place.contacts.instagram.trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/\/$/, "").replace(/^@?/, "@")}
                  </a>
                )}
                {place.contacts.googleMaps && (
                  <a
                    href={place.contacts.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] text-[#3B2314] hover:text-[#D4581A] transition-colors no-underline"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#7A5C42]" />
                    Google Maps listing
                  </a>
                )}
              </div>
            </div>
          )}

        <div>
          <div className="text-[10px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-1">
            Coordinates
          </div>
          <p className="text-[12px] text-[#7A5C42] font-mono">
            {place.lat.toFixed(5)}, {place.lng.toFixed(5)}
          </p>
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-5 py-3 border-t border-[rgba(59,35,20,0.08)]">
        <a
          href={place.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-[6px] px-3 py-[10px] bg-[#3B2314] text-[#F5EBD9] text-[13px] font-medium rounded-lg no-underline hover:bg-[#D4581A] transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open in Google Maps
        </a>
      </div>
    </aside>
  );
}
