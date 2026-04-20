"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contactItems = [
  { label: "Email", value: "daniel@matv.io" },
  { label: "Telegram", value: "@dmiller0" },
  { label: "Matrix", value: "@syntheit:matrix.org" },
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Get in Touch" stripe>
      <div>
        {contactItems.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center justify-between py-4 ${
              i < contactItems.length - 1
                ? "border-b border-[rgba(59,35,20,0.08)]"
                : ""
            }`}
          >
            <div>
              <p className="font-serif text-base font-bold text-foreground">
                {item.label}
              </p>
              <p className="text-[13px] text-muted-foreground">{item.value}</p>
            </div>
            <button
              onClick={() => handleCopy(item.value, item.label)}
              className="text-[13px] text-primary hover:text-primary/80 transition-colors cursor-pointer"
              aria-label={`Copy ${item.label}`}
            >
              {copiedItem === item.label ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
