/**
 * Admin view for the photography pipeline. Surfaces the current snapshot
 * state so you can tell at a glance whether the gallery is healthy, and
 * gives you a one-click "force ISR refresh" button for the moments after
 * you've dropped a new photo into the Pexels collection.
 *
 * Read-only otherwise — the source of truth (Pexels) and the editable
 * caption overrides (public/data/photo-overrides.json) both live outside
 * the admin UI by design.
 */

import { promises as fs } from "node:fs";
import { join } from "node:path";
import { RevalidatePhotographyButton } from "@/components/admin/RevalidatePhotographyButton";

// Cheap RSC reads + we want this page to always reflect current disk
// state. No revalidation cache.
export const dynamic = "force-dynamic";

const DATA_DIR = join(process.cwd(), "public", "data");

interface SnapshotInfo {
  count: number;
  mtime: Date | null;
}

// Read the JSON directly off disk rather than going through the compiled
// `getSnapshotPhotos()` import — that import is resolved at build time, so
// it'd silently show stale counts after `pnpm sync-photos` until the next
// rebuild.
async function readSnapshotInfo(): Promise<SnapshotInfo> {
  const path = join(DATA_DIR, "photos.json");
  try {
    const [stat, raw] = await Promise.all([
      fs.stat(path),
      fs.readFile(path, "utf8"),
    ]);
    const photos = JSON.parse(raw) as unknown[];
    return { count: photos.length, mtime: stat.mtime };
  } catch {
    return { count: 0, mtime: null };
  }
}

async function readOverrideCount(): Promise<number> {
  try {
    const raw = await fs.readFile(join(DATA_DIR, "photo-overrides.json"), "utf8");
    return Object.keys(JSON.parse(raw) as Record<string, unknown>).length;
  } catch {
    return 0;
  }
}

function formatMtime(d: Date | null): string {
  if (!d) return "—";
  const diffMs = Date.now() - d.getTime();
  const days = Math.floor(diffMs / 86_400_000);
  const iso = d.toISOString().replace("T", " ").slice(0, 16) + " UTC";
  if (days === 0) return `${iso} (today)`;
  if (days === 1) return `${iso} (yesterday)`;
  return `${iso} (${days}d ago)`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold mb-1">
        {label}
      </div>
      <div className="font-mono text-[13px] text-[#3B2314]">{value}</div>
    </div>
  );
}

export default async function AdminPhotographyPage() {
  const [snapshot, overrideCount] = await Promise.all([
    readSnapshotInfo(),
    readOverrideCount(),
  ]);
  const hasApiKey = !!process.env.PEXELS_API_KEY;
  const hasCollectionId = !!process.env.PEXELS_COLLECTION_ID;
  const live = hasApiKey && hasCollectionId;

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <h1 className="font-serif text-[28px] font-extrabold text-[#3B2314] mb-2">
        Photography
      </h1>
      <p className="text-[14px] text-[#7A5C42] mb-8 leading-relaxed">
        The /photography gallery pulls from your Pexels collection (ISR,
        hourly). The committed snapshot is the fallback when Pexels is
        unreachable. Hit revalidate to refresh the live page without
        waiting for the next hour boundary.
      </p>

      <section className="bg-[#F5EBD9] border border-[rgba(59,35,20,0.1)] rounded-2xl p-6 mb-6">
        <h2 className="font-serif text-[18px] font-bold text-[#3B2314] mb-4">
          Current state
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Stat
            label="Live mode"
            value={live ? "enabled" : "snapshot fallback only"}
          />
          <Stat
            label="Pexels env"
            value={`${hasApiKey ? "key ✓" : "key ✗"} · ${
              hasCollectionId ? "collection ✓" : "collection ✗"
            }`}
          />
          <Stat label="Snapshot size" value={`${snapshot.count} photos`} />
          <Stat label="Snapshot mtime" value={formatMtime(snapshot.mtime)} />
          <Stat label="Caption overrides" value={`${overrideCount} entries`} />
        </div>
      </section>

      <section className="bg-[#F5EBD9] border border-[rgba(59,35,20,0.1)] rounded-2xl p-6 mb-6">
        <h2 className="font-serif text-[18px] font-bold text-[#3B2314] mb-2">
          Force refresh
        </h2>
        <p className="text-[13px] text-[#7A5C42] mb-4 leading-relaxed">
          Invalidates the ISR cache for /photography so the next request
          pulls a fresh copy from Pexels. Use after adding a photo to the
          collection.
        </p>
        <RevalidatePhotographyButton />
      </section>

      <section className="bg-[#F5EBD9] border border-[rgba(59,35,20,0.1)] rounded-2xl p-6">
        <h2 className="font-serif text-[18px] font-bold text-[#3B2314] mb-2">
          Snapshot refresh
        </h2>
        <p className="text-[13px] text-[#7A5C42] leading-relaxed">
          The fallback snapshot is regenerated automatically before every{" "}
          <code className="font-mono text-[12px] bg-[rgba(59,35,20,0.06)] px-1 py-0.5 rounded">
            next build
          </code>
          . To refresh it locally without rebuilding, run{" "}
          <code className="font-mono text-[12px] bg-[rgba(59,35,20,0.06)] px-1 py-0.5 rounded">
            pnpm sync-photos
          </code>
          .
        </p>
        <p className="text-[13px] text-[#7A5C42] mt-3 leading-relaxed">
          Caption overrides live in{" "}
          <code className="font-mono text-[12px] bg-[rgba(59,35,20,0.06)] px-1 py-0.5 rounded">
            public/data/photo-overrides.json
          </code>{" "}
          — keyed by Pexels photo id.
        </p>
      </section>
    </div>
  );
}
