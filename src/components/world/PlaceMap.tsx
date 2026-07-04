"use client";

import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import Map, {
  Source,
  Layer,
  Popup,
  type MapRef,
} from "react-map-gl/maplibre";
import type {
  GeoJSONSource,
  ExpressionSpecification,
  MapMouseEvent,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Place } from "@/types/world";
import { getPlace, categoryLabel, countryLabel } from "@/lib/world-places";
import {
  CATEGORY_COLOR,
  UNCATEGORIZED_COLOR,
  ICON_PATHS,
} from "./place-icons";

export interface PlaceMapHandle {
  flyTo: (target: { lat: number; lng: number; zoom?: number }) => void;
}

// ── SVG / icon building ─────────────────────────────────────────────────

const ICON_RENDER_SIZE = 64;

const SVG_DEFS = `<defs><filter id="s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0.5" stdDeviation="0.8" flood-color="#000" flood-opacity="0.35"/></filter></defs>`;

function buildPinSvg(category: string, color: string): string {
  const iconPaths = ICON_PATHS[category];
  const iconBlock = iconPaths
    ? `<g transform="translate(8 8) scale(0.667)" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${iconPaths}</g>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON_RENDER_SIZE}" height="${ICON_RENDER_SIZE}" viewBox="0 0 32 32">${SVG_DEFS}<circle cx="16" cy="16" r="13" fill="${color}" stroke="white" stroke-width="1.5" filter="url(#s)"/>${iconBlock}</svg>`;
}

function buildUncategorizedSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON_RENDER_SIZE}" height="${ICON_RENDER_SIZE}" viewBox="0 0 32 32">${SVG_DEFS}<circle cx="16" cy="16" r="9" fill="${UNCATEGORIZED_COLOR}" stroke="white" stroke-width="1.5" filter="url(#s)"/></svg>`;
}

async function svgToImage(svg: string): Promise<HTMLImageElement> {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image(ICON_RENDER_SIZE, ICON_RENDER_SIZE);
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("svg load failed"));
      img.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ── Map expressions ─────────────────────────────────────────────────────

// icon-size is a layout property — MapLibre forbids feature-state expressions
// here, so the selected-pin emphasis lives entirely in the halo layer (which
// is paint, where feature-state IS allowed).
const PIN_SIZE_EXPRESSION: ExpressionSpecification = [
  "interpolate",
  ["linear"],
  ["zoom"],
  2, 0.18,
  4, 0.22,
  7, 0.3,
  10, 0.4,
  14, 0.55,
];

const HALO_RADIUS_EXPRESSION: ExpressionSpecification = [
  "case",
  ["boolean", ["feature-state", "selected"], false],
  26,
  ["boolean", ["feature-state", "hovered"], false],
  18,
  0,
];

const FALLBACK_COLOR_EXPRESSION: ExpressionSpecification = (() => {
  const branches: (string | ExpressionSpecification)[] = [];
  for (const [cat, color] of Object.entries(CATEGORY_COLOR)) {
    branches.push(["==", ["get", "category"], cat] as ExpressionSpecification);
    branches.push(color);
  }
  return ["case", ...branches, UNCATEGORIZED_COLOR] as ExpressionSpecification;
})();

// ── Component ───────────────────────────────────────────────────────────

