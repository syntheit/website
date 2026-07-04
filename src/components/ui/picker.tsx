"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface PickerOption {
  value: string;
  label: string;
  /** Optional count shown right-aligned next to the label. */
  count?: number;
}

interface BasePickerProps {
  options: PickerOption[];
  placeholder: string;
  /** If true, render a search input at the top of the popover. */
  searchable?: boolean;
  /** Width of the trigger button — defaults to fit-content. */
  className?: string;
  /** Width of the popover content — defaults to 240px. */
  contentWidth?: number;
  align?: "start" | "center" | "end";
}

interface SingleProps extends BasePickerProps {
  multi?: false;
  value: string | undefined;
  onChange: (next: string | undefined) => void;
  /** Label for the "deselect / all" option at the top of the list. */
  clearLabel?: string;
}

interface MultiProps extends BasePickerProps {
  multi: true;
  value: string[];
  onChange: (next: string[]) => void;
  /** When the multi-selection is empty, the trigger shows this label. */
  emptyLabel?: string;
}

export type PickerProps = SingleProps | MultiProps;

function isMulti(p: PickerProps): p is MultiProps {
  return p.multi === true;
}

/**
 * Popover-based single or multi-select with optional search. Consistent
 * styling with the warm-tan palette. Use single for filters that pick one
 * value, multi for cases like categories where a place can have many.
 */
export function Picker(props: PickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open && props.searchable) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
    if (!open) setSearch("");
    return;
  }, [open, props.searchable]);

  const filtered = useMemo(() => {
    if (!search.trim()) return props.options;
    const q = search.toLowerCase();
    return props.options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
    );
  }, [props.options, search]);

  const triggerLabel = isMulti(props)
    ? renderMultiTrigger(props)
    : renderSingleTrigger(props);

  const toggle = (val: string) => {
    if (isMulti(props)) {
      const next = props.value.includes(val)
        ? props.value.filter((v) => v !== val)
        : [...props.value, val];
      props.onChange(next);
    } else {
      props.onChange(props.value === val ? undefined : val);
      setOpen(false);
      setSearch("");
    }
  };

  const selectClear = () => {
    if (isMulti(props)) props.onChange([]);
    else props.onChange(undefined);
    setOpen(false);
    setSearch("");
  };

  const isSelected = (val: string) =>
    isMulti(props) ? props.value.includes(val) : props.value === val;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-expanded={open}
          className={cn(
            "flex items-center gap-1.5 pl-3 pr-2 py-[6px] bg-white/60 border-[1.5px] border-[rgba(59,35,20,0.1)] rounded-full text-[12px] text-[#3B2314] font-medium font-sans cursor-pointer hover:border-[#D4581A] transition-colors outline-none focus-visible:border-[#D4581A] max-w-[260px]",
            props.className,
          )}
        >
          {triggerLabel}
          <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align={props.align ?? "start"}
        sideOffset={6}
        style={{ width: props.contentWidth ?? 240 }}
        className="p-0 bg-[#F5EBD9] border-[1.5px] border-[rgba(59,35,20,0.12)] rounded-xl shadow-[0_8px_24px_rgba(59,35,20,0.12)]"
      >
        {props.searchable && (
          <div className="p-2 border-b border-[rgba(59,35,20,0.08)]">
            <Input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="h-8 bg-white/70 border-[rgba(59,35,20,0.08)] text-[12px] placeholder:text-[#7A5C42] focus-visible:border-[#D4581A] focus-visible:ring-0"
            />
          </div>
        )}
        <div
          className="max-h-[280px] overflow-y-auto py-1"
          onWheel={(e) => e.stopPropagation()}
        >
          {!isMulti(props) && props.clearLabel && (
            <PickerItem
              label={props.clearLabel}
              selected={props.value === undefined}
              onClick={selectClear}
            />
          )}
          {isMulti(props) && props.value.length > 0 && (
            <PickerItem label="Clear all" selected={false} onClick={selectClear} />
          )}
          {filtered.length === 0 ? (
            <div className="px-3 py-4 text-center text-[12px] text-[#7A5C42] italic">
              No matches.
            </div>
          ) : (
            filtered.map((o) => (
              <PickerItem
                key={o.value}
                label={o.label}
                count={o.count}
                selected={isSelected(o.value)}
                onClick={() => toggle(o.value)}
              />
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function renderSingleTrigger(props: SingleProps): React.ReactNode {
  if (props.value === undefined) {
    return <span className="truncate">{props.placeholder}</span>;
  }
  const opt = props.options.find((o) => o.value === props.value);
  return <span className="truncate">{opt?.label ?? props.value}</span>;
}

function renderMultiTrigger(props: MultiProps): React.ReactNode {
  if (props.value.length === 0) {
    return (
      <span className="truncate text-[#7A5C42]">
        {props.emptyLabel ?? props.placeholder}
      </span>
    );
  }
  if (props.value.length === 1) {
    const opt = props.options.find((o) => o.value === props.value[0]);
    return <span className="truncate">{opt?.label ?? props.value[0]}</span>;
  }
  return (
    <span className="truncate">
      {props.placeholder}{" "}
      <span className="text-[10px] font-mono text-[#7A5C42]">
        ({props.value.length})
      </span>
    </span>
  );
}

function PickerItem({
  label,
  count,
  selected,
  onClick,
}: {
  label: string;
  count?: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2 px-3 py-[7px] text-left text-[12px] cursor-pointer transition-colors",
        selected
          ? "bg-[rgba(212,88,26,0.1)] text-[#D4581A] font-semibold"
          : "text-[#3B2314] hover:bg-[rgba(59,35,20,0.04)] hover:text-[#D4581A]",
      )}
    >
      <Check className={cn("h-3 w-3", selected ? "opacity-100" : "opacity-0")} />
      <span className="flex-1 truncate">{label}</span>
      {count != null && (
        <span className="text-[10px] font-mono text-[#7A5C42] shrink-0">{count}</span>
      )}
    </button>
  );
}
