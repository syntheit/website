interface StorySectionProps {
  paragraphs: string[];
}

export function StorySection({ paragraphs }: StorySectionProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-foreground text-3xl font-bold">My Story</h2>
      <div className="prose prose-lg text-muted-foreground max-w-none space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
