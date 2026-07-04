import { AdminListsBrowser } from "@/components/admin/AdminListsBrowser";
import { ALL_LISTS, ALL_PLACES } from "@/lib/world-places";
import {
  readListOverrides,
  readCustomLists,
  readOverrides,
} from "@/lib/admin/overrides-store";

export default async function AdminListsPage() {
  const [listOverrides, customLists, placeOverrides] = await Promise.all([
    readListOverrides(),
    readCustomLists(),
    readOverrides(),
  ]);
  return (
    <AdminListsBrowser
      lists={ALL_LISTS}
      places={ALL_PLACES}
      initialOverrides={listOverrides}
      initialCustomLists={customLists}
      initialPlaceOverrides={placeOverrides}
    />
  );
}
