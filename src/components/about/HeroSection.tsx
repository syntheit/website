import Image from "next/image";

interface HeroSectionProps {
  meta: Array<{ label: string; value: string }>;
}

export function HeroSection({ meta }: HeroSectionProps) {
  return (
    <div className="space-y-8 text-center">
      <div
        className="mx-auto h-[120px] w-[120px] overflow-hidden rounded-full"
        style={{ border: "2px solid rgba(59,35,20,0.15)" }}
      >
        <Image
          src="/profile.webp"
          alt="Daniel Miller"
          width={120}
          height={120}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-5">
        <h1 className="font-serif text-[42px] font-black leading-tight tracking-tight md:text-[52px]">
          About <span className="italic text-primary">Daniel</span>
        </h1>
        {/* Dev-only reminder — never ships. Replace with the real intro. */}
        {process.env.NODE_ENV !== "production" && (
        <div className="mx-auto max-w-xl rounded-xl border-2 border-dashed border-primary/20 px-6 py-4">
          <p className="text-[15px] italic leading-relaxed text-muted-foreground">
            {/* TODO: Daniel writes this. 2-3 sentences, first person. */}
            {/* Tone: how you'd introduce yourself at Mundo Lingo to someone interesting — direct, no fluff. */}
            {/* Hit these beats: */}
            {/*   - 22, American from Chicago suburbs, half-Ukrainian, living in Buenos Aires ~1.5 years */}
            {/*   - Programmer by trade (full-stack, NixOS, self-hosted everything) */}
            {/*   - The "full-stack human" angle — you don't just code, you run marathons, speak 6 languages, build businesses, cook from scratch, self-host your infra */}
            {/*   - Why Buenos Aires — chose chaos over comfort, Argentina over Switzerland, interesting process over perfect destination */}
            {/*   - End with something forward-looking: the passport, the languages, the long game */}
            {/* Keep it under 4 sentences. No LinkedIn energy. */}
            [Write your intro here]
          </p>
        </div>
        )}
      </div>

      <div className="mx-auto grid max-w-md grid-cols-2 gap-5">
        {meta.map((item) => (
          <div key={item.label}>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary">
              {item.label}
            </div>
            <div className="font-serif text-lg font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
