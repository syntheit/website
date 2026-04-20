const adventures = [
  {
    title: "Ushuaia, Argentina",
    description:
      "The southernmost city in the world, gateway to Antarctica and Tierra del Fuego National Park.",
  },
  {
    title: "Bolivia",
    description:
      "Salt flats of Salar de Uyuni, Andean mountains, and the world's highest cable car system in La Paz.",
  },
  {
    title: "Lençóis Maranhenses",
    description:
      "Brazil's stunning sand dunes and crystal-clear lagoons in Maranhão National Park.",
  },
];

export function FutureAdventures() {
  return (
    <div>
      <h2 className="font-serif text-[32px] font-extrabold tracking-tight mb-8 text-center">
        Future Adventures
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {adventures.map((adventure, index) => (
          <div
            key={index}
            className="bg-[#F5EBD9] rounded-[16px] p-6 border-[1.5px] border-[rgba(59,35,20,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#D4581A]"
          >
            <h3 className="font-serif text-[17px] font-bold text-[#3B2314] mb-3">
              {adventure.title}
            </h3>
            <p className="text-[13px] text-[#7A5C42] leading-[1.6]">
              {adventure.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
