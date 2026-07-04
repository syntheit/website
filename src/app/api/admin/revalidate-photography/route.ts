/**
 * Force /photography to re-fetch from Pexels on the next request. Useful
 * after dropping a new photo into the collection — without this you'd
 * wait up to an hour for ISR to expire.
 *
 * Auth is enforced by middleware (src/middleware.ts), which 404s any
 * /api/admin/* request without a valid session. No need to re-check here.
 */

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidatePath("/photography");
  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
