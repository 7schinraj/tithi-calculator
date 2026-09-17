/**
 * Tithi Devathai Calculator
 * Created for REKHA THE TAROT QUEEN
 */

// Theme Management
const THEME_KEY = "tithi_theme";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  if (typeof updateParticleColorsForTheme === "function") {
    updateParticleColorsForTheme();
  }

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    if (theme === "dark") {
      themeBtn.innerHTML = `
        <svg class="icon icon-stroke" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        <span>Light Mode</span>
      `;
      themeBtn.setAttribute("aria-label", "Switch to Light Mode");
    } else {
      themeBtn.innerHTML = `
        <svg class="icon icon-stroke" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        <span>Dark Mode</span>
      `;
      themeBtn.setAttribute("aria-label", "Switch to Dark Mode");
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

// Set initial theme immediately before DOM content loads to avoid FOUC
(function initThemeImmediately() {
  const theme = getPreferredTheme();
  document.documentElement.setAttribute("data-theme", theme);
})();

// Data Constants
const tithiNames = [
  "Pratipada / பிரதமை",
  "Dwitiya / துவிதியை",
  "Tritiya / திருதியை",
  "Chaturthi / சதுர்த்தி",
  "Panchami / பஞ்சமி",
  "Shashthi / ஷஷ்டி",
  "Saptami / சப்தமி",
  "Ashtami / அஷ்டமி",
  "Navami / நவமி",
  "Dashami / தசமி",
  "Ekadashi / ஏகாதசி",
  "Dwadashi / துவாதசி",
  "Trayodashi / திரயோதசி",
  "Chaturdashi / சதுர்த்தசி",
  "Poornima / Amavasya"
];

const krishna = [
  ["Kameshvari", "ஸ்ரீ காமேஸ்வரி நித்யா"],
  ["Bhagamalini", "ஸ்ரீ பகமாலினி நித்யா"],
  ["Nityaklinna", "ஸ்ரீ நித்யக்லின்னா நித்யா"],
  ["Bherunda", "ஸ்ரீ பேருண்டா நித்யா"],
  ["Vahnivasini", "ஸ்ரீ வஹ்னிவாசினி நித்யா"],
  ["Maha Vajreshvari", "ஸ்ரீ மஹா வஜ்ரேஸ்வரி நித்யா"],
  ["Shivaduti", "ஸ்ரீ சிவதூதி நித்யா"],
  ["Tvarita", "ஸ்ரீ த்வரிதா நித்யா"],
  ["Kulasundari", "ஸ்ரீ குலசுந்தரி நித்யா"],
  ["Nitya", "ஸ்ரீ நித்யா தேவி"],
  ["Nilapataka", "ஸ்ரீ நீலபதாகா நித்யா"],
  ["Vijaya", "ஸ்ரீ விஜயா நித்யா"],
  ["Sarvamangala", "ஸ்ரீ சர்வமங்களா நித்யா"],
  ["Jwalamalini", "ஸ்ரீ ஜ்வாலாமாலினி நித்யா"],
  ["Maha Tripura Sundari", "ஸ்ரீ மஹா திரிபுரசுந்தரி"]
];

const shukla = [
  ["Chitra", "ஸ்ரீ சித்ரா நித்யா"],
  ["Jwalamalini", "ஸ்ரீ ஜ்வாலாமாலினி நித்யா"],
  ["Sarvamangala", "ஸ்ரீ சர்வமங்களா நித்யா"],
  ["Vijaya", "ஸ்ரீ விஜயா நித்யா"],
  ["Nilapataka", "ஸ்ரீ நீலபதாகா நித்யா"],
  ["Nitya", "ஸ்ரீ நித்யா தேவி"],
  ["Kulasundari", "ஸ்ரீ குலசுந்தரி நித்யா"],
  ["Tvarita", "ஸ்ரீ த்வரிதா நித்யா"],
  ["Shivaduti", "ஸ்ரீ சிவதூதி நித்யா"],
  ["Maha Vajreshvari", "ஸ்ரீ மஹா வஜ்ரேஸ்வரி நித்யா"],
  ["Vahnivasini", "ஸ்ரீ வஹ்னிவாசினி நித்யா"],
  ["Bherunda", "ஸ்ரீ பேருண்டா நித்யா"],
  ["Nityaklinna", "ஸ்ரீ நித்யக்லின்னா நித்யா"],
  ["Bhagamalini", "ஸ்ரீ பகமாலினி நித்யா"],
  ["Maha Tripura Sundari", "ஸ்ரீ மஹா திரிபுரசுந்தரி"]
];

const meanings = {
  "Kameshvari": "Associated with divine desire, attraction, fulfilment and auspicious beginnings.",
  "Bhagamalini": "Associated with creative Shakti, abundance, nurturing and life-force.",
  "Nityaklinna": "Associated with devotion, compassion and inner surrender.",
  "Bherunda": "Associated with courage, protection and transformative strength.",
  "Vahnivasini": "Associated with purification, vitality and spiritual illumination.",
  "Maha Vajreshvari": "Associated with firmness, prosperity and protection.",
  "Shivaduti": "Associated with fearless transformation and removal of negativity.",
  "Tvarita": "Associated with swiftness, movement and overcoming delay.",
  "Kulasundari": "Associated with knowledge, refinement and higher wisdom.",
  "Nitya": "Associated with steadiness, focus and continuity.",
  "Nilapataka": "Associated with victory over obstacles and discipline.",
  "Vijaya": "Associated with success, achievement and progress.",
  "Sarvamangala": "Associated with auspiciousness, harmony and prosperity.",
  "Jwalamalini": "Associated with fiery transformation and clearing obstacles.",
  "Chitra": "Associated with beauty, creativity and clarity.",
  "Maha Tripura Sundari": "Represents fullness, completeness and the supreme Lalita principle."
};

/**
 * Extended Devi data: colors, mantras, element associations
 */
const deviData = {
  "Kameshvari": {
    color: "#e91e8c",
    colorAlt: "#ff6ec7",
    glow: "rgba(233,30,140,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं काम्येश्वर्यै नमः",
    mantraEn: "Om Aim Hrim Klim Kameshvaryai Namah",
    element: "🌺 Divine Desire & Sacred Love",
    flower: "செம்பருத்தி (Red Hibiscus) & ரோஜா (Rose)",
    neivedyam: "கற்கண்டு பால் (Rock Sugar Milk) & மாதுளை பழம் (Pomegranate)",
    bestTime: "வெள்ளிக்கிழமை சுக்ர ஹோரை (Friday Venus Horai, 6-7 AM / 8-9 PM)",
    blessings: "அன்பு, ஈர்ப்பு சக்தி, திருமண வரன் கூடுதல், இல்லற தாம்பத்ய இன்பம்"
  },
  "Bhagamalini": {
    color: "#f59e0b",
    colorAlt: "#fcd34d",
    glow: "rgba(245,158,11,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं भगमालिन्यै नमः",
    mantraEn: "Om Aim Hrim Klim Bhagamaliniyai Namah",
    element: "🌸 Abundance & Life Force",
    flower: "மஞ்சள் சாமந்தி (Marigold) & செந்தாமரை (Red Lotus)",
    neivedyam: "சர்க்கரை பொங்கல் (Sweet Pongal) & தேன் (Honey)",
    bestTime: "செவ்வாய் & ஞாயிறு காலை சூரிய உதய நேரம் (Sunrise)",
    blessings: "தன தான்ய விருத்தி, கர்ப்ப தோஷ நிவர்த்தி, சந்தான பாக்கியம், ஆயுள் பலம்"
  },
  "Nityaklinna": {
    color: "#3b82f6",
    colorAlt: "#93c5fd",
    glow: "rgba(59,130,246,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं नित्यक्लिन्नायै नमः",
    mantraEn: "Om Aim Hrim Klim Nityaklinnayai Namah",
    element: "💧 Devotion & Compassion",
    flower: "வெண் மல்லிகை (Jasmine) & அல்லி மலர் (Water Lily)",
    neivedyam: "பால் பாயாசம் (Kheer / Milk Payasam) & தயிர் சாதம்",
    bestTime: "திங்கட்கிழமை இரவு சந்திர ஹோரை (Monday Moon Horai, 8-9 PM)",
    blessings: "மன அமைதி, குடும்ப ஒற்றுமை, தீராத மனஸ்தாபங்கள் & பகைகள் விலகுதல்"
  },
  "Bherunda": {
    color: "#dc2626",
    colorAlt: "#fca5a5",
    glow: "rgba(220,38,38,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं भेरुण्डायै नमः",
    mantraEn: "Om Aim Hrim Klim Bherundayai Namah",
    element: "🔱 Courage & Protection",
    flower: "சிவப்பு அரளி (Red Oleander) & செவ்வந்தி",
    neivedyam: "மிளகு வடை, கார சுண்டல் & எள் உருண்டை",
    bestTime: "செவ்வாய்க்கிழமை ராகு காலம் அல்லது பிரதோஷ அந்தி வேளை",
    blessings: "பயம் நீங்குதல், துஷ்ட சக்தி & எதிரிகள் பாதுகாப்பு, வழக்குகளில் வெற்றி"
  },
  "Vahnivasini": {
    color: "#f97316",
    colorAlt: "#fdba74",
    glow: "rgba(249,115,22,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं वह्निवासिन्यै नमः",
    mantraEn: "Om Aim Hrim Klim Vahnivasiniyai Namah",
    element: "🔥 Purification & Vitality",
    flower: "பவளமல்லி & செவ்வரளி மலர்",
    neivedyam: "குங்குமப்பூ பால் & நெய் அப்பம் (Ney Appam)",
    bestTime: "ஞாயிற்றுக்கிழமை பகல் உச்சி வேளை (12:00 - 1:00 PM)",
    blessings: "சுய பிரகாசம், தேக ஆரோக்கியம், ஆன்மீக ஞானம், குண்டலினி விழிப்புணர்வு"
  },
  "Maha Vajreshvari": {
    color: "#d4a017",
    colorAlt: "#fde68a",
    glow: "rgba(212,160,23,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं महावज्रेश्वर्यै नमः",
    mantraEn: "Om Aim Hrim Klim Mahavajreshvaryai Namah",
    element: "⚡ Firmness & Prosperity",
    flower: "மஞ்சள் தாமரை & நந்தியாவட்டை மலர்",
    neivedyam: "எலுமிச்சை சாதம், மாம்பழம் & கற்கண்டு",
    bestTime: "வியாழக்கிழமை குரு ஹோரை (Thursday Jupiter Horai, 6-7 AM / 1-2 PM)",
    blessings: "வியாபார ஸ்திரத்தன்மை, பெரும் செல்வம் ஈர்ப்பு, தீராத கடன் நிவர்த்தி"
  },
  "Shivaduti": {
    color: "#7c3aed",
    colorAlt: "#c4b5fd",
    glow: "rgba(124,58,237,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं शिवदूत्यै नमः",
    mantraEn: "Om Aim Hrim Klim Shivadutyai Namah",
    element: "🌑 Fearless Transformation",
    flower: "நீல சங்குப்பூ (Aparajita) & வில்வ இலை (Bilva)",
    neivedyam: "பஞ்சாமிர்தம், பேரீச்சம்பழம் & உளுந்து வடை",
    bestTime: "திங்கட்கிழமை அல்லது சதுர்தசி அந்தி நேரம் (Twilight Sandhya)",
    blessings: "கடன் சுமை தீருதல், கொடிய நோய் நீக்கம், மாயை விலகி தெளிவு பெறுதல்"
  },
  "Tvarita": {
    color: "#0d9488",
    colorAlt: "#5eead4",
    glow: "rgba(13,148,136,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं त्वरितायै नमः",
    mantraEn: "Om Aim Hrim Klim Tvaritayai Namah",
    element: "💨 Swiftness & Movement",
    flower: "துளசி (Tulsi), மரிக்கொழுந்து & பச்சை மலர்கள்",
    neivedyam: "பச்சை பயறு சுண்டல் & வெண்பொங்கல் (Ghee Pongal)",
    bestTime: "புதன்கிழமை காலை புதன் ஹோரை (Wednesday Mercury Horai, 6-7 AM)",
    blessings: "காரிய தாமதங்கள் உடனே நீங்குதல், விரைவான வேலை வாய்ப்பு, சுப காரிய வேகம்"
  },
  "Kulasundari": {
    color: "#db2777",
    colorAlt: "#f9a8d4",
    glow: "rgba(219,39,119,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं कुलसुन्दर्यै नमः",
    mantraEn: "Om Aim Hrim Klim Kulasundaryai Namah",
    element: "📿 Knowledge & Higher Wisdom",
    flower: "வெண்தாமரை (White Lotus) & முல்லை மலர்",
    neivedyam: "நெய் சாதம் & ஏலக்காய் பாதாம் பால்",
    bestTime: "வியாழக்கிழமை காலை பிரம்ம முகூர்த்தம் (4:30 - 6:00 AM)",
    blessings: "கல்வி தேர்ச்சி, வாக்கு வன்மை, நுண்ணறிவு, கலை மற்றும் ஆராய்ச்சி ஞானம்"
  },
  "Nitya": {
    color: "#64748b",
    colorAlt: "#cbd5e1",
    glow: "rgba(100,116,139,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं नित्यायै नमः",
    mantraEn: "Om Aim Hrim Klim Nityayai Namah",
    element: "🌙 Steadiness & Continuity",
    flower: "மருதாணி பூ & வெண்தாமரை",
    neivedyam: "வெள்ளை சுண்டல் & நாட்டு வாழைப்பழம்",
    bestTime: "சனிக்கிழமை காலை அல்லது பௌர்ணமி முழு நிலவு நாள்",
    blessings: "நிலையான வாழ்வு, மன சஞ்சலம் விலகுதல், பூரண அமைதி, யோக சித்தி"
  },
  "Nilapataka": {
    color: "#4338ca",
    colorAlt: "#a5b4fc",
    glow: "rgba(67,56,202,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं नीलपताकायै नमः",
    mantraEn: "Om Aim Hrim Klim Nilapatakayai Namah",
    element: "🏳️ Victory Over Obstacles",
    flower: "நீலோத்பலம் (Blue Water Lily) & நீல சங்குப்பூ",
    neivedyam: "எள் சாதம் & உலர் திராட்சை பழங்கள்",
    bestTime: "சனிக்கிழமை சனி ஹோரை அல்லது அந்தி மாலை வேளை",
    blessings: "எதிரிகள் தொல்லை நீங்குதல், தொழில் போட்டிகளில் அபார வெற்றி, நற்புகழ்"
  },
  "Vijaya": {
    color: "#059669",
    colorAlt: "#6ee7b7",
    glow: "rgba(5,150,105,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं विजयायै नमः",
    mantraEn: "Om Aim Hrim Klim Vijayayai Namah",
    element: "🌿 Success & Achievement",
    flower: "செவ்வரளி & துளசி மாலை",
    neivedyam: "சர்க்கரை பொங்கல் & அவல் பாயாசம்",
    bestTime: "வெள்ளிக்கிழமை பகல் 12:00 - 1:30 PM",
    blessings: "தொட்ட காரியங்களில் பூரண வெற்றி, பதவி உயர்வு, புதிய முயற்சிகளில் லாபம்"
  },
  "Sarvamangala": {
    color: "#b45309",
    colorAlt: "#fcd34d",
    glow: "rgba(180,83,9,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं सर्वमङ्गलायै नमः",
    mantraEn: "Om Aim Hrim Klim Sarvamangalayai Namah",
    element: "🌞 Auspiciousness & Harmony",
    flower: "மஞ்சள் ரோஜா & மணமுள்ள மல்லிகை",
    neivedyam: "ரவா கேசரி & வெற்றிலை பாக்கு பழம்",
    bestTime: "செவ்வாய் & வெள்ளி சுமங்கலி பூஜை நேரம் (காலை 9:00 - 10:30 AM)",
    blessings: "மாங்கல்ய பலம், சர்வ மங்கள யோகம், குழந்தை செல்வம், சௌபாக்கிய வாழ்வு"
  },
  "Jwalamalini": {
    color: "#ef4444",
    colorAlt: "#fca5a5",
    glow: "rgba(239,68,68,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं ज्वालामालिन्यै नमः",
    mantraEn: "Om Aim Hrim Klim Jwalamaliniyai Namah",
    element: "🔥 Fiery Transformation",
    flower: "செந்தாமரை & அடர் சிவப்பு ரோஜா",
    neivedyam: "தித்திப்பு நெய் அப்பம் & வெல்ல பாயாசம்",
    bestTime: "செவ்வாய்க்கிழமை இரவு 8:00 - 9:00 PM",
    blessings: "கண் திருஷ்டி விலகுதல், பில்லி சூன்ய பயம் நீங்குதல், சுடரொளி பாதுகாப்பு"
  },
  "Chitra": {
    color: "#0284c7",
    colorAlt: "#7dd3fc",
    glow: "rgba(2,132,199,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं चित्रायै नमः",
    mantraEn: "Om Aim Hrim Klim Chitrayai Namah",
    element: "🎨 Beauty & Creativity",
    flower: "பலவண்ண நறுமண மலர்கள் (Colorful Flowers)",
    neivedyam: "பழ சாலட், தேன் கலந்த தினை மாவு & அவல் நைவேத்தியம்",
    bestTime: "புதன்கிழமை மாலை 5:00 - 6:30 PM",
    blessings: "கவர்ச்சி சக்தி, கலை படைப்பாற்றல், புதிய யோசனைகள் பலித்தல், செல்வாக்கு"
  },
  "Maha Tripura Sundari": {
    color: "#9333ea",
    colorAlt: "#d8b4fe",
    glow: "rgba(147,51,234,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं श्रीं महात्रिपुरसुन्दर्यै नमः",
    mantraEn: "Om Aim Hrim Shrim Maha Tripura Sundaryai Namah",
    element: "👑 Supreme Completeness",
    flower: "செந்தாமரை (Red Lotus) & கடம்ப மலர்",
    neivedyam: "பஞ்சாமிர்தம், பருப்பு பாயாசம் & லட்டு",
    bestTime: "பௌர்ணமி இரவு நிலவு ஒளி நேரம் (Full Moon Night)",
    blessings: "மோட்சம், சர்வ ஐஸ்வர்யம், ஸ்ரீ லலிதா பரமேஸ்வரியின் பரிபூரண பேரருள்"
  }
};

// Custom Calendar Engine
let calendarState = {
  selectedDate: null,
  viewYear: new Date().getFullYear(),
  viewMonth: new Date().getMonth()
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function initCustomCalendar() {
  const popover = document.getElementById("calendarPopover");
  const dobInput = document.getElementById("dob");
  const dobWrapper = document.getElementById("dobWrapper");

  if (!popover || !dobInput || !dobWrapper) return;

  let yearsOptions = "";
  const currentYr = new Date().getFullYear();
  for (let y = currentYr; y >= 1900; y--) {
    yearsOptions += `<option value="${y}">${y}</option>`;
  }

  let monthsOptions = "";
  MONTH_NAMES.forEach((m, idx) => {
    monthsOptions += `<option value="${idx}">${m}</option>`;
  });

  popover.innerHTML = `
    <div class="calendar-header">
      <button id="calPrevBtn" class="calendar-nav-btn" type="button" aria-label="Previous Month">
        <svg class="icon icon-stroke" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="calendar-selects">
        <select id="calMonthSelect">${monthsOptions}</select>
        <select id="calYearSelect">${yearsOptions}</select>
      </div>
      <button id="calNextBtn" class="calendar-nav-btn" type="button" aria-label="Next Month">
        <svg class="icon icon-stroke" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
    <div class="calendar-weekdays">
      ${WEEKDAY_NAMES.map(w => `<div>${w}</div>`).join('')}
    </div>
    <div id="calDaysGrid" class="calendar-days"></div>
    <div class="calendar-footer">
      <button id="calClearBtn" class="calendar-btn-link" type="button">Clear</button>
      <button id="calTodayBtn" class="calendar-btn-link" type="button">Today</button>
    </div>
  `;

  const monthSelect = document.getElementById("calMonthSelect");
  const yearSelect = document.getElementById("calYearSelect");
  const prevBtn = document.getElementById("calPrevBtn");
  const nextBtn = document.getElementById("calNextBtn");
  const clearBtn = document.getElementById("calClearBtn");
  const todayBtn = document.getElementById("calTodayBtn");

  monthSelect.addEventListener("change", (e) => {
    calendarState.viewMonth = parseInt(e.target.value, 10);
    renderCalendarDays();
  });

  yearSelect.addEventListener("change", (e) => {
    calendarState.viewYear = parseInt(e.target.value, 10);
    renderCalendarDays();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (calendarState.viewMonth === 0) {
      calendarState.viewMonth = 11;
      calendarState.viewYear--;
    } else {
      calendarState.viewMonth--;
    }
    syncCalendarSelects();
    renderCalendarDays();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (calendarState.viewMonth === 11) {
      calendarState.viewMonth = 0;
      calendarState.viewYear++;
    } else {
      calendarState.viewMonth++;
    }
    syncCalendarSelects();
    renderCalendarDays();
  });

  clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dobInput.value = "";
    calendarState.selectedDate = null;
    popover.classList.remove("active");
    dobWrapper.classList.remove("active");
    clearFieldError("dob", "dobError");
  });

  todayBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const today = new Date();
    selectCalendarDate(today.getFullYear(), today.getMonth(), today.getDate());
  });

  const togglePopover = (e) => {
    e.stopPropagation();
    const isActive = popover.classList.contains("active");

    // Close timezone popover if active
    const tzPopover = document.getElementById("tzCustomPopover");
    const tzWrapper = document.getElementById("tzWrapper");
    if (tzPopover) tzPopover.classList.remove("active");
    if (tzWrapper) tzWrapper.classList.remove("active");

    if (!isActive) {
      if (dobInput.value) {
        const parts = dobInput.value.split("-");
        if (parts.length === 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10) - 1;
          const d = parseInt(parts[2], 10);
          if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            calendarState.viewYear = y;
            calendarState.viewMonth = m;
            calendarState.selectedDate = new Date(y, m, d);
          }
        }
      } else {
        calendarState.viewYear = 1995;
        calendarState.viewMonth = 0;
      }
      syncCalendarSelects();
      renderCalendarDays();
      popover.classList.add("active");
      dobWrapper.classList.add("active");
    } else {
      popover.classList.remove("active");
      dobWrapper.classList.remove("active");
    }
  };

  dobWrapper.addEventListener("click", togglePopover);

  document.addEventListener("click", (e) => {
    if (!popover.contains(e.target) && !dobWrapper.contains(e.target)) {
      popover.classList.remove("active");
      dobWrapper.classList.remove("active");
    }
  });
}

