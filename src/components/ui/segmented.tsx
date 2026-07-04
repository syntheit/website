"use client";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}

/**
 * Compact pill-shaped toggle group. Used for filter dimensions with a small
 * fixed option set (e.g. "Auto / Custom / All"). Generic in the option type
 * so call sites don't need string casts.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: Props<T>) {
  return (
    <div
      className={`inline-flex rounded-full border-[1.5px] border-[rgba(59,35,20,0.1)] bg-white/40 overflow-hidden ${className ?? ""}`}
    >
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-[5px] text-[11px] font-medium cursor-pointer transition-colors ${
            value === o.value
              ? "bg-[#3B2314] text-[#F5EBD9]"
              : "text-[#7A5C42] hover:text-[#D4581A]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
