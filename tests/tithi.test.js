// Run: npm i astronomy-engine@2.1.19 luxon@3.4.4 && node tests/tithi.test.js
const A = require("astronomy-engine");
const { DateTime } = require("luxon");
const assert = require("assert");

const shukla = ["Chitra","Jwalamalini","Sarvamangala","Vijaya","Nilapataka","Nitya","Kulasundari","Tvarita","Shivaduti","Maha Vajreshvari","Vahnivasini","Bherunda","Nityaklinna","Bhagamalini","Maha Tripura Sundari"];
const krishna = ["Kameshvari","Bhagamalini","Nityaklinna","Bherunda","Vahnivasini","Maha Vajreshvari","Shivaduti","Tvarita","Kulasundari","Nitya","Nilapataka","Vijaya","Sarvamangala","Jwalamalini","Maha Tripura Sundari"];

function tithi(dob, tob, tz) {
  const d = DateTime.fromISO(`${dob}T${tob}`, { zone: tz }).toJSDate();
  const p = ((A.MoonPhase(d) % 360) + 360) % 360;
  const isShukla = p < 180;
  const num = Math.floor((isShukla ? p : p - 180) / 12) + 1;
  return { isShukla, num, devi: (isShukla ? shukla : krishna)[num - 1] };
}
function crossing(angle, from, tz) {
  const t = A.SearchMoonPhase(angle, DateTime.fromISO(from, { zone: tz }).toJSDate(), 3);
  return DateTime.fromJSDate(t.date, { zone: tz });
}

let n = 0;
const ok = (name, fn) => { fn(); n++; console.log("PASS", name); };
const within = (dt, iso, mins, tz = "Asia/Kolkata") =>
  assert(Math.abs(dt.diff(DateTime.fromISO(iso, { zone: tz }), "minutes").minutes) <= mins, `${dt.toISO()} vs ${iso}`);

// Drik Panchang reference boundaries (IST), +-5 min
ok("Diwali Amavasya 2024 start", () => within(crossing(348, "2024-10-30", "Asia/Kolkata"), "2024-10-31T15:52", 5));
ok("Diwali Amavasya 2024 end", () => within(crossing(0, "2024-10-31", "Asia/Kolkata"), "2024-11-01T18:16", 5));
ok("Guru Purnima 2025 start", () => within(crossing(168, "2025-07-09", "Asia/Kolkata"), "2025-07-10T01:36", 5));
ok("Navratri Pratipada 2025 start", () => within(crossing(0, "2025-09-21", "Asia/Kolkata"), "2025-09-22T01:23", 5));
ok("Navratri Pratipada 2025 end", () => within(crossing(12, "2025-09-22", "Asia/Kolkata"), "2025-09-23T02:55", 5));

// Mapping vs arunraj.org/nitya-devi table
ok("Amavasya = Maha Tripura Sundari", () => assert.strictEqual(tithi("2025-10-21", "10:00", "Asia/Kolkata").devi, "Maha Tripura Sundari"));
ok("Shukla Pratipada = Chitra", () => { const t = tithi("2025-09-22", "09:00", "Asia/Kolkata"); assert(t.isShukla && t.num === 1 && t.devi === "Chitra"); });
ok("Krishna Pratipada = Kameshvari", () => { const t = tithi("2025-07-11", "08:00", "Asia/Kolkata"); assert(!t.isShukla && t.num === 1 && t.devi === "Kameshvari"); });
ok("Ashtami = Tvarita in both pakshas", () => {
  assert.strictEqual(shukla[7], "Tvarita"); assert.strictEqual(krishna[7], "Tvarita");
});

// Input handling
ok("PM vs AM changes the result by 12h (guards AM default bug)", () => {
  const am = tithi("2025-10-21", "05:00", "Asia/Kolkata"), pm = tithi("2025-10-21", "17:00", "Asia/Kolkata");
  assert.strictEqual(am.num, 15); assert.strictEqual(pm.num, 15); // Amavasya spans 15:46 Oct20 - 17:55 Oct21
  const late = tithi("2025-10-21", "19:00", "Asia/Kolkata"); assert(late.isShukla && late.num === 1);
});
ok("Historic IST +06:30 in 1943", () => assert.strictEqual(DateTime.fromISO("1943-06-01T10:00", { zone: "Asia/Kolkata" }).offset, 390));
ok("London DST gap detected", () => {
  const dt = DateTime.fromISO("2024-03-31T01:30", { zone: "Europe/London" });
  assert.notStrictEqual(dt.toFormat("HH:mm"), "01:30");
});
ok("Invalid tz rejected", () => assert(!DateTime.fromISO("2024-01-01T10:00", { zone: "Not/AZone" }).isValid));
console.log(`\n${n} tests passed`);