function syncCalendarSelects() {
  const monthSelect = document.getElementById("calMonthSelect");
  const yearSelect = document.getElementById("calYearSelect");
  if (monthSelect) monthSelect.value = calendarState.viewMonth;
  if (yearSelect) yearSelect.value = calendarState.viewYear;
}

function renderCalendarDays() {
  const grid = document.getElementById("calDaysGrid");
  if (!grid) return;

  const year = calendarState.viewYear;
  const month = calendarState.viewMonth;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  let html = "";

  for (let x = firstDayIndex; x > 0; x--) {
    html += `<div class="calendar-day-cell other-month">${prevMonthDays - x + 1}</div>`;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = isCurrentMonth && today.getDate() === i;
    const isSelected = calendarState.selectedDate &&
      calendarState.selectedDate.getFullYear() === year &&
      calendarState.selectedDate.getMonth() === month &&
      calendarState.selectedDate.getDate() === i;

    let classes = "calendar-day-cell";
    if (isToday) classes += " today";
    if (isSelected) classes += " selected";

    html += `<div class="${classes}" data-day="${i}">${i}</div>`;
  }

  const totalCells = firstDayIndex + daysInMonth;
  const nextDays = (totalCells > 35 ? 42 : 35) - totalCells;
  for (let j = 1; j <= nextDays; j++) {
    html += `<div class="calendar-day-cell other-month">${j}</div>`;
  }

  grid.innerHTML = html;

  const dayCells = grid.querySelectorAll(".calendar-day-cell:not(.other-month)");
  dayCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e.stopPropagation();
      const day = parseInt(cell.getAttribute("data-day"), 10);
      selectCalendarDate(year, month, day);
    });
  });
}

