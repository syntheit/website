"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "EN", name: "English", flag: "🇺🇸" },
  { code: "ES", name: "Español", flag: "🇦🇷" },
  { code: "FR", name: "Français", flag: "🇫🇷" },
  { code: "UK", name: "Українська", flag: "🇺🇦" },
  { code: "RU", name: "Русский", flag: "🇷🇺" },
  { code: "PT", name: "Português", flag: "🇧🇷" },
];

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]!);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // Here you would typically trigger language change logic
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-background hover:bg-accent/50 transition-colors"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          {selectedLanguage.flag} {selectedLanguage.code}
        </span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-2xl shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="p-2 space-y-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors",
                  selectedLanguage.code === language.code
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent/50 text-foreground"
                )}
              >
                <span className="text-base">{language.flag}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{language.code}</span>
                  <span className="text-xs text-muted-foreground">{language.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 