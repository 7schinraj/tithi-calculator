/**
 * Result Page Handler — Tithi Devathai Calculator
 * Created for REKHA THE TAROT QUEEN
 */

// Global State (shared with app.js)
currentResultDevi = typeof currentResultDevi !== "undefined" ? currentResultDevi : null;

// Extended Devi Data with dual-language information
const extendedDeviDetails = {
  "Kameshvari": {
    color: "#e91e8c",
    colorAlt: "#ff6ec7",
    glow: "rgba(233,30,140,0.45)",
    image: "images/kameshvari.jpg",
    mantraSanskrit: "ॐ ऐं ह्रीं क्लीं कामेश्वर्यै नमः",
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் காமேஸ்வர்யை நமஹ",
    mantraEn: "Om Aim Hrim Klim Kameshvaryai Namah",
    gayatriSanskrit: "ॐ कामेश्वर्यै विद्महे नित्यक्लिन्नायै धीमहि तन्नो नित्या प्रचोदयात्",
    gayatriTamil: "ஓம் காமேஸ்வர்யை வித்மஹே நித்யக்லின்னாயை தீமஹி தன்னோ நித்யா ப்ரசோதயாத்",
    gayatriEn: "Om Kameshvaryai Vidmahe Nityaklinnayai Dhimahi Tanno Nitya Prachodayat",
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
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் பகமாலின்யை நமஹ",
    mantraEn: "Om Aim Hrim Klim Bhagamalinyai Namah",
    gayatriSanskrit: "ॐ भगमालिन्यै विद्महे सर्ववशङ्कर्यै धीमहि तन्नो नित्या प्रचोदयात्",
    gayatriTamil: "ஓம் பகமாலின்யை வித்மஹே சர்வ வசங்கர்யை தீமஹி தன்னோ நித்யா ப்ரசோதயாத்",
    gayatriEn: "Om Bhagamalinyai Vidmahe Sarvavashankaryai Dhimahi Tanno Nitya Prachodayat",
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
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் நித்யக்லின்னாயை நமஹ",
    mantraEn: "Om Aim Hrim Klim Nityaklinnayai Namah",
    gayatriSanskrit: "ॐ नित्यक्लिन्नायै विद्महे नित्यमदद्रवायै धीमहि तन्नो नित्या प्रचोदयात्",
    gayatriTamil: "ஓம் நித்யக்லின்னாயை வித்மஹே நித்ய மதத்ரவாயை தீமஹி தன்னோ நித்யா ப்ரசோதயாத்",
    gayatriEn: "Om Nityaklinnayai Vidmahe Nityamadadravayai Dhimahi Tanno Nitya Prachodayat",
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
    gayatriSanskrit: "ॐ भेरुण्डायै विद्महे विषहरायै धीमहि तन्नो नित्या प्रचोदयात्",
    gayatriTamil: "ஓம் பேருண்டாயை வித்மஹே விஷஹராயை தீமஹி தன்னோ நித்யா ப்ரசோதயாத்",
    gayatriEn: "Om Bherundayai Vidmahe Vishaharayai Dhimahi Tanno Nitya Prachodayat",
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
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் வஹ்னிவாஸின்யை நமஹ",
    mantraEn: "Om Aim Hrim Klim Vahnivasinyai Namah",
    gayatriSanskrit: "ॐ वह्निवासिन्यै विद्महे सिद्धिप्रदायै धीमहि तन्नो नित्या प्रचोदयात्",
    gayatriTamil: "ஓம் வஹ்னிவாஸின்யை வித்மஹே சித்திப்ரதாயை தீமஹி தன்னோ நித்யா ப்ரசோதயாத்",
    gayatriEn: "Om Vahnivasinyai Vidmahe Siddhipradayai Dhimahi Tanno Nitya Prachodayat",
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
    gayatriSanskrit: "ॐ महावज्रेश्वर्यै विद्महे वज्रनित्यायै धीमहि तन्नो नित्या प्रचोदयात्",
    gayatriTamil: "ஓம் மஹா வஜ்ரேஸ்வர்யை வித்மஹே வஜ்ர நித்யாயை தீமஹி தன்னோ நித்யா ப்ரசோதயாத்",
    gayatriEn: "Om Mahavajreshvaryai Vidmahe Vajranityayai Dhimahi Tanno Nitya Prachodayat",
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
    gayatriSanskrit: "ॐ शिवदूत्यै विद्महे शिवङ्कर्यै धीमहि तन्नो नित्या प्रचोदयात्",
    gayatriTamil: "ஓம் சிவதூத்யை வித்மஹே சிவங்கர்யை தீமஹி தன்னோ நித்யா ப்ரசோதயாத்",
    gayatriEn: "Om Shivadutyai Vidmahe Shivankaryai Dhimahi Tanno Nitya Prachodayat",
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
    gayatriSanskrit: "ॐ त्वरितायै विद्महे महानित्यायै धीमहि तन्नो नित्या प्रचोदयात्",
    gayatriTamil: "ஓம் த்வரிதாயை வித்மஹே மஹாநித்யாயை தீமஹி தன்னோ நித்யா ப்ரசோதயாத்",
    gayatriEn: "Om Tvaritayai Vidmahe Mahanityayai Dhimahi Tanno Nitya Prachodayat",
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
    gayatriSanskrit: "ॐ कुलसुन्दर्यै विद्महे कामेश्वर्यै धीमहि तन्नो शक्तिः प्रचोदयात्",
    gayatriTamil: "ஓம் குலசுந்தர்யை வித்மஹே காமேஸ்வர்யை தீமஹி தன்னோ சக்தி ப்ரசோதயாத்",
    gayatriEn: "Om Kulasundaryai Vidmahe Kameshvaryai Dhimahi Tanno Shaktih Prachodayat",
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
    gayatriSanskrit: "ॐ नित्यायै विद्महे ज्ञानरूपायै धीमहि तन्नो देवी प्रचोदयात्",
    gayatriTamil: "ஓம் நித்யாயை வித்மஹே ஞானரூபாயை தீமஹி தன்னோ தேவி ப்ரசோதயாத்",
    gayatriEn: "Om Nityayai Vidmahe Jnanarupayai Dhimahi Tanno Devi Prachodayat",
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
    gayatriSanskrit: "ॐ नीलपताकायै विद्महे महानित्यायै धीमहि तन्नो देवी प्रचोदयात्",
    gayatriTamil: "ஓம் நீலபதாகாயை வித்மஹே மஹாநித்யாயை தீமஹி தன்னோ தேவி ப்ரசோதயாத்",
    gayatriEn: "Om Nilapatakayai Vidmahe Mahanityayai Dhimahi Tanno Devi Prachodayat",
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
    gayatriSanskrit: "ॐ विजयादेव्यै विद्महे महानित्यायै धीमहि तन्नो देवी प्रचोदयात्",
    gayatriTamil: "ஓம் விஜயாதேவ்யை வித்மஹே மஹாநித்யாயை தீமஹி தன்னோ தேவி ப்ரசோதயாத்",
    gayatriEn: "Om Vijayadevyai Vidmahe Mahanityayai Dhimahi Tanno Devi Prachodayat",
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
    gayatriSanskrit: "ॐ सर्वमङ्गलायै विद्महे चन्द्रात्मिकायै धीमहि तन्नो नित्या प्रचोदयात्",
    gayatriTamil: "ஓம் சர்வமங்களாயை வித்மஹே சந்த்ராத்மிகாயை தீமஹி தன்னோ நித்யா ப்ரசோதயாத்",
    gayatriEn: "Om Sarvamangalayai Vidmahe Chandratmikayai Dhimahi Tanno Nitya Prachodayat",
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
    mantraTamil: "ஓம் ஐம் ஹ்ரீம் க்ளீம் ஜ்வாலாமாலின்யை நமஹ",
    mantraEn: "Om Aim Hrim Klim Jwalamalinyai Namah",
    gayatriSanskrit: "ॐ ज्वालामालिन्यै विद्महे महाज्वालायै धीमहि तन्नो देवी प्रचोदयात्",
    gayatriTamil: "ஓம் ஜ்வாலாமாலின்யை வித்மஹே மஹாஜ்வாலாயை தீமஹி தன்னோ தேவி ப்ரசோதயாத்",
    gayatriEn: "Om Jwalamalinyai Vidmahe Mahajwalayai Dhimahi Tanno Devi Prachodayat",
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
    gayatriSanskrit: "ॐ विचित्रायै विद्महे महानित्यायै धीमहि तन्नो देवी प्रचोदयात्",
    gayatriTamil: "ஓம் விசித்ராயை வித்மஹே மஹாநித்யாயை தீமஹி தன்னோ தேவி ப்ரசோதயாத்",
    gayatriEn: "Om Vichitrayai Vidmahe Mahanityayai Dhimahi Tanno Devi Prachodayat",
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
    gayatriSanskrit: "ॐ त्रिपुरासुन्दर्यै विद्महे कामेश्वर्यै धीमहि तन्नो क्लिन्ना प्रचोदयात्",
    gayatriTamil: "ஓம் திரிபுரசுந்தர்யை வித்மஹே காமேஸ்வர்யை தீமஹி தன்னோ க்லின்னா ப்ரசோதயாத்",
    gayatriEn: "Om Tripurasundaryai Vidmahe Kameshvaryai Dhimahi Tanno Klinna Prachodayat",
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

  // Populate Gayatri Mantras
  const gayatriTamEl = document.getElementById("resGayatriTamil");
  const gayatriSktEl = document.getElementById("resGayatriSanskrit");
  const gayatriEnEl = document.getElementById("resGayatriEn");

  if (gayatriTamEl && data.gayatriTamil) gayatriTamEl.textContent = data.gayatriTamil;
  if (gayatriSktEl && data.gayatriSanskrit) gayatriSktEl.textContent = data.gayatriSanskrit;
  if (gayatriEnEl && data.gayatriEn) gayatriEnEl.textContent = data.gayatriEn;

  // Refresh active chant banner with calculated Devi mantra
  if (typeof updateActiveChantDisplay === "function") {
    updateActiveChantDisplay();
  }

  // Render SVG Yantra in Card 5
  const yantraCardBox = document.getElementById("deviYantra");
  if (yantraCardBox) {
    yantraCardBox.innerHTML = createYantraSVG(data.color, data.colorAlt);
  }
}

/**
 * ════════════════════════════════════════════════════════════
 * Interactive 108 Japa Audio & Mantra Chanting Engine
 * Speaks Sacred Devi Moola Mantra repeatedly with Temple Chimes
 * ════════════════════════════════════════════════════════════
 */
let japaCount = 0;
let japaTimer = null;
let japaWatchdog = null;
let japaSpeed = 1.0; // 0.85, 1.0, 1.25, 1.5
let isJapaPlaying = false;
let audioContext = null;
let japaLang = "ta"; // "ta" (Tamil), "sa" (Sanskrit), "en" (English)
let availableVoices = [];

// Safe voice loader
function loadVoices() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      availableVoices = window.speechSynthesis.getVoices() || [];
    } catch (e) {
      availableVoices = [];
    }
  }
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function getAudioContext() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

