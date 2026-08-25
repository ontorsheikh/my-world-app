import fs from "fs";
const fetchFn =
  globalThis.fetch || (await import("node-fetch").then((m) => m.default));
const headers = {
  "User-Agent": "WorldWebPropFinder/1.0 (contact: example@example.com)",
};

async function search(term) {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(term)}&language=en&format=json&type=property&origin=*`;
  const r = await fetchFn(url, { headers });
  const j = await r.json();
  return j.search || [];
}

async function run() {
  const terms = [
    "national animal",
    "national bird",
    "national flower",
    "national fruit",
    "national sport",
    "national symbol",
  ];
  for (const t of terms) {
    const res = await search(t);
    console.log("Term:", t);
    for (const r of res.slice(0, 10)) {
      console.log(" ", r.id, "-", r.label, "-", r.description);
    }
    console.log("");
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
