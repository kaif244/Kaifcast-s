const API_KEY = "d685bc78d49a4b97abf131720251106"; // Your API Key
const weatherResult = document.getElementById("weatherResult");
const forecastResult = document.getElementById("forecastResult");
const hourlyForecastResult = document.getElementById("hourlyForecastResult");
const themeToggle = document.getElementById("themeToggle");
const micBtn = document.getElementById("micBtn");
const datetimeEl = document.getElementById("datetime");
const locationInput = document.getElementById("locationInput");
const languageSelect = document.getElementById("languageSelect");
const unitToggle = document.getElementById("unitToggle");
const loadingSpinner = document.getElementById("loadingSpinner");

// --- Translations Object ---
const translations = {
  en: {
    AppName: "ClimaCast ✨", // Updated
    EnterCity: "🌆 Enter city",
    Search: "🔍",
    Language: "Language:",
    DarkMode: "🌙 Dark Mode",
    Units: "°C/°F",
    Voice: "🎤 Voice",
    UseMyLocation: "📍 Use My Location",
    PleaseEnterCity: "⚠️ Please enter a city or use your location.",
    ErrorFetchingData: "⚠️ Unable to fetch data. Please check your internet connection or try again later.",
    GeolocationError: "❌ Geolocation error: {error}. Please allow location access.",
    GeolocationNotSupported: "⚠️ Geolocation is not supported by this browser.",
    VoiceInputNotSupported: "🎤 Voice input not supported by your browser. Try Chrome or Edge.",
    VoiceInputError: "🎤 Voice input error: {error}. Please try again.",
    Listening: "🎤 Listening...",
    Temperature: "Temperature",
    Condition: "Condition",
    FeelsLike: "Feels Like",
    Sunrise: "Sunrise",
    Sunset: "Sunset",
    DayForecast: "7-Day Forecast",
    HourlyForecast: "Hourly Forecast",
    ForecastFor: "Forecast for",
    Humidity: "Humidity",
    Wind: "Wind",
    Pressure: "Pressure",
    Visibility: "Visibility",
    UVIndex: "UV Index",
    Precipitation: "Precipitation",
    MoonPhase: "Moon Phase",
    Moonrise: "Moonrise",
    Moonset: "Moonset",
    CurrentWeatherFor: "Current Weather for",
    Today: "Today",
    Day: "Day",
    Night: "Night",
    MaxTemp: "Max Temp",
    MinTemp: "Min Temp",
    AvgTemp: "Avg Temp",
    chanceOfRain: "Chance of Rain",
    chanceOfSnow: "Chance of Snow"
  },
  hi: {
    AppName: "क्लाइमाकास्ट ✨", // Updated
    EnterCity: "🌆 शहर दर्ज करें",
    Search: "🔍",
    Language: "भाषा:",
    DarkMode: "🌙 डार्क मोड",
    Units: "°C/°F",
    Voice: "🎤 आवाज़",
    UseMyLocation: "📍 मेरा स्थान उपयोग करें",
    PleaseEnterCity: "⚠️ कृपया एक शहर दर्ज करें या अपना स्थान उपयोग करें।",
    ErrorFetchingData: "⚠️ डेटा लाने में असमर्थ। कृपया अपना इंटरनेट कनेक्शन जांचें या बाद में पुनः प्रयास करें।",
    GeolocationError: "❌ जियोलोकेशन त्रुटि: {error}। कृपया स्थान पहुंच की अनुमति दें।",
    GeolocationNotSupported: "⚠️ यह ब्राउज़र जियोलोकेशन का समर्थन नहीं करता है।",
    VoiceInputNotSupported: "🎤 आपका ब्राउज़र ध्वनि इनपुट का समर्थन नहीं करता है। क्रोम या एज आज़माएँ।",
    VoiceInputError: "🎤 ध्वनि इनपुट त्रुटि: {error}। कृपया पुनः प्रयास करें।",
    Listening: "🎤 सुन रहा हूँ...",
    Temperature: "तापमान",
    Condition: "स्थिति",
    FeelsLike: "जैसा महसूस होता है",
    Sunrise: "सूर्योदय",
    Sunset: "सूर्यास्त",
    DayForecast: "7-दिवसीय पूर्वानुमान",
    HourlyForecast: "प्रति घंटा पूर्वानुमान",
    ForecastFor: "के लिए पूर्वानुमान",
    Humidity: "नमी",
    Wind: "हवा",
    Pressure: "दबाव",
    Visibility: "दृश्यता",
    UVIndex: "यूवी सूचकांक",
    Precipitation: "वर्षा",
    MoonPhase: "चंद्रमा का चरण",
    Moonrise: "चंद्रोदय",
    Moonset: "चंद्रास्त",
    CurrentWeatherFor: "के लिए वर्तमान मौसम",
    Today: "आज",
    Day: "दिन",
    Night: "शपे",
    MaxTemp: "अधिकतम तापमान",
    MinTemp: "न्यूनतम तापमान",
    AvgTemp: "औसत तापमान",
    chanceOfRain: "बारिश की संभावना",
    chanceOfSnow: "बर्फबारी की संभावना"
  },
  ur: {
    AppName: "کلائماکاسٹ ✨", // Updated
    EnterCity: "🌆 شہر درج کریں",
    Search: "🔍",
    Language: "زبان:",
    DarkMode: "🌙 ڈارک موڈ",
    Units: "°C/°F",
    Voice: "🎤 آواز",
    UseMyLocation: "📍 میرا مقام استعمال کریں",
    PleaseEnterCity: "⚠️ براہ کرم ایک شہر درج کریں یا اپنا مقام استعمال کریں۔",
    ErrorFetchingData: "⚠️ ڈیٹا حاصل کرنے سے قاصر ہے۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں یا بعد میں دوبارہ کوشش کریں۔",
    GeolocationError: "❌ جغرافیائی محل وقوع کی خرابی: {error}۔ براہ کرم مقام تک رسائی کی اجازت دیں۔",
    GeolocationNotSupported: "⚠️ یہ براؤزر جغرافیائی محل وقوع کی حمایت نہیں کرتا ہے۔",
    VoiceInputNotSupported: "🎤 آپ کا براؤزر آواز کی ان پٹ کی حمایت نہیں کرتا ہے۔ کروم یا ایج آزمائیں۔",
    VoiceInputError: "🎤 آواز کی ان پٹ خرابی: {error}۔ براہ کرم دوبارہ کوشش کریں۔",
    Listening: "🎤 سن رہا ہوں...",
    Temperature: "درجہ حرارت",
    Condition: "حالت",
    FeelsLike: "محسوس ہوتا ہے",
    Sunrise: "طلوع آفتاب",
    Sunset: "غروب آفتاب",
    DayForecast: "7-روزہ اندازہ",
    HourlyForecast: "گھنٹہ وار پیش گوئی",
    ForecastFor: "کے لیے پیش گوئی",
    Humidity: "نمی",
    Wind: "ہوا",
    Pressure: "دباؤ",
    Visibility: "مرئیت",
    UVIndex: "یووی انڈیکس",
    Precipitation: "بارش",
    MoonPhase: "چاند کا مرحلہ",
    Moonrise: "چاند کا طلوع",
    Moonset: "چاند کا غروب",
    CurrentWeatherFor: "کے لیے موجودہ موسم",
    Today: "آج",
    Day: "دن",
    Night: "شپه",
    MaxTemp: "زیادہ سے زیادہ درجہ حرارت",
    MinTemp: "کم سے کم درجہ حرارت",
    AvgTemp: "اوسط درجہ حرارت",
    chanceOfRain: "بارش کا امکان",
    chanceOfSnow: "برفباری کا امکان"
  },
  ps: {
    AppName: "کلائماکاسٹ ✨", // Updated
    EnterCity: "🌆 ښار دننه کړئ",
    Search: "🔍",
    Language: "ژبه:",
    DarkMode: "🌙 تیاره حالت",
    Units: "°C/°F",
    Voice: "🎤 غږ",
    UseMyLocation: "📍 زما موقعیت وکاروئ",
    PleaseEnterCity: "⚠️ مهرباني وکړئ یو ښار دننه کړئ یا خپل موقعیت وکاروئ.",
    ErrorFetchingData: "⚠️ د معلوماتو ترلاسه کولو کې پاتې راغلي. مهرباني وکړئ خپل انټرنیټ اړیکه وګورئ یا وروسته بیا هڅه وکړئ.",
    GeolocationError: "❌ د جغرافیایي موقعیت تېروتنه: {error}. مهرباني وکړئ د موقعیت لاسرسي ته اجازه ورکړئ.",
    GeolocationNotSupported: "⚠️ دا براوزر جغرافیایي موقعیت نه ملاتړ کوي.",
    VoiceInputNotSupported: "🎤 ستاسو براوزر د غږ داخلولو ملاتړ نه کوي. کروم یا ایج هڅه وکړئ.",
    VoiceInputError: "🎤 د غږ داخلولو تېروتنه: {error}. مهرباني وکړئ بیا هڅه وکړئ.",
    Listening: "🎤 اوریدل...",
    Temperature: "تودوخه",
    Condition: "حالت",
    FeelsLike: "داسې احساس کیږي",
    Sunrise: "لمر خاته",
    Sunset: "لمر لویدو",
    DayForecast: "7-ورځنۍ وړاندوینه",
    HourlyForecast: "ساعت وار وړاندوينه",
    ForecastFor: "لپاره وړاندوینه",
    Humidity: "رطوبت",
    Wind: "باد",
    Pressure: "فشار",
    Visibility: "لید",
    UVIndex: "UV شاخص",
    Precipitation: "باران",
    MoonPhase: "د سپوږمۍ مرحله",
    Moonrise: "د سپوږمۍ راختل",
    Moonset: "د سپوږمۍ پریوتل",
    CurrentWeatherFor: "لپاره اوسنۍ هوا",
    Today: "نن",
    Day: "ورځ",
    Night: "شپه",
    MaxTemp: "اعظمي تودوخه",
    MinTemp: "لږترلږه تودوخه",
    AvgTemp: "اوسط تودوخه",
    chanceOfRain: "د باران احتمال",
    chanceOfSnow: "د واورې احتمال"
  },
  mr: { // Marathi translations
    AppName: "क्लाइमाकास्ट ✨", // Updated
    EnterCity: "🌆 शहर प्रविष्ट करा",
    Search: "🔍",
    Language: "भाषा:",
    DarkMode: "🌙 गडद मोड",
    Units: "°C/°F",
    Voice: "🎤 आवाज",
    UseMyLocation: "📍 माझे स्थान वापरा",
    PleaseEnterCity: "⚠️ कृपया शहर प्रविष्ट करा किंवा आपले स्थान वापरा.",
    ErrorFetchingData: "⚠️ डेटा मिळविण्यात अक्षम. कृपया आपले इंटरनेट कनेक्शन तपासा किंवा नंतर पुन्हा प्रयत्न करा.",
    GeolocationError: "❌ भौगोलिक स्थान त्रुटी: {error}. कृपया स्थान प्रवेशाची परवानगी द्या.",
    GeolocationNotSupported: "⚠️ या ब्राउझरमध्ये भौगोलिक स्थान समर्थित नाही.",
    VoiceInputNotSupported: "🎤 आपल्या ब्राउझरमध्ये आवाज इनपुट समर्थित नाही. क्रोम किंवा एज वापरून पहा.",
    VoiceInputError: "🎤 आवाज इनपुट त्रुटी: {error}. कृपया पुन्हा प्रयत्न करा.",
    Listening: "🎤 ऐकत आहे...",
    Temperature: "तापमान",
    Condition: "स्थिती",
    FeelsLike: "असे वाटते",
    Sunrise: "सूर्य उगवणे",
    Sunset: "सूर्य मावळणे",
    DayForecast: "7-दिवसांचा अंदाज",
    HourlyForecast: "तासभराचा अंदाज",
    ForecastFor: "साठी अंदाज",
    Humidity: "आर्द्रता",
    Wind: "वारा",
    Pressure: "दाब",
    Visibility: "दृश्यमानता",
    UVIndex: "यूव्ही निर्देशांक",
    Precipitation: "पाऊस",
    MoonPhase: "चंद्राची कला",
    Moonrise: "चंद्रोदय",
    Moonset: "चंद्रास्त",
    CurrentWeatherFor: "साठी सध्याचे हवामान",
    Today: "आज",
    Day: "दिवस",
    Night: "रात्र",
    MaxTemp: "जास्तीत जास्त तापमान",
    MinTemp: "किमान तापमान",
    AvgTemp: "सरासरी तापमान",
    chanceOfRain: "पावसाची शक्यता",
    chanceOfSnow: "बर्फाची शक्यता"
  },
  ar: { // Arabic translations
    AppName: "كلائماكاسٹ ✨", // Updated
    EnterCity: "🌆 أدخل المدينة",
    Search: "🔍",
    Language: "اللغة:",
    DarkMode: "🌙 الوضع الداكن",
    Units: "°C/°F",
    Voice: "🎤 صوت",
    UseMyLocation: "📍 استخدام موقعي",
    PleaseEnterCity: "⚠️ يرجى إدخال مدينة أو استخدام موقعك.",
    ErrorFetchingData: "⚠️ تعذر جلب البيانات. يرجى التحقق من اتصالك بالإنترنت أو المحاولة مرة أخرى لاحقًا.",
    GeolocationError: "❌ خطأ في تحديد الموقع الجغرافي: {error}. يرجى السماح بالوصول إلى الموقع.",
    GeolocationNotSupported: "⚠️ لا يدعم هذا المتصفح تحديد الموقع الجغرافي.",
    VoiceInputNotSupported: "🎤 إدخال الصوت غير مدعوم من متصفحك. جرب كروم أو إيدج.",
    VoiceInputError: "🎤 خطأ في إدخال الصوت: {error}. يرجى المحاولة مرة أخرى.",
    Listening: "🎤 جاري الاستماع...",
    Temperature: "درجة الحرارة",
    Condition: "الحالة",
    FeelsLike: "يبدو وكأن",
    Sunrise: "شروق الشمس",
    Sunset: "غروب الشمس",
    DayForecast: "توقعات 7 أيام",
    HourlyForecast: "توقعات كل ساعة",
    ForecastFor: "توقعات لـ",
    Humidity: "الرطوبة",
    Wind: "الرياح",
    Pressure: "الضغط",
    Visibility: "الرؤية",
    UVIndex: "مؤشر الأشعة فوق البنفسجية",
    Precipitation: "هطول الأمطار",
    MoonPhase: "طور القمر",
    Moonrise: "شروق القمر",
    Moonset: "غروب القمر",
    CurrentWeatherFor: "الطقس الحالي لـ",
    Today: "اليوم",
    Day: "النهار",
    Night: "الليل",
    MaxTemp: "أقصى درجة حرارة",
    MinTemp: "أدنى درجة حرارة",
    AvgTemp: "متوسط درجة الحرارة",
    chanceOfRain: "فرصة هطول الأمطار",
    chanceOfSnow: "فرصة تساقط الثلوج"
  }
};

