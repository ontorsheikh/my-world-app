// Local verified national symbols by ISO alpha-2 code.
// Only include verified entries. For countries without verified symbols,
// do not invent—use the prescribed fallback values.

const nationalSymbols = {
  BD: {
    animal: "Royal Bengal Tiger",
    bird: "Oriental Magpie-Robin",
    flower: "Water Lily",
    fruit: "Jackfruit",
    sport: "Kabaddi",
    religions: ["Islam", "Hinduism", "Buddhism", "Christianity"],
  },

  IN: {
    animal: "Bengal Tiger",
    bird: "Indian Peacock",
    flower: "Lotus",
    fruit: "Mango",
    // India does not have an officially designated national sport; many
    // sources reference field hockey historically. Use prescribed fallback.
    sport: "Not officially designated",
    religions: ["Hinduism", "Islam", "Christianity", "Sikhism"],
  },
};

export default nationalSymbols;
