export interface PhotoMetadata {
  id: string;
  filename: string;
  location: string;
  year: number;
  category: 'street' | 'landscape' | 'portrait' | 'urban' | 'nature' | 'architecture' | 'favorites';
  featured: boolean;
}

export const photographyMetadata: PhotoMetadata[] = [
  {
    id: "dsc_8889",
    filename: "DSC_8889.webp",
    location: "Avienda Melián, Buenos Aires, Argentina",
    year: 2025,
    category: "street",
    featured: false
  },
  {
    id: "dsc_8896",
    filename: "DSC_8896.webp",
    location: "Belgrano R, Buenos Aires, Argentina",
    year: 2025,
    category: "street",
    featured: false
  },
  {
    id: "dsc_8912",
    filename: "DSC_8912.webp",
    location: "Belgrano R, Buenos Aires, Argentina",
    year: 2025,
    category: "street",
    featured: false
  },
  {
    id: "dsc_8927",
    filename: "DSC_8927.webp",
    location: "Belgrano R, Buenos Aires, Argentina",
    year: 2025,
    category: "street",
    featured: false
  },
  {
    id: "dsc_8933",
    filename: "DSC_8933.webp",
    location: "Belgrano R, Buenos Aires, Argentina",
    year: 2025,
    category: "street",
    featured: false
  },
  {
    id: "dsc_8939",
    filename: "DSC_8939.webp",
    location: "Belgrano R, Buenos Aires, Argentina",
    year: 2025,
    category: "street",
    featured: false
  },
  {
    id: "dsc_9032",
    filename: "DSC_9032.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "street",
    featured: false
  },
  {
    id: "dsc_9047",
    filename: "DSC_9047.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "street",
    featured: true
  },
  {
    id: "dsc_9052",
    filename: "DSC_9052.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "architecture",
    featured: false
  },
  {
    id: "dsc_9161",
    filename: "DSC_9161.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "urban",
    featured: false
  },
  {
    id: "dsc_9167",
    filename: "DSC_9167.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "urban",
    featured: false
  },
  {
    id: "dsc_9238",
    filename: "DSC_9238.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
  },
  {
    id: "dsc_9278",
    filename: "DSC_9278.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
  },
  {
    id: "dsc_9292",
    filename: "DSC_9292.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
  },
  {
    id: "dsc_9295",
    filename: "DSC_9295.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
  },
  {
    id: "dsc_9301",
    filename: "DSC_9301.webp",
    location: "Salinas Grandes, Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
  },
  {
    id: "dsc_9321",
    filename: "DSC_9321.webp",
    location: "Salinas Grandes, Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: true
  },
  {
    id: "dsc_9359",
    filename: "DSC_9359.webp",
    location: "Salinas Grandes, Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
  },
  {
    id: "dsc_9409",
    filename: "DSC_9409.webp",
    location: "Salinas Grandes, Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
  },
  {
    id: "dsc_9413",
    filename: "DSC_9413.webp",
    location: "Salta Province, Argentina",
    year: 2025,
    category: "landscape",
    featured: false
  },
  {
    id: "dsc_9467",
    filename: "DSC_9467.webp",
    location: "Salta Province, Argentina",
    year: 2025,
    category: "landscape",
    featured: true
  },
  {
    id: "dsc_9539",
    filename: "DSC_9539.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
  },
  {
    id: "dsc_9583",
    filename: "DSC_9583.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
  },
  {
    id: "dsc_9620",
    filename: "DSC_9620.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: true
  },
  {
    id: "dsc_0167",
    filename: "DSC_0167.webp",
    location: "Portsmouth, NH",
    year: 2024,
    category: "street",
    featured: false
},
{
    id: "dsc_0181",
    filename: "DSC_0181.webp",
    location: "Portsmouth, NH",
    year: 2024,
    category: "street",
    featured: false
},
{
    id: "dsc_0193",
    filename: "DSC_0193.webp",
    location: "Portsmouth, NH",
    year: 2024,
    category: "street",
    featured: false
},
{
    id: "dsc_0223",
    filename: "DSC_0223.webp",
    location: "Portsmouth, NH",
    year: 2024,
    category: "street",
    featured: false
},
{
    id: "dsc_0243",
    filename: "DSC_0243.webp",
    location: "Outside the state capitol in Augusta, ME",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_0268",
    filename: "DSC_0268.webp",
    location: "Acadia National Park, ME",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_0269",
    filename: "DSC_0269.webp",
    location: "Acadia National Park, ME",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_0321",
    filename: "DSC_0321.webp",
    location: "Acadia National Park, ME",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_0343",
    filename: "DSC_0343.webp",
    location: "Acadia National Park, ME",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_0356",
    filename: "DSC_0356.webp",
    location: "Acadia National Park, ME",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_0460",
    filename: "DSC_0460.webp",
    location: "Acadia National Park, ME",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_0483",
    filename: "DSC_0483.webp",
    location: "Acadia National Park, ME",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_0490",
    filename: "DSC_0490.webp",
    location: "Acadia National Park, ME",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_0518",
    filename: "DSC_0518.webp",
    location: "Brewer, ME",
    year: 2024,
    category: "street",
    featured: false
},
{
    id: "dsc_0544",
    filename: "DSC_0544.webp",
    location: "Portland, ME",
    year: 2024,
    category: "architecture",
    featured: false
},
{
    id: "dsc_0551",
    filename: "DSC_0551.webp",
    location: "Punta del Este, Uruguay",
    year: 2025,
    category: "urban",
    featured: false
},
{
    id: "dsc_0567",
    filename: "DSC_0567.webp",
    location: "Punta del Este, Uruguay",
    year: 2025,
    category: "urban",
    featured: true
},
{
    id: "dsc_0783",
    filename: "DSC_0783.webp",
    location: "15th St bridge at RPI in Troy, NY",
    year: 2024,
    category: "urban",
    featured: false
},
{
    id: "dsc_0845",
    filename: "DSC_0845.webp",
    location: "EMPAC hill RPI in Troy, NY",
    year: 2024,
    category: "urban",
    featured: false
},
{
    id: "dsc_1122",
    filename: "DSC_1122.webp",
    location: "CBIS building at RPI in Troy, NY",
    year: 2024,
    category: "architecture",
    featured: false
},
{
    id: "dsc_1133",
    filename: "DSC_1133.webp",
    location: "15th St bridge at RPI in Troy, NY",
    year: 2024,
    category: "urban",
    featured: false
},
{
    id: "dsc_1173",
    filename: "DSC_1173.webp",
    location: "Rensselaer Union at RPI in Troy, NY",
    year: 2024,
    category: "urban",
    featured: false
},
{
    id: "dsc_1457",
    filename: "DSC_1457.webp",
    location: "Scotsdale, AZ",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_1482",
    filename: "DSC_1482.webp",
    location: "Scotsdale, AZ",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_1485",
    filename: "DSC_1485.webp",
    location: "Scotsdale, AZ",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_1492",
    filename: "DSC_1492.webp",
    location: "Scotsdale, AZ",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_1496",
    filename: "DSC_1496.webp",
    location: "Scotsdale, AZ",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_1513",
    filename: "DSC_1513.webp",
    location: "Scotsdale, AZ",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_2335",
    filename: "DSC_2335.webp",
    location: "Buenos Aires, Argentina",
    year: 2025,
    category: "urban",
    featured: false
},
{
    id: "dsc_2356",
    filename: "DSC_2356.webp",
    location: "Buenos Aires, Argentina",
    year: 2025,
    category: "urban",
    featured: false
},
{
    id: "dsc_2398",
    filename: "DSC_2398.webp",
    location: "Colonia Express Ferry in the Rio de la Plata",
    year: 2025,
    category: "urban",
    featured: false
},
{
    id: "dsc_2415",
    filename: "DSC_2415.webp",
    location: "Buenos Aires, Argentina",
    year: 2025,
    category: "urban",
    featured: false
},
{
    id: "dsc_2475",
    filename: "DSC_2475.webp",
    location: "Colonia de Sacramento, Uruguay",
    year: 2025,
    category: "street",
    featured: false
},
{
    id: "dsc_7847",
    filename: "DSC_7847.webp",
    location: "Soroca, Moldova",
    year: 2024,
    category: "street",
    featured: false
},
{
    id: "dsc_7854",
    filename: "DSC_7854.webp",
    location: "Gypsy Hill in Soroca, Moldova",
    year: 2024,
    category: "urban",
    featured: false
},
{
    id: "dsc_7857",
    filename: "DSC_7857.webp",
    location: "Soroca, Moldova",
    year: 2024,
    category: "street",
    featured: false
},
{
    id: "dsc_7866",
    filename: "DSC_7866.webp",
    location: "Soroca, Moldova",
    year: 2024,
    category: "urban",
    featured: false
},
{
    id: "dsc_7878",
    filename: "DSC_7878.webp",
    location: "View of Gypsy Hill in Soroca, Moldova",
    year: 2024,
    category: "architecture",
    featured: false
},
{
    id: "dsc_7891",
    filename: "DSC_7891.webp",
    location: "View of Gypsy Hill in Soroca, Moldova",
    year: 2024,
    category: "architecture",
    featured: false
},
{
    id: "dsc_7896",
    filename: "DSC_7896.webp",
    location: "Soroca, Moldova",
    year: 2024,
    category: "urban",
    featured: false
},
{
    id: "dsc_7898",
    filename: "DSC_7898.webp",
    location: "Soroca, Moldova",
    year: 2024,
    category: "urban",
    featured: false
},
{
    id: "dsc_8663",
    filename: "DSC_8663.webp",
    location: "Vehnbahnweg, Belgium",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_8668",
    filename: "DSC_8668.webp",
    location: "Vehnbahnweg, Belgium",
    year: 2024,
    category: "nature",
    featured: false
},
{
    id: "dsc_8672",
    filename: "DSC_8672.webp",
    location: "Monschau, Germany",
    year: 2024,
    category: "architecture",
    featured: true
},
{
    id: "dsc_8705",
    filename: "DSC_8705.webp",
    location: "Cologne, Germany",
    year: 2024,
    category: "architecture",
    featured: false
},
{
    id: "dsc_8964",
    filename: "DSC_8964.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "urban",
    featured: false
},
{
    id: "dsc_8972",
    filename: "DSC_8972.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "street",
    featured: false
},
{
    id: "dsc_8974",
    filename: "DSC_8974.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "street",
    featured: false
},
{
    id: "dsc_8999",
    filename: "DSC_8999.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "architecture",
    featured: false
},
{
    id: "dsc_9017",
    filename: "DSC_9017.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "street",
    featured: false
},
{
    id: "dsc_9026",
    filename: "DSC_9026.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "architecture",
    featured: false
},
{
    id: "dsc_9032",
    filename: "DSC_9032.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "street",
    featured: false
},
{
    id: "dsc_9047",
    filename: "DSC_9047.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "street",
    featured: false
},
{
    id: "dsc_9052",
    filename: "DSC_9052.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "architecture",
    featured: false
},
{
    id: "dsc_9161",
    filename: "DSC_9161.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "urban",
    featured: false
},
{
    id: "dsc_9167",
    filename: "DSC_9167.webp",
    location: "Salta, Argentina",
    year: 2025,
    category: "urban",
    featured: false
},
{
    id: "dsc_9238",
    filename: "DSC_9238.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: true
},
{
    id: "dsc_9278",
    filename: "DSC_9278.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9292",
    filename: "DSC_9292.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9295",
    filename: "DSC_9295.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9301",
    filename: "DSC_9301.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9307",
    filename: "DSC_9307.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9321",
    filename: "DSC_9321.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9350",
    filename: "DSC_9350.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9359",
    filename: "DSC_9359.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9364",
    filename: "DSC_9364.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9386",
    filename: "DSC_9386.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: true
},
{
    id: "dsc_9409",
    filename: "DSC_9409.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9413",
    filename: "DSC_9413.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: true
},
{
    id: "dsc_9443",
    filename: "DSC_9443.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: true
},
{
    id: "dsc_9539",
    filename: "DSC_9539.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9583",
    filename: "DSC_9583.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9620",
    filename: "DSC_9620.webp",
    location: "Jujuy, Argentina",
    year: 2025,
    category: "nature",
    featured: false
},
{
    id: "dsc_9717",
    filename: "DSC_9717.webp",
    location: "Ottawa, ON",
    year: 2024,
    category: "street",
    featured: false
},
{
    id: "dsc_9724",
    filename: "DSC_9724.webp",
    location: "Parliament Hill in Ottawa, ON",
    year: 2024,
    category: "architecture",
    featured: false
},
{
    id: "dsc_9748",
    filename: "DSC_9748.webp",
    location: "Parliament Hill in Ottawa, ON",
    year: 2024,
    category: "architecture",
    featured: false
},
{
    id: "dsc_9893",
    filename: "DSC_9893.webp",
    location: "Upstate New York",
    year: 2025,
    category: "nature",
    featured: true
}
]; 