// --- Helper Functions ---

function translate(key, lang) {
  const currentLang = lang || languageSelect.value;
  return translations[currentLang]?.[key] || key;
}

function updateUIStrings() {
  const currentLang = languageSelect.value;
  document.querySelector('h1').textContent = translate('AppName', currentLang);
  locationInput.placeholder = translate('EnterCity', currentLang);
  document.querySelector('.controls button:nth-of-type(1)').textContent = translate('Search', currentLang);
  document.querySelector('.geobutton button').textContent = translate('UseMyLocation', currentLang);
  document.querySelector('.language-switch label').textContent = translate('Language', currentLang);
  document.querySelector('label[for="themeToggle"]').textContent = translate('DarkMode', currentLang);
  document.querySelector('label[for="unitToggle"]').textContent = translate('Units', currentLang);
  micBtn.textContent = translate('Voice', currentLang);
  // Re-render forecast headers if already displayed
  if (hourlyForecastResult.innerHTML) {
      hourlyForecastResult.querySelector('h3').textContent = `⏰ ${translate("HourlyForecast", currentLang)}`;
  }
  if (forecastResult.innerHTML) {
      forecastResult.querySelector('h3').textContent = `🔮 ${translate("DayForecast", currentLang)}`;
  }
}

function showLoading() {
  loadingSpinner.style.display = "block";
  weatherResult.innerHTML = "";
  forecastResult.innerHTML = "";
  hourlyForecastResult.innerHTML = "";
}