/**
 * Resonant Temple Bell Chime (Multi-harmonic Bronze Bell)
 */
function playTempleBellChime(freq = 528, duration = 2.2, gainVal = 0.18) {
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
    // Web Audio blocked or unsupported
  }
}

/**
 * Conch Finish Sound on 108 Completion
 */
function playConchFinishSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 2.5);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.5);
  } catch (e) {}
}

/**
 * Get the exact mantra text and voice suited for speech synthesis
 */
function getMantraToRecite() {
  const data = (currentResultDevi && currentResultDevi.data) ? currentResultDevi.data : null;
  const tamilText = data?.mantraTamil || document.getElementById("resMantraTamil")?.textContent?.trim() || "ஓம் ஐம் ஹ்ரீம் க்ளீம் நமஹ";
  const sanskritText = data?.mantraSanskrit || document.getElementById("resMantraSanskrit")?.textContent?.trim() || "ॐ ऐं ह्रीं क्लीं नमः";
  const enText = data?.mantraEn || document.getElementById("resMantraEn")?.textContent?.trim() || "Om Aim Hrim Klim Namah";

  if (availableVoices.length === 0 && window.speechSynthesis) {
    loadVoices();
  }

  // Voice lookup with fallbacks
  const taVoice = availableVoices.find(v => v.lang && v.lang.toLowerCase().startsWith("ta"));
  const saVoice = availableVoices.find(v => v.lang && (v.lang.toLowerCase().startsWith("hi") || v.lang.toLowerCase().startsWith("sa")));
  const enInVoice = availableVoices.find(v => v.lang && v.lang.toLowerCase() === "en-in");
  const anyVoice = availableVoices.find(v => v.lang && v.lang.toLowerCase().startsWith("en")) || availableVoices[0] || null;

  // Clean phonetic version for English voices to ensure crisp Indian Sanskrit pronunciation
  const phoneticEn = enText
    .replace(/\bHrim\b/g, "Hreem")
    .replace(/\bKlim\b/g, "Kleem")
    .replace(/\bAim\b/g, "Iym")
    .replace(/\bShrim\b/g, "Shreem")
    .replace(/\bNamah\b/g, "Namaha");

  if (japaLang === "ta") {
    if (taVoice) {
      return { text: tamilText, voice: taVoice, lang: taVoice.lang, displayText: tamilText };
    }
    // If client system has no Tamil voice, Hindi/Sanskrit voice can chant the Sanskrit text
    if (saVoice) {
      return { text: sanskritText, voice: saVoice, lang: saVoice.lang, displayText: tamilText };
    }
    // Fallback if client has English-only voices (e.g. standard US Windows)
    return { text: phoneticEn, voice: enInVoice || anyVoice, lang: "en-IN", displayText: tamilText };
  } else if (japaLang === "sa") {
    if (saVoice) {
      return { text: sanskritText, voice: saVoice, lang: saVoice.lang, displayText: sanskritText };
    }
    if (taVoice) {
      return { text: tamilText, voice: taVoice, lang: taVoice.lang, displayText: sanskritText };
    }
    return { text: phoneticEn, voice: enInVoice || anyVoice, lang: "en-IN", displayText: sanskritText };
  } else {
    // English Transliteration
    return { text: phoneticEn, voice: enInVoice || anyVoice, lang: "en-IN", displayText: enText };
  }
}

