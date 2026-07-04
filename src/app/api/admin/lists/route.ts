import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import {
  readListOverrides,
  readCustomLists,
  upsertCustomList,
} from "@/lib/admin/overrides-store";
import {
  customListIdFromLabel,
  isCustomListId,
  type CustomList,
} from "@/lib/admin/list-override";

export async function GET() {
  const [listOverrides, customLists] = await Promise.all([
    readListOverrides(),
    readCustomLists(),
  ]);
  return NextResponse.json({ listOverrides, customLists });
}

interface CreateBody {
  label?: string;
  category?: string;
  status?: CustomList["status"];
  tags?: string[];
  scope?: string;
}

export async function POST(req: Request) {
  let body: CreateBody;
  try {
    body = (await req.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const label = body.label?.trim();
  if (!label) {
    return NextResponse.json({ error: "label is required" }, { status: 400 });
  }

  // Ensure a unique ID — if the natural slug collides with an existing custom
  // list, suffix with -2, -3, etc.
  const existing = await readCustomLists();
  let id = customListIdFromLabel(label);
  if (!isCustomListId(id)) {
    return NextResponse.json({ error: "could not derive id" }, { status: 400 });
  }
  if (id in existing) {
    let n = 2;
    while (`${id}-${n}` in existing) n++;
    id = `${id}-${n}`;
  }

  const now = new Date().toISOString();
  const created: CustomList = {
    id,
    label,
    category: body.category,
    status: body.status,
    tags: body.tags,
    scope: body.scope,
    createdAt: now,
    updatedAt: now,
  };
  await upsertCustomList(created);
  revalidateTag("world-data");
  return NextResponse.json({ list: created }, { status: 201 });
}
