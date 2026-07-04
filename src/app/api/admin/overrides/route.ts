import { NextResponse } from "next/server";
import { readOverrides } from "@/lib/admin/overrides-store";

export async function GET() {
  const all = await readOverrides();
  return NextResponse.json(all);
}