function selectCalendarDate(year, month, day) {
  const dobInput = document.getElementById("dob");
  const popover = document.getElementById("calendarPopover");
  const dobWrapper = document.getElementById("dobWrapper");

  const formattedMonth = String(month + 1).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  if (dobInput) {
    dobInput.value = formattedDate;
  }
  calendarState.selectedDate = new Date(year, month, day);

  clearFieldError("dob", "dobError");

  if (popover) popover.classList.remove("active");
  if (dobWrapper) dobWrapper.classList.remove("active");
}

// Custom Timezone Component Engine
const TIMEZONE_OPTIONS = [
  { value: "Asia/Kolkata", label: "India — Asia/Kolkata" },
  { value: "Europe/London", label: "United Kingdom — Europe/London" },
  { value: "Asia/Colombo", label: "Sri Lanka — Asia/Colombo" },
  { value: "Asia/Singapore", label: "Singapore — Asia/Singapore" },
  { value: "Asia/Kuala_Lumpur", label: "Malaysia — Asia/Kuala_Lumpur" },
  { value: "Asia/Dubai", label: "UAE — Asia/Dubai" },
  { value: "America/New_York", label: "USA Eastern — America/New_York" },
  { value: "America/Chicago", label: "USA Central — America/Chicago" },
  { value: "America/Denver", label: "USA Mountain — America/Denver" },
  { value: "America/Los_Angeles", label: "USA Pacific — America/Los_Angeles" },
  { value: "Australia/Sydney", label: "Australia — Australia/Sydney" },
  { value: "custom", label: "Other / Custom Time Zone" }
];

