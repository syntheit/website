import { Navbar } from "@/components/ui/navbar";

const languages = [
  {
    name: "English",
    native: "English",
    level: "NATIVE",
    filled: 12,
    isNative: true,
    blurb: "Native. Work language, daily default. 22 years.",
    goal: null,
  },
  {
    name: "Spanish",
    native: "Español",
    level: "B2",
    filled: 8,
    isNative: false,
    blurb:
      "Full immersion in Buenos Aires. Argentine friends, daily life in Spanish, reading Argentine literature. Goal is functionally native by the time I get my passport.",
    goal: "B2 → C1",
  },
  {
    name: "French",
    native: "Français",
    level: "B2",
    filled: 8,
    isNative: false,
    blurb:
      "Started in middle school. Kept alive through French films, music, and friends here in BA. It speaks to my soul in a way I can't fully explain.",
    goal: "Maintain B2, advance speaking",
  },
  {
    name: "Russian",
    native: "Русский",
    level: "B1",
    filled: 6,
    isNative: false,
    blurb:
      "Weekly lessons, Saturday cultural center, Russian friends in BA. My Ukrainian heritage gives me a Slavic foundation that speeds things up. Comprehension ahead of production.",
    goal: "B1 → B2",
  },
  {
    name: "Ukrainian",
    native: "Українська",
    level: "A2",
    filled: 4,
    isNative: false,
    blurb:
      "Heritage language from mom's side. Half my family lives in Ukraine. Not actively studying yet, waiting until Russian is stronger since they reinforce each other.",
    goal: null,
  },
  {
    name: "Portuguese",
    native: "Português",
    level: "B1",
    filled: 6,
    isNative: false,
    blurb:
      "Brazilian friend João is the main driver — we speak Portuguese together, he helps with BRL logistics, and trips to southern Brazil fill in the gaps. Spanish and Portuguese reinforce each other constantly.",
    goal: null,
  },
];

const roadmap = [
  {
    year: "Now → 2028",
    title: "Focus on fluency in current 6",
    desc: "Spanish, French, Russian, Portuguese, Ukrainian, English",
  },
  { year: "~2028", title: "Mandarin Chinese", desc: "For Taiwan" },
  { year: "~2029", title: "Turkish", desc: "For Georgia and Turkey" },
  {
    year: "~2030",
    title: "Arabic",
    desc: "Levantine focus, Gulf familiarity. Oman and the Gulf States by car.",
  },
  {
    year: "Over time",
    title: "Romance freebies",
    desc: "Italian, Catalan, Romanian. Passive absorption through the shared architecture.",
  },
  { year: "By 40", title: "15 languages, 10 families", desc: "The long game." },
];

const STRIPE_COLORS = ["#3B2314", "#D4581A", "#E8941A", "#E8C95A", "#F5EBD9"];

function StripeDivider({ reversed = false }: { reversed?: boolean }) {
  const colors = reversed ? [...STRIPE_COLORS].reverse() : STRIPE_COLORS;
  return (
    <div className="flex h-6 w-full">
      {colors.map((color, i) => (
        <div key={i} className="flex-1" style={{ background: color }} />
      ))}
    </div>
  );
}

function Gauge({ filled, isNative }: { filled: number; isNative: boolean }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-[10px] flex-1 rounded-[2px]"
          style={{
            background:
              i < filled
                ? isNative
                  ? "#3B2314"
                  : "#D4581A"
                : "#D9C4A3",
          }}
        />
      ))}
    </div>
  );
}

