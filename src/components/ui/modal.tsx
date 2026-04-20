"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  stripe?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "max-w-md",
  className,
  stripe = false,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(59,35,20,0.4)] backdrop-blur-[4px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        data-state={isOpen ? "open" : "closed"}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full rounded-2xl bg-card p-8 shadow-[0_8px_32px_rgba(59,35,20,0.12)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden max-h-[90vh]",
          maxWidth,
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stripe */}
        {stripe && (
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-[#3B2314]" />
            <div className="flex-1 bg-[#D4581A]" />
            <div className="flex-1 bg-[#E8820C]" />
            <div className="flex-1 bg-[#D4A017]" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {(title || description) ? (
            <div className="text-left">
              {title && (
                <h2 className="font-serif text-2xl font-[800] text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="text-[24px] leading-none text-muted-foreground hover:text-foreground transition-colors -mr-1 -mt-1 p-1 cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