function initCustomTimezoneDropdown() {
  const popover = document.getElementById("tzCustomPopover");
  const wrapper = document.getElementById("tzWrapper");
  const hiddenInput = document.getElementById("tz");
  const displayInput = document.getElementById("tzSelectInput");
  const customGroup = document.getElementById("customTzGroup");

  if (!popover || !wrapper || !hiddenInput || !displayInput) return;

  popover.innerHTML = `
    <div class="tz-search-box">
      <svg class="icon icon-stroke" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input id="tzSearchInput" type="text" placeholder="Search time zone or country...">
    </div>
    <div id="tzOptionsList" class="tz-options-list"></div>
  `;

  const searchInput = document.getElementById("tzSearchInput");
  const optionsList = document.getElementById("tzOptionsList");

  const defaultOpt = TIMEZONE_OPTIONS.find(o => o.value === hiddenInput.value) || TIMEZONE_OPTIONS[0];
  displayInput.value = defaultOpt.label;

  const renderOptions = (filterText = "") => {
    const query = filterText.toLowerCase().trim();
    const filtered = TIMEZONE_OPTIONS.filter(o => o.label.toLowerCase().includes(query) || o.value.toLowerCase().includes(query));

    if (filtered.length === 0) {
      optionsList.innerHTML = `<div style="padding: 12px; font-size: 13px; color: var(--ink-muted); text-align: center;">No time zones match "${filterText}"</div>`;
      return;
    }

    optionsList.innerHTML = filtered.map(opt => {
      const isSel = opt.value === hiddenInput.value;
      return `
        <div class="tz-option-item ${isSel ? 'selected' : ''}" data-value="${opt.value}" data-label="${opt.label}">
          <span>${opt.label}</span>
          ${isSel ? '<svg class="icon icon-stroke" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
        </div>
      `;
    }).join("");

    optionsList.querySelectorAll(".tz-option-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = item.getAttribute("data-value");
        const lbl = item.getAttribute("data-label");

        hiddenInput.value = val;
        displayInput.value = lbl;

        if (val === "custom") {
          if (customGroup) customGroup.classList.remove("hidden");
        } else {
          if (customGroup) customGroup.classList.add("hidden");
        }

        clearFieldError("tz", "tzError");
        popover.classList.remove("active");
        wrapper.classList.remove("active");
      });
    });
  };

  renderOptions();

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderOptions(e.target.value);
    });
    searchInput.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  const toggleTzPopover = (e) => {
    e.stopPropagation();
    const isActive = popover.classList.contains("active");

    // Close calendar if active
    const calPopover = document.getElementById("calendarPopover");
    const dobWrapper = document.getElementById("dobWrapper");
    if (calPopover) calPopover.classList.remove("active");
    if (dobWrapper) dobWrapper.classList.remove("active");

    if (!isActive) {
      if (searchInput) searchInput.value = "";
      renderOptions();
      popover.classList.add("active");
      wrapper.classList.add("active");
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    } else {
      popover.classList.remove("active");
      wrapper.classList.remove("active");
    }
  };

  wrapper.addEventListener("click", toggleTzPopover);

  document.addEventListener("click", (e) => {
    if (!popover.contains(e.target) && !wrapper.contains(e.target)) {
      popover.classList.remove("active");
      wrapper.classList.remove("active");
    }
  });
}

/**
 * Get active time zone string from select or custom field
 */
function getTimezone() {
  const hiddenInput = document.getElementById("tz");
  if (!hiddenInput) return "";
  const selectValue = hiddenInput.value;
  if (selectValue === "custom") {
    const customInput = document.getElementById("customTz");
    return customInput ? customInput.value.trim() : "";
  }
  return selectValue;
}

