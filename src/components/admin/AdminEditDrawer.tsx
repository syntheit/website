"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import type { Place, List } from "@/types/world";
import type { PlaceOverride } from "@/lib/admin/override";
import { STATUS_VALUES, computeListDelta } from "@/lib/admin/override";
import {
  categoryLabel,
  countryLabel,
  CATEGORY_LABELS,
} from "@/lib/world-places";
import { Picker } from "@/components/ui/picker";
import { Section } from "./Section";

interface Props {
  /** Place with overrides applied — what the user sees. */
  place: Place;
  /** Place without overrides — needed to compute list-membership deltas on save. */
  rawPlace: Place;
  override?: PlaceOverride;
  lists: List[];
  listLabelById: Map<string, string>;
  onClose: () => void;
  onSave: (patch: Partial<PlaceOverride>) => void;
  saving: boolean;
}

interface FormState {
  note: string;
  internalNote: string;
  customName: string;
  customCategories: string[];
  statusOverride: PlaceOverride["statusOverride"] | "";
  rating: number | "";
  extraTagsText: string;
  hidden: boolean;
  /** Current effective list membership. Diffed against rawPlace.listIds on save. */
  listIds: string[];
}

function formFromOverride(
  ov: PlaceOverride | undefined,
  place: Place,
): FormState {
  return {
    note: ov?.note ?? "",
    internalNote: ov?.internalNote ?? "",
    customName: ov?.customName ?? "",
    customCategories: ov?.customCategories ?? place.categories,
    statusOverride: ov?.statusOverride ?? "",
    rating: ov?.rating ?? "",
    extraTagsText: (ov?.extraTags ?? []).join(", "),
    hidden: Boolean(ov?.hidden),
    listIds: place.listIds,
  };
}

function patchFromForm(form: FormState, place: Place, rawPlace: Place): Partial<PlaceOverride> {
  const orUndef = (s: string) => {
    const t = s.trim();
    return t === "" ? undefined : t;
  };
  const extraTags = form.extraTagsText
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const sameCategoriesAsAuto =
    form.customCategories.length === place.categories.length &&
    form.customCategories.every((c, i) => c === place.categories[i]);
  return {
    note: orUndef(form.note),
    internalNote: orUndef(form.internalNote),
    customName: orUndef(form.customName),
    customCategories:
      sameCategoriesAsAuto || form.customCategories.length === 0
        ? undefined
        : form.customCategories,
    statusOverride: form.statusOverride === "" ? undefined : form.statusOverride,
    rating: form.rating === "" ? undefined : Number(form.rating),
    extraTags: extraTags.length > 0 ? extraTags : undefined,
    ...computeListDelta(rawPlace.listIds, form.listIds),
    hidden: form.hidden,
  };
}