export default function LanguagesPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
      <Navbar />

      {/* Page Header */}
      <div className="text-center px-8 pt-16 pb-14">
        <h1 className="font-serif text-[52px] font-black leading-[1.1] mb-4">
          Language <span className="text-[#D4581A] italic">Journey</span>
        </h1>
        <p className="text-[16px] text-[#7A5C42] leading-[1.7] max-w-[520px] mx-auto">
          6 languages and counting. Every language tied to real people, real
          places, and real experiences.
        </p>
      </div>

      {/* Language Data Table */}
      <div className="px-8 md:px-14 pb-16">
        {/* Desktop table */}
        <div className="hidden lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Language", "Level", "Proficiency", "", "2026 Goal"].map(
                  (h, i) => (
                    <th
                      key={i}
                      className="text-[11px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold text-left px-4 py-3.5 border-b-2 border-[#3B2314]"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {languages.map((lang, idx) => (
                <tr
                  key={lang.name}
                  className="transition-colors hover:bg-[rgba(245,235,217,0.5)]"
                  style={{
                    borderBottom:
                      idx < languages.length - 1
                        ? "1px solid rgba(59,35,20,0.1)"
                        : "none",
                  }}
                >
                  <td className="px-4 py-6 align-top min-w-[140px]">
                    <div className="font-serif text-[18px] font-bold">
                      {lang.name}
                    </div>
                    <div className="text-[13px] text-[#7A5C42] mt-0.5">
                      {lang.native}
                    </div>
                  </td>
                  <td className="px-4 py-6 align-top min-w-[80px]">
                    <span
                      className={`font-mono text-[12px] font-bold px-2.5 py-1 tracking-[1px] inline-block ${
                        lang.isNative
                          ? "bg-[#D4581A] text-white"
                          : "bg-[rgba(59,35,20,0.08)] text-[#3B2314]"
                      }`}
                    >
                      {lang.level}
                    </span>
                  </td>
                  <td className="px-4 pt-7 pb-6 align-top min-w-[180px]">
                    <Gauge filled={lang.filled} isNative={lang.isNative} />
                  </td>
                  <td className="px-4 py-6 align-top text-[14px] text-[#7A5C42] leading-[1.6] max-w-[360px]">
                    {lang.blurb}
                  </td>
                  <td className="px-4 py-6 align-top min-w-[130px]">
                    {lang.goal && (
                      <>
                        <span className="text-[11px] uppercase tracking-[1px] text-[#D4581A] font-semibold block mb-0.5">
                          2026
                        </span>
                        <span className="text-[13px] text-[#3B2314]">
                          {lang.goal}
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked layout */}
        <div className="lg:hidden space-y-0">
          {languages.map((lang, idx) => (
            <div
              key={lang.name}
              className="py-6"
              style={{
                borderBottom:
                  idx < languages.length - 1
                    ? "1px solid rgba(59,35,20,0.1)"
                    : "none",
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-serif text-[18px] font-bold">
                    {lang.name}
                  </div>
                  <div className="text-[13px] text-[#7A5C42]">
                    {lang.native}
                  </div>
                </div>
                <span
                  className={`font-mono text-[12px] font-bold px-2.5 py-1 tracking-[1px] shrink-0 ${
                    lang.isNative
                      ? "bg-[#D4581A] text-white"
                      : "bg-[rgba(59,35,20,0.08)] text-[#3B2314]"
                  }`}
                >
                  {lang.level}
                </span>
              </div>
              <div className="mb-3">
                <Gauge filled={lang.filled} isNative={lang.isNative} />
              </div>
              <p className="text-[14px] text-[#7A5C42] leading-[1.6]">
                {lang.blurb}
              </p>
              {lang.goal && (
                <div className="mt-3">
                  <span className="text-[11px] uppercase tracking-[1px] text-[#D4581A] font-semibold mr-2">
                    2026
                  </span>
                  <span className="text-[13px] text-[#3B2314]">
                    {lang.goal}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stripe Divider */}
      <StripeDivider />

      {/* My Approach — dev-only until the copy is written; never ships as a placeholder. */}
      {process.env.NODE_ENV !== "production" && (
      <>
      <section className="px-8 md:px-14 py-16">
        <h2 className="font-serif text-[32px] font-extrabold mb-8 tracking-tight">
          My Approach
        </h2>
        <div className="bg-[#F5EBD9] rounded-xl p-8 border-2 border-dashed border-[rgba(59,35,20,0.15)] text-[#7A5C42] text-[14px] italic leading-[1.7] max-w-[680px]">
          {/* TODO: Daniel writes this. 2-3 paragraphs in first person. */}
          {/* Paragraph 1 — The philosophy: */}
          {/*   "I don't study languages — I live them." Every language tied to real people, places, experiences. */}
          {/*   No flashcards, no grammar tables. You learn Spanish because you live in BA, Russian because of your heritage */}
          {/*   and the cultural center on Saturdays, French because it speaks to your soul. */}
          {/* Paragraph 2 — The method: */}
          {/*   Steve Kaufmann-aligned: comprehensible input at 85-90%, speak early, tolerate mistakes. */}
          {/*   De-anglicize entertainment — if content doesn't need English, it shouldn't be in English. */}
          {/*   French films, Argentine literature, Russian mafia game nights, Portuguese with João. */}
          {/*   LLMs as infinitely patient conversation partners and tutors. */}
          {/* Paragraph 3 — The psycholinguistic reality (optional, makes it interesting): */}
          {/*   Cross-linguistic activation — wrong-language words surface daily, dreams in mixed languages, */}
          {/*   mental math now in Spanish. Romance cluster functions as unified system. */}
          {/*   ~20 min warmup to fluency when switching. The goal is thinking in each language, not translating. */}
          {/* Tone: confident but not preachy. You're describing what works for you, not prescribing. */}
          [Write your approach here]
        </div>
      </section>

      {/* Stripe Divider (reversed) */}
      <StripeDivider reversed />
      </>
      )}

      {/* Roadmap */}
      <section className="px-8 md:px-14 py-16">
        <h2 className="font-serif text-[32px] font-extrabold mb-8 tracking-tight">
          Roadmap
        </h2>
        <div className="max-w-[700px]">
          {roadmap.map((item, idx) => (
            <div key={idx} className="flex gap-6 relative pb-9 last:pb-0">
              {/* Year label */}
              <div className="font-serif text-[20px] font-extrabold text-[#D4581A] min-w-[120px] pt-0.5 text-right hidden md:block">
                {item.year}
              </div>

              {/* Track */}
              <div className="relative w-5 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#D4581A] shrink-0 mt-[6px] z-[1]" />
                {idx < roadmap.length - 1 && (
                  <div className="w-[3px] bg-[#D9C4A3] flex-1 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="pt-0.5 flex-1">
                {/* Year label on mobile */}
                <div className="md:hidden font-serif text-[16px] font-extrabold text-[#D4581A] mb-1">
                  {item.year}
                </div>
                <div className="font-serif text-[16px] font-bold mb-1">
                  {item.title}
                </div>
                <div className="text-[14px] text-[#7A5C42] leading-[1.6]">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Stripe Divider */}
      <StripeDivider />

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
