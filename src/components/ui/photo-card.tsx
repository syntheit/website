"use client";

import Image from "next/image";
import { Download, Maximize2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadImage } from "@/lib/utils";

interface PhotoCardProps {
  photo: {
    url: string;
    description: string;
    pexelsUrl?: string;
  };
  onFullScreen?: (photo: PhotoCardProps['photo']) => void;
  showActions?: boolean;
  showMetadata?: boolean;
  className?: string;
}

export function PhotoCard({ photo, onFullScreen, showActions = true, showMetadata = false, className = "" }: PhotoCardProps) {
  if (!photo.url) {
    return null;
  }

  const getPexelsViewUrl = () => {
    if (photo.pexelsUrl) {
      return photo.pexelsUrl;
    }
    const match = /\/photos\/(\d+)\//.exec(photo.url);
    return match ? `https://www.pexels.com/photo/${match[1]}/` : null;
  };

  const pexelsUrl = getPexelsViewUrl();

  return (
    <div className={`relative group ${className}`}>
      <div
        className="relative rounded-lg cursor-pointer bg-muted/20"
        onClick={() => onFullScreen?.(photo)}
      >
        <Image
          src={photo.url}
          alt={photo.description}
          width={1600}
          height={1200}
          className="object-contain w-full h-auto rounded-lg"
        />

        {showActions && (
          <div className={`flex absolute top-3 right-3 gap-2 ${!showMetadata ? 'opacity-0 transition-opacity duration-300 group-hover:opacity-100' : ''}`}>
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

            <Button
              size="icon"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                downloadImage(photo.url, `photo-${Date.now()}.jpg`);
              }}
              className="bg-white/90 hover:bg-white text-black"
            >
              <Download className="w-4 h-4" />
            </Button>

            {pexelsUrl && (
              <Button
                size="icon"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(pexelsUrl, '_blank');
                }}
                className="bg-white/90 hover:bg-white text-black"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {showMetadata && (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            {photo.description}
          </p>
        </div>
      )}
    </div>
  );
} 