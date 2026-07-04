/**
 * Labeled form section used inside the admin edit drawers. Just a small
 * styled wrapper around a label + content — pulled out so the two drawers
 * (places and lists) share it.
 */
export function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
