import { draftCopy } from "@/lib/utils";

interface Genre {
  name: string;
  artists: string[];
  color: string;
}

interface MusicSectionProps {
  intro: string;
  genres: Genre[];
  spotifyUrl: string;
  stats: {
    songs: string;
    playlists: string;
  };
}

export function MusicSection({
  intro,
  genres,
  spotifyUrl,
  stats,
}: MusicSectionProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="font-serif text-[32px] font-extrabold tracking-tight">
            Music
          </h2>
          <div className="flex gap-4 text-[13px] text-muted-foreground">
            <span>
              <span className="font-mono font-bold text-foreground">
                {stats.songs}
              </span>{" "}
              tracks
            </span>
            <span>
              <span className="font-mono font-bold text-foreground">
                {stats.playlists}
              </span>{" "}
              playlists
            </span>
          </div>
        </div>
        {draftCopy(intro) && (
          <p className="text-[15px] leading-[1.75] text-muted-foreground max-w-[680px]">
            {intro}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {genres.map((genre) => (
          <div
            key={genre.name}
            className="rounded-xl border border-border bg-card p-5 space-y-3"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: genre.color }}
              />
              <h4 className="text-[14px] font-bold text-foreground">
                {genre.name}
              </h4>
            </div>
            <div className="flex flex-wrap gap-[6px]">
              {genre.artists.map((artist) => (
                <span
                  key={artist}
                  className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                >
                  {artist}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-[10px] border-[1.5px] border-foreground rounded-full text-foreground text-[13px] font-medium hover:bg-foreground hover:text-card transition-all"
        >
          Full library on Spotify →
        </a>
      </div>
    </div>
  );
}