/**
 * Clear all field level and global alert errors
 */
function clearErrors() {
  const errorWrappers = document.querySelectorAll(".input-wrapper.has-error");
  errorWrappers.forEach((w) => w.classList.remove("has-error"));

  const errorMsgs = document.querySelectorAll(".error-msg");
  errorMsgs.forEach((m) => {
    m.classList.remove("visible");
    m.innerHTML = "";
  });

  const globalAlert = document.getElementById("globalAlert");
  if (globalAlert) {
    globalAlert.classList.add("hidden");
    globalAlert.innerHTML = "";
  }
}

function clearFieldError(inputId, errorMsgId) {
  const input = document.getElementById(inputId);
  const errorMsg = document.getElementById(errorMsgId);
  if (input) {
    const wrapper = input.closest(".input-wrapper");
    if (wrapper) wrapper.classList.remove("has-error");
  }
  if (errorMsg) {
    errorMsg.classList.remove("visible");
    errorMsg.innerHTML = "";
  }
}

/**
 * Show field-level error and highlight input wrapper
 */
function showFieldError(inputId, errorMsgId, message) {
  const input = document.getElementById(inputId);
  const errorMsg = document.getElementById(errorMsgId);

  if (input) {
    const wrapper = input.closest(".input-wrapper");
    if (wrapper) wrapper.classList.add("has-error");
  }

  if (errorMsg) {
    errorMsg.innerHTML = `
      <svg class="icon icon-stroke" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span>${message}</span>
    `;
    errorMsg.classList.add("visible");
  }
}

/**
 * Show system-wide banner alert
 */
function showBannerAlert(message) {
  const globalAlert = document.getElementById("globalAlert");
  if (globalAlert) {
    globalAlert.innerHTML = `
      <svg class="icon icon-stroke" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span>${message}</span>
    `;
    globalAlert.classList.remove("hidden");
    globalAlert.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/**
 * Smoothly scroll to and focus first invalid field
 */
function focusFirstErrorField(firstInvalidInput) {
  if (firstInvalidInput) {
    firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      if (firstInvalidInput.id === "dob") {
        const popover = document.getElementById("calendarPopover");
        const dobWrapper = document.getElementById("dobWrapper");
        if (popover && dobWrapper) {
          popover.classList.add("active");
          dobWrapper.classList.add("active");
        }
      } else if (firstInvalidInput.id === "tzSelectInput" || firstInvalidInput.id === "tz") {
        const popover = document.getElementById("tzCustomPopover");
        const tzWrapper = document.getElementById("tzWrapper");
        if (popover && tzWrapper) {
          popover.classList.add("active");
          tzWrapper.classList.add("active");
        }
      } else {
        firstInvalidInput.focus();
        if (typeof firstInvalidInput.showPicker === "function" && firstInvalidInput.type === "time") {
          try {
            firstInvalidInput.showPicker();
          } catch (e) {}
        }
      }
    }, 350);
  }
}

/**
 * Perform Astronomical Moon Phase & Tithi Devathai Calculation
 */
function calculateTithi() {
  clearErrors();

  const dobInput = document.getElementById("dob");
  const tobInput = document.getElementById("tob");
  const tzHiddenInput = document.getElementById("tz");
  const tzSelectInput = document.getElementById("tzSelectInput");
  const customTzInput = document.getElementById("customTz");

  let firstInvalid = null;

  // Validate Date of Birth
  if (!dobInput || !dobInput.value) {
    showFieldError("dob", "dobError", "Please select your date of birth / பிறந்த தேதியை உள்ளிடவும்");
    firstInvalid = firstInvalid || dobInput;
  }

  // Validate Birth Time
  if (!tobInput || !tobInput.value) {
    showFieldError("tob", "tobError", "Please enter your birth time / பிறந்த நேரத்தை உள்ளிடவும்");
    firstInvalid = firstInvalid || tobInput;
  }

  // Validate Timezone
  if (!tzHiddenInput || !tzHiddenInput.value) {
    showFieldError("tzSelectInput", "tzError", "Please select a time zone / நேர மண்டலத்தை தேர்ந்தெடுக்கவும்");
    firstInvalid = firstInvalid || tzSelectInput;
  } else if (tzHiddenInput.value === "custom") {
    if (!customTzInput || !customTzInput.value.trim()) {
      showFieldError("customTz", "customTzError", "Please enter your custom time zone / தேவையான நேர மண்டலத்தை உள்ளிடவும்");
      firstInvalid = firstInvalid || customTzInput;
    }
  }

  if (firstInvalid) {
    focusFirstErrorField(firstInvalid);
    return;
  }

  const dob = dobInput.value;
  const tob = tobInput.value;
  const tz = getTimezone();

  if (typeof luxon === "undefined" || !luxon.DateTime) {
    showBannerAlert("Timezone parsing library (Luxon) is still loading. Please check your internet connection.");
    return;
  }

  const { DateTime } = luxon;
  const dt = DateTime.fromISO(`${dob}T${tob}`, { zone: tz });

  if (!dt.isValid) {
    showFieldError("dob", "dobError", "Invalid birth date, time or timezone format.");
    showFieldError("tob", "tobError", "Please check your birth date and time.");
    focusFirstErrorField(dobInput);
    return;
  }

  if (typeof Astronomy === "undefined" || !Astronomy.MoonPhase) {
    showBannerAlert("Astronomy library is still loading. Please check your internet connection.");
    return;
  }

  // Calculate moon phase angle in degrees (0 to 360)
  let phase = Astronomy.MoonPhase(dt.toUTC().toJSDate());
  phase = ((phase % 360) + 360) % 360;

  const isShukla = phase < 180;
  const within = isShukla ? phase : phase - 180;
  
  let num = Math.floor(within / 12) + 1;
  num = Math.max(1, Math.min(15, num));

  const map = isShukla ? shukla : krishna;
  const devi = map[num - 1];

  // Show loading overlay, then after delay render result
  showLoadingOverlay();
  setTimeout(() => {
    hideLoadingOverlay();
    renderDeviResult(devi, num, isShukla, phase);
  }, 2500);
}

/**
 * Render the full Devi result card with yantra, mantra, and info
 */
