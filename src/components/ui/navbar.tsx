"use client";

import { Button } from "@/components/ui/button";
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
  const isHomePage = pathname === "/";

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`flex items-center px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 relative z-30 ${className}`}>
        {/* Left: Title - Hidden on mobile when on homepage */}
        <div className={`flex-shrink-0 ${isHomePage ? 'hidden sm:block' : ''}`}>
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-black text-foreground transition-colors hover:text-primary"
          >
            {title}
          </Link>
        </div>
        
        {/* Center: Navigation Items - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center gap-6 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors whitespace-nowrap ${
                isActive(item.href)
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        {/* Right: Contact Button and Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto">
          {/* Contact Button - Hidden on mobile */}
          <div className="hidden sm:block">
            <Button variant="default" onClick={() => setIsContactModalOpen(true)}>
              Contact
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/20">
              <Link
                href="/"
                className="text-2xl font-black text-foreground"
                onClick={closeMobileMenu}
              >
                {title}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileMenu}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Navigation Items */}
            <div className="flex-1 flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-foreground/5"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Contact Button */}
            <div className="p-4 border-t border-border/20">
              <Button 
                variant="default" 
                className="w-full h-12 text-base"
                onClick={() => {
                  setIsContactModalOpen(true);
                  closeMobileMenu();
                }}
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
} 