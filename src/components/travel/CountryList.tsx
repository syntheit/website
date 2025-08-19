import { groupCountriesByContinent, type CountryCategory } from "@/app/metadata/countries";

interface CountryListProps {
  title: string;
  countries: CountryCategory[];
  color: string;
  count: number;
}

export function CountryList({ title, countries, color, count }: CountryListProps) {
  return (
    <div className="p-6 space-y-6 rounded-2xl border bg-card border-border">
      <div className="flex gap-3 items-center">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: color }}></div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <div className="ml-auto text-sm font-medium text-muted-foreground">
          {count} countries
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {Object.entries(groupCountriesByContinent(countries)).map(([continent, continentCountries]: [string, CountryCategory[]]) => (
          <div key={continent} className="space-y-3">
            <div className="flex gap-2 items-center">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{continent}</h4>
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-muted-foreground">{continentCountries.length}</span>
            </div>
            <div className="grid gap-2">
              {continentCountries.map((country) => (
                <div key={country.code} className="flex gap-3 items-center p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                  <span className="text-sm font-medium text-foreground">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
