"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Trash2, MapPin, ExternalLink } from "lucide-react";
import type { List, Place } from "@/types/world";
import {
  CATEGORY_LABELS,
  COUNTRY_LABELS,
  categoryLabel,
  countryLabel,
} from "@/lib/world-places";
import { STATUS_VALUES } from "@/lib/admin/override";
import { Picker } from "@/components/ui/picker";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { Section } from "./Section";

interface RowLike {
  list: List;
  hidden: boolean;
  isCustom: boolean;
}

interface Props {
  mode: "create" | "edit";
  row: RowLike | null;
  /** Places currently in this list. */
  members: Place[];
  /** All places (used as the source for the "add place" picker). */
  allPlaces: Place[];
  saving: boolean;
  onClose: () => void;
  onSave: (patch: {
    label?: string;
    category?: string;
    status?: List["status"];
    tags?: string[];
    scope?: string;
    hidden?: boolean;
  }) => void;
  onDelete?: () => void;
  onAddPlace?: (placeId: string) => void | Promise<void>;
  onRemovePlace?: (placeId: string) => void | Promise<void>;
}

interface FormState {
  label: string;
  category: string;
  status: List["status"] | "";
  tagsText: string;
  scope: string;
  hidden: boolean;
}

function emptyForm(): FormState {
  return {
    label: "",
    category: "",
    status: "",
    tagsText: "",
    scope: "",
    hidden: false,
  };
}

function formFromRow(row: RowLike): FormState {
  return {
    label: row.list.label,
    category: row.list.category ?? "",
    status: row.list.status ?? "",
    tagsText: (row.list.tags ?? []).join(", "),
    scope: row.list.scope ?? "",
    hidden: row.hidden,
  };
}

