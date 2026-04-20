export interface Photo {
  src: string;
  alt: string;
  location: string;
  width: number;
  height: number;
}

export const photos: Photo[] = [
  { src: "/photos/buenos-aires-01.webp", alt: "Street scene in Buenos Aires", location: "Buenos Aires, Argentina", width: 1200, height: 1600 },
  { src: "/photos/florianopolis-01.webp", alt: "Beach in Florianópolis", location: "Florianópolis, Brazil", width: 1600, height: 1100 },
  { src: "/photos/jujuy-01.webp", alt: "Landscape in Jujuy", location: "Jujuy, Argentina", width: 1600, height: 1067 },
  { src: "/photos/curitiba-01.webp", alt: "Architecture in Curitiba", location: "Curitiba, Brazil", width: 1600, height: 1200 },
  { src: "/photos/san-telmo-01.webp", alt: "San Telmo market", location: "San Telmo, Buenos Aires", width: 1200, height: 1800 },
  { src: "/photos/mendoza-01.webp", alt: "Vineyards in Mendoza", location: "Mendoza, Argentina", width: 1600, height: 1067 },
  { src: "/photos/palermo-01.webp", alt: "Palermo streets", location: "Palermo, Buenos Aires", width: 1600, height: 1200 },
  { src: "/photos/ushuaia-01.webp", alt: "End of the world", location: "Ushuaia, Argentina", width: 1200, height: 1600 },
  { src: "/photos/salinas-grandes-01.webp", alt: "Salt flats", location: "Salinas Grandes, Jujuy", width: 1600, height: 1067 },
  { src: "/photos/recoleta-01.webp", alt: "Recoleta cemetery", location: "Recoleta, Buenos Aires", width: 1600, height: 1200 },
  { src: "/photos/ciudad-del-este-01.webp", alt: "Ciudad del Este", location: "Ciudad del Este, Paraguay", width: 1200, height: 1600 },
  { src: "/photos/montevideo-01.webp", alt: "Montevideo waterfront", location: "Montevideo, Uruguay", width: 1600, height: 1067 },
  { src: "/photos/la-boca-01.webp", alt: "Colorful La Boca", location: "La Boca, Buenos Aires", width: 1600, height: 1200 },
  { src: "/photos/adirondacks-01.webp", alt: "Adirondack mountains", location: "Adirondacks, NY", width: 1600, height: 1067 },
  { src: "/photos/iguazu-01.webp", alt: "Iguazú Falls", location: "Iguazú Falls, Misiones", width: 1200, height: 1800 },
];
