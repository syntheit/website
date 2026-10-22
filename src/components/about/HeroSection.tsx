import Image from "next/image";
import { draftCopy } from "@/lib/utils";

interface HeroSectionProps {
  intro: string;
}

export function HeroSection({ intro }: HeroSectionProps) {
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
        {draftCopy(intro) && (
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
