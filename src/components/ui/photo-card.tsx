"use client";

import Image from "next/image";
import { Download, Maximize2, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoCardProps {
  photo: {
    id: number;
    title: string;
    location: string;
    date: string;
    category: string;
    description: string;
    image: string;
    featured: boolean;
    filename: string;
  };
  onFullScreen?: (photo: PhotoCardProps['photo']) => void;
  showActions?: boolean;
  showMetadata?: boolean;
  className?: string;
}

export function PhotoCard({ photo, onFullScreen, showActions = true, showMetadata = false, className = "" }: PhotoCardProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Image Container */}
      <div 
        className="relative rounded-lg cursor-pointer bg-muted/20"
        onClick={() => onFullScreen?.(photo)}
      >
        <Image
          src={photo.image}
          alt={photo.description}
          width={1600}
          height={1200}
          className="object-cover w-full h-auto rounded-lg"
        />
        
        {/* Overlay with info on hover (only when showMetadata is false) */}
        {!showMetadata && (
          <div className="absolute inset-0 rounded-lg transition-colors duration-300 bg-black/0 group-hover:bg-black/40">
            <div className="absolute right-0 bottom-0 left-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="space-y-2">
                <div className="flex gap-3 items-center text-xs text-white/80">
                  <div className="flex gap-1 items-center">
                    <MapPin className="w-3 h-3" />
                    {photo.location}
                  </div>
                  <div className="flex gap-1 items-center">
                    <Calendar className="w-3 h-3" />
                    {photo.date}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            {showActions && (
              <div className="flex absolute top-3 right-3 gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {/* Full-screen button */}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFullScreen?.(photo);
                  }}
                  className="bg-white/90 hover:bg-white text-black"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                
                {/* Download button */}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Download button clicked!');
                    
                    // Convert webp filename to jpg and download from high-quality directory
                    const jpgFilename = photo.filename.replace('.webp', '.jpg');
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
                  className="bg-white/90 hover:bg-white text-black"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
            

          </div>
        )}
        
        {/* Action buttons for showMetadata mode */}
        {showMetadata && showActions && (
          <div className="flex absolute top-3 right-3 gap-2">
            {/* Full-screen button */}
            <Button
              size="icon"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onFullScreen?.(photo);
              }}
              className="bg-white/90 hover:bg-white text-black"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            
            {/* Download button */}
            <Button
              size="icon"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Download button clicked!');
                
                // Convert webp filename to jpg and download from high-quality directory
                const jpgFilename = photo.filename.replace('.webp', '.jpg');
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
              className="bg-white/90 hover:bg-white text-black"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        )}
        

      </div>
      
      {/* Metadata below image (only when showMetadata is true) */}
      {showMetadata && (
        <div className="mt-3 space-y-2">
          <div className="flex gap-3 items-center text-xs text-muted-foreground">
            <div className="flex gap-1 items-center">
              <MapPin className="w-3 h-3" />
              {photo.location}
            </div>
            <div className="flex gap-1 items-center">
              <Calendar className="w-3 h-3" />
              {photo.date}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 