// Example enrichedCountries file.
// Copy this file to src/data/enrichedCountries.js and fill with verified data.
// DO NOT invent data. Only include entries you can verify.

const enriched = {
  // ISO alpha-2 code (upper-case)
  BD: {
    nationalSymbols: {
      animal: "Royal Bengal Tiger",
      bird: "Oriental Magpie-Robin",
      flower: "Water Lily",
      fruit: "Jackfruit",
      sport: "Kabaddi",
    },
    majorReligions: [
      // Prefer lists; avoid percentages unless you have a reliable source
      "Islam",
      "Hinduism",
      "Buddhism",
      "Christianity",
    ],
    cultureDescription:
      "Bangladesh has a rich Bengali cultural heritage with strong traditions in music, literature, and festivals such as Pohela Boishakh.",
  },
  IN: {
    nationalSymbols: {
      animal: "Bengal Tiger",
      bird: "Indian Peacock",
      flower: "Lotus",
      fruit: "Mango",
      sport: "Not officially designated",
    },
    majorReligions: ["Hinduism", "Islam", "Christianity", "Sikhism"],
    cultureDescription:
      "India has a diverse cultural landscape with multiple languages, cuisines, classical arts, and regional traditions.",
  },
};

export default enriched;
