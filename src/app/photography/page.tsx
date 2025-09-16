"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { ContactModal } from "@/components/ui/contact-modal";
import { ArrowLeft, Camera, MapPin, Calendar, Download, Dice6, Trees, Building2, Mountain, Car, Users, Palette, Maximize2, X, Heart, MessageSquare } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { photographyMetadata } from "../metadata/photography";
import { PhotoCard } from "@/components/ui/photo-card";

interface Photo {
  id: number;
  title: string;
  location: string;
  date: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  filename: string;
  metadata?: {
    ImageDescription?: string;
    CreateDate?: string;
    DateTimeOriginal?: string;
    DateTime?: string;
  };
}


export default function PhotographyPage() {
  const [selectedCategory, setSelectedCategory] = useState("favorites");
  const [shuffledPhotos, setShuffledPhotos] = useState<Photo[]>([]);
  const [displayedCount, setDisplayedCount] = useState(12); // Show 12 photos initially
  
  // Random photo selector states
  const [isRolling, setIsRolling] = useState(false);
  const [randomPhoto, setRandomPhoto] = useState<Photo | null>(null);
  const [showRandomResult, setShowRandomResult] = useState(false);
  const [hasRolledOnce, setHasRolledOnce] = useState(false);

  // Modal states
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Contact modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Transform metadata to photo objects
  const photos = useMemo(() => {
    return photographyMetadata.map((photo, index) => ({
      id: index + 1,
      title: "", // Removed title
      location: photo.location,
      date: photo.year.toString(),
      category: photo.category,
      description: "", // No descriptions
      image: `/images/photography/${photo.filename}`,
      featured: photo.featured,
      filename: photo.filename
    }));
  }, []);

  // Generate categories from photos
  const categoryCounts = photos.reduce((acc, photo) => {
    acc[photo.category] = (acc[photo.category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Category icons mapping
  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    favorites: Heart,
    all: Camera,
    street: Car,
    landscape: Mountain,
    portrait: Users,
    urban: Building2,
    nature: Trees,
    architecture: Palette
  };

  // Get favorites count (photos with featured: true)
  const favoritesCount = photos.filter(photo => photo.featured).length;
  
  const categories = [
    { id: "favorites", name: "Favorites", count: favoritesCount, icon: Heart },
    { id: "all", name: "All Photos", count: photos.length, icon: Camera },
    ...Object.entries(categoryCounts).map(([category, count]) => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      count,
      icon: categoryIcons[category] ?? Palette
    }))
  ];

  // Roll for random photo
  const rollRandomPhoto = () => {
    setIsRolling(true);
    setShowRandomResult(false);
    setRandomPhoto(null);
    
    // Use entire photos collection instead of filtered shuffledPhotos
    const randomIndex = Math.floor(Math.random() * photos.length);
    const selectedPhoto = photos[randomIndex];
    
    // Random animation duration between 1-3 seconds
    const animationDuration = Math.random() * 2000 + 1000; // 1000-3000ms
    
    setTimeout(() => {
      if (selectedPhoto) {
        setRandomPhoto(selectedPhoto);
        setIsRolling(false);
        setShowRandomResult(true);
        setHasRolledOnce(true);
      }
    }, animationDuration);
  };

  // Initialize selected category from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      // Check if the hash matches any valid category without using the categories array
      const validCategories = ['favorites', 'all', 'street', 'landscape', 'portrait', 'urban', 'nature', 'architecture'];
      if (validCategories.includes(hash)) {
        setSelectedCategory(hash);
      }
    }
  }, []);

  // Update URL hash when selected category changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = selectedCategory;
    }
  }, [selectedCategory]);

  // Shuffle photos on client side only
  useEffect(() => {
    const categoryPhotos = selectedCategory === "all" 
      ? photos 
      : selectedCategory === "favorites"
      ? photos.filter(photo => photo.featured)
      : photos.filter(photo => photo.category === selectedCategory);
    
    // Shuffle all photos
    const shuffled = [...categoryPhotos].sort(() => Math.random() - 0.5);
    setShuffledPhotos(shuffled);
    setDisplayedCount(12); // Reset displayed count when changing categories
  }, [selectedCategory, photos]);

  const currentPhotos = shuffledPhotos;
  const displayedPhotos = currentPhotos.slice(0, displayedCount);
  const hasMorePhotos = displayedCount < currentPhotos.length;

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="px-4 pb-6 sm:px-8 md:px-12">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto space-y-12 max-w-7xl">
          {/* Hero Section */}
          <div className="space-y-6 text-center">
            <div className="flex justify-center items-center mx-auto w-32 h-32 bg-gradient-to-br rounded-full border from-primary/20 to-accent/30 border-border/30">
              <Camera className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black md:text-5xl text-foreground">
                <span className="text-primary">Photography</span> Portfolio
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Capturing moments, stories, and the beauty of the world through my lens. 
                From street photography to landscapes, each image tells a unique story.
              </p>
            </div>
          </div>

          {/* Equipment Section */}
          <div className="p-8 space-y-8 bg-gradient-to-br rounded-3xl from-primary/5 to-accent/10">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-foreground">My Gear</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                The tools I use to capture the world around me. From professional DSLR to mobile photography, 
                I believe great photos can be taken with any camera in the right hands.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Cameras */}
              <div className="p-6 space-y-4 rounded-2xl border bg-card/50 border-border/50">
                <div className="flex gap-3 items-center">
                  <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary/20">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Cameras</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                    <div>
                      <div className="font-medium text-foreground">Nikon D800</div>
                      <div className="text-sm text-muted-foreground">36.3MP Full-Frame</div>
                    </div>
                    <div className="text-xs font-medium text-primary">Primary</div>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                    <div>
                      <div className="font-medium text-foreground">Google Pixel 9 Pro XL</div>
                      <div className="text-sm text-muted-foreground">50MP Mobile</div>
                    </div>
                    <div className="text-xs font-medium text-primary">Mobile</div>
                  </div>
                </div>
              </div>
              
              {/* Lenses */}
              <div className="p-6 space-y-4 rounded-2xl border bg-card/50 border-border/50">
                <div className="flex gap-3 items-center">
                  <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary/20">
                    <Maximize2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Lenses</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                    <div>
                      <div className="font-medium text-foreground">Nikon 24-120mm f/4G</div>
                      <div className="text-sm text-muted-foreground">ED VR Zoom</div>
                    </div>
                    <div className="text-xs font-medium text-primary">Versatile</div>
                  </div>
                </div>
              </div>
              
              {/* Software */}
              <div className="p-6 space-y-4 rounded-2xl border bg-card/50 border-border/50">
                <div className="flex gap-3 items-center">
                  <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary/20">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Software</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                    <div>
                      <div className="font-medium text-foreground">Adobe Lightroom</div>
                      <div className="text-sm text-muted-foreground">Color & Exposure</div>
                    </div>
                    <div className="text-xs font-medium text-primary">Editing</div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Random Photo Selector */}
            <div className="p-8 space-y-6 bg-gradient-to-br rounded-3xl from-primary/5 to-accent/10">
              <div className="space-y-4 text-center">
                <h2 className="text-2xl font-bold text-foreground">Feeling Lucky?</h2>
                <p className="mx-auto max-w-md text-muted-foreground">
                  Roll the dice to discover a random photo from my entire collection!
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={rollRandomPhoto}
                  disabled={isRolling}
                  size="lg"
                  className="gap-3 px-10 py-6 text-lg font-semibold"
                >
                  <Dice6 className={`h-6 w-6 ${isRolling ? 'animate-spin' : ''}`} />
                  {isRolling ? 'Rolling...' : hasRolledOnce ? 'Roll Again' : 'Roll for Random Photo'}
                </Button>
              </div>

              {/* Random Photo Result */}
              {showRandomResult && randomPhoto && (
                <div className="mt-8 duration-500 animate-in slide-in-from-bottom-4">
                  <div className="mx-auto max-w-md">
                    <PhotoCard 
                      photo={randomPhoto}
                      onFullScreen={(photo: Photo) => {
                        setSelectedPhoto(photo);
                        setIsModalOpen(true);
                      }}
                      showActions={true}
                      showMetadata={true}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Download All Photos */}
            <div className="p-8 space-y-6 bg-gradient-to-br rounded-3xl from-primary/5 to-accent/10">
              <div className="space-y-4 text-center">
                <h2 className="text-2xl font-bold text-foreground">Download All Photos</h2>
                <p className="mx-auto max-w-md text-muted-foreground">
                  Get all my photos in high resolution for personal use or printing.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={() => {
                    // Download the zip file containing all photos
                    const downloadUrl = '/images/daniel-miller-photos.zip';
                    
                    // Create a temporary link element to trigger download
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = 'daniel-miller-photos.zip';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  size="lg"
                  className="gap-2 px-6 py-4 text-base font-semibold sm:gap-3 sm:px-10 sm:py-6 sm:text-lg"
                >
                  <Download className="w-5 h-5 sm:h-6 sm:w-6" />
                  <span className="whitespace-nowrap">Download All Photos</span>
                  <span className="hidden sm:inline">(Full Res)</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    variant={selectedCategory === category.id ? "default" : "secondary"}
                    size="lg"
                    className={`flex items-center gap-2 px-6 py-6 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "shadow-lg"
                        : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name} ({category.count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory === "all" ? "All Photos" : selectedCategory === "favorites" ? "Favorites" : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="text-sm text-muted-foreground">
                {currentPhotos.length} photos
              </div>
            </div>
            
            <div key={`photos-${displayedCount}`} className="columns-1 md:columns-2 lg:columns-2 xl:columns-3 gap-3">
              {displayedPhotos.map((photo) => (
                <div key={photo.id} className="relative mb-3 break-inside-avoid">
                  <PhotoCard 
                    photo={photo}
                    onFullScreen={(photo: Photo) => {
                      setSelectedPhoto(photo);
                      setIsModalOpen(true);
                    }}
                    showActions={true}
                    showMetadata={false}
                  />
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMorePhotos && (
              <div className="flex justify-center pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setDisplayedCount(prev => Math.min(prev + 12, currentPhotos.length))}
                  className="px-8"
                >
                  Load More ({currentPhotos.length - displayedCount} remaining)
                </Button>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="p-8 space-y-6 text-center bg-gradient-to-br rounded-3xl from-primary/5 to-accent/10">
            <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              Interested in my photography? Want to collaborate on a project or just chat about cameras and travel? 
              I&apos;d love to hear from you!
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsContactModalOpen(true)}
              >
                <MessageSquare className="mr-2 w-4 h-4" />
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Modal */}
      {isModalOpen && selectedPhoto && (
        <div 
          className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/90"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="overflow-hidden relative max-w-7xl max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action buttons */}
            <div className="flex absolute top-4 right-4 z-10 gap-2">
              {/* Download button */}
              <Button 
                size="lg"
                onClick={() => {
                  // Convert webp filename to jpg and download from high-quality directory
                  const jpgFilename = selectedPhoto.filename.replace('.webp', '.jpg');
                  const downloadUrl = `/images/high-quality/${jpgFilename}`;
                  
                  console.log('Downloading:', downloadUrl);
                  
                  // Create a temporary link element to trigger download
                  const link = document.createElement('a');
                  link.href = downloadUrl;
                  link.download = jpgFilename;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex gap-2 items-center p-4 text-white rounded-full transition-colors duration-200 bg-black/50 hover:bg-black/70"
              >
                <Download className="w-5 h-5" />
                <span className="text-sm font-medium">Download Full-Res</span>
              </Button>
              
              {/* Close button */}
              <Button
                onClick={() => setIsModalOpen(false)}
                size="lg"
                className="flex gap-2 items-center p-4 text-white rounded-full transition-colors duration-200 bg-black/50 hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Image */}
            <Image
              src={selectedPhoto.image}
              alt={selectedPhoto.location}
              width={3840}
              height={2880}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {/* Photo info */}
            <div className="absolute right-0 bottom-0 left-0 p-6 text-white bg-gradient-to-t to-transparent from-black/80">
              <div className="space-y-2">
                <div className="flex gap-4 items-center text-sm text-white/80">
                  <div className="flex gap-1 items-center">
                    <MapPin className="w-4 h-4" />
                    {selectedPhoto.location}
                  </div>
                  <div className="flex gap-1 items-center">
                    <Calendar className="w-4 h-4" />
                    {selectedPhoto.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </main>
  );
} 