/**
 * Result Page Handler — Tithi Devathai Calculator
 * Created for REKHA THE TAROT QUEEN
 */

// Global State
let currentResultDevi = null;

// Extended Devi Data with dual-language information
const extendedDeviDetails = {
  "Kameshvari": {
    color: "#e91e8c",
    colorAlt: "#ff6ec7",
    glow: "rgba(233,30,140,0.45)",
    image: "images/kameshvari.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं काम्येश्वर्यै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் காமேஸ்வர்யை நமஹ",
    mantraEn: "Om Aim Hrim Klim Kameshvaryai Namah",
    element: "🌺 Divine Desire, Attraction & Auspicious Beginnings",
    meaningEn: "Associated with divine desire, attraction, fulfilment and auspicious beginnings.",
    meaningTa: "இறை விருப்பம், ஈர்ப்பு சக்தி, புதிய சுப காரியங்களின் தொடக்கம் மற்றும் ஆசைகள் நிறைவேறும் தெய்வீக ஆற்றல் கொண்ட தேவி.",
    flower: "செம்பருத்தி (Red Hibiscus) & ரோஜா (Rose)",
    neivedyam: "கற்கண்டு பால் (Rock Sugar Milk) & மாதுளை பழம் (Pomegranate)",
    bestTime: "வெள்ளிக்கிழமை சுக்ர ஹோரை (Friday Venus Horai, 6-7 AM / 8-9 PM)",
    blessings: "அன்பு, ஈர்ப்பு சக்தி, திருமண வரன் கூடுதல், இல்லற தாம்பத்ய இன்பம்"
  },
  "Bhagamalini": {
    color: "#f59e0b",
    colorAlt: "#fcd34d",
    glow: "rgba(245,158,11,0.45)",
    image: "images/bhagamalini.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं भगमालिन्यै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் பகமாலினியை நமஹ",
    mantraEn: "Om Aim Hrim Klim Bhagamaliniyai Namah",
    element: "🌸 Abundance, Creative Shakti & Life Force",
    meaningEn: "Associated with creative Shakti, abundance, nurturing and life-force.",
    meaningTa: "படைப்பு சக்தி, வளம், ஆரோக்கியம், கர்ப்ப பாதுகாப்பு மற்றும் ஜீவ ரக்ஷை அருளும் தேவி.",
    flower: "மஞ்சள் சாமந்தி (Marigold) & செந்தாமரை (Red Lotus)",
    neivedyam: "சர்க்கரை பொங்கல் (Sweet Pongal) & தேன் (Honey)",
    bestTime: "செவ்வாய் & ஞாயிறு காலை சூரிய உதய நேரம் (Sunrise)",
    blessings: "தன தான்ய விருத்தி, கர்ப்ப தோஷ நிவர்த்தி, சந்தான பாக்கியம், ஆயுள் பலம்"
  },
  "Nityaklinna": {
    color: "#3b82f6",
    colorAlt: "#93c5fd",
    glow: "rgba(59,130,246,0.45)",
    image: "images/nityaklinna.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं नित्यक्लिन्नायै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் நித்யக்லின்நாயை நமஹ",
    mantraEn: "Om Aim Hrim Klim Nityaklinnayai Namah",
    element: "💧 Devotion, Pure Love & Compassion",
    meaningEn: "Associated with devotion, compassion and inner surrender.",
    meaningTa: "பக்தி, அளவற்ற கருணை, குடும்பத்தில் அன்பும் ஒற்றுமையும் பெருக அருளும் கருணாம்பிகை.",
    flower: "வெண் மல்லிகை (Jasmine) & அல்லி மலர் (Water Lily)",
    neivedyam: "பால் பாயாசம் (Kheer / Milk Payasam) & தயிர் சாதம்",
    bestTime: "திங்கட்கிழமை இரவு சந்திர ஹோரை (Monday Moon Horai, 8-9 PM)",
    blessings: "மன அமைதி, குடும்ப ஒற்றுமை, தீராத மனஸ்தாபங்கள் & பகைகள் விலகுதல்"
  },
  "Bherunda": {
    color: "#dc2626",
    colorAlt: "#fca5a5",
    glow: "rgba(220,38,38,0.45)",
    image: "images/bherunda.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं भेरुण्डायै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் பேருண்டாயை நமஹ",
    mantraEn: "Om Aim Hrim Klim Bherundayai Namah",
    element: "🔱 Courage, Protection & Transformative Strength",
    meaningEn: "Associated with courage, protection and transformative strength.",
    meaningTa: "தைரியம், பாதுகாப்பு, எதிரிகள் தொல்லை மற்றும் துஷ்ட சக்திகளிடமிருந்து காக்கும் தீவிர சக்தி தேவி.",
    flower: "சிவப்பு அரளி (Red Oleander) & செவ்வந்தி",
    neivedyam: "மிளகு வடை, கார சுண்டல் & எள் உருண்டை",
    bestTime: "செவ்வாய்க்கிழமை ராகு காலம் அல்லது பிரதோஷ அந்தி வேளை",
    blessings: "பயம் நீங்குதல், துஷ்ட சக்தி & எதிரிகள் பாதுகாப்பு, வழக்குகளில் வெற்றி"
  },
  "Vahnivasini": {
    color: "#f97316",
    colorAlt: "#fdba74",
    glow: "rgba(249,115,22,0.45)",
    image: "images/vahnivasini.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं वह्निवासिन्यै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் வஹ்னிவாசின்யை நமஹ",
    mantraEn: "Om Aim Hrim Klim Vahnivasiniyai Namah",
    element: "🔥 Purification, Vitality & Radiant Energy",
    meaningEn: "Associated with purification, vitality and spiritual illumination.",
    meaningTa: "தூய்மை, தேக காந்தி, ஆத்ம ஞானம் மற்றும் சுடரொளி ஆற்றல் வழங்கி அருளும் தேவி.",
    flower: "பவளமல்லி & செவ்வரளி மலர்",
    neivedyam: "குங்குமப்பூ பால் & நெய் அப்பம் (Ney Appam)",
    bestTime: "ஞாயிற்றுக்கிழமை பகல் உச்சி வேளை (12:00 - 1:00 PM)",
    blessings: "சுய பிரகாசம், தேக ஆரோக்கியம், ஆன்மீக ஞானம், குண்டலினி விழிப்புணர்வு"
  },
  "Maha Vajreshvari": {
    color: "#d4a017",
    colorAlt: "#fde68a",
    glow: "rgba(212,160,23,0.45)",
    image: "images/mahavajreshvari.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं महावज्रेश्वर्यै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் மஹா வஜ்ரேஸ்வர்யை நமஹ",
    mantraEn: "Om Aim Hrim Klim Mahavajreshvaryai Namah",
    element: "⚡ Firmness, Prosperity & Indestructible Power",
    meaningEn: "Associated with firmness, prosperity and protection.",
    meaningTa: "வஜ்ரம் போன்ற ஸ்திரத்தன்மை, பெரும் செல்வம், தொழில் வளர்ச்சி மற்றும் கடன் தீர்க்கும் தேவி.",
    flower: "மஞ்சள் தாமரை & நந்தியாவட்டை மலர்",
    neivedyam: "எலுமிச்சை சாதம், மாம்பழம் & கற்கண்டு",
    bestTime: "வியாழக்கிழமை குரு ஹோரை (Thursday Jupiter Horai, 6-7 AM / 1-2 PM)",
    blessings: "வியாபார ஸ்திரத்தன்மை, பெரும் செல்வம் ஈர்ப்பு, தீராத கடன் நிவர்த்தி"
  },
  "Shivaduti": {
    color: "#7c3aed",
    colorAlt: "#c4b5fd",
    glow: "rgba(124,58,237,0.45)",
    image: "images/shivaduti.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं शिवदूत्यै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் சிவதூத்யை நமஹ",
    mantraEn: "Om Aim Hrim Klim Shivadutyai Namah",
    element: "🌑 Fearless Transformation & Removal of Negativity",
    meaningEn: "Associated with fearless transformation and removal of negativity.",
    meaningTa: "பயமின்மை, தீராத நோய் மற்றும் கஷ்டங்கள் நீக்கி சுப மாற்றங்கள் அருளும் தூதுவி.",
    flower: "நீல சங்குப்பூ (Aparajita) & வில்வ இலை (Bilva)",
    neivedyam: "பஞ்சாமிர்தம், பேரீச்சம்பழம் & உளுந்து வடை",
    bestTime: "திங்கட்கிழமை அல்லது சதுர்தசி அந்தி நேரம் (Twilight Sandhya)",
    blessings: "கடன் சுமை தீருதல், கொடிய நோய் நீக்கம், மாயை விலகி தெளிவு பெறுதல்"
  },
  "Tvarita": {
    color: "#0d9488",
    colorAlt: "#5eead4",
    glow: "rgba(13,148,136,0.45)",
    image: "images/tvarita.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं त्वरितायै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் த்வரிதாயை நமஹ",
    mantraEn: "Om Aim Hrim Klim Tvaritayai Namah",
    element: "💨 Swiftness, Speed & Quick Resolution",
    meaningEn: "Associated with swiftness, movement and overcoming delay.",
    meaningTa: "வேகம், காரிய தாமதங்கள் நீக்குதல், உடனே வேலை வாய்ப்பு மற்றும் திருமணம் கை கூட அருளும் தேவி.",
    flower: "துளசி (Tulsi), மரிக்கொழுந்து & பச்சை மலர்கள்",
    neivedyam: "பச்சை பயறு சுண்டல் & வெண்பொங்கல் (Ghee Pongal)",
    bestTime: "புதன்கிழமை காலை புதன் ஹோரை (Wednesday Mercury Horai, 6-7 AM)",
    blessings: "காரிய தாமதங்கள் உடனே நீங்குதல், விரைவான வேலை வாய்ப்பு, சுப காரிய வேகம்"
  },
  "Kulasundari": {
    color: "#db2777",
    colorAlt: "#f9a8d4",
    glow: "rgba(219,39,119,0.45)",
    image: "images/kulasundari.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं कुलसुन्दर्यै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் குலசுந்தர்யை நமஹ",
    mantraEn: "Om Aim Hrim Klim Kulasundaryai Namah",
    element: "📿 Higher Knowledge, Intellect & Wisdom",
    meaningEn: "Associated with knowledge, refinement and higher wisdom.",
    meaningTa: "கல்வி, உயர்ந்த அறிவு, பேச்சுத் திறன், கலை மற்றும் ஞான சித்தி அருளும் தேவி.",
    flower: "வெண்தாமரை (White Lotus) & முல்லை மலர்",
    neivedyam: "நெய் சாதம் & ஏலக்காய் பாதாம் பால்",
    bestTime: "வியாழக்கிழமை காலை பிரம்ம முகூர்த்தம் (4:30 - 6:00 AM)",
    blessings: "கல்வி தேர்ச்சி, வாக்கு வன்மை, நுண்ணறிவு, கலை மற்றும் ஆராய்ச்சி ஞானம்"
  },
  "Nitya": {
    color: "#64748b",
    colorAlt: "#cbd5e1",
    glow: "rgba(100,116,139,0.45)",
    image: "images/nitya.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं नित्यायै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் நித்யாயை நமஹ",
    mantraEn: "Om Aim Hrim Klim Nityayai Namah",
    element: "🌙 Steadiness, Focus & Eternal Peace",
    meaningEn: "Associated with steadiness, focus and continuity.",
    meaningTa: "மன ஸ்திரத்தன்மை, குடும்ப அமைதி, யோக சித்தி மற்றும் பயமற்ற வாழ்வு அருளும் நித்ய சக்தி.",
    flower: "மருதாணி பூ & வெண்தாமரை",
    neivedyam: "வெள்ளை சுண்டல் & நாட்டு வாழைப்பழம்",
    bestTime: "சனிக்கிழமை காலை அல்லது பௌர்ணமி முழு நிலவு நாள்",
    blessings: "நிலையான வாழ்வு, மன சஞ்சலம் விலகுதல், பூரண அமைதி, யோக சித்தி"
  },
  "Nilapataka": {
    color: "#4338ca",
    colorAlt: "#a5b4fc",
    glow: "rgba(67,56,202,0.45)",
    image: "images/nilapataka.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं नीलपताकायै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் நீலபதாகாயை நமஹ",
    mantraEn: "Om Aim Hrim Klim Nilapatakayai Namah",
    element: "🏳️ Victory Over Obstacles & Triumph",
    meaningEn: "Associated with victory over obstacles and discipline.",
    meaningTa: "தடைகள் நீக்கி காரிய வெற்றி, வழக்கு மற்றும் தொழில் போட்டிகளில் வெற்றி அருளும் தேவி.",
    flower: "நீலோத்பலம் (Blue Water Lily) & நீல சங்குப்பூ",
    neivedyam: "எள் சாதம் & உலர் திராட்சை பழங்கள்",
    bestTime: "சனிக்கிழமை சனி ஹோரை அல்லது அந்தி மாலை வேளை",
    blessings: "எதிரிகள் தொல்லை நீங்குதல், தொழில் போட்டிகளில் அபார வெற்றி, நற்புகழ்"
  },
  "Vijaya": {
    color: "#059669",
    colorAlt: "#6ee7b7",
    glow: "rgba(5,150,105,0.45)",
    image: "images/vijaya.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं विजयायै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் விஜயாயை நமஹ",
    mantraEn: "Om Aim Hrim Klim Vijayayai Namah",
    element: "🌿 Ultimate Success & Supreme Achievement",
    meaningEn: "Associated with success and ultimate achievement in all endeavors.",
    meaningTa: "தொட்ட காரியங்களில் பூரண வெற்றி, பதவி உயர்வு மற்றும் சுப லாபங்கள் அருளும் வெற்ற நாயகி.",
    flower: "செவ்வரளி & துளசி மாலை",
    neivedyam: "சர்க்கரை பொங்கல் & அவல் பாயாசம்",
    bestTime: "வெள்ளிக்கிழமை பகல் 12:00 - 1:30 PM",
    blessings: "தொட்ட காரியங்களில் பூரண வெற்றி, பதவி உயர்வு, புதிய முயற்சிகளில் லாபம்"
  },
  "Sarvamangala": {
    color: "#b45309",
    colorAlt: "#fcd34d",
    glow: "rgba(180,83,9,0.45)",
    image: "images/sarvamangala.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं सर्वमङ्गलायै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் சர்வமங்களாயை நமஹ",
    mantraEn: "Om Aim Hrim Klim Sarvamangalayai Namah",
    element: "🌞 All-Auspiciousness & Family Harmony",
    meaningEn: "Associated with auspiciousness, harmony and total well-being.",
    meaningTa: "சர்வ மங்கள யோகம், தீர்க்க சுமங்கலி பாக்கியம் மற்றும் சகல ஐஸ்வர்யங்களும் அருளும் தேவி.",
    flower: "மஞ்சள் ரோஜா & மணமுள்ள மல்லிகை",
    neivedyam: "ரவா கேசரி & வெற்றிலை பாக்கு பழம்",
    bestTime: "செவ்வாய் & வெள்ளி சுமங்கலி பூஜை நேரம் (காலை 9:00 - 10:30 AM)",
    blessings: "மாங்கல்ய பலம், சர்வ மங்கள யோகம், குழந்தை செல்வம், சௌபாக்கிய வாழ்வு"
  },
  "Jwalamalini": {
    color: "#ef4444",
    colorAlt: "#fca5a5",
    glow: "rgba(239,68,68,0.45)",
    image: "images/jwalamalini.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं ज्वालामालिन्यै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் ஜ்வாலாமாலினியை நமஹ",
    mantraEn: "Om Aim Hrim Klim Jwalamaliniyai Namah",
    element: "🔥 Fiery Protection & Spiritual Shield",
    meaningEn: "Associated with fiery protection, warding off evil eye and negative energies.",
    meaningTa: "கண் திருஷ்டி நீக்கம், பில்லி சூன்ய பயம் நீக்கி பாதுகாக்கும் ஜ்வாலா சக்தி தேவி.",
    flower: "செந்தாமரை & அடர் சிவப்பு ரோஜா",
    neivedyam: "தித்திப்பு நெய் அப்பம் & வெல்ல பாயாசம்",
    bestTime: "செவ்வாய்க்கிழமை இரவு 8:00 - 9:00 PM",
    blessings: "கண் திருஷ்டி விலகுதல், பில்லி சூன்ய பயம் நீங்குதல், சுடரொளி பாதுகாப்பு"
  },
  "Chitra": {
    color: "#0284c7",
    colorAlt: "#7dd3fc",
    glow: "rgba(2,132,199,0.45)",
    image: "images/chitra.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं चित्रायै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் சித்ராயை நமஹ",
    mantraEn: "Om Aim Hrim Klim Chitrayai Namah",
    element: "🎨 Multi-faceted Beauty, Art & Creativity",
    meaningEn: "Associated with multifaceted beauty, artistic talents and charm.",
    meaningTa: "அழகு, கலை படைப்பாற்றல், வசீகரம் மற்றும் புதிய சுப யோசனைகள் வெற்றி பெற அருளும் தேவி.",
    flower: "பலவண்ண நறுமண மலர்கள் (Colorful Flowers)",
    neivedyam: "பழ சாலட், தேன் கலந்த தினை மாவு & அவல் நைவேத்தியம்",
    bestTime: "புதன்கிழமை மாலை 5:00 - 6:30 PM",
    blessings: "கவர்ச்சி சக்தி, கலை படைப்பாற்றல், புதிய யோசனைகள் பலித்தல், செல்வாக்கு"
  },
  "Maha Tripura Sundari": {
    color: "#9333ea",
    colorAlt: "#d8b4fe",
    glow: "rgba(147,51,234,0.45)",
    image: "images/maha_tripura_sundari.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं श्रीं महात्रिपुरसुन्दर्यै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் ஸ்ரீம் மஹா திரிபுரசுந்தர்யை நமஹ",
    mantraEn: "Om Aim Hrim Shrim Maha Tripura Sundaryai Namah",
    element: "👑 Supreme Completeness, Lalita Principle & Liberation",
    meaningEn: "Represents fullness, completeness and the supreme Lalita principle.",
    meaningTa: "சர்வ பரிபூரணம், மோட்சம், ஸ்ரீ வித்யா பரமேஸ்வரியின் பேரருள் மற்றும் சகல யோகங்கள்.",
    flower: "செந்தாமரை (Red Lotus) & கடம்ப மலர்",
    neivedyam: "பஞ்சாமிர்தம், பருப்பு பாயாசம் & லட்டு",
    bestTime: "பௌர்ணமி இரவு நிலவு ஒளி நேரம் (Full Moon Night)",
    blessings: "மோட்சம், சர்வ ஐஸ்வர்யம், ஸ்ரீ லலிதா பரமேஸ்வரியின் பரிபூரண பேரருள்"
  }
};

