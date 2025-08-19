"use client";

import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Navbar } from "@/components/ui/navbar";
import { Carousel } from "@/components/ui/carousel";
import { carouselItems } from "@/data/carousel-items";
import { Utensils, Camera, FileText } from "lucide-react";
import { LuLinkedin, LuGithub, } from "react-icons/lu";
import { AiOutlineSpotify } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <svg id="visual" viewBox="0 0 960 540" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <path d="M0 191L137 271L274 269L411 307L549 294L686 282L823 212L960 222L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z" fill="#65c3ac"></path>
          <path d="M0 320L137 305L274 300L411 303L549 342L686 339L823 254L960 300L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z" fill="#4a9b8a"></path>
          <path d="M0 393L137 410L274 412L411 319L549 322L686 337L823 398L960 319L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z" fill="#2a5b46"></path>
          <path d="M0 443L137 447L274 444L411 432L549 441L686 376L823 440L960 451L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z" fill="#1e4536"></path>
          <path d="M0 459L137 467L274 464L411 491L549 455L686 460L823 478L960 471L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z" fill="#152f26"></path>
        </svg>
      </div>

      <Navbar />

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 z-20">
        <div className="w-full max-w-6xl bg-gradient-to-br from-[#fbf8f0] via-[#f8f5ed] to-[#f5f2ea] rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-2xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 relative z-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="space-y-2 sm:space-y-3 flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight">
                    Hey, I&apos;m <span className="text-primary">Daniel</span>
                  </h2>
                  <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                  A programmer, entrepreneur, and perpetual learner building businesses in Argentina while pursuing marathons, languages, and the next adventure.
                  </p>
                </div>
                
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl overflow-hidden border border-border/30 flex-shrink-0 shadow-lg">
                  <Image 
                    src="/profile.webp" 
                    alt="Daniel Miller" 
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <Link href="/about" className="block pb-2 sm:pb-3">
                  <Button className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group">
                    <span>Learn about me</span>
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 justify-items-center">
                  <LinkButton
                    href="https://www.linkedin.com/in/daniel-m-miller"
                    icon={LuLinkedin}
                    text="LinkedIn"
                    iconBgColor="bg-blue-500/10"
                    external
                  />

                  <LinkButton
                    href="https://github.com/syntheit"
                    icon={LuGithub}
                    text="GitHub"
                    iconBgColor="bg-gray-500/10"
                    external
                  />
                  <LinkButton
                    href="https://open.spotify.com/user/312k3mbad43po7ghp67ralyw2j6q"
                    icon={AiOutlineSpotify}
                    text="Spotify"
                    iconBgColor="bg-green-500/10"
                    external
                  />
                  <LinkButton
                    href="/Daniel Miller Resume.pdf"
                    icon={FileText}
                    text="Resume"
                    iconBgColor="bg-orange-500/10"
                    external
                  />
                  <LinkButton
                    href="https://glass.photo/matv"
                    icon={Camera}
                    text="Photos"
                    iconBgColor="bg-purple-500/10"
                    external
                  />
                  <LinkButton
                    href="http://beliapp.co/app/synzeit"
                    icon={Utensils}
                    text="Beli"
                    iconBgColor="bg-blue-500/10"
                    external
                  />
                </div>
              </div>
            </div>

            {/* Right Section - Carousel */}
            <div className="flex items-center justify-center">
              <div className="w-full h-full">
                <Carousel 
                  items={carouselItems}
                  title="Explore My Work"
                  subtitle="Discover projects, resources, and experiences I've curated"
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}