interface Props {
  places: Place[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
  initialViewState?: { longitude: number; latitude: number; zoom: number };
  autoFit?: boolean;
}

const SOURCE_ID = "places";
const PIN_LAYER = "places-pin";
const FALLBACK_LAYER = "places-fallback";
const CLUSTER_LAYER = "clusters";

export const PlaceMap = forwardRef<PlaceMapHandle, Props>(function PlaceMap(
  {
    places,
    selectedId,
    hoveredId,
    onSelect,
    onHover,
    initialViewState,
    autoFit = true,
  },
  forwardedRef,
) {
  const mapRef = useRef<MapRef | null>(null);
  const aliveRef = useRef(true);
  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  useImperativeHandle(
    forwardedRef,
    () => ({
      flyTo: ({ lat, lng, zoom }) => {
        const map = mapRef.current?.getMap();
        if (!map) return;
        map.flyTo({
          center: [lng, lat],
          zoom: zoom ?? Math.max(map.getZoom(), 12),
          duration: 800,
        });
      },
    }),
    [],
  );

  const geojson = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: places.map((p) => ({
        type: "Feature" as const,
        id: p.id,
        geometry: { type: "Point" as const, coordinates: [p.lng, p.lat] },
        properties: {
          id: p.id,
          name: p.name,
          category: p.category ?? "_uncategorized",
          status: p.status,
        },
      })),
    }),
    [places],
  );

  // Auto-fit on filter change.
  useEffect(() => {
    if (!autoFit) return;
    const map = mapRef.current?.getMap();
    if (!map || places.length === 0) return;
    let minLng = Infinity,
      minLat = Infinity,
      maxLng = -Infinity,
      maxLat = -Infinity;
    for (const p of places) {
      if (p.lng < minLng) minLng = p.lng;
      if (p.lng > maxLng) maxLng = p.lng;
      if (p.lat < minLat) minLat = p.lat;
      if (p.lat > maxLat) maxLat = p.lat;
    }
    if (!isFinite(minLng)) return;
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 60, duration: 800, maxZoom: 13 },
    );
  }, [places, autoFit]);

  // Fly to selected place. Doesn't depend on the filtered set.
  useEffect(() => {
    if (!selectedId) return;
    const place = getPlace(selectedId);
    if (!place) return;
    const map = mapRef.current?.getMap();
    if (!map) return;
    map.flyTo({
      center: [place.lng, place.lat],
      zoom: Math.max(map.getZoom(), 14),
      duration: 800,
    });
  }, [selectedId]);

  // Drive map highlight via feature-state — no paint re-evaluation, no React
  // churn from interaction state. Two effects, one per highlight kind. Each
  // tracks its "previously set" id in a ref so it can clear it on change.
  const lastSelectedFsId = useRef<string | null>(null);
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const setSafe = (id: string, state: Record<string, unknown>) => {
      try {
        map.setFeatureState({ source: SOURCE_ID, id }, state);
      } catch {
        // Feature may no longer be in the source (filtered out).
      }
    };
    if (lastSelectedFsId.current && lastSelectedFsId.current !== selectedId) {
      setSafe(lastSelectedFsId.current, { selected: false });
    }
    if (selectedId) setSafe(selectedId, { selected: true });
    lastSelectedFsId.current = selectedId;
  }, [selectedId]);

  const lastHoveredFsId = useRef<string | null>(null);
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const setSafe = (id: string, state: Record<string, unknown>) => {
      try {
        map.setFeatureState({ source: SOURCE_ID, id }, state);
      } catch {
        /* feature gone */
      }
    };
    if (lastHoveredFsId.current && lastHoveredFsId.current !== hoveredId) {
      setSafe(lastHoveredFsId.current, { hovered: false });
    }
    if (hoveredId) setSafe(hoveredId, { hovered: true });
    lastHoveredFsId.current = hoveredId;
  }, [hoveredId]);

  // Register category icons once the style is loaded.
  const handleLoad = () => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const tasks: Promise<void>[] = [];
    const swallow = (e: unknown) => {
      void e;
    };
    const registerImage = (name: string, svg: string) => {
      if (map.hasImage(name)) return;
      tasks.push(
        svgToImage(svg)
          .then((img) => {
            if (!aliveRef.current || map.hasImage(name)) return;
            map.addImage(name, img, { pixelRatio: 2 });
          })
          .catch(swallow),
      );
    };
    for (const [cat, color] of Object.entries(CATEGORY_COLOR)) {
      registerImage(`pin-${cat}`, buildPinSvg(cat, color));
    }
    registerImage("pin-_uncategorized", buildUncategorizedSvg());

    void Promise.all(tasks).then(() => {
      if (aliveRef.current) setIconsLoaded(true);
    });
  };

  // Hover + click interaction. Driven by our own queryRenderedFeatures with
  // try/catch — bypasses react-map-gl's interactiveLayerIds path, which lets
  // synchronous MapLibre throws (empty vector tile decode) escape into the
  // Next dev overlay.
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const pinLayers = iconsLoaded ? [PIN_LAYER] : [FALLBACK_LAYER];

    const safeQuery = (
      point: maplibregl.PointLike,
      layers: string[],
    ): maplibregl.MapGeoJSONFeature[] => {
      try {
        return map.queryRenderedFeatures(point, { layers });
      } catch {
        return [];
      }
    };

    let lastHoverId: string | null = null;
    const setHover = (next: string | null) => {
      if (next === lastHoverId) return;
      lastHoverId = next;
      onHover(next);
    };

    const onMouseMove = (e: MapMouseEvent) => {
      // Skip hover detection while the user is panning/zooming. mousemove
      // fires at 60Hz during drag — running queryRenderedFeatures and React
      // state updates per frame on dense data (e.g. Buenos Aires) is the
      // single biggest source of pan/zoom jank. isMoving() covers both user
      // gestures and programmatic flyTo animations.
      if (map.isMoving()) return;

      const onCluster = safeQuery(e.point, [CLUSTER_LAYER]).length > 0;
      if (onCluster) {
        map.getCanvas().style.cursor = "pointer";
        setHover(null);
        return;
      }
      const pin = safeQuery(e.point, pinLayers)[0];
      if (pin?.properties?.id != null) {
        map.getCanvas().style.cursor = "pointer";
        setHover(String(pin.properties.id));
      } else {
        map.getCanvas().style.cursor = "";
        setHover(null);
      }
    };

    const onMouseLeave = () => {
      map.getCanvas().style.cursor = "";
      setHover(null);
    };

    // When pan/zoom starts, immediately drop hover state so a stale popup
    // doesn't ride along with the move.
    const onMoveStart = () => {
      map.getCanvas().style.cursor = "";
      setHover(null);
    };

    // Click handlers are sync wrappers around async work so MapLibre's
    // event system (which expects void returns) doesn't see a Promise.
    const expandCluster = async (
      cluster: maplibregl.MapGeoJSONFeature,
    ): Promise<void> => {
      const clusterId = cluster.properties?.cluster_id as number | undefined;
      const src = map.getSource(SOURCE_ID);
      if (
        clusterId == null ||
        !src ||
        !("getClusterExpansionZoom" in src) ||
        cluster.geometry?.type !== "Point"
      ) {
        return;
      }
      try {
        const zoom = await (src as GeoJSONSource).getClusterExpansionZoom(
          clusterId,
        );
        map.flyTo({
          center: cluster.geometry.coordinates as [number, number],
          zoom,
          duration: 600,
        });
      } catch {
        /* benign */
      }
    };

    const onClick = (e: MapMouseEvent) => {
      const cluster = safeQuery(e.point, [CLUSTER_LAYER])[0];
      if (cluster) {
        void expandCluster(cluster);
        return;
      }
      const pin = safeQuery(e.point, pinLayers)[0];
      onSelect(pin?.properties?.id != null ? String(pin.properties.id) : null);
    };

    map.on("mousemove", onMouseMove);
    map.on("mouseout", onMouseLeave);
    map.on("movestart", onMoveStart);
    map.on("click", onClick);

    return () => {
      map.off("mousemove", onMouseMove);
      map.off("mouseout", onMouseLeave);
      map.off("movestart", onMoveStart);
      map.off("click", onClick);
    };
  }, [iconsLoaded, onHover, onSelect]);

  // Hover popup, driven by hoveredId (set either by map mousemove or by list
  // hover). Suppressed when the hovered place is the selected one.
  const hoveredPlace =
    hoveredId && hoveredId !== selectedId ? getPlace(hoveredId) : null;

  return (
    <Map
      ref={mapRef}
      initialViewState={
        initialViewState ?? { longitude: -20, latitude: 20, zoom: 1.6 }
      }
      mapStyle="https://tiles.openfreemap.org/styles/positron"
      style={{ width: "100%", height: "100%" }}
      // No interactiveLayerIds: we do our own queryRenderedFeatures with
      // try/catch so MapLibre's empty-tile decode throws don't escape.
      onLoad={handleLoad}
      cursor="default"
      attributionControl={{ compact: true }}
    >
      <Source
        id={SOURCE_ID}
        type="geojson"
        data={geojson}
        promoteId="id"
        cluster
        clusterMaxZoom={6}
        clusterRadius={50}
      >
        <Layer
          id={CLUSTER_LAYER}
          type="circle"
          filter={["has", "point_count"]}
          paint={{
            "circle-color": "#D4581A",
            "circle-stroke-width": 2.5,
            "circle-stroke-color": "rgba(255,255,255,0.92)",
            "circle-radius": [
              "step",
              ["get", "point_count"],
              14,
              10, 18,
              50, 24,
              200, 30,
              500, 36,
            ],
            "circle-opacity": 0.95,
          }}
        />
        <Layer
          id="cluster-count"
          type="symbol"
          filter={["has", "point_count"]}
          layout={{
            "text-field": ["get", "point_count_abbreviated"],
            "text-size": [
              "step",
              ["get", "point_count"],
              12,
              10, 13,
              50, 14,
              200, 15,
            ],
            "text-font": ["Noto Sans Bold"],
            "text-allow-overlap": true,
          }}
          paint={{ "text-color": "#FFFFFF" }}
        />
        <Layer
          id="places-halo"
          type="circle"
          filter={["!", ["has", "point_count"]]}
          paint={{
            "circle-color": "#3B2314",
            "circle-opacity": 0.18,
            "circle-radius": HALO_RADIUS_EXPRESSION,
          }}
        />
        <Layer
          id="favorite-ring"
          type="circle"
          filter={[
            "all",
            ["!", ["has", "point_count"]],
            ["==", ["get", "status"], "favorite"],
          ]}
          paint={{
            "circle-color": "rgba(0,0,0,0)",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#E8C95A",
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              2, 5,
              6, 9,
              10, 13,
              14, 17,
            ],
          }}
        />
        {!iconsLoaded && (
          <Layer
            id={FALLBACK_LAYER}
            type="circle"
            filter={["!", ["has", "point_count"]]}
            paint={{
              "circle-color": FALLBACK_COLOR_EXPRESSION,
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                2, 3,
                14, 7,
              ],
              "circle-stroke-width": 1,
              "circle-stroke-color": "#FFFFFF",
              "circle-opacity": 0.9,
            }}
          />
        )}
        {iconsLoaded && (
          <Layer
            id={PIN_LAYER}
            type="symbol"
            filter={["!", ["has", "point_count"]]}
            layout={{
              "icon-image": [
                "concat",
                "pin-",
                ["coalesce", ["get", "category"], "_uncategorized"],
              ],
              "icon-size": PIN_SIZE_EXPRESSION,
              "icon-allow-overlap": true,
              "icon-ignore-placement": true,
            }}
            paint={{
              "icon-opacity": [
                "case",
                ["==", ["get", "status"], "want-to-go"],
                0.55,
                1.0,
              ],
            }}
          />
        )}
      </Source>

      {hoveredPlace && (
        <Popup
          longitude={hoveredPlace.lng}
          latitude={hoveredPlace.lat}
          anchor="bottom"
          offset={18}
          closeButton={false}
          closeOnClick={false}
          className="place-hover-popup"
        >
          <div className="px-3 py-2 max-w-[240px]">
            {hoveredPlace.category && (
              <div className="text-[9px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold mb-[2px]">
                {categoryLabel(hoveredPlace.category)}
              </div>
            )}
            <div className="font-serif text-[14px] font-bold text-[#3B2314] leading-tight">
              {hoveredPlace.name}
            </div>
            <div className="text-[11px] text-[#7A5C42] mt-[2px] flex items-center gap-1">
              <span>{countryLabel(hoveredPlace.country)}</span>
              {hoveredPlace.status === "visited" && (
                <>
                  <span className="opacity-50">·</span>
                  <span className="text-[#5C8B5C]">visited</span>
                </>
              )}
              {hoveredPlace.status === "want-to-go" && (
                <>
                  <span className="opacity-50">·</span>
                  <span className="italic">want to go</span>
                </>
              )}
              {hoveredPlace.status === "favorite" && (
                <>
                  <span className="opacity-50">·</span>
                  <span className="text-[#D4581A] font-semibold">★ favorite</span>
                </>
              )}
            </div>
            {hoveredPlace.address && (
              <div className="text-[10px] text-[#7A5C42] mt-1 truncate opacity-80">
                {hoveredPlace.address}
              </div>
            )}
            {hoveredPlace.note && (
              <div className="text-[11px] text-[#3B2314] italic mt-1 line-clamp-2 leading-snug">
                {hoveredPlace.note}
              </div>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
});
