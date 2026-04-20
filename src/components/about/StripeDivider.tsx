export function StripeDivider() {
  return (
    <div className="flex gap-[3px] h-[3px] w-full">
      <div className="flex-1 rounded-full bg-[#3B2314] opacity-20" />
      <div className="flex-1 rounded-full bg-[#D4581A] opacity-20" />
      <div className="flex-1 rounded-full bg-[#E8941A] opacity-20" />
      <div className="flex-1 rounded-full bg-[#E8C95A] opacity-20" />
    </div>
  );
}