/**
 * Switch Active Mantra Language
 */
function setJapaLanguage(lang) {
  japaLang = lang;

  // Update japa language pills
  document.querySelectorAll(".btn-lang-pill").forEach(pill => {
    pill.classList.toggle("active", pill.getAttribute("data-lang") === lang);
  });

  // --- NEW: Mantra Tab Switcher UI ---
  const scriptMap = { "ta": "tamil", "sa": "sanskrit", "en": "english" };
  const activeScript = scriptMap[lang] || "tamil";

  // Update tab buttons
  document.querySelectorAll(".mantra-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-script") === activeScript);
  });

  // Show/hide panels
  document.querySelectorAll("#mantraDisplayPanel [data-for]").forEach(panel => {
    const isActive = panel.getAttribute("data-for") === activeScript;
    panel.className = isActive ? "mant-panel-active" : "mant-panel-hidden";
  });

  // --- LEGACY: old script-block class (keep for backward compat) ---
  const blockMap = {
    "ta": { id: "scriptBoxTamil", tagId: "tagTamil" },
    "sa": { id: "scriptBoxSanskrit", tagId: "tagSanskrit" },
    "en": { id: "scriptBoxEn", tagId: "tagEn" }
  };

  ["ta", "sa", "en"].forEach(k => {
    // scriptBoxTamil etc. are now <button> tab elements — skip class toggling
    const tag = document.getElementById(blockMap[k].tagId);
    if (tag) {
      tag.textContent = (k === lang) ? "🔊 Chanting Active" : "Click to Select";
    }
  });

  updateActiveChantDisplay();
}