// Initialize Result Page Logic
document.addEventListener("DOMContentLoaded", () => {
  // Theme initialization
  if (typeof getPreferredTheme === "function") {
    setTheme(getPreferredTheme());
  }

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn && typeof toggleTheme === "function") {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Parse Birth Parameters from URL or SessionStorage
  const params = new URLSearchParams(window.location.search);
  const dob = params.get("dob") || sessionStorage.getItem("tithi_dob") || "1995-10-15";
  const tob = params.get("tob") || sessionStorage.getItem("tithi_tob") || "08:30";
  const tz = params.get("tz") || sessionStorage.getItem("tithi_tz") || "Asia/Kolkata";
  const place = params.get("place") || sessionStorage.getItem("tithi_place") || "Chennai, Tamil Nadu, India";

  // Update Summary Chip Bar
  const resDobEl = document.getElementById("resDob");
  const resTobEl = document.getElementById("resTob");
  const resPlaceEl = document.getElementById("resPlace");
  const resTzEl = document.getElementById("resTz");
  const badgeEl = document.getElementById("reportDateBadge");

  if (resDobEl) resDobEl.textContent = dob;
  if (resTobEl) resTobEl.textContent = format12HourTime(tob);
  if (resPlaceEl) resPlaceEl.textContent = place;
  if (resTzEl) resTzEl.textContent = tz;
  if (badgeEl) {
    const todayStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    badgeEl.innerHTML = `<span>ASTRONOMICAL CALCULATION REPORT &nbsp;·&nbsp; ${todayStr}</span>`;
  }

  // Run Astronomical Calculation
  calculateAndRenderResult(dob, tob, tz);

  // Bind Actions
  initJapaAudioEngine();
  bindYantraDownload();
  bindPrintReportAction();
});

