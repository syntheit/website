import Image from "next/image";

interface HeroSectionProps {
  name: string;
  description: string;
}

export function HeroSection({ name, description }: HeroSectionProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="border-border/30 mx-auto h-32 w-32 overflow-hidden rounded-full border shadow-lg">
        <Image
          src="/profile.webp"
          alt="Daniel Miller"
          width={128}
          height={128}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-foreground text-4xl font-black md:text-5xl">
          About <span className="text-primary">{name}</span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