/**
 * Update the Active Chant Banner display with current selected mantra
 */
function updateActiveChantDisplay() {
  const chantTextEl = document.getElementById("activeChantText");
  const chantHintEl = document.getElementById("activeChantHint");
  const data = (currentResultDevi && currentResultDevi.data) ? currentResultDevi.data : null;

  let activeText = "";
  let langLabel = "";

  if (japaLang === "ta") {
    activeText = data?.mantraTamil || document.getElementById("resMantraTamil")?.textContent?.trim() || "";
    langLabel = "Tamil Moola Mantra / தமிழ் மூல மந்திரம்:";
  } else if (japaLang === "sa") {
    activeText = data?.mantraSanskrit || document.getElementById("resMantraSanskrit")?.textContent?.trim() || "";
    langLabel = "Sanskrit Moola Mantra / சமஸ்கிருத மூல மந்திரம்:";
  } else {
    activeText = data?.mantraEn || document.getElementById("resMantraEn")?.textContent?.trim() || "";
    langLabel = "English Transliteration Mantra:";
  }

  if (chantTextEl && activeText) chantTextEl.textContent = activeText;
  if (chantHintEl && langLabel) chantHintEl.textContent = langLabel;
}

/**
 * Initialize Japa Audio Engine and User Controls
 */
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

  // Speed toggle: 1.0x -> 1.25x -> 1.5x -> 0.85x -> 1.0x
  if (btnSpeed && speedText) {
    btnSpeed.addEventListener("click", () => {
      if (japaSpeed === 1.0) japaSpeed = 1.25;
      else if (japaSpeed === 1.25) japaSpeed = 1.5;
      else if (japaSpeed === 1.5) japaSpeed = 0.85;
      else japaSpeed = 1.0;

      speedText.textContent = `${japaSpeed.toFixed(2).replace(/\.00$/, '')}x`;
    });
  }

  // Language Pills binding
  document.querySelectorAll(".btn-lang-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const selected = pill.getAttribute("data-lang");
      if (selected) setJapaLanguage(selected);
    });
  });

  // NEW: Mantra Tab Buttons click to switch language + panel
  document.querySelectorAll(".mantra-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const script = btn.getAttribute("data-script");
      const langMap = { "tamil": "ta", "sanskrit": "sa", "english": "en" };
      const lang = langMap[script] || "ta";
      setJapaLanguage(lang);
    });
  });

  // Initial display setup
  updateActiveChantDisplay();
}

