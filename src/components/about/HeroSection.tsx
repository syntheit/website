import Image from "next/image";

interface HeroSectionProps {
  name: string;
  meta: Array<{ label: string; value: string }>;
}

export function HeroSection({ name, meta }: HeroSectionProps) {
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
        <div className="mx-auto max-w-xl rounded-xl border-2 border-dashed border-primary/20 px-6 py-4">
          <p className="text-[15px] italic leading-relaxed text-muted-foreground">
            Daniel will write this. A short personal intro in his own voice, not
            AI-generated.
          </p>
        </div>
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