function renderDeviResult(devi, num, isShukla, phase) {
  const deviName = devi[0];
  const data = deviData[deviName] || { color: "#9333ea", colorAlt: "#d8b4fe", glow: "rgba(147,51,234,0.45)", mantraSanskrit: "", mantraEn: "", element: "" };

  // Update yantra SVG
  const yantraEl = document.getElementById("deviYantra");
  if (yantraEl) {
    yantraEl.innerHTML = createYantraSVG(data.color, data.colorAlt);
  }

  // Update glow
  const glowEl = document.getElementById("yantraGlow");
  if (glowEl) {
    glowEl.style.background = `radial-gradient(circle, ${data.glow} 0%, transparent 70%)`;
  }

  // Update identity
  document.getElementById("devName").textContent = deviName;
  document.getElementById("devName").style.color = data.color;
  document.getElementById("devTamil").textContent = devi[1];
  const elemEl = document.getElementById("deviElement");
  if (elemEl) elemEl.textContent = data.element;

  // Update mantra
  const mantraSanskritEl = document.getElementById("deviMantraSanskrit");
  const mantraEnEl = document.getElementById("deviMantraEn");
  if (mantraSanskritEl) mantraSanskritEl.textContent = data.mantraSanskrit;
  if (mantraEnEl) mantraEnEl.textContent = data.mantraEn;

  // Style the mantra box with a subtle border and minimal shadow
  const mantraBox = document.getElementById("mantraBox");
  if (mantraBox) {
    mantraBox.style.borderColor = "var(--line-border)";
    mantraBox.style.boxShadow = "0 4px 16px rgba(50, 30, 65, 0.04)";
  }

  // Update info cards
  document.getElementById("paksha").textContent = isShukla ? "Shukla Paksha / வளர்பிறை" : "Krishna Paksha / தேய்பிறை";
  document.getElementById("tithi").textContent = `${num}. ${num === 15 ? (isShukla ? "Poornima / பௌர்ணமி" : "Amavasya / அமாவாசை") : tithiNames[num - 1]}`;
  document.getElementById("angle").textContent = `${phase.toFixed(2)}°`;

  document.getElementById("meaning").innerHTML = `<strong>Simple meaning:</strong> ${meanings[deviName] || ""}`;
  document.getElementById("sourceNote").innerHTML = num === 15
    ? "<strong>Tradition note:</strong> This calculator follows a mapping in which Poornima/Amavasya are assigned to Maha Tripura Sundari. Other Sri Vidya lineages may present the 15th association differently."
    : "<strong>Tradition note:</strong> This result follows the Krishna/Shukla Paksha Nitya Devi mapping used in this calculator.";

  // Update Pooja & Worship Guide details
  const flowerEl = document.getElementById("poojaFlower");
  const neivedyamEl = document.getElementById("poojaNeivedyam");
  const timeEl = document.getElementById("poojaTime");
  const blessingsEl = document.getElementById("poojaBlessings");

  if (flowerEl) flowerEl.textContent = data.flower || "";
  if (neivedyamEl) neivedyamEl.textContent = data.neivedyam || "";
  if (timeEl) timeEl.textContent = data.bestTime || "";
  if (blessingsEl) blessingsEl.textContent = data.blessings || "";

  // Set active Devi for Japa Player and Yantra download
  currentResultDevi = {
    name: deviName,
    tamil: devi[1],
    sanskritMantra: data.mantraSanskrit,
    enMantra: data.mantraEn,
    color: data.color,
    colorAlt: data.colorAlt
  };
  resetMantraJapa();

  const resultContainer = document.getElementById("result");
  resultContainer.style.display = "block";
  // Re-trigger animation
  resultContainer.style.animation = "none";
  resultContainer.offsetHeight; // reflow
  resultContainer.style.animation = "";
  resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * ══════════════════════════════════════════════════════════
 * AUDIO MANTRA PLAYER & 108 JAPA COUNTER ENGINE
 * ══════════════════════════════════════════════════════════
 */
let audioCtx = null;
let currentResultDevi = null;
let japaState = {
  isPlaying: false,
  currentCount: 0,
  targetCount: 108,
  speed: 1.0,
  timerId: null
};

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesize a resonant sacred bronze temple bell chime
 */
function playTempleBell(freq = 528, duration = 2.5, gainVal = 0.25) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(gainVal, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const partials = [
      { ratio: 1.0, gain: 0.6 },
      { ratio: 2.76, gain: 0.3 },
      { ratio: 4.07, gain: 0.15 },
      { ratio: 5.43, gain: 0.08 }
    ];

    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      const pGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * p.ratio, now);
      pGain.gain.setValueAtTime(p.gain, now);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(pGain);
      pGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + duration);
    });
  } catch (err) {
    console.warn("Temple bell audio notice:", err);
  }
}

/**
 * Recite single mantra iteration via Web Speech Synthesis API
 */
function speakMantraUtterance(mantraText, onFinish) {
  if (!window.speechSynthesis) {
    if (onFinish) onFinish();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(mantraText);
  utterance.rate = japaState.speed === 0.85 ? 0.85 : 1.0;
  utterance.pitch = 1.0;

  // Prefer Indian voices if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang === "hi-IN" || v.lang === "sa-IN" || v.lang === "en-IN" || v.lang.startsWith("ta"));
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onend = () => {
    if (onFinish) onFinish();
  };

  utterance.onerror = (e) => {
    console.warn("Speech utterance notice:", e);
    if (onFinish) onFinish();
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * Japa Loop Step
 */
function stepJapaChant() {
  if (!japaState.isPlaying) return;

  const mantra = (currentResultDevi && currentResultDevi.sanskritMantra) 
    ? currentResultDevi.sanskritMantra 
    : "ॐ ऐं ह्रीं क्लीं नमः";

  setSoundwaveActive(true);

  speakMantraUtterance(mantra, () => {
    if (!japaState.isPlaying) {
      setSoundwaveActive(false);
      return;
    }

    japaState.currentCount++;
    updateJapaUI();

    // Soft chime after each round
    playTempleBell(660, 1.2, 0.15);

    if (japaState.currentCount >= japaState.targetCount) {
      // Completed full Japa target!
      japaState.isPlaying = false;
      setSoundwaveActive(false);
      updatePlayBtnUI();

      // Triumphant 3-bell chime
      playTempleBell(528, 3.5, 0.35);
      setTimeout(() => playTempleBell(660, 3.5, 0.28), 600);
      setTimeout(() => playTempleBell(792, 4.0, 0.22), 1200);

      const banner = document.getElementById("japaCompletionBanner");
      if (banner) {
        banner.classList.remove("hidden");
        banner.textContent = `✨ ${japaState.targetCount} முறை ஜபம் பூர்த்தியடைந்தது! தேவியின் பரிபூரண அருள் உண்டாகட்டும்!`;
      }
      return;
    }

    // Breathing interval before next repetition (approx 550ms)
    japaState.timerId = setTimeout(() => {
      stepJapaChant();
    }, 550);
  });
}

function playMantraJapa() {
  if (japaState.isPlaying) {
    pauseMantraJapa();
    return;
  }

  const banner = document.getElementById("japaCompletionBanner");
  if (banner) banner.classList.add("hidden");

  // If already reached target, reset first
  if (japaState.currentCount >= japaState.targetCount) {
    japaState.currentCount = 0;
    updateJapaUI();
  }

  getAudioContext();
  japaState.isPlaying = true;
  updatePlayBtnUI();

  // Initial bell chime
  playTempleBell(528, 2.0, 0.25);
  setTimeout(() => {
    stepJapaChant();
  }, 400);
}

function pauseMantraJapa() {
  japaState.isPlaying = false;
  if (japaState.timerId) {
    clearTimeout(japaState.timerId);
    japaState.timerId = null;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  setSoundwaveActive(false);
  updatePlayBtnUI();
}

function resetMantraJapa() {
  pauseMantraJapa();
  japaState.currentCount = 0;
  updateJapaUI();
  const banner = document.getElementById("japaCompletionBanner");
  if (banner) banner.classList.add("hidden");
}

function updatePlayBtnUI() {
  const btnText = document.getElementById("playBtnText");
  const playIcon = document.getElementById("playIcon");
  if (!btnText || !playIcon) return;

  if (japaState.isPlaying) {
    btnText.textContent = "Pause Chanting";
    playIcon.innerHTML = `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></svg>`;
  } else {
    btnText.textContent = japaState.currentCount > 0 ? "Resume Chanting" : "Listen & Chant";
    playIcon.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" fill="currentColor"/></svg>`;
  }
}

function setSoundwaveActive(active) {
  const sw = document.getElementById("soundwave");
  if (sw) {
    if (active) sw.classList.add("playing");
    else sw.classList.remove("playing");
  }
}

function updateJapaUI() {
  const currentEl = document.getElementById("japaCurrentCount");
  const maxEl = document.getElementById("japaMaxCount");
  const fillEl = document.getElementById("japaProgressFill");

  if (currentEl) currentEl.textContent = japaState.currentCount;
  if (maxEl) maxEl.textContent = japaState.targetCount;
  if (fillEl) {
    const pct = Math.min(100, (japaState.currentCount / japaState.targetCount) * 100);
    fillEl.style.width = `${pct}%`;
  }
}

/**
 * Initialize Audio Japa Event Listeners
 */
function initAudioJapaListeners() {
  const playBtn = document.getElementById("btnPlayMantra");
  if (playBtn) playBtn.addEventListener("click", playMantraJapa);

  const resetBtn = document.getElementById("btnResetJapa");
  if (resetBtn) resetBtn.addEventListener("click", resetMantraJapa);

  // Target count pill buttons (11, 21, 108)
  const pills = document.querySelectorAll(".target-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const count = parseInt(pill.getAttribute("data-count"), 10) || 108;
      japaState.targetCount = count;
      updateJapaUI();
    });
  });

  // Speed toggle (1.0x <-> 0.85x)
  const speedBtn = document.getElementById("btnSpeedToggle");
  const speedText = document.getElementById("speedText");
  if (speedBtn && speedText) {
    speedBtn.addEventListener("click", () => {
      japaState.speed = japaState.speed === 1.0 ? 0.85 : 1.0;
      speedText.textContent = japaState.speed === 1.0 ? "1.0x" : "0.85x (Slow)";
    });
  }

  // Download Pooja Yantra button
  const downloadBtn = document.getElementById("btnDownloadYantra");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadPoojaYantra);
  }
}