/**
 * Format 24-hour time "14:30" to 12-hour "02:30 PM"
 */
function format12HourTime(timeStr) {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  const strHours = String(hours).padStart(2, "0");
  return `${strHours}:${minutes} ${ampm}`;
}

/**
 * Perform Astronomy Engine Lunar Calculation and populate all Result Page DOM nodes
 */
function calculateAndRenderResult(dob, tob, tz) {
  let dt;
  if (typeof luxon !== "undefined" && luxon.DateTime) {
    dt = luxon.DateTime.fromISO(`${dob}T${tob}`, { zone: tz });
  } else {
    dt = new Date(`${dob}T${tob}`);
  }

  const jsDate = dt.toJSDate ? dt.toJSDate() : new Date(dt);

  let phase = 0;
  if (typeof Astronomy !== "undefined" && Astronomy.MoonPhase) {
    phase = Astronomy.MoonPhase(jsDate);
  } else {
    // Fallback calculation if library fails to load
    const knownNewMoon = new Date("2026-01-18T18:00:00Z").getTime();
    const diffDays = (jsDate.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
    const synodicMonth = 29.530588;
    phase = ((diffDays % synodicMonth) / synodicMonth) * 360;
  }

  phase = ((phase % 360) + 360) % 360;

  const isShukla = phase < 180;
  const within = isShukla ? phase : phase - 180;

  let num = Math.floor(within / 12) + 1;
  num = Math.max(1, Math.min(15, num));

  const map = isShukla ? shukla : krishna;
  const devi = map[num - 1];
  const deviName = devi[0];

  const data = extendedDeviDetails[deviName] || {
    color: "#9333ea",
    colorAlt: "#d8b4fe",
    glow: "rgba(147,51,234,0.45)",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं श्रीं नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் ஸ்ரீம் நமஹ",
    mantraEn: "Om Aim Hrim Klim Shrim Namah",
    element: "👑 Supreme Cosmic Grace",
    meaningEn: meanings[deviName] || "",
    meaningTa: "தேவியின் பரிபூரண அருளும் சுப பலன்களும்.",
    flower: "செந்தாமரை & நறுமண மலர்கள்",
    neivedyam: "சர்க்கரை பொங்கல் & நெய் தீபம்",
    bestTime: "பிரம்ம முகூர்த்தம் & அந்தி வேளை",
    blessings: "சகல ஐஸ்வர்யங்களும் சுப யோகங்களும்"
  };

  currentResultDevi = {
    name: deviName,
    tamil: devi[1],
    num: num,
    isShukla: isShukla,
    phase: phase,
    data: data
  };

  // Populate Spotlight Hero
  const nameEl = document.getElementById("resDeviName");
  const tamilEl = document.getElementById("resDeviTamil");
  const elemEl = document.getElementById("resDeviElement");
  const tithiEl = document.getElementById("resTithiName");
  const pakshaEl = document.getElementById("resPaksha");
  const angleEl = document.getElementById("resAngle");

  if (nameEl) {
    nameEl.textContent = `${deviName} Nitya`;
  }
  if (tamilEl) tamilEl.textContent = devi[1];
  if (elemEl) elemEl.textContent = data.element;

  const tithiLabel = num === 15 ? (isShukla ? "Poornima / பௌர்ணமி" : "Amavasya / அமாவாசை") : tithiNames[num - 1];
  if (tithiEl) tithiEl.textContent = `${num}. ${tithiLabel}`;
  if (pakshaEl) pakshaEl.textContent = isShukla ? "Shukla Paksha / வளர்பிறை" : "Krishna Paksha / தேய்பிறை";
  if (angleEl) angleEl.textContent = `${phase.toFixed(2)}°`;

  // Render Image / Yantra Frame
  const photoFrame = document.getElementById("spotlightPhotoFrame");
  const imgEl = document.getElementById("resDeviImage");
  const glowEl = document.getElementById("spotlightGlow");

  if (photoFrame) {
    photoFrame.style.setProperty("--devi-color", data.color);
    photoFrame.style.setProperty("--devi-glow", data.glow);
  }
  if (glowEl) {
    glowEl.style.background = `radial-gradient(circle, ${data.glow} 0%, transparent 70%)`;
  }

  if (imgEl) {
    imgEl.src = data.image;
    imgEl.alt = `${deviName} - Tithi Devathai`;
    imgEl.onerror = () => {
      // Fallback to Yantra SVG if photo image is missing
      if (photoFrame) {
        photoFrame.innerHTML = `
          <div class="devi-yantra-svg-wrap" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px;">
            ${createYantraSVG(data.color, data.colorAlt)}
          </div>
        `;
      }
    };
  }

  // Populate Meaning & Significance
  const meaningEnEl = document.getElementById("resMeaningEn");
  const meaningTaEl = document.getElementById("resMeaningTa");
  const sourceNoteEl = document.getElementById("resSourceNote");

  if (meaningEnEl) meaningEnEl.textContent = data.meaningEn;
  if (meaningTaEl) meaningTaEl.textContent = data.meaningTa;
  if (sourceNoteEl) {
    sourceNoteEl.innerHTML = num === 15
      ? "<strong>Tradition note:</strong> This result follows the Sri Vidya mapping in which Poornima/Amavasya are assigned to Maha Tripura Sundari."
      : "<strong>Tradition note:</strong> Calculated using standard astronomical Moon-Sun longitude separation (12° per Tithi).";
  }

  // Populate Worship Attributes
  const flowerEl = document.getElementById("resFlower");
  const neivedyamEl = document.getElementById("resNeivedyam");
  const bestTimeEl = document.getElementById("resBestTime");
  const blessingsEl = document.getElementById("resBlessings");

  if (flowerEl) flowerEl.textContent = data.flower;
  if (neivedyamEl) neivedyamEl.textContent = data.neivedyam;
  if (bestTimeEl) bestTimeEl.textContent = data.bestTime;
  if (blessingsEl) blessingsEl.textContent = data.blessings;

  // Populate Mantras
  const mantraSktEl = document.getElementById("resMantraSanskrit");
  const mantraTamEl = document.getElementById("resMantraTamil");
  const mantraEnEl = document.getElementById("resMantraEn");

  if (mantraSktEl) mantraSktEl.textContent = data.mantraSanskrit;
  if (mantraTamEl) mantraTamEl.textContent = data.mantraTamil;
  if (mantraEnEl) mantraEnEl.textContent = data.mantraEn;

  // Render SVG Yantra in Card 5
  const yantraCardBox = document.getElementById("deviYantra");
  if (yantraCardBox) {
    yantraCardBox.innerHTML = createYantraSVG(data.color, data.colorAlt);
  }
}

/**
 * Interactive 108 Japa Audio Player Engine with Web Audio API Tone & Bell Chimes
 */
let japaCount = 0;
let japaTimer = null;
let japaSpeed = 1.0; // 1.0x, 1.5x, 2.0x
let isJapaPlaying = false;
let audioContext = null;

function initJapaAudioEngine() {
  const btnStart = document.getElementById("btnStartJapa");
  const btnReset = document.getElementById("btnResetJapa");
  const btnSpeed = document.getElementById("btnSpeedToggle");
  const speedText = document.getElementById("speedText");

  if (!btnStart) return;

  btnStart.addEventListener("click", () => {
    if (isJapaPlaying) {
      pauseJapa();
    } else {
      startJapa();
    }
  });

  if (btnReset) {
    btnReset.addEventListener("click", resetJapa);
  }

  if (btnSpeed && speedText) {
    btnSpeed.addEventListener("click", () => {
      if (japaSpeed === 1.0) japaSpeed = 1.5;
      else if (japaSpeed === 1.5) japaSpeed = 2.0;
      else japaSpeed = 1.0;
      speedText.textContent = `${japaSpeed.toFixed(1)}x`;

      if (isJapaPlaying) {
        pauseJapa();
        startJapa();
      }
    });
  }
}

function startJapa() {
  const btnStart = document.getElementById("btnStartJapa");
  const statusMsg = document.getElementById("japaStatusMessage");

  isJapaPlaying = true;
  if (btnStart) {
    btnStart.innerHTML = `
      <svg class="icon icon-stroke" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
      <span>Pause Japa Chant</span>
    `;
    btnStart.classList.add("playing");
  }

  if (statusMsg) {
    statusMsg.textContent = "Chanting sacred Moola Mantra with cosmic temple bell chime...";
    statusMsg.style.color = "var(--gold-light)";
  }

  // Base interval per chant (approx 4 seconds per mantra cycle)
  const intervalMs = (4000) / japaSpeed;

  // Initial chime and count
  playChantCycle();

  japaTimer = setInterval(() => {
    playChantCycle();
  }, intervalMs);
}

function playChantCycle() {
  if (japaCount >= 108) {
    finishJapa();
    return;
  }

  japaCount++;
  updateJapaUI();
  playTempleBellChime();
}

function pauseJapa() {
  isJapaPlaying = false;
  if (japaTimer) clearInterval(japaTimer);

  const btnStart = document.getElementById("btnStartJapa");
  const statusMsg = document.getElementById("japaStatusMessage");

  if (btnStart) {
    btnStart.innerHTML = `
      <svg class="icon icon-stroke" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      <span>Resume Japa Chant</span>
    `;
    btnStart.classList.remove("playing");
  }

  if (statusMsg) {
    statusMsg.textContent = `Japa paused at ${japaCount} / 108. Click Resume to continue.`;
    statusMsg.style.color = "var(--ink-muted)";
  }
}

function resetJapa() {
  pauseJapa();
  japaCount = 0;
  updateJapaUI();

  const btnStart = document.getElementById("btnStartJapa");
  const statusMsg = document.getElementById("japaStatusMessage");

  if (btnStart) {
    btnStart.innerHTML = `
      <svg class="icon icon-stroke" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      <span>Start 108 Japa Chant</span>
    `;
  }

  if (statusMsg) {
    statusMsg.textContent = "Click 'Start 108 Japa Chant' to begin sacred mantra recitation with temple bell chime.";
    statusMsg.style.color = "var(--ink-muted)";
  }
}

function finishJapa() {
  pauseJapa();
  const statusMsg = document.getElementById("japaStatusMessage");
  if (statusMsg) {
    statusMsg.innerHTML = "<strong>✨ 108 Japa Completed! May Goddess divine grace illuminate your life with health & prosperity.</strong>";
    statusMsg.style.color = "#10b981";
  }
  playConchFinishSound();
}

function updateJapaUI() {
  const countDisplay = document.getElementById("japaCountDisplay");
  const progressRing = document.getElementById("japaProgressRing");

  if (countDisplay) countDisplay.textContent = japaCount;

  if (progressRing) {
    const circumference = 2 * Math.PI * 44; // r=44 -> ~276.46
    const offset = circumference - (japaCount / 108) * circumference;
    progressRing.style.strokeDasharray = `${circumference}`;
    progressRing.style.strokeDashoffset = `${offset}`;
  }
}

/**
 * Web Audio API synthesized Temple Bell Sound
 */
function playTempleBellChime() {
  try {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (!audioContext) return;
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioContext.currentTime); // A5 Bell note
    osc.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 1.2);

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 1.2);
  } catch (e) {
    // Audio Context blocked or unavailable
  }
}

