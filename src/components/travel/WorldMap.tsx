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
    <div>
      <div className="text-center mb-8">
        <h2 className="font-serif text-[32px] font-extrabold tracking-tight mb-3">
          My Travel Map
        </h2>
        <p className="text-[14px] text-[#7A5C42] max-w-2xl mx-auto leading-[1.7]">
          Click on countries to see where I&apos;ve been and where I&apos;m planning to go next.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 justify-center mb-6">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded-[3px]" style={{ backgroundColor: "#3B2314" }} />
          <span className="text-[13px] text-[#7A5C42]">Visited</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded-[3px]" style={{ backgroundColor: "#D4581A" }} />
          <span className="text-[13px] text-[#7A5C42]">Near Future</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded-[3px]" style={{ backgroundColor: "#E8C95A" }} />
          <span className="text-[13px] text-[#7A5C42]">At Some Point</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-[#F5EBD9] rounded-[16px] p-6 border-[1.5px] border-[rgba(59,35,20,0.08)]">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 147,
            center: [0, 0],
          }}
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <Geographies geography="https://unpkg.com/world-atlas@2/countries-110m.json">
            {({ geographies }: { geographies: GeoFeature[] }) =>
              geographies.map((geo: GeoFeature) => {
                const countryName = geo.properties.name;

                let fillColor = "#D9CFC0";

                if (visitedCountries.some((c) => c.name === countryName)) {
                  fillColor = "#3B2314";
                } else if (nextYearCountries.some((c) => c.name === countryName)) {
                  fillColor = "#D4581A";
                } else if (followingYearCountries.some((c) => c.name === countryName)) {
                  fillColor = "#E8C95A";
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#C8B89A"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}
