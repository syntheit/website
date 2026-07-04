import { draftCopy } from "@/lib/utils";

interface Genre {
  name: string;
  artists: string[];
  color: string;
}

interface Playlist {
  name: string;
  description: string;
  url: string;
}

interface MusicSectionProps {
  intro: string;
  genres: Genre[];
  soulTier: {
    description: string;
    artists: string[];
  };
  playlists: Playlist[];
  spotifyUrl: string;
  stats: {
    songs: string;
    playlists: string;
  };
}

export function MusicSection({
  intro,
  genres,
  soulTier,
  playlists,
  spotifyUrl,
  stats,
}: MusicSectionProps) {
  return (
    <div className="space-y-10">
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
              saved songs
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

      {/* Soul tier */}
      <div className="rounded-2xl border border-border bg-card/40 p-6 space-y-3">
        <h3 className="text-[11px] uppercase tracking-[1.5px] text-primary font-semibold">
          Speaks to My Soul
        </h3>
        {draftCopy(soulTier.description) && (
          <p className="text-[14px] leading-[1.75] text-muted-foreground">
            {soulTier.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {soulTier.artists.map((artist) => (
            <span
              key={artist}
              className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-medium text-primary"
            >
              {artist}
            </span>
          ))}
        </div>
      </div>

      {/* Genres grid */}
      <div className="space-y-4">
        <h3 className="text-[11px] uppercase tracking-[1.5px] text-primary font-semibold">
          What I Listen To
        </h3>
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
      </div>

      {/* Playlists */}
      {playlists.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-[11px] uppercase tracking-[1.5px] text-primary font-semibold">
            Playlists
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {playlists.map((pl) => (
              <a
                key={pl.name}
                href={pl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-border bg-card p-4 space-y-1 hover:border-primary/40 transition-colors"
              >
                <h4 className="text-[14px] font-bold text-foreground group-hover:text-primary transition-colors">
                  {pl.name}
                </h4>
                <p className="text-[12px] text-muted-foreground leading-[1.5]">
                  {pl.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Spotify link */}
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