/**
 * Download High-Resolution Printable Sacred Yantra for Pooja Room
 */
function downloadPoojaYantra() {
  if (!currentResultDevi) return;

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1400;
  const ctx = canvas.getContext("2d");

  // Rich royal dark background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 1400);
  bgGrad.addColorStop(0, "#150a24");
  bgGrad.addColorStop(0.5, "#0b0514");
  bgGrad.addColorStop(1, "#12081f");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 1400);

  // Golden border framing
  ctx.strokeStyle = "rgba(212, 160, 23, 0.4)";
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, 1140, 1340);
  ctx.strokeStyle = "rgba(212, 160, 23, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, 1120, 1320);

  // Header Brand
  ctx.font = "bold 20px Cinzel, serif";
  ctx.fillStyle = "#c49a45";
  ctx.textAlign = "center";
  ctx.fillText("✦  REKHA THE TAROT QUEEN  ✦", 600, 95);

  // Devi Title
  ctx.font = "bold 44px Cinzel, serif";
  ctx.fillStyle = "#ffd764";
  ctx.fillText(currentResultDevi.name, 600, 170);

  ctx.font = "bold 34px sans-serif";
  ctx.fillStyle = "#ffaa44";
  ctx.fillText(currentResultDevi.tamil, 600, 225);

  // Draw the Yantra SVG to Canvas
  const yantraSvgEl = document.querySelector("#deviYantra svg");
  if (yantraSvgEl) {
    const svgData = new XMLSerializer().serializeToString(yantraSvgEl);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      // Glow behind Yantra
      const radGlow = ctx.createRadialGradient(600, 620, 50, 600, 620, 380);
      radGlow.addColorStop(0, "rgba(255, 215, 100, 0.35)");
      radGlow.addColorStop(1, "rgba(255, 215, 100, 0)");
      ctx.fillStyle = radGlow;
      ctx.beginPath();
      ctx.arc(600, 620, 380, 0, Math.PI * 2);
      ctx.fill();

      ctx.drawImage(img, 260, 280, 680, 680);

      // Sacred Mantra section below Yantra
      ctx.font = "bold 22px Cinzel, serif";
      ctx.fillStyle = "#c49a45";
      ctx.fillText("SACRED NITYA DEVI MANTRA", 600, 1040);

      ctx.font = "bold 32px 'Noto Serif Devanagari', serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(currentResultDevi.sanskritMantra, 600, 1100);

      ctx.font = "italic 22px 'Outfit', sans-serif";
      ctx.fillStyle = "#e2d5f0";
      ctx.fillText(currentResultDevi.enMantra, 600, 1145);

      // Footer Blessing Note
      ctx.font = "16px 'Outfit', sans-serif";
      ctx.fillStyle = "rgba(255, 215, 100, 0.65)";
      ctx.fillText("Keep this sacred Sri Yantra in your Pooja room for divine blessings, prosperity & peace.", 600, 1260);

      // Trigger download
      const a = document.createElement("a");
      a.download = `${currentResultDevi.name}_Pooja_Yantra.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
      URL.revokeObjectURL(blobURL);
    };
    img.src = blobURL;
  }
}

/**
 * Create a beautiful sacred geometry SVG yantra for the given Devi color
 */
function createYantraSVG(color, colorAlt) {
  const c2 = colorAlt || color;
  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="yrg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${c2}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </radialGradient>
        <filter id="yglow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <!-- Background glow -->
      <circle cx="100" cy="100" r="98" fill="url(#yrg)"/>
      <!-- Outer ring -->
      <circle cx="100" cy="100" r="94" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
      <!-- Lotus petals (16) -->
      ${ Array.from({length: 16}, (_, i) => {
        const angle = i * 22.5 * Math.PI / 180;
        const px = 100 + 71 * Math.sin(angle);
        const py = 100 - 71 * Math.cos(angle);
        return `<ellipse cx="${px.toFixed(2)}" cy="${py.toFixed(2)}" rx="7" ry="17"
          fill="${color}" opacity="0.18"
          transform="rotate(${(i * 22.5).toFixed(1)} ${px.toFixed(2)} ${py.toFixed(2)})"/>`;
      }).join('\n      ') }
      <!-- Inner ring -->
      <circle cx="100" cy="100" r="58" fill="none" stroke="${color}" stroke-width="1" opacity="0.5"/>
      <!-- Upward triangle -->
      <polygon points="100,44 146,126 54,126" fill="${color}" fill-opacity="0.1" stroke="${color}" stroke-width="1.5" opacity="0.85"/>
      <!-- Downward triangle -->
      <polygon points="100,156 54,74 146,74" fill="${c2}" fill-opacity="0.08" stroke="${c2}" stroke-width="1.5" opacity="0.85"/>
      <!-- Inner petals (8) -->
      ${ Array.from({length: 8}, (_, i) => {
        const angle = i * 45 * Math.PI / 180;
        const px = 100 + 38 * Math.sin(angle);
        const py = 100 - 38 * Math.cos(angle);
        return `<ellipse cx="${px.toFixed(2)}" cy="${py.toFixed(2)}" rx="5" ry="12"
          fill="${c2}" opacity="0.3"
          transform="rotate(${(i * 45).toFixed(1)} ${px.toFixed(2)} ${py.toFixed(2)})"/>`;
      }).join('\n      ') }
      <!-- Center circle -->
      <circle cx="100" cy="100" r="20" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="1.5" opacity="0.7"/>
      <!-- Bindu -->
      <circle cx="100" cy="100" r="5" fill="${color}" opacity="0.95" filter="url(#yglow)"/>
    </svg>
  `;
}

/**
 * ══════════════════════════════════════════════════════════
 * THREE.JS 3D CELESTIAL STARDUST PARTICLES ANIMATION
 * ══════════════════════════════════════════════════════════
 */
