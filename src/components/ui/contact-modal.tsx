"use client";

import { useState, useRef, useEffect } from "react";
import { X, Copy, Mail, Send, Loader2 } from "lucide-react";
import { PiMatrixLogo } from "react-icons/pi";
import { RiTelegram2Line } from "react-icons/ri";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
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

const MAX_MESSAGE_LENGTH = 500;

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const submitMessage = api.contact.submit.useMutation({
    onSuccess: () => {
      setFormSuccess("Message sent successfully! I'll get back to you soon.");
      setMessage("");
      
      // Clear success message after 5 seconds
      setTimeout(() => setFormSuccess(""), 5000);
    },
    onError: (error) => {
      setFormError(error.message ?? "Failed to send message. Please try again.");
    },
  });



  // Reset form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessage("");
      setFormError("");
      setFormSuccess("");
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const validateForm = (): boolean => {
    setFormError("");
    
    // Check honeypot field
    if (honeypotRef.current?.value) {
      setFormError("Invalid submission detected.");
      return false;
    }

    // Check message length
    if (!message.trim()) {
      setFormError("Please enter a message.");
      return false;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      setFormError(`Message is too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormError("");
    submitMessage.mutate({ message: message.trim() });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        data-state={isOpen ? "open" : "closed"}
        onClick={handleClose}
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
            onClick={handleClose}
            variant="ghost"
            size="icon"
            className="rounded-xl"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          Feel free to reach out through any of these channels. Click the copy button to copy the contact information to your clipboard, or send me a direct message below.
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

        {/* Contact Form */}
        <div className="pt-6 border-t border-border">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Send a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field - hidden from users but visible to bots */}
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              className="absolute left-[-9999px] opacity-0"
              tabIndex={-1}
              autoComplete="off"
            />
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground mb-2">
                Message
              </p>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full min-h-[120px] p-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={submitMessage.isPending}
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Maximum {MAX_MESSAGE_LENGTH} characters</span>
                <span>{message.length}/{MAX_MESSAGE_LENGTH}</span>
              </div>
            </div>

            {/* Error/Success Messages */}
            {formError && (
              <div className="p-3 text-center rounded-xl border border-red-500/20 bg-red-500/10 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
                <p className="text-sm font-medium text-red-600">{formError}</p>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 text-center rounded-xl border border-green-500/20 bg-green-500/10 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
                <p className="text-sm font-medium text-green-600">{formSuccess}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={submitMessage.isPending || !message.trim()}
              className={cn(
                "w-full py-6 px-4 rounded-xl font-medium text-base transition-all duration-200",
                submitMessage.isPending || !message.trim()
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
              )}
            >
              {submitMessage.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
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