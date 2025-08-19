import { Mountain, Waves } from "lucide-react";

const adventures = [
  {
    title: "Ushuaia, Argentina",
    description: "The southernmost city in the world, gateway to Antarctica and Tierra del Fuego National Park.",
    icon: Mountain
  },
  {
    title: "Bolivia",
    description: "Salt flats of Salar de Uyuni, Andean mountains, and the world's highest cable car system in La Paz.",
    icon: Mountain
  },
  {
    title: "Lençóis Maranhenses",
    description: "Brazil's stunning sand dunes and crystal-clear lagoons in Maranhão National Park.",
    icon: Waves
  }
];

export function FutureAdventures() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Future Adventures</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {adventures.map((adventure, index) => {
          const IconComponent = adventure.icon;
          return (
            <div key={index} className="p-6 space-y-4 rounded-2xl border bg-card border-border">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary/10">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{adventure.title}</h3>
              <p className="text-sm text-muted-foreground">
                {adventure.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