/**
 * Web Audio API Conch Finish Sound
 */
function playConchFinishSound() {
  try {
    if (!audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(330, audioContext.currentTime + 2.0);

    gain.gain.setValueAtTime(0.4, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2.0);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 2.0);
  } catch (e) {}
}

/**
 * Yantra High-Resolution PNG Download Functionality
 */
function bindYantraDownload() {
  const btn = document.getElementById("btnDownloadYantra");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (!currentResultDevi) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1400;
    const ctx = canvas.getContext("2d");

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 1400);
    grad.addColorStop(0, "#0e0818");
    grad.addColorStop(0.5, "#1a0f2e");
    grad.addColorStop(1, "#090510");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1400);

    // Golden border
    ctx.strokeStyle = "#c49a45";
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 1140, 1340);

    ctx.strokeStyle = "rgba(255, 215, 100, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1110, 1310);

    // Title & Header Text
    ctx.textAlign = "center";
    ctx.font = "bold 26px Cinzel, serif";
    ctx.fillStyle = "#c49a45";
    ctx.fillText("REKHA THE TAROT QUEEN", 600, 100);

    ctx.font = "bold 44px Cinzel, serif";
    ctx.fillStyle = "#ffd764";
    ctx.fillText(`${currentResultDevi.name} Nitya`, 600, 170);

    ctx.font = "bold 32px Mukta Malar, sans-serif";
    ctx.fillStyle = "#ffaa44";
    ctx.fillText(currentResultDevi.tamil, 600, 225);

    // Convert Yantra SVG to Image on Canvas
    const svgEl = document.querySelector("#deviYantra svg");
    if (svgEl) {
      const svgData = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        // Radial Glow behind Yantra
        const radGlow = ctx.createRadialGradient(600, 620, 50, 600, 620, 380);
        radGlow.addColorStop(0, "rgba(255, 215, 100, 0.35)");
        radGlow.addColorStop(1, "rgba(255, 215, 100, 0)");
        ctx.fillStyle = radGlow;
        ctx.beginPath();
        ctx.arc(600, 620, 380, 0, Math.PI * 2);
        ctx.fill();

        // Draw Yantra image
        ctx.drawImage(img, 260, 280, 680, 680);

        // Mantra Text
        ctx.font = "bold 22px Cinzel, serif";
        ctx.fillStyle = "#c49a45";
        ctx.fillText("SACRED MOOLA MANTRA", 600, 1030);

        ctx.font = "bold 32px 'Noto Serif Devanagari', serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(currentResultDevi.data.mantraSanskrit, 600, 1090);

        ctx.font = "bold 26px Mukta Malar, sans-serif";
        ctx.fillStyle = "#ffaa44";
        ctx.fillText(currentResultDevi.data.mantraTamil, 600, 1145);

        ctx.font = "italic 22px 'Outfit', sans-serif";
        ctx.fillStyle = "#e2d5f0";
        ctx.fillText(currentResultDevi.data.mantraEn, 600, 1195);

        // Footer Note
        ctx.font = "18px 'Outfit', sans-serif";
        ctx.fillStyle = "rgba(255, 215, 100, 0.75)";
        ctx.fillText("Keep this sacred Sri Yantra in your Pooja room for divine blessings & protection.", 600, 1290);

        // Trigger Download
        const a = document.createElement("a");
        a.download = `${currentResultDevi.name}_Sri_Pooja_Yantra.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
        URL.revokeObjectURL(blobURL);
      };
      img.src = blobURL;
    }
  });
}

/**
 * Print / Save PDF Report Action
 */
function bindPrintReportAction() {
  const btn = document.getElementById("btnPrintReport");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.print();
  });
}