/**
 * Start or Resume 108 Japa Mantra Chanting
 */
function startJapa() {
  const btnStart = document.getElementById("btnStartJapa");
  const btnText = document.getElementById("btnStartJapaText");
  const statusMsg = document.getElementById("japaStatusMessage");
  const chantBanner = document.getElementById("activeChantBanner");

  // If already reached 108, reset to 0 first
  if (japaCount >= 108) {
    japaCount = 0;
    updateJapaUI();
  }

  isJapaPlaying = true;
  getAudioContext();

  if (btnStart) {
    btnStart.classList.add("playing");
    const icon = btnStart.querySelector("svg");
    if (icon) {
      icon.innerHTML = `<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>`;
    }
  }
  if (btnText) btnText.textContent = "Pause Japa Chant";

  if (chantBanner) chantBanner.classList.add("chanting");

  // Initial gentle bell chime
  playTempleBellChime(528, 2.2, 0.22);

  // Small delay for bell resonance before first chant starts
  japaTimer = setTimeout(() => {
    stepJapaChant();
  }, 400);
}

/**
 * Core loop: Recite single mantra iteration then advance count
 */
function stepJapaChant() {
  if (!isJapaPlaying) return;

  if (japaCount >= 108) {
    finishJapa();
    return;
  }

  const statusMsg = document.getElementById("japaStatusMessage");
  const recitation = getMantraToRecite();

  if (statusMsg) {
    statusMsg.innerHTML = `<span style="color:#ffd764; font-weight:700;">🔊 Chanting (${japaCount + 1}/108):</span> <span style="color:#ffffff; font-weight:600;">"${recitation.displayText}"</span>`;
  }

  // Soft background temple bell for each chant
  playTempleBellChime(660, 1.4, 0.12);

  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(recitation.text);
      // Devotional cadence (calm and resonant)
      const baseRate = japaLang === "ta" ? 0.92 : 0.95;
      utterance.rate = Math.max(0.75, Math.min(1.6, baseRate * (japaSpeed / 1.0)));
      utterance.pitch = 1.0;

      if (recitation.voice) {
        utterance.voice = recitation.voice;
      }
      if (recitation.lang) {
        utterance.lang = recitation.lang;
      }

      let hasHandledEnd = false;
      const onEndCycle = () => {
        if (hasHandledEnd) return;
        hasHandledEnd = true;
        if (japaWatchdog) {
          clearTimeout(japaWatchdog);
          japaWatchdog = null;
        }

        if (!isJapaPlaying) return;

        japaCount++;
        updateJapaUI();

        if (japaCount >= 108) {
          finishJapa();
          return;
        }

        // Natural meditative breathing pause between mantra repetitions (approx 550ms)
        const delayMs = Math.max(250, Math.round(550 / japaSpeed));
        japaTimer = setTimeout(() => {
          stepJapaChant();
        }, delayMs);
      };

      utterance.onend = onEndCycle;
      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis notice:", e);
        onEndCycle();
      };

      // Safeguard against Chrome Garbage Collection of active utterance
      window._japaActiveUtterance = utterance;

      // Watchdog timeout in case browser TTS hangs
      const estimatedMs = Math.max(3500, Math.round((recitation.text.length * 160) / japaSpeed) + 2000);
      japaWatchdog = setTimeout(() => {
        if (!hasHandledEnd && isJapaPlaying) {
          console.warn("Watchdog advanced Japa cycle");
          onEndCycle();
        }
      }, estimatedMs);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech speak error:", err);
      fallbackTimerStep();
    }
  } else {
    fallbackTimerStep();
  }
}

