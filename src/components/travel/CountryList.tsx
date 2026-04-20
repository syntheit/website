import { groupCountriesByContinent, type CountryCategory } from "@/app/metadata/countries";

interface CountryListProps {
  title: string;
  countries: CountryCategory[];
  color: string;
  count: number;
}

export function CountryList({ title, countries, color, count }: CountryListProps) {
  return (
    <div className="bg-[#F5EBD9] rounded-[16px] p-6 border-[1.5px] border-[rgba(59,35,20,0.08)]">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3.5 h-3.5 rounded-[3px]" style={{ backgroundColor: color }} />
        <h3 className="font-serif text-[18px] font-bold text-[#3B2314]">{title}</h3>
        <div className="ml-auto font-mono text-[13px] text-[#7A5C42]">
          {count} countries
        </div>
      </div>

      {/* Country Groups */}
      <div className="space-y-5 max-h-96 overflow-y-auto">
        {Object.entries(groupCountriesByContinent(countries)).map(
          ([continent, continentCountries]: [string, CountryCategory[]]) => (
            <div key={continent}>
              {/* Continent Subheading */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[rgba(59,35,20,0.1)]">
                <span className="text-[11px] uppercase tracking-[1.5px] text-[#7A5C42] font-semibold">
                  {continent}
                </span>
                <span className="text-[11px] uppercase tracking-[1.5px] text-[#7A5C42]">
                  {continentCountries.length}
                </span>
              </div>

              {/* Country Names */}
              <div className="grid gap-2">
                {continentCountries.map((country) => (
                  <div key={country.code} className="flex items-center gap-3 py-1">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[14px] text-[#3B2314]">{country.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
