"use client";

import { useState, useEffect } from "react";
import { X, Copy, Mail } from "lucide-react";
import { PiMatrixLogo } from "react-icons/pi";
import { RiTelegram2Line } from "react-icons/ri";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
}

const contactItems: ContactItem[] = [
  {
    label: "Email",
    value: "daniel@matv.io",
    icon: Mail,
    bgColor: "bg-green-500/10"
  },
  {
    label: "Telegram",
    value: "@dmiller0",
    icon: RiTelegram2Line,
    bgColor: "bg-blue-500/10"
  },
  {
    label: "Matrix",
    value: "@syntheit:matrix.org",
    icon: PiMatrixLogo,
    bgColor: "bg-purple-500/10"
  }
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setCopiedItem(null);
    }
  }, [isOpen]);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        data-state={isOpen ? "open" : "closed"}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl space-y-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        data-state={isOpen ? "open" : "closed"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="rounded-xl"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          Feel free to reach out through any of these channels. Click the copy button to copy the contact information to your clipboard.
        </p>

        {/* Contact Items */}
        <div className="space-y-3">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-4 border border-border bg-card rounded-2xl hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.bgColor)}>
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>

              <Button
                onClick={() => handleCopy(item.value, item.label)}
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-xl transition-all duration-200",
                  copiedItem === item.label
                    ? "bg-green-500/20 text-green-600"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Success Message for Copy */}
        {copiedItem && (
          <div className="p-4 text-center rounded-2xl border border-green-500/20 bg-green-500/10 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
            <p className="font-medium text-green-600">
              {copiedItem} copied to clipboard!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
