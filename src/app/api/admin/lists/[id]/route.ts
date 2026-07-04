import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import {
  patchListOverride,
  readCustomLists,
  upsertCustomList,
  deleteCustomList,
} from "@/lib/admin/overrides-store";
import {
  isCustomListId,
  type CustomList,
  type ListOverride,
} from "@/lib/admin/list-override";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: PageProps) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  let body: Partial<ListOverride> & { delete?: boolean };
  try {
    body = (await req.json()) as Partial<ListOverride>;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (isCustomListId(id)) {
    const existing = (await readCustomLists())[id];
    if (!existing) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    const merged: CustomList = {
      ...existing,
      // Keep existing label when no trimmed input — `??` doesn't help here
      // because "" is not nullish, so use explicit ternary.
      label: body.label && body.label.trim() !== "" ? body.label.trim() : existing.label,
      category: body.category ?? existing.category,
      status: body.status ?? existing.status,
      tags: body.tags ?? existing.tags,
      scope: body.scope ?? existing.scope,
      updatedAt: new Date().toISOString(),
    };
    await upsertCustomList(merged);
    revalidateTag("world-data");
    return NextResponse.json({ list: merged });
  }

  const result = await patchListOverride(id, body);
  revalidateTag("world-data");
  return NextResponse.json({ id, override: result });
}

export async function DELETE(_req: Request, { params }: PageProps) {
  const { id } = await params;
  if (!isCustomListId(id)) {
    return NextResponse.json(
      { error: "auto lists cannot be deleted; set hidden:true to hide" },
      { status: 400 },
    );
  }
  const ok = await deleteCustomList(id);
  if (!ok) return NextResponse.json({ error: "not found" }, { status: 404 });
  revalidateTag("world-data");
  return NextResponse.json({ ok: true });
}
