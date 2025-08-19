import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ContactCTAProps {
  onContactClick: () => void;
}

export function ContactCTA({ onContactClick }: ContactCTAProps) {
  return (
    <div className="p-8 space-y-6 text-center bg-gradient-to-br rounded-3xl from-primary/5 to-accent/10">
      <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
      <p className="mx-auto max-w-md text-muted-foreground">
        Always open to travel recommendations, photography tips, and connecting with fellow adventurers. 
        Have a destination in mind? Let&apos;s talk about it!
      </p>
      <div className="flex gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onContactClick}
        >
          <MessageSquare className="mr-2 w-4 h-4" />
          Get in Touch
        </Button>
      </div>
    </div>
  );
}
