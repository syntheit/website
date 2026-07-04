import { useState, useEffect, useMemo } from "react";
import {
  ALL_RESOURCES,
  type EnrichedResource,
} from "@/lib/resources";

// Display-side resource shape — adds the topics field so cards can render
// the per-resource tag chips from the enrichment.
export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  topics: string[];
}

// Tabs that match the enriched data's `category` taxonomy. Each tab's count
// is derived live from the dataset.
const TAB_DEFS: { id: string; name: string }[] = [
  { id: "all", name: "All Resources" },
  { id: "wikipedia", name: "Wikipedia" },
  { id: "articles", name: "Articles" },
  { id: "technology", name: "Technology" },
  { id: "youtube", name: "YouTube" },
  { id: "travel", name: "Travel" },
  { id: "coding", name: "Coding" },
  { id: "languages", name: "Languages" },
  { id: "geography", name: "Geography" },
  { id: "business", name: "Business" },
  { id: "history", name: "History" },
  { id: "games", name: "Games" },
  { id: "podcasts", name: "Podcasts" },
  { id: "health", name: "Health" },
  { id: "random", name: "Random" },
];

function toDisplayResource(r: EnrichedResource): Resource {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    url: r.url,
    category: r.category,
    topics: r.topics,
  };
}

// Deterministic shuffle keyed by id — same order across reloads within a
// tab, different per session. Mulberry32-style hash so SSR/CSR match.
function bandShuffle(items: EnrichedResource[], seed: number): EnrichedResource[] {
  const tagged = items.map((r) => {
    let h = seed;
    for (let i = 0; i < r.id.length; i++) {
      h = ((h << 5) - h + r.id.charCodeAt(i)) | 0;
    }
    return { r, k: h >>> 0 };
  });
  tagged.sort((a, b) => a.k - b.k);
  return tagged.map((t) => t.r);
}

export function useResources() {
  const [activeTab, setActiveTab] = useState("all");
  const [displayedCount, setDisplayedCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [shuffleSeed, setShuffleSeed] = useState(1);

  // Re-roll the shuffle once per page load. Done in an effect so SSR sees
  // a stable seed=1 and there's no hydration mismatch.
  useEffect(() => {
    setShuffleSeed(Math.floor(Math.random() * 0x7fffffff) || 1);
  }, []);

  // Pre-sort each quality band, shuffled within. High → medium → low.
  const sortedAll = useMemo(() => {
    const bands: Record<"high" | "medium" | "low", EnrichedResource[]> = {
      high: [],
      medium: [],
      low: [],
    };
    for (const r of ALL_RESOURCES) bands[r.quality].push(r);
    return [
      ...bandShuffle(bands.high, shuffleSeed),
      ...bandShuffle(bands.medium, shuffleSeed + 1),
      ...bandShuffle(bands.low, shuffleSeed + 2),
    ];
  }, [shuffleSeed]);

  // Live counts per tab — drives the pill labels.
  const tabsWithCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_RESOURCES.length };
    for (const r of ALL_RESOURCES) {
      counts[r.category] = (counts[r.category] ?? 0) + 1;
    }
    return TAB_DEFS.filter(
      (t) => t.id === "all" || (counts[t.id] ?? 0) > 0,
    ).map((t) => ({ ...t, count: counts[t.id] ?? 0 }));
  }, []);

  // Filter to active tab, then run search.
  const filtered = useMemo(() => {
    const inTab =
      activeTab === "all"
        ? sortedAll
        : sortedAll.filter((r) => r.category === activeTab);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return inTab.map(toDisplayResource);
    return inTab
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.url.toLowerCase().includes(q) ||
          r.topics.some((t) => t.toLowerCase().includes(q)),
      )
      .map(toDisplayResource);
  }, [activeTab, searchQuery, sortedAll]);

  // Random-resource selector wants the whole catalog flat.
  const getAllResources = (): Resource[] => sortedAll.map(toDisplayResource);

  // URL hash for tab persistence — keep existing behavior.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && TAB_DEFS.some((t) => t.id === hash)) setActiveTab(hash);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.location.hash = activeTab;
  }, [activeTab]);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setDisplayedCount(12);
  };

  const handleLoadMore = () => {
    setDisplayedCount((n) => Math.min(n + 12, filtered.length));
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setDisplayedCount(12);
  };

  return {
    activeTab,
    displayedCount,
    searchQuery,
    searchResults: filtered,
    tabsWithCounts,
    getAllResources,
    handleSearchChange,
    handleLoadMore,
    handleTabChange,
  };
}
