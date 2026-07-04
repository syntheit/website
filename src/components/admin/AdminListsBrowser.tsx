"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, EyeOff, Eye, Trash2, MapPin } from "lucide-react";
import type { Place, List } from "@/types/world";
import type {
  ListOverride,
  ListOverridesMap,
  CustomList,
  CustomListsMap,
} from "@/lib/admin/list-override";
import { isCustomListId } from "@/lib/admin/list-override";
import type {
  PlaceOverride,
  OverridesMap,
} from "@/lib/admin/override";
import { applyOverride, computeListDelta } from "@/lib/admin/override";
import { applyListOverride } from "@/lib/admin/list-override";
import { categoryLabel, countryLabel } from "@/lib/world-places";
import { Segmented } from "@/components/ui/segmented";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { AdminListEditDrawer } from "./AdminListEditDrawer";

interface Props {
  lists: List[];
  places: Place[];
  initialOverrides: ListOverridesMap;
  initialCustomLists: CustomListsMap;
  initialPlaceOverrides: OverridesMap;
}

interface RowState {
  /** The list with overrides applied — what to display. */
  list: List;
  /** Whether this list was admin-created (custom) vs auto-derived from Takeout. */
  isCustom: boolean;
  /** Whether the list is hidden (only meaningful for auto lists). */
  hidden: boolean;
}