function fallbackTimerStep() {
  japaCount++;
  updateJapaUI();
  if (japaCount >= 108) {
    finishJapa();
    return;
  }
  japaTimer = setTimeout(stepJapaChant, Math.round(3500 / japaSpeed));
}

/**
 * Pause Chanting
 */
function pauseJapa() {
  isJapaPlaying = false;
  if (japaTimer) {
    clearTimeout(japaTimer);
    japaTimer = null;
  }
  if (japaWatchdog) {
    clearTimeout(japaWatchdog);
    japaWatchdog = null;
  }

  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }

  const btnStart = document.getElementById("btnStartJapa");
  const btnText = document.getElementById("btnStartJapaText");
  const statusMsg = document.getElementById("japaStatusMessage");
  const chantBanner = document.getElementById("activeChantBanner");

  if (btnStart) {
    btnStart.classList.remove("playing");
    const icon = btnStart.querySelector("svg");
    if (icon) {
      icon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
    }
  }
  if (btnText) btnText.textContent = "Resume Japa Chant";

  if (chantBanner) chantBanner.classList.remove("chanting");

  if (statusMsg) {
    statusMsg.textContent = `Japa paused at ${japaCount} / 108. Click Resume to continue recitation.`;
    statusMsg.style.color = "var(--ink-muted)";
  }
}

/**
 * Reset Chanting
 */
function resetJapa() {
  pauseJapa();
  japaCount = 0;
  updateJapaUI();

  const btnStart = document.getElementById("btnStartJapa");
  const btnText = document.getElementById("btnStartJapaText");
  const statusMsg = document.getElementById("japaStatusMessage");

  if (btnStart) {
    btnStart.classList.remove("playing");
    const icon = btnStart.querySelector("svg");
    if (icon) {
      icon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
    }
  }
  if (btnText) btnText.textContent = "Start 108 Japa Chant";

  if (statusMsg) {
    statusMsg.textContent = "Click 'Start 108 Japa Chant' to begin sacred audio recitation with temple bell chime.";
    statusMsg.style.color = "rgba(255, 215, 100, 0.85)";
  }
}

/**
 * Complete 108 Japa with Divine Blessings
 */
function finishJapa() {
  pauseJapa();
  const statusMsg = document.getElementById("japaStatusMessage");
  const btnText = document.getElementById("btnStartJapaText");

  if (btnText) btnText.textContent = "Restart 108 Japa";

  if (statusMsg) {
    statusMsg.innerHTML = "<strong>✨ 108 முறை மூல மந்திர ஜபம் பூர்த்தியடைந்தது! (108 Japa Completed!)<br>தேவியின் பரிபூரண அருள் உண்டாகட்டும் — Divine blessings and abundance illuminate your life!</strong>";
    statusMsg.style.color = "#10b981";
  }

  // Triumphant 3-bell sequence & Conch sound
  playTempleBellChime(528, 3.5, 0.35);
  setTimeout(() => playTempleBellChime(660, 3.5, 0.28), 500);
  setTimeout(() => playTempleBellChime(792, 4.0, 0.22), 1000);
  setTimeout(() => playConchFinishSound(), 1400);
}

function updateJapaUI() {
  const countDisplay = document.getElementById("japaCountDisplay");
  const progressRing = document.getElementById("japaProgressRing");

  if (countDisplay) countDisplay.textContent = japaCount;

  if (progressRing) {
    const circumference = 2 * Math.PI * 44; // r=44 -> ~276.46
    const offset = circumference - (Math.min(108, japaCount) / 108) * circumference;
    progressRing.style.strokeDasharray = `${circumference}`;
    progressRing.style.strokeDashoffset = `${offset}`;
  }
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
