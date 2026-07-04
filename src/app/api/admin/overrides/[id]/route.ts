import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { patchOverride, type PlaceOverride } from "@/lib/admin/overrides-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: PageProps) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });
  let body: Partial<PlaceOverride>;
  try {
    body = (await req.json()) as Partial<PlaceOverride>;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const result = await patchOverride(id, body);
  // Tell the public site to re-render world pages on the next request.
  revalidateTag("world-data");
  return NextResponse.json({ id, override: result });
}
