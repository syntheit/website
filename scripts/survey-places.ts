/**
 * Survey the resolved places dataset and print a human-readable report:
 * - Coverage stats (resolved / failed)
 * - Top countries by place count (from address-derived country hint)
 * - List membership distribution
 * - Sample entries per list
 * - Cross-list overlap (places in N lists)
 *
 * Run: npx tsx scripts/survey-places.ts
 */

import { readFile } from "fs/promises";

interface FinalPlace {
  id: string;
  ftid: string;
  name: string;
  title: string;
  lat: number;
  lng: number;
  address?: string;
  countryHint?: string;
  googleMapsUrl: string;
  listIds: string[];
  takeoutNotes: string[];
}

interface List {
  id: string;
  label: string;
  placeCount: number;
  placeIds: string[];
}

async function main() {
  const places: FinalPlace[] = JSON.parse(
    await readFile("public/data/world/places.json", "utf-8"),
  );
  const lists: List[] = JSON.parse(
    await readFile("public/data/world/lists.json", "utf-8"),
  );

  console.log("══════════════════════════════════════════");
  console.log("  PLACES SURVEY");
  console.log("══════════════════════════════════════════\n");

  // ── Coverage ──
  console.log(`Total places (resolved):  ${places.length}`);
  console.log(`Total lists:              ${lists.length}`);
  console.log(`With address:             ${places.filter((p) => p.address).length}`);
  console.log(`With country hint:        ${places.filter((p) => p.countryHint).length}`);
  console.log();

  // ── Country distribution ──
  const byCountry = new Map<string, number>();
  for (const p of places) {
    const c = p.countryHint ?? "Unknown";
    byCountry.set(c, (byCountry.get(c) ?? 0) + 1);
  }
  const countrySorted = [...byCountry.entries()].sort((a, b) => b[1] - a[1]);
  console.log("Top countries by place count:");
  for (const [c, n] of countrySorted.slice(0, 25)) {
    console.log(`  ${String(n).padStart(4)}  ${c}`);
  }
  console.log();

  // ── List distribution ──
  console.log("Lists (sorted by place count, all 87):");
  const listsSorted = [...lists].sort((a, b) => b.placeCount - a.placeCount);
  for (const l of listsSorted) {
    console.log(`  ${String(l.placeCount).padStart(4)}  ${l.id.padEnd(28)} (${l.label})`);
  }
  console.log();

  // ── Sample places per list ──
  console.log("Sample places per list (first 3):");
  for (const l of listsSorted) {
    if (l.placeCount === 0) continue;
    const samples = l.placeIds.slice(0, 3).map((id) => {
      const p = places.find((p) => p.id === id);
      return p ? `${p.name}${p.countryHint ? ` (${p.countryHint})` : ""}` : id;
    });
    console.log(`  [${l.label}]`);
    for (const s of samples) console.log(`    - ${s}`);
  }
  console.log();

  // ── Cross-list overlap ──
  const byListCount = new Map<number, number>();
  for (const p of places) {
    const n = p.listIds.length;
    byListCount.set(n, (byListCount.get(n) ?? 0) + 1);
  }
  console.log("Cross-list overlap (places in N lists):");
  for (const [n, c] of [...byListCount.entries()].sort((a, b) => a[0] - b[0])) {
    console.log(`  ${n} list${n > 1 ? "s" : " "}: ${c} places`);
  }

  // ── Sample multi-list places ──
  const multiList = places.filter((p) => p.listIds.length > 1).slice(0, 10);
  if (multiList.length > 0) {
    console.log("\nExamples of multi-list places:");
    for (const p of multiList) {
      console.log(`  "${p.name}" → [${p.listIds.join(", ")}]`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