export function AdminEditDrawer({
  place,
  rawPlace,
  override,
  lists,
  listLabelById,
  onClose,
  onSave,
  saving,
}: Props) {
  const [form, setForm] = useState<FormState>(() =>
    formFromOverride(override, place),
  );

  useEffect(() => {
    setForm(formFromOverride(override, place));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const categoryOptions = Object.keys(CATEGORY_LABELS).map((slug) => ({
    value: slug,
    label: categoryLabel(slug),
  }));

  const statusOptions = STATUS_VALUES.map((s) => ({ value: s, label: s }));

  const allListOptions = lists.map((l) => ({
    value: l.id,
    label: l.label,
    count: l.placeCount,
  }));
  const addableListOptions = allListOptions.filter(
    (o) => !form.listIds.includes(o.value),
  );

  const removeList = (id: string) =>
    update(
      "listIds",
      form.listIds.filter((l) => l !== id),
    );
  const addList = (id: string | undefined) => {
    if (!id || form.listIds.includes(id)) return;
    update("listIds", [...form.listIds, id]);
  };

  return (
    <aside className="w-[460px] shrink-0 border-l border-[rgba(59,35,20,0.1)] bg-[#F5EBD9] flex flex-col">
      <div className="flex items-start justify-between px-5 py-4 border-b border-[rgba(59,35,20,0.08)]">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold">
            {countryLabel(place.country)}
          </div>
          <h2 className="font-serif text-[18px] font-bold text-[#3B2314] leading-tight mt-1">
            {place.name}
          </h2>
          {place.address && (
            <p className="text-[11px] text-[#7A5C42] mt-1 truncate">{place.address}</p>
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
        <Section label="Public note">
          <textarea
            value={form.note}
            onChange={(e) => update("note", e.target.value)}
            rows={4}
            placeholder="Personal blurb shown on the public site"
            className="w-full px-3 py-2 bg-white/70 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-md text-[13px] outline-none focus:border-[#D4581A] resize-y"
          />
        </Section>

        <Section label="Internal note (admin only)">
          <textarea
            value={form.internalNote}
            onChange={(e) => update("internalNote", e.target.value)}
            rows={2}
            placeholder="Private scratchpad — never rendered publicly"
            className="w-full px-3 py-2 bg-white/70 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-md text-[12px] outline-none focus:border-[#D4581A] resize-y"
          />
        </Section>

        <Section label="Categories">
          <Picker
            multi
            value={form.customCategories}
            onChange={(v) => update("customCategories", v)}
            options={categoryOptions}
            placeholder="Add categories"
            emptyLabel="(uncategorized)"
            contentWidth={280}
          />
          {form.customCategories.length === 0 && place.categories.length === 0 && (
            <p className="text-[10px] text-[#7A5C42] mt-1 opacity-70">
              No auto-derived categories. Add manually if you want.
            </p>
          )}
        </Section>

        <Section label={`Lists (${form.listIds.length})`}>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {form.listIds.length === 0 ? (
                <span className="text-[11px] text-[#7A5C42] opacity-70 italic">
                  Not in any list.
                </span>
              ) : (
                form.listIds.map((lid) => (
                  <button
                    key={lid}
                    type="button"
                    onClick={() => removeList(lid)}
                    className="group flex items-center gap-1 px-2 py-[2px] rounded bg-[rgba(59,35,20,0.08)] text-[#3B2314] text-[11px] font-medium hover:bg-[rgba(212,88,26,0.15)] hover:text-[#D4581A] cursor-pointer transition-colors"
                  >
                    {listLabelById.get(lid) ?? lid}
                    <X className="h-2.5 w-2.5 opacity-50 group-hover:opacity-100" />
                  </button>
                ))
              )}
            </div>
            {addableListOptions.length > 0 && (
              <Picker
                value={undefined}
                onChange={addList}
                options={addableListOptions}
                placeholder="+ Add to list"
                searchable
                contentWidth={280}
              />
            )}
          </div>
        </Section>

        <div className="grid grid-cols-2 gap-3">
          <Section label="Status override">
            <Picker
              value={form.statusOverride === "" ? undefined : form.statusOverride}
              onChange={(v) =>
                update(
                  "statusOverride",
                  (v as PlaceOverride["statusOverride"]) ?? "",
                )
              }
              options={statusOptions}
              placeholder={`(auto: ${place.status})`}
              clearLabel={`(auto: ${place.status})`}
            />
          </Section>

          <Section label="Rating">
            <Picker
              value={form.rating === "" ? undefined : String(form.rating)}
              onChange={(v) =>
                update("rating", v === undefined ? "" : Number(v))
              }
              options={[1, 2, 3, 4, 5].map((n) => ({
                value: String(n),
                label: "★".repeat(n) + " " + n,
              }))}
              placeholder="—"
              clearLabel="—"
            />
          </Section>
        </div>

        <Section label="Display name override">
          <input
            type="text"
            value={form.customName}
            onChange={(e) => update("customName", e.target.value)}
            placeholder={place.name}
            className="w-full px-3 py-2 bg-white/70 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-md text-[12px]"
          />
        </Section>

        <Section label="Tags (comma-separated, added on top of list-conferred)">
          <input
            type="text"
            value={form.extraTagsText}
            onChange={(e) => update("extraTagsText", e.target.value)}
            placeholder="e.g. brunch, romantic, palermo"
            className="w-full px-3 py-2 bg-white/70 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-md text-[12px] outline-none focus:border-[#D4581A]"
          />
          {place.tags.length > 0 && (
            <div className="text-[10px] text-[#7A5C42] mt-1">
              Auto-tags: {place.tags.join(", ")}
            </div>
          )}
        </Section>

        <label className="flex items-center gap-2 text-[12px] text-[#3B2314] cursor-pointer">
          <input
            type="checkbox"
            checked={form.hidden}
            onChange={(e) => update("hidden", e.target.checked)}
            className="cursor-pointer"
          />
          Hide from public site
        </label>

        <div className="pt-2 border-t border-[rgba(59,35,20,0.08)]">
          <a
            href={place.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#D4581A] hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            View on Google Maps
          </a>
          <div className="text-[10px] text-[#7A5C42] font-mono mt-2">
            id: {place.id}
            <br />
            coords: {place.lat.toFixed(5)}, {place.lng.toFixed(5)}
            {override?.updatedAt && (
              <>
                <br />
                last edit: {override.updatedAt.replace("T", " ").slice(0, 16)}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-[rgba(59,35,20,0.08)] flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-[7px] text-[12px] text-[#7A5C42] hover:text-[#D4581A] cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(patchFromForm(form, place, rawPlace))}
          disabled={saving}
          className="px-4 py-[7px] bg-[#3B2314] text-[#F5EBD9] text-[12px] font-medium rounded-md hover:bg-[#D4581A] disabled:opacity-50 cursor-pointer transition-colors"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </aside>
  );
}

