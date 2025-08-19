import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function CTASection({ title, description, buttonText, buttonLink }: CTASectionProps) {
  return (
    <div className="p-8 space-y-6 text-center bg-gradient-to-br rounded-3xl from-primary/5 to-accent/10">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="mx-auto max-w-md text-muted-foreground">{description}</p>
      <div className="flex gap-4 justify-center">
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
