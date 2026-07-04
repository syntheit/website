"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import type { Photo } from "@/lib/photos";

interface Props {
  photos: Photo[];
}

function pickRandom(photos: Photo[], excludeId?: number): Photo | null {
  if (photos.length === 0) return null;
  if (photos.length === 1) return photos[0] ?? null;
  // Avoid immediately repeating the previously shown photo so "Another"
  // always changes something.
  const pool =
    excludeId !== undefined
      ? photos.filter((p) => p.id !== excludeId)
      : photos;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx] ?? null;
}

export function RandomPhotoButton({ photos }: Props) {
  const [current, setCurrent] = useState<Photo | null>(null);

  function open() {
    setCurrent(pickRandom(photos));
  }

  function reroll() {
    setCurrent((prev) => pickRandom(photos, prev?.id));
  }

  function close() {
    setCurrent(null);
  }

  const caption = current?.location ?? current?.description ?? "";

  return (
    <>
      <button
        onClick={open}
        disabled={photos.length === 0}
        className="cursor-pointer px-5 py-2.5 bg-primary text-white border-[1.5px] border-primary rounded-full text-[13px] font-medium hover:bg-[#b84a15] hover:border-[#b84a15] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Random Photo
      </button>

      <Modal
        isOpen={current !== null}
        onClose={close}
        maxWidth="max-w-3xl"
        stripe
      >
        {current && (
          <div className="flex flex-col gap-4">
            <div className="relative w-full overflow-hidden rounded-xl bg-[rgba(59,35,20,0.06)]">
              <Image
                key={current.id}
                src={current.image_url}
                alt={
                  current.description?.trim()
                    ? current.description
                    : (current.location ?? `Pexels photo ${current.id}`)
                }
                width={current.width}
                height={current.height}
                className="w-full h-auto block"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>

            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                {caption && (
                  <p className="font-serif text-[15px] text-foreground leading-snug">
                    {caption}
                  </p>
                )}
                <a
                  href={current.pexels_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-[12px] font-mono text-primary hover:underline"
                >
                  View on Pexels →
                </a>
              </div>
              <button
                onClick={reroll}
                className="cursor-pointer shrink-0 px-4 py-2 bg-primary text-white border-[1.5px] border-primary rounded-full text-[13px] font-medium hover:bg-[#b84a15] hover:border-[#b84a15] transition-colors"
              >
                Another
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
