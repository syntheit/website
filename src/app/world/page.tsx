import { PlaceExplorer } from "@/components/world/PlaceExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "World — Daniel Miller",
  description:
    "A personal atlas of 1,900+ places — restaurants, cafes, museums, hikes, and more from across the world.",
};

export default function WorldPage() {
  return <PlaceExplorer />;
}
