"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
  category?: string;
  featured?: boolean;
}

interface CarouselProps {
  items: CarouselItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Carousel({ items, title, subtitle, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  // Pause auto-play on hover/touch
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  const handleTouchStart = () => setIsAutoPlaying(false);
  const handleTouchEnd = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      {(title ?? subtitle) && (
        <div className="mb-4 text-center sm:mb-8">
          {title && (
            <h2 className="mb-1 text-xl font-black sm:text-2xl md:text-3xl text-foreground sm:mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-foreground/70 sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons - Always visible on mobile */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 z-20 w-8 h-8 opacity-100 backdrop-blur-sm transition-opacity duration-300 -translate-y-1/2 sm:left-4 sm:opacity-0 sm:group-hover:opacity-100 bg-background/80 border-border/50 hover:bg-background sm:h-10 sm:w-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-3 h-3 sm:h-4 sm:w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 z-20 w-8 h-8 opacity-100 backdrop-blur-sm transition-opacity duration-300 -translate-y-1/2 sm:right-4 sm:opacity-0 sm:group-hover:opacity-100 bg-background/80 border-border/50 hover:bg-background sm:h-10 sm:w-10"
          onClick={nextSlide}
        >
          <ChevronRight className="w-3 h-3 sm:h-4 sm:w-4" />
        </Button>

        {/* Carousel Items */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-full">
                <CarouselCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator - Improved for mobile */}
        <div className="flex justify-center mt-4 sm:mt-6 gap-1.5 sm:gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-4 sm:w-6"
                  : "bg-border hover:bg-border/70"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselCard({ item }: { item: CarouselItem }) {
  const CardContent = () => (
    <div className="relative p-4 h-full bg-gradient-to-br rounded-xl border shadow-lg transition-all duration-300 from-background via-background/95 to-background/90 sm:rounded-2xl border-border/30 sm:p-6 md:p-8 hover:shadow-xl group/card">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl to-transparent rounded-full blur-2xl sm:w-24 sm:h-24 from-primary/5"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr to-transparent rounded-full blur-xl sm:w-16 sm:h-16 from-accent/10"></div>

      <div className="flex relative z-10 flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="flex gap-2 items-center sm:gap-3">
            {item.icon && (
              <div className="flex justify-center items-center w-8 h-8 rounded-lg sm:w-10 sm:h-10 sm:rounded-xl bg-primary/10 text-primary">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl text-foreground">
                {item.title}
              </h3>
              {item.category && (
                <p className="text-xs font-medium sm:text-sm text-muted-foreground">
                  {item.category}
                </p>
              )}
            </div>
          </div>
          {item.external && (
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
          )}
        </div>

        {/* Image if provided */}
        {item.image && (
          <div className="overflow-hidden mb-3 rounded-lg sm:mb-4 sm:rounded-xl">
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={128}
              className="object-cover w-full h-24 sm:h-32"
            />
          </div>
        )}

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-foreground/70 sm:text-base">
          {item.description}
        </p>

        {/* Action Button */}
        <div className="mt-4 sm:mt-6">
          <Button 
            variant="outline" 
            className="w-full h-10 text-sm transition-all duration-300 sm:h-11 sm:text-base group-hover/card:bg-primary group-hover/card:text-primary-foreground"
          >
            <span>Explore</span>
            <ChevronRight className="ml-2 w-3 h-3 transition-transform duration-300 sm:w-4 sm:h-4 group-hover/card:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );

  if (item.external) {
    return (
      <a 
        href={item.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full"
      >
        <CardContent />
      </a>
    );
  }

  return (
    <Link href={item.href} className="block h-full">
      <CardContent />
    </Link>
  );
} 