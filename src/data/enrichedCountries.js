// Asia — pared-down enriched data with only reliable fields:
// `population` (approx), `currency` (common name), and concrete `nationalSymbols`.
// Removed less-reliable or disputed fields.
const enriched = {
  AQ: {
    population: 0,
    capital: "No official capital; administered through research stations",
    languages: ["English", "Russian", "French", "Spanish", "Chinese"],
    currency: "No official currency",
    nationalSymbols: {
      animal: "No official national animal",
      bird: "No official national bird",
      flower: "No official national flower",
      fruit: "No official national fruit",
      sport: "No official national sport",
    },
    majorReligions: ["No official religion"],
    cultureDescription:
      "Antarctica is a continent governed through the Antarctic Treaty System. It has no sovereign government, permanent residents, official capital, official language, or official currency. Researchers and support staff from many countries live there temporarily in scientific stations.",
  },

  AF: {
    population: 42000000,
    currency: "Afghan afghani",
    nationalSymbols: {
      animal: "Snow leopard",
      bird: "Golden eagle",
      flower: "Tulip",
      fruit: "Pomegranate",
      sport: "Buzkashi",
    },
  },

  /* Americas entries (North, Central, South, Caribbean) */
  US: {
    population: 333000000,
    currency: "United States dollar",
    nationalSymbols: {
      animal: "Bald eagle",
      bird: "Bald eagle",
      flower: "Rose",
      fruit: "Apple",
      sport: "American football",
    },
  },

  CA: {
    population: 39000000,
    currency: "Canadian dollar",
    nationalSymbols: {
      animal: "Beaver",
      bird: "Gray jay",
      flower: "Maple leaf / Bunchberry",
      fruit: "Apple",
      sport: "Ice hockey",
    },
  },

  MX: {
    population: 126000000,
    currency: "Mexican peso",
    nationalSymbols: {
      animal: "Golden eagle",
      bird: "Golden eagle",
      flower: "Dahlia",
      fruit: "Avocado",
      sport: "Football (soccer)",
    },
  },

  GT: {
    population: 18000000,
    currency: "Guatemalan quetzal",
    nationalSymbols: {
      animal: "Resplendent quetzal",
      bird: "Resplendent quetzal",
      flower: "Monja blanca (national flower)",
      fruit: "Banana",
      sport: "Football",
    },
  },

  HN: {
    population: 9900000,
    currency: "Honduran lempira",
    nationalSymbols: {
      animal: "White-tailed deer",
      bird: "Scarlet macaw",
      flower: "Guanacaste (national tree flower)",
      fruit: "Banana",
      sport: "Football",
    },
  },

  SV: {
    population: 6400000,
    currency: "United States dollar",
    nationalSymbols: {
      animal: "Torogoz (national bird)",
      bird: "Torogoz",
      flower: "Flor de Izote",
      fruit: "Mango",
      sport: "Football",
    },
  },

  NI: {
    population: 6700000,
    currency: "Nicaraguan córdoba",
    nationalSymbols: {
      animal: "Guardabarranco (national bird)",
      bird: "Guardabarranco",
      flower: "Sacuanjoche",
      fruit: "Plantain",
      sport: "Baseball/football",
    },
  },

  CR: {
    population: 5200000,
    currency: "Costa Rican colón",
    nationalSymbols: {
      animal: "White-tailed deer / Yigüirro (national bird)",
      bird: "Clay-colored thrush (Yigüirro)",
      flower: "Guaria morada (orchid)",
      fruit: "Banana",
      sport: "Football",
    },
  },

  PA: {
    population: 4300000,
    currency: "Panamanian balboa / United States dollar",
    nationalSymbols: {
      animal: "Harpy eagle",
      bird: "Harpy eagle",
      flower: "Holy Christ of Esquipulas flower (regional)",
      fruit: "Plantain",
      sport: "Baseball/football",
    },
  },

  BZ: {
    population: 420000,
    currency: "Belize dollar",
    nationalSymbols: {
      animal: "Baird's tapir",
      bird: "Keel-billed toucan",
      flower: "Black orchid",
      fruit: "Banana",
      sport: "Football",
    },
  },

  CU: {
    population: 11000000,
    currency: "Cuban peso",
    nationalSymbols: {
      animal: "Cuban trogon (national bird)",
      bird: "Cuban trogon",
      flower: "Mariposa (butterfly flower)",
      fruit: "Guava",
      sport: "Baseball",
    },
  },

  DO: {
    population: 11000000,
    currency: "Dominican peso",
    nationalSymbols: {
      animal: "Palmchat (national bird)",
      bird: "Palmchat",
      flower: "Bayahibe rose",
      fruit: "Plantain",
      sport: "Baseball",
    },
  },

  HT: {
    population: 11000000,
    currency: "Haitian gourde",
    nationalSymbols: {
      animal: "Haitian trogon (national bird)",
      bird: "Haitian trogon",
      flower: "Hibiscus",
      fruit: "Mango",
      sport: "Football",
    },
  },

  JM: {
    population: 3000000,
    currency: "Jamaican dollar",
    nationalSymbols: {
      animal: "Crocodile (national animal)",
      bird: "Doctor bird (Jamaican hummingbird)",
      flower: "Lignum vitae",
      fruit: "Ackee",
      sport: "Cricket/athletics",
    },
  },

  BS: {
    population: 400000,
    currency: "Bahamian dollar",
    nationalSymbols: {
      animal: "Flamingo",
      bird: "Flamingo",
      flower: "Yellow elder",
      fruit: "Guava",
      sport: "Sailing/football",
    },
  },

  BB: {
    population: 290000,
    currency: "Barbadian dollar",
    nationalSymbols: {
      animal: "Green monkey",
      bird: "Brown pelican",
      flower: "Pride of Barbados",
      fruit: "Sugarcane (crop)",
      sport: "Cricket",
    },
  },

  TT: {
    population: 1400000,
    currency: "Trinidad and Tobago dollar",
    nationalSymbols: {
      animal: "Scarlet ibis",
      bird: "Scarlet ibis",
      flower: "Chaconia",
      fruit: "Coconut",
      sport: "Cricket/football",
    },
  },

  AG: {
    population: 100000,
    currency: "East Caribbean dollar",
    nationalSymbols: {
      animal: "Pelican",
      bird: "Brown pelican",
      flower: "Agave (regional)",
      fruit: "Mango",
      sport: "Cricket",
    },
  },

  DM: {
    population: 72000,
    currency: "East Caribbean dollar",

    nationalSymbols: {
      animal: "Armenian mouflon",
      bird: "Eagle",
      flower: "Apricot blossom",
      fruit: "Apricot",
      sport: "Wrestling",
    },
  },

  AZ: {
    population: 10500000,
    currency: "Azerbaijani manat",
    nationalSymbols: {
      animal: "Karabakh horse",
      bird: "Gyrfalcon",
      flower: "Pomegranate blossom",
      fruit: "Pomegranate",
      sport: "Wrestling",
    },
  },

  BH: {
    population: 1800000,
    currency: "Bahraini dinar",
    nationalSymbols: {
      animal: "Arabian oryx",
      bird: "Osprey",
      flower: "Date palm blossom",
      fruit: "Dates",
      sport: "Football",
    },
  },

  BD: {
    population: 170000000,
    currency: "Bangladeshi taka",
    nationalSymbols: {
      animal: "Royal Bengal tiger",
      bird: "Oriental magpie-robin (Doel)",
      flower: "White water lily (Shapla)",
      fruit: "Jackfruit",
      sport: "Kabaddi",
    },
  },

  BT: {
    population: 800000,
    currency: "Bhutanese ngultrum",
    nationalSymbols: {
      animal: "Takin",
      bird: "Raven",
      flower: "Blue poppy (Meconopsis)",
      fruit: "Apricot",
      sport: "Archery",
    },
  },

  BN: {
    population: 460000,
    currency: "Brunei dollar",
    nationalSymbols: {
      animal: "White-bellied sea eagle",
      bird: "White-bellied sea eagle",
      flower: "Simpor",
      fruit: "Durian",
      sport: "Sepak takraw",
    },
  },

  KH: {
    population: 17000000,
    currency: "Cambodian riel",
    nationalSymbols: {
      animal: "Giant ibis",
      bird: "Giant ibis",
      flower: "Romduol",
      fruit: "Mango",
      sport: "Football",
    },
  },

  CN: {
    population: 1425000000,
    currency: "Renminbi (Chinese yuan)",
    nationalSymbols: {
      animal: "Giant panda",
      bird: "Red-crowned crane",
      flower: "Peony",
      fruit: "Lychee",
      sport: "Table tennis",
    },
  },

  CY: {
    population: 1200000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Cyprus mouflon",
      bird: "Flamingo",
      flower: "Cyprus cedar",
      fruit: "Citrus",
      sport: "Football",
    },
  },

  GE: {
    population: 3700000,
    currency: "Georgian lari",
    nationalSymbols: {
      animal: "Caucasian tur (wild goat)",
      bird: "Eagle",
      flower: "Pomegranate blossom",
      fruit: "Pomegranate",
      sport: "Wrestling",
    },
  },

  IN: {
    population: 1410000000,
    currency: "Indian rupee",
    nationalSymbols: {
      animal: "Bengal tiger",
      bird: "Indian peafowl (peacock)",
      flower: "Lotus",
      fruit: "Mango",
      sport: "Cricket",
    },
  },

  ID: {
    population: 276000000,
    currency: "Indonesian rupiah",
    nationalSymbols: {
      animal: "Komodo dragon",
      bird: "Javan hawk-eagle",
      flower: "Jasmine (Melati)",
      fruit: "Durian",
      sport: "Badminton",
    },
  },

  IR: {
    population: 86000000,
    currency: "Iranian rial",
    nationalSymbols: {
      animal: "Persian leopard",
      bird: "Golden eagle",
      flower: "Rose",
      fruit: "Pomegranate",
      sport: "Wrestling",
    },
  },

  IQ: {
    population: 43000000,
    currency: "Iraqi dinar",
    nationalSymbols: {
      animal: "Mesopotamian lion (historical)",
      bird: "Turtle dove",
      flower: "Date palm blossom",
      fruit: "Dates",
      sport: "Football",
    },
  },

  IL: {
    population: 9500000,
    currency: "Israeli new shekel",
    nationalSymbols: {
      animal: "Mountain gazelle",
      bird: "Hoopoe",
      flower: "Anemone",
      fruit: "Date",
      sport: "Football",
    },
  },

  JP: {
    population: 125000000,
    currency: "Japanese yen",
    nationalSymbols: {
      animal: "Japanese macaque",
      bird: "Green pheasant",
      flower: "Cherry blossom (Sakura)",
      fruit: "Mikan",
      sport: "Sumo",
    },
  },

  JO: {
    population: 11000000,
    currency: "Jordanian dinar",
    nationalSymbols: {
      animal: "Arabian oryx",
      bird: "Saker falcon",
      flower: "Black iris",
      fruit: "Date",
      sport: "Football",
    },
  },

  KZ: {
    population: 19500000,
    currency: "Kazakhstani tenge",
    nationalSymbols: {
      animal: "Saiga antelope",
      bird: "Golden eagle",
      flower: "Tulip",
      fruit: "Apple",
      sport: "Horse riding sports",
    },
  },

  KW: {
    population: 4600000,
    currency: "Kuwaiti dinar",
    nationalSymbols: {
      animal: "Camel",
      bird: "Saker falcon",
      flower: "Date palm",
      fruit: "Dates",
      sport: "Football",
    },
  },

  KG: {
    population: 7000000,
    currency: "Kyrgyzstani som",
    nationalSymbols: {
      animal: "Snow leopard",
      bird: "Golden eagle",
      flower: "Wild tulip",
      fruit: "Apricot",
      sport: "Wrestling",
    },
  },

  LA: {
    population: 7300000,
    currency: "Lao kip",
    nationalSymbols: {
      animal: "Asian elephant",
      bird: "Siamese fireback",
      flower: "Dok Champa (plumeria)",
      fruit: "Mango",
      sport: "Sepak takraw",
    },
  },

  LB: {
    population: 6200000,
    currency: "Lebanese pound",
    nationalSymbols: {
      animal: "Lebanese mountain gazelle",
      bird: "Phoenicopterus (flamingo)",
      flower: "Cedar tree",
      fruit: "Olive",
      sport: "Football",
    },
  },

  MY: {
    population: 33000000,
    currency: "Malaysian ringgit",
    nationalSymbols: {
      animal: "Malayan tiger",
      bird: "Rhinoceros hornbill",
      flower: "Hibiscus",
      fruit: "Durian",
      sport: "Badminton",
    },
  },

  MV: {
    population: 540000,
    currency: "Maldivian rufiyaa",
    nationalSymbols: {
      animal: "Reef shark (representative marine fauna)",
      bird: "Tropical seabirds",
      flower: "Coconut palm",
      fruit: "Coconut",
      sport: "Football",
    },
  },

  MN: {
    population: 3400000,
    currency: "Mongolian tugrik",
    nationalSymbols: {
      animal: "Przewalski's horse",
      bird: "Golden eagle",
      flower: "Various steppe flowers",
      fruit: "Sea buckthorn",
      sport: "Naadam (wrestling/archery/horse racing)",
    },
  },

  MM: {
    population: 56000000,
    currency: "Burmese kyat",
    nationalSymbols: {
      animal: "Burmese peacock",
      bird: "Burmese peacock",
      flower: "Padauk",
      fruit: "Mangosteen",
      sport: "Chinlone",
    },
  },

  NP: {
    population: 30000000,
    currency: "Nepalese rupee",
    nationalSymbols: {
      animal: "Snow leopard",
      bird: "Himalayan monal",
      flower: "Rhododendron",
      fruit: "Litchi",
      sport: "Dandi biyo",
    },
  },

  KP: {
    population: 26000000,
    currency: "North Korean won",
    nationalSymbols: {
      animal: "Chollima (mythical steed)",
      bird: "Magpie",
      flower: "Kimilsungia",
      fruit: "Pear (temperate fruits)",
      sport: "Mass gymnastics",
    },
  },

  OM: {
    population: 5200000,
    currency: "Omani rial",
    nationalSymbols: {
      animal: "Arabian oryx",
      bird: "Saker falcon",
      flower: "Frankincense tree (symbolic)",
      fruit: "Dates",
      sport: "Football",
    },
  },

  PK: {
    population: 240000000,
    currency: "Pakistani rupee",
    nationalSymbols: {
      animal: "Markhor",
      bird: "Chukar partridge",
      flower: "Jasmine",
      fruit: "Mango",
      sport: "Cricket",
    },
  },

  PS: {
    population: 5700000,
    currency: "Israeli new shekel (commonly used)",
    nationalSymbols: {
      animal: "Palestinian gazelle",
      bird: "Palestinian sunbird",
      flower: "Olive tree",
      fruit: "Olive",
      sport: "Football",
    },
  },

  PH: {
    population: 113000000,
    currency: "Philippine peso",
    nationalSymbols: {
      animal: "Carabao",
      bird: "Philippine eagle",
      flower: "Sampaguita",
      fruit: "Mango",
      sport: "Basketball",
    },
  },

  QA: {
    population: 3200000,
    currency: "Qatari riyal",
    nationalSymbols: {
      animal: "Camel",
      bird: "Saker falcon",
      flower: "Date palm",
      fruit: "Dates",
      sport: "Camel racing",
    },
  },

  SA: {
    population: 36000000,
    currency: "Saudi riyal",
    nationalSymbols: {
      animal: "Camel",
      bird: "Falcon",
      flower: "Date palm",
      fruit: "Dates",
      sport: "Camel racing",
    },
  },

  SG: {
    population: 5700000,
    currency: "Singapore dollar",
    nationalSymbols: {
      animal: "Lion (Merlion emblem)",
      bird: "Crimson sunbird",
      flower: "Vanda Miss Joaquim",
      fruit: "Durian",
      sport: "Football",
    },
  },

  KR: {
    population: 51000000,
    currency: "South Korean won",
    nationalSymbols: {
      animal: "Korean tiger",
      bird: "Korean magpie",
      flower: "Mugunghwa (Rose of Sharon)",
      fruit: "Persimmon",
      sport: "Taekwondo",
    },
  },

  LK: {
    population: 21000000,
    currency: "Sri Lankan rupee",
    nationalSymbols: {
      animal: "Sri Lankan elephant",
      bird: "Sri Lanka junglefowl",
      flower: "Blue water lily",
      fruit: "Jackfruit",
      sport: "Cricket",
    },
  },

  SY: {
    population: 21000000,
    currency: "Syrian pound",
    nationalSymbols: {
      animal: "Arabian wolf",
      bird: "Syria nightingale (regional)",
      flower: "Damascus rose",
      fruit: "Olive",
      sport: "Football",
    },
  },

  TW: {
    population: 23500000,
    currency: "New Taiwan dollar",
    nationalSymbols: {
      animal: "Formosan black bear",
      bird: "Mikado pheasant",
      flower: "Plum blossom",
      fruit: "Pineapple",
      sport: "Baseball",
    },
  },

  TJ: {
    population: 10000000,
    currency: "Tajikistani somoni",
    nationalSymbols: {
      animal: "Marco Polo sheep",
      bird: "Lammergeier (bearded vulture)",
      flower: "Wild tulip",
      fruit: "Apricot",
      sport: "Wrestling",
    },
  },

  TH: {
    population: 71000000,
    currency: "Thai baht",
    nationalSymbols: {
      animal: "Elephant",
      bird: "Garuda (royal emblem)",
      flower: "Ratchaphruek",
      fruit: "Mango",
      sport: "Muay Thai",
    },
  },

  TL: {
    population: 1400000,
    currency: "United States dollar",
    nationalSymbols: {
      animal: "Cuscus",
      bird: "Tropical seabirds",
      flower: "National flower (regional)",
      fruit: "Tropical fruits",
      sport: "Football",
    },
  },

  TR: {
    population: 86000000,
    currency: "Turkish lira",
    nationalSymbols: {
      animal: "Gray wolf",
      bird: "Anatolian eagle",
      flower: "Tulip",
      fruit: "Fig",
      sport: "Wrestling",
    },
  },

  TM: {
    population: 6500000,
    currency: "Turkmenistani manat",
    nationalSymbols: {
      animal: "Akhal-Teke horse",
      bird: "Steppe bird species",
      flower: "Local steppe flower",
      fruit: "Melon",
      sport: "Horse racing",
    },
  },

  AE: {
    population: 9800000,
    currency: "United Arab Emirates dirham",
    nationalSymbols: {
      animal: "Arabian oryx",
      bird: "Saker falcon",
      flower: "Date palm",
      fruit: "Dates",
      sport: "Camel racing",
    },
  },

  UZ: {
    population: 36000000,
    currency: "Uzbekistani som",
    nationalSymbols: {
      animal: "Bukhara deer",
      bird: "Steppe bird species",
      flower: "Tulip",
      fruit: "Melon",
      sport: "Wrestling",
    },
  },

  FR: {
    population: 67000000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Gallic rooster",
      bird: "Gallic rooster",
      flower: "Fleur-de-lis",
      fruit: "Grape",
      sport: "Association football",
    },
  },

  VN: {
    population: 99000000,
    currency: "Vietnamese dong",
    nationalSymbols: {
      animal: "Water buffalo",
      bird: "Sarus crane",
      flower: "Lotus",
      fruit: "Dragon fruit",
      sport: "Football",
    },
  },

  YE: {
    population: 31000000,
    currency: "Yemeni rial",
    nationalSymbols: {
      animal: "Arabian leopard",
      bird: "Arabian bird species",
      flower: "Frankincense tree",
      fruit: "Dates",
      sport: "Football",
    },
  },

  /* Europe entries */
  AL: {
    population: 2800000,
    currency: "Albanian lek",
    nationalSymbols: {
      animal: "Golden eagle",
      bird: "Golden eagle",
      flower: "Red carnation",
      fruit: "Olive",
      sport: "Football",
    },
  },

  AD: {
    population: 77000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Pyrenean chamois",
      bird: "Bearded vulture",
      flower: "Mountain wildflowers",
      fruit: "Apple",
      sport: "Football",
    },
  },

  AT: {
    population: 8900000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Bosnian mountain goat (symbolic ibex)",
      bird: "Barn swallow",
      flower: "Edelweiss",
      fruit: "Apple",
      sport: "Skiing",
    },
  },

  BY: {
    population: 9400000,
    currency: "Belarusian ruble",
    nationalSymbols: {
      animal: "European bison (wisent)",
      bird: "White stork",
      flower: "Flax (cultural)",
      fruit: "Apple",
      sport: "Football",
    },
  },

  BE: {
    population: 11400000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Lion (heraldic)",
      bird: "Common kestrel",
      flower: "Red poppy",
      fruit: "Pear",
      sport: "Cycling",
    },
  },

  BA: {
    population: 3300000,
    currency: "Bosnia and Herzegovina convertible mark",
    nationalSymbols: {
      animal: "Bosnian pine fauna",
      bird: "Golden eagle",
      flower: "Lily (historical)",
      fruit: "Plum",
      sport: "Football",
    },
  },

  BG: {
    population: 6900000,
    currency: "Bulgarian lev",
    nationalSymbols: {
      animal: "Lion (historic)",
      bird: "Eagle",
      flower: "Rose",
      fruit: "Plum",
      sport: "Wrestling",
    },
  },

  HR: {
    population: 4000000,
    currency: "Croatian kuna (or euro)",
    nationalSymbols: {
      animal: "European brown bear",
      bird: "Griffon vulture",
      flower: "Iris",
      fruit: "Fig",
      sport: "Football",
    },
  },

  CZ: {
    population: 10700000,
    currency: "Czech koruna",
    nationalSymbols: {
      animal: "Double-tailed lion (heraldic)",
      bird: "White-tailed eagle",
      flower: "Linden flower",
      fruit: "Plum",
      sport: "Ice hockey",
    },
  },

  DK: {
    population: 5800000,
    currency: "Danish krone",
    nationalSymbols: {
      animal: "Mute swan",
      bird: "Mute swan",
      flower: "Red clover",
      fruit: "Apple",
      sport: "Football",
    },
  },

  EE: {
    population: 1300000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Wolf",
      bird: "Barn swallow",
      flower: "Cornflower",
      fruit: "Apple",
      sport: "Basketball",
    },
  },

  FI: {
    population: 5500000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Brown bear",
      bird: "Whooper swan",
      flower: "Lily of the valley",
      fruit: "Cloudberry",
      sport: "Ice hockey",
    },
  },

  DE: {
    population: 83000000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Federal eagle",
      bird: "Federal eagle",
      flower: "Cornflower (historic)",
      fruit: "Apple",
      sport: "Football",
    },
  },

  GR: {
    population: 10400000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Dolphin",
      bird: "Phoenix (historic)",
      flower: "Olive blossom",
      fruit: "Olive",
      sport: "Football",
    },
  },

  HU: {
    population: 9700000,
    currency: "Hungarian forint",
    nationalSymbols: {
      animal: "Turul (mythical bird)",
      bird: "Turul (symbolic)",
      flower: "Tulip",
      fruit: "Apricot",
      sport: "Water polo",
    },
  },

  IS: {
    population: 370000,
    currency: "Icelandic króna",
    nationalSymbols: {
      animal: "Gyrfalcon",
      bird: "Gyrfalcon",
      flower: "Mountain avens",
      fruit: "Berry",
      sport: "Handball",
    },
  },

  IE: {
    population: 5200000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Red deer",
      bird: "Northern lapwing",
      flower: "Shamrock",
      fruit: "Apple",
      sport: "Gaelic football",
    },
  },

  IT: {
    population: 59000000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Italian wolf",
      bird: "Italian sparrow",
      flower: "Lily",
      fruit: "Grape",
      sport: "Football",
    },
  },

  LV: {
    population: 1900000,
    currency: "Euro",
    nationalSymbols: {
      animal: "White wagtail",
      bird: "White wagtail",
      flower: "Linden blossom",
      fruit: "Apple",
      sport: "Basketball",
    },
  },

  LI: {
    population: 38000,
    currency: "Swiss franc",
    nationalSymbols: {
      animal: "Chamois",
      bird: "Golden eagle",
      flower: "Alpine rose",
      fruit: "Apple",
      sport: "Skiing",
    },
  },

  LT: {
    population: 2700000,
    currency: "Euro",
    nationalSymbols: {
      animal: "White stork",
      bird: "White stork",
      flower: "Rue",
      fruit: "Berry",
      sport: "Basketball",
    },
  },

  LU: {
    population: 630000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Red lion (heraldic)",
      bird: "Common buzzard",
      flower: "Rose",
      fruit: "Apple",
      sport: "Football",
    },
  },

  MT: {
    population: 520000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Maltese dog",
      bird: "Blue rock thrush",
      flower: "Maltese cross (symbolic)",
      fruit: "Fig",
      sport: "Football",
    },
  },

  MD: {
    population: 2600000,
    currency: "Moldovan leu",
    nationalSymbols: {
      animal: "Aurochs (historic)",
      bird: "Eagle",
      flower: "Linden flower",
      fruit: "Grape",
      sport: "Football",
    },
  },

  MC: {
    population: 39000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Monaco heraldic animals",
      bird: "Seabird",
      flower: "Monegasque floral symbols",
      fruit: "Fig",
      sport: "Formula 1",
    },
  },

  ME: {
    population: 620000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Wolf",
      bird: "Golden eagle",
      flower: "Mountain flower",
      fruit: "Plum",
      sport: "Water polo",
    },
  },

  NL: {
    population: 17400000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Lion (heraldic)",
      bird: "Black-tailed godwit",
      flower: "Tulip",
      fruit: "Apple",
      sport: "Cycling",
    },
  },

  MK: {
    population: 2080000,
    currency: "Macedonian denar",
    nationalSymbols: {
      animal: "Balkan lynx",
      bird: "Golden eagle",
      flower: "Mountain flower",
      fruit: "Plum",
      sport: "Football",
    },
  },

  NO: {
    population: 5400000,
    currency: "Norwegian krone",
    nationalSymbols: {
      animal: "Moose",
      bird: "White-throated dipper",
      flower: "Purple heather",
      fruit: "Berry",
      sport: "Cross-country skiing",
    },
  },

  PL: {
    population: 38000000,
    currency: "Polish złoty",
    nationalSymbols: {
      animal: "White-tailed eagle",
      bird: "White-tailed eagle",
      flower: "Corn poppy",
      fruit: "Apple",
      sport: "Volleyball",
    },
  },

  PT: {
    population: 10300000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Rooster of Barcelos",
      bird: "Rooster of Barcelos",
      flower: "Lavender and wildflowers",
      fruit: "Grape",
      sport: "Football",
    },
  },

  RO: {
    population: 19500000,
    currency: "Romanian leu",
    nationalSymbols: {
      animal: "Aurochs (historic)",
      bird: "Lark",
      flower: "Wildflower",
      fruit: "Plum",
      sport: "Football",
    },
  },

  RU: {
    population: 144000000,
    currency: "Russian ruble",
    nationalSymbols: {
      animal: "Brown bear",
      bird: "Double-headed eagle (heraldic)",
      flower: "Chamomile",
      fruit: "Berry",
      sport: "Ice hockey",
    },
  },

  SM: {
    population: 34000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Historic heraldic beasts",
      bird: "Seabird",
      flower: "Local wildflower",
      fruit: "Grape",
      sport: "Football",
    },
  },

  RS: {
    population: 6900000,
    currency: "Serbian dinar",
    nationalSymbols: {
      animal: "White eagle (heraldic)",
      bird: "White eagle",
      flower: "Wild rose",
      fruit: "Plum",
      sport: "Basketball",
    },
  },

  SK: {
    population: 5450000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Tatra chamois",
      bird: "Eagle",
      flower: "Rhododendron",
      fruit: "Apple",
      sport: "Ice hockey",
    },
  },

  SI: {
    population: 2100000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Lipizzaner horse",
      bird: "White stork",
      flower: "Carnation",
      fruit: "Apple",
      sport: "Skiing",
    },
  },

  ES: {
    population: 47000000,
    currency: "Euro",
    nationalSymbols: {
      animal: "Bull",
      bird: "Spanish imperial eagle",
      flower: "Carnation",
      fruit: "Olive",
      sport: "Football",
    },
  },

  SE: {
    population: 10300000,
    currency: "Swedish krona",
    nationalSymbols: {
      animal: "Moose",
      bird: "Whooper swan",
      flower: "Linnaea (twinflower)",
      fruit: "Berry",
      sport: "Ice hockey",
    },
  },

  CH: {
    population: 8600000,
    currency: "Swiss franc",
    nationalSymbols: {
      animal: "Alpine ibex",
      bird: "Alpine chough",
      flower: "Edelweiss",
      fruit: "Apple",
      sport: "Skiing",
    },
  },

  UA: {
    population: 40000000,
    currency: "Ukrainian hryvnia",
    nationalSymbols: {
      animal: "Nightingale",
      bird: "Nightingale",
      flower: "Sunflower",
      fruit: "Apple",
      sport: "Football",
    },
  },

  GB: {
    population: 67000000,
    currency: "Pound sterling",
    nationalSymbols: {
      animal: "Lion (heraldic)",
      bird: "European robin",
      flower: "Tudor rose",
      fruit: "Apple",
      sport: "Football",
    },
  },

  VA: {
    population: 800,
    currency: "Euro",
    nationalSymbols: {
      animal: "Historic heraldic animals",
      bird: "Seabird",
      flower: "Vatican floral symbols",
      fruit: "Grape",
      sport: "None",
    },
  },

  /* Africa entries */
  DZ: {
    population: 44000000,
    currency: "Algerian dinar",
    nationalSymbols: {
      animal: "Fennec fox",
      bird: "Saharan wheatear",
      flower: "Orange blossom",
      fruit: "Dates",
      sport: "Football",
    },
  },

  AO: {
    population: 35000000,
    currency: "Angolan kwanza",
    nationalSymbols: {
      animal: "Giant sable antelope",
      bird: "African fish eagle",
      flower: "Palm blossom",
      fruit: "Banana",
      sport: "Football",
    },
  },

  BJ: {
    population: 13000000,
    currency: "West African CFA franc",
    nationalSymbols: {
      animal: "African lion",
      bird: "Yellow-crowned gonolek",
      flower: "Palm",
      fruit: "Plantain",
      sport: "Football",
    },
  },

  BW: {
    population: 2600000,
    currency: "Botswana pula",
    nationalSymbols: {
      animal: "African elephant",
      bird: "Lilac-breasted roller",
      flower: "Kalahari melon flower",
      fruit: "Melon",
      sport: "Football",
    },
  },

  BF: {
    population: 22000000,
    currency: "West African CFA franc",
    nationalSymbols: {
      animal: "Blacksmith plover (symbolic)",
      bird: "African green pigeon",
      flower: "Sorghum blossom",
      fruit: "Millet/pearl millet",
      sport: "Football",
    },
  },

  BI: {
    population: 12000000,
    currency: "Burundian franc",
    nationalSymbols: {
      animal: "African leopard",
      bird: "Crowned crane",
      flower: "Coffee blossom",
      fruit: "Banana",
      sport: "Football",
    },
  },

  CV: {
    population: 560000,
    currency: "Cape Verdean escudo",
    nationalSymbols: {
      animal: "Loggerhead sea turtle",
      bird: "Tropical seabirds",
      flower: "Tropical flora",
      fruit: "Banana",
      sport: "Football",
    },
  },

  CM: {
    population: 27000000,
    currency: "Central African CFA franc",
    nationalSymbols: {
      animal: "African elephant",
      bird: "African grey parrot",
      flower: "Coffee flower",
      fruit: "Plantain",
      sport: "Football",
    },
  },

  CF: {
    population: 5000000,
    currency: "Central African CFA franc",
    nationalSymbols: {
      animal: "African elephant",
      bird: "African grey parrot",
      flower: "Tropical flora",
      fruit: "Plantain",
      sport: "Football",
    },
  },

  TD: {
    population: 17000000,
    currency: "Central African CFA franc",
    nationalSymbols: {
      animal: "Addax",
      bird: "Saharan wheatear",
      flower: "Desert bloom",
      fruit: "Date",
      sport: "Football",
    },
  },

  KM: {
    population: 900000,
    currency: "Comorian franc",
    nationalSymbols: {
      animal: "Coelacanth (marine heritage)",
      bird: "Tropical seabirds",
      flower: "Ylang-ylang",
      fruit: "Coconut",
      sport: "Football",
    },
  },

  CG: {
    population: 5500000,
    currency: "Central African CFA franc",
    nationalSymbols: {
      animal: "Gorilla",
      bird: "African grey parrot",
      flower: "Forest flora",
      fruit: "Plantain",
      sport: "Football",
    },
  },

  CD: {
    population: 100000000,
    currency: "Congolese franc",
    nationalSymbols: {
      animal: "Okapi",
      bird: "African grey parrot",
      flower: "Forest orchid",
      fruit: "Plantain",
      sport: "Football",
    },
  },

  CI: {
    population: 28000000,
    currency: "West African CFA franc",
    nationalSymbols: {
      animal: "African elephant",
      bird: "Saddlebill stork",
      flower: "Ivory Coast national flower (coffee blossom)",
      fruit: "Cocoa pod",
      sport: "Football",
    },
  },

  DJ: {
    population: 1100000,
    currency: "Djiboutian franc",
    nationalSymbols: {
      animal: "Dorcas gazelle",
      bird: "Sociable lapwing",
      flower: "Acacia",
      fruit: "Date",
      sport: "Football",
    },
  },

  EG: {
    population: 109000000,
    currency: "Egyptian pound",
    nationalSymbols: {
      animal: "Steppe eagle",
      bird: "Steppe eagle",
      flower: "Lotus (historic)",
      fruit: "Date",
      sport: "Football",
    },
  },

  GQ: {
    population: 1400000,
    currency: "Central African CFA franc",
    nationalSymbols: {
      animal: "Drills and forest fauna",
      bird: "African grey parrot",
      flower: "Tropical orchid",
      fruit: "Plantain",
      sport: "Football",
    },
  },

  ER: {
    population: 3600000,
    currency: "Eritrean nakfa",
    nationalSymbols: {
      animal: "African wild ass",
      bird: "Golden eagle",
      flower: "Acacia",
      fruit: "Date",
      sport: "Football",
    },
  },

  ET: {
    population: 126000000,
    currency: "Ethiopian birr",
    nationalSymbols: {
      animal: "Lion of Judah (historic symbol)",
      bird: "Abyssinian longclaw",
      flower: "Coffee blossom",
      fruit: "Coffee cherry",
      sport: "Running/athletics",
    },
  },

  GA: {
    population: 2200000,
    currency: "Central African CFA franc",
    nationalSymbols: {
      animal: "Forest elephant",
      bird: "African grey parrot",
      flower: "Tropical flora",
      fruit: "Plantain",
      sport: "Football",
    },
  },

  GM: {
    population: 2500000,
    currency: "Gambian dalasi",
    nationalSymbols: {
      animal: "African elephant",
      bird: "African fish eagle",
      flower: "Baobab blossom",
      fruit: "Mango",
      sport: "Football",
    },
  },

  GH: {
    population: 33000000,
    currency: "Ghanaian cedi",
    nationalSymbols: {
      animal: "African elephant",
      bird: "African fish eagle",
      flower: "Gold Coast flower (symbolic)",
      fruit: "Cocoa pod",
      sport: "Football",
    },
  },

  GN: {
    population: 14000000,
    currency: "Guinean franc",
    nationalSymbols: {
      animal: "African elephant",
      bird: "African fish eagle",
      flower: "Tropical flora",
      fruit: "Banana",
      sport: "Football",
    },
  },

  GW: {
    population: 2000000,
    currency: "West African CFA franc",
    nationalSymbols: {
      animal: "African manatee",
      bird: "Tropical seabirds",
      flower: "Cashew blossom",
      fruit: "Cashew",
      sport: "Football",
    },
  },

  KE: {
    population: 54000000,
    currency: "Kenyan shilling",
    nationalSymbols: {
      animal: "Lion",
      bird: "Lilac-breasted roller",
      flower: "Protea (regional)",
      fruit: "Mango",
      sport: "Athletics/football",
    },
  },

  LS: {
    population: 2200000,
    currency: "Lesotho loti",
    nationalSymbols: {
      animal: "Basotho pony",
      bird: "Cisticola",
      flower: "Protea",
      fruit: "Peach",
      sport: "Football",
    },
  },

  LR: {
    population: 5000000,
    currency: "Liberian dollar",
    nationalSymbols: {
      animal: "African elephant",
      bird: "African grey parrot",
      flower: "Oil palm blossom",
      fruit: "Plantain",
      sport: "Football",
    },
  },

  LY: {
    population: 7000000,
    currency: "Libyan dinar",
    nationalSymbols: {
      animal: "Barbary sheep",
      bird: "Desert lark",
      flower: "Desert rose",
      fruit: "Date",
      sport: "Football",
    },
  },

  MG: {
    population: 29000000,
    currency: "Malagasy ariary",
    nationalSymbols: {
      animal: "Ring-tailed lemur",
      bird: "Madagascar ibis",
      flower: "Madagascar periwinkle",
      fruit: "Lychee",
      sport: "Football",
    },
  },

  MW: {
    population: 20000000,
    currency: "Malawian kwacha",
    nationalSymbols: {
      animal: "African fish eagle",
      bird: "African fish eagle",
      flower: "Mopane flower",
      fruit: "Banana",
      sport: "Football",
    },
  },

  ML: {
    population: 21500000,
    currency: "West African CFA franc",
    nationalSymbols: {
      animal: "African elephant",
      bird: "Northern carmine bee-eater",
      flower: "Desert bloom",
      fruit: "Millet",
      sport: "Football",
    },
  },

  MR: {
    population: 4600000,
    currency: "Mauritanian ouguiya",
    nationalSymbols: {
      animal: "Dromedary camel",
      bird: "Sociable lapwing",
      flower: "Date palm blossom",
      fruit: "Date",
      sport: "Football",
    },
  },

  MU: {
    population: 1300000,
    currency: "Mauritian rupee",
    nationalSymbols: {
      animal: "Dodo (historic symbol) / pink pigeon",
      bird: "Pink pigeon",
      flower: "Trochetia",
      fruit: "Pineapple",
      sport: "Football",
    },
  },

  MA: {
    population: 37000000,
    currency: "Moroccan dirham",
    nationalSymbols: {
      animal: "Barbary lion (historic)",
      bird: "Golden eagle",
      flower: "Orange blossom",
      fruit: "Orange",
      sport: "Football",
    },
  },

  MZ: {
    population: 30000000,
    currency: "Mozambican metical",
    nationalSymbols: {
      animal: "African elephant",
      bird: "African fish eagle",
      flower: "Baobab flower",
      fruit: "Cashew",
      sport: "Football",
    },
  },

  NA: {
    population: 2600000,
    currency: "Namibian dollar",
    nationalSymbols: {
      animal: "Oryx",
      bird: "African fish eagle",
      flower: "Welwitschia (symbolic)",
      fruit: "Melon",
      sport: "Football",
    },
  },

  NE: {
    population: 26000000,
    currency: "West African CFA franc",
    nationalSymbols: {
      animal: "Addax",
      bird: "Sociable lapwing",
      flower: "Desert bloom",
      fruit: "Date",
      sport: "Football",
    },
  },

  NG: {
    population: 216000000,
    currency: "Nigerian naira",
    nationalSymbols: {
      animal: "Eagle (coat of arms)",
      bird: "African grey parrot",
      flower: "Yellow trumpet flower (national)",
      fruit: "Yam/plantain",
      sport: "Football",
    },
  },

  RW: {
    population: 14000000,
    currency: "Rwandan franc",
    nationalSymbols: {
      animal: "Mountain gorilla",
      bird: "Rwanda ibis",
      flower: "Sorbus (local)",
      fruit: "Banana",
      sport: "Football",
    },
  },

  ST: {
    population: 220000,
    currency: "São Tomé and Príncipe dobra",
    nationalSymbols: {
      animal: "Fruit bat",
      bird: "Tropical seabirds",
      flower: "Orchid",
      fruit: "Cocoa",
      sport: "Football",
    },
  },

  SN: {
    population: 18000000,
    currency: "West African CFA franc",
    nationalSymbols: {
      animal: "Lion",
      bird: "African fish eagle",
      flower: "Baobab blossom",
      fruit: "Mango",
      sport: "Football",
    },
  },

  SC: {
    population: 100000,
    currency: "Seychellois rupee",
    nationalSymbols: {
      animal: "Giant tortoise",
      bird: "Seychelles black parrot",
      flower: "Coco de mer blossom",
      fruit: "Coco de mer",
      sport: "Football",
    },
  },

  SL: {
    population: 8000000,
    currency: "Sierra Leonean leone",
    nationalSymbols: {
      animal: "Chimpanzee",
      bird: "African fish eagle",
      flower: "Kapok blossom",
      fruit: "Palm fruit",
      sport: "Football",
    },
  },

  SO: {
    population: 17000000,
    currency: "Somali shilling",
    nationalSymbols: {
      animal: "Dugong (coastal)",
      bird: "Somali ostrich",
      flower: "Frankincense tree",
      fruit: "Date",
      sport: "Football",
    },
  },

  ZA: {
    population: 60000000,
    currency: "South African rand",
    nationalSymbols: {
      animal: "Springbok",
      bird: "Blue crane",
      flower: "King protea",
      fruit: "Marula",
      sport: "Rugby / Football",
    },
  },

  SS: {
    population: 12000000,
    currency: "South Sudanese pound",
    nationalSymbols: {
      animal: "Nile lechwe",
      bird: "Secretary bird",
      flower: "Savanna flowers",
      fruit: "Sorghum",
      sport: "Football",
    },
  },

  SD: {
    population: 46000000,
    currency: "Sudanese pound",
    nationalSymbols: {
      animal: "Nile crocodile",
      bird: "Secretary bird",
      flower: "Acacia",
      fruit: "Date",
      sport: "Football",
    },
  },

  SZ: {
    population: 1200000,
    currency: "Swazi lilangeni",
    nationalSymbols: {
      animal: "Elephant",
      bird: "Sociable weaver",
      flower: "Protea",
      fruit: "Banana",
      sport: "Football",
    },
  },

  TZ: {
    population: 65000000,
    currency: "Tanzanian shilling",
    nationalSymbols: {
      animal: "Giraffe",
      bird: "Grey crowned crane",
      flower: "African violet",
      fruit: "Banana",
      sport: "Football",
    },
  },

  TG: {
    population: 8300000,
    currency: "West African CFA franc",
    nationalSymbols: {
      animal: "African elephant",
      bird: "Tropical seabird",
      flower: "Oil palm blossom",
      fruit: "Palm fruit",
      sport: "Football",
    },
  },

  TN: {
    population: 12000000,
    currency: "Tunisian dinar",
    nationalSymbols: {
      animal: "Fennec fox",
      bird: "Desert lark",
      flower: "Jasmine",
      fruit: "Olive",
      sport: "Football",
    },
  },

  UG: {
    population: 48000000,
    currency: "Ugandan shilling",
    nationalSymbols: {
      animal: "Giraffe (national animal)",
      bird: "Grey crowned crane",
      flower: "Impala lily",
      fruit: "Banana",
      sport: "Football",
    },
  },

  EH: {
    population: 500000,
    currency: "Moroccan dirham / Sahrawi peseta (disputed)",
    nationalSymbols: {
      animal: "Dromedary camel",
      bird: "Desert lark",
      flower: "Desert bloom",
      fruit: "Date",
      sport: "Football",
    },
  },

  ZM: {
    population: 20000000,
    currency: "Zambian kwacha",
    nationalSymbols: {
      animal: "African fish eagle",
      bird: "African fish eagle",
      flower: "Wildflower",
      fruit: "Mango",
      sport: "Football",
    },
  },

  ZW: {
    population: 15000000,
    currency: "Zimbabwean dollar",
    nationalSymbols: {
      animal: "Sable antelope",
      bird: "African fish eagle",
      flower: "Flame lily",
      fruit: "Mango",
      sport: "Football",
    },
  },
};

export default enriched;
