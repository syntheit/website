import { AdminPlacesBrowser } from "@/components/admin/AdminPlacesBrowser";
import { ALL_PLACES, ALL_LISTS } from "@/lib/world-places";
import { readOverrides } from "@/lib/admin/overrides-store";

export default async function AdminIndexPage() {
  const overrides = await readOverrides();
  return (
    <AdminPlacesBrowser
      places={ALL_PLACES}
      lists={ALL_LISTS}
      initialOverrides={overrides}
    />
  );
}