function hideLoading() {
  loadingSpinner.style.display = "none";
}

function updateDateTime() {
  const now = new Date();
  datetimeEl.textContent = now.toLocaleString(languageSelect.value);
}
setInterval(updateDateTime, 1000);
updateDateTime();

// --- Weather Condition to Emoji Map ---
function getEmojiIcon(conditionCode, isDay) {
    const emojiMap = {
        1000: isDay ? '☀️' : '⭐', // Sunny / Clear (night)
        1003: isDay ? '⛅' : '☁️', // Partly Cloudy / Partly Cloudy (night)
        1006: '☁️', // Cloudy
        1009: '☁️', // Overcast
        1030: '🌫️', // Mist
        1135: '🌫️', // Fog
        1147: '🌫️', // Freezing fog
        1063: '🌦️', // Patchy rain possible
        1150: '🌧️', // Patchy light drizzle
        1153: '🌧️', // Light drizzle
        1180: '🌧️', // Patchy light rain
        1183: '🌧️', // Light rain
        1186: '☔', // Moderate rain at times
        1189: '☔', // Moderate rain
        1192: '⛈️', // Heavy rain at times
        1195: '⛈️', // Heavy rain
        1240: '💧', // Light rain shower
        1243: '💦', // Moderate or heavy rain shower
        1246: '💦', // Torrential rain shower
        1072: '🧊🌧️', // Freezing drizzle possible
        1168: '🧊🌧️', // Freezing drizzle
        1171: '🧊🌧️', // Heavy freezing drizzle
        1198: '🧊☔', // Light freezing rain
        1201: '🧊☔', // Moderate or heavy freezing rain
        1204: '🌨️', // Light sleet
        1207: '🌨️', // Moderate or heavy sleet
        1249: '🌨️', // Light sleet showers
        1252: '🌨️', // Moderate or heavy sleet showers
        1114: '🌬️❄️', // Blowing snow
        1117: '🌨️', // Blizzard
        1210: '🌨️', // Patchy light snow
        1213: '🌨️', // Light snow
        1216: '🌨️', // Patchy moderate snow
        1219: '🌨️', // Moderate snow
        1222: '❄️', // Patchy heavy snow
        1225: '❄️', // Heavy snow
        1255: '❄️', // Light snow showers
        1258: '❄️', // Moderate or heavy snow showers
        1237: '🧊', // Ice pellets
        1261: '🧊', // Light showers of ice pellets
        1264: '🧊', // Moderate or heavy showers of ice pellets
        1087: '⚡', // Thundery outbreaks possible
        1273: '⛈️', // Patchy light rain with thunder
        1276: '⛈️', // Moderate or heavy rain with thunder
        1279: '⛈️', // Patchy light snow with thunder
        1282: '⛈️'  // Moderate or heavy snow with thunder
    };
    return emojiMap[conditionCode] || '❓';
}

