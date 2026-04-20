"use client";

import { ContactModal } from "@/components/ui/contact-modal";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/metadata/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { title, navItems } = siteConfig;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`flex items-center justify-between px-8 md:px-14 py-7 relative z-30 ${className}`}
      >
        {/* Logo — hidden on homepage where the hero heading serves this role */}
        <Link
          href="/"
          className={`font-serif text-[22px] font-extrabold text-foreground tracking-tight hover:opacity-80 transition-opacity ${
            pathname === "/" ? "invisible" : ""
          }`}
        >
          {title}
        </Link>

        {/* Center nav links - desktop (absolute to be truly centered) */}
        <ul className="hidden lg:flex items-center gap-8 list-none absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-[#D4581A]"
                    : "text-[#7A5C42] hover:text-[#D4581A]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Contact button - desktop */}
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="hidden sm:block px-[22px] py-2 bg-[#3B2314] text-[#F5EBD9] rounded-full text-[13px] font-semibold hover:bg-[#D4581A] transition-colors cursor-pointer"
          >
            Contact
          </button>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-[#D4581A] transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#E8D5B7]/95 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex flex-col h-full">
            {/* Mobile header */}
            <div className="flex items-center justify-between p-4 border-b border-[#3B2314]/10">
              <Link
                href="/"
                className="font-serif text-2xl font-extrabold text-foreground"
                onClick={closeMobileMenu}
              >
                {title}
              </Link>
              <button
                className="p-2 text-foreground hover:text-[#D4581A] transition-colors cursor-pointer"
                onClick={closeMobileMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile nav items */}
            <div className="flex-1 flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-[#D4581A] bg-[#D4581A]/10"
                        : "text-foreground hover:text-[#D4581A] hover:bg-foreground/5"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile contact button */}
            <div className="p-4 border-t border-[#3B2314]/10">
              <button
                className="w-full py-3 bg-[#3B2314] text-[#F5EBD9] rounded-full text-base font-semibold hover:bg-[#D4581A] transition-colors cursor-pointer"
                onClick={() => {
                  setIsContactModalOpen(true);
                  closeMobileMenu();
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