let threeScene, threeCamera, threeRenderer, threeAnimId;
let sacredGroup, orbitalParticles;
let isThreeInitialized = false;

function initThreeDeviAnimation() {
  const canvas = document.getElementById("threeDeviCanvas");
  if (!canvas || typeof THREE === "undefined") return;

  try {
    const width = window.innerWidth;
    const height = window.innerHeight;

    threeScene = new THREE.Scene();
    threeCamera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    threeCamera.position.z = 400;

    threeRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    threeRenderer.setSize(width, height);
    threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    sacredGroup = new THREE.Group();
    threeScene.add(sacredGroup);

    // 3D Glowing Celestial Stardust Particle Swarm (Dots)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleData = [];

    const goldColor = new THREE.Color(0xffd764);
    const pinkColor = new THREE.Color(0xff80ab);
    const lightYellow = new THREE.Color(0xfff59d);

    for (let i = 0; i < particleCount; i++) {
      const radius = 90 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const speed = 0.005 + Math.random() * 0.009;

      positions[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);

      const chosenColor = i % 3 === 0 ? goldColor : (i % 3 === 1 ? pinkColor : lightYellow);
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      particleData.push({ radius, theta, phi, speed, yWave: Math.random() * Math.PI * 2 });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // High-resolution soft circular sprite texture for clean glowing dots
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pCtx = particleCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255,255,255,1)');
    radGrad.addColorStop(0.35, 'rgba(255,225,120,0.95)');
    radGrad.addColorStop(1, 'rgba(255,225,120,0)');
    pCtx.fillStyle = radGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 9,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    orbitalParticles = new THREE.Points(particleGeo, particleMat);
    orbitalParticles.userData = { particleData };
    sacredGroup.add(orbitalParticles);

    window.addEventListener("resize", onThreeResize);
    isThreeInitialized = true;
  } catch (err) {
    console.warn("Three.js initialization notice:", err);
  }
}

function onThreeResize() {
  if (!threeRenderer || !threeCamera) return;
  const width = window.innerWidth;
  const height = window.innerHeight;
  threeCamera.aspect = width / height;
  threeCamera.updateProjectionMatrix();
  threeRenderer.setSize(width, height);
}

function animateThreeDevi(time) {
  if (!threeRenderer || !threeScene || !threeCamera) return;

  const t = time * 0.001;

  // Swirl particles (dots) in 3D celestial orbits
  if (orbitalParticles && orbitalParticles.userData.particleData) {
    const pos = orbitalParticles.geometry.attributes.position.array;
    const pData = orbitalParticles.userData.particleData;
    for (let i = 0; i < pData.length; i++) {
      const p = pData[i];
      p.theta += p.speed;
      const yOffset = Math.sin(t * 1.4 + p.yWave) * 12;

      pos[i * 3] = p.radius * Math.cos(p.phi) * Math.cos(p.theta);
      pos[i * 3 + 1] = p.radius * Math.sin(p.phi) + yOffset;
      pos[i * 3 + 2] = p.radius * Math.cos(p.phi) * Math.sin(p.theta);
    }
    orbitalParticles.geometry.attributes.position.needsUpdate = true;
  }

  threeRenderer.render(threeScene, threeCamera);
  threeAnimId = requestAnimationFrame(animateThreeDevi);
}

function updateParticleColorsForTheme() {
  if (!orbitalParticles || !orbitalParticles.geometry || !orbitalParticles.geometry.attributes.color) return;
  const isDark = (document.documentElement.getAttribute("data-theme") || "light") === "dark";
  const colors = orbitalParticles.geometry.attributes.color.array;
  const count = colors.length / 3;

  const goldColor = isDark ? new THREE.Color(0xffd764) : new THREE.Color(0xb8860b);
  const pinkColor = isDark ? new THREE.Color(0xff80ab) : new THREE.Color(0x9333ea);
  const accentColor = isDark ? new THREE.Color(0xfff59d) : new THREE.Color(0xd97706);

  for (let i = 0; i < count; i++) {
    const chosen = i % 3 === 0 ? goldColor : (i % 3 === 1 ? pinkColor : accentColor);
    colors[i * 3] = chosen.r;
    colors[i * 3 + 1] = chosen.g;
    colors[i * 3 + 2] = chosen.b;
  }
  orbitalParticles.geometry.attributes.color.needsUpdate = true;
}

function startThreeDeviAnimation() {
  if (!isThreeInitialized) {
    initThreeDeviAnimation();
  }
  updateParticleColorsForTheme();
  if (threeRenderer) {
    onThreeResize();
    cancelAnimationFrame(threeAnimId);
    threeAnimId = requestAnimationFrame(animateThreeDevi);
  }
}

function stopThreeDeviAnimation() {
  if (threeAnimId) {
    cancelAnimationFrame(threeAnimId);
    threeAnimId = null;
  }
}

/**
 * Show loading overlay & initiate Three.js animation
 */
function showLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.classList.add("active");
    overlay.removeAttribute("aria-hidden");
  }
  startThreeDeviAnimation();
}

/**
 * Hide loading overlay & pause Three.js render loop
 */
function hideLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
  }
  stopThreeDeviAnimation();
}

/**
 * Initialize Nitya Devi reference mapping table
 */
function initMappingTable() {
  const mapTable = document.getElementById("mapTable");
  if (!mapTable) return;
  
  let tableRows = "";
  for (let i = 0; i < 15; i++) {
    const tithiText = i === 14 ? "15. Poornima / Amavasya" : `${i + 1}. ${tithiNames[i]}`;
    tableRows += `<tr><td>${tithiText}</td><td>${krishna[i][0]}</td><td>${shukla[i][0]}</td></tr>`;
  }
  mapTable.innerHTML = tableRows;
}

/**
 * Bind custom picker triggers on input wrapper click
 */
function bindCustomPickerTriggers() {
  const tobInput = document.getElementById("tob");
  if (!tobInput) return;
  const wrapper = tobInput.closest(".input-wrapper");

  const triggerPicker = (e) => {
    if (typeof tobInput.showPicker === "function") {
      try {
        tobInput.showPicker();
      } catch (err) {
        tobInput.focus();
      }
    } else {
      tobInput.focus();
    }
  };

  if (wrapper) {
    wrapper.addEventListener("click", triggerPicker);
  }
  tobInput.addEventListener("click", triggerPicker);
}

/**
 * Real-time error clearing on user input
 */
function bindRealtimeErrorClearing() {
  const fields = [
    { inputId: "tob", errorMsgId: "tobError" },
    { inputId: "customTz", errorMsgId: "customTzError" }
  ];

  fields.forEach(({ inputId, errorMsgId }) => {
    const input = document.getElementById(inputId);
    const errorMsg = document.getElementById(errorMsgId);
    if (!input) return;

    const clearThisError = () => {
      const wrapper = input.closest(".input-wrapper");
      if (wrapper) wrapper.classList.remove("has-error");
      if (errorMsg) {
        errorMsg.classList.remove("visible");
        errorMsg.innerHTML = "";
      }
    };

    input.addEventListener("input", clearThisError);
    input.addEventListener("change", clearThisError);
  });
}

// Bind events on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  setTheme(getPreferredTheme());
  initMappingTable();
  initCustomCalendar();
  initCustomTimezoneDropdown();
  bindCustomPickerTriggers();
  bindRealtimeErrorClearing();
  initAudioJapaListeners();
  
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
  
  const calcBtn = document.getElementById("calcBtn");
  if (calcBtn) {
    calcBtn.addEventListener("click", calculateTithi);
  }
});
