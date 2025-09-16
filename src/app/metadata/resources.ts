import {
  Code,
  Globe,
  BookOpen,
  Lightbulb,
  MapPin,
  Gamepad,
  FileText,
  Heart,
  Plane,
  History,
  TrendingUp,
  Map,
  Monitor,
  Grid3X3,
  Podcast,
} from "lucide-react";
import { FiYoutube } from "react-icons/fi";

export const tabs = [
  { id: "all", name: "All Resources", icon: Grid3X3 },
  { id: "coding", name: "Coding", icon: Code },
  { id: "languages", name: "Languages", icon: Globe },
  { id: "wikipedia", name: "Wikipedia", icon: BookOpen },
  { id: "google-maps-lists", name: "Google Maps Lists", icon: MapPin },
  { id: "games", name: "Games", icon: Gamepad },
  { id: "articles", name: "Articles", icon: FileText },
  { id: "health", name: "Health", icon: Heart },
  { id: "travel", name: "Travel", icon: Plane },
  { id: "history", name: "History", icon: History },
  { id: "business", name: "Business", icon: TrendingUp },
  { id: "geography", name: "Geography", icon: Map },
  { id: "technology", name: "Technology", icon: Monitor },
  { id: "random", name: "Random Cool Stuff", icon: Lightbulb },
  { id: "youtube", name: "Youtube", icon: FiYoutube },
  { id: "podcasts", name: "Podcasts", icon: Podcast },
];

