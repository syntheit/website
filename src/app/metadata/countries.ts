export interface CountryCategory {
  code: string;
  name: string;
}

// Continent mapping for all countries
const continentMapping: Record<string, string> = {
  // North America
  "US": "North America",
  "CA": "North America",
  "MX": "North America",
  
  // South America
  "BR": "South America",
  "AR": "South America",
  "UY": "South America",
  "PY": "South America",
  "BO": "South America",
  "CL": "South America",
  "CO": "South America",
  "PE": "South America",
  "EC": "South America",
  
  // Europe
  "GB": "Europe",
  "UA": "Europe",
  "ES": "Europe",
  "PL": "Europe",
  "CZ": "Europe",
  "SK": "Europe",
  "AT": "Europe",
  "IT": "Europe",
  "VA": "Europe",
  "FR": "Europe",
  "BE": "Europe",
  "NL": "Europe",
  "DE": "Europe",
  "HU": "Europe",
  "RO": "Europe",
  "MD": "Europe",
  "CH": "Europe",
  
  // Asia
  "AU": "Asia",
  "NZ": "Asia",
  "ID": "Asia",
  "IN": "Asia",
  "NP": "Asia",
  "BT": "Asia",
  "VN": "Asia",
  "CN": "Asia",
  "HK": "Asia",
  "TW": "Asia",
  "KZ": "Asia",
  "KG": "Asia",
  "TJ": "Asia",
  "UZ": "Asia",
  "TM": "Asia",
  "AZ": "Asia",
  
  // Caribbean
  "JM": "Caribbean",
};

// Helper function to get continent for a country
export function getContinent(countryCode: string): string {
  return continentMapping[countryCode] ?? "Unknown";
}

// Helper function to group countries by continent
export function groupCountriesByContinent(countries: CountryCategory[]) {
  const grouped: Record<string, CountryCategory[]> = {};
  
  countries.forEach(country => {
    const continent = getContinent(country.code);
    grouped[continent] ??= [];
    grouped[continent].push(country);
  });
  
  return grouped;
}

export const visitedCountries: CountryCategory[] = [
  { code: "US", name: "United States of America" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "JM", name: "Jamaica" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "UY", name: "Uruguay" },
  { code: "PY", name: "Paraguay" },
  { code: "GB", name: "United Kingdom" },
  { code: "UA", name: "Ukraine" },
  { code: "ES", name: "Spain" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "ID", name: "Indonesia" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czechia" },
  { code: "SK", name: "Slovakia" },
  { code: "AT", name: "Austria" },
  { code: "IT", name: "Italy" },
  { code: "VA", name: "Vatican City" },
  { code: "FR", name: "France" },
  { code: "BE", name: "Belgium" },
  { code: "NL", name: "Netherlands" },
  { code: "DE", name: "Germany" },
  { code: "HU", name: "Hungary" },
  { code: "RO", name: "Romania" },
  { code: "MD", name: "Moldova" },
  { code: "CH", name: "Switzerland" },
];

export const nextYearCountries: CountryCategory[] = [
  { code: "BO", name: "Bolivia" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "PE", name: "Peru" },
  { code: "EC", name: "Ecuador" },
  { code: "IN", name: "India" },
  { code: "NP", name: "Nepal" },
  { code: "BT", name: "Bhutan" },
];

export const followingYearCountries: CountryCategory[] = [
  { code: "VN", name: "Vietnam" },
  { code: "CN", name: "China" },
  { code: "HK", name: "Hong Kong" },
  { code: "TW", name: "Taiwan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "TM", name: "Turkmenistan" },
  { code: "AZ", name: "Azerbaijan" },
];

export const allPlannedCountries = [
  ...visitedCountries,
  ...nextYearCountries,
  ...followingYearCountries,
]; 