// --- Text Color Based on Weather ---
function getTextColor(conditionCode, isDay, isDarkMode) {
  const colors = {
    day: {
      default: isDarkMode ? '#f0f0f0' : '#333',
      1000: isDarkMode ? '#FFFACD' : '#FFD700',
      1003: isDarkMode ? '#E0FFFF' : '#6A5ACD',
      1006: isDarkMode ? '#C0C0C0' : '#708090',
      1009: isDarkMode ? '#A9A9A9' : '#586270',
      1030: isDarkMode ? '#D3D3D3' : '#808080',
      1063: isDarkMode ? '#ADD8E6' : '#4682B4',
      1150: isDarkMode ? '#B0E0E6' : '#5F9EA0',
      1180: isDarkMode ? '#A9D8E6' : '#6495ED',
      1183: isDarkMode ? '#87CEFA' : '#4169E1',
      1186: isDarkMode ? '#6A8FBC' : '#36454F',
      1192: isDarkMode ? '#6A8FBC' : '#36454F',
      1195: isDarkMode ? '#6A8FBC' : '#36454F',
      1240: isDarkMode ? '#ADD8E6' : '#4682B4',
      1243: isDarkMode ? '#87CEFA' : '#4169E1',
      1246: isDarkMode ? '#6A8FBC' : '#36454F',
      1072: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1168: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1171: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1198: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1201: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1204: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1207: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1249: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1252: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1114: isDarkMode ? '#F8F8FF' : '#B0C4DE',
      1117: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1210: isDarkMode ? '#E0FFFF' : '#C6E2FF',
      1213: isDarkMode ? '#E0FFFF' : '#C6E2FF',
      1216: isDarkMode ? '#E0FFFF' : '#C6E2FF',
      1219: isDarkMode ? '#E0FFFF' : '#C6E2FF',
      1222: isDarkMode ? '#B0C4DE' : '#87CEEB',
      1225: isDarkMode ? '#B0C4DE' : '#87CEEB',
      1255: isDarkMode ? '#B0C4DE' : '#87CEEB',
      1258: isDarkMode ? '#B0C4DE' : '#87CEEB',
      1237: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1261: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1264: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1087: isDarkMode ? '#C2B280' : '#8B0000',
      1273: isDarkMode ? '#FF4500' : '#A52A2A',
      1276: isDarkMode ? '#FF4500' : '#A52A2A',
      1279: isDarkMode ? '#FF4500' : '#A52A2A',
      1282: isDarkMode ? '#FF4500' : '#A52A2A'
    },
    night: {
      default: isDarkMode ? '#f0f0f0' : '#333',
      1000: isDarkMode ? '#FFFACD' : '#FFD700',
      1003: isDarkMode ? '#E0FFFF' : '#6A5ACD',
      1006: isDarkMode ? '#C0C0C0' : '#708090',
      1009: isDarkMode ? '#A9A9A9' : '#586270',
      1030: isDarkMode ? '#D3D3D3' : '#808080',
      1063: isDarkMode ? '#ADD8E6' : '#4682B4',
      1150: isDarkMode ? '#B0E0E6' : '#5F9EA0',
      1180: isDarkMode ? '#A9D8E6' : '#6495ED',
      1183: isDarkMode ? '#87CEFA' : '#4169E1',
      1186: isDarkMode ? '#6A8FBC' : '#36454F',
      1192: isDarkMode ? '#6A8FBC' : '#36454F',
      1195: isDarkMode ? '#6A8FBC' : '#36454F',
      1240: isDarkMode ? '#ADD8E6' : '#4682B4',
      1243: isDarkMode ? '#87CEFA' : '#4169E1',
      1246: isDarkMode ? '#6A8FBC' : '#36454F',
      1072: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1168: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1171: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1198: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1201: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1204: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1207: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1249: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1252: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1114: isDarkMode ? '#F8F8FF' : '#B0C4DE',
      1117: isDarkMode ? '#F0F8FF' : '#ADD8E6',
      1210: isDarkMode ? '#E0FFFF' : '#C6E2FF',
      1213: isDarkMode ? '#E0FFFF' : '#C6E2FF',
      1216: isDarkMode ? '#E0FFFF' : '#C6E2FF',
      1219: isDarkMode ? '#E0FFFF' : '#C6E2FF',
      1222: isDarkMode ? '#B0C4DE' : '#87CEEB',
      1225: isDarkMode ? '#B0C4DE' : '#87CEEB',
      1255: isDarkMode ? '#B0C4DE' : '#87CEEB',
      1258: isDarkMode ? '#B0C4DE' : '#87CEEB',
      1237: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1261: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1264: isDarkMode ? '#E6E6FA' : '#6A5ACD',
      1087: isDarkMode ? '#C2B280' : '#8B0000',
      1273: isDarkMode ? '#FF4500' : '#A52A2A',
      1276: isDarkMode ? '#FF4500' : '#A52A2A',
      1279: isDarkMode ? '#FF4500' : '#A52A2A',
      1282: isDarkMode ? '#FF4500' : '#A52A2A'
    }
  };

  const timeOfDay = isDay ? 'day' : 'night';
  const selectedColors = colors[timeOfDay];
  return selectedColors[conditionCode] || selectedColors.default;
}