export function AdminListsBrowser({
  lists,
  places,
  initialOverrides,
  initialCustomLists,
  initialPlaceOverrides,
}: Props) {
  const router = useRouter();
  const [overrides, setOverrides] = useState<ListOverridesMap>(initialOverrides);
  const [customLists, setCustomLists] =
    useState<CustomListsMap>(initialCustomLists);
  const [placeOverrides, setPlaceOverrides] =
    useState<OverridesMap>(initialPlaceOverrides);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "auto" | "custom">("all");
  const [hiddenFilter, setHiddenFilter] = useState<"any" | "visible" | "hidden">(
    "any",
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const placeById = useMemo(() => {
    const m = new Map<string, Place>();
    for (const p of places) m.set(p.id, applyOverride(p, placeOverrides[p.id]));
    return m;
  }, [places, placeOverrides]);

  const rawPlaceById = useMemo(() => {
    const m = new Map<string, Place>();
    for (const p of places) m.set(p.id, p);
    return m;
  }, [places]);

  // Merged view of every list. For auto lists: apply list-override on top.
  // For custom lists: take metadata from custom-lists.json + place count from
  // the enriched lists.json (which already reflects per-place addedLists).
  const rows: RowState[] = useMemo(() => {
    const enrichedById = new Map(lists.map((l) => [l.id, l]));
    const out: RowState[] = [];
    for (const l of lists) {
      if (l.custom) continue;
      const ov = overrides[l.id];
      out.push({
        list: applyListOverride(l, ov),
        isCustom: false,
        hidden: Boolean(ov?.hidden),
      });
    }
    for (const cl of Object.values(customLists)) {
      const enriched = enrichedById.get(cl.id);
      out.push({
        list: {
          id: cl.id,
          label: cl.label,
          category: cl.category,
          status: cl.status,
          scope: cl.scope,
          tags: cl.tags,
          custom: true,
          placeCount: enriched?.placeCount ?? 0,
          placeIds: enriched?.placeIds ?? [],
        },
        isCustom: true,
        hidden: false,
      });
    }
    return out;
  }, [lists, overrides, customLists]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (typeFilter === "auto" && r.isCustom) return false;
      if (typeFilter === "custom" && !r.isCustom) return false;
      if (hiddenFilter === "visible" && r.hidden) return false;
      if (hiddenFilter === "hidden" && !r.hidden) return false;
      if (q && !r.list.label.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, search, typeFilter, hiddenFilter]);

  const selectedRow = useMemo(
    () => rows.find((r) => r.list.id === selectedId),
    [rows, selectedId],
  );

  const selectedMembers = useMemo<Place[]>(() => {
    if (!selectedId) return [];
    const out: Place[] = [];
    for (const p of placeById.values()) {
      if (p.listIds.includes(selectedId)) out.push(p);
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }, [placeById, selectedId]);

  const handlePlaceListToggle = useCallback(
    async (placeId: string, listId: string, isAdding: boolean) => {
      const raw = rawPlaceById.get(placeId);
      const current = placeById.get(placeId);
      if (!raw || !current) return;
      // Bail if the requested state already matches reality (e.g. stale UI).
      if (current.listIds.includes(listId) === isAdding) return;

      const currentSet = new Set(current.listIds);
      if (isAdding) currentSet.add(listId);
      else currentSet.delete(listId);

      const res = await fetch(
        `/api/admin/overrides/${encodeURIComponent(placeId)}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(computeListDelta(raw.listIds, [...currentSet])),
        },
      );
      if (!res.ok) {
        console.error("List membership update failed", await res.text());
        return;
      }
      const { override } = (await res.json()) as {
        override: PlaceOverride | null;
      };
      setPlaceOverrides((prev) => {
        const next = { ...prev };
        if (override === null) delete next[placeId];
        else next[placeId] = override;
        return next;
      });
    },
    [rawPlaceById, placeById],
  );

  const handleSave = useCallback(
    async (
      listId: string,
      patch: {
        label?: string;
        category?: string;
        status?: List["status"];
        tags?: string[];
        scope?: string;
        hidden?: boolean;
      },
    ) => {
      startTransition(async () => {
        const res = await fetch(`/api/admin/lists/${encodeURIComponent(listId)}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!res.ok) {
          console.error("Save failed", await res.text());
          return;
        }
        const data = (await res.json()) as {
          list?: CustomList;
          override?: ListOverride | null;
        };
        if (data.list) {
          setCustomLists((prev) => ({ ...prev, [listId]: data.list! }));
        } else {
          setOverrides((prev) => {
            const next = { ...prev };
            if (data.override === null) delete next[listId];
            else if (data.override) next[listId] = data.override;
            return next;
          });
        }
      });
    },
    [],
  );

  const handleCreate = useCallback(
    async (body: {
      label: string;
      category?: string;
      status?: List["status"];
      tags?: string[];
      scope?: string;
    }) => {
      const res = await fetch("/api/admin/lists", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.error("Create failed", await res.text());
        return;
      }
      const { list } = (await res.json()) as { list: CustomList };
      setCustomLists((prev) => ({ ...prev, [list.id]: list }));
      setCreating(false);
      setSelectedId(list.id);
    },
    [],
  );

  const handleDelete = useCallback(async (listId: string) => {
    if (!isCustomListId(listId)) return;
    if (!confirm(`Delete custom list "${listId}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/lists/${encodeURIComponent(listId)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.error("Delete failed", await res.text());
      return;
    }
    setCustomLists((prev) => {
      const next = { ...prev };
      delete next[listId];
      return next;
    });
    setSelectedId(null);
  }, []);

  return (
    <div className="flex h-[calc(100vh-49px)]">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-4 py-3 border-b border-[rgba(59,35,20,0.08)] bg-[#F5EBD9] flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lists…"
            className="w-[240px] px-3 py-[6px] bg-white/70 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-full text-[12px] outline-none focus:border-[#D4581A]"
          />
          <Segmented
            options={[
              { value: "all", label: "All" },
              { value: "auto", label: "Auto" },
              { value: "custom", label: "Custom" },
            ]}
            value={typeFilter}
            onChange={(v) => setTypeFilter(v)}
          />
          <Segmented
            options={[
              { value: "visible", label: "Visible" },
              { value: "hidden", label: "Hidden" },
              { value: "any", label: "All" },
            ]}
            value={hiddenFilter}
            onChange={(v) => setHiddenFilter(v)}
          />
          <button
            onClick={() => {
              setSelectedId(null);
              setCreating(true);
            }}
            className="ml-auto px-3 py-[6px] bg-[#3B2314] text-[#F5EBD9] text-[12px] font-medium rounded-full hover:bg-[#D4581A] cursor-pointer transition-colors"
          >
            + New list
          </button>
          <div className="text-[12px] font-mono text-[#7A5C42]">
            {filtered.length} / {rows.length}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-[12px]">
            <thead className="sticky top-0 bg-[#E0CBA8] text-[10px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold z-10">
              <tr>
                <th className="px-4 py-2 text-left">Label</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Scope</th>
                <th className="px-4 py-2 text-left">Tags</th>
                <th className="px-4 py-2 text-right">Places</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <ContextMenu key={r.list.id}>
                  <ContextMenuTrigger asChild>
                <tr
                  onClick={() => {
                    setCreating(false);
                    setSelectedId(r.list.id);
                  }}
                  className={`border-b border-[rgba(59,35,20,0.05)] cursor-pointer transition-colors ${
                    selectedId === r.list.id
                      ? "bg-[rgba(212,88,26,0.1)]"
                      : "hover:bg-[rgba(59,35,20,0.04)]"
                  }`}
                >
                  <td className="px-4 py-2">
                    <div className="font-medium text-[#3B2314]">{r.list.label}</div>
                    <div className="text-[10px] text-[#7A5C42] font-mono">
                      {r.list.id}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {r.isCustom ? (
                      <span className="px-1.5 py-[1px] rounded bg-[rgba(212,88,26,0.15)] text-[#D4581A] text-[10px] font-semibold">
                        custom
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#7A5C42]">auto</span>
                    )}
                    {r.hidden && (
                      <span className="ml-1 px-1.5 py-[1px] rounded bg-[#3B2314] text-[#F5EBD9] text-[10px]">
                        hidden
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-[#7A5C42]">
                    {r.list.category ? categoryLabel(r.list.category) : "—"}
                  </td>
                  <td className="px-4 py-2 text-[#7A5C42]">
                    {r.list.status ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-[#7A5C42]">
                    {r.list.scope ? countryLabel(r.list.scope) : "—"}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {(r.list.tags ?? []).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-[1px] rounded bg-[rgba(59,35,20,0.06)] text-[#7A5C42] text-[10px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-[#3B2314]">
                    {r.list.placeCount}
                  </td>
                </tr>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onSelect={() => {
                        setCreating(false);
                        setSelectedId(r.list.id);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </ContextMenuItem>
                    <ContextMenuItem
                      onSelect={() =>
                        handleSave(r.list.id, { hidden: !r.hidden })
                      }
                    >
                      {r.hidden ? (
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
                      onSelect={() =>
                        router.push(
                          `/admin?list=${encodeURIComponent(r.list.id)}`,
                        )
                      }
                    >
                      <MapPin className="h-3.5 w-3.5" /> View places in list
                    </ContextMenuItem>
                    {r.isCustom && (
                      <>
                        <ContextMenuSeparator />
                        <ContextMenuItem
                          destructive
                          onSelect={() => void handleDelete(r.list.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete list
                        </ContextMenuItem>
                      </>
                    )}
                  </ContextMenuContent>
                </ContextMenu>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[#7A5C42] italic">
                    No lists match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(creating || selectedRow) && (
        <AdminListEditDrawer
          mode={creating ? "create" : "edit"}
          row={selectedRow ?? null}
          members={selectedRow ? selectedMembers : []}
          allPlaces={places}
          saving={isPending}
          onClose={() => {
            setSelectedId(null);
            setCreating(false);
          }}
          onSave={(patch) => {
            if (creating || !selectedRow) {
              void handleCreate(patch as Required<Pick<typeof patch, "label">> & typeof patch);
            } else {
              void handleSave(selectedRow.list.id, patch);
            }
          }}
          onDelete={
            selectedRow?.isCustom
              ? () => handleDelete(selectedRow.list.id)
              : undefined
          }
          onAddPlace={
            selectedRow
              ? (placeId) =>
                  handlePlaceListToggle(placeId, selectedRow.list.id, true)
              : undefined
          }
          onRemovePlace={
            selectedRow
              ? (placeId) =>
                  handlePlaceListToggle(placeId, selectedRow.list.id, false)
              : undefined
          }
        />
      )}
    </div>
  );
}

