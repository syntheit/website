import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { visitedCountries, nextYearCountries, followingYearCountries } from "@/app/metadata/countries";

interface GeoFeature {
  rsmKey: string;
  properties: {
    name: string;
  };
}

export function WorldMap() {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-foreground">My Travel Map</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Click on countries to see where I&apos;ve been and where I&apos;m planning to go next.
        </p>
      </div>
      <div className="flex flex-wrap gap-6 justify-center text-sm">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded bg-primary"></div>
          <span className="text-muted-foreground">Visited</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(142, 76%, 65%)" }}></div>
          <span className="text-muted-foreground">Within the Next Year</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(210, 83%, 65%)" }}></div>
          <span className="text-muted-foreground">Following Year</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl border bg-white border-border shadow-sm">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 147,
            center: [0, 0]
          }}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <Geographies
            geography="https://unpkg.com/world-atlas@2/countries-110m.json"
          >
            {({ geographies }: { geographies: GeoFeature[] }) => {
              return geographies.map((geo: GeoFeature) => {
                const countryName = geo.properties.name;
                
                // Determine country color based on category
                let fillColor = "#e5e7eb";
                
                if (visitedCountries.some(c => c.name === countryName)) {
                  fillColor = "#2a5b46";
                } else if (nextYearCountries.some(c => c.name === countryName)) {
                  fillColor = "#86efac";
                } else if (followingYearCountries.some(c => c.name === countryName)) {
                  fillColor = "#93c5fd";
                }
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#d1d5db"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" }
                    }}
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}