// --- Main Weather Functions ---

async function getWeather(city = null) {
  const location = city || locationInput.value;
  const language = languageSelect.value;
  const isFahrenheit = unitToggle.checked;
  const isDarkMode = themeToggle.checked;

  updateUIStrings();

  if (!location) {
    weatherResult.innerHTML = `<p>${translate("PleaseEnterCity", language)}</p>`;
    forecastResult.innerHTML = "";
    hourlyForecastResult.innerHTML = "";
    return;
  }

  showLoading();

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no&lang=${language}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    hideLoading();

    if (data.error) {
      let errorMessage = data.error.message;
      const apiErrorTranslations = {
        "No matching location found.": "No matching location found.",
        "Parameter 'q' not provided.": "Please enter a city or use your location.",
      };
      errorMessage = apiErrorTranslations[errorMessage] ? translate(apiErrorTranslations[errorMessage], language) : errorMessage;

      weatherResult.innerHTML = `<p>❌ ${errorMessage}</p>`;
      forecastResult.innerHTML = "";
      hourlyForecastResult.innerHTML = "";
      return;
    }

    displayCurrentWeather(data, language, isFahrenheit, isDarkMode);
    displayHourlyForecast(data, language, isFahrenheit, isDarkMode);
    displayForecast(data, language, isFahrenheit, isDarkMode);

  } catch (error) {
    hideLoading();
    console.error("Error fetching weather data:", error);
    weatherResult.innerHTML = `<p>${translate("ErrorFetchingData", language)}</p>`;
    forecastResult.innerHTML = "";
    hourlyForecastResult.innerHTML = "";
  }
}

