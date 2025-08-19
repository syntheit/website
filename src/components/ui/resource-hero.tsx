export function ResourceHero() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center items-center mx-auto w-32 h-32 bg-gradient-to-br rounded-full border from-primary/20 to-accent/30 border-border/30">
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-black md:text-5xl text-foreground">
          Cool <span className="text-primary">Resources</span>
        </h1>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
          A curated collection of awesome websites, tools, and resources that I find interesting and useful. 
          From coding tutorials to random Wikipedia articles, there&apos;s something here for everyone.
        </p>
      </div>
    </div>
  );
}