export const resources = {
  coding: [
    {
      title: "Project-Based Learning",
      description:
        "A GitHub repository with a curated list of project-based tutorials for various programming languages.",
      url: "https://github.com/practical-tutorials/project-based-learning",
    },
    {
      title: "Awesome Piracy",
      description:
        "Curated list of piracy-related resources, tools, and sites hosted on GitHub Pages.",
      url: "https://shakil-shahadat.github.io/awesome-piracy",
    },
    {
      title: "Android FOSS",
      description:
        "Curated list of free and open source apps for Android focused on privacy and freedom.",
      url: "https://github.com/offa/android-foss",
    },
    {
      title: "Devhints",
      description:
        "Quick reference guides for developers. Cheat sheets for various programming languages and tools.",
      url: "https://devhints.io/",
      category: "Reference",
      featured: false,
    },
    {
      title: "Darling",
      description:
        "Darling is a translation layer that lets you run macOS applications on Linux.",
      url: "https://www.darlinghq.org/",
      category: "Development",
      featured: false,
    },
    {
      title: "DocuSeal",
      description:
        "Open source document filling and signing platform. Create, fill, and sign documents easily.",
      url: "https://www.docuseal.com/",
      category: "Tools",
      featured: false,
    },
    {
      title: "TweakCN",
      description: "Theme generator for shadcn/ui.",
      url: "https://tweakcn.com/",
      category: "Modifications",
      featured: false,
    },
    {
      title: "Tradle",
      description:
        "A daily puzzle where you have to guess a country based on its exports",
      url: "https://oec.world/en/games/tradle",
      category: "Games",
      featured: false,
    },
    {
      title: "Axleos - iPhone 4 Exploitation",
      description:
        "Technical deep dive into exploiting the iPhone 4, part 1: gaining entry.",
      url: "https://axleos.com/exploiting-the-iphone-4-part-1-gaining-entry/",
      category: "Security",
      featured: false,
    },
    {
      title: "Lock.cmpxchg8b - Linux Security",
      description: "Linux security research and exploitation techniques.",
      url: "https://lock.cmpxchg8b.com/linux123.html",
      category: "Security",
      featured: false,
    },
    {
      title: "Microsoft & Windows Activation Scripts",
      description:
        "Open source scripts for activating Windows & other Microsoft software.",
      url: "https://github.com/massgravel/Microsoft-Activation-Scripts",
      category: "Tools",
      featured: false,
    },
    {
      title: "F# for Fun and Profit - Railway Oriented Programming",
      description: "Comprehensive guide to Railway Oriented Programming in F#.",
      url: "https://fsharpforfunandprofit.com/rop/",
      category: "Programming",
      featured: false,
    },
    {
      title: "OpenWRT Reference Hardware",
      description:
        "Ars Technica article about OpenWRT's 20th anniversary and future-proof reference hardware.",
      url: "https://arstechnica.com/gadgets/2024/01/openwrt-now-20-years-old-is-crafting-its-own-future-proof-reference-hardware/",
      category: "Technology",
      featured: false,
    },
    {
      title: "Supabase - Should I Open Source My Company",
      description:
        "Discussion about the pros and cons of open sourcing your company.",
      url: "https://supabase.com/blog/should-i-open-source-my-company",
      category: "Business",
      featured: false,
    },
    {
      title: "Awesome Self-Hosted",
      description: "Curated list of awesome self-hosted software and services.",
      url: "https://github.com/awesome-selfhosted/awesome-selfhosted",
      category: "Tools",
      featured: false,
    },
    {
      title: "Rook to XSS",
      description:
        "Security research on XSS vulnerabilities and exploitation techniques.",
      url: "https://skii.dev/rook-to-xss/",
      category: "Security",
      featured: false,
    },
    {
      title: "Canva Dev - Fonts Problem",
      description:
        "Technical article about the challenges of font rendering and management in web applications.",
      url: "https://www.canva.dev/blog/engineering/fonts-are-still-a-helvetica-of-a-problem/",
      category: "Design",
      featured: false,
    },
    {
      title: "Steamwolf - RanLab",
      description: "Random laboratory tools and utilities for developers.",
      url: "https://steamwo1f.github.io/ranlab/",
      category: "Tools",
      featured: false,
    },
  ],
  languages: [
    {
      title: "Easy Languages",
      description:
        "A language-learning platform that uses street interviews to teach languages in a natural context.",
      url: "https://www.easy-languages.org/",
    },
    {
      title: "Modern Standard Arabic",
      description:
        "Wikipedia article on the standardized variety of Arabic used in writing and formal speech.",
      url: "https://en.wikipedia.org/wiki/Modern_Standard_Arabic",
    },
    {
      title: "Varieties of Chinese",
      description:
        "Wikipedia article outlining the different language varieties that are part of the Chinese language group.",
      url: "https://en.wikipedia.org/wiki/Varieties_of_Chinese",
    },
    {
      title: "Sinitic languages",
      description:
        "Wikipedia article on the Sinitic branch of the Sino-Tibetan language family, which includes the Chinese languages.",
      url: "https://en.wikipedia.org/wiki/Sinitic_languages",
    },
    {
      title: "AlphaDictionary Russian Grammar",
      description:
        "An online reference for Russian grammar rules and structures.",
      url: "https://www.alphadictionary.com/rusgrammar/",
    },
    {
      title: "Guarani language",
      description:
        "Wikipedia article on the indigenous language of South America, which is an official language of Paraguay.",
      url: "https://en.wikipedia.org/wiki/Guarani_language",
    },
    {
      title: "Dalmatian language",
      description:
        "Wikipedia article about the extinct Romance language once spoken in the Dalmatia region of Croatia.",
      url: "https://en.wikipedia.org/wiki/Dalmatian_language",
    },
    {
      title: "Alaskan Russian",
      description:
        "Wikipedia article on the dialect of Russian spoken in Alaska, with influences from indigenous languages.",
      url: "https://en.wikipedia.org/wiki/Alaskan_Russian",
    },
    {
      title: "Arebica",
      description:
        "Wikipedia article about the Arebica script, a variant of the Perso-Arabic script used to write the Bosnian language.",
      url: "https://en.wikipedia.org/wiki/Arebica",
    },
    {
      title: "Glagolitic script",
      description:
        "Wikipedia article about the Glagolitic script, the oldest known Slavic alphabet.",
      url: "https://en.wikipedia.org/wiki/Glagolitic_script",
    },
    {
      title: "Russian terms derived from French",
      description:
        "A Wiktionary category page listing Russian words that are derived from French.",
      url: "https://en.m.wiktionary.org/wiki/Category:Russian_terms_derived_from_French",
    },
    {
      title: "Occitan language",
      description:
        "Wikipedia article about the Occitan language, a Romance language spoken in Southern France, Monaco, and other areas.",
      url: "https://en.wikipedia.org/wiki/Occitan_language",
    },
    {
      title: "Gulf Pidgin Arabic",
      description:
        "Wikipedia article on the pidgin Arabic dialect spoken by foreign workers in the Persian Gulf.",
      url: "https://en.wikipedia.org/wiki/Gulf_Pidgin_Arabic",
    },
    {
      title: "Multilingualism",
      description:
        "Wikipedia article on the use of more than one language by an individual or a community.",
      url: "https://en.wikipedia.org/wiki/Multilingualism",
    },
    {
      title: "Idiolect",
      description:
        "Wikipedia article explaining an idiolect, an individual's unique use of language.",
      url: "https://en.wikipedia.org/wiki/Idiolect",
    },
    {
      title: "Ukrainian Resources",
      description: "Educational platform offering Ukrainian resources.",
      url: "https://www.ukrainianlessons.com/",
    },
    {
      title: "Languages of Europe",
      description:
        "Survey of the linguistic diversity across Europe, listing languages, families, and status.",
      url: "https://en.wikipedia.org/wiki/Languages_of_Europe",
    },
    {
      title: "italki",
      description: "Good & affordable language tutoring.",
      url: "https://italki.com",
      category: "Tutoring",
      featured: false,
    },
    {
      title: "HelloTalk",
      description:
        "Language learning app that connects you with native speakers for free language exchange.",
      url: "https://hellotalk.com",
      category: "Language Exchange",
      featured: false,
    },
  ],
  wikipedia: [
    {
      title: "Yevgeny Zamyatin",
      description:
        "Wikipedia article on the life and work of the influential Russian dystopian author Yevgeny Zamyatin.",
      url: "https://en.wikipedia.org/wiki/Yevgeny_Zamyatin",
    },
    {
      title: "Kafala system",
      description:
        "Wikipedia article explaining the sponsorship system for migrant workers used in some Middle Eastern countries.",
      url: "https://en.wikipedia.org/wiki/Kafala_system",
    },
    {
      title: "Australian rules football",
      description:
        "Wikipedia article about the contact sport played with an oval ball between two teams of 18 players.",
      url: "https://en.wikipedia.org/wiki/Australian_rules_football",
    },
    {
      title: "Cliff Young (athlete)",
      description:
        "Wikipedia article about the Australian potato farmer and ultramarathon runner who won the Sydney to Melbourne Ultramarathon at 61.",
      url: "https://en.wikipedia.org/wiki/Cliff_Young_(athlete)",
    },
    {
      title: "2025 Moldovan energy crisis",
      description:
        "Crisis in Moldova triggered by disruptions in gas and electricity supplies during 2025.",
      url: "https://en.wikipedia.org/wiki/2025_Moldovan_energy_crisis",
    },
    {
      title: "Gagauzia",
      description:
        "Autonomous territorial unit in southern Moldova inhabited mainly by the Gagauz people.",
      url: "https://en.wikipedia.org/wiki/Gagauzia",
    },
    {
      title: "Bosnia and Herzegovina convertible mark",
      description:
        "National currency of Bosnia and Herzegovina pegged to the euro.",
      url: "https://en.wikipedia.org/wiki/Bosnia_and_Herzegovina_convertible_mark",
    },
    {
      title: "GUAM Organization for Democracy and Economic Development",
      description:
        "Regional organization of Georgia, Ukraine, Azerbaijan, and Moldova for political and economic cooperation.",
      url: "https://en.wikipedia.org/wiki/GUAM_Organization_for_Democracy_and_Economic_Development",
    },
    {
      title: "Viktor Gushan",
      description:
        "Moldovan businessman, co-founder of Sheriff, and influential figure in Transnistria.",
      url: "https://en.wikipedia.org/wiki/Viktor_Gushan",
    },
    {
      title: "Igor Smirnov",
      description:
        "First president of the self-proclaimed Pridnestrovian Moldavian Republic (Transnistria).",
      url: "https://en.wikipedia.org/wiki/Igor_Smirnov_(politician)",
    },
    {
      title: "Sheriff (company)",
      description:
        "Transnistrian conglomerate active in retail, media, and energy, dominating the local economy.",
      url: "https://en.wikipedia.org/wiki/Sheriff_(company)",
    },
    {
      title: "Pseudo-anglicism",
      description:
        "Words in other languages that look English but have different or non-existent meanings in English.",
      url: "https://en.wikipedia.org/wiki/Pseudo-anglicism",
    },
    {
      title: "Timothy Leary",
      description:
        "American psychologist and writer known for advocating psychedelic drugs and counterculture.",
      url: "https://en.wikipedia.org/wiki/Timothy_Leary",
    },
    {
      title: "List of countries by ethnic groups",
      description:
        "Compilation of countries sorted by the composition of their ethnic groups.",
      url: "https://en.wikipedia.org/wiki/List_of_countries_by_ethnic_groups",
    },
    {
      title: "List of lakes by area",
      description: "Table ranking the largest lakes on Earth by surface area.",
      url: "https://en.wikipedia.org/wiki/List_of_lakes_by_area",
    },
    {
      title: "Portuguese dialects",
      description:
        "Overview of the regional varieties and dialects of the Portuguese language worldwide.",
      url: "https://en.wikipedia.org/wiki/Portuguese_dialects",
    },
    {
      title: "Lake Baikal",
      description:
        "Deepest and oldest freshwater lake in the world, located in Siberia, Russia.",
      url: "https://en.wikipedia.org/wiki/Lake_Baikal",
    },
    {
      title: "Caspian Sea",
      description:
        "Largest enclosed inland body of water on Earth, bordered by five countries.",
      url: "https://en.wikipedia.org/wiki/Caspian_Sea",
    },
    {
      title: "Lake Victoria",
      description:
        "Africa’s largest lake by area and a vital resource for surrounding nations.",
      url: "https://en.wikipedia.org/wiki/Lake_Victoria",
    },
    {
      title: "Aral Sea",
      description:
        "Once one of the world’s largest lakes, now drastically reduced due to irrigation projects.",
      url: "https://en.wikipedia.org/wiki/Aral_Sea",
    },
    {
      title: "Pacific Crest Trail",
      description:
        "Long-distance hiking trail spanning 4,265 km from Mexico to Canada through the U.S. West Coast.",
      url: "https://en.wikipedia.org/wiki/Pacific_Crest_Trail",
    },
    {
      title: "Urbanization by sovereign state",
      description:
        "Statistics of global countries ranked by levels of urbanization.",
      url: "https://en.wikipedia.org/wiki/Urbanization_by_sovereign_state",
    },
    {
      title: "Plaza Accord",
      description:
        "1985 agreement among G5 nations to depreciate the U.S. dollar relative to the yen and mark.",
      url: "https://en.wikipedia.org/wiki/Plaza_Accord",
    },
    {
      title: "Fall of Kabul (2021)",
      description:
        "Capture of Kabul by the Taliban in August 2021 leading to collapse of the Afghan government.",
      url: "https://en.wikipedia.org/wiki/Fall_of_Kabul_(2021)",
    },
    {
      title: "Soviet invasion of Manchuria",
      description:
        "1945 Soviet military campaign against Japanese forces in Manchuria at the end of WWII.",
      url: "https://en.wikipedia.org/wiki/Soviet_invasion_of_Manchuria",
    },
    {
      title: "Argentine austral",
      description:
        "Former currency of Argentina used between 1985 and 1991 before being replaced by the peso.",
      url: "https://en.wikipedia.org/wiki/Argentine_austral",
    },
    {
      title: "List of Roman emperors",
      description:
        "Chronological list of rulers of the Roman Empire from Augustus to the fall of Constantinople.",
      url: "https://en.wikipedia.org/wiki/List_of_Roman_emperors",
    },
    {
      title: "Operation Condor",
      description:
        "Coordinated campaign of political repression and state terror across South America during the 1970s and 1980s.",
      url: "https://en.wikipedia.org/wiki/Operation_Condor",
    },
    {
      title: "Amur and Timur",
      description:
        "Famous tigers from Russia’s Far East who became known for their unusual companionship.",
      url: "https://en.wikipedia.org/wiki/Amur_and_Timur",
    },
    {
      title: "Founding of Rome",
      description:
        "Legend and history of Rome’s foundation, centered on Romulus and Remus.",
      url: "https://en.wikipedia.org/wiki/Founding_of_Rome",
    },
    {
      title: "Diego Columbus (Lucayan)",
      description:
        "Indigenous Lucayan man enslaved and taken to Spain by Christopher Columbus’s son Diego.",
      url: "https://en.wikipedia.org/wiki/Diego_Columbus_(Lucayan)",
    },
    {
      title: "Karbovanets",
      description:
        "Former currency of Ukraine used during several periods in the 20th century and the early 1990s.",
      url: "https://en.wikipedia.org/wiki/Karbovanets",
    },
    {
      title:
        "List of countries and territories where English is an official language",
      description:
        "Lists nations and territories that recognize English as an official language.",
      url: "https://en.wikipedia.org/wiki/List_of_countries_and_territories_where_English_is_an_official_language",
    },
    {
      title: "Namhae German Village",
      description:
        "Tourist village in South Korea built for returnees from Germany with German-style architecture.",
      url: "https://en.wikipedia.org/wiki/Namhae_German_Village",
    },
    {
      title: "Taiping Island",
      description:
        "Largest of the Spratly Islands in the South China Sea, administered by Taiwan.",
      url: "https://en.wikipedia.org/wiki/Taiping_Island",
    },
    {
      title: "Free Territory of Freedomland",
      description:
        "Micronation declared in 1956 on the Spratly Islands by Filipino adventurer Tomás Cloma.",
      url: "https://en.wikipedia.org/wiki/Free_Territory_of_Freedomland",
    },
    {
      title: "Spinnaker Tower",
      description:
        "Observation tower in Portsmouth, England, shaped like a spinnaker sail.",
      url: "https://en.wikipedia.org/wiki/Spinnaker_Tower",
    },
    {
      title: "Canton Tower",
      description:
        "Landmark observation tower in Guangzhou, China, and one of the world’s tallest towers.",
      url: "https://en.wikipedia.org/wiki/Canton_Tower",
    },
    {
      title: "French petitions against age-of-consent laws",
      description:
        "Historical efforts in France to change or abolish age-of-consent laws, especially in the late 20th century.",
      url: "https://en.wikipedia.org/wiki/French_petitions_against_age-of-consent_laws",
    },
    {
      title: "December 2001 riots in Argentina",
      description:
        "Mass protests and riots in Argentina amid economic collapse and political crisis.",
      url: "https://en.wikipedia.org/wiki/December_2001_riots_in_Argentina",
    },
    {
      title: "Merdeka 118",
      description:
        "Skyscraper in Kuala Lumpur, Malaysia, currently the second-tallest building in the world.",
      url: "https://en.wikipedia.org/wiki/Merdeka_118",
    },
    {
      title: "Mate (drink)",
      description:
        "Traditional South American caffeine-rich infusion made from yerba mate leaves.",
      url: "https://en.wikipedia.org/wiki/Mate_(drink)",
    },
    {
      title: "Babylon",
      description:
        "Ancient Mesopotamian city famed for its hanging gardens and historical significance.",
      url: "https://en.wikipedia.org/wiki/Babylon",
    },
    {
      title: "Peanut Hole",
      description:
        "High seas area in the Atlantic Ocean surrounded by the exclusive economic zones of South American countries.",
      url: "https://en.wikipedia.org/wiki/Peanut_Hole",
    },
    {
      title: "Languages of Belize",
      description:
        "Overview of the official, national, and minority languages spoken in Belize.",
      url: "https://en.wikipedia.org/wiki/Languages_of_Belize",
    },
    {
      title: "Spartan Race",
      description:
        "Series of obstacle races of varying distance and difficulty held worldwide.",
      url: "https://en.wikipedia.org/wiki/Spartan_Race",
    },
    {
      title: "AMIA bombing",
      description:
        "1994 terrorist attack on the Argentine Jewish Mutual Association in Buenos Aires.",
      url: "https://en.wikipedia.org/wiki/AMIA_bombing",
    },
    {
      title: "Hatay Province",
      description:
        "Turkish province on the Mediterranean coast with a diverse cultural heritage.",
      url: "https://en.wikipedia.org/wiki/Hatay_Province",
    },
    {
      title: "Karl Bushby",
      description:
        "British adventurer attempting an unbroken round-the-world walk.",
      url: "https://en.wikipedia.org/wiki/Karl_Bushby",
    },
    {
      title: "Lee Kuan Yew",
      description:
        "Founding Prime Minister of Singapore credited with transforming it into a global hub.",
      url: "https://en.wikipedia.org/wiki/Lee_Kuan_Yew",
    },
    {
      title: "Seven Wonders of the Ancient World",
      description:
        "List of seven remarkable constructions of classical antiquity.",
      url: "https://en.wikipedia.org/wiki/Seven_Wonders_of_the_Ancient_World",
    },
    {
      title: "New 7 Wonders of the World",
      description:
        "Global poll selecting seven modern wonders from a list of existing monuments.",
      url: "https://en.wikipedia.org/wiki/New_7_Wonders_of_the_World",
    },
    {
      title: "Hippolyte Bouchard",
      description:
        "French Argentine sailor and corsair who fought for Argentina’s independence.",
      url: "https://en.wikipedia.org/wiki/Hippolyte_Bouchard",
    },
    {
      title: "Hatay State",
      description:
        "Short-lived transitional state in 1938–1939 before annexation by Turkey.",
      url: "https://en.wikipedia.org/wiki/Hatay_State",
    },
    {
      title: "Japanese occupation of Malaya",
      description:
        "World War II Japanese military occupation of Malaya from 1941 to 1945.",
      url: "https://en.wikipedia.org/wiki/Japanese_occupation_of_Malaya",
    },
    {
      title: "British Malaya",
      description:
        "British colonial territories on the Malay Peninsula and surrounding islands.",
      url: "https://en.wikipedia.org/wiki/British_Malaya",
    },
    {
      title: "Australian Paraguayans",
      description:
        "Community descended from Australian settlers who moved to Paraguay in the 1890s.",
      url: "https://en.wikipedia.org/wiki/Australian_Paraguayans",
    },
    {
      title: "Wojtek (bear)",
      description:
        "Syrian brown bear adopted by Polish soldiers during World War II, known for carrying ammunition.",
      url: "https://en.wikipedia.org/wiki/Wojtek_(bear)",
    },
    {
      title: "Second Congo War",
      description:
        "Africa’s deadliest modern conflict involving multiple nations from 1998 to 2003.",
      url: "https://en.wikipedia.org/wiki/Second_Congo_War",
    },
    {
      title: "Huemul Project",
      description:
        "Failed Argentine attempt in the 1950s to develop nuclear fusion.",
      url: "https://en.wikipedia.org/wiki/Huemul_Project",
    },
    {
      title: "Mahsa Amini protests",
      description:
        "Mass protests in Iran sparked by the death of Mahsa Amini in police custody.",
      url: "https://en.wikipedia.org/wiki/Mahsa_Amini_protests",
    },
    {
      title: "The Metals Company",
      description:
        "Canadian deep-sea mining firm focused on polymetallic nodules.",
      url: "https://en.wikipedia.org/wiki/The_Metals_Company",
    },
    {
      title: "Surzhyk",
      description: "Ukrainian-Russian mixed speech commonly used in Ukraine.",
      url: "https://en.wikipedia.org/wiki/Surzhyk",
    },
    {
      title: "Climate change in the Maldives",
      description:
        "Impact of global warming and sea-level rise on the low-lying Maldives.",
      url: "https://en.wikipedia.org/wiki/Climate_change_in_the_Maldives",
    },
    {
      title: "Eternal September",
      description:
        "Period from 1993 when internet access for the general public disrupted Usenet culture.",
      url: "https://en.wikipedia.org/wiki/Eternal_September",
    },
    {
      title: "Global city",
      description:
        "Urban center considered an important node in the global economic system.",
      url: "https://en.wikipedia.org/wiki/Global_city",
    },
    {
      title: "Naha Great Tug-of-War Festival",
      description:
        "Annual Okinawan festival featuring a giant rope tug-of-war competition.",
      url: "https://en.wikipedia.org/wiki/Naha_Great_Tug-of-War_Festival",
    },
    {
      title: "List of countries by English-speaking population",
      description:
        "Ranks countries based on how many people speak English there.",
      url: "https://en.wikipedia.org/wiki/List_of_countries_by_English-speaking_population",
    },
    {
      title: "List of stadiums by capacity",
      description:
        "Lists the world’s largest stadiums sorted by how many spectators they can hold.",
      url: "https://en.wikipedia.org/wiki/List_of_stadiums_by_capacity",
    },
    {
      title: "Cha chaan teng",
      description:
        "Describes a unique type of fast-service café-restaurant common in Hong Kong blending Western and Chinese dishes.",
      url: "https://en.wikipedia.org/wiki/Cha_chaan_teng",
    },
    {
      title: "List of placeholder names",
      description:
        "Catalogs generic names (like “John Doe”) used when real names aren’t known.",
      url: "https://en.wikipedia.org/wiki/List_of_placeholder_names",
    },
    {
      title: "List of countries by traffic-related death rate",
      description:
        "Compares countries by how many road-traffic deaths occur per population.",
      url: "https://en.wikipedia.org/wiki/List_of_countries_by_traffic-related_death_rate",
    },
    {
      title: "List of countries with overseas military bases",
      description:
        "Shows which countries have military bases located in other nations.",
      url: "https://en.wikipedia.org/wiki/List_of_countries_with_overseas_military_bases",
    },
    {
      title: "List of Argentine provinces by Human Development Index",
      description:
        "Ranks Argentina’s provinces according to their human development levels.",
      url: "https://en.wikipedia.org/wiki/List_of_Argentine_provinces_by_Human_Development_Index",
    },
    {
      title: "List of countries by Human Development Index",
      description:
        "Ranks countries worldwide by standard human development metrics like life expectancy and education.",
      url: "https://en.wikipedia.org/wiki/List_of_countries_by_Human_Development_Index",
    },
    {
      title: "JCDecaux",
      description:
        "Describes the global outdoor advertising company that operates street furniture and billboards.",
      url: "https://en.wikipedia.org/wiki/JCDecaux",
    },
    {
      title: "Ethnic groups of Argentina",
      description:
        "Details the various ethnic origins of Argentina’s population.",
      url: "https://en.wikipedia.org/wiki/Ethnic_groups_of_Argentina",
    },
    {
      title: "Candombe",
      description:
        "Explains the Afro-Uruguayan music and dance tradition also popular in Argentina.",
      url: "https://en.wikipedia.org/wiki/Candombe",
    },
    {
      title: "Italian Brazilians",
      description:
        "Explores the Italian immigrant community and heritage in Brazil.",
      url: "https://en.wikipedia.org/wiki/Italian_Brazilians",
    },
    {
      title: "Sivalik Hills",
      description:
        "Describes the mountain range forming the southern outer Himalayas.",
      url: "https://en.wikipedia.org/wiki/Sivalik_Hills",
    },
    {
      title: "2012 Summer Olympics and Paralympics gold post boxes",
      description:
        "Notes the UK tradition of painting post boxes gold to honor Olympic and Paralympic gold medalists.",
      url: "https://en.wikipedia.org/wiki/2012_Summer_Olympics_and_Paralympics_gold_post_boxes",
    },
    {
      title: "Bachelor tax",
      description:
        "Covers historical or proposed taxes targeting unmarried men.",
      url: "https://en.wikipedia.org/wiki/Bachelor_tax",
    },
    {
      title: "Economic history of Argentina",
      description:
        "Gives an overview of Argentina’s economic development over time.",
      url: "https://en.wikipedia.org/wiki/Economic_history_of_Argentina",
    },
    {
      title: "Siam Di Tella",
      description:
        "Describes the Argentine industrial conglomerate prominent in mid-20th century.",
      url: "https://en.wikipedia.org/wiki/Siam_Di_Tella",
    },
    {
      title: "Sovereign Military Order of Malta",
      description:
        "Explains the religious order and its long history as a sovereign entity.",
      url: "https://en.wikipedia.org/wiki/Sovereign_Military_Order_of_Malta",
    },
    {
      title: "Daihatsu",
      description:
        "Profiles the Japanese car maker known for compact vehicles and kei cars.",
      url: "https://en.wikipedia.org/wiki/Daihatsu",
    },
    {
      title: "Fordlândia",
      description:
        "Tells the story of Henry Ford’s failed utopian rubber plantation in the Amazon.",
      url: "https://en.wikipedia.org/wiki/Fordl%C3%A2ndia",
    },
    {
      title: "Cia-Cia language",
      description:
        "Describes the language spoken in parts of Indonesia, notable for adopting Hangul.",
      url: "https://en.wikipedia.org/wiki/Cia-Cia_language",
    },
    {
      title: "Senegalese tea culture",
      description:
        "Highlights the social tea-drinking tradition and its cultural rituals in Senegal.",
      url: "https://en.wikipedia.org/wiki/Senegalese_tea_culture",
    },
    {
      title: "Embassy of Sweden, Pyongyang",
      description:
        "Details Sweden’s diplomatic mission in North Korea and its unique role there.",
      url: "https://en.wikipedia.org/wiki/Embassy_of_Sweden,_Pyongyang",
    },
    {
      title: "Confederados",
      description:
        "Explains the community of Confederate American descendants in Brazil.",
      url: "https://en.wikipedia.org/wiki/Confederados",
    },
    {
      title: "Tynwald",
      description:
        "Describes the parliament of the Isle of Man, one of the world’s oldest continuous parliaments.",
      url: "https://en.wikipedia.org/wiki/Tynwald",
    },
    {
      title: "Kei truck",
      description:
        "Japan’s compact light trucks built under kei car regulations for size and engine displacement.",
      url: "https://en.wikipedia.org/wiki/Kei_truck",
    },
    {
      title: "ANTEL",
      description: "Uruguay’s state-owned telecommunications provider.",
      url: "https://en.wikipedia.org/wiki/ANTEL",
    },
    {
      title: "Timur",
      description:
        "14th-century Turco-Mongol conqueror and founder of the Timurid Empire.",
      url: "https://en.wikipedia.org/wiki/Timur",
    },
    {
      title: "Neighbourhoods of Buenos Aires",
      description:
        "Overview of the barrios of Buenos Aires and their characteristics.",
      url: "https://en.wikipedia.org/wiki/Neighbourhoods_of_Buenos_Aires",
    },
    {
      title: "Volterra",
      description:
        "Historic Tuscan hill town known for Etruscan, Roman, and medieval heritage.",
      url: "https://en.wikipedia.org/wiki/Volterra",
    },
    {
      title: "Roman province",
      description:
        "Administrative divisions of the Roman Empire and their governance.",
      url: "https://en.wikipedia.org/wiki/Roman_province",
    },
    {
      title: "List of popes",
      description:
        "Chronological listing of all Roman Catholic popes from Saint Peter to present.",
      url: "https://en.wikipedia.org/wiki/List_of_popes",
    },
    {
      title: "São Miguel das Missões",
      description:
        "UNESCO-listed ruins of a 17th-century Jesuit mission in southern Brazil.",
      url: "https://en.wikipedia.org/wiki/S%C3%A3o_Miguel_das_Miss%C3%B5es",
    },
    {
      title: "Portuguese Nagasaki",
      description:
        "History of Portuguese presence in Nagasaki during Japan’s Nanban trade period.",
      url: "https://en.wikipedia.org/wiki/Portuguese_Nagasaki",
    },
    {
      title: "Independence of Brazil",
      description:
        "Events and context surrounding Brazil’s separation from Portugal in 1822.",
      url: "https://en.wikipedia.org/wiki/Independence_of_Brazil",
    },
    {
      title: "Portuguese Empire",
      description:
        "Global maritime empire led by Portugal from the 15th to 20th centuries.",
      url: "https://en.wikipedia.org/wiki/Portuguese_Empire",
    },
    {
      title: "Portuguese Riviera",
      description:
        "Affluent coastal area near Lisbon known for tourism, luxury, and cultural heritage.",
      url: "https://en.wikipedia.org/wiki/Portuguese_Riviera",
    },
    {
      title: "Empire of Brazil",
      description:
        "Brazil as a constitutional monarchy from 1822 until the 1889 republican coup.",
      url: "https://en.wikipedia.org/wiki/Empire_of_Brazil",
    },
    {
      title: "Turned A",
      description: "Phonetic symbol ɒ and its linguistic uses.",
      url: "https://en.wikipedia.org/wiki/Turned_A",
    },
    {
      title: "Voter turnout in United States presidential elections",
      description:
        "Historical participation data in U.S. presidential elections.",
      url: "https://en.wikipedia.org/wiki/Voter_turnout_in_United_States_presidential_elections",
    },
    {
      title: "Trans-Taiga Road",
      description:
        "One of North America’s most remote roads, running through northern Quebec.",
      url: "https://en.wikipedia.org/wiki/Trans-Taiga_Road",
    },
    {
      title: "North American Numbering Plan",
      description:
        "Telephone numbering system used in the U.S., Canada, and other participating countries.",
      url: "https://en.wikipedia.org/wiki/North_American_Numbering_Plan",
    },
    {
      title: "List of telephone country codes",
      description:
        "Complete listing of international telephone dialing codes by country.",
      url: "https://en.wikipedia.org/wiki/List_of_telephone_country_codes",
    },
    {
      title: "Hyperpalatable food",
      description:
        "Highly processed foods engineered for intense flavor appeal.",
      url: "https://en.wikipedia.org/wiki/Hyperpalatable_food",
    },
    {
      title: "NOVA classification",
      description:
        "System for classifying foods by level of processing, from unprocessed to ultra-processed.",
      url: "https://en.wikipedia.org/wiki/Nova_classification",
    },
    {
      title: "Independent State of Croatia",
      description: "Axis puppet state in the Balkans during World War II.",
      url: "https://en.wikipedia.org/wiki/Independent_State_of_Croatia",
    },
    {
      title: "Silvio Berlusconi",
      description:
        "Profile of Italy’s controversial media tycoon and four-time prime minister.",
      url: "https://en.wikipedia.org/wiki/Silvio_Berlusconi",
    },
    {
      title: "Glittering generality",
      description:
        "Propaganda technique using vague, emotionally appealing phrases without specifics.",
      url: "https://en.wikipedia.org/wiki/Glittering_generality",
    },
    {
      title: "Rednaxela Terrace",
      description:
        "Hong Kong street whose name is ‘Alexander’ spelled backwards due to colonial-era mix-up.",
      url: "https://en.wikipedia.org/wiki/Rednaxela_Terrace",
    },
    {
      title: "Burma Railway",
      description:
        "World War II railway built by Japan using forced labor, notorious for high death toll.",
      url: "https://en.wikipedia.org/wiki/Burma_Railway",
    },
    {
      title: "List of metro systems shows urban rail globally",
      description:
        "Compiled inventory of metro/subway systems by city, country, and technical characteristics.",
      url: "https://en.m.wikipedia.org/wiki/List_of_metro_systems",
    },
    {
      title: "Underground hip-hop stayed outside mainstream",
      description:
        "Subculture of hip-hop prioritizing authenticity and alternative distribution over commercial success.",
      url: "https://en.wikipedia.org/wiki/Underground_hip-hop",
    },
    {
      title: "Indian Packing Company gave the Packers their name",
      description:
        "Short-lived meatpacking firm whose sponsorship and field access led to the founding name of the Green Bay Packers.",
      url: "https://en.wikipedia.org/wiki/Indian_Packing_Company",
    },
    {
      title: "Autological word describes itself",
      description:
        "Word that has the property it denotes, like 'short' being short or 'English' being English.",
      url: "https://en.wikipedia.org/wiki/Autological_word",
    },
    {
      title: "RAS syndrome is redundant abbreviation syndrome",
      description:
        "Phrase like 'ATM machine' that repeats meaning because the abbreviation already contains the word.",
      url: "https://en.wikipedia.org/wiki/RAS_syndrome",
    },
    {
      title: "Wiphala is the indigenous Andean flag",
      description:
        "Square multicolored flag representing native peoples of the Andes, used as a symbol of identity and political recognition.",
      url: "https://en.wikipedia.org/wiki/Wiphala",
    },
    {
      title: "Marita Camacho Quirós was Costa Rica’s first lady",
      description:
        "Former first lady of Costa Rica known for her long life and public service legacy.",
      url: "https://en.wikipedia.org/wiki/Marita_Camacho_Quir%C3%B3s",
    },
    {
      title: "Japan's legislature is the National Diet",
      description:
        "Japan’s bicameral parliament that has been the central legislative body since 1890.",
      url: "https://en.wikipedia.org/wiki/National_Diet",
    },
    {
      title: "Ibadism branch of Islam",
      description:
        "Islamic school distinct from Sunni and Shia, dominant in Oman with moderate theological positions.",
      url: "https://en.wikipedia.org/wiki/Ibadism",
    },
    {
      title: "Hyrcanian ancient forests",
      description:
        "Temperate broadleaf forests along the Caspian with high endemism and long ecological continuity.",
      url: "https://en.wikipedia.org/wiki/Hyrcanian_forests",
    },
    {
      title: "Brasiguayos",
      description:
        "Community of Brazilians and their descendants in Paraguay with deep agricultural influence.",
      url: "https://en.wikipedia.org/wiki/Brasiguayos",
    },
    {
      title: "Most expensive television series",
      description:
        "Ranked list of TV series by production cost per episode and total spend.",
      url: "https://en.wikipedia.org/wiki/List_of_most_expensive_television_series",
    },
    {
      title: "Azerbaijan–Turkey relations",
      description:
        "Historical and strategic bilateral relationship framed as 'one nation, two states.'",
      url: "https://en.wikipedia.org/wiki/Azerbaijan%E2%80%93Turkey_relations",
    },
    {
      title: "Byzantine beacon system",
      description:
        "9th-century optical semaphore network used by Byzantines to relay military messages across Asia Minor.",
      url: "https://en.wikipedia.org/wiki/Byzantine_beacon_system",
    },
    {
      title: "Signalling System No. 7",
      description:
        "Telecommunications protocol suite used globally for setting up and managing telephone calls.",
      url: "https://en.wikipedia.org/wiki/Signalling_System_No._7",
    },
    {
      title: "Tally marks",
      description:
        "Simple unary numeral system using grouped strokes to count and record quantities.",
      url: "https://en.wikipedia.org/wiki/Tally_marks",
    },
    {
      title: "Movements for the annexation of Canada to the United States",
      description:
        "Historical proposals and factions advocating that Canada become part of the United States.",
      url: "https://en.wikipedia.org/wiki/Movements_for_the_annexation_of_Canada_to_the_United_States",
    },
    {
      title: "Andean Community",
      description:
        "South American customs union aiming at economic integration among its member states.",
      url: "https://en.wikipedia.org/wiki/Andean_Community",
    },
    {
      title: "Mercosur",
      description:
        "South American trade bloc promoting free movement of goods, people, and currency among members.",
      url: "https://en.wikipedia.org/wiki/Mercosur",
    },
    {
      title: "Niagara Falls peace conference",
      description:
        "1909 diplomatic meeting between the U.S. and Canada resolving border disputes peacefully.",
      url: "https://en.wikipedia.org/wiki/Niagara_Falls_peace_conference",
    },
    {
      title: "Free Trade Area of the Americas",
      description:
        "Proposed hemispheric trade agreement that never fully materialized.",
      url: "https://en.wikipedia.org/wiki/Free_Trade_Area_of_the_Americas",
    },
    {
      title: "Marathon des Sables",
      description:
        "Multi-day ultramarathon across the Sahara Desert known as one of the toughest footraces.",
      url: "https://en.wikipedia.org/wiki/Marathon_des_Sables",
    },
    {
      title: "Race and ethnicity in Brazil",
      description:
        "Demographic and social overview of Brazil's complex racial and ethnic composition.",
      url: "https://en.wikipedia.org/wiki/Race_and_ethnicity_in_Brazil",
    },
    {
      title: "Special economic zones of China",
      description:
        "Designated Chinese regions with regulatory and tax incentives to spur foreign investment and exports.",
      url: "https://en.wikipedia.org/wiki/Special_economic_zones_of_China",
    },
    {
      title: "Bayou",
      description:
        "Slow-moving waterbody typically found in low-lying, swampy regions of the southern United States.",
      url: "https://en.wikipedia.org/wiki/Bayou",
    },
    {
      title: "Ultra-processed food",
      description:
        "Category of industrial formulations high in additives and low in whole ingredients linked to health risks.",
      url: "https://en.wikipedia.org/wiki/Ultra-processed_food",
    },
    {
      title: "Obesity in Mexico",
      description:
        "Overview of prevalence, causes, and public health implications of obesity in Mexico.",
      url: "https://en.wikipedia.org/wiki/Obesity_in_Mexico",
    },
    {
      title: "List of countries by obesity rate",
      description:
        "Comparative ranking of nations based on population obesity prevalence.",
      url: "https://en.wikipedia.org/wiki/List_of_countries_by_obesity_rate",
    },
    {
      title: "Kintsugi",
      description:
        "Japanese art of repairing broken pottery with lacquer mixed with gold, embracing imperfection.",
      url: "https://en.wikipedia.org/wiki/Kintsugi",
    },
    {
      title: "Confederados",
      description:
        "Group of American Civil War Confederate expatriates who settled in Brazil after the war.",
      url: "https://en.wikipedia.org/wiki/Confederados",
    },
    {
      title: "List of highest-grossing concert tours",
      description: "Ranked list of music tours by total revenue earned.",
      url: "https://en.wikipedia.org/wiki/List_of_highest-grossing_concert_tours",
    },
    {
      title: "Yahoo Answers",
      description:
        "Defunct community-driven question-and-answer platform where users asked and voted on answers.",
      url: "https://en.wikipedia.org/wiki/Yahoo_Answers",
    },
    {
      title: "Cosmic microwave background",
      description:
        "Residual thermal radiation from the Big Bang, foundational evidence for cosmology models.",
      url: "https://en.wikipedia.org/wiki/Cosmic_microwave_background",
    },
    {
      title: "Derinkuyu underground city",
      description:
        "Ancient multi-level subterranean city in Cappadocia used for refuge and storage.",
      url: "https://en.wikipedia.org/wiki/Derinkuyu_underground_city",
    },
    {
      title: "Shibam",
      description:
        "Yemeni mudbrick skyscraper city known as 'the Manhattan of the desert.'",
      url: "https://en.wikipedia.org/wiki/Shibam",
    },
    {
      title: "Dracaena cinnabari",
      description:
        "Dragon's blood tree species endemic to Socotra, notable for its umbrella shape and red resin.",
      url: "https://en.wikipedia.org/wiki/Dracaena_cinnabari",
    },
    {
      title: "Kopi luwak",
      description:
        "Coffee made from beans partially digested by civets, controversial for ethics and quality.",
      url: "https://en.wikipedia.org/wiki/Kopi_luwak",
    },
    {
      title: "Automobile Drag Coefficient",
      description:
        "Fascinating look at how car shapes affect fuel efficiency. The most aerodynamic production car has a drag coefficient of just 0.17.",
      url: "https://en.wikipedia.org/wiki/Automobile_drag_coefficient",
      category: "Engineering",
      featured: false,
    },
    {
      title: "Operation Monopoly",
      description:
        "Secret CIA operation that created a fake company to extract a Soviet submarine from the ocean floor during the Cold War.",
      url: "https://en.wikipedia.org/wiki/Operation_Monopoly",
      category: "Cold War",
      featured: false,
    },
    {
      title: "Tadeusz Kościuszko",
      description:
        "Polish military leader who fought in the American Revolution and designed West Point's fortifications, yet most Americans can't pronounce his name.",
      url: "https://en.wikipedia.org//wiki/Tadeusz_Ko%C5%9Bciuszko",
      category: "History",
      featured: false,
    },
    {
      title: "Plan 9 from Bell Labs",
      description:
        "Revolutionary operating system that pioneered many concepts used in modern computing, including the 9P protocol and distributed computing.",
      url: "https://en.wikipedia.org/wiki/Plan_9_from_Bell_Labs",
      category: "Computing",
      featured: false,
    },
    {
      title: "State of Scott",
      description:
        "Brief period when Scott County, Tennessee seceded from the state and formed its own independent nation during the Civil War.",
      url: "https://en.wikipedia.org/wiki/State_of_Scott",
      category: "Civil War",
      featured: false,
    },
    {
      title: "Golden Age of Piracy",
      description:
        "The era when pirates ruled the Caribbean seas, featuring legendary figures like Blackbeard and the establishment of pirate republics.",
      url: "https://en.wikipedia.org/wiki/Golden_Age_of_Piracy",
      category: "Maritime History",
      featured: false,
    },
    {
      title: "Turtle Submersible",
      description:
        "The first documented submarine used in combat, built in 1775 during the American Revolution. It was powered by hand cranks.",
      url: "https://en.wikipedia.org/wiki/Turtle_(submersible)",
      category: "Military History",
      featured: false,
    },
    {
      title: "Interstate Highway System",
      description:
        "The largest public works project in American history, originally designed for military defense and civilian evacuation during the Cold War.",
      url: "https://en.wikipedia.org/wiki/Interstate_Highway_System",
      category: "Infrastructure",
      featured: false,
    },
    {
      title: "Raising of Chicago",
      description:
        "In the 1850s, the entire city of Chicago was raised up to 14 feet using jackscrews to install a sewer system, while buildings remained occupied.",
      url: "https://en.wikipedia.org/wiki/Raising_of_Chicago",
      category: "Engineering",
      featured: false,
    },
    {
      title: "Seattle Underground",
      description:
        "A network of underground passageways and basements that remain from the original street level of Seattle before the Great Fire of 1889.",
      url: "https://en.wikipedia.org/wiki/Seattle_Underground",
      category: "Urban History",
      featured: false,
    },
    {
      title: "List of Countries by Suicide Rate",
      description:
        "Shocking statistics showing the global distribution of suicide rates, with some countries having rates 10 times higher than others.",
      url: "https://en.wikipedia.org/wiki/List_of_countries_by_suicide_rate",
      category: "Statistics",
      featured: false,
    },
    {
      title: "Eighteen Stairs",
      description:
        "A mysterious staircase in the Winchester Mystery House that leads to nowhere, built by a woman who believed she was haunted by Civil War spirits.",
      url: "https://en.wikipedia.org/wiki/Eighteen_Stairs",
      category: "Mystery",
      featured: false,
    },
    {
      title: "Yunnan",
      description:
        "A Chinese province with incredible biodiversity - home to 25,000 species of plants and 1,836 species of vertebrates, many found nowhere else.",
      url: "https://en.wikipedia.org/wiki/Yunnan",
      category: "Geography",
      featured: false,
    },
    {
      title: "KaiOS",
      description:
        "A mobile operating system based on Firefox OS that powers 'smart feature phones' and has over 100 million users worldwide.",
      url: "https://en.wikipedia.org/wiki/KaiOS",
      category: "Technology",
      featured: false,
    },
    {
      title: "Aktau",
      description:
        "A city in Kazakhstan built entirely from scratch in the 1960s to support uranium mining, with streets named after nuclear scientists.",
      url: "https://en.wikipedia.org/wiki/Aktau",
      category: "Soviet History",
      featured: false,
    },
    {
      title: "Perestroika",
      description:
        "Gorbachev's reform program that restructured the Soviet economy and political system, ultimately leading to the USSR's collapse.",
      url: "https://en.wikipedia.org/wiki/Perestroika",
      category: "Soviet History",
      featured: false,
    },
    {
      title: "Dissolution of the Soviet Union",
      description:
        "The dramatic end of the world's largest country, which dissolved into 15 independent nations in 1991, changing global geopolitics forever.",
      url: "https://en.wikipedia.org/wiki/Dissolution_of_the_Soviet_Union",
      category: "Cold War",
      featured: false,
    },
    {
      title: "WikiChip",
      description:
        "Comprehensive database of semiconductor chips, microprocessors, and integrated circuits with detailed technical specifications.",
      url: "https://en.wikichip.org/wiki/WikiChip",
      category: "Technology",
      featured: false,
    },
    {
      title: "Union of Conscientiously Work-Shy Elements",
      description:
        "A satirical political party in 1920s Germany that advocated for laziness and was actually elected to parliament with 7 seats.",
      url: "https://en.wikipedia.org/wiki/Union_of_Conscientiously_Work-Shy_Elements",
      category: "Political Satire",
      featured: false,
    },
    {
      title: "Treaty of Union",
      description:
        "The 1707 agreement that united England and Scotland into Great Britain, creating one of the world's most powerful nations.",
      url: "https://en.wikipedia.org/wiki/Treaty_of_Union",
      category: "British History",
      featured: false,
    },
    {
      title: "Kingdom of Ireland",
      description:
        "A client state of England that existed for over 300 years, during which time the Irish Parliament was controlled by Protestant landowners.",
      url: "https://en.wikipedia.org/wiki/Kingdom_of_Ireland",
      category: "Irish History",
      featured: false,
    },
    {
      title: "Ease of Doing Business Index",
      description:
        "World Bank ranking that measures business regulations across countries, controversially discontinued in 2021 after data manipulation allegations.",
      url: "https://en.wikipedia.org/wiki/Ease_of_doing_business_index",
      category: "Economics",
      featured: false,
    },
    {
      title: "Law French",
      description:
        "A dialect of Old French used in English courts for over 600 years, with phrases like 'attorney general' and 'voir dire' still used today.",
      url: "https://en.wikipedia.org/wiki/Law_French",
      category: "Legal History",
      featured: false,
    },
    {
      title: "Barkley Marathons",
      description:
        "One of the world's toughest ultramarathons - only 15 people have ever finished the 100+ mile race through the Tennessee mountains.",
      url: "https://en.wikipedia.org/wiki/Barkley_Marathons",
      category: "Sports",
      featured: false,
    },
    {
      title: "Marathon des Sables",
      description:
        "Ultra-marathon across the Sahara Desert covering 250km in 6 days, considered one of the toughest foot races on Earth.",
      url: "https://en.wikipedia.org/wiki/Marathon_des_Sables",
      category: "Sports",
      featured: false,
    },
    {
      title: "Apple Car Project",
      description:
        "Apple's secretive autonomous vehicle project that spent billions of dollars and employed thousands before being cancelled in 2024.",
      url: "https://en.wikipedia.org/wiki/Apple_car_project",
      category: "Technology",
      featured: false,
    },
    {
      title: "CFA Franc",
      description:
        "Currency used by 14 African countries, originally pegged to the French franc and now to the euro, with France holding 50% of reserves.",
      url: "https://en.wikipedia.org/wiki/CFA_franc",
      category: "Economics",
      featured: false,
    },
    {
      title: "International Use of the U.S. Dollar",
      description:
        "The dollar's global dominance - used in 88% of international trade and held as reserves by central banks worldwide.",
      url: "https://en.wikipedia.org/wiki/International_use_of_the_U.S._dollar",
      category: "Economics",
      featured: false,
    },
    {
      title: "Alberta Sovereignty Act",
      description:
        "Controversial 2022 law that allows Alberta to ignore federal laws it deems unconstitutional, testing the limits of Canadian federalism.",
      url: "https://en.wikipedia.org/wiki/Alberta_Sovereignty_Act",
      category: "Canadian Politics",
      featured: false,
    },

    {
      title: "Deep and Comprehensive Free Trade Area",
      description:
        "EU trade agreement with Ukraine that eliminated tariffs and created the largest free trade area in Europe.",
      url: "https://en.wikipedia.org/wiki/Deep_and_Comprehensive_Free_Trade_Area",
      category: "Economics",
      featured: false,
    },
    {
      title: "International Status of the Euro",
      description:
        "Analysis of the euro's role as an international currency and its competition with the US dollar.",
      url: "https://en.wikipedia.org/wiki/International_status_and_usage_of_the_euro",
      category: "Economics",
      featured: false,
    },
    {
      title: "French Resistance",
      description:
        "The French Resistance movement during World War II, which fought against Nazi occupation through sabotage, intelligence gathering, and guerrilla warfare.",
      url: "https://en.wikipedia.org/wiki/French_Resistance",
      category: "World War II",
      featured: false,
    },
    {
      title: "Continuously Variable Transmission",
      description:
        "Type of automatic transmission that can change through an infinite number of gear ratios between maximum and minimum values.",
      url: "https://en.wikipedia.org/wiki/Continuously_variable_transmission",
      category: "Engineering",
      featured: false,
    },
    {
      title: "Public Housing in Singapore",
      description:
        "Singapore's unique public housing system, where over 80% of the population lives in government-built apartments.",
      url: "https://en.wikipedia.org/wiki/Public_housing_in_Singapore",
      category: "Urban Planning",
      featured: false,
    },
    {
      title: "Giacomo Casanova",
      description:
        "Venetian adventurer and author whose name became synonymous with seduction, though his life was far more complex and interesting.",
      url: "https://en.wikipedia.org/wiki/Giacomo_Casanova",
      category: "History",
      featured: false,
    },
    {
      title: "Leica Camera",
      description:
        "German company famous for its high-quality cameras and optics, with a rich history in photography and photojournalism.",
      url: "https://en.wikipedia.org/wiki/Leica_Camera",
      category: "Technology",
      featured: false,
    },
    {
      title: "Tangier International Zone",
      description:
        "The unique international zone of Tangier from 1923-1956, governed by multiple countries and known for its cosmopolitan atmosphere.",
      url: "https://en.wikipedia.org/wiki/Tangier_International_Zone",
      category: "History",
      featured: false,
    },
    {
      title: "Vela Incident",
      description:
        "Mysterious double flash detected by US satellites in 1979, possibly indicating a nuclear test, though the source remains disputed.",
      url: "https://en.wikipedia.org/wiki/Vela_incident",
      category: "Cold War",
      featured: false,
    },
    {
      title: "Islamic Golden Age",
      description:
        "Period of cultural, economic, and scientific flourishing in the Islamic world from the 8th to 14th centuries.",
      url: "https://en.wikipedia.org/wiki/Islamic_Golden_Age",
      category: "History",
      featured: false,
    },
    {
      title: "Fall of the Western Roman Empire",
      description:
        "The decline and fall of the Western Roman Empire, marking the end of classical antiquity and the beginning of the Middle Ages.",
      url: "https://en.wikipedia.org/wiki/Fall_of_the_Western_Roman_Empire",
      category: "History",
      featured: false,
    },
    {
      title: "Roman Empire",
      description:
        "The ancient Roman civilization that dominated the Mediterranean world for centuries, from its founding to its eventual decline.",
      url: "https://en.wikipedia.org/wiki/Roman_Empire",
      category: "History",
      featured: false,
    },
    {
      title: "Erfurt Latrine Disaster",
      description:
        "Tragic 1184 incident where a wooden floor collapsed during a meeting, dropping German nobles into a latrine below.",
      url: "https://en.wikipedia.org/wiki/Erfurt_latrine_disaster",
      category: "Medieval History",
      featured: false,
    },
    {
      title: "Nürburgring",
      description:
        "Famous German racing circuit known as 'The Green Hell' for its challenging 20.8 km Nordschleife track.",
      url: "https://en.wikipedia.org/wiki/N%C3%BCrburgring",
      category: "Sports",
      featured: false,
    },
    {
      title: "List of Freedom Indices",
      description:
        "Various international indices that measure freedom, democracy, and human rights around the world.",
      url: "https://en.wikipedia.org/wiki/List_of_freedom_indices",
      category: "Politics",
      featured: false,
    },
    {
      title: "Yakuza",
      description:
        "Japanese organized crime syndicates with a complex history dating back to the Edo period.",
      url: "https://en.wikipedia.org/wiki/Yakuza",
      category: "Criminal Organizations",
      featured: false,
    },
    {
      title: "Samarkand",
      description:
        "Ancient city in Uzbekistan, a key stop on the Silk Road and one of the oldest continuously inhabited cities in Central Asia.",
      url: "https://en.wikipedia.org/wiki/Samarkand",
      category: "Geography",
      featured: false,
    },
    {
      title: "Pyongyang Marathon",
      description:
        "Annual marathon in North Korea's capital that allows foreign tourists to run through the normally closed city.",
      url: "https://en.wikipedia.org/wiki/Pyongyang_Marathon",
      category: "Sports",
      featured: false,
    },
    {
      title: "Soviet War Films",
      description:
        "Category of films produced in the Soviet Union depicting various wars and military conflicts.",
      url: "https://en.wikipedia.org/wiki/Category:Soviet_war_films",
      category: "Film",
      featured: false,
    },
    {
      title: "German Reunification",
      description:
        "The process of reuniting East and West Germany in 1990, ending the Cold War division of Europe.",
      url: "https://en.wikipedia.org/wiki/German_reunification",
      category: "Cold War",
      featured: false,
    },
    {
      title: "National Bank of Haiti",
      description:
        "The central bank of Haiti, with a complex history tied to the country's economic development.",
      url: "https://en.wikipedia.org/wiki/National_Bank_of_Haiti",
      category: "Economics",
      featured: false,
    },
    {
      title: "French Colonial Empire",
      description:
        "The overseas territories and colonies controlled by France from the 16th century to the 1960s.",
      url: "https://en.wikipedia.org/wiki/French_colonial_empire",
      category: "History",
      featured: false,
    },
    {
      title: "Letters of Last Resort",
      description:
        "Secret letters written by British Prime Ministers to submarine commanders with instructions in case of nuclear war.",
      url: "https://en.wikipedia.org/wiki/Letters_of_last_resort",
      category: "Cold War",
      featured: false,
    },
    {
      title: "Moorish Science Temple of America",
      description:
        "Religious organization founded in the early 20th century, blending Islamic and African-American cultural elements.",
      url: "https://en.wikipedia.org/wiki/Moorish_Science_Temple_of_America",
      category: "Religion",
      featured: false,
    },
    {
      title: "Round Barns in Illinois",
      description:
        "Unique architectural style of round barns that became popular in Illinois in the early 20th century.",
      url: "https://en.wikipedia.org/wiki/Round_barns_in_Illinois",
      category: "Architecture",
      featured: false,
    },
    {
      title: "Sam Houston",
      description:
        "American politician and soldier who played a key role in Texas history and the Texas Revolution.",
      url: "https://en.wikipedia.org/wiki/Sam_Houston",
      category: "American History",
      featured: false,
    },
    {
      title: "Texas Declaration of Independence",
      description:
        "The 1836 document declaring Texas's independence from Mexico, leading to the formation of the Republic of Texas.",
      url: "https://en.wikipedia.org/wiki/Texas_Declaration_of_Independence",
      category: "American History",
      featured: false,
    },
    {
      title: "Texas Revolution",
      description:
        "The 1835-1836 conflict between Texas colonists and Mexico that resulted in Texas independence and the formation of the Republic of Texas.",
      url: "https://en.wikipedia.org/wiki/Texas_Revolution",
      category: "American History",
      featured: false,
    },
    {
      title: "Hanlon's Razor",
      description:
        "A philosophical principle that suggests 'never attribute to malice that which is adequately explained by stupidity' when analyzing human behavior.",
      url: "https://en.wikipedia.org/wiki/Hanlon's_razor",
      category: "Philosophy",
      featured: false,
    },
    {
      title: "John Paul Jones",
      description:
        "American naval commander during the Revolutionary War, known as the 'Father of the American Navy' for his daring exploits.",
      url: "https://en.wikipedia.org/wiki/John_Paul_Jones",
      category: "American History",
      featured: false,
    },
    {
      title: "Serapis Flag",
      description:
        "The flag flown by John Paul Jones during the American Revolution, featuring a unique design with 13 stars and stripes.",
      url: "https://en.wikipedia.org/wiki/Serapis_flag",
      category: "American History",
      featured: false,
    },
    {
      title: "Aden",
      description:
        "Port city in Yemen with a rich history as a major trading hub and British colonial outpost in the Middle East.",
      url: "https://en.wikipedia.org/wiki/Aden",
      category: "Geography",
      featured: false,
    },
    {
      title: "The Great Wave off Kanagawa",
      description:
        "Iconic Japanese woodblock print by Hokusai, one of the most recognizable works of art in the world.",
      url: "https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa",
      category: "Art",
      featured: false,
    },
    {
      title: "Digital Nomad",
      description:
        "People who work remotely while traveling, using technology to maintain their careers while exploring the world.",
      url: "https://en.wikipedia.org/wiki/Digital_nomad",
      category: "Lifestyle",
      featured: false,
    },
    {
      title: "Trust Territory of the Pacific Islands",
      description:
        "Former United Nations trust territory administered by the United States, including Micronesia, the Marshall Islands, and Palau.",
      url: "https://en.wikipedia.org/wiki/Trust_Territory_of_the_Pacific_Islands",
      category: "History",
      featured: false,
    },
    {
      title: "Katpana Desert",
      description:
        "High-altitude desert in Pakistan, often called the 'Cold Desert' due to its location in the mountains.",
      url: "https://en.wikipedia.org/wiki/Katpana_Desert",
      category: "Geography",
      featured: false,
    },
    {
      title: "Wigwam Motel",
      description:
        "Iconic roadside motel chain featuring teepee-shaped rooms, a classic example of American roadside architecture.",
      url: "https://en.wikipedia.org/wiki/Wigwam_Motel",
      category: "Architecture",
      featured: false,
    },
    {
      title: "Tick–tock Model",
      description:
        "Intel's product development strategy that alternates between new microarchitecture ('tick') and process technology ('tock') improvements.",
      url: "https://en.wikipedia.org/wiki/Tick%E2%80%93tock_model",
      category: "Technology",
      featured: false,
    },
    {
      title: "Disgusted of Tunbridge Wells",
      description:
        "British phrase referring to a stereotypical conservative, middle-class person who writes angry letters to newspapers.",
      url: "https://en.wikipedia.org/wiki/Disgusted_of_Tunbridge_Wells",
      category: "British Culture",
      featured: false,
    },
    {
      title: "Berber Languages",
      description:
        "Indigenous languages of North Africa, spoken by the Berber people across Morocco, Algeria, Tunisia, and Libya.",
      url: "https://en.wikipedia.org/wiki/Berber_languages",
      category: "Linguistics",
      featured: false,
    },
    {
      title: "Sanskrit",
      description:
        "Ancient Indo-European language of India, the liturgical language of Hinduism and a classical language of South Asia.",
      url: "https://en.wikipedia.org/wiki/Sanskrit",
      category: "Linguistics",
      featured: false,
    },
    {
      title: "GCHQ",
      description:
        "Government Communications Headquarters, the British intelligence and security organization responsible for signals intelligence.",
      url: "https://en.wikipedia.org/wiki/GCHQ",
      category: "Intelligence",
      featured: false,
    },
    {
      title: "Tempora",
      description:
        "British mass surveillance program operated by GCHQ that intercepts and stores vast amounts of internet communications data.",
      url: "https://en.wikipedia.org/wiki/Tempora",
      category: "Intelligence",
      featured: false,
    },
    {
      title: "Chess Boxing",
      description:
        "Hybrid sport that combines chess and boxing, where competitors alternate between rounds of chess and boxing.",
      url: "https://en.wikipedia.org/wiki/Chess_boxing",
      category: "Sports",
      featured: false,
    },
    {
      title: "Lissachatina Fulica",
      description:
        "The giant African land snail, one of the largest terrestrial gastropods, known for its invasive nature and large size.",
      url: "https://en.wikipedia.org/wiki/Lissachatina_fulica",
      category: "Biology",
      featured: false,
    },
    {
      title: "Museu Paulista de Antiguidades Mecânicas",
      description:
        "Brazilian museum dedicated to mechanical antiques and historical machinery.",
      url: "https://pt.wikipedia.org/wiki/Museu_Paulista_de_Antiguidades_Mec%C3%A2nicas",
      category: "Museums",
      featured: false,
    },
    {
      title: "Withdrawal of Greenland from the European Communities",
      description:
        "Greenland's 1985 withdrawal from the European Economic Community, the only territory to ever leave the EU.",
      url: "https://en.wikipedia.org/wiki/Withdrawal_of_Greenland_from_the_European_Communities",
      category: "European Politics",
      featured: false,
    },
    {
      title: "Giant's Causeway",
      description:
        "Natural wonder in Northern Ireland featuring 40,000 interlocking basalt columns formed by ancient volcanic activity.",
      url: "https://en.wikipedia.org/wiki/Giant's_Causeway",
      category: "Geography",
      featured: false,
    },
    {
      title: "List of Diplomatic Missions of North Korea",
      description:
        "Comprehensive list of North Korea's diplomatic missions and embassies around the world.",
      url: "https://en.wikipedia.org/wiki/List_of_diplomatic_missions_of_North_Korea",
      category: "International Relations",
      featured: false,
    },
    {
      title: "Khrushchevka",
      description:
        "Type of low-cost, concrete-panel apartment buildings built in the Soviet Union during Khrushchev's era.",
      url: "https://en.wikipedia.org/wiki/Khrushchevka",
      category: "Architecture",
      featured: false,
    },
    {
      title: "Warsaw Pact Invasion of Czechoslovakia",
      description:
        "The 1968 Soviet-led invasion of Czechoslovakia to suppress the Prague Spring reform movement.",
      url: "https://en.wikipedia.org/wiki/Warsaw_Pact_invasion_of_Czechoslovakia",
      category: "Cold War",
      featured: false,
    },
    {
      title: "Censorship in Communist Poland",
      description:
        "History of censorship practices in Communist Poland, including the elimination of censorship laws in 1990.",
      url: "https://en.wikipedia.org/wiki/Censorship_in_Communist_Poland",
      category: "History",
      featured: false,
    },
    {
      title: "Vienna Convention on Road Traffic",
      description:
        "International treaty that standardizes traffic rules and road signs across participating countries.",
      url: "https://en.wikipedia.org/wiki/Vienna_Convention_on_Road_Traffic",
      category: "International Law",
      featured: false,
    },
    {
      title: "Automobile Dacia",
      description:
        "Romanian car manufacturer, now part of Renault, known for producing affordable vehicles.",
      url: "https://en.wikipedia.org/wiki/Automobile_Dacia",
      category: "Automotive",
      featured: false,
    },
    {
      title: "Romani Language",
      description:
        "Indo-Aryan language spoken by the Romani people, with various dialects across Europe and beyond.",
      url: "https://en.wikipedia.org/wiki/Romani_language",
      category: "Linguistics",
      featured: false,
    },
    {
      title: "Potential Enlargement of the European Union",
      description:
        "Overview of countries that may join the European Union and the enlargement process.",
      url: "https://en.wikipedia.org/wiki/Potential_enlargement_of_the_European_Union",
      category: "European Politics",
      featured: false,
    },
    {
      title: "Velvet Revolution",
      description:
        "The 1989 peaceful revolution in Czechoslovakia that led to the end of Communist rule.",
      url: "https://en.wikipedia.org/wiki/Velvet_Revolution",
      category: "History",
      featured: false,
    },
    {
      title: "Gypsy Lore Society",
      description:
        "Academic organization dedicated to the study of Romani culture, history, and language.",
      url: "https://en.wikipedia.org/wiki/Gypsy_Lore_Society",
      category: "Academic",
      featured: false,
    },
    {
      title: "Bessarabia",
      description:
        "Historical region in Eastern Europe, now divided between Moldova and Ukraine, with a complex ethnic history.",
      url: "https://en.wikipedia.org/wiki/Bessarabia",
      category: "Geography",
      featured: false,
    },
    {
      title: "Credit Union",
      description:
        "Member-owned financial cooperative that provides banking services to its members.",
      url: "https://en.wikipedia.org/wiki/Credit_union",
      category: "Finance",
      featured: false,
    },
    {
      title: "Optical Phenomenon",
      description:
        "Various natural optical effects and atmospheric phenomena that occur in nature.",
      url: "https://en.wikipedia.org/wiki/Optical_phenomenon",
      category: "Physics",
      featured: false,
    },
    {
      title: "Sun Dog",
      description:
        "Atmospheric optical phenomenon that appears as bright spots on either side of the sun.",
      url: "https://en.wikipedia.org/wiki/Sun_dog",
      category: "Physics",
      featured: false,
    },
    {
      title: "Tucker 48",
      description:
        "Innovative American automobile from the late 1940s, known for its advanced safety features and controversial history.",
      url: "https://en.wikipedia.org/wiki/Tucker_48",
      category: "Automotive",
      featured: false,
    },
    {
      title: "Zinaida Portnova",
      description:
        "Soviet partisan and Hero of the Soviet Union who fought against Nazi occupation during World War II.",
      url: "https://en.wikipedia.org/wiki/Zinaida_Portnova",
      category: "World War II",
      featured: false,
    },
    {
      title: "Josef Albers",
      description:
        "German-born American artist and educator known for his work in color theory and geometric abstraction.",
      url: "https://en.wikipedia.org/wiki/Josef_Albers",
      category: "Art",
      featured: false,
    },
    {
      title: "Mustafa Kemal Atatürk",
      description:
        "Founder and first President of Turkey, who modernized the country and established secular reforms.",
      url: "https://en.wikipedia.org/wiki/Mustafa_Kemal_Atat%C3%BCrk",
      category: "History",
      featured: false,
    },
    {
      title: "Around the World in Eighty Days",
      description:
        "Jules Verne's classic adventure novel about Phileas Fogg's attempt to circumnavigate the globe in 80 days.",
      url: "https://en.wikipedia.org/wiki/Around_the_World_in_Eighty_Days",
      category: "Literature",
      featured: false,
    },
    {
      title: "Freedom to Roam",
      description:
        "Legal concept allowing public access to certain private lands for recreation, particularly strong in Nordic countries.",
      url: "https://en.wikipedia.org/wiki/Freedom_to_roam",
      category: "Law",
      featured: false,
    },
    {
      title: "Metric Conversion Act",
      description:
        "US law that established the metric system as the preferred system of weights and measures for trade and commerce.",
      url: "https://en.wikipedia.org/wiki/Metric_Conversion_Act",
      category: "Law",
      featured: false,
    },
    {
      title: "Airstream",
      description:
        "Iconic American travel trailer manufacturer known for its distinctive aluminum-bodied recreational vehicles.",
      url: "https://en.wikipedia.org/wiki/Airstream",
      category: "Automotive",
      featured: false,
    },
    {
      title: "Chang Kong Cliff Road",
      description:
        "Dangerous mountain road in China carved into the side of a cliff, known for its extreme elevation and narrow passages.",
      url: "https://en.wikipedia.org/wiki/Chang_Kong_Cliff_Road",
      category: "Geography",
      featured: false,
    },
    {
      title: "Jining–Tongliao Railway",
      description:
        "Major railway line in China connecting Jining in Inner Mongolia to Tongliao, spanning over 900 kilometers.",
      url: "https://en.wikipedia.org/wiki/Jining%E2%80%93Tongliao_railway",
      category: "Infrastructure",
      featured: false,
    },
    {
      title: "List of Defunct Automobile Manufacturers of the United States",
      description:
        "Comprehensive list of American car companies that have ceased operations, from the early 1900s to present.",
      url: "https://en.wikipedia.org/wiki/List_of_defunct_automobile_manufacturers_of_the_United_States",
      category: "Automotive",
      featured: false,
    },
    {
      title: "Risk (Game)",
      description:
        "Classic strategy board game of global domination, where players compete to conquer territories and eliminate opponents.",
      url: "https://en.wikipedia.org/wiki/Risk_(game)",
      category: "Games",
      featured: false,
    },
    {
      title: "The 50th Law",
      description:
        "Book by Robert Greene and 50 Cent combining ancient wisdom with modern street knowledge and business strategy.",
      url: "https://en.wikipedia.org/wiki/The_50th_Law",
      category: "Literature",
      featured: false,
    },
    {
      title: "Lake Nyos Disaster",
      description:
        "1986 limnic eruption in Cameroon that released a cloud of CO2, suffocating 1,746 people and 3,500 livestock.",
      url: "https://en.wikipedia.org/wiki/Lake_Nyos_disaster",
      category: "Natural Disasters",
      featured: false,
    },
    {
      title: "List of Indian Reservations in the United States",
      description:
        "Comprehensive list of Native American reservations and tribal lands across the United States.",
      url: "https://en.wikipedia.org/wiki/List_of_Indian_reservations_in_the_United_States",
      category: "American History",
      featured: false,
    },
    {
      title: "Robert Pope (Runner)",
      description:
        "Ultra-marathon runner who ran across Canada in 1981, covering 4,900 miles in 65 days.",
      url: "https://en.wikipedia.org/wiki/Robert_Pope_(runner)",
      category: "Sports",
      featured: false,
    },
    {
      title: "BMW 1602 Elektro-Antrieb",
      description:
        "BMW's first electric vehicle prototype from 1972, developed for the Munich Olympics.",
      url: "https://en.wikipedia.org/wiki/BMW_1602_Elektro-Antrieb",
      category: "Automotive",
      featured: false,
    },
    {
      title: "United States National Register of Historic Places",
      description:
        "Official list of historic properties and districts worthy of preservation in the United States.",
      url: "https://en.wikipedia.org/wiki/United_States_National_Register_of_Historic_Places_listings",
      category: "American History",
      featured: false,
    },
    {
      title: "Euphemisms for Internet Censorship in China",
      description:
        "List of terms and phrases used in China to refer to internet censorship and content filtering.",
      url: "https://en.wikipedia.org/wiki/Euphemisms_for_Internet_censorship_in_China",
      category: "Politics",
      featured: false,
    },
    {
      title: "Apache Cordova",
      description:
        "Open-source mobile development framework for building cross-platform mobile applications using web technologies.",
      url: "https://en.wikipedia.org/wiki/Apache_Cordova",
      category: "Technology",
      featured: false,
    },
    {
      title: "Katyn Massacre",
      description:
        "1940 mass execution of Polish military officers and intellectuals by the Soviet NKVD during World War II.",
      url: "https://en.wikipedia.org/wiki/Katyn_massacre",
      category: "World War II",
      featured: false,
    },
    {
      title: "Robert Moses",
      description:
        "Influential urban planner who shaped New York City's infrastructure, known for both his achievements and controversies.",
      url: "https://en.wikipedia.org/wiki/Robert_Moses",
      category: "Urban Planning",
      featured: false,
    },
    {
      title: "CVS Caremark",
      description:
        "Pharmacy benefit management company and subsidiary of CVS Health, managing prescription drug benefits.",
      url: "https://en.wikipedia.org/wiki/CVS_Caremark",
      category: "Business",
      featured: false,
    },
    {
      title: "Hoover Free Flights Promotion",
      description:
        "Infamous 1992 Hoover vacuum cleaner promotion that offered free flights, leading to massive financial losses.",
      url: "https://en.wikipedia.org/wiki/Hoover_free_flights_promotion",
      category: "Business",
      featured: false,
    },
    {
      title: "Autonomous System (Internet)",
      description:
        "Collection of connected Internet Protocol routing prefixes under the control of one or more network operators.",
      url: "https://en.wikipedia.org/wiki/Autonomous_system_(Internet)",
      category: "Technology",
      featured: false,
    },
    {
      title: "Recreational Drug Tourism",
      description:
        "Travel for the purpose of using drugs that are illegal or restricted in one's home country.",
      url: "https://en.wikipedia.org/wiki/Recreational_drug_tourism",
      category: "Travel",
      featured: false,
    },
    {
      title: "Ayahuasca",
      description:
        "Traditional South American psychedelic brew made from plants, used in spiritual and healing ceremonies.",
      url: "https://en.wikipedia.org/wiki/Ayahuasca",
      category: "Culture",
      featured: false,
    },
    {
      title: "Li Kwoh-ting",
      description:
        "Taiwanese economist and politician known as the 'Father of Taiwan's Economic Miracle' for his role in Taiwan's development.",
      url: "https://en.wikipedia.org/wiki/Li_Kwoh-ting",
      category: "Economics",
      featured: false,
    },
    {
      title: "Bektashism in Albania",
      description:
        "Islamic Sufi order that became the official religion of Albania in 1925, representing a unique blend of Islamic mysticism and Albanian nationalism.",
      url: "https://en.wikipedia.org/wiki/Bektashism_in_Albania",
      category: "Religion",
      featured: false,
    },
    {
      title: "Sovereign State of the Bektashi Order",
      description:
        "The administrative structure of the Bektashi Sufi order, which operates as a semi-autonomous religious organization with its own hierarchy and governance.",
      url: "https://en.wikipedia.org/wiki/Sovereign_State_of_the_Bektashi_Order",
      category: "Religion",
      featured: false,
    },
    {
      title: "Holden",
      description:
        "Australian automotive manufacturer that was once the country's largest car producer, known for iconic models like the Commodore and Monaro.",
      url: "https://en.wikipedia.org/wiki/Holden",
      category: "Automotive",
      featured: false,
    },
    {
      title: "Songkran",
      description:
        "Thai New Year festival celebrated with water fights and traditional ceremonies, marking the beginning of the traditional Thai calendar year.",
      url: "https://en.wikipedia.org/wiki/Songkran_(Thailand)",
      category: "Culture",
      featured: false,
    },
    {
      title: "World Nomad Games",
      description:
        "International sports competition featuring traditional nomadic sports from Central Asia, including eagle hunting, kok-boru, and wrestling.",
      url: "https://en.wikipedia.org/wiki/World_Nomad_Games",
      category: "Sports",
      featured: false,
    },
    {
      title: "ATACMS",
      description:
        "Army Tactical Missile System - long-range precision-guided missiles used by the US military for deep strike operations.",
      url: "https://en.wikipedia.org/wiki/ATACMS",
      category: "Military Technology",
      featured: false,
    },
    {
      title: "Cinema of the Soviet Union",
      description:
        "The film industry of the Soviet Union, which produced thousands of films and was one of the world's largest film producers during the 20th century.",
      url: "https://en.wikipedia.org/wiki/Cinema_of_the_Soviet_Union",
      category: "Film",
      featured: false,
    },
    {
      title: "Pyramiden",
      description:
        "Abandoned Soviet mining settlement on the Norwegian archipelago of Svalbard, now a ghost town preserved in the Arctic wilderness.",
      url: "https://en.wikipedia.org/wiki/Pyramiden",
      category: "Geography",
      featured: false,
    },
    {
      title: "Erg Chebbi",
      description:
        "Spectacular sand dunes in the Sahara Desert of Morocco, rising up to 150 meters high and stretching for 22 kilometers.",
      url: "https://en.wikipedia.org/wiki/Erg_Chebbi",
      category: "Geography",
      featured: false,
    },
    {
      title: "Quiraing",
      description:
        "Dramatic landslip on the northernmost peninsula of the Isle of Skye, Scotland, featuring spectacular rock formations and hiking trails.",
      url: "https://en.wikipedia.org/wiki/Quiraing",
      category: "Geography",
      featured: false,
    },
    {
      title: "Jangmadang",
      description:
        "North Korean term for private markets that emerged during the economic crisis of the 1990s, becoming a crucial part of the country's informal economy.",
      url: "https://en.wikipedia.org/wiki/Jangmadang",
      category: "Economics",
      featured: false,
    },
    {
      title: "Pavel Durov",
      description:
        "Russian entrepreneur and programmer who founded VKontakte and Telegram, known for his libertarian views and resistance to government pressure.",
      url: "https://en.wikipedia.org/wiki/Pavel_Durov",
      category: "Technology",
      featured: false,
    },
    {
      title: "Operation Yellow Ribbon",
      description:
        "Canadian response to the September 11 attacks, where 255 aircraft were diverted to Canadian airports and 33,000 passengers were accommodated.",
      url: "https://en.wikipedia.org/wiki/Operation_Yellow_Ribbon",
      category: "History",
      featured: false,
    },
    {
      title: "List of U.S. National Historic Landmarks by State",
      description:
        "Comprehensive list of over 2,600 National Historic Landmarks across all 50 US states, representing the most significant historic properties in America.",
      url: "https://en.wikipedia.org/wiki/List_of_U.S._National_Historic_Landmarks_by_state",
      category: "American History",
      featured: false,
    },
  ],
  "google-maps-lists": [
    {
      title: "Restaurants to Go To",
      description:
        "Curated list of restaurants to visit, organized by location and cuisine type.",
      url: "https://maps.app.goo.gl/JDJYLvJccNWNkeGS7",
      category: "Food",
      featured: false,
    },
    {
      title: "Restaurants (Recommended)",
      description:
        "Personal recommendations of restaurants that have been visited and highly recommended.",
      url: "https://maps.app.goo.gl/u2HhynD4SEHeZZ1MA",
      category: "Food",
      featured: false,
    },
    {
      title: "Cafes to Go To",
      description:
        "Collection of cafes worth visiting, perfect for coffee lovers and casual dining.",
      url: "https://maps.app.goo.gl/qWfn8nxv6FJx5LKm7",
      category: "Food",
      featured: false,
    },
    {
      title: "Bars to Go To",
      description:
        "Curated selection of bars and pubs for nightlife and socializing.",
      url: "https://maps.app.goo.gl/fKEAovBKsPs3XmAaA",
      category: "Nightlife",
      featured: false,
    },
    {
      title: "Cultural Centers",
      description:
        "Important cultural centers and institutions around the world.",
      url: "https://maps.app.goo.gl/hkCGFth4GwpHADo78",
      category: "Culture",
      featured: false,
    },
    {
      title: "Brazil 🇧🇷",
      description: "Points of interest and destinations across Brazil.",
      url: "https://maps.app.goo.gl/5rXi7bfAxLksMCRU7",
      category: "Travel",
      featured: false,
    },
    {
      title: "Bars",
      description: "Additional collection of bars and drinking establishments.",
      url: "https://maps.app.goo.gl/5nzqzJEKVkFccnBEA",
      category: "Nightlife",
      featured: false,
    },
    {
      title: "Uruguay 🇺🇾",
      description: "Destinations and attractions throughout Uruguay.",
      url: "https://maps.app.goo.gl/MpiSVksGHsJMCnVBA",
      category: "Travel",
      featured: false,
    },
    {
      title: "Argentina 🇦🇷",
      description: "Key locations and points of interest across Argentina.",
      url: "https://maps.app.goo.gl/Czr4EndrCXUpUGHD7",
      category: "Travel",
      featured: false,
    },
    {
      title: "Poland 🇵🇱",
      description: "Destinations and attractions throughout Poland.",
      url: "https://maps.app.goo.gl/gRJ1JD7LAQytBqNx8",
      category: "Travel",
      featured: false,
    },
    {
      title: "Paraguay 🇵🇾",
      description: "Points of interest and destinations in Paraguay.",
      url: "https://maps.app.goo.gl/omFehCW65uwMEQU96",
      category: "Travel",
      featured: false,
    },
    {
      title: "Cafes",
      description: "Additional collection of cafes and coffee shops.",
      url: "https://maps.app.goo.gl/kem941aCJqVd7Uns5",
      category: "Food",
      featured: false,
    },
    {
      title: "Museums",
      description: "Collection of museums and cultural institutions.",
      url: "https://maps.app.goo.gl/9H2gDimwsyGCopzj7",
      category: "Culture",
      featured: false,
    },
    {
      title: "Museums to Go To",
      description: "Curated list of museums worth visiting around the world.",
      url: "https://maps.app.goo.gl/Mi7DfMz7CTcNDLeS9",
      category: "Culture",
      featured: false,
    },
    {
      title: "Canada 🇨🇦",
      description: "Destinations and attractions across Canada.",
      url: "https://maps.app.goo.gl/P8VM94oZx3FKddHw5",
      category: "Travel",
      featured: false,
    },
    {
      title: "Hungary 🇭🇺",
      description: "Points of interest and destinations in Hungary.",
      url: "https://maps.app.goo.gl/m4txoJFDbLFULjNw8",
      category: "Travel",
      featured: false,
    },
    {
      title: "Slovakia 🇸🇰",
      description: "Destinations and attractions throughout Slovakia.",
      url: "https://maps.app.goo.gl/eRL9x9eor57na8CX8",
      category: "Travel",
      featured: false,
    },
    {
      title: "Austria 🇦🇹",
      description: "Key locations and points of interest across Austria.",
      url: "https://maps.app.goo.gl/ZtxKxTEq5GxkyzTv9",
      category: "Travel",
      featured: false,
    },
    {
      title: "Moldova 🇲🇩",
      description: "Destinations and attractions in Moldova.",
      url: "https://maps.app.goo.gl/MVANy4uvV6KwhrD57",
      category: "Travel",
      featured: false,
    },
    {
      title: "Belgium 🇧🇪",
      description: "Points of interest and destinations across Belgium.",
      url: "https://maps.app.goo.gl/mryG4ym62dV9n2X58",
      category: "Travel",
      featured: false,
    },
    {
      title: "Hikes",
      description:
        "Curated collection of hiking trails and outdoor adventures.",
      url: "https://maps.app.goo.gl/kVFUQDjBoiaEP2Ve9",
      category: "Outdoor",
      featured: false,
    },
    {
      title: "Germany 🇩🇪",
      description: "Destinations and attractions throughout Germany.",
      url: "https://maps.app.goo.gl/mduMbVKsmRLm5ii46",
      category: "Travel",
      featured: false,
    },
  ],
  games: [
    {
      title: "Capoeira",
      description:
        "Wikipedia article on the Afro-Brazilian martial art that combines elements of dance, acrobatics, and music.",
      url: "https://en.wikipedia.org/wiki/Capoeira",
    },
    {
      title: "Where does your streaming money go?",
      description:
        "Insightful article on the economics of music stream services and how they work.",
      url: "https://furia.com/page.cgi?type=log&id=517",
    },
    {
      title: "List Challenges",
      description:
        "User-generated ranked and themed list platform for participatory content and discoveries.",
      url: "https://www.listchallenges.com/",
    },
    {
      title: "Mob Rule",
      description:
        "A cool website where you can mark the places you've visited, specific subdivisons.",
      url: "https://mob-rule.com/home",
    },
    {
      title: "Geoguessr",
      description: "Guess where you are on Google Street View.",
      url: "https://www.geoguessr.com/",
      category: "Games",
      featured: false,
    },
    {
      title: "LAN Party House",
      description: "A cool photo gallery setup showing a basement LAN setup",
      url: "https://lanparty.house",
      category: "Gaming Events",
      featured: false,
    },
  ],
  articles: [
    {
      title: "Sebastião Salgado",
      description:
        "Wikipedia article on the Brazilian social documentary photographer and photojournalist.",
      url: "https://en.wikipedia.org/wiki/Sebasti%C3%A3o_Salgado",
    },
    {
      title: "Thomas Cole",
      description:
        "Wikipedia article on the English-born American artist and founder of the Hudson River School art movement.",
      url: "https://en.wikipedia.org/wiki/Thomas_Cole",
    },
    {
      title: "South America's Electric Car Surge",
      description:
        "An article from CleanTechnica discussing the acceleration of electric vehicle adoption in South America.",
      url: "https://cleantechnica.com/2025/08/19/south-americas-electric-car-surge-from-lagging-to-accelerating/",
    },
    {
      title: "Cost of Electricity by Country",
      description:
        "A country-by-country comparison of electricity costs provided by World Population Review.",
      url: "https://worldpopulationreview.com/country-rankings/cost-of-electricity-by-country",
    },
    {
      title: "China's Surveillance of 'Troubled People'",
      description:
        "A Wall Street Journal article on how China is using surveillance to monitor individuals deemed a threat to public order.",
      url: "https://www.wsj.com/world/china/china-surveillance-troubled-people-public-order-6e734df4",
    },
    {
      title: "Housing First",
      description:
        "Wikipedia article on the policy approach that prioritizes providing permanent housing to homeless individuals.",
      url: "https://en.wikipedia.org/wiki/Housing_First",
    },
    {
      title: "China, Brazil, and Electric Vehicles",
      description:
        "A New York Times article exploring the relationship between China and Brazil in the context of the electric vehicle market.",
      url: "https://www.nytimes.com/2025/07/21/climate/china-brazil-electric-vehicles.html",
    },
    {
      title: "The leaning towers of Pizza Hut",
      description:
        "Daily Mail commentary on the declining state of aging Pizza Hut buildings.",
      url: "https://www.dailymail.co.uk/debate/article-2084731/The-leaning-towers-Pizza-Hut.html",
    },
    {
      title: "A deal we'd be likely to regret",
      description:
        "1999 New York Times opinion piece cautioning against NATO expansion into Eastern Europe.",
      url: "https://www.nytimes.com/1999/04/18/opinion/a-deal-wed-be-likely-to-regret.html",
    },
    {
      title: "Monkeys as thieves in Bali temple",
      description:
        "WSJ article on macaques in Bali stealing items from tourists to barter for food.",
      url: "https://www.wsj.com/lifestyle/monkeys-thieves-bali-temple-0b63a432",
    },
    {
      title: "Carrefour Flash store in Argentina",
      description:
        "Launch of Carrefour’s AI-driven smart convenience store in Buenos Aires.",
      url: "https://www.webretail.com.ar/carrefour-flash-la-nueva-tienda-inteligente-de-la-cadena-de-supermercados/",
    },
    {
      title: "Wooden skyscrapers are on the rise (WSJ)",
      description:
        "WSJ article on the growing global trend of building tall structures from engineered timber.",
      url: "https://www.wsj.com/real-estate/wooden-skyscrapers-are-on-the-rise-11649693924",
    },
    {
      title: "Vietnam plans provincial mergers – Vietnam Briefing",
      description:
        "Report on Vietnam’s government introducing a plan to merge provinces for efficiency.",
      url: "https://www.vietnam-briefing.com/news/vietnams-government-introduces-official-plan-for-provincial-mergers.html/",
    },
    {
      title: "Two guys built their own fiber ISP – Ars Technica",
      description:
        "Story of two men creating their own fiber internet service to bypass Comcast.",
      url: "https://arstechnica.com/tech-policy/2025/07/two-guys-hated-using-comcast-so-they-built-their-own-fiber-isp/",
    },
    {
      title: "Prague’s narrowest street – Metro UK",
      description:
        "Feature on Prague’s narrowest street and its viral TikTok fame.",
      url: "https://metro.co.uk/2025/07/17/visited-pragues-narrowest-street-see-lives-tiktok-hype-23684952/",
    },
    {
      title: "Kazakhstan helping Russia bypass sanctions – The Diplomat",
      description:
        "Analysis of Kazakhstan’s role in helping Russia evade Western sanctions.",
      url: "https://thediplomat.com/2023/10/how-kazakhstan-helps-russia-bypass-western-sanctions/?utm_source=chatgpt.com",
    },
    {
      title: "Poland could change Europe – The Guardian",
      description:
        "Opinion piece on Poland’s rising influence and performance in Europe.",
      url: "https://www.theguardian.com/commentisfree/2023/apr/25/poland-change-europe-high-achievers-country",
    },
    {
      title: "San Pedro Prison – Architectural Review",
      description:
        "Essay exploring the self-governing structure and informal economy of Bolivia’s San Pedro Prison.",
      url: "https://www.architectural-review.com/essays/a-law-unto-themselves-san-pedro-prison-in-la-paz-bolivia",
    },
    {
      title: "IAEA GOV/2025/24",
      description: "International Atomic Energy Agency report from June 2025.",
      url: "https://www.iaea.org/sites/default/files/25/06/gov2025-24.pdf",
    },
    {
      title: "Carnaval in Jujuy – Argentina Reports",
      description:
        "Travel feature on the unique Andean carnival celebrations in Jujuy, Argentina.",
      url: "https://argentinareports.com/carnaval-in-jujuy-is-a-hidden-gem/714/",
    },
    {
      title: "Russian shortest metro – RBTH",
      description:
        "Article about Omsk’s unusually short metro system in Russia.",
      url: "https://www.rbth.com/travel/333851-russian-shortest-metro-omsk/amp",
    },
    {
      title: "Shiftphone 8 – Shift.eco",
      description:
        "Overview of the sustainable, repairable smartphone Shiftphone 8.",
      url: "https://www.shift.eco/en/shiftphone-8/",
    },
    {
      title: "Lost Media Wiki – Mexia Supermarket",
      description:
        "Page documenting partially lost footage of an abandoned Texas supermarket in 1999.",
      url: "https://lostmediawiki.com/Mexia_Supermarket_(partially_lost_footage_of_abandoned_Texas_grocery_store;_1999)",
    },
    {
      title: "NDTV – Bhopal bridge geometry",
      description:
        "Report on a uniquely designed Bhopal bridge with sharp 90-degree turns.",
      url: "https://www.ndtv.com/india-news/lesson-in-geometry-bhopal-bridge-with-90-degree-angle-turns-heads-8661603",
    },
    {
      title: "Daily NK – Water park corruption crackdown",
      description:
        "North Korean news outlet reporting on anti-corruption measures at a water park.",
      url: "https://www.dailynk.com/english/n-korea-cracks-down-on-water-park-corruption/?tztc=1",
    },
    {
      title: "New Zealand roadmap cones article (WSJ)",
      description:
        "Reports on traffic and tourism issues in Queenstown, New Zealand and quirky cone usage on roads.",
      url: "https://www.wsj.com/lifestyle/workplace/new-zealand-queenstown-traffic-road-cones-beb10893",
    },
    {
      title: "Slate electric truck pricing quirks (The Verge)",
      description:
        "Covers Slate’s $10k electric truck and extra charges for features like paint and radio.",
      url: "https://www.theverge.com/electric-cars/655527/slate-electric-truck-price-paint-radio-bezos",
    },
    {
      title: "McDonald’s space-themed CosMc’s chain (WSJ)",
      description:
        "WSJ review of McDonald’s new space-inspired takeout brand CosMc’s.",
      url: "https://www.wsj.com/business/hospitality/a-trip-to-cosmcs-mcdonalds-new-space-themed-takeout-chain-19bb8ed2",
    },
    {
      title: "Quote of the Day – Guido Fawkes blog",
      description:
        "Political blog post featuring a notable quote from April 2011.",
      url: "https://order-order.com/2011/04/18/quote-of-the-day-426/",
    },
    {
      title: "Berlusconi’s gaffes and quotes (Reuters)",
      description:
        "Collection of memorable gaffes, quips, and quotes from Silvio Berlusconi.",
      url: "https://www.reuters.com/world/europe/silvio-berlusconis-gaffes-quips-quotes-2023-06-12/",
    },
    {
      title: "The Toaster Project",
      description:
        "Artist Thomas Thwaites’s experiment building a toaster from scratch to explore industrial complexity.",
      url: "https://www.thomasthwaites.com/the-toaster-project/",
    },
    {
      title: "Tom Scott’s website",
      description:
        "Personal site of Tom Scott covering his podcast Lateral, newsletter and creative projects.",
      url: "https://www.tomscott.com/",
    },
    {
      title: "Google Maps redraws disputed borders depending who’s looking",
      description:
        "Interactive maps shift how contested territories appear based on viewer location and politics.",
      url: "https://www.washingtonpost.com/technology/2020/02/14/google-maps-political-borders/",
    },
    {
      title: "Using Google Maps might shrink grey matter",
      description:
        "Claim that overreliance on navigation apps could reduce spatial memory engagement in the brain.",
      url: "https://www.washingtonpost.com/news/the-switch/wp/2016/03/31/using-google-maps-may-reduce-the-amount-of-grey-matter-in-your-brain/",
    },
    {
      title: "Mystery mole’s adaptations revealed",
      description:
        "Popular Science piece uncovering biology and ecological significance of the elusive desert-dwelling marsupial mole.",
      url: "https://www.popsci.com/environment/mystery-mole/",
    },
    {
      title: "Strava banned a user for running in North Korea",
      description:
        "Report on a runner being blocked after geotagging activity in North Korea, raising questions about platform policy and geopolitical sensitivity.",
      url: "https://www.dcrainmaker.com/2025/03/strava-bans-user-for-running-in-north-korea.html",
    },
    {
      title: "Cuevas: knights of the free market",
      description:
        "Opinion/deep-dive piece profiling libertarian influencers using knightly metaphor to critique modern economics.",
      url: "https://www.bowtiedmara.io/p/cuevas-the-knights-of-the-free-market",
    },
    {
      title: "Milei gives Italian PM a figurine of himself",
      description:
        "Story about Javier Milei gifting Italy’s prime minister a figurine modeled after him as a personalized diplomatic gesture.",
      url: "https://www.em.com.br/internacional/2024/11/6994855-milei-presenteia-primeira-ministra-italiana-boneco-de-si-mesmo.html",
    },
    {
      title: "Psychedelics modulate the default mode network",
      description:
        "Explores how psychedelics alter activity in the brain’s default mode network and implications for consciousness.",
      url: "https://psychedelicstoday.com/2020/02/04/psychedelics-and-the-default-mode-network/",
    },
    {
      title: "Review of default mode network effects by psychedelics",
      description:
        "Systematic review of how various psychedelics impact the brain’s default mode network across studies.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10032309/",
    },
    {
      title: "East Germany coffee culture",
      description:
        "Details how coffee was consumed, sourced, and symbolically used in East Germany under scarcity and state control.",
      url: "https://www.coffeeordie.com/article/east-germany-coffee",
    },
    {
      title: "Associated Press",
      description:
        "Long-established nonprofit news cooperative with global distribution and influential journalistic standards.",
      url: "https://en.wikipedia.org/wiki/Associated_Press",
    },
    {
      title: "Polluted Holy River, India",
      description:
        "Report on Hindus continuing ritual baths in a sacred river despite severe pollution (inferred from URL).",
      url: "https://www.barrons.com/news/india-s-hindus-bathe-in-holy-river-defiled-by-pollution-f566638a",
    },
    {
      title: "Sharks Testing Positive for Cocaine",
      description:
        "Reuters story about sharks off Rio de Janeiro showing traces of cocaine, signaling unexpected environmental contamination.",
      url: "https://www.reuters.com/business/environment/sharks-off-rio-de-janeiro-test-positive-cocaine-2024-07-25/?utm_source=reddit.com",
    },
    {
      title: "Vietnam Real Estate Fraud",
      description:
        "News about a Vietnamese real estate tycoon’s death sentence appeal over a $27 billion fraud scheme (inferred from URL).",
      url: "https://fortune.com/asia/2024/11/04/vietnam-real-estate-tycoon-sentenced-death-27-billion-fraud-appeal-sentence/",
    },
    {
      title: "Collapsing Buildings in Havana",
      description:
        "Coverage of Havana’s crumbling infrastructure and UNESCO heritage concerns amid building decay (inferred from URL).",
      url: "https://www.usatoday.com/story/news/world/2018/12/02/havana-cuba-collapsing-buildings-housing-unesco/1998606002/",
    },
    {
      title: "Baklava",
      description:
        "Explanation of the layered nut-and-syrup pastry, its origins, and cultural variants.",
      url: "https://en.wikipedia.org/wiki/Baklava",
    },
    {
      title: "Lençóis Maranhenses dunes travel",
      description:
        "Travel piece about visiting the unique sand dune lagoons of Lençóis Maranhenses in Brazil.",
      url: "https://edition.cnn.com/travel/article/lencois-maranhenses-national-park-sand-dunes-brazil/index.html",
    },
    {
      title: "Milk bars culture",
      description:
        "BBC story exploring communities where people go to bars specifically to drink milk.",
      url: "https://www.bbc.com/travel/article/20210323-where-people-go-to-bars-to-drink-milk",
    },
    {
      title: "Inside Andrés Carne de Res",
      description:
        "Feature on Bogotá’s over-the-top restaurant known for spectacle dining and nightlife energy.",
      url: "https://www.eater.com/2018/10/17/17962282/andres-carne-de-res-bogota-colombia-restaurant",
    },
    {
      title: "Shibam mud skyscraper city",
      description:
        "National Geographic profile of the ancient mudbrick high-rise city in Yemen and its architecture.",
      url: "https://www.nationalgeographic.com/travel/article/shibam-mud-skyscraper-yemen",
    },
    {
      title: "Illegal border crossings in NY",
      description:
        "Adirondack Explorer article on how rising unauthorized Canada-New York crossings strain small towns.",
      url: "https://www.adirondackexplorer.org/stories/illegal-border-crossings-canada-new-york-overwhelm-towns",
    },
    {
      title: "Barcelona climbing tunnel",
      description:
        "Reuters piece on how a free gym tunnel in Barcelona is popularizing climbing ahead of Olympics.",
      url: "https://www.reuters.com/sports/olympics/barcelonas-free-gym-tunnel-helps-popularise-climbing-2024-07-20/",
    },
    {
      title: "Kremlin-occupied Ukraine",
      description:
        "The Economist analysis calling occupied Ukrainian regions totalitarian and oppressive.",
      url: "https://www.economist.com/europe/2024/11/10/kremlin-occupied-ukraine-is-now-a-totalitarian-hell",
    },
    {
      title: "Kim Jong Un missile skyscraper flaw",
      description:
        "Metro article criticizing design flaws in North Korean missile-shaped skyscrapers in Pyongyang.",
      url: "https://metro.co.uk/2024/11/25/kim-jong-uns-missile-shaped-skyscrapers-one-major-design-flaw-22061003/",
    },
    {
      title: "Irish Times - US Destroyed North Korea",
      description:
        "Unknown to most Americans, the US completely destroyed North Korea during the Korean War, dropping more bombs than in the entire Pacific theater of WWII.",
      url: "https://www.irishtimes.com/news/world/asia-pacific/unknown-to-most-americans-the-us-totally-destroyed-north-korea-once-before-1.3227633",
      category: "History",
      featured: false,
    },
    {
      title: "BBC - North Korea Article",
      description:
        "BBC coverage of North Korea and its complex relationship with the international community.",
      url: "https://www.bbc.com/news/world-asia-48864807",
      category: "News",
      featured: false,
    },
    {
      title: "Washington Post - Soviet Embassy Crisis",
      description:
        "1991 article about the identity crisis faced by Soviet embassies as the USSR was collapsing.",
      url: "https://www.washingtonpost.com/archive/politics/1991/12/20/soviet-embassys-identity-crisis/68d627ee-6a55-434c-9ac1-781a923539a2/",
      category: "Cold War",
      featured: false,
    },
    {
      title: "Folklore.org",
      description:
        "Stories about the development of the original Macintosh computer, told by the people who were there.",
      url: "https://www.folklore.org/0-index.html",
      category: "Computer History",
      featured: false,
    },
    {
      title: "Conde Nast Traveler - Montreal",
      description:
        "Fascinating story about how Montreal is actually much older than Canada itself.",
      url: "https://www.cntraveler.com/story/montreal-is-actually-much-older-than-canada",
      category: "Travel",
      featured: false,
    },
    {
      title: "The Paris Review - Symbolism Survey",
      description:
        "Document from the symbolism survey, exploring the hidden meanings in everyday objects.",
      url: "https://www.theparisreview.org/blog/2011/12/05/document-the-symbolism-survey/",
      category: "Literature",
      featured: false,
    },
    {
      title: "The Urbanist - Seattle Bike Network",
      description:
        "Article about Seattle's bike network that's so popular it can't handle its own success.",
      url: "https://theurbanist.org/2023/12/01/seattle-is-building-a-citywide-bike-network-that-cannot-handle-its-own-popularity/",
      category: "Urban Planning",
      featured: false,
    },
    {
      title: "The Guardian - French Village Bans Phones",
      description:
        "A French village that voted to ban smartphone scrolling in public spaces to combat digital addiction.",
      url: "https://www.theguardian.com/world/2024/feb/10/fighting-the-smartphone-invasion-the-french-village-that-voted-to-ban-scrolling-in-public",
      category: "Technology",
      featured: false,
    },
    {
      title: "Inc Magazine - Liquid Death",
      description:
        "The story of Liquid Death, the canned water company that became a billion-dollar brand by marketing water like heavy metal.",
      url: "https://www.inc.com/magazine/202210/alex-bhattacharji/liquid-death-2022.html",
      category: "Business",
      featured: false,
    },
    {
      title: "NPR - Dating App Lawsuit",
      description:
        "Lawsuit against Match Group (Tinder, Hinge) alleging they use addictive features to keep users paying.",
      url: "https://www.npr.org/2024/02/14/1231513991/tinder-hinge-match-group-lawsuit",
      category: "Technology",
      featured: false,
    },
    {
      title: "New York Times - El Salvador Gangs",
      description:
        "In-depth coverage of El Salvador's crackdown on gangs and the human rights implications.",
      url: "https://www.nytimes.com/2023/04/09/world/americas/el-salvador-gangs.html",
      category: "International News",
      featured: false,
    },
    {
      title: "ABC News - Marathon des Sables",
      description:
        "The incredible story of Mauro Prosperi, who got lost in the Sahara during the Marathon des Sables and survived for 9 days.",
      url: "https://www.abc.net.au/news/2022-01-01/marathon-des-sables-mauro-prosperi/100726892",
      category: "Sports",
      featured: false,
    },
    {
      title: "Steve Jobs Market Research",
      description:
        "Blog post about Steve Jobs' approach to market research and why he famously didn't believe in focus groups.",
      url: "https://blog.flexmr.net/steve-jobs-market-research",
      category: "Business",
      featured: false,
    },
    {
      title: "Global Finance - Romania",
      description:
        "Analysis of Romania's economic potential and investment opportunities in Eastern Europe.",
      url: "https://gfmag.com/data/romania-potential-unlocked/",
      category: "Economics",
      featured: false,
    },
    {
      title: "Hot Takes - Amateurs Obsess Over Tools",
      description:
        "Article about how amateurs focus on tools while professionals focus on outcomes.",
      url: "https://www.hottakes.space/p/amateurs-obsess-over-tools-pros-over",
      category: "Productivity",
      featured: false,
    },
    {
      title: "Eliot Blog - E-Ink Frame",
      description:
        "Blog post about creating an e-ink frame for displaying information.",
      url: "https://eliot.blog/e-ink-frame",
      category: "Technology",
      featured: false,
    },
    {
      title: "Mystery-O-Matic",
      description: "Interactive mystery game and puzzle platform.",
      url: "https://mystery-o-matic.com/en/",
      category: "Games",
      featured: false,
    },
    {
      title: "WSJ - AI Denies Loan Application",
      description:
        "Wall Street Journal article about AI systems denying loan applications and the appeal to human intervention.",
      url: "https://www.wsj.com/tech/ai/ai-denies-loan-application-appeal-to-human-48d18d57",
      category: "Technology",
      featured: false,
    },
    {
      title: "Carsized.com",
      description:
        "Compare car sizes and dimensions with an interactive visualization tool.",
      url: "https://www.carsized.com/en/",
      category: "Automotive",
      featured: false,
    },
    {
      title: "IEEE Spectrum - Baltic Power Grid",
      description:
        "Article about freeing the Baltic power grid from Russian control using spinning megamachines.",
      url: "https://spectrum.ieee.org/baltic-power-grid",
      category: "Technology",
      featured: false,
    },
    {
      title: "Scientific American - Sleep Deprivation",
      description:
        "Research on how sleep deprivation affects brain function and amplifies neural responses.",
      url: "https://www.scientificamerican.com/article/sleep-deprivation-amps-up-brain/",
      category: "Health",
      featured: false,
    },
    {
      title: "WSJ - Supreme Court Elections",
      description:
        "Analysis of the Supreme Court's role in deciding elections, comparing 2000 and 2024.",
      url: "https://www.wsj.com/us-news/law/whether-in-2000-or-2024-theres-no-upside-for-supreme-court-in-deciding-elections-655cd07a",
      category: "Politics",
      featured: false,
    },
    {
      title: "Slate - Big Red Word vs Little Green Man",
      description:
        "Article about traffic signal design and the psychology of stop signs vs traffic lights.",
      url: "https://www.slate.com/articles/life/signs/2010/03/the_big_red_word_vs_the_little_green_man.html",
      category: "Design",
      featured: false,
    },
    {
      title: "DiploPlates Country List",
      description:
        "GitHub repository containing a comprehensive list of countries and their diplomatic plate codes.",
      url: "https://github.com/cancio/DiploPlates/blob/master/countryList.txt",
      category: "Reference",
      featured: false,
    },
    {
      title: "Trash Guides",
      description:
        "Comprehensive guides for managing media libraries and organizing digital content.",
      url: "https://trash-guides.info/",
      category: "Software",
      featured: false,
    },
    {
      title: "CyberCollective - Delete Data from Brokers",
      description:
        "Guide on how to remove your personal data from data broker websites.",
      url: "https://www.cybercollective.org/blog/how-to-delete-your-data-from-data-brokers",
      category: "Privacy",
      featured: false,
    },
    {
      title: "FEE - Capitalism Board Game",
      description:
        "Article about board games that actually simulate capitalism, moving beyond Monopoly.",
      url: "https://fee.org/articles/forget-monopoly-this-board-game-really-simulates-capitalism/",
      category: "Games",
      featured: false,
    },
    {
      title: "The Milepost",
      description:
        "Comprehensive travel guide for Alaska and the Yukon, known as the bible of North Country travel.",
      url: "https://themilepost.com/",
      category: "Travel",
      featured: false,
    },
    {
      title:
        "Cheran: The town that threw out police, politicians and gangsters",
      description:
        "A small town in Michoacan, Mexico got rid of both gansters and politicians to get rid of organized crime",
      url: "https://www.bbc.com/news/magazine-37612083",
      category: "News",
      featured: false,
    },
    {
      title: "Inverted Passion - Time Perception",
      description:
        "Article exploring why time seems to pass faster as we age and the psychology behind this phenomenon.",
      url: "https://invertedpassion.com/why-time-seems-to-pass-faster-as-we-age/",
      category: "Psychology",
      featured: false,
    },
    {
      title: "Kottke - New Pasta Shape",
      description:
        "Article about the invention of a new pasta shape and the creative process behind food innovation.",
      url: "https://kottke.org/21/03/the-invention-of-a-new-pasta-shape",
      category: "Food",
      featured: false,
    },
    {
      title: "CandyCall",
      description:
        "Service for making phone calls and managing telecommunications.",
      url: "https://www.candycall.io/",
      category: "Technology",
      featured: false,
    },
    {
      title: "UC Berkeley - Wandering Mind Research",
      description:
        "Research paper on how a wandering mind correlates with unhappiness and mindfulness.",
      url: "https://greatergood.berkeley.edu/images/uploads/A_Wandering_Mind_Is_an_Unhappy_Mind.pdf",
      category: "Psychology",
      featured: false,
    },
    {
      title: "Lopes PM - Writing as Thinking",
      description:
        "Blog post about how writing serves as a form of thinking and problem-solving.",
      url: "https://lopespm.com/notes/2023/07/02/writing-as-a-form-of-thinking.html",
      category: "Productivity",
      featured: false,
    },
    {
      title: "Zolima City Mag - Hong Kong Traffic",
      description:
        "Article about Hong Kong's unique traffic system where drivers keep to the left despite being part of China.",
      url: "https://zolimacitymag.com/driving-right-how-much-longer-will-hong-kong-traffic-keep-to-the-left/",
      category: "Transportation",
      featured: false,
    },
    {
      title: "Tom's Hardware - SSD Smuggler",
      description:
        "News article about a smuggler caught with 420 M.2 SSDs strapped to their stomach.",
      url: "https://www.tomshardware.com/news/smuggler-caught-with-420-m2-ssds-strapped-to-his-stomach",
      category: "Technology",
      featured: false,
    },
    {
      title: "Investopedia - Underground Economy",
      description:
        "Analysis of the size and scope of America's underground economy and informal economic activities.",
      url: "https://www.investopedia.com/articles/markets/032916/how-big-underground-economy-america.asp",
      category: "Economics",
      featured: false,
    },
    {
      title: "The Star - Blind Date Crash",
      description:
        "News article about 23 relatives crashing a blind date, leading to an unexpected family gathering.",
      url: "https://www.thestar.com.my/news/nation/2023/06/08/hot-mess-as-23-relatives-crash-on-blind-date",
      category: "News",
      featured: false,
    },
    {
      title: "Contacto - Portuguese North Korea Friend",
      description:
        "Article about João Micaelo, the Portuguese man who became friends with North Korea's leader.",
      url: "https://www.contacto.lu/mundo/jo-o-micaelo-o-portugues-que-e-melhor-amigo-do-l-der-da-coreia-do-norte/458872.html",
      category: "International Relations",
      featured: false,
    },
    {
      title: "Texas State Library - Secession Document",
      description:
        "Historical document from February 2, 1861, detailing Texas's secession from the United States.",
      url: "https://www.tsl.texas.gov/ref/abouttx/secession/2feb1861.html",
      category: "American History",
      featured: false,
    },
    {
      title: "PeerTube - Video Content",
      description:
        "Decentralized video platform content, part of the federated web ecosystem.",
      url: "https://peertube2.cpy.re/w/04af977f-4201-4697-be67-a8d8cae6fa7a",
      category: "Technology",
      featured: false,
    },
    {
      title: "Grazia Magazine - Dubai Cloud Seeding",
      description:
        "Article about rain in the UAE and Dubai's cloud seeding program to create artificial rainfall.",
      url: "https://graziamagazine.com/me/articles/rain-in-the-uae-dubai-cloud-seeding/",
      category: "Technology",
      featured: false,
    },
    {
      title: "The Chip Letter - Tiny Computers from Texas",
      description:
        "Newsletter article about small computers and microprocessors from Texas companies.",
      url: "https://thechipletter.substack.com/p/tiny-computers-from-texas",
      category: "Technology",
      featured: false,
    },
    {
      title: "Cheswick Insults",
      description:
        "Collection of creative insults and witty remarks from Bill Cheswick's website.",
      url: "https://cheswick.com/insults",
      category: "Humor",
      featured: false,
    },
    {
      title: "University Times - Erasmus Babies",
      description:
        "Article about 'Erasmus babies' - children born from relationships formed during European student exchange programs.",
      url: "https://universitytimes.ie/2021/03/you-wouldnt-exist-without-europe-the-phenomenon-of-erasmus-babies/",
      category: "Education",
      featured: false,
    },
    {
      title: "Target Tech - Open Source Fund",
      description:
        "Target's initiative to fund and support open source projects and developers.",
      url: "https://tech.target.com/blog/open-source-fund",
      category: "Technology",
      featured: false,
    },
    {
      title: "Jacobian - Breaking Down Tasks",
      description:
        "Blog post about effective task management and breaking down complex projects into manageable pieces.",
      url: "https://jacobian.org/2024/mar/11/breaking-down-tasks/",
      category: "Productivity",
      featured: false,
    },
    {
      title: "Omar Itani - Create More, Consume Less",
      description:
        "Blog post about the philosophy of creating more content and consuming less media.",
      url: "https://www.omaritani.com/blog/create-more-consume-less",
      category: "Productivity",
      featured: false,
    },
    {
      title: "WSJ - Ultra-Processed Food and Brain Health",
      description:
        "Wall Street Journal article about the impact of ultra-processed foods on brain health and cognitive function.",
      url: "https://www.wsj.com/health/wellness/ultra-processed-food-brain-health-7a3f9827",
      category: "Health",
      featured: false,
    },
    {
      title: "Ars Technica - Broadcom VMware Changes",
      description:
        "Article about Broadcom CEO admitting that VMware changes have caused unease among customers and partners.",
      url: "https://arstechnica.com/information-technology/2024/03/broadcom-ceo-admits-vmware-changes-have-brought-unease-to-customers-partners/",
      category: "Technology",
      featured: false,
    },
    {
      title: "CNN - VW Scout American Electric SUVs",
      description:
        "CNN article about Volkswagen's Scout brand and their plans for American electric SUVs.",
      url: "https://edition.cnn.com/2024/03/17/cars/vw-scout-american-electric-suvs/index.html",
      category: "Automotive",
      featured: false,
    },
    {
      title: "The Atlantic - Computing College CS Majors",
      description:
        "Article about the state of computer science education and the challenges facing CS majors in college.",
      url: "https://www.theatlantic.com/technology/archive/2024/03/computing-college-cs-majors/677792/",
      category: "Education",
      featured: false,
    },
    {
      title: "Forbes - Feds Ordered Google to Unmask YouTube Users",
      description:
        "Forbes article about federal orders requiring Google to unmask certain YouTube users, raising privacy concerns.",
      url: "https://www.forbes.com/sites/thomasbrewster/2024/03/22/feds-ordered-google-to-unmask-certain-youtube-users-critics-say-its-terrifying/",
      category: "Privacy",
      featured: false,
    },
    {
      title: "The Turn Signal Blog - Apple's Risky Bet on CarPlay",
      description:
        "Analysis of Apple's strategy with CarPlay and the risks involved in their automotive software approach.",
      url: "https://www.theturnsignalblog.com/apples-risky-bet-on-carplay/",
      category: "Technology",
      featured: false,
    },
    {
      title: "1001 Albums Generator",
      description:
        "Random album generator that suggests albums from the 1001 Albums You Must Hear Before You Die list.",
      url: "https://1001albumsgenerator.com/",
      category: "Music",
      featured: false,
    },
    {
      title: "Abandoned Upstate Gallery",
      description:
        "Photography gallery showcasing abandoned buildings and locations in Upstate New York.",
      url: "https://abandonedupstate.com/gallery",
      category: "Photography",
      featured: false,
    },
    {
      title: "KRLD.pl",
      description: "Polish radio station website and online platform.",
      url: "https://krld.pl/krldpl/home.php",
      category: "Media",
      featured: false,
    },
    {
      title: "PlatesMania",
      description:
        "Database and community for license plate enthusiasts and collectors.",
      url: "https://platesmania.com/",
      category: "Hobby",
      featured: false,
    },
    {
      title: "Experience Europe - Burano",
      description:
        "Article about Burano, the most colorful island in Italy, known for its vibrant houses and lace-making tradition.",
      url: "https://experienceeurope.eu/burano-the-most-colorful-island-in-italy/",
      category: "Travel",
      featured: false,
    },
    {
      title: "Lonely Planet Shop",
      description:
        "Official online store for Lonely Planet travel guides and merchandise.",
      url: "https://shop.lonelyplanet.com/",
      category: "Travel",
      featured: false,
    },
    {
      title: "Rent a Trabant Budapest",
      description:
        "Service for renting Trabant cars in Budapest, offering vintage East German automobile experiences.",
      url: "https://rentatrabantbudapest.com/",
      category: "Travel",
      featured: false,
    },
    {
      title: "The Telegraph - Czech billionaire buys Royal Mail",
      description:
        "Business article about Royal Mail considering a £3.5 billion takeover offer.",
      url: "https://www.telegraph.co.uk/business/2024/05/15/royal-mail-minded-to-accept-35bn-takeover-offer/",
      category: "Business",
      featured: false,
    },
    {
      title: "Slate - Citicorp Tower Design Flaw",
      description:
        "Article about the critical design flaw in the Citicorp Tower that could have caused the skyscraper to collapse.",
      url: "https://www.slate.com/blogs/the_eye/2014/04/17/the_citicorp_tower_design_flaw_that_could_have_wiped_out_the_skyscraper.html",
      category: "Engineering",
      featured: false,
    },
    {
      title: "Atlas Obscura - Sewers of Toronto",
      description:
        "Exploration of Toronto's underground sewer system and its historical significance.",
      url: "https://www.atlasobscura.com/places/sewers-of-toronto",
      category: "Urban Exploration",
      featured: false,
    },
    {
      title: "WSJ - The head of Norway's soverign wealth fund runs a podcast",
      description:
        "Nicolai Tangen manages Norway's $1.6 trillion investment fund & runs a podcast where he interviews the executives of the companies Norway is invested in.",
      url: "https://www.wsj.com/business/the-podcast-host-who-also-manages-a-1-6-trillion-investment-fund-e7eef35f",
      category: "Business",
      featured: false,
    },
    {
      title: "Monkeys and Mountains - Budapest Tram 2",
      description:
        "Article about Budapest's Tram 2, considered Europe's most scenic tram journey.",
      url: "https://monkeysandmountains.com/budapest-tram-2-europes-scenic-tram-journey/",
      category: "Travel",
      featured: false,
    },
    {
      title: "Atlas Obscura - Holy Right Hand of St. Stephen",
      description:
        "Article about the preserved right hand of St. Stephen, Hungary's first king and patron saint.",
      url: "https://www.atlasobscura.com/places/holy-right-hand-st-stephen",
      category: "Religion",
      featured: false,
    },
    {
      title: "Travelifesto",
      description:
        "Travel blog and resource for travel planning and inspiration.",
      url: "https://travelifesto.com/",
      category: "Travel",
      featured: false,
    },
    {
      title: "Earth Trekkers",
      description:
        "Family travel blog sharing experiences and tips for traveling with children.",
      url: "https://www.earthtrekkers.com/",
      category: "Travel",
      featured: false,
    },
    {
      title: "Plonkit.net Guide",
      description:
        "Online guide and resource for various topics and interests.",
      url: "https://www.plonkit.net/guide",
      category: "Reference",
      featured: false,
    },
    {
      title: "Photography Life - Photography Basics",
      description:
        "Comprehensive guide to photography fundamentals and techniques for beginners.",
      url: "https://photographylife.com/photography-basics",
      category: "Photography",
      featured: false,
    },
    {
      title: "The Telegraph - Poland's Tusk Line Defences",
      description:
        "Article about Poland unveiling new defensive lines to protect Europe, named after Prime Minister Donald Tusk.",
      url: "https://www.telegraph.co.uk/world-news/2024/05/27/poland-unveils-tusk-line-defences-to-protect-europe/",
      category: "International Relations",
      featured: false,
    },
    {
      title: "Stuff NZ - The Liberator",
      description:
        "Story of how one man's 15,000 pest fish changed New Zealand's waterways and ecosystem.",
      url: "https://www.stuff.co.nz/national/118845051/the-liberator-how-one-mans-15000-pest-fish-changed-new-zealands-waterways",
      category: "Environment",
      featured: false,
    },
    {
      title: "TechSci Research - France Automotive Loan Market",
      description:
        "Market research report on France's automotive loan industry and financing trends.",
      url: "https://www.techsciresearch.com/report/france-automotive-loan-market/14618.html",
      category: "Business",
      featured: false,
    },
    {
      title: "DOCOMOMO US - John Deere World Headquarters",
      description:
        "Documentation of the John Deere World Headquarters, a significant example of modernist architecture.",
      url: "https://www.docomomo-us.org/register/john-deere-world-headquarters",
      category: "Architecture",
      featured: false,
    },
    {
      title: "CNBC - Poland Paths of Glory",
      description:
        "2013 article analyzing Poland's economic and political trajectory, titled 'Paths of Glory or Roads to Perdition'.",
      url: "https://www.cnbc.com/2013/11/15/poland-paths-of-glory-or-roads-to-perdition.html",
      category: "Economics",
      featured: false,
    },
    {
      title: "EU Enlargement Policy",
      description:
        "Official European Union overview of enlargement policy and pre-accession assistance instruments.",
      url: "https://enlargement.ec.europa.eu/enlargement-policy/overview-instrument-pre-accession-assistance_en",
      category: "European Politics",
      featured: false,
    },
    {
      title: "Cloudflare - Lava Lamp Encryption",
      description:
        "Article explaining how Cloudflare uses lava lamps for entropy generation in their encryption systems.",
      url: "https://www.cloudflare.com/learning/ssl/lava-lamp-encryption/",
      category: "Technology",
      featured: false,
    },
    {
      title: "Canadian Encyclopedia - Prohibition",
      description:
        "Comprehensive article about the prohibition era in Canada and its impact on society.",
      url: "https://www.thecanadianencyclopedia.ca/en/article/prohibition",
      category: "Canadian History",
      featured: false,
    },
    {
      title: "Quartz - Google's True Origin",
      description:
        "Article revealing Google's connections to CIA and NSA research grants for mass surveillance technology.",
      url: "https://qz.com/1145669/googles-true-origin-partly-lies-in-cia-and-nsa-research-grants-for-mass-surveillance",
      category: "Technology",
      featured: false,
    },
    {
      title: "AP News - Argentina NATO F-16s",
      description:
        "Associated Press article about Argentina's President Milei and NATO F-16 fighter jets.",
      url: "https://apnews.com/article/president-milei-argentina-nato-f16s-military-bf56ef4b18646438500c921250c66e93",
      category: "International Relations",
      featured: false,
    },
    {
      title: "Nintendo PlayStation",
      description:
        "PlayStation Wiki article about the cancelled Nintendo PlayStation console collaboration between Nintendo and Sony.",
      url: "https://playstation.fandom.com/wiki/Nintendo_PlayStation",
      category: "Gaming",
      featured: false,
    },
    {
      title: "XDA Developers - Android Private Compute Core",
      description:
        "Explanation of Android's Private Compute Core and its role in privacy and machine learning.",
      url: "https://www.xda-developers.com/android-private-compute-core-explanation/",
      category: "Technology",
      featured: false,
    },
    {
      title: "AppleInsider - Intel Lost Mobile Chip Business",
      description:
        "Article about how Intel lost the mobile chip business to Apple's ARM-based processors.",
      url: "https://appleinsider.com/articles/15/01/19/how-intel-lost-the-mobile-chip-business-to-apples-ax-arm-application-processors",
      category: "Technology",
      featured: false,
    },
    {
      title: "The Verge - Apple Intel 5G Modems",
      description:
        "Article about Apple's acquisition of Intel's 5G smartphone modem business.",
      url: "https://www.theverge.com/2019/7/25/8909671/apple-intel-5g-smartphone-modems-acquisition",
      category: "Technology",
      featured: false,
    },
    {
      title: "Politico - Bidzina Ivanishvili Georgia Election",
      description:
        "Analysis of Georgian billionaire Bidzina Ivanishvili's influence on the 2024 elections and his role in Georgian politics.",
      url: "https://www.politico.eu/article/bidzina-ivanishvili-georgia-election-2024/",
      category: "Politics",
      featured: false,
    },
    {
      title:
        "The Register - Russian Court Fines Google twenty decillion dollars",
      description:
        "That's about 180 quadrillion times the global GDP of $110 trillion",
      url: "https://www.theregister.com/2024/10/29/russian_court_fines_google/",
      category: "Technology",
      featured: false,
    },
  ],
  health: [
    {
      title: "Guarana",
      description:
        "Wikipedia article on the climbing plant native to the Amazon basin, known for its stimulant properties.",
      url: "https://en.wikipedia.org/wiki/Guarana",
    },
    {
      title: "Epicurious",
      description:
        "An online resource for recipes, cooking tips, and food-related articles.",
      url: "https://www.epicurious.com/",
    },
    {
      title: "DAREBEE",
      description:
        "A resource for at-home fitness with a large collection of workouts and programs.",
      url: "https://darebee.com/",
    },
    {
      title: "Healthy Recipes Blogs",
      description:
        "A blog featuring a collection of healthy recipes for various dietary needs.",
      url: "https://healthyrecipesblogs.com/",
    },
    {
      title: "Overrelying on navigation apps might affect your brain",
      description:
        "Article suggesting Google Maps use could reduce spatial memory-related grey matter due to outsourcing navigation.",
      url: "https://www.washingtonpost.com/news/the-switch/wp/2016/03/31/using-google-maps-may-reduce-the-amount-of-grey-matter-in-your-brain/",
    },
    {
      title:
        "Walking more than 10,000 steps daily lowers mortality risk in prediabetes and diabetes",
      description:
        "Study showing walking more than 10,000 steps daily lowers mortality risk in prediabetes and diabetes (inferred from URL).",
      url: "https://www.healio.com/news/endocrinology/20220908/walking-more-than-10000-steps-daily-reduces-mortality-risk-in-prediabetes-and-diabetes",
    },
    {
      title: "Ultra-processed food",
      description:
        "Encyclopedic overview of industrially formulated foods linked to negative health outcomes.",
      url: "https://en.wikipedia.org/wiki/Ultra-processed_food",
    },
    {
      title: "Obesity in Mexico",
      description:
        "Details prevalence and drivers of obesity in Mexico and its public health impact.",
      url: "https://en.wikipedia.org/wiki/Obesity_in_Mexico",
    },
    {
      title: "List of countries by obesity rate",
      description:
        "Comparison of nations based on obesity prevalence in their populations.",
      url: "https://en.wikipedia.org/wiki/List_of_countries_by_obesity_rate",
    },
    {
      title: "MyFitnessPal",
      description:
        "Track your nutrition and fitness goals with the world's largest nutrition and calorie database.",
      url: "https://myfitnesspal.com",
      category: "Fitness",
      featured: false,
    },
    {
      title: "Abs Exercises Chart",
      description:
        "Comprehensive chart of abdominal exercises with clear illustrations and instructions.",
      url: "https://darebee.com/images/guides/ab-exercises-chart.jpg",
      category: "Fitness",
      featured: false,
    },
  ],
  travel: [
    {
      title: "A quick guide to Beirut's best neighbourhoods",
      description:
        "A Lonely Planet article providing an overview of the different neighborhoods in Beirut.",
      url: "https://www.lonelyplanet.com/articles/quick-guide-beiruts-best-neighbourhoods",
    },
    {
      title: "CoolWorks",
      description:
        "A job search website specializing in seasonal and outdoor opportunities in 'great places.'",
      url: "https://www.coolworks.com/",
    },
    {
      title: "Friendliest city in Brazil",
      description:
        "Travel blog post highlighting Belo Horizonte’s reputation for friendliness.",
      url: "https://jasondanielshaw.com/blog/the-friendliest-city-in-brazil-belo-horizonte",
    },
    {
      title: "Workaway",
      description:
        "Platform connecting travelers with hosts for cultural exchange, work in exchange for food and lodging.",
      url: "https://www.workaway.info/",
    },
    {
      title: "Roam like at home (EU Parliament)",
      description:
        "EU policy ending roaming fees for mobile use while traveling within member states.",
      url: "https://www.europarl.europa.eu/topics/en/article/20211015STO15005/roam-like-at-home-no-roaming-charges-for-travel-in-eu",
    },
    {
      title: "US citizens can visit many countries with varying visa rules",
      description:
        "Passport strength and entry requirements are tabulated to show where Americans need visas, can get visa-free access, or must preclear.",
      url: "https://en.wikipedia.org/wiki/Visa_requirements_for_United_States_citizens",
    },
    {
      title: "Euro-style group dinners to meet strangers",
      description:
        "Algorithm matches five strangers for curated weekly dinners in global cities to create social connections.",
      url: "https://timeleft.com/",
    },
    {
      title: "Wikiexplora hosts 1,300+ documented routes",
      description:
        "User-maintained South American trekking and exploration route wiki started by mountaineers for free, updatable guides.",
      url: "https://wikiexplora.com/",
    },
    {
      title: "Nomad groups connects remote workers",
      description:
        "Aggregates and links communities of digital nomads to help them find each other and coordinate.",
      url: "https://nomad-groups.com/",
    },
    {
      title: "Groups for nomads is an open list of communities",
      description:
        "GitHub repository collecting online and real-world groups for digital nomads to join or follow.",
      url: "https://github.com/rignaneseleo/groups-for-nomads",
    },
    {
      title: "EuroVelo maps long-distance bike routes across Europe",
      description:
        "Network of pan-European cycling routes with planning tools and route details for bike touring.",
      url: "https://en.eurovelo.com/",
    },
    {
      title: "Karl Bushby’s Goliath expedition",
      description:
        "Profile of the ongoing walk attempting to traverse the globe on foot, chronicling Bushby’s progress and challenges.",
      url: "https://www.holidify.com/pages/karl-bushby-goliath-expedition-3686.html",
    },
    {
      title: "Probably robbed in Brazil story",
      description:
        "First-person travel account of a suspected robbery in Brazil and the aftermath on a backpacking trip.",
      url: "https://twocatsbackpack.com/a-funny-thing-happened/probably-robbed-in-brazil/",
    },
    {
      title: "Best places to live as a digital nomad",
      description:
        "Aggregates and ranks cities for remote living based on cost, safety, internet, and lifestyle metrics.",
      url: "https://nomads.com/",
    },
    {
      title: "Revived century-old building in Poland",
      description:
        "Shows the restored 100+ year old tenement called 'Pekin' and how it looks after renovation.",
      url: "https://www.onet.pl/turystyka/szaryburekpl/ponad-100-letnia-kamienica-zyskala-nowy-blask-tak-obecnie-wyglada-pekin/f2f8pq6,30bc1058",
    },
    {
      title: "Havana’s “forbidden” neighborhood",
      description:
        "Vedado is Havana’s unique modern district, blending 1950s American architecture with a lively arts and nightlife scene.",
      url: "https://insightcuba.com/blog/2016/10/21/explore-vedado",
    },
    {
      title: "Lençóis Maranhenses travel guide",
      description:
        "Guide to the sand dunes and seasonal lagoons in Brazil’s Lençóis Maranhenses National Park.",
      url: "https://edition.cnn.com/travel/article/lencois-maranhenses-national-park-sand-dunes-brazil/index.html",
    },
    {
      title: "Shibam, Yemen",
      description:
        "Profile of the earthen skyscraper city and its tourism/cultural significance.",
      url: "https://www.nationalgeographic.com/travel/article/shibam-mud-skyscraper-yemen",
    },
    {
      title: "Adirondack border crossings",
      description:
        "Local reporting on cross-border issues affecting upstate New York towns near Canada.",
      url: "https://www.adirondackexplorer.org/stories/illegal-border-crossings-canada-new-york-overwhelm-towns",
    },
    {
      title: "Wonderful wadis in Oman",
      description:
        "Lonely Planet piece on visiting Oman’s vertical desert wadis and their appeal.",
      url: "https://www.lonelyplanet.com/articles/wonderful-wadis-visiting-omans-vertical-desert",
    },
    {
      title: "Ausable Chasm adventure",
      description:
        "Islands.com feature pitching Ausable Chasm as a hidden outdoor adventure in New York.",
      url: "https://www.islands.com/1709023/ausable-chasm-new-york-grand-canyon-adirondacks-hidden-outdoor-adventure-seekers-playground/",
    },
    {
      title: "Atlas Obscura",
      description:
        "The definitive guide to the world's wondrous and curious places.",
      url: "https://atlasobscura.com",
      category: "Exploration",
      featured: false,
    },
    {
      title: "Advantour - Kyrgyzstan Mountains",
      description:
        "Explore the stunning mountain ranges of Kyrgyzstan, home to some of the most beautiful and remote landscapes in Central Asia.",
      url: "https://www.advantour.com/kyrgyzstan/nature/mountains.htm",
      category: "Nature",
      featured: false,
    },
    {
      title: "All That's Interesting - Cairo, Illinois",
      description:
        "The story of Cairo, Illinois - once a prosperous river town that became a ghost town due to racial tensions and economic decline.",
      url: "https://allthatsinteresting.com/cairo-illinois",
      category: "History",
      featured: false,
    },
    {
      title: "Conde Nast Traveler - World's Largest Desert Island",
      description:
        "Fascinating story about the world's largest desert island, located in Canada, showcasing the country's diverse and often surprising geography.",
      url: "https://www.cntraveler.com/stories/2016-03-04/the-worlds-largest-desert-island-is-in-canada",
      category: "Geography",
      featured: false,
    },
    {
      title: "GoodWorkCafes",
      description:
        "Platform for finding and reviewing cafes and workspaces around the world, perfect for digital nomads and remote workers.",
      url: "https://goodworkcafes.com/",
      category: "Remote Work",
      featured: false,
    },
  ],
  random: [
    {
      title: "Galton–Watson process",
      description:
        "Wikipedia article on a branching stochastic process used to model population growth and extinction.",
      url: "https://en.wikipedia.org/wiki/Galton%E2%80%93Watson_process",
    },
    {
      title: "freemediaheckyeah",
      description:
        "A comprehensive collection of free online resources for media, software, and educational content.",
      url: "https://fmhy.net/",
    },
    {
      title: "Wimpy",
      description:
        "A French Wikipedia article about J. Wellington Wimpy, the hamburger-loving character from the Popeye comics.",
      url: "https://fr.wikipedia.org/wiki/Wimpy",
    },
    {
      title: "MemeNöme",
      description:
        "The official website for a meme-based cryptocurrency and its ecosystem.",
      url: "https://www.memenome.com/",
    },
    {
      title: "Tom Scott's newsletter",
      description: "A weekly newsletter from Tom Scott",
      url: "https://www.tomscott.com/newsletter/",
    },
    {
      title: "Simon Vreman’s website",
      description:
        "Homepage of Simon Vreman, featuring personal projects and collections.",
      url: "https://mg.simonvreman.nl/",
    },
    {
      title: "Nomad Table",
      description:
        "Platform for sharing and discovering coworking and cafe-friendly work spots.",
      url: "https://nomadtable.app/",
    },
    {
      title: "US license plates collection – Simon Vreman",
      description:
        "Visual collection of U.S. license plates by state and year.",
      url: "https://mg.simonvreman.nl/us-license-plates",
    },
    {
      title: "MDE Community",
      description:
        "Online community hub for social events in Medellín, Colombia",
      url: "https://www.mdecommunity.com/",
    },
    {
      title: "Gamma",
      description:
        "Web-based tool for creating interactive presentations and documents.",
      url: "https://gamma.app/",
    },
    {
      title: "Velo Planner",
      description: "Cycling route planner and training tool for cyclists.",
      url: "https://veloplanner.com/",
    },
    {
      title: "Time-left dinners match five strangers weekly",
      description:
        "Platform that organizes Wednesday dinners using personality algorithms to connect people over meals.",
      url: "https://timeleft.com/",
    },
    {
      title: "Secure knot shoelace technique",
      description:
        "Detailed practical guide to tying a shoelace knot that won’t slip, with variations and physics explanation.",
      url: "https://www.fieggen.com/shoelace/secureknot.htm",
    },
    {
      title: "Itaipu Dam",
      description:
        "One of the largest hydroelectric dams straddling Paraguay and Brazil, generating massive power.",
      url: "https://en.wikipedia.org/wiki/Itaipu_Dam",
    },
    {
      title: "Titushky",
      description:
        "Term for pro-government street enforcers or provocateurs used in Ukrainian contexts.",
      url: "https://en.wikipedia.org/wiki/Titushky",
    },
    {
      title:
        "Kamala Harris was the acting U.S. president for 1 hour and 25 minutes",
      description:
        "Harris was briefly first woman to be acting U.S. president as Biden underwent colonoscopy",
      url: "https://www.reuters.com/world/us/biden-transfer-power-harris-during-colonoscopy-friday-white-house-2021-11-19/",
    },
    {
      title: "Terence McKenna",
      description:
        "Writer and ethnobotanist known for unconventional theories on psychedelics and consciousness.",
      url: "https://en.wikipedia.org/wiki/Terence_McKenna",
    },
    {
      title: "Codasur Rally Championship",
      description:
        "South American rally series with events across multiple countries.",
      url: "https://en.wikipedia.org/wiki/Codasur_South_American_Rally_Championship",
    },
    {
      title: "World Rally Championship Rallies",
      description:
        "List of rallies that comprise the World Rally Championship, with locations and historical data.",
      url: "https://en.wikipedia.org/wiki/List_of_World_Rally_Championship_rallies",
    },
    {
      title: "Yahoo Answers",
      description:
        "Community Q&A site (now defunct) where users asked and answered arbitrary questions.",
      url: "https://en.wikipedia.org/wiki/Yahoo_Answers",
    },
    {
      title: "Atlas Obscura",
      description:
        "The definitive guide to the world's wondrous and curious places.",
      url: "https://atlasobscura.com",
      category: "Travel",
      featured: false,
    },
    {
      title: "Color Name",
      description:
        "Find the perfect name for any color with this comprehensive color naming tool.",
      url: "https://www.color-name.com/",
      category: "Design",
      featured: false,
    },
    {
      title: "Archive.org - BeOS Bible",
      description:
        "Complete documentation for BeOS, the innovative operating system that was ahead of its time.",
      url: "https://archive.org/details/the-beos-bible/mode/1up",
      category: "Computing",
      featured: false,
    },
    {
      title: "Google Waze Partners",
      description:
        "How Waze Beacons work - battery-operated, low-energy micro-controllers installed in tunnels where GPS signal is lost. They send one-way signals to enable continuous routing and traffic data collection underground. Other navigation apps can use this technology for free.",
      url: "https://support.google.com/waze/partners/answer/9416071?hl=en",
      category: "Technology",
      featured: false,
    },
    {
      title: "BBC News - UK Article",
      description: "BBC coverage of UK news and current events.",
      url: "https://www.bbc.com/news/uk-39881236",
      category: "News",
      featured: false,
    },

    {
      title: "Manjarno",
      description:
        "Why not to use Manjaro - information about the issues and concerns with the Manjaro Linux distribution.",
      url: "https://manjarno.pages.dev/",
      category: "Software",
      featured: false,
    },
    {
      title: "Aldi Price Map",
      description:
        "Interactive map showing Aldi store locations and prices for Granny Smith apples across Washington state.",
      url: "https://www.aldipricemap.com/washington_granny_smith_apples.html",
      category: "Data Visualization",
      featured: false,
    },
    {
      title: "Chevy Old Car Manual Project",
      description:
        "Archive of vintage Chevrolet car manuals and documentation from the early automotive era.",
      url: "https://chevy.oldcarmanualproject.com/",
      category: "Automotive History",
      featured: false,
    },
    {
      title: "City Street Orientations",
      description:
        "Fascinating analysis of street grid patterns across cities worldwide, revealing how urban planning varies by culture and geography.",
      url: "https://geoffboeing.com/2018/07/city-street-orientations-world/",
      category: "Urban Planning",
      featured: false,
    },
    {
      title: "FRB Services - Mutilated Currency",
      description:
        "Federal Reserve guide on how to exchange damaged or mutilated US currency and coins.",
      url: "https://www.frbservices.org/resources/financial-services/cash/exception-processing/mutilated-currency-coin.html#:~:text=Under%20regulations%20issued%20by%20the,United%20States%20currency%20is%20present.",
      category: "Finance",
      featured: false,
    },
    {
      title: "OEC World",
      description:
        "Observatory of Economic Complexity - interactive data visualization of global trade and economic relationships.",
      url: "https://oec.world/en",
      category: "Economics",
      featured: false,
    },
    {
      title: "Medium - Neutral Colors",
      description:
        "Design guide exploring the psychology and use of neutral colors in modern design.",
      url: "https://medium.com/design-bootcamp/neutral-colors-1fc82ea81c71",
      category: "Design",
      featured: false,
    },
    {
      title: "Neal.fun Password Game",
      description:
        "Interactive puzzle game that creates increasingly complex password requirements as you play.",
      url: "https://neal.fun/password-game/",
      category: "Games",
      featured: false,
    },
    {
      title: "VT Digital Library",
      description:
        "To zone or not to zone? Comparing European and American Land-use Regulation - academic paper analyzing differences in land-use regulation between European and American approaches.",
      url: "https://vtechworks.lib.vt.edu/server/api/core/bitstreams/e839a08b-6564-48c5-893d-2447d010e50d/content",
      category: "Academic",
      featured: false,
    },
    {
      title: "Villa 31",
      description:
        "Informal settlement in Buenos Aires, Argentina, one of the largest slums in the city.",
      url: "https://en.wikipedia.org/wiki/Villa_31",
      category: "Urban Development",
      featured: false,
    },
    {
      title: "Atlas Obscura",
      description:
        "The definitive guide to the world's wondrous and curious places.",
      url: "https://www.atlasobscura.com/",
      category: "Travel",
      featured: false,
    },
    {
      title: "ntfy.sh",
      description:
        "Simple HTTP-based pub-sub notification service for sending messages to your phone or desktop.",
      url: "https://ntfy.sh/",
      category: "Technology",
      featured: false,
    },
    {
      title: "MundoLingo",
      description:
        "Language exchange platform connecting people worldwide for language learning and cultural exchange.",
      url: "https://mundolingo.org/",
      category: "Education",
      featured: false,
    },
    {
      title: "Are We Libad Waitayet",
      description:
        "Website with unknown content, appears to be a personal or experimental project.",
      url: "https://arewelibadwaitayet.com/",
      category: "Miscellaneous",
      featured: false,
    },
    {
      title: "Churning.io",
      description:
        "Platform for credit card churning strategies and maximizing credit card rewards.",
      url: "https://churning.io/",
      category: "Finance",
      featured: false,
    },
    {
      title: "Doctor of Credit",
      description:
        "Comprehensive resource for credit card deals, bank account bonuses, and financial strategies.",
      url: "https://www.doctorofcredit.com/",
      category: "Finance",
      featured: false,
    },
    {
      title: "Sam's Club Exit Arches",
      description:
        "Explanation of how Sam's Club exit arches work for theft prevention and inventory management.",
      url: "https://www.samsclub.com/content/exit",
      category: "Technology",
      featured: false,
    },
    {
      title: "FlyerTalk",
      description:
        "Online community and forum for frequent flyers, travel enthusiasts, and loyalty program members.",
      url: "https://www.flyertalk.com/",
      category: "Travel",
      featured: false,
    },
    {
      title: "Unclaimed.org",
      description:
        "Official website for finding and claiming unclaimed money and property held by state governments.",
      url: "https://unclaimed.org/",
      category: "Finance",
      featured: false,
    },
    {
      title: "Chips and Cheese",
      description:
        "Blog focused on computer architecture, microprocessors, and semiconductor technology analysis.",
      url: "https://chipsandcheese.com/",
      category: "Technology",
      featured: false,
    },
    {
      title: "Open Food Facts",
      description:
        "Open database of food products with nutritional information, ingredients, and environmental impact data.",
      url: "https://us.openfoodfacts.org/",
      category: "Health",
      featured: false,
    },
  ],
  history: [
    {
      title: "Novgorod Republic",
      description:
        "Wikipedia article on the medieval state that existed from the 12th to 15th centuries in northern Russia.",
      url: "https://en.wikipedia.org/wiki/Novgorod_Republic",
    },
    {
      title: "Brazilians in Japan",
      description:
        "Wikipedia article about the significant community of Brazilians of Japanese descent living in Japan.",
      url: "https://en.wikipedia.org/wiki/Brazilians_in_Japan",
    },
    {
      title: "Mali Empire",
      description:
        "Wikipedia article on the West African empire that flourished from c. 1226 to 1610.",
      url: "https://en.wikipedia.org/wiki/Mali_Empire",
    },
    {
      title: "Green Ukraine",
      description:
        "Wikipedia article about the historical Ukrainian name for a region in the Russian Far East with a significant Ukrainian population.",
      url: "https://en.wikipedia.org/wiki/Green_Ukraine",
    },
    {
      title: "Government reform of Peter the Great",
      description:
        "Wikipedia article about the sweeping reforms introduced by Peter the Great to modernize Russia.",
      url: "https://en.wikipedia.org/wiki/Government_reform_of_Peter_the_Great",
    },
    {
      title: "Fortifications of the Russian invasion of Ukraine",
      description:
        "Wikipedia article detailing the extensive fortifications built by both sides during the Russian invasion of Ukraine.",
      url: "https://en.wikipedia.org/wiki/Fortifications_of_the_Russian_invasion_of_Ukraine",
    },
    {
      title: "Persepolis",
      description:
        "Wikipedia article on the ceremonial capital of the Achaemenid Empire.",
      url: "https://en.wikipedia.org/wiki/Persepolis",
    },
    {
      title: "Etruscan alphabet",
      description:
        "Wikipedia article about the ancient script used by the Etruscans in central and northern Italy.",
      url: "https://en.wikipedia.org/wiki/Etruscan_alphabet",
    },
    {
      title: "December 2001 crisis in Argentina",
      description:
        "A Spanish Wikipedia article detailing the political and economic crisis in Argentina in December 2001.",
      url: "https://es.wikipedia.org/wiki/Crisis_de_diciembre_de_2001_en_Argentina",
    },
    {
      title: "Karelian question",
      description:
        "Wikipedia article explaining the political dispute in Finland regarding territories ceded to the Soviet Union.",
      url: "https://en.wikipedia.org/wiki/Karelian_question",
    },
    {
      title: "Balcerowicz Plan",
      description:
        "Wikipedia article on the 'Shock Therapy' economic plan implemented in Poland to transition to a market economy.",
      url: "https://en.wikipedia.org/wiki/Balcerowicz_Plan",
    },
    {
      title: "History of Tajikistan",
      description:
        "Wikipedia article covering the history of the land and people of Tajikistan.",
      url: "https://en.wikipedia.org/wiki/History_of_Tajikistan",
    },
    {
      title: "Muslim conquest of the Maghreb",
      description:
        "Wikipedia article detailing the Arab conquest of North Africa in the 7th century.",
      url: "https://en.wikipedia.org/wiki/Muslim_conquest_of_the_Maghreb",
    },
    {
      title: "Monroe Doctrine",
      description:
        "Wikipedia article about the United States foreign policy doctrine opposing European colonialism in the Western Hemisphere.",
      url: "https://en.wikipedia.org/wiki/Monroe_Doctrine",
    },
    {
      title: "French Algeria",
      description:
        "A French Wikipedia article about the period of French colonization in Algeria.",
      url: "https://fr.wikipedia.org/wiki/Alg%C3%A9rie_fran%C3%A7aise",
    },
    {
      title: "Harlem Renaissance",
      description:
        "Wikipedia article about the intellectual and cultural revival of African American music, dance, art, fashion, literature, and politics in the 1920s.",
      url: "https://en.wikipedia.org/wiki/Harlem_Renaissance",
    },
    {
      title: "USS Los Angeles (ZR-3)",
      description:
        "Wikipedia article about the rigid airship built in Germany as war reparations and operated by the US Navy.",
      url: "https://en.m.wikipedia.org/wiki/USS_Los_Angeles_(ZR-3)",
    },
    {
      title: "Bulgaria and the euro",
      description:
        "Wikipedia article concerning Bulgaria's adoption of the euro as its currency.",
      url: "https://en.wikipedia.org/wiki/Bulgaria_and_the_euro",
    },
    {
      title: "Soviet children's book on the CCCP (1950s)",
      description:
        "Digitized Soviet-era children's pop-up book from 1950s Russia archived on Internet Archive.",
      url: "https://archive.org/details/cccp1452007popup00fred",
    },
    {
      title: "Afghanistan and Pakistan have been clashing since March 2024",
      description:
        "Ongoing armed skirmishes, cross-border strikes, and militant spillover along their frontier with periodic escalations and partial de-escalations.",
      url: "https://en.wikipedia.org/wiki/Afghanistan%E2%80%93Pakistan_clashes_(2024%E2%80%93present)",
    },
    {
      title: "Ted Kaczynski was the Unabomber and former math prodigy",
      description:
        "Mathematician turned domestic terrorist who conducted a nationwide mail-bombing campaign against technological society and died in 2023 in prison.",
      url: "https://en.wikipedia.org/wiki/Ted_Kaczynski",
    },
    {
      title: "Tall poppy syndrome cuts down high achievers",
      description:
        "Cultural pattern where people who stand out for success are resented or attacked to 'level' status.",
      url: "https://en.wikipedia.org/wiki/Tall_poppy_syndrome",
    },
    {
      title: "Dassler brothers feud created Adidas and Puma",
      description:
        "Sibling rivalry that split their shoe company into two global brands with enduring competition.",
      url: "https://en.wikipedia.org/wiki/Dassler_brothers_feud",
    },
    {
      title:
        "Arrest and indictment of Pavel Durov shook Telegram's founder narrative",
      description:
        "Legal pressure and charges brought against the messaging app founder amid governance and power struggles.",
      url: "https://en.wikipedia.org/wiki/Arrest_and_indictment_of_Pavel_Durov",
    },
    {
      title: "Drug policy of Portugal decriminalized possession in 2001",
      description:
        "Portugal shifted from punitive to health-focused handling of drug use, eliminating criminal penalties for possession.",
      url: "https://en.wikipedia.org/wiki/Drug_policy_of_Portugal", //
    },
    {
      title: "Polski Fiat built Fiats in state-backed Poland",
      description:
        "Licensed production partnership that localized Fiat cars as part of industrial policy.",
      url: "https://en.wikipedia.org/wiki/Polski_Fiat", //
    },
    {
      title: "Yugo was the Yugoslav compact car with a bad rep",
      description:
        "Economy car exported in the 1980s known for low cost and poor reliability.",
      url: "https://en.wikipedia.org/wiki/Yugo", //
    },
    {
      title: "Cahokia was North America’s biggest pre-Columbian city",
      description:
        "Mississippian mound complex near St. Louis with complex urban and ceremonial structure.",
      url: "https://en.wikipedia.org/wiki/Cahokia",
    },
    {
      title: "Sun of May is the national emblem on Argentina/Uruguay flags",
      description:
        "Symbol from independence era representing the May Revolution and regional identity.",
      url: "https://en.wikipedia.org/wiki/Sun_of_May",
    },
    {
      title: "Sestertius was a large Roman bronze coin",
      description:
        "Currency used in the Roman Empire reflecting economic and imperial propaganda.",
      url: "https://en.wikipedia.org/wiki/Sestertius",
    },
    {
      title: "Roman citizenship granted legal identity and rights",
      description:
        "Status that conferred privileges across the empire, evolving over time from exclusive to widespread.",
      url: "https://en.wikipedia.org/wiki/Roman_citizenship",
    },
    {
      title: "Brexit happened",
      description:
        "The UK formally left the EU after a long political struggle and negotiation process.",
      url: "https://en.wikipedia.org/wiki/Brexit",
    },
    {
      title: "Syrian Kurdistan identity",
      description:
        "Region in northern Syria with a Kurdish majority asserting cultural and political distinctiveness.",
      url: "https://en.wikipedia.org/wiki/Syrian_Kurdistan",
    },
    {
      title: "Kurdistan concept",
      description:
        "Territorial and cultural idea of the Kurdish homeland spanning several modern states.",
      url: "https://en.wikipedia.org/wiki/Kurdistan",
    },
    {
      title: "Kurds as people",
      description:
        "Ethnic group with its own language and culture spread across Turkey, Syria, Iraq, and Iran.",
      url: "https://en.wikipedia.org/wiki/Kurds",
    },
    {
      title: "Syria country overview",
      description:
        "Modern Syrian state with its complex history, ethnic mix, and ongoing conflict dynamics.",
      url: "https://en.wikipedia.org/wiki/Syria",
    },
    {
      title: "United Arab Republic experiment",
      description:
        "Short-lived political union between Egypt and Syria in the late 1950s and early 1960s.",
      url: "https://en.wikipedia.org/wiki/United_Arab_Republic",
    },
    {
      title: "Arab Kingdom of Syria",
      description:
        "Brief 1920 monarchy in Syria after Ottoman collapse before French mandate took over.",
      url: "https://en.wikipedia.org/wiki/Arab_Kingdom_of_Syria",
    },
    {
      title: "State of Syria (1920)",
      description:
        "French-protected state established in Syria during the interwar mandate rearrangements.",
      url: "https://en.wikipedia.org/wiki/State_of_Syria",
    },
    {
      title: "Mandate for Syria and Lebanon",
      description:
        "French League of Nations mandate carving out modern Syria and Lebanon after WWI.",
      url: "https://en.wikipedia.org/wiki/Mandate_for_Syria_and_the_Lebanon",
    },
    {
      title: "French Indochina colonial structure",
      description:
        "French-controlled territories in Southeast Asia that preceded modern Vietnam, Laos, and Cambodia.",
      url: "https://en.wikipedia.org/wiki/French_Indochina",
    },
    {
      title: "First Syrian Republic",
      description:
        "Syrian state under French mandate with limited sovereignty before full independence.",
      url: "https://en.wikipedia.org/wiki/First_Syrian_Republic",
    },
    {
      title: "Alawites sect",
      description:
        "Religious minority in Syria with syncretic beliefs that became politically dominant in modern Syrian state.",
      url: "https://en.wikipedia.org/wiki/Alawites",
    },
    {
      title: "Lebanon overview",
      description:
        "Country with complex sectarian makeup, colonial history, and regional geopolitical significance.",
      url: "https://en.wikipedia.org/wiki/Lebanon",
    },
    {
      title: "Russian intervention in Syria",
      description:
        "Russia’s military involvement starting in 2015 that shifted the Syrian civil war balance.",
      url: "https://en.wikipedia.org/wiki/Russian_intervention_in_the_Syrian_civil_war",
    },
    {
      title: "Y Wladfa Welsh colony",
      description:
        "Welsh settlement in Patagonia established to preserve Welsh language and culture abroad.",
      url: "https://en.wikipedia.org/wiki/Y_Wladfa",
    },
    {
      title: "Republic of Ragusa",
      description:
        "Maritime city-state on the Adriatic that maintained independence through diplomacy in the early modern period.",
      url: "https://en.wikipedia.org/wiki/Republic_of_Ragusa",
    },
    {
      title: "American Letter Mail Co.",
      description:
        "Private postal company that challenged the U.S. postal monopoly in the 19th century and spurred reform.",
      url: "https://en.wikipedia.org/wiki/American_Letter_Mail_Company",
    },
    {
      title: "2024 South Korea Martial Law Crisis",
      description:
        "Section detailing the declaration of martial law during South Korea’s 2024 crisis and its political-military implications.",
      url: "https://en.wikipedia.org/wiki/2024_South_Korean_martial_law_crisis#Declaration_of_martial_law",
    },
    {
      title: "Art Deco",
      description:
        "Design movement of the early 20th century characterized by geometric shapes, luxury, and modernism.",
      url: "https://en.wikipedia.org/wiki/Art_Deco",
    },
    {
      title: "NATO Bombing of Yugoslavia",
      description:
        "1999 NATO military campaign against Yugoslavia, its causes, execution, and consequences.",
      url: "https://en.wikipedia.org/wiki/NATO_bombing_of_Yugoslavia",
    },
    {
      title: "Hadrian's Wall History",
      description:
        "History of Hadrian’s Wall as a Roman frontier, its construction and strategic role in Britain.",
      url: "https://www.english-heritage.org.uk/visit/places/hadrians-wall/hadrians-wall-history-and-stories/history/",
    },
    {
      title: "Ghost Dance",
      description:
        "Late 19th-century Native American religious movement aiming to restore ancestral life and resist colonization.",
      url: "https://en.wikipedia.org/wiki/Ghost_Dance",
    },
    {
      title: "Obama Security Incidents",
      description:
        "Compilation of threats, breaches, and security events involving Barack Obama during his presidency.",
      url: "https://en.wikipedia.org/wiki/Security_incidents_involving_Barack_Obama",
    },
    {
      title: "Roaring Twenties",
      description:
        "Cultural and economic era of the 1920s characterized by prosperity and social change.",
      url: "https://en.wikipedia.org/wiki/Roaring_Twenties",
    },
    {
      title: "Confederados",
      description:
        "Post-Civil War Confederate expatriates who settled in Brazil.",
      url: "https://en.wikipedia.org/wiki/Confederados",
    },
    {
      title: "Annexation movements Canada",
      description: "Historical movements advocating U.S. annexation of Canada.",
      url: "https://en.wikipedia.org/wiki/Movements_for_the_annexation_of_Canada_to_the_United_States",
    },
    {
      title: "Niagara Falls peace conference",
      description: "1909 diplomatic resolution of U.S.-Canada border tensions.",
      url: "https://en.wikipedia.org/wiki/Niagara_Falls_peace_conference",
    },
    {
      title: "Irish Times - US Destroyed North Korea",
      description:
        "Unknown to most Americans, the US completely destroyed North Korea during the Korean War, dropping more bombs than in the entire Pacific theater of WWII.",
      url: "https://www.irishtimes.com/news/world/asia-pacific/unknown-to-most-americans-the-us-totally-destroyed-north-korea-once-before-1.3227633",
      category: "Korean War",
      featured: false,
    },
    {
      title: "Washington Post - Soviet Embassy Crisis",
      description:
        "1991 article about the identity crisis faced by Soviet embassies as the USSR was collapsing.",
      url: "https://www.washingtonpost.com/archive/politics/1991/12/20/soviet-embassys-identity-crisis/68d627ee-6a55-434c-9ac1-781a923539a2/",
      category: "Cold War",
      featured: false,
    },
    {
      title: "Folklore.org",
      description:
        "Stories about the development of the original Macintosh computer, told by the people who were there.",
      url: "https://www.folklore.org/0-index.html",
      category: "Computer History",
      featured: false,
    },
    {
      title: "All That's Interesting - Cairo, Illinois",
      description:
        "The story of Cairo, Illinois - once a prosperous river town that became a ghost town due to racial tensions and economic decline.",
      url: "https://allthatsinteresting.com/cairo-illinois",
      category: "American History",
      featured: false,
    },
  ],
  business: [
    {
      title: "Ford CEO on China's EV Progress",
      description:
        "An article detailing Ford CEO Jim Farley's humbling experience observing the advancements of the Chinese EV market.",
      url: "https://www.businessinsider.com/ford-ceo-china-ev-progress-most-humbling-thing-ever-seen-2025-6",
    },
    {
      title: "Lidl, the German supermarket chain",
      description:
        "German supermarket chain focused on low prices through limited assortment and private labels.",
      url: "https://en.wikipedia.org/wiki/Lidl",
    },
    {
      title: "Aldi splits into two discount empires",
      description:
        "German discount supermarket originally one company that now operates as two regional groups emphasizing efficiency and low cost.",
      url: "https://en.wikipedia.org/wiki/Aldi",
    },
    {
      title: "British capital built much of Argentina’s infrastructure",
      description:
        "Tracks how British investment shaped Argentina’s economy and transport networks from the 19th century onward.",
      url: "https://en.wikipedia.org/wiki/British_investment_in_Argentina",
    },
    {
      title: "Apple price comparisons",
      description:
        "Live price tracking and historical reference for Apple hardware to help spot pricing trends and deals.",
      url: "https://prices.appleinsider.com/",
    },
    {
      title: "British investment shaped Argentina",
      description:
        "Tracks how British capital and infrastructure projects influenced Argentina’s economy from the 19th century onward.",
      url: "https://en.wikipedia.org/wiki/British_investment_in_Argentina",
    },
    {
      title: "Chase MyBonus",
      description:
        "Chase Bank dashboard for tracking and redeeming credit card rewards bonuses.",
      url: "https://www.chase.com/mybonus",
    },
    {
      title: "Special economic zones of China",
      description:
        "Chinese regions with economic liberalization to attract investment.",
      url: "https://en.wikipedia.org/wiki/Special_economic_zones_of_China",
    },
    {
      title: "Inc Magazine - Liquid Death",
      description:
        "The story of Liquid Death, the canned water company that became a billion-dollar brand by marketing water like heavy metal.",
      url: "https://www.inc.com/magazine/202210/alex-bhattacharji/liquid-death-2022.html",
      category: "Marketing",
      featured: false,
    },
    {
      title: "Steve Jobs Market Research",
      description:
        "Blog post about Steve Jobs' approach to market research and why he famously didn't believe in focus groups.",
      url: "https://blog.flexmr.net/steve-jobs-market-research",
      category: "Strategy",
      featured: false,
    },
    {
      title: "Global Finance - Romania",
      description:
        "Analysis of Romania's economic potential and investment opportunities in Eastern Europe.",
      url: "https://gfmag.com/data/romania-potential-unlocked/",
      category: "Investment",
      featured: false,
    },
    {
      title: "HoldAll",
      description:
        "Platform for finding remote work opportunities and digital nomad adventures around the world.",
      url: "https://www.holdall.work/",
      category: "Remote Work",
      featured: false,
    },
    {
      title: "Lose the Very",
      description:
        "Minimalist lifestyle platform focused on decluttering and simplifying life through intentional living practices.",
      url: "https://www.losethevery.com/",
      category: "Lifestyle",
      featured: false,
    },
  ],
  geography: [
    {
      title: "Qingdao",
      description:
        "Wikipedia article on the major port city in the eastern Shandong province of China.",
      url: "https://en.wikipedia.org/wiki/Qingdao",
    },
    {
      title: "Grand Ethiopian Renaissance Dam",
      description:
        "Wikipedia article on the large hydroelectric dam on the Blue Nile River in Ethiopia.",
      url: "https://en.wikipedia.org/wiki/Grand_Ethiopian_Renaissance_Dam",
    },
    {
      title: "Migingo Island",
      description:
        "Wikipedia article on the small, densely populated island in Lake Victoria, subject to a territorial dispute between Kenya and Uganda.",
      url: "https://en.wikipedia.org/wiki/Migingo_Island",
    },
    {
      title: "Užupis",
      description:
        "Wikipedia article about the neighborhood in Vilnius, Lithuania, which declared itself an independent republic.",
      url: "https://en.wikipedia.org/wiki/U%C5%BEupis",
    },
    {
      title: "Dune of Pilat",
      description:
        "Wikipedia article about the tallest sand dune in Europe, located in France.",
      url: "https://en.wikipedia.org/wiki/Dune_of_Pilat",
    },
    {
      title: "Geographical distribution of French speakers",
      description:
        "A Wikipedia page detailing the global community of French-speaking peoples.",
      url: "https://en.wikipedia.org/wiki/Geographical_distribution_of_French_speakers",
    },
    {
      title: "Buryatia",
      description:
        "Wikipedia article on the Russian republic of Buryatia, located in Siberia.",
      url: "https://en.wikipedia.org/wiki/Buryatia",
    },
    {
      title: "Food Waste by Country",
      description: "A ranking of countries based on their total food waste.",
      url: "https://worldpopulationreview.com/country-rankings/food-waste-by-country",
    },
    {
      title: "European Kazakhstan",
      description:
        "Wikipedia article about Kazakhstan, a transcontinental country in Central Asia and Eastern Europe.",
      url: "https://en.wikipedia.org/wiki/European_Kazakhstan",
    },
    {
      title: "Republic of Vevčani",
      description:
        "Wikipedia article about the self-proclaimed micronation within North Macedonia.",
      url: "https://en.wikipedia.org/wiki/Republic_of_Vev%C4%8Dani",
    },
    {
      title: "Pamir Mountains are the roof of the world",
      description:
        "High plateau range in Central Asia where several major mountain systems converge, known for extreme elevation and remoteness.",
      url: "https://en.wikipedia.org/wiki/Pamir_Mountains",
    },
    {
      title: "Taiga is the world’s boreal forest belt",
      description:
        "Vast circumpolar coniferous forest biome covering large parts of northern Eurasia and North America.",
      url: "https://en.wikipedia.org/wiki/Taiga",
    },
    {
      title:
        "Yungas is the humid forest transition on the Andes’ eastern slopes",
      description:
        "Ecologically rich cloud and montane forest belt from Peru/Bolivia into northwest Argentina, between high Andes and Amazon.",
      url: "https://en.wikipedia.org/wiki/Yungas",
    },
    {
      title: "Buenos Aires subway network",
      description:
        "Historic metro system in Argentina’s capital, one of the oldest in Latin America with mixed ownership and expansion history.",
      url: "https://en.wikipedia.org/wiki/Buenos_Aires_Underground",
    },
    {
      title: "United States numbered highways",
      description:
        "Grid-based national highway numbering system that predates the Interstate network and structures long-distance U.S. road travel.",
      url: "https://en.wikipedia.org/wiki/United_States_Numbered_Highway_System",
    },
    {
      title: "Metra commuter rail in Chicago area",
      description:
        "Regional commuter rail system serving the Chicago metropolitan area with multiple lines feeding downtown.",
      url: "https://en.wikipedia.org/wiki/Metra",
    },
    {
      title: "Cahokia was the largest pre-Columbian city north of Mexico",
      description:
        "Mississippian mound-building urban center near modern St. Louis with complex social and ceremonial infrastructure.",
      url: "https://en.wikipedia.org/wiki/Cahokia",
    },
    {
      title: "Colombian coffee axis",
      description:
        "UNESCO-listed coffee-growing region in Colombia defined by its cultural landscape.",
      url: "https://en.wikipedia.org/wiki/Colombian_coffee_growing_axis",
    },
    {
      title: "Mercosur License Plates",
      description:
        "Overview of the unified vehicle registration plate system for Mercosur member countries.",
      url: "https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_the_Mercosur",
    },
    {
      title: "Turtle Island (Lake Erie)",
      description:
        "Entry about Turtle Island in Lake Erie, its geography and cultural/historical context.",
      url: "https://en.wikipedia.org/wiki/Turtle_Island_(Lake_Erie)",
    },
    {
      title: "Fort Ross, California",
      description:
        "History of the Russian colonial outpost in California, its founding and legacy.",
      url: "https://en.wikipedia.org/wiki/Fort_Ross,_California",
    },
    {
      title: "Hallstatt",
      description:
        "Austrian town known for its archaeological heritage and picturesque alpine cultural identity.",
      url: "https://en.wikipedia.org/wiki/Hallstatt",
    },
    {
      title: "Mohegan Bluffs",
      description:
        "Scenic coastal cliffs on Block Island noted for their height and geological formation.",
      url: "https://en.wikipedia.org/wiki/Mohegan_Bluffs",
    },
    {
      title: "Nova Petrópolis",
      description:
        "Brazilian city with strong German heritage, known for its gardens, architecture, and cultural tourism.",
      url: "https://en.wikipedia.org/wiki/Nova_Petr%C3%B3polis",
    },
    {
      title: "Pomerode",
      description:
        "City in Brazil celebrated as the most German town in the country for its preserved language and architecture.",
      url: "https://en.wikipedia.org/wiki/Pomerode",
    },
    {
      title: "Bayou",
      description:
        "Slow-moving wetland waterbody typical of the southeastern United States.",
      url: "https://en.wikipedia.org/wiki/Bayou",
    },
    {
      title: "Derinkuyu underground city",
      description:
        "Extensive ancient subterranean refuge system in Cappadocia, Turkey.",
      url: "https://en.wikipedia.org/wiki/Derinkuyu_underground_city",
    },
    {
      title: "Advantour - Kyrgyzstan Mountains",
      description:
        "Explore the stunning mountain ranges of Kyrgyzstan, home to some of the most beautiful and remote landscapes in Central Asia.",
      url: "https://www.advantour.com/kyrgyzstan/nature/mountains.htm",
      category: "Nature",
      featured: false,
    },
    {
      title: "Conde Nast Traveler - Montreal",
      description:
        "Fascinating story about how Montreal is actually much older than Canada itself.",
      url: "https://www.cntraveler.com/story/montreal-is-actually-much-older-than-canada",
      category: "Cities",
      featured: false,
    },
    {
      title: "City Street Orientations",
      description:
        "Fascinating analysis of street grid patterns across cities worldwide, revealing how urban planning varies by culture and geography.",
      url: "https://geoffboeing.com/2018/07/city-street-orientations-world/",
      category: "Urban Planning",
      featured: false,
    },
  ],
  technology: [
    {
      title: "Goodpods",
      description:
        "A podcast app and discovery platform focused on social recommendations from friends.",
      url: "https://goodpods.com/",
    },
    {
      title: "Ice",
      description:
        "A menu bar manager for macOS that allows you to hide and organize menu bar items.",
      url: "https://icemenubar.app/",
    },
    {
      title: "TV Garden",
      description:
        "A video player that allows users to watch global and live TV online using their own streaming links.",
      url: "https://tv.garden/",
    },
    {
      title: "DisplaySpecifications",
      description:
        "A comprehensive database of specifications for monitors and TVs.",
      url: "https://www.displayspecifications.com/en",
    },
    {
      title: "Google Labs",
      description:
        "A platform to test and provide feedback on early-stage Google Search experiments.",
      url: "https://labs.google/",
    },
    {
      title: "Wikipedia: Signs of AI writing",
      description:
        "A Wikipedia page discussing the signs of AI writing on the platform.",
      url: "https://en.m.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing",
    },
    {
      title: "Mystery",
      description:
        "A tool from Knight Lab to help journalists analyze social network data.",
      url: "https://mystery.knightlab.com/",
    },
    {
      title: "Asus shifts production",
      description:
        "Report on Asus moving most PC and motherboard manufacturing out of China to Southeast Asia.",
      url: "https://www.tomshardware.com/tech-industry/asus-says-90-percent-of-pc-and-motherboard-production-has-been-offshored-from-china-to-blunt-tariffs-manufacturing-moved-to-thailand-vietnam-and-indonesia",
    },
    {
      title: "Coverage Map",
      description:
        "Tool for checking and comparing mobile network coverage worldwide.",
      url: "https://coveragemap.com/",
    },
    {
      title: "Geo Companion",
      description:
        "Interactive tool for learning geography through map quizzes and challenges.",
      url: "https://geocompanion.vercel.app/",
    },
    {
      title: "Geohints",
      description:
        "Website offering visual hints and tips for identifying locations in GeoGuessr.",
      url: "https://geohints.com/",
    },
    {
      title: "Chainalysis Global Crypto Adoption Index 2024",
      description:
        "Annual Chainalysis report ranking countries by cryptocurrency adoption.",
      url: "https://www.chainalysis.com/blog/2024-global-crypto-adoption-index/",
    },
    {
      title: "Travle",
      description:
        "Online geography game where players guess countries by their borders and clues.",
      url: "https://travle.earth/",
    },
    {
      title: "GeoGrid Game",
      description:
        "Puzzle game where players arrange country tiles correctly on a map.",
      url: "https://www.geogridgame.com/",
    },
    {
      title: "DARPA wireless power record – New Atlas",
      description:
        "Report on DARPA’s achievement in transmitting power wirelessly over record distances.",
      url: "https://newatlas.com/military/darpa-sets-new-records-sending-power-without-wires/",
    },
    {
      title: "Weatherspark",
      description:
        "Interactive climate-and-weather tool offering detailed charts by month, day or hour for planning and analysis.",
      url: "https://weatherspark.com/",
    },
    {
      title: "Roland TR-808 defined electronic beats",
      description:
        "Classic drum machine whose sounds shaped hip-hop, pop, and electronic music for decades.",
      url: "https://en.wikipedia.org/wiki/Roland_TR-808",
    },
    {
      title: "La Suite numérique is France’s e-government portal",
      description:
        "Centralized interface for accessing French public digital services and administrative tools.",
      url: "https://lasuite.numerique.gouv.fr/en",
    },
    {
      title: "LiveLingua gives free verb conjugation charts",
      description:
        "Interactive conjugation tables for 600+ verbs used as learning scaffolds for language students.",
      url: "https://www.livelingua.com/conjugation",
    },
    {
      title: "Language learning tools curated in one place",
      description:
        "Directory aggregating and ranking the best language learning utilities and resources.",
      url: "https://languagetools.directory/",
    },
    {
      title: "Search Engine Map visualizes search engine market share",
      description:
        "Interactive breakdown of global search engine usage and relative dominance.",
      url: "https://www.searchenginemap.com/",
    },
    {
      title: "Open-source Mac apps list",
      description:
        "Community-curated catalog of native macOS apps you can install or audit because their source is public.",
      url: "https://github.com/serhii-londar/open-source-mac-os-apps",
    },
    {
      title: "Helix editor is modal and performance-focused",
      description:
        "Modern terminal-based text editor built for speed with language-aware features and modal interface.",
      url: "https://helix-editor.com/",
    },
    {
      title: "Lima brings Linux VM tooling to macOS",
      description:
        "Lightweight VM helper to run container-friendly Linux environments on macOS with minimal overhead.",
      url: "https://lima-vm.io/",
    },
    {
      title: "Jeff Geerling’s tech and infrastructure blog",
      description:
        "Authoritative blog with deep-dive articles on self-hosting, Ansible, Kubernetes, Raspberry Pi, and Linux infrastructure.",
      url: "https://www.jeffgeerling.com/",
    },
    {
      title: "macOS icon asset pack",
      description:
        "Free downloadable bundle of high-resolution macOS/iOS-style icons for UI design and theming.",
      url: "https://macosicons.com",
    },
    {
      title: "Disk price lookup",
      description:
        "Shows current street prices and historical trends for hard drives and SSDs so you can spot deals quickly.",
      url: "https://diskprices.com/",
    },
    {
      title: "GSMArena",
      description:
        "Comprehensive mobile phone specifications, reviews, and comparison database.",
      url: "https://www.gsmarena.com/",
    },
    {
      title: "NPR - Dating App Lawsuit",
      description:
        "Lawsuit against Match Group (Tinder, Hinge) alleging they use addictive features to keep users paying.",
      url: "https://www.npr.org/2024/02/14/1231513991/tinder-hinge-match-group-lawsuit",
      category: "Social Media",
      featured: false,
    },
    {
      title: "Google Waze Partners",
      description:
        "Official documentation for Waze partners and developers integrating with the navigation platform.",
      url: "https://support.google.com/waze/partners/answer/9416071?hl=en",
      category: "Navigation",
      featured: false,
    },
    {
      title: "List of Semiconductor Fabrication Plants",
      description:
        "Comprehensive list of semiconductor manufacturing facilities worldwide, crucial for understanding global chip production.",
      url: "https://en.wikipedia.org/wiki/List_of_semiconductor_fabrication_plants",
      category: "Manufacturing",
      featured: false,
    },
    {
      title: "Manjarno",
      description:
        "Privacy-focused Linux distribution based on Manjaro with enhanced security features.",
      url: "https://manjarno.pages.dev/",
      category: "Operating Systems",
      featured: false,
    },
  ],
  youtube: [
    {
      title: "Un Topo por el Mundo",
      description:
        "Argentine guy travelling his journeys in unique parts of the world.",
      url: "https://www.youtube.com/@topo",
    },
    {
      title: "Words At Work (YouTube Shorts)",
      description:
        "Channel producing short videos on word origins, linguistics, and fun with language.",
      url: "https://www.youtube.com/@w0rdsatw0rk/shorts",
    },
    {
      title: "Technology Connections",
      description:
        "Explains the history and inner workings of everyday technologies in an entertaining way.",
      url: "https://www.youtube.com/@TechnologyConnections",
    },
    {
      title: "Steve Kaufmann",
      description: "A highly respected veteran in the language learning space",
      url: "https://www.youtube.com/@Thelinguist",
    },
    {
      title: "Asianometry",
      description:
        "In-depth explainer videos on Asian economies, technology, and history with a focus on Taiwan, Japan, and East Asia.",
      url: "https://www.youtube.com/@Asianometry",
    },
    {
      title: "alvacerod",
      description:
        "Spanish-language channel exploring quirky history, culture, and internet phenomena with a humorous twist.",
      url: "https://www.youtube.com/@alvacerod",
    },
    {
      title: "Book Club Radio",
      description:
        "Long-form ambient study music and radio-style mixes themed around cozy reading atmospheres.",
      url: "https://www.youtube.com/@bookclubradio",
    },
    {
      title: "Brut FR",
      description:
        "French news and culture platform producing short, impactful documentaries and interviews on social issues.",
      url: "https://www.youtube.com/@BrutFR",
    },
    {
      title: "CaspianReport",
      description:
        "Geopolitical analysis channel breaking down world events, conflicts, and international relations.",
      url: "https://www.youtube.com/@CaspianReport",
    },
    {
      title: "codyko2",
      description:
        "Comedy and commentary channel from Cody Ko featuring sketches, reactions, and lighthearted takes on internet culture.",
      url: "https://www.youtube.com/@codyko2",
    },
    {
      title: "itscodytrains",
      description:
        "Content documenting train travel, reviews, and rail experiences across different countries.",
      url: "https://www.youtube.com/@itscodytrains",
    },
    {
      title: "ColdFusion",
      description:
        "Documentary-style videos about technology history, big tech companies, and innovation stories.",
      url: "https://www.youtube.com/@ColdFusion",
    },
    {
      title: "Company Man",
      description:
        "Business history and analysis on companies’ successes, failures, and brand evolutions.",
      url: "https://www.youtube.com/@companyman114",
    },
    {
      title: "Discover Connection",
      description:
        "Social experiment and interview channel exploring human connection through personal questions and conversations.",
      url: "https://www.youtube.com/@DiscoverConnection",
    },
    {
      title: "Yes Theory",
      description:
        "Adventure and lifestyle channel promoting seeking discomfort through challenges and unique experiences.",
      url: "https://www.youtube.com/@YesTheory",
    },
    {
      title: "Drew Binsky",
      description:
        "Travel vlogger visiting every country in the world, sharing cultural insights and personal encounters.",
      url: "https://www.youtube.com/@drewbinsky",
    },
    {
      title: "GeoGuessr Explained",
      description:
        "Tips, strategies, and analysis for playing and improving at GeoGuessr",
      url: "https://www.youtube.com/@geoguessr_explained",
    },
    {
      title: "Half as Interesting",
      description:
        "Bite-sized educational videos covering strange, overlooked, or fun facts about history, geography, and systems.",
      url: "https://www.youtube.com/@halfasinteresting",
    },
    {
      title: "Wendover Productions",
      description:
        "Educational videos explaining how the world works, focusing on logistics, transportation, and economics.",
      url: "https://www.youtube.com/@Wendoverproductions",
    },
    {
      title: "Jet Lag: The Game",
      description:
        "Competitive travel game show where contestants race across countries completing challenges.",
      url: "https://www.youtube.com/@jetlagthegame",
    },
    {
      title: "Hi Clavero",
      description:
        "Spanish-language tech and gadget reviews with a focus on practical user experiences.",
      url: "https://www.youtube.com/@HiClavero",
    },
    {
      title: "h0ser",
      description:
        "Lifestyle and adventure vlogs, often featuring road trips, camping, and outdoor activities.",
      url: "https://www.youtube.com/@h0ser",
    },
    {
      title: "ibx2cat",
      description:
        "Minecraft-focused channel covering updates, mechanics, and gameplay tips.",
      url: "https://www.youtube.com/@ibx2cat",
    },
    {
      title: "Itchy Boots",
      description:
        "Motorcycle travel vlogs documenting solo adventures through remote and challenging terrains.",
      url: "https://www.youtube.com/@ItchyBoots",
    },
    {
      title: "JackSucksAtGeography",
      description:
        "Geography-themed challenges, quizzes, and map-based trivia presented humorously.",
      url: "https://www.youtube.com/@JackSucksAtGeography",
    },
    {
      title: "Jarvis",
      description:
        "Commentary and humor channel blending internet culture analysis with sketches.",
      url: "https://www.youtube.com/@jarvis",
    },
    {
      title: "Jeff Geerling",
      description:
        "Tech channel focused on Raspberry Pi projects, open source hardware, and server setups.",
      url: "https://www.youtube.com/@JeffGeerling",
    },
    {
      title: "Jeff Nippard",
      description:
        "Science-based fitness and bodybuilding advice, workout programs, and nutrition tips.",
      url: "https://www.youtube.com/@JeffNippard",
    },
    {
      title: "Talon Fitness",
      description:
        "Fitness channel offering workout routines, health advice, and strength training guidance.",
      url: "https://www.youtube.com/@Talon_Fitness",
    },
    {
      title: "Stossel TV",
      description:
        "Libertarian-leaning news commentary and analysis from journalist John Stossel.",
      url: "https://www.youtube.com/@StosselTV",
    },
    {
      title: "Johnny Harris",
      description:
        "Cinematic journalism and storytelling covering global issues, politics, and culture.",
      url: "https://www.youtube.com/@johnnyharris",
    },
    {
      title: "Level 2 Jeff",
      description:
        "Gaming and tech channel with commentary, hardware reviews, and personal insights.",
      url: "https://www.youtube.com/@Level2Jeff",
    },
    {
      title: "magmidt",
      description:
        "Educational shorts and videos on language, history, and miscellaneous interesting facts.",
      url: "https://www.youtube.com/@magmidt",
    },
    {
      title: "Money & Macro",
      description:
        "Clear explanations of macroeconomics, finance, and global economic trends.",
      url: "https://www.youtube.com/@MoneyMacro",
    },
    {
      title: "niccoloveslinux",
      description:
        "Linux-focused tutorials, news, and open source software reviews.",
      url: "https://www.youtube.com/@niccoloveslinux",
    },
    {
      title: "StoryLearning",
      description:
        "Language learning channel teaching through storytelling and immersion techniques.",
      url: "https://www.youtube.com/@storylearning",
    },
    {
      title: "Peter Santenello",
      description:
        "Documentary travel channel interviewing locals in underrepresented places and communities.",
      url: "https://www.youtube.com/@PeterSantenello",
    },
    {
      title: "PPPeter",
      description:
        "Comedy channel mixing sketches, satirical travel content, and social experiments.",
      url: "https://www.youtube.com/@PPPeter_Official/videos",
    },
    {
      title: "Ana Psychology",
      description:
        "Psychology channel exploring human behavior, relationships, and social science research.",
      url: "https://www.youtube.com/@AnaPsychology",
    },
    {
      title: "RobWords",
      description:
        "Explores the origins, history, and quirks of English words and expressions.",
      url: "https://www.youtube.com/@RobWords",
    },
    {
      title: "Seek Discomfort",
      description:
        "Lifestyle brand and channel from Yes Theory focused on pushing limits and building community.",
      url: "https://www.youtube.com/@SeekDiscomfort",
    },
    {
      title: "shiey",
      description:
        "Urban exploration, stealth camping, and travel adventures often in restricted or unusual places.",
      url: "https://www.youtube.com/@shiey",
    },
    {
      title: "Spanish With Nate",
      description:
        "Spanish learning channel with approachable lessons and practical conversation tips.",
      url: "https://www.youtube.com/@SpanishWithNate.",
    },
    {
      title: "The B1M",
      description:
        "Architecture and construction channel showcasing major projects and industry trends.",
      url: "https://www.youtube.com/@TheB1M",
    },
    {
      title: "Tom Scott",
      description:
        "Educational and entertaining videos on quirky facts, science, and interesting places worldwide.",
      url: "https://www.youtube.com/@TomScottGo",
    },
    {
      title: "Tom Stanton Engineering",
      description:
        "Engineering projects and experiments with creative mechanical builds.",
      url: "https://www.youtube.com/@TomStantonEngineering",
    },
    {
      title: "Veritasium",
      description:
        "Science and engineering channel exploring concepts through experiments and interviews.",
      url: "https://www.youtube.com/@veritasium",
    },
    {
      title: "topo",
      description:
        "Travel and exploration channel capturing landscapes, culture, and adventure.",
      url: "https://www.youtube.com/@topo",
    },
    {
      title: "Will Tennyson",
      description:
        "Fitness, lifestyle, and food challenge videos with a humorous tone.",
      url: "https://www.youtube.com/@WillTennyson",
    },
    {
      title: "Game Theory 101",
      description:
        "Accessible explanations of game theory concepts and their real-world applications.",
      url: "https://www.youtube.com/@Gametheory101",
    },
    {
      title: "Zach Star Himself",
      description: "Short satire videos",
      url: "https://www.youtube.com/@ZachStarHimself",
    },
    {
      title: "zi8gzag",
      description: "One of the best Geoguessr players.",
      url: "https://www.youtube.com/@zi8gzag",
    },
    {
      title: "Alomorfe",
      description:
        "Brazilian Portuguese-speaking explanations of linguistic concepts.",
      url: "https://www.youtube.com/@Alomorfe",
    },
  ],
  podcasts: [
    {
      title: "Acquired",
      description: "A podcast about the history of technology and business.",
      url: "https://www.acquired.fm/",
    },
    {
      title: "Lateral with Tom Scott",
      description:
        "Comedy panel game podcast about weird questions with wonderful answers",
      url: "https://lateralcast.com/",
    },
    {
      title: "Waveform",
      description:
        "A podcast run by the MKBHD team about technology and a bit of everything else",
      url: "https://podcasts.voxmedia.com/show/waveform-the-mkbhd-podcast",
    },
    {
      title: "Let's Learn Everything",
      description:
        "A fun podcast about learning everything, with no specific topic",
      url: "https://pod.link/1587816694",
    },
    {
      title: "How I Built This with Guy Raz",
      description: "A podcast about how people built their companies",
      url: "https://pod.link/1150510297",
    },
    {
      title: "Wisdom From The Top with Guy Raz",
      description:
        "A podcast with interviews top leaders about their struggles, failures, and successes to uncover lessons in leadership and business.",
      url: "https://pod.link/1460154838",
    },
    {
      title: "ACQ2",
      description:
        "A spin-off of Acquired, with smaller episodes and interviews",
      url: "https://pod.link/acquiredlp",
    },
    {
      title: "Pekingology",
      description: "A podcast about the geopolitics of China",
      url: "https://www.csis.org/podcasts/pekingology",
    },
    {
      title: "The Red Line",
      description: "A podcast about geopolitics today",
      url: "https://www.theredlinepodcast.com/",
    },
    {
      title: "Lingthusiasm",
      description: "A podcast about language and linguistics",
      url: "https://www.lingthusiasm.com/",
    },
  ],
};