function displayCurrentWeather(data, language, isFahrenheit, isDarkMode) {
  const temp = isFahrenheit ? data.current.temp_f : data.current.temp_c;
  const unit = isFahrenheit ? "°F" : "°C";
  const feelsLike = isFahrenheit ? data.current.feelslike_f + unit : data.current.feelslike_c + unit;
  const condition = data.current.condition.text;
  const iconEmoji = getEmojiIcon(data.current.condition.code, data.current.is_day === 1);
  const textColor = getTextColor(data.current.condition.code, data.current.is_day === 1, isDarkMode);


  weatherResult.innerHTML = `
    <h2 style="color: ${textColor};">${translate("CurrentWeatherFor", language)} ${data.location.name}, ${data.location.country}</h2>
    <span class="main-icon" style="color: ${textColor};">${iconEmoji}</span>
    <p class="main-temp" style="color: ${textColor};">${temp}${unit}</p>
    <p style="color: ${textColor};">${translate("Condition", language)}: ${condition}</p>
    <p style="color: ${textColor};">${translate("FeelsLike", language)}: ${feelsLike}</p>
    <p style="color: ${textColor};">${translate("Humidity", language)}: ${data.current.humidity}%</p>
    <p style="color: ${textColor};">${translate("Wind", language)}: ${isFahrenheit ? data.current.wind_mph + ' mph' : data.current.wind_kph + ' kph'}</p>
    <p style="color: ${textColor};">${translate("Pressure", language)}: ${isFahrenheit ? data.current.pressure_in + ' in' : data.current.pressure_mb + ' mb'}</p>
    <p style="color: ${textColor};">${translate("Visibility", language)}: ${isFahrenheit ? data.current.vis_miles + ' miles' : data.current.vis_km + ' km'}</p>
    <p style="color: ${textColor};">${translate("UVIndex", language)}: ${data.current.uv}</p>
    <p style="color: ${textColor};">${translate("Sunrise", language)}: ${data.forecast.forecastday[0].astro.sunrise} | ${translate("Sunset", language)}: ${data.forecast.forecastday[0].astro.sunset}</p>
    <p style="color: ${textColor};">${translate("Moonrise", language)}: ${data.forecast.forecastday[0].astro.moonrise} | ${translate("Moonset", language)}: ${data.forecast.forecastday[0].astro.moonset}</p>
    <p style="color: ${textColor};">${translate("MoonPhase", language)}: ${data.forecast.forecastday[0].astro.moon_phase}</p>
  `;
}

