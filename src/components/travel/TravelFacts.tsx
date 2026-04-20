import { visitedCountries } from "@/app/metadata/countries";

const travelFacts = [
  { label: "Countries visited", value: `${visitedCountries.length} countries across 4 continents` },
  { label: "Most beautiful city", value: "Buenos Aires, Argentina" },
  { label: "Most underrated city", value: "Ciudad del Este, Paraguay" },
  { label: "Most overrated city", value: "Dallas, TX" },
  { label: "Best food", value: "Ciudad del Este, Paraguay" },
  { label: "Best for roadtrips", value: "Southern Brazil" },
  { label: "Best for hiking", value: "Adirondacks, NY" },
  { label: "Best unique natural wonder", value: "Jujuy and the Salinas Grandes" },
  { label: "Best value", value: "Brazil" },
  { label: "Best music scene", value: "Buenos Aires, Argentina" },
  { label: "A place I'll definitely visit again", value: "Brazil" },
];

export function TravelFacts() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-serif text-[32px] font-extrabold tracking-tight mb-3">
          Travel Fast Facts
        </h2>
        <p className="text-[14px] text-[#7A5C42] max-w-xl mx-auto leading-[1.7]">
          Quick answers to the most common travel questions based on my adventures around the world.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {travelFacts.map((fact, index) => (
          <div
            key={index}
            className="bg-[#F5EBD9] rounded-[16px] p-6 border-[1.5px] border-[rgba(59,35,20,0.08)]"
          >
            <div className="text-[11px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-2">
              {fact.label}
            </div>
            <div className="font-serif text-[16px] font-bold text-[#3B2314]">
              {fact.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