export function AdminListEditDrawer({
  mode,
  row,
  members,
  allPlaces,
  saving,
  onClose,
  onSave,
  onDelete,
  onAddPlace,
  onRemovePlace,
}: Props) {
  const [form, setForm] = useState<FormState>(() =>
    mode === "create" || !row ? emptyForm() : formFromRow(row),
  );

  useEffect(() => {
    setForm(mode === "create" || !row ? emptyForm() : formFromRow(row));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row?.list.id, mode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    const tags = form.tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({
      label: form.label.trim() || undefined,
      category: form.category || undefined,
      status: form.status === "" ? undefined : form.status,
      tags: tags.length > 0 ? tags : undefined,
      scope: form.scope || undefined,
      // hidden only applies to auto lists (the override layer); custom lists
      // are deleted, not hidden. Skip sending hidden for custom lists.
      hidden: row?.isCustom ? undefined : form.hidden,
    });
  };

  const canDelete = mode === "edit" && row?.isCustom && onDelete;
  const headline = mode === "create" ? "New list" : row?.list.label ?? "List";

  const categoryOptions = Object.keys(CATEGORY_LABELS).map((slug) => ({
    value: slug,
    label: categoryLabel(slug),
  }));
  const statusOptions = STATUS_VALUES.map((s) => ({ value: s, label: s }));
  const scopeOptions = Object.keys(COUNTRY_LABELS).map((slug) => ({
    value: slug,
    label: countryLabel(slug),
  }));

  return (
    <aside className="w-[440px] shrink-0 border-l border-[rgba(59,35,20,0.1)] bg-[#F5EBD9] flex flex-col">
      <div className="flex items-start justify-between px-5 py-4 border-b border-[rgba(59,35,20,0.08)]">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold">
            {mode === "create"
              ? "Create custom list"
              : row?.isCustom
                ? "Custom list"
                : "Auto list (Takeout-derived)"}
          </div>
          <h2 className="font-serif text-[18px] font-bold text-[#3B2314] leading-tight mt-1">
            {headline}
          </h2>
          {row && (
            <p className="text-[11px] text-[#7A5C42] mt-1 font-mono">
              id: {row.list.id} · {row.list.placeCount} places
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1 -m-1 text-[#7A5C42] hover:text-[#D4581A] cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <Section label="Label">
          <input
            type="text"
            value={form.label}
            onChange={(e) => update("label", e.target.value)}
            placeholder="e.g. Best Asado in BA"
            className="w-full px-3 py-2 bg-white/70 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-md text-[13px] outline-none focus:border-[#D4581A]"
          />
        </Section>

        <div className="grid grid-cols-2 gap-3">
          <Section label="Category">
            <Picker
              value={form.category || undefined}
              onChange={(v) => update("category", v ?? "")}
              options={categoryOptions}
              placeholder="—"
              clearLabel="(none)"
            />
          </Section>

          <Section label="Status">
            <Picker
              value={form.status === "" ? undefined : form.status}
              onChange={(v) =>
                update("status", (v as List["status"]) ?? "")
              }
              options={statusOptions}
              placeholder="—"
              clearLabel="(none)"
            />
          </Section>
        </div>

        <Section label="Scope (country/region)">
          <Picker
            value={form.scope || undefined}
            onChange={(v) => update("scope", v ?? "")}
            options={scopeOptions}
            placeholder="—"
            clearLabel="(none)"
            searchable
            contentWidth={260}
          />
        </Section>

        <Section label="Tags (comma-separated)">
          <input
            type="text"
            value={form.tagsText}
            onChange={(e) => update("tagsText", e.target.value)}
            placeholder="e.g. asado, palermo"
            className="w-full px-3 py-2 bg-white/70 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-md text-[12px] outline-none focus:border-[#D4581A]"
          />
        </Section>

        {!row?.isCustom && mode === "edit" && (
          <label className="flex items-center gap-2 text-[12px] text-[#3B2314] cursor-pointer">
            <input
              type="checkbox"
              checked={form.hidden}
              onChange={(e) => update("hidden", e.target.checked)}
              className="cursor-pointer"
            />
            Hide from public site
          </label>
        )}

        {mode === "edit" && row && (
          <PlacesInList
            members={members}
            allPlaces={allPlaces}
            onAdd={onAddPlace}
            onRemove={onRemovePlace}
          />
        )}
      </div>

      <div className="px-5 py-3 border-t border-[rgba(59,35,20,0.08)] flex justify-between gap-2">
        {canDelete ? (
          <button
            onClick={onDelete}
            className="flex items-center gap-1 px-3 py-[7px] text-[12px] text-[#7A5C42] hover:text-red-700 cursor-pointer"
          >
            <Trash2 className="h-3 w-3" />
            Delete list
          </button>
        ) : (
          <div />
        )}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-3 py-[7px] text-[12px] text-[#7A5C42] hover:text-[#D4581A] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving || (mode === "create" && !form.label.trim())}
            className="px-4 py-[7px] bg-[#3B2314] text-[#F5EBD9] text-[12px] font-medium rounded-md hover:bg-[#D4581A] disabled:opacity-50 cursor-pointer transition-colors"
          >
            {saving ? "Saving…" : mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </aside>
  );
}

function PlacesInList({
  members,
  allPlaces,
  onAdd,
  onRemove,
}: {
  members: Place[];
  allPlaces: Place[];
  onAdd?: (placeId: string) => void | Promise<void>;
  onRemove?: (placeId: string) => void | Promise<void>;
}) {
  const memberIds = useMemo(
    () => new Set(members.map((p) => p.id)),
    [members],
  );
  const addOptions = useMemo(
    () =>
      allPlaces
        .filter((p) => !memberIds.has(p.id))
        .map((p) => ({
          value: p.id,
          // Country + name keeps options distinguishable for places sharing
          // the same name across cities (e.g. "Café Central").
          label: `${p.name} — ${countryLabel(p.country)}`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [allPlaces, memberIds],
  );

  return (
    <Section label={`Places in this list (${members.length})`}>
      <div className="space-y-2">
        {onAdd && addOptions.length > 0 && (
          <Picker
            value={undefined}
            onChange={(id) => {
              if (id) void onAdd(id);
            }}
            options={addOptions}
            placeholder="+ Add place to this list"
            searchable
            contentWidth={320}
          />
        )}
        {members.length === 0 ? (
          <p className="text-[11px] text-[#7A5C42] italic opacity-70">
            No places in this list yet.
          </p>
        ) : (
          <div className="max-h-[320px] overflow-y-auto border-[1.5px] border-[rgba(59,35,20,0.08)] rounded-md bg-white/40">
            {members.map((p) => (
              <ContextMenu key={p.id}>
                <ContextMenuTrigger asChild>
                  <div
                    className="flex items-start gap-2 px-2 py-[6px] border-b border-[rgba(59,35,20,0.05)] last:border-b-0 hover:bg-[rgba(59,35,20,0.04)]"
                  >
                    <MapPin className="h-3 w-3 mt-[3px] text-[#7A5C42] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] text-[#3B2314] font-medium truncate">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-[#7A5C42] truncate">
                        {countryLabel(p.country)}
                        {p.address && <> · {p.address}</>}
                      </div>
                    </div>
                    {onRemove && (
                      <button
                        onClick={() => void onRemove(p.id)}
                        className="shrink-0 p-1 -m-1 text-[#7A5C42] hover:text-red-700 cursor-pointer"
                        aria-label={`Remove ${p.name} from list`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {onRemove && (
                    <ContextMenuItem
                      destructive
                      onSelect={() => void onRemove(p.id)}
                    >
                      <X className="h-3.5 w-3.5" /> Remove from list
                    </ContextMenuItem>
                  )}
                  <ContextMenuItem
                    onSelect={() => window.open(p.googleMapsUrl, "_blank")}
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Open in Google Maps
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