function displayHourlyForecast(data, language, isFahrenheit, isDarkMode) {
  let hourlyHTML = `<h3 style="color: ${getTextColor(data.current.condition.code, data.current.is_day === 1, isDarkMode)};">⏰ ${translate("HourlyForecast", language)}</h3><div class="hourly-forecast-cards">`;
  const currentHour = new Date(data.location.localtime).getHours();

  const todayHourlyData = data.forecast.forecastday[0].hour;

  let upcomingHours = todayHourlyData.filter(h => {
    const hourTime = new Date(h.time_epoch * 1000).getHours();
    return hourTime >= currentHour;
  });

  if (upcomingHours.length < 24 && data.forecast.forecastday[1]) {
    const tomorrowHourlyData = data.forecast.forecastday[1].hour;
    upcomingHours.push(...tomorrowHourlyData.slice(0, 24 - upcomingHours.length));
  }

  upcomingHours.slice(0, 24).forEach(hourData => {
    const hour = new Date(hourData.time_epoch * 1000);
    const displayHour = hour.toLocaleString(language, { hour: 'numeric', hour12: true });
    const hourTemp = isFahrenheit ? hourData.temp_f + "°F" : hourData.temp_c + "°C";
    const iconEmoji = getEmojiIcon(hourData.condition.code, hourData.is_day === 1);
    const isToday = hour.getDate() === new Date(data.location.localtime).getDate();
    const dayLabel = isToday ? translate("Today", language) : hour.toLocaleDateString(language, { weekday: 'short' });
    const cardTextColor = getTextColor(hourData.condition.code, hourData.is_day === 1, isDarkMode);

    hourlyHTML += `
      <div class="hourly-card" style="color: ${cardTextColor};">
        <strong>${displayHour}</strong><br>
        <span class="icon-small">${iconEmoji}</span><br>
        ${hourTemp}<br>
        <small>${hourData.condition.text}</small><br>
        <small>${dayLabel}</small>
      </div>
    `;
  });
  hourlyHTML += `</div>`;
  hourlyForecastResult.innerHTML = hourlyHTML;
}

