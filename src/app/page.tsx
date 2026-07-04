"use client";

import { Navbar } from "@/components/ui/navbar";
import { StripeSnake } from "@/components/stripe-snake";
import Link from "next/link";

const socialLinks = [
  { href: "https://www.linkedin.com/in/daniel-m-miller", text: "LinkedIn" },
  { href: "https://github.com/syntheit", text: "GitHub" },
  { href: "https://open.spotify.com/user/312k3mbad43po7ghp67ralyw2j6q", text: "Spotify" },
  { href: "https://www.pexels.com/@daniel-miller-2106839", text: "Photos" },
  { href: "/Daniel Miller Resume.pdf", text: "Resume" },
  { href: "http://beliapp.co/app/synzeit", text: "Beli" },
];

const projectCards = [
  {
    tag: "Finance",
    title: "Retrospend",
    description: "Personal finance app for tracking expenses, wealth, and multi-currency transactions with exchange rate integration.",
    href: "https://retrospend.app",
  },
  {
    tag: "Development",
    title: "Projects & Apps",
    description: "12 software projects from full-stack web apps to infrastructure tools, built with modern technologies.",
    href: "/projects",
  },
  {
    tag: "Curated",
    title: "Cool Resources",
    description: "700+ curated websites, tools, articles, and resources I find interesting and useful. From coding to history.",
    href: "/resources",
  },
  {
    tag: "Travel",
    title: "World Atlas",
    description: "A personal atlas of 1,900+ places across 28 countries — restaurants, cafes, museums, hikes, and more.",
    href: "/world",
  },
  {
    tag: "Learning",
    title: "Language Journey",
    description: "6 languages and counting. Resources, strategies, and the ongoing journey of a polyglot in Buenos Aires.",
    href: "/languages",
  },
  {
    tag: "Art",
    title: "Photography",
    description: "Capturing moments from travels and daily life. Landscapes, street photography, and everything in between.",
    href: "/photography",
  },
];

const infoItems = [
  { label: "Location", value: "Buenos Aires" },
  { label: "Originally", value: "Chicago, IL" },
  { label: "Languages", value: "6 and counting" },
  { label: "Focus", value: "Full-stack dev" },
];

// Rounded on purpose — the exact counts drift with every data refresh.
const stats = [
  { number: "28", label: "Countries visited" },
  { number: "700+", label: "Resources curated" },
  { number: "12", label: "Projects built" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      <StripeSnake />

      <div className="relative z-[1] max-w-[1400px] mx-auto">
        <Navbar />

        {/* Hero Section */}
        <section className="max-w-[640px] pt-[100px] pb-[120px] px-8 md:px-14">
          <h1 className="font-serif text-[48px] md:text-[64px] font-[900] leading-[1.05] mb-6 tracking-tight text-[#3B2314]">
            Daniel Miller
          </h1>
          {/* TODO: Consider tweaking the tagline. "building businesses" is aspirational — */}
          {/* asado events are early stage, community buying platform is in validation. */}
          {/* Options: "building things", "building projects and businesses", or keep it if you feel it's accurate enough. */}
          {/* The rest of the tagline is solid. */}
          <p className="text-[17px] leading-[1.75] text-[#7A5C42] max-w-[460px] mb-9">
            Programmer, entrepreneur, and perpetual learner building things
            in Buenos Aires while chasing marathons, languages, and whatever
            comes next.
          </p>
          <div className="flex gap-[10px] flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-[9px] border-[1.5px] border-[#3B2314] rounded-full text-[#3B2314] text-[13px] font-medium hover:bg-[#3B2314] hover:text-[#F5EBD9] transition-all"
              >
                {link.text}
              </a>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-[72px] px-8 md:px-14">
          <h2 className="font-serif text-[36px] font-extrabold mb-3 tracking-tight">
            Explore My Work
          </h2>
          <p className="text-[#7A5C42] text-[15px] mb-10">
            Projects, resources, and experiences I&apos;ve put together
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {projectCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-[#F5EBD9] rounded-2xl p-8 border-[1.5px] border-[rgba(59,35,20,0.08)] hover:-translate-y-[5px] hover:shadow-[0_12px_32px_rgba(59,35,20,0.1)] hover:border-[#D4581A] transition-all cursor-pointer block"
              >
                <span className="inline-block text-[11px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-[14px] px-[10px] py-1 bg-[rgba(212,88,26,0.08)] rounded">
                  {card.tag}
                </span>
                <h3 className="font-serif text-[21px] font-bold mb-[10px]">
                  {card.title}
                </h3>
                <p className="text-sm text-[#7A5C42] leading-[1.65]">
                  {card.description}
                </p>
                <span className="inline-block mt-4 text-[13px] font-semibold text-[#D4581A]">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-[72px] px-8 md:px-14 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <h2 className="font-serif text-[36px] font-extrabold mb-5 tracking-tight">
              About Me
            </h2>
            {/* TODO: Rewrite both paragraphs. The current text is generic and could be anyone. */}
            {/* Paragraph 1: Who you are — specific, not vibes. */}
            {/*   22, from Chicago, half-Ukrainian, living in Buenos Aires. Dropped out of RPI to move here. */}
            {/*   Why BA — you chose it deliberately: chaos over comfort, interesting process over perfect destination. */}
            {/* Paragraph 2: What your days look like — make it vivid. */}
            {/*   Code for New Reach during the day, run 30-50km/week, climb weekly, cook everything from scratch. */}
            {/*   Mundo Lingo, Russian cultural center on Saturdays, asado networking events with Mitko. */}
            {/*   Reading Argentine literature in Spanish, watching French films, building Retrospend at night. */}
            {/* Tone: like the homepage hero tagline but with more texture. Not a pitch, just your life. */}
            {/* Dev-only reminder — never ships. Replace with the real paragraphs. */}
            {process.env.NODE_ENV !== "production" && (
              <>
                <p className="text-base leading-[1.75] text-[#7A5C42] mb-4 max-w-[500px]">
                  [Rewrite: who you are and why Buenos Aires — see TODO above]
                </p>
                <p className="text-base leading-[1.75] text-[#7A5C42] mb-4 max-w-[500px]">
                  [Rewrite: what your days actually look like — see TODO above]
                </p>
              </>
            )}
            <div className="grid grid-cols-2 gap-5 mt-8">
              {infoItems.map((item) => (
                <div key={item.label}>
                  <div className="text-[11px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-1">
                    {item.label}
                  </div>
                  <div className="font-serif text-lg font-semibold">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 min-w-[240px] w-full lg:w-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#F5EBD9] rounded-[14px] px-7 py-6 border-[1.5px] border-[rgba(59,35,20,0.08)]"
              >
                <div className="font-serif text-[36px] font-black text-[#D4581A] leading-none">
                  {stat.number}
                </div>
                <div className="text-[13px] text-[#7A5C42] mt-[6px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 md:px-14 pt-12 pb-10 flex justify-between items-end">
          <div>
            <div className="font-serif text-lg font-extrabold text-[#3B2314]">
              Daniel Miller
            </div>
            <div className="text-[13px] text-[#7A5C42] mt-[6px]">
              Buenos Aires, Argentina
            </div>
          </div>
          <div className="flex gap-5">
            <a
              href="https://www.linkedin.com/in/daniel-m-miller"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#7A5C42] hover:text-[#D4581A] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/syntheit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#7A5C42] hover:text-[#D4581A] transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:daniel@matv.io"
              className="text-[13px] text-[#7A5C42] hover:text-[#D4581A] transition-colors"
            >
              Email
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