function displayForecast(data, language, isFahrenheit, isDarkMode) {
  let forecastHTML = `<h3 style="color: ${getTextColor(data.current.condition.code, data.current.is_day === 1, isDarkMode)};">🔮 ${translate("DayForecast", language)}</h3><div class="daily-forecast-cards">`;
  data.forecast.forecastday.forEach((day, index) => {
    const dateObj = new Date(day.date);
    let dayLabel = dateObj.toLocaleDateString(language, { weekday: 'short', month: 'short', day: 'numeric' });
    if (index === 0) {
        dayLabel = translate("Today", language);
    }
    const maxTemp = isFahrenheit ? day.day.maxtemp_f + "°F" : day.day.maxtemp_c + "°C";
    const minTemp = isFahrenheit ? day.day.mintemp_f + "°F" : day.day.mintemp_c + "°C";
    const avgTemp = isFahrenheit ? day.day.avgtemp_f + "°F" : day.day.avgtemp_c + "°C";
    const condition = day.day.condition.text;
    const iconEmoji = getEmojiIcon(day.day.condition.code, true);
    const cardTextColor = getTextColor(day.day.condition.code, true, isDarkMode);

    forecastHTML += `
      <div class="daily-card" style="color: ${cardTextColor};">
        <strong>${dayLabel}</strong>
        <span class="icon-small">${iconEmoji}</span>
        <span class="temp-info">${condition}</span>
        <small>${translate("MaxTemp", language)}: ${maxTemp}</small>
        <small>${translate("MinTemp", language)}: ${minTemp}</small>
        <small>${translate("AvgTemp", language)}: ${avgTemp}</small>
        <small>${translate("chanceOfRain", language)}: ${day.day.daily_chance_of_rain}%</small>
        <small>${translate("chanceOfSnow", language)}: ${day.day.daily_chance_of_snow}%</small>
      </div>
    `;
  });
  forecastHTML += `</div>`;
  forecastResult.innerHTML = forecastHTML;
}

// --- Event Listeners ---

function toggleUnits() {
  getWeather();
}

function useGeolocation() {
  showLoading();
  const currentLang = languageSelect.value;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latlon = `${position.coords.latitude},${position.coords.longitude}`;
      getWeather(latlon);
    }, (error) => {
      hideLoading();
      weatherResult.innerHTML = `<p>${translate("GeolocationError", currentLang).replace('{error}', error.message)}</p>`;
      forecastResult.innerHTML = "";
      hourlyForecastResult.innerHTML = "";
    });
  } else {
    hideLoading();
    weatherResult.innerHTML = `<p>${translate("GeolocationNotSupported", currentLang)}</p>`;
    forecastResult.innerHTML = "";
    hourlyForecastResult.innerHTML = "";
  }
}

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", themeToggle.checked);
  // Re-fetch weather to update text colors based on dark mode state
  getWeather(locationInput.value || "Washim"); // Use Washim as default if no input
});

// Add ripple effect to all buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      this.removeChild(ripple);
    });
  });
});

micBtn.addEventListener("click", () => {
  const currentLang = languageSelect.value;
  if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    weatherResult.innerHTML = `<p>${translate("VoiceInputNotSupported", currentLang)}</pاهرة`;
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = currentLang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  micBtn.textContent = translate("Listening", currentLang);
  micBtn.disabled = true;

  recognition.start();

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    locationInput.value = transcript;
    micBtn.textContent = translate("Voice", currentLang);
    micBtn.disabled = false;
    getWeather();
  };

  recognition.onspeechend = () => {
    recognition.stop();
    micBtn.textContent = translate("Voice", currentLang);
    micBtn.disabled = false;
  };

  recognition.onerror = (event) => {
    micBtn.textContent = translate("Voice", currentLang);
    micBtn.disabled = false;
    weatherResult.innerHTML = `<p>${translate("VoiceInputError", currentLang).replace('{error}', event.error)}</p>`;
  };
});

languageSelect.addEventListener("change", () => {
    getWeather();
    updateUIStrings();
    updateDateTime();
});

unitToggle.addEventListener("change", toggleUnits);

document.addEventListener("DOMContentLoaded", () => {
    updateUIStrings();
    getWeather("Washim"); // Default city set to Washim
});