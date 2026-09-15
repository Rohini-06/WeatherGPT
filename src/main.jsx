import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  MapPin,
  Search,
  Mic,
  Send,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Moon,
  Navigation,
} from "lucide-react";

import "./styles.css";

// ============================================================
// LANGUAGE CONFIGURATION
// ============================================================

const LANGUAGES = {
  English: {
    code: "en-IN",
    label: "English",
  },

  Tamil: {
    code: "ta-IN",
    label: "தமிழ்",
  },

  Hindi: {
    code: "hi-IN",
    label: "हिन्दी",
  },

  Telugu: {
    code: "te-IN",
    label: "తెలుగు",
  },

  Kannada: {
    code: "kn-IN",
    label: "ಕನ್ನಡ",
  },

  Malayalam: {
    code: "ml-IN",
    label: "മലയാളം",
  },
};


// ============================================================
// WEATHER DESCRIPTION
// ============================================================

function getWeatherDescription(code, language) {

  const descriptions = {

    English: {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Cloudy",
      45: "Foggy",
      48: "Foggy",
      51: "Light Drizzle",
      53: "Drizzle",
      55: "Heavy Drizzle",
      61: "Light Rain",
      63: "Rain",
      65: "Heavy Rain",
      71: "Light Snow",
      73: "Snow",
      75: "Heavy Snow",
      80: "Rain Showers",
      81: "Rain Showers",
      82: "Heavy Rain Showers",
      95: "Thunderstorm",
      96: "Thunderstorm",
      99: "Thunderstorm",
    },

    Tamil: {
      0: "தெளிவான வானம்",
      1: "பெரும்பாலும் தெளிவு",
      2: "பகுதி மேகமூட்டம்",
      3: "மேகமூட்டம்",
      45: "மூடுபனி",
      48: "மூடுபனி",
      51: "லேசான தூறல்",
      53: "தூறல்",
      55: "பலத்த தூறல்",
      61: "லேசான மழை",
      63: "மழை",
      65: "பலத்த மழை",
      71: "லேசான பனிப்பொழிவு",
      73: "பனிப்பொழிவு",
      75: "பலத்த பனிப்பொழிவு",
      80: "மழை சாரல்",
      81: "மழை சாரல்",
      82: "பலத்த மழை சாரல்",
      95: "இடியுடன் மழை",
      96: "இடியுடன் மழை",
      99: "இடியுடன் மழை",
    },

    Hindi: {
      0: "साफ आसमान",
      1: "मुख्य रूप से साफ",
      2: "आंशिक बादल",
      3: "बादल छाए हुए",
      45: "कोहरा",
      48: "कोहरा",
      51: "हल्की बूंदाबांदी",
      53: "बूंदाबांदी",
      55: "तेज बूंदाबांदी",
      61: "हल्की बारिश",
      63: "बारिश",
      65: "भारी बारिश",
      80: "बारिश की बौछार",
      81: "बारिश की बौछार",
      82: "तेज बारिश",
      95: "गरज के साथ बारिश",
      96: "गरज के साथ बारिश",
      99: "गरज के साथ बारिश",
    },

    Telugu: {
      0: "స్పష్టమైన ఆకాశం",
      1: "ప్రధానంగా స్పష్టం",
      2: "కొంత మేఘావృతం",
      3: "మేఘావృతం",
      45: "పొగమంచు",
      48: "పొగమంచు",
      51: "తేలికపాటి జల్లులు",
      53: "జల్లులు",
      55: "భారీ జల్లులు",
      61: "తేలికపాటి వర్షం",
      63: "వర్షం",
      65: "భారీ వర్షం",
      80: "వర్షపు జల్లులు",
      81: "వర్షపు జల్లులు",
      82: "భారీ వర్షపు జల్లులు",
      95: "ఉరుములతో వర్షం",
      96: "ఉరుములతో వర్షం",
      99: "ఉరుములతో వర్షం",
    },

    Kannada: {
      0: "ಸ್ಪಷ್ಟ ಆಕಾಶ",
      1: "ಮುಖ್ಯವಾಗಿ ಸ್ಪಷ್ಟ",
      2: "ಭಾಗಶಃ ಮೋಡ",
      3: "ಮೋಡ ಕವಿದಿದೆ",
      45: "ಮಂಜು",
      48: "ಮಂಜು",
      51: "ಲಘು ತುಂತುರು ಮಳೆ",
      53: "ತುಂತುರು ಮಳೆ",
      55: "ಭಾರಿ ತುಂತುರು ಮಳೆ",
      61: "ಲಘು ಮಳೆ",
      63: "ಮಳೆ",
      65: "ಭಾರಿ ಮಳೆ",
      80: "ಮಳೆಯ ಸಿಂಚನ",
      81: "ಮಳೆಯ ಸಿಂಚನ",
      82: "ಭಾರಿ ಮಳೆ",
      95: "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
      96: "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
      99: "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
    },

    Malayalam: {
      0: "തെളിഞ്ഞ ആകാശം",
      1: "പ്രധാനമായും തെളിഞ്ഞത്",
      2: "ഭാഗികമായി മേഘാവൃതം",
      3: "മേഘാവൃതം",
      45: "മൂടൽമഞ്ഞ്",
      48: "മൂടൽമഞ്ഞ്",
      51: "നേരിയ ചാറ്റൽമഴ",
      53: "ചാറ്റൽമഴ",
      55: "കനത്ത ചാറ്റൽമഴ",
      61: "നേരിയ മഴ",
      63: "മഴ",
      65: "കനത്ത മഴ",
      80: "മഴച്ചാറ്റൽ",
      81: "മഴച്ചാറ്റൽ",
      82: "കനത്ത മഴച്ചാറ്റൽ",
      95: "ഇടിമിന്നലോടുകൂടിയ മഴ",
      96: "ഇടിമിന്നലോടുകൂടിയ മഴ",
      99: "ഇടിമിന്നലോടുകൂടിയ മഴ",
    },
  };

  return (
    descriptions[language]?.[code] ||
    descriptions.English[code] ||
    "Weather"
  );
}


// ============================================================
// WEATHER EMOJI
// ============================================================

function getWeatherEmoji(code) {

  if (code === 0) return "☀️";

  if ([1, 2, 3].includes(code)) return "⛅";

  if ([45, 48].includes(code)) return "🌫️";

  if ([51, 53, 55].includes(code)) return "🌦️";

  if ([61, 63, 65].includes(code)) return "🌧️";

  if ([80, 81, 82].includes(code)) return "🌦️";

  if ([95, 96, 99].includes(code)) return "⛈️";

  return "🌤️";
}


// ============================================================
// DAY FORMAT
// ============================================================

function formatDay(dateString, index, language) {

  if (index === 0) {

    const today = {
      English: "Today",
      Tamil: "இன்று",
      Hindi: "आज",
      Telugu: "ఈరోజు",
      Kannada: "ಇಂದು",
      Malayalam: "ഇന്ന്",
    };

    return today[language];
  }

  const date = new Date(dateString);

  const localeMap = {
    English: "en-IN",
    Tamil: "ta-IN",
    Hindi: "hi-IN",
    Telugu: "te-IN",
    Kannada: "kn-IN",
    Malayalam: "ml-IN",
  };

  return date.toLocaleDateString(
    localeMap[language] || "en-IN",
    {
      weekday: "short",
    }
  );
}
// ============================================================
// WEATHER CHART DATA
// ============================================================

function getChartMax(values) {
  if (!values || values.length === 0) return 1;
  return Math.max(...values, 1);
}



// ============================================================
// FIND LOCATION NAME FROM USER QUESTION
// ============================================================

function extractLocationFromQuestion(question) {

  const text = question.trim();

  // Only treat a phrase as a location when the user clearly uses
  // a location keyword such as "in", "at", "for", or "near".
  // Time words like "today", "tomorrow", and "tonight" are ignored.
  // This prevents questions such as "Will it rain while travelling tomorrow?"
  // from being mistaken for a city name.
  const match = text.match(
    /\b(?:in|at|near)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)?)\s*(?:today|tomorrow|tonight|now|this\s+(?:morning|afternoon|evening)|next\s+(?:day|week))?\s*[?.!]*$/i
  );

  if (!match) {
    return null;
  }

  let candidate = match[1].trim();

  // Remove common trailing time words if they were captured as part
  // of the two-word candidate.
  candidate = candidate.replace(
    /\s+(today|tomorrow|tonight|now)$/i,
    ""
  ).trim();

  if (!candidate) {
    return null;
  }

  // These are conversation/weather words, not city names.
  const blockedWords = [
    "weather",
    "rain",
    "raining",
    "temperature",
    "climate",
    "travelling",
    "traveling",
    "travel",
    "bike",
    "car",
    "tomorrow",
    "today",
    "tonight",
    "morning",
    "afternoon",
    "evening",
    "night",
  ];

  if (
    blockedWords.some(
      (word) => candidate.toLowerCase() === word
    )
  ) {
    return null;
  }

  return candidate;
}


// ============================================================
// CONTEXT BASED WEATHER RESPONSE
// ============================================================

function generateResponse(
  question,
  weather,
  location,
  language
) {

  if (!weather) {

    const loadingMessages = {
      English: "Please wait while I load the weather.",
      Tamil: "வானிலை தகவலை ஏற்றும் வரை காத்திருக்கவும்.",
      Hindi: "मौसम की जानकारी लोड होने तक प्रतीक्षा करें।",
      Telugu: "వాతావరణ సమాచారాన్ని లోడ్ చేసే వరకు వేచి ఉండండి.",
      Kannada: "ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡುವವರೆಗೆ ಕಾಯಿರಿ.",
      Malayalam: "കാലാവസ്ഥാ വിവരങ്ങൾ ലോഡ് ചെയ്യുന്നത് വരെ കാത്തിരിക്കുക."
    };

    return loadingMessages[language];
  }

  const q = question.toLowerCase().trim();
  const current = weather.current;
  const daily = weather.daily;

  const temperature = Math.round(current.temperature_2m);
  const feelsLike = Math.round(current.apparent_temperature);
  const humidity = current.relative_humidity_2m;
  const wind = current.wind_speed_10m;
  const rainProbability = daily.precipitation_probability_max?.[0] ?? 0;
  const condition = getWeatherDescription(current.weather_code, language);

  const hourlyResponse = getHourlyQuestionResponse(question, weather, location, language);

  if (hourlyResponse) {
    return hourlyResponse;
  }

  const asksSunrise =
    q.includes("sunrise") ||
    q.includes("sun rise") ||
    q.includes("sun rises") ||
    q.includes("sunset") ||
    q.includes("sun set") ||
    q.includes("sun sets") ||
    q.includes("சூரிய உதயம்") ||
    q.includes("சூரிய அஸ்தமனம்") ||
    q.includes("सूर्योदय") ||
    q.includes("सूर्यास्त");

  if (asksSunrise) {
    const targetIndex =
      q.includes("tomorrow") || q.includes("நாளை") || q.includes("कल") ||
      q.includes("రేపు") || q.includes("ನಾಳೆ") || q.includes("നാളെ") ? 1 : 0;
    const sunrise = weather.daily?.sunrise?.[targetIndex];
    const sunset = weather.daily?.sunset?.[targetIndex];
    if (sunrise || sunset) {
      const dateLabel = targetIndex === 1 ? "tomorrow" : "today";
      return `🌅 In ${location}, ${dateLabel}'s sunrise is around ${sunrise ? sunrise.slice(11,16) : "unavailable"}, and sunset is around ${sunset ? sunset.slice(11,16) : "unavailable"}.`;
    }
  }

  const asksTomorrow =
    q.includes("tomorrow") ||
    q.includes("next day") ||
    q.includes("நாளை") ||
    q.includes("कल") ||
    q.includes("రేపు") ||
    q.includes("ನಾಳೆ") ||
    q.includes("നാളെ");

  const tomorrowIndex = 1;
  const tomorrowTemperature =
    daily.temperature_2m_max?.[tomorrowIndex] != null
      ? Math.round(daily.temperature_2m_max[tomorrowIndex])
      : null;
  const tomorrowMin =
    daily.temperature_2m_min?.[tomorrowIndex] != null
      ? Math.round(daily.temperature_2m_min[tomorrowIndex])
      : null;
  const tomorrowRain =
    daily.precipitation_probability_max?.[tomorrowIndex] ?? 0;
  const tomorrowCondition =
    daily.weather_code?.[tomorrowIndex] != null
      ? getWeatherDescription(daily.weather_code[tomorrowIndex], language)
      : null;

  // ==========================================================
  // ENGLISH
  // ==========================================================

  if (language === "English") {

    if (asksTomorrow) {
      if (tomorrowTemperature == null) {
        return `I don't have tomorrow's forecast available for ${location}.`;
      }

      return `📅 Tomorrow in ${location}, the temperature may reach ${tomorrowTemperature}°C with a low around ${tomorrowMin}°C. The forecast is ${tomorrowCondition?.toLowerCase() || "available"}, with a ${tomorrowRain}% chance of rain.`;
    }

    if (
      q.includes("rain") ||
      q.includes("raining") ||
      q.includes("umbrella")
    ) {
      if (rainProbability >= 60) {
        return `🌧️ There is a ${rainProbability}% chance of rain in ${location} today. It may rain, so carrying an umbrella is a good idea.`;
      }
      if (rainProbability >= 30) {
        return `🌦️ There is a ${rainProbability}% chance of rain in ${location} today. There is some possibility of rain, so keep an umbrella nearby.`;
      }
      return `☀️ The chance of rain in ${location} today is only ${rainProbability}%. Rain is unlikely.`;
    }

    if (
      q.includes("bike") ||
      q.includes("travel") ||
      q.includes("trip") ||
      q.includes("walk") ||
      q.includes("outside") ||
      q.includes("go out")
    ) {
      if (rainProbability >= 60) {
        return `🚗 Travelling in ${location} may be inconvenient today. The rain probability is ${rainProbability}%, so carrying rain protection is recommended.`;
      }
      if (wind >= 30) {
        return `💨 You can travel in ${location}, but the wind speed is ${wind} km/h. Please be careful while riding a bike.`;
      }
      return `🏍️ Yes, travelling in ${location} looks reasonably comfortable. It is ${temperature}°C with ${rainProbability}% rain probability and wind around ${wind} km/h.`;
    }

    if (
      q.includes("hot") ||
      q.includes("heat") ||
      q.includes("temperature") ||
      q.includes("feels like") ||
      q.includes("feeling")
    ) {
      if (feelsLike >= 35) {
        return `🌡️ ${location} is currently ${temperature}°C, but it feels like ${feelsLike}°C. It may feel quite hot, so stay hydrated and avoid prolonged sun exposure.`;
      }
      return `🌡️ ${location} is currently ${temperature}°C and feels like ${feelsLike}°C. The temperature is relatively comfortable.`;
    }

    if (q.includes("wind") || q.includes("windy")) {
      if (wind >= 30) {
        return `💨 The wind speed in ${location} is ${wind} km/h. That is fairly strong, so take care when travelling or staying outdoors.`;
      }
      return `💨 The wind speed in ${location} is ${wind} km/h. The wind conditions are relatively calm.`;
    }

    if (q.includes("humidity") || q.includes("humid")) {
      return `💧 The humidity in ${location} is ${humidity}%.`;
    }

    if (
      q.includes("farmer") ||
      q.includes("farm") ||
      q.includes("crop") ||
      q.includes("agriculture")
    ) {
      if (rainProbability >= 60) {
        return `🌱 For farming in ${location}, the rain probability is ${rainProbability}% and the temperature is ${temperature}°C. Rain may provide enough moisture, so irrigation may not be necessary.`;
      }
      return `🌱 For farming in ${location}, the temperature is ${temperature}°C and rain probability is ${rainProbability}%. Irrigation may be useful depending on soil moisture.`;
    }

    if (
      q.includes("warning") ||
      q.includes("alert") ||
      q.includes("cyclone") ||
      q.includes("flood")
    ) {
      return `⚠️ I don't see a specific severe-weather warning in the available weather data for ${location}. For official alerts, check the India Meteorological Department.`;
    }

    return `🌤️ ${location} is currently ${temperature}°C with ${condition.toLowerCase()} conditions. It feels like ${feelsLike}°C, humidity is ${humidity}%, and wind speed is ${wind} km/h.`;
  }

  // ==========================================================
  // TAMIL
  // ==========================================================

  if (language === "Tamil") {

    if (asksTomorrow) {
      return `📅 ${location}-ல் நாளை அதிகபட்ச வெப்பநிலை சுமார் ${tomorrowTemperature}°C, குறைந்தபட்சம் ${tomorrowMin}°C இருக்கும். வானிலை ${tomorrowCondition || "கணிக்கப்பட்டுள்ளது"}. மழைக்கான வாய்ப்பு ${tomorrowRain}%.`;
    }

    if (q.includes("மழை") || q.includes("குடை") || q.includes("rain")) {
      return `🌧️ ${location}-ல் இன்று மழைக்கான வாய்ப்பு ${rainProbability}%. ${rainProbability >= 60 ? "மழை பெய்ய வாய்ப்பு அதிகம். குடை எடுத்துச் செல்வது நல்லது." : rainProbability >= 30 ? "சிறிதளவு மழை வாய்ப்பு உள்ளது. குடையை அருகில் வைத்துக்கொள்ளுங்கள்." : "மழைக்கான வாய்ப்பு மிகவும் குறைவு."}`;
    }

    if (q.includes("பைக்") || q.includes("பயணம்") || q.includes("வெளியே")) {
      return `🏍️ ${location}-ல் பயணம் செய்வதற்கு வானிலை ${rainProbability >= 60 ? "சற்று சிரமமாக இருக்கலாம், மழைக்கான வாய்ப்பு அதிகமாக உள்ளது." : "ஓரளவு ஏற்றதாக உள்ளது."} வெப்பநிலை ${temperature}°C, மழை வாய்ப்பு ${rainProbability}%, காற்றின் வேகம் ${wind} km/h.`;
    }

    if (q.includes("வெப்பம்") || q.includes("சூடு") || q.includes("temperature") || q.includes("வெப்பநிலை")) {
      return `🌡️ ${location}-ல் தற்போது ${temperature}°C வெப்பநிலை உள்ளது. உணரப்படும் வெப்பநிலை ${feelsLike}°C. ${feelsLike >= 35 ? "வெப்பம் அதிகமாக உள்ளது. தண்ணீர் அதிகமாக குடிக்கவும்." : "வெப்பநிலை தற்போது சீராக உள்ளது."}`;
    }

    if (q.includes("காற்று")) {
      return `💨 ${location}-ல் காற்றின் வேகம் ${wind} km/h. ${wind >= 30 ? "காற்றின் வேகம் அதிகமாக உள்ளது." : "காற்றின் நிலை சாதாரணமாக உள்ளது."}`;
    }

    if (q.includes("ஈரப்பதம்") || q.includes("humidity")) {
      return `💧 ${location}-ல் ஈரப்பதம் ${humidity}% உள்ளது.`;
    }

    return `🌤️ ${location}-ல் தற்போது ${temperature}°C மற்றும் ${condition} நிலை உள்ளது. உணரப்படும் வெப்பநிலை ${feelsLike}°C, ஈரப்பதம் ${humidity}%, காற்றின் வேகம் ${wind} km/h.`;
  }

  // ==========================================================
  // HINDI
  // ==========================================================

  if (language === "Hindi") {

    if (asksTomorrow) {
      return `📅 कल ${location} में अधिकतम तापमान लगभग ${tomorrowTemperature}°C और न्यूनतम ${tomorrowMin}°C रह सकता है। मौसम ${tomorrowCondition || "उपलब्ध पूर्वानुमान के अनुसार"} रहेगा और बारिश की संभावना ${tomorrowRain}% है।`;
    }

    if (q.includes("बारिश") || q.includes("rain") || q.includes("छाता")) {
      return `🌧️ ${location} में आज बारिश की संभावना ${rainProbability}% है। ${rainProbability >= 60 ? "बारिश की संभावना अधिक है, इसलिए छाता साथ रखें।" : rainProbability >= 30 ? "थोड़ी बारिश की संभावना है।" : "बारिश की संभावना बहुत कम है।"}`;
    }

    if (q.includes("बाइक") || q.includes("यात्रा") || q.includes("बाहर") || q.includes("travel")) {
      return `🏍️ ${location} में यात्रा के लिए मौसम ${rainProbability >= 60 ? "थोड़ा असुविधाजनक हो सकता है।" : "काफी ठीक है।"} तापमान ${temperature}°C है और बारिश की संभावना ${rainProbability}% है।`;
    }

    if (q.includes("गर्मी") || q.includes("तापमान") || q.includes("temperature")) {
      return `🌡️ ${location} में अभी तापमान ${temperature}°C है और महसूस होने वाला तापमान ${feelsLike}°C है। ${feelsLike >= 35 ? "गर्मी अधिक महसूस हो रही है, इसलिए पर्याप्त पानी पिएं।" : "तापमान अभी सामान्य है।"}`;
    }

    if (q.includes("हवा") || q.includes("wind")) {
      return `💨 ${location} में हवा की गति ${wind} km/h है। ${wind >= 30 ? "हवा तेज है, इसलिए बाहर सावधान रहें।" : "हवा की स्थिति सामान्य है।"}`;
    }

    return `🌤️ ${location} में अभी ${temperature}°C तापमान है और मौसम ${condition} है। महसूस होने वाला तापमान ${feelsLike}°C है, नमी ${humidity}% और हवा ${wind} km/h है।`;
  }

  // ==========================================================
  // TELUGU
  // ==========================================================

  if (language === "Telugu") {

    if (asksTomorrow) {
      return `📅 రేపు ${location}లో గరిష్ట ఉష్ణోగ్రత సుమారు ${tomorrowTemperature}°C మరియు కనిష్టం ${tomorrowMin}°C ఉండవచ్చు. వాతావరణం ${tomorrowCondition || "అంచనా ప్రకారం"}. వర్షం అవకాశం ${tomorrowRain}%.`;
    }

    if (q.includes("వర్షం") || q.includes("rain") || q.includes("గొడుగు")) {
      return `🌧️ ${location}లో ఈరోజు వర్షం వచ్చే అవకాశం ${rainProbability}%. ${rainProbability >= 60 ? "వర్షం వచ్చే అవకాశం ఎక్కువగా ఉంది, కాబట్టి గొడుగు తీసుకెళ్లండి." : "వర్షం వచ్చే అవకాశం తక్కువగా ఉంది."}`;
    }

    if (q.includes("బైక్") || q.includes("ప్రయాణం") || q.includes("బయట") || q.includes("travel")) {
      return `🏍️ ${location}లో ప్రయాణానికి వాతావరణం ${rainProbability >= 60 ? "కొంచెం అసౌకర్యంగా ఉండవచ్చు." : "సరిపడా అనుకూలంగా ఉంది."} ఉష్ణోగ్రత ${temperature}°C, వర్షం అవకాశం ${rainProbability}%.`;
    }

    if (q.includes("వేడి") || q.includes("ఉష్ణోగ్రత") || q.includes("temperature")) {
      return `🌡️ ${location}లో ప్రస్తుతం ఉష్ణోగ్రత ${temperature}°C మరియు అనుభూతి ${feelsLike}°C. ${feelsLike >= 35 ? "వేడి ఎక్కువగా ఉంది, కాబట్టి ఎక్కువ నీరు తాగండి." : "ఉష్ణోగ్రత ప్రస్తుతం సాధారణంగా ఉంది."}`;
    }

    return `🌤️ ${location}లో ప్రస్తుతం ${temperature}°C మరియు ${condition}. అనుభూతి ${feelsLike}°C, తేమ ${humidity}%, గాలి ${wind} km/h.`;
  }

  // ==========================================================
  // KANNADA
  // ==========================================================

  if (language === "Kannada") {

    if (asksTomorrow) {
      return `📅 ನಾಳೆ ${location} ನಲ್ಲಿ ಗರಿಷ್ಠ ತಾಪಮಾನ ಸುಮಾರು ${tomorrowTemperature}°C ಮತ್ತು ಕನಿಷ್ಠ ${tomorrowMin}°C ಇರಬಹುದು. ಹವಾಮಾನ ${tomorrowCondition || "ಮುನ್ಸೂಚನೆಯಂತೆ"}. ಮಳೆಯ ಸಾಧ್ಯತೆ ${tomorrowRain}%.`;
    }

    if (q.includes("ಮಳೆ") || q.includes("rain") || q.includes("ಛತ್ರಿ")) {
      return `🌧️ ${location} ನಲ್ಲಿ ಇಂದು ಮಳೆಯ ಸಾಧ್ಯತೆ ${rainProbability}%. ${rainProbability >= 60 ? "ಮಳೆ ಬರುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು, ಆದ್ದರಿಂದ ಛತ್ರಿ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ." : "ಮಳೆಯ ಸಾಧ್ಯತೆ ಕಡಿಮೆಯಾಗಿದೆ."}`;
    }

    if (q.includes("ಬೈಕ್") || q.includes("ಪ್ರಯಾಣ") || q.includes("ಹೊರಗೆ") || q.includes("travel")) {
      return `🏍️ ${location} ನಲ್ಲಿ ಪ್ರಯಾಣಕ್ಕೆ ಹವಾಮಾನ ${rainProbability >= 60 ? "ಸ್ವಲ್ಪ ಅನಾನುಕೂಲವಾಗಬಹುದು." : "ಸಾಕಷ್ಟು ಅನುಕೂಲಕರವಾಗಿದೆ."} ತಾಪಮಾನ ${temperature}°C ಮತ್ತು ಮಳೆಯ ಸಾಧ್ಯತೆ ${rainProbability}%.`;
    }

    if (q.includes("ಬಿಸಿ") || q.includes("ತಾಪಮಾನ") || q.includes("temperature")) {
      return `🌡️ ${location} ನಲ್ಲಿ ಪ್ರಸ್ತುತ ತಾಪಮಾನ ${temperature}°C ಮತ್ತು ಅನುಭವವಾಗುವ ತಾಪಮಾನ ${feelsLike}°C. ${feelsLike >= 35 ? "ಬಿಸಿಲು ಹೆಚ್ಚಾಗಿದೆ, ಆದ್ದರಿಂದ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ." : "ತಾಪಮಾನ ಸಾಮಾನ್ಯವಾಗಿದೆ."}`;
    }

    return `🌤️ ${location} ನಲ್ಲಿ ಪ್ರಸ್ತುತ ${temperature}°C ಮತ್ತು ${condition}. ಅನುಭವ ${feelsLike}°C, ತೇವಾಂಶ ${humidity}%, ಗಾಳಿ ${wind} km/h.`;
  }

  // ==========================================================
  // MALAYALAM
  // ==========================================================

  if (language === "Malayalam") {

    if (asksTomorrow) {
      return `📅 നാളെ ${location}-ൽ പരമാവധി താപനില ഏകദേശം ${tomorrowTemperature}°Cയും കുറഞ്ഞത് ${tomorrowMin}°Cയും ആയിരിക്കാം. കാലാവസ്ഥ ${tomorrowCondition || "പ്രവചനപ്രകാരം"}. മഴയ്ക്കുള്ള സാധ്യത ${tomorrowRain}%.`;
    }

    if (q.includes("മഴ") || q.includes("rain") || q.includes("കുട")) {
      return `🌧️ ${location}-ൽ ഇന്ന് മഴയ്ക്കുള്ള സാധ്യത ${rainProbability}% ആണ്. ${rainProbability >= 60 ? "മഴയ്ക്ക് സാധ്യത കൂടുതലാണ്, അതിനാൽ കുട കൊണ്ടുപോകുക." : "മഴയ്ക്കുള്ള സാധ്യത കുറവാണ്."}`;
    }

    if (q.includes("ബൈക്ക്") || q.includes("യാത്ര") || q.includes("പുറത്ത്") || q.includes("travel")) {
      return `🏍️ ${location}-ൽ യാത്രയ്ക്ക് കാലാവസ്ഥ ${rainProbability >= 60 ? "അൽപ്പം അസൗകര്യമായേക്കാം." : "താരതമ്യേന അനുയോജ്യമാണ്."} താപനില ${temperature}°C ആണ്, മഴയുടെ സാധ്യത ${rainProbability}% ആണ്.`;
    }

    if (q.includes("ചൂട്") || q.includes("താപനില") || q.includes("temperature")) {
      return `🌡️ ${location}-ൽ ഇപ്പോഴത്തെ താപനില ${temperature}°C ആണ്. അനുഭവപ്പെടുന്ന താപനില ${feelsLike}°C ആണ്. ${feelsLike >= 35 ? "ചൂട് കൂടുതലാണ്, അതിനാൽ ധാരാളം വെള്ളം കുടിക്കുക." : "താപനില ഇപ്പോൾ സാധാരണമാണ്."}`;
    }

    return `🌤️ ${location}-ൽ ഇപ്പോൾ ${temperature}°C ആണ്, കാലാവസ്ഥ ${condition} ആണ്. അനുഭവപ്പെടുന്ന താപനില ${feelsLike}°C, ഈർപ്പം ${humidity}%, കാറ്റ് ${wind} km/h ആണ്.`;
  }

  return `${location}: ${temperature}°C`;
}


// ============================================================
// WEATHER ADVISORY
// ============================================================

function getWeatherAdvisory(weather, language) {

  if (!weather || !weather.current) {
    return null;
  }

  const current = weather.current;
  const daily = weather.daily || {};

  const feelsLike = Math.round(current.apparent_temperature ?? current.temperature_2m ?? 0);
  const wind = Number(current.wind_speed_10m ?? 0);
  const rainProbability = Number(daily.precipitation_probability_max?.[0] ?? 0);
  const code = Number(current.weather_code ?? 0);

  let type = "normal";

  if ([95, 96, 99].includes(code)) {
    type = "storm";
  } else if (rainProbability >= 70 || [65, 82].includes(code)) {
    type = "rain";
  } else if (wind >= 35) {
    type = "wind";
  } else if (feelsLike >= 38) {
    type = "heat";
  }

  const messages = {
    English: {
      storm: { title: "Weather Advisory", text: "Thunderstorm conditions are possible. Stay indoors when possible and avoid exposed outdoor areas." },
      rain: { title: "Rain Advisory", text: "Rain chances are high. Carry an umbrella and take care while travelling." },
      wind: { title: "Wind Advisory", text: "Strong winds are possible. Be careful outdoors, especially while riding a bike." },
      heat: { title: "Heat Advisory", text: "It feels very hot. Stay hydrated and avoid prolonged exposure to direct sunlight." },
      normal: { title: "Weather Advisory", text: "Weather conditions look generally manageable today. Stay prepared for changes in the forecast." },
    },
    Tamil: {
      storm: { title: "வானிலை எச்சரிக்கை", text: "இடியுடன் கூடிய மழை ஏற்பட வாய்ப்பு உள்ளது. முடிந்தவரை வீட்டுக்குள் இருங்கள்; திறந்த வெளிகளை தவிர்க்கவும்." },
      rain: { title: "மழை எச்சரிக்கை", text: "மழைக்கான வாய்ப்பு அதிகமாக உள்ளது. குடை எடுத்துச் செல்லுங்கள்; பயணம் செய்யும்போது கவனமாக இருங்கள்." },
      wind: { title: "காற்று எச்சரிக்கை", text: "காற்றின் வேகம் அதிகமாக உள்ளது. வெளியே செல்லும்போதும் குறிப்பாக பைக் ஓட்டும்போதும் கவனமாக இருங்கள்." },
      heat: { title: "வெப்ப எச்சரிக்கை", text: "வெப்பம் அதிகமாக உணரப்படுகிறது. அதிகமாக தண்ணீர் குடித்து, நீண்ட நேரம் நேரடி வெயிலை தவிர்க்கவும்." },
      normal: { title: "வானிலை அறிவுரை", text: "இன்றைய வானிலை பொதுவாக சீராக உள்ளது. முன்னறிவிப்பில் மாற்றங்கள் ஏற்பட்டால் தயாராக இருங்கள்." },
    },
    Hindi: {
      storm: { title: "मौसम चेतावनी", text: "गरज के साथ बारिश की संभावना है। संभव हो तो घर के अंदर रहें और खुले क्षेत्रों से बचें।" },
      rain: { title: "बारिश चेतावनी", text: "बारिश की संभावना अधिक है। छाता रखें और यात्रा करते समय सावधान रहें।" },
      wind: { title: "हवा चेतावनी", text: "तेज हवा चल सकती है। बाहर, खासकर बाइक चलाते समय सावधान रहें।" },
      heat: { title: "गर्मी चेतावनी", text: "बहुत गर्म महसूस हो रहा है। पानी पिएं और तेज धूप में लंबे समय तक रहने से बचें।" },
      normal: { title: "मौसम सलाह", text: "आज मौसम सामान्य रूप से ठीक है। पूर्वानुमान में बदलाव होने पर तैयार रहें।" },
    },
    Telugu: {
      storm: { title: "వాతావరణ హెచ్చరిక", text: "ఉరుములతో కూడిన వర్షం వచ్చే అవకాశం ఉంది. వీలైతే ఇంట్లో ఉండండి మరియు బహిరంగ ప్రదేశాలను నివారించండి." },
      rain: { title: "వర్ష హెచ్చరిక", text: "వర్షం వచ్చే అవకాశం ఎక్కువగా ఉంది. గొడుగు తీసుకెళ్లండి మరియు ప్రయాణంలో జాగ్రత్తగా ఉండండి." },
      wind: { title: "గాలి హెచ్చరిక", text: "బలమైన గాలులు ఉండవచ్చు. బయట మరియు ముఖ్యంగా బైక్ ప్రయాణంలో జాగ్రత్తగా ఉండండి." },
      heat: { title: "వేడి హెచ్చరిక", text: "చాలా వేడిగా అనిపిస్తోంది. ఎక్కువ నీరు తాగండి మరియు ఎక్కువసేపు ఎండలో ఉండకండి." },
      normal: { title: "వాతావరణ సూచన", text: "ఈరోజు వాతావరణం సాధారణంగా అనుకూలంగా ఉంది. మార్పులు వస్తే సిద్ధంగా ఉండండి." },
    },
    Kannada: {
      storm: { title: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ", text: "ಗುಡುಗು ಸಹಿತ ಮಳೆಯ ಸಾಧ್ಯತೆ ಇದೆ. ಸಾಧ್ಯವಾದರೆ ಒಳಗೇ ಇರಿ ಮತ್ತು ತೆರೆದ ಪ್ರದೇಶಗಳನ್ನು ತಪ್ಪಿಸಿ." },
      rain: { title: "ಮಳೆ ಎಚ್ಚರಿಕೆ", text: "ಮಳೆಯ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು. ಛತ್ರಿ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ ಮತ್ತು ಪ್ರಯಾಣಿಸುವಾಗ ಜಾಗರೂಕರಾಗಿರಿ." },
      wind: { title: "ಗಾಳಿ ಎಚ್ಚರಿಕೆ", text: "ಬಲವಾದ ಗಾಳಿ ಬೀಸಬಹುದು. ಹೊರಗೆ, ವಿಶೇಷವಾಗಿ ಬೈಕ್ ಓಡಿಸುವಾಗ ಜಾಗರೂಕರಾಗಿರಿ." },
      heat: { title: "ಬಿಸಿ ಎಚ್ಚರಿಕೆ", text: "ತುಂಬಾ ಬಿಸಿಯಾಗಿ ಅನಿಸುತ್ತಿದೆ. ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಹೆಚ್ಚು ಕಾಲ ಬಿಸಿಲಿನಲ್ಲಿ ಇರಬೇಡಿ." },
      normal: { title: "ಹವಾಮಾನ ಸಲಹೆ", text: "ಇಂದಿನ ಹವಾಮಾನ ಸಾಮಾನ್ಯವಾಗಿ ಅನುಕೂಲಕರವಾಗಿದೆ. ಮುನ್ಸೂಚನೆಯಲ್ಲಿ ಬದಲಾವಣೆ ಬಂದರೆ ಸಿದ್ಧರಾಗಿರಿ." },
    },
    Malayalam: {
      storm: { title: "കാലാവസ്ഥാ മുന്നറിയിപ്പ്", text: "ഇടിമിന്നലോടുകൂടിയ മഴയ്ക്ക് സാധ്യതയുണ്ട്. സാധ്യമെങ്കിൽ വീടിനുള്ളിൽ തുടരുകയും തുറസ്സായ ഇടങ്ങൾ ഒഴിവാക്കുകയും ചെയ്യുക." },
      rain: { title: "മഴ മുന്നറിയിപ്പ്", text: "മഴയ്ക്ക് സാധ്യത കൂടുതലാണ്. കുട കൊണ്ടുപോകുകയും യാത്രയിൽ ജാഗ്രത പാലിക്കുകയും ചെയ്യുക." },
      wind: { title: "കാറ്റ് മുന്നറിയിപ്പ്", text: "ശക്തമായ കാറ്റിന് സാധ്യതയുണ്ട്. പുറത്തും പ്രത്യേകിച്ച് ബൈക്ക് ഓടിക്കുമ്പോഴും ജാഗ്രത പാലിക്കുക." },
      heat: { title: "ചൂട് മുന്നറിയിപ്പ്", text: "വളരെ ചൂടായി അനുഭവപ്പെടുന്നു. ധാരാളം വെള്ളം കുടിക്കുകയും നേരിട്ടുള്ള സൂര്യപ്രകാശത്തിൽ അധികസമയം ഒഴിവാക്കുകയും ചെയ്യുക." },
      normal: { title: "കാലാവസ്ഥാ നിർദേശം", text: "ഇന്നത്തെ കാലാവസ്ഥ പൊതുവെ നിയന്ത്രിക്കാവുന്നതാണ്. പ്രവചനത്തിൽ മാറ്റമുണ്ടെങ്കിൽ തയ്യാറായി ഇരിക്കുക." },
    },
  };

  return messages[language]?.[type] || messages.English[type];
}


// ============================================================
// HOURLY FORECAST HELPERS
// ============================================================

function formatHour(dateTime, language) {
  const localeMap = {
    English: "en-IN",
    Tamil: "ta-IN",
    Hindi: "hi-IN",
    Telugu: "te-IN",
    Kannada: "kn-IN",
    Malayalam: "ml-IN",
  };

  return new Date(dateTime).toLocaleTimeString(
    localeMap[language] || "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
}

function getNextHours(weather, count = 12) {
  if (!weather?.hourly?.time) return [];

  const now = Date.now();
  const result = [];

  for (let i = 0; i < weather.hourly.time.length; i++) {
    const time = new Date(weather.hourly.time[i]).getTime();

    if (time >= now) {
      result.push({
        time: weather.hourly.time[i],
        temperature: weather.hourly.temperature_2m?.[i],
        rainProbability: weather.hourly.precipitation_probability?.[i] ?? 0,
        weatherCode: weather.hourly.weather_code?.[i],
        wind: weather.hourly.wind_speed_10m?.[i] ?? 0,
      });
    }

    if (result.length === count) break;
  }

  return result;
}

function getHourlyQuestionResponse(question, weather, location, language) {
  if (!weather?.hourly?.time) return null;

  const q = question.toLowerCase();

  const asksHourly =
    q.includes("next hour") ||
    q.includes("next few hours") ||
    q.includes("next 3 hours") ||
    q.includes("next 6 hours") ||
    q.includes("hourly") ||
    q.includes("tonight") ||
    q.includes("இன்று இரவு") ||
    q.includes("மணிநேர") ||
    q.includes("आज रात") ||
    q.includes("గంట") ||
    q.includes("ಇಂದು ರಾತ್ರಿ") ||
    q.includes("മണിക്കൂർ");

  if (!asksHourly) return null;

  const hours = getNextHours(weather, 6);

  if (!hours.length) {
    return language === "Tamil"
      ? `${location}-க்கான மணிநேர முன்னறிவிப்பு கிடைக்கவில்லை.`
      : language === "Hindi"
      ? `${location} के लिए घंटेवार पूर्वानुमान उपलब्ध नहीं है।`
      : language === "Telugu"
      ? `${location} కోసం గంటవారీ సూచన అందుబాటులో లేదు.`
      : language === "Kannada"
      ? `${location}ಗಾಗಿ ಗಂಟೆಗಂಟೆಯ ಮುನ್ಸೂಚನೆ ಲಭ್ಯವಿಲ್ಲ.`
      : language === "Malayalam"
      ? `${location}-ലേക്കുള്ള മണിക്കൂർ പ്രവചനം ലഭ്യമല്ല.`
      : `Hourly forecast is not available for ${location}.`;
  }

  const lines = hours.map((hour) => {
    const temp = Math.round(hour.temperature ?? 0);
    const rain = hour.rainProbability;
    const emoji = getWeatherEmoji(hour.weatherCode);
    return `${emoji} ${formatHour(hour.time, language)}: ${temp}°C, ${rain}% rain`;
  });

  if (language === "Tamil") {
    return `🕐 ${location}-க்கான அடுத்த சில மணிநேர முன்னறிவிப்பு:\n${lines.join("\n")}`;
  }

  if (language === "Hindi") {
    return `🕐 ${location} के अगले कुछ घंटों का पूर्वानुमान:\n${lines.join("\n")}`;
  }

  if (language === "Telugu") {
    return `🕐 ${location} కోసం తదుపరి కొన్ని గంటల వాతావరణం:\n${lines.join("\n")}`;
  }

  if (language === "Kannada") {
    return `🕐 ${location} ಮುಂದಿನ ಕೆಲವು ಗಂಟೆಗಳ ಮುನ್ಸೂಚನೆ:\n${lines.join("\n")}`;
  }

  if (language === "Malayalam") {
    return `🕐 ${location}-ലെ അടുത്ത ചില മണിക്കൂറുകളുടെ പ്രവചനം:\n${lines.join("\n")}`;
  }

  return `🕐 Next few hours in ${location}:\n${lines.join("\n")}`;
}

const API_BASE_URL = "https://weathergpt-backend-201b.onrender.com";
// ============================================================
// MAIN APP
// ============================================================

function App() {

  const [weather, setWeather] = useState(null);

  const [location, setLocation] =
    useState("Salem, Tamil Nadu");

  const [chatLocation, setChatLocation] =
    useState("Salem, Tamil Nadu");

  const [searchText, setSearchText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [input, setInput] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [listening, setListening] =
    useState(false);

  const [dark, setDark] =
    useState(true);

  const [language, setLanguage] =
    useState("English");
    const [advisoryOpen, setAdvisoryOpen] = useState(false);
const [activeAdvisory, setActiveAdvisory] = useState(null);
const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("weatherFavorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
});

  const [comparison, setComparison] = useState(null);
  const [compareCity, setCompareCity] = useState("");
  const [compareLoading, setCompareLoading] = useState(false);


  // ==========================================================
  // GET WEATHER
  // ==========================================================

  async function getWeather(
    latitude,
    longitude,
    locationName
  ) {

    setLoading(true);

    setError("");

    try {

      const response = await fetch(
        `${API_BASE_URL}/weather?latitude=${latitude}&longitude=${longitude}`
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setWeather(data);

      setLocation(locationName);
      setChatLocation(locationName);

      setMessages([
        {
          sender: "bot",

          text:
            language === "Tamil"
              ? `வணக்கம்! 👋 ${locationName} வானிலை பற்றி என்னிடம் கேளுங்கள்.`
              : language === "Hindi"
              ? `नमस्ते! 👋 ${locationName} के मौसम के बारे में मुझसे पूछें।`
              : language === "Telugu"
              ? `హలో! 👋 ${locationName} వాతావరణం గురించి నన్ను అడగండి.`
              : language === "Kannada"
              ? `ನಮಸ್ಕಾರ! 👋 ${locationName} ಹವಾಮಾನದ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ.`
              : language === "Malayalam"
              ? `ഹലോ! 👋 ${locationName} കാലാവസ്ഥയെക്കുറിച്ച് എന്നോട് ചോദിക്കൂ.`
              : `Hello! 👋 Ask me anything about the weather in ${locationName}.`,
        },
      ]);

      return data;

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load weather."
      );

    } finally {

      setLoading(false);

    }
  }
    function getCurrentLocation() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      await getWeather(
        latitude,
        longitude,
        "My Location"
      );
    },
    (error) => {
      console.log("Location permission denied or unavailable.", error);
    }
  );
}

  // ==========================================================
  // DEFAULT LOCATION
  // ==========================================================

  useEffect(() => {
  getCurrentLocation();
}, []);


  // ==========================================================
  // SEARCH LOCATION
  // ==========================================================

  async function searchLocation() {

    if (!searchText.trim()) return;

    setLoading(true);

    setError("");

    try {


      const response = await fetch(
        `${API_BASE_URL}/search-location?name=${encodeURIComponent(
          searchText
        )}`
      );

      const data = await response.json();

      if (
        !data.results ||
        data.results.length === 0
      ) {

        setError(
          "Location not found."
        );

        setLoading(false);

        return;
      }

      const place = data.results[0];

      const locationName =
        place.state
          ? `${place.name}, ${place.state}`
          : place.name;

      setChatLocation(locationName);

      await getWeather(
        place.latitude,
        place.longitude,
        locationName
      );

      setSearchText("");

    } catch (err) {

      console.error(err);

      setError(
        "Unable to search location."
      );

      setLoading(false);

    }
  }


  // ==========================================================
  // SEARCH ENTER
  // ==========================================================

  function handleSearchKey(event) {

    if (event.key === "Enter") {

      searchLocation();

    }
  }


  // ==========================================================
  // MY LOCATION
  // ==========================================================

  function useMyLocation() {

    if (!navigator.geolocation) {

      alert(
        "Your browser does not support location."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        getWeather(
          latitude,
          longitude,
          "My Location"
        );

      },

      () => {

        alert(
          "Location permission was denied. Please allow location access."
        );

      }

    );
  }


// ==========================================================
// COMPARE ANOTHER CITY
// ==========================================================

async function compareCities() {
  if (!compareCity.trim()) return;

  try {
    setCompareLoading(true);
    setError("");

    const response = await fetch(
      `${API_BASE_URL}/search-location?name=${encodeURIComponent(compareCity)}`
    );
    const data = await response.json();

    if (!response.ok || !data.results?.length) {
      throw new Error("Comparison city not found.");
    }

    const place = data.results[0];
    const compareLocationName = place.state
      ? `${place.name}, ${place.state}`
      : place.name;

    const weatherResponse = await fetch(
      `${API_BASE_URL}/weather?latitude=${place.latitude}&longitude=${place.longitude}`
    );
    const compareWeather = await weatherResponse.json();

    if (!weatherResponse.ok || compareWeather.error) {
      throw new Error("Unable to load comparison weather.");
    }

    setComparison({ name: compareLocationName, weather: compareWeather });
    setCompareCity("");
  } catch (error) {
    console.error("Compare city error:", error);
    setError(error.message || "Unable to compare city.");
    setComparison(null);
  } finally {
    setCompareLoading(false);
  }
}
function toggleFavorite() {
  if (!location) return;

  let updatedFavorites;

  if (favorites.includes(location)) {
    updatedFavorites = favorites.filter(
      (city) => city !== location
    );
  } else {
    updatedFavorites = [...favorites, location];
  }

  setFavorites(updatedFavorites);

  localStorage.setItem(
    "weatherFavorites",
    JSON.stringify(updatedFavorites)
  );
}
async function loadFavoriteCity(city) {
  try {
    setError("");

    const response = await fetch(
      `${API_BASE_URL}/search-location?name=${encodeURIComponent(city)}`
    );

    const data = await response.json();

    if (!response.ok || !data.results?.length) {
      throw new Error("Favorite city not found.");
    }

    const place = data.results[0];

    const locationName = place.state
      ? `${place.name}, ${place.state}`
      : place.name;

    await getWeather(
      place.latitude,
      place.longitude,
      locationName
    );
  } catch (error) {
    console.error("Favorite city error:", error);
    setError(error.message || "Unable to load favorite city.");
  }
}

// ==========================================================
// VOICE INPUT - MULTILINGUAL
// ==========================================================

function startVoiceInput() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "🎤 Voice recognition is not supported. Please use Google Chrome."
    );
    return;
  }

  if (listening) {
    return;
  }

  const recognition = new SpeechRecognition();

  // Important settings
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // Selected language
  recognition.lang =
    LANGUAGES[language]?.code || "en-IN";


  // --------------------------------
  // START LISTENING
  // --------------------------------

  recognition.onstart = () => {

    console.log("🎤 Listening...");
    console.log("🌐 Language:", recognition.lang);

    setListening(true);

  };


  // --------------------------------
  // CAPTURE FINAL TEXT
  // --------------------------------

  recognition.onresult = (event) => {

    console.log("🎤 RESULT EVENT:", event);

    if (
      event.results &&
      event.results.length > 0
    ) {

      const result =
        event.results[0];

      const transcript =
        result[0].transcript.trim();

      console.log(
        "✅ Captured text:",
        transcript
      );

      // THIS puts the voice text
      // directly into the input box
      setInput(transcript);

    }

  };


  // --------------------------------
  // ERROR
  // --------------------------------

  recognition.onerror = (event) => {

    console.error(
      "❌ Voice error:",
      event.error
    );

    setListening(false);

    if (event.error === "no-speech") {

      alert(
        "🎤 No speech detected. Please speak after clicking the microphone."
      );

    }

    else if (event.error === "not-allowed") {

      alert(
        "🎤 Microphone permission is blocked.\n\n" +
        "Click 🔒 → Microphone → Allow → Refresh the page."
      );

    }

    else if (event.error === "audio-capture") {

      alert(
        "🎤 Microphone was not detected.\n\n" +
        "Please check your microphone."
      );

    }

    else if (event.error === "network") {

  console.error("🌐 Speech recognition network error.");

  setListening(false);

  alert(
    "🌐 Voice recognition service is unavailable.\n\n" +
    "Please check your internet connection and try again."
  );

}

    else {

      alert(
        "🎤 Voice error: " + event.error
      );

    }

  };


  // --------------------------------
  // FINISHED
  // --------------------------------

  recognition.onend = () => {

    console.log(
      "🎤 Recognition finished"
    );

    setListening(false);

  };


  // --------------------------------
  // START
  // --------------------------------

  try {

    recognition.start();

  } catch (error) {

    console.error(
      "❌ Could not start recognition:",
      error
    );

    setListening(false);

  }

}
// ==========================================================
// VOICE OUTPUT - TEXT TO SPEECH
// ==========================================================

function speakResponse(text) {

  if (!window.speechSynthesis) {
    console.log("🔊 Text-to-Speech is not supported.");
    return;
  }

  // Stop previous speech
  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  // Use selected language
  speech.lang =
    LANGUAGES[language]?.code || "en-IN";

  speech.rate = 0.9;
  speech.pitch = 1;
  speech.volume = 1;

  speech.onstart = () => {
    console.log("🔊 WeatherGPT is speaking...");
  };

  speech.onend = () => {
    console.log("🔊 Speech finished.");
  };

  speech.onerror = (event) => {
    console.error(
      "🔊 Speech output error:",
      event.error
    );
  };

  window.speechSynthesis.speak(speech);
}

  // ==========================================================
  // ASK LOCAL LLM
  // ==========================================================

  async function askWeatherLLM(
    question,
    weatherData,
    currentLocation,
    previousConversation = []
  ) {

    const languageInstruction =
      language === "English"
        ? "Answer in English."
        : `Answer in ${language}. Keep weather values such as °C and % clear.`;

    // Give the local LLM clear rules for weather alerts.
    // Alerts are shown only inside chat when they are relevant;
    // nothing is added to the dashboard.
    const current = weatherData?.current || {};
    const daily = weatherData?.daily || {};
    const sunriseToday = daily.sunrise?.[0] || "unavailable";
    const sunsetToday = daily.sunset?.[0] || "unavailable";
    const sunriseTomorrow = daily.sunrise?.[1] || "unavailable";
    const sunsetTomorrow = daily.sunset?.[1] || "unavailable";
    const currentCode = Number(current.weather_code ?? 0);
    const currentRain = Number(current.rain ?? 0);
    const currentWind = Number(current.wind_speed_10m ?? 0);
    const feelsLike = Number(
      current.apparent_temperature ?? current.temperature_2m ?? 0
    );
    const todayRainChance = Number(
      daily.precipitation_probability_max?.[0] ?? 0
    );

    let alertContext = "No major weather alert is detected from the supplied data.";

    if ([95, 96, 99].includes(currentCode)) {
      alertContext =
        "SEVERE WEATHER ALERT: Thunderstorm conditions are currently indicated. Advise the user to avoid exposed outdoor areas and to travel cautiously.";
    } else if (todayRainChance >= 70 || [65, 82].includes(currentCode) || currentRain > 0) {
      alertContext =
        `RAIN ALERT: Rain is relevant right now or likely today. Current rain: ${currentRain} mm. Today's maximum precipitation probability: ${todayRainChance}%. If the question is about travel, biking, going outside, or an umbrella, give a practical rain advisory.`;
    } else if (currentWind >= 35) {
      alertContext =
        `WIND ALERT: Strong winds are possible. Current wind speed is ${currentWind} km/h. Mention caution for outdoor activities and especially bike travel when relevant.`;
    } else if (feelsLike >= 38) {
      alertContext =
        `HEAT ALERT: It feels very hot at about ${Math.round(feelsLike)}°C. Recommend hydration and limiting prolonged direct-sun exposure when relevant.`;
    }

    const sunInstruction = `
SUNRISE / SUNSET DATA:
- Today's sunrise: ${sunriseToday}
- Today's sunset: ${sunsetToday}
- Tomorrow's sunrise: ${sunriseTomorrow}
- Tomorrow's sunset: ${sunsetTomorrow}
- If the user asks about sunrise or sunset, answer using these values and do not invent times.
`;

    const alertInstruction = `
WEATHER ALERT RULES:
- ${alertContext}
- Give an alert only when it is relevant to the user's question. Do not add an unrelated warning to every answer.
- For questions about rain, travel, bikes, outdoor activities, umbrellas, or plans, use the supplied forecast data and give a short practical recommendation.
- Clearly distinguish current conditions from forecast conditions.
- Never invent a warning that is not supported by the supplied weather data.
`;

    const response = await fetch(
      "http://127.0.0.1:8000/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `${languageInstruction}${sunInstruction}${alertInstruction}\nUser question: ${question}`,
          location: currentLocation,
          weather: weatherData,
          messages: previousConversation,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(
        data.error ||
        `AI request failed: ${response.status}`
      );
    }

    if (!data.answer) {
      throw new Error("The AI returned an empty response.");
    }

    return data.answer;
  }


  // ==========================================================
  // SEND MESSAGE - LLM POWERED
  // ==========================================================

  async function sendMessage() {

    if (!input.trim()) return;

    const question = input.trim();

    const detectedLocation =
      extractLocationFromQuestion(question);

    const previousConversation = messages
      .filter(
        (message) =>
          message.sender === "user" ||
          message.sender === "bot"
      )
      .slice(-10)
      .map((message) => ({
        role:
          message.sender === "user"
            ? "user"
            : "assistant",
        content: message.text,
      }));

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: question,
      },
    ]);

    setInput("");

    // --------------------------------------------------------
    // LOCATION MENTIONED IN QUESTION
    // --------------------------------------------------------

    if (detectedLocation) {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/search-location?name=${encodeURIComponent(
            detectedLocation
          )}`
        );

        if (!response.ok) {
          throw new Error(
            `Location search failed: ${response.status}`
          );
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (!data.results || data.results.length === 0) {

          setMessages((previous) => [
            ...previous,
            {
              sender: "bot",
              text: `I couldn't find "${detectedLocation}". Please try another city.`,
            },
          ]);

          return;
        }

        const place = data.results[0];

        const locationName =
          place.state
            ? `${place.name}, ${place.state}`
            : place.name;

        const newWeather = await getWeather(
          place.latitude,
          place.longitude,
          locationName
        );

        if (!newWeather) {
          throw new Error(
            "Weather data could not be loaded."
          );
        }

        const answer = await askWeatherLLM(
          question,
          newWeather,
          locationName,
          previousConversation
        );

        setMessages((previous) => [
          ...previous,
          {
            sender: "bot",
            text: answer,
          },
        ]);

      } catch (error) {

        console.error(
          "Location / LLM error:",
          error
        );

        setError(
          error.message ||
          "Unable to get an AI weather response."
        );

        setMessages((previous) => [
          ...previous,
          {
            sender: "bot",
            text: "Sorry, I couldn't get the AI weather response. Please make sure both the backend and Ollama are running.",
          },
        ]);

      } finally {
        setLoading(false);
      }

      return;
    }

    // --------------------------------------------------------
    // NORMAL QUESTION - CURRENT / LAST SELECTED LOCATION
    // --------------------------------------------------------

    if (!weather) {

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: "Please wait for the weather data to load first.",
        },
      ]);

      return;
    }

    try {

      setLoading(true);
      setError("");

      const answer = await askWeatherLLM(
        question,
        weather,
        chatLocation || location,
        previousConversation
      );

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: answer,
        },
      ]);

    } catch (error) {

      console.error(
        "LLM error:",
        error
      );

      setError(
        error.message ||
        "Unable to get an AI response."
      );

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect to the local AI. Please make sure Ollama and the backend are running.",
        },
      ]);

    } finally {

      setLoading(false);
    }
  }


  // ==========================================================
  // CHAT ENTER
  // ==========================================================

  function handleChatKey(event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();
    }
  }


  // ==========================================================
  // LANGUAGE CHANGE
  // ==========================================================

  function changeLanguage(newLanguage) {

    setLanguage(newLanguage);

    setMessages([
      {
        sender: "bot",

        text:
          newLanguage === "Tamil"
            ? `தமிழில் பேசலாம்! 🌤️ ${location} வானிலை பற்றி கேளுங்கள்.`
            : newLanguage === "Hindi"
            ? `हिंदी में बात करते हैं! 🌤️ ${location} के मौसम के बारे में पूछें।`
            : newLanguage === "Telugu"
            ? `తెలుగులో మాట్లాడుకుందాం! 🌤️ ${location} వాతావరణం గురించి అడగండి.`
            : newLanguage === "Kannada"
            ? `ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡೋಣ! 🌤️ ${location} ಹವಾಮಾನದ ಬಗ್ಗೆ ಕೇಳಿ.`
            : newLanguage === "Malayalam"
            ? `മലയാളത്തിൽ സംസാരിക്കാം! 🌤️ ${location} കാലാവസ്ഥയെക്കുറിച്ച് ചോദിക്കൂ.`
            : `Let's talk in English! 🌤️ Ask me about the weather in ${location}.`,
      },
    ]);
  }


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div
      className={
        dark
          ? "app dark"
          : "app"
      }
    >

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">

          <CloudRain size={28} />

          <span>
            WeatherGPT
          </span>

        </div>


        <div className="sidebar-content">

          <p>
            Ask the weather.
            <br />
            Understand the risk.
            <br />
            Stay prepared.
          </p>

        </div>


        <div className="sidebar-bottom">

          <button
            onClick={() =>
              setDark(!dark)
            }
            className="icon-button"
          >

            <Moon size={18} />

            {dark
              ? "Light Mode"
              : "Dark Mode"}

          </button>

        </div>

      </aside>


      {/* MAIN */}

      <main className="main">

        {/* HEADER */}

        <header className="header">

          <div>

            <h1>
              Weather Dashboard
            </h1>

            <p>
              Real-time weather and multilingual guidance
            </p>

          </div>


          <div className="header-actions">

            <button
              className="location-button"
              onClick={
                useMyLocation
              }
            >

              <Navigation size={16} />

              My Location

            </button>

          </div>

        </header>


        {/* LANGUAGE SELECTOR */}

        <div className="language-container">

          <span>
            🌐 Language
          </span>

          <select
            value={language}
            onChange={(e) =>
              changeLanguage(
                e.target.value
              )
            }
          >

            {Object.keys(
              LANGUAGES
            ).map((lang) => (

              <option
                key={lang}
                value={lang}
              >

                {LANGUAGES[lang].label}

              </option>

            ))}

          </select>

        </div>


        {/* LOCATION SEARCH */}

        <div className="search-container">

          <Search size={20} />

          <input
            value={searchText}
            onChange={(e) =>
              setSearchText(
                e.target.value
              )
            }
            onKeyDown={
              handleSearchKey
            }
            placeholder="Search a city or place..."
          />

          <button
            onClick={
              searchLocation
            }
          >

            Search

          </button>

        </div>


        {/* LOCATION */}

        <div className="current-location">

          <MapPin size={18} />

          <span>
            {location}
          </span>

        </div>


        {/* ERROR */}

        {error && (

          <div className="error-message">

            {error}

          </div>

        )}


        {/* WEATHER */}

        {loading ? (

          <div className="loading">

            Loading weather...

          </div>

        ) : weather ? (

          <>

            {/* CURRENT WEATHER */}

            <section className="weather-card">

              <div className="weather-main">

                <div>

                  <p>
                    {language === "Tamil"
                      ? "தற்போதைய வானிலை"
                      : language === "Hindi"
                      ? "वर्तमान मौसम"
                      : language === "Telugu"
                      ? "ప్రస్తుత వాతావరణం"
                      : language === "Kannada"
                      ? "ಪ್ರಸ್ತುತ ಹವಾಮಾನ"
                      : language === "Malayalam"
                      ? "നിലവിലെ കാലാവസ്ഥ"
                      : "Current Weather"}
                  </p>


                  <h2>

                    {Math.round(
                      weather.current
                        .temperature_2m
                    )}
                    °C

                  </h2>


                  <h3>

                    {getWeatherDescription(
                      weather.current
                        .weather_code,
                      language
                    )}

                  </h3>

                </div>


                <div className="weather-emoji">

                  {getWeatherEmoji(
                    weather.current
                      .weather_code
                  )}

                </div>

              </div>


              <div className="weather-stats">

                <div>

                  <Droplets size={18} />

                  <span>
                    {language === "Tamil"
                      ? "ஈரப்பதம்"
                      : language === "Hindi"
                      ? "नमी"
                      : language === "Telugu"
                      ? "తేమ"
                      : language === "Kannada"
                      ? "ತೇವಾಂಶ"
                      : language === "Malayalam"
                      ? "ഈർപ്പം"
                      : "Humidity"}
                  </span>

                  <strong>
                    {
                      weather.current
                        .relative_humidity_2m
                    }%
                  </strong>

                </div>


                <div>

                  <Wind size={18} />

                  <span>
                    {language === "Tamil"
                      ? "காற்று"
                      : language === "Hindi"
                      ? "हवा"
                      : language === "Telugu"
                      ? "గాలి"
                      : language === "Kannada"
                      ? "ಗಾಳಿ"
                      : language === "Malayalam"
                      ? "കാറ്റ്"
                      : "Wind"}
                  </span>

                  <strong>
                    {
                      weather.current
                        .wind_speed_10m
                    }{" "}
                    km/h
                  </strong>

                </div>


                <div>

                  <Sun size={18} />

                  <span>
                    {language === "Tamil"
                      ? "உணரப்படும் வெப்பம்"
                      : language === "Hindi"
                      ? "महसूस तापमान"
                      : language === "Telugu"
                      ? "అనుభూతి ఉష్ణోగ్రత"
                      : language === "Kannada"
                      ? "ಅನುಭವ ತಾಪಮಾನ"
                      : language === "Malayalam"
                      ? "അനുഭവപ്പെടുന്ന താപനില"
                      : "Feels Like"}
                  </span>

                  <strong>

                    {Math.round(
                      weather.current
                        .apparent_temperature
                    )}
                    °C

                  </strong>

                </div>

              </div>
     <button
  type="button"
  className="favorite-button"
  onClick={toggleFavorite}
>
  {favorites.includes(location) ? "⭐ Favorited" : "☆ Add to Favorites"}
</button>
            </section>

{/* ============================================================
    FAVORITE CITIES
============================================================ */}

{favorites.length > 0 && (
  <section className="favorites-section">

    <div className="section-title-row">
      <div>
        <h2>⭐ Favorite Cities</h2>
        <p>Quick access to your saved locations</p>
      </div>
    </div>

    <div className="favorites-list">

      {favorites.map((city) => (
        <button
          key={city}
          type="button"
          className={`favorite-city ${
            city === location ? "active" : ""
          }`}
          onClick={() => {
            setSearchText(city);
            searchCity(city);
          }}
        >
          <span>📍 {city}</span>

          <span
            className="remove-favorite"
            onClick={(event) => {
              event.stopPropagation();

              setFavorites(
                favorites.filter((item) => item !== city)
              );
            }}
          >
            
          </span>
        </button>
      ))}

    </div>

  </section>
)}
            {/* HOURLY FORECAST */}

            {/* ============================================================
                FEATURE 1 - WEATHER CHARTS
            ============================================================ */}

            <section className="charts-section">
              <div className="section-title-row">
                <div>
                  <h2>Weather Trends</h2>
                  <p>7-day temperature and rain probability</p>
                </div>
              </div>

              <div className="charts-grid">
                <div className="chart-card">
                  <h3>🌡️ Temperature</h3>
                  <div className="bar-chart">
                    {weather.daily.time.map((date, index) => {
                      const temperatures = weather.daily.temperature_2m_max || [];
                      const maxTemp = getChartMax(temperatures);
                      const temp = temperatures[index] ?? 0;
                      const height = Math.max((temp / maxTemp) * 100, 10);
                      return (
                        <div className="bar-item" key={`temp-${date}`}>
                          <div className="bar-value">{Math.round(temp)}°</div>
                          <div className="bar-container">
                            <div className="bar" style={{ height: `${height}%` }} />
                          </div>
                          <span>{formatDay(date, index, language)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="chart-card">
                  <h3>🌧️ Rain Probability</h3>
                  <div className="bar-chart">
                    {weather.daily.time.map((date, index) => {
                      const rain = weather.daily.precipitation_probability_max?.[index] ?? 0;
                      const height = Math.max(rain, 5);
                      return (
                        <div className="bar-item" key={`rain-${date}`}>
                          <div className="bar-value">{rain}%</div>
                          <div className="bar-container">
                            <div className="bar rain-bar" style={{ height: `${height}%` }} />
                          </div>
                          <span>{formatDay(date, index, language)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================
                FEATURE 2 - COMPARE CITIES
            ============================================================ */}

            <section className="compare-section">
              <div className="section-title-row">
                <div>
                  <h2>Compare Cities</h2>
                  <p>Compare the current weather with another city</p>
                </div>
              </div>

              <div className="compare-input-row">
                <input
                  type="text"
                  value={compareCity}
                  onChange={(event) => setCompareCity(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") compareCities();
                  }}
                  placeholder="Enter another city"
                />
                <button
                  type="button"
                  onClick={compareCities}
                  disabled={compareLoading || !compareCity.trim()}
                >
                  {compareLoading ? "Comparing..." : "Compare"}
                </button>
              </div>

              {comparison && (
                <div className="comparison-grid">
                  <div className="comparison-card">
                    <h3>{location}</h3>
                    <div className="comparison-temp">{Math.round(weather.current.temperature_2m)}°C</div>
                    <p>{getWeatherDescription(weather.current.weather_code, language)}</p>
                    <div className="comparison-details">
                      <span>💧 {weather.current.relative_humidity_2m}%</span>
                      <span>💨 {weather.current.wind_speed_10m} km/h</span>
                    </div>
                  </div>

                  <div className="comparison-card">
                    <h3>{comparison.name}</h3>
                    <div className="comparison-temp">{Math.round(comparison.weather.current.temperature_2m)}°C</div>
                    <p>{getWeatherDescription(comparison.weather.current.weather_code, language)}</p>
                    <div className="comparison-details">
                      <span>💧 {comparison.weather.current.relative_humidity_2m}%</span>
                      <span>💨 {comparison.weather.current.wind_speed_10m} km/h</span>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* ============================================================
                FEATURE 3 - SUNRISE & SUNSET
            ============================================================ */}

            <section className="sun-section">
              <div className="section-title-row">
                <div>
                  <h2>Sunrise & Sunset</h2>
                  <p>Today's daylight timings</p>
                </div>
              </div>

              <div className="sun-grid">
                <div className="sun-card">
                  <div className="sun-icon">🌅</div>
                  <div>
                    <span>Sunrise</span>
                    <strong>
                      {weather.daily?.sunrise?.[0]
                        ? new Date(weather.daily.sunrise[0]).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })
                        : "Unavailable"}
                    </strong>
                  </div>
                </div>

                <div className="sun-card">
                  <div className="sun-icon">🌇</div>
                  <div>
                    <span>Sunset</span>
                    <strong>
                      {weather.daily?.sunset?.[0]
                        ? new Date(weather.daily.sunset[0]).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })
                        : "Unavailable"}
                    </strong>
                  </div>
                </div>
              </div>
            </section>
{/* ============================================================
    ADVISORY MODULES
============================================================ */}

<section className="advisory-section">

  <button
    type="button"
    className="advisory-dropdown-button"
    onClick={() => setAdvisoryOpen(!advisoryOpen)}
  >
    <span>🌾 Advisory Modules</span>

    <span>
      {advisoryOpen ? "▲" : "▼"}
    </span>
  </button>


  {advisoryOpen && (
    <div className="advisory-menu">

      <button
        type="button"
        onClick={() => {
          setActiveAdvisory("farmers");
          setAdvisoryOpen(false);
        }}
      >
        👨‍🌾 Farmers
      </button>

      <button
        type="button"
        onClick={() => {
          setActiveAdvisory("marine");
          setAdvisoryOpen(false);
        }}
      >
        🌊 Marine
      </button>

      <button
        type="button"
        onClick={() => {
          setActiveAdvisory("disaster");
          setAdvisoryOpen(false);
        }}
      >
        🚨 Disaster
      </button>

    </div>
  )}


  {/* ==========================================================
      FARMERS
  ========================================================== */}

  {activeAdvisory === "farmers" && (

    <div className="advisory-content">

      <h2>👨‍🌾 Farmer Advisory</h2>

      <p>
        Weather-based guidance for farming activities
      </p>

      <div className="advisory-info-grid">

        <div>
          <span>🌧️ Rain Probability</span>

          <strong>
            {weather.daily?.precipitation_probability_max?.[0] ?? 0}%
          </strong>

          <p>
            {(weather.daily?.precipitation_probability_max?.[0] ?? 0) >= 70
              ? "High rain chance. Consider postponing irrigation and outdoor spraying."
              : "Rain probability is relatively low. Normal farming activities can continue."}
          </p>
        </div>


        <div>
          <span>🌡️ Temperature</span>

          <strong>
            {Math.round(weather.current?.temperature_2m ?? 0)}°C
          </strong>

          <p>
            {(weather.current?.temperature_2m ?? 0) >= 35
              ? "High temperature. Ensure sufficient water for crops."
              : "Temperature is suitable for normal farming activities."}
          </p>
        </div>


        <div>
          <span>💧 Humidity</span>

          <strong>
            {weather.current?.relative_humidity_2m ?? 0}%
          </strong>

          <p>
            {(weather.current?.relative_humidity_2m ?? 0) >= 80
              ? "High humidity. Monitor crops for fungal diseases."
              : "Humidity is within a moderate range."}
          </p>
        </div>


        <div>
          <span>💨 Wind Speed</span>

          <strong>
            {Math.round(weather.current?.wind_speed_10m ?? 0)} km/h
          </strong>

          <p>
            {(weather.current?.wind_speed_10m ?? 0) >= 30
              ? "Strong winds. Avoid pesticide spraying."
              : "Wind conditions are suitable for farming."}
          </p>
        </div>

      </div>

    </div>

  )}


  {/* ==========================================================
      MARINE
  ========================================================== */}

  {activeAdvisory === "marine" && (

    <div className="advisory-content">

      <h2>🌊 Marine Advisory</h2>

      <p>
        Weather guidance for fishermen and marine activities
      </p>

      <div className="advisory-info-grid">

        <div>
          <span>💨 Wind Speed</span>

          <strong>
            {Math.round(weather.current?.wind_speed_10m ?? 0)} km/h
          </strong>

          <p>
            {(weather.current?.wind_speed_10m ?? 0) >= 30
              ? "Strong winds detected. Small boats should take extra caution."
              : "Wind conditions are relatively calm."}
          </p>
        </div>


        <div>
          <span>🌧️ Rain Probability</span>

          <strong>
            {weather.daily?.precipitation_probability_max?.[0] ?? 0}%
          </strong>

          <p>
            {(weather.daily?.precipitation_probability_max?.[0] ?? 0) >= 70
              ? "High rain probability. Marine activities may become difficult."
              : "No high rain probability detected from today's forecast."}
          </p>
        </div>


        <div>
          <span>🌡️ Temperature</span>

          <strong>
            {Math.round(weather.current?.temperature_2m ?? 0)}°C
          </strong>

          <p>
            Current atmospheric temperature.
          </p>
        </div>


        <div>
          <span>⚠️ Marine Condition</span>

          <strong>
            {(weather.current?.wind_speed_10m ?? 0) >= 30
              ? "Caution"
              : "Normal"}
          </strong>

          <p>
            Always check official marine warnings before going offshore.
          </p>
        </div>

      </div>

    </div>

  )}


  {/* ==========================================================
      DISASTER
  ========================================================== */}

  {activeAdvisory === "disaster" && (

    <div className="advisory-content disaster-content">

      <h2>🚨 Disaster & Severe Weather</h2>

      <p>
        Weather-data-based risk information
      </p>

      <div className="disaster-status">

        {([95, 96, 99].includes(
          Number(weather.current?.weather_code)
        )) ? (

          <div className="danger-alert">
            <strong>⛈️ Severe Weather Detected</strong>

            <p>
              Thunderstorm conditions are indicated by the
              current weather data. Avoid exposed outdoor areas
              and follow official emergency instructions.
            </p>
          </div>

        ) : (weather.current?.wind_speed_10m ?? 0) >= 35 ? (

          <div className="danger-alert">
            <strong>💨 Strong Wind Risk</strong>

            <p>
              Strong winds are currently indicated.
              Take precautions during outdoor activities.
            </p>
          </div>

        ) : (weather.current?.temperature_2m ?? 0) >= 38 ? (

          <div className="danger-alert">
            <strong>🔥 Extreme Heat Risk</strong>

            <p>
              Very high temperature is indicated.
              Stay hydrated and avoid prolonged exposure
              to direct sunlight.
            </p>
          </div>

        ) : (

          <div className="safe-alert">
            <strong>✅ No Major Severe Condition Detected</strong>

            <p>
              No major severe-weather condition is detected
              from the currently supplied weather data.
            </p>
          </div>

        )}

      </div>

      <small>
        ⚠️ This is a weather-data-based indication, not an
        official government disaster warning.
      </small>

    </div>

  )}

</section>
            {/* FORECAST */}
            <section className="forecast-section">

              <h2>

                {language === "Tamil"
                  ? "7 நாள் வானிலை"
                  : language === "Hindi"
                  ? "7 दिन का मौसम"
                  : language === "Telugu"
                  ? "7 రోజుల వాతావరణం"
                  : language === "Kannada"
                  ? "7 ದಿನಗಳ ಹವಾಮಾನ"
                  : language === "Malayalam"
                  ? "7 ദിവസത്തെ കാലാവസ്ഥ"
                  : "7-Day Forecast"}

              </h2>


              <div className="forecast-grid">

                {weather.daily.time.map(
                  (date, index) => (

                    <div
                      className="forecast-card"
                      key={date}
                    >

                      <span>

                        {formatDay(
                          date,
                          index,
                          language
                        )}

                      </span>


                      <div className="forecast-icon">

                        {getWeatherEmoji(
                          weather.daily
                            .weather_code[index]
                        )}

                      </div>


                      <strong>

                        {Math.round(
                          weather.daily
                            .temperature_2m_max[
                            index
                          ]
                        )}
                        °

                      </strong>


                      <small>

                        {Math.round(
                          weather.daily
                            .temperature_2m_min[
                            index
                          ]
                        )}
                        °

                      </small>


                      <p>

                        🌧️{" "}
                        {
                          weather.daily
                            .precipitation_probability_max[
                            index
                          ]
                        }
                        %

                      </p>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* CHAT */}

            <section className="chat-section">

              <div className="chat-header">

                <div>

                  <h2>

                    {language === "Tamil"
                      ? "WeatherGPT-யிடம் கேளுங்கள்"
                      : language === "Hindi"
                      ? "WeatherGPT से पूछें"
                      : language === "Telugu"
                      ? "WeatherGPTని అడగండి"
                      : language === "Kannada"
                      ? "WeatherGPT ಅನ್ನು ಕೇಳಿ"
                      : language === "Malayalam"
                      ? "WeatherGPT-യോട് ചോദിക്കൂ"
                      : "Ask WeatherGPT"}

                  </h2>


                  <p>

                    {language === "Tamil"
                      ? `${location} பற்றி கேளுங்கள்`
                      : language === "Hindi"
                      ? `${location} के बारे में पूछें`
                      : language === "Telugu"
                      ? `${location} గురించి అడగండి`
                      : language === "Kannada"
                      ? `${location} ಬಗ್ಗೆ ಕೇಳಿ`
                      : language === "Malayalam"
                      ? `${location}യെക്കുറിച്ച് ചോദിക്കൂ`
                      : `Ask questions about ${location}`}

                  </p>

                </div>

              </div>


              <div className="messages">

  {messages.map(
    (message, index) => (

      <div
        key={index}
        className={
          message.sender === "user"
            ? "message user-message"
            : "message bot-message"
        }
      >

        <span>
          {message.text}
        </span>

        {message.sender === "bot" && (
          <button
            onClick={() =>
              speakResponse(message.text)
            }
            className="message-speak-button"
            title="Listen to this response"
          >
            🔊
          </button>
        )}

      </div>

    )
  )}

</div>


              {/* CHAT INPUT */}

              <div className="chat-input">

                <button
                  onClick={
                    startVoiceInput
                  }
                  className={
                    listening
                      ? "mic-button listening"
                      : "mic-button"
                  }
                  title="Voice input"
                >

                  <Mic size={20} />

                </button>


                <input
                  value={input}
                  onChange={(e) =>
                    setInput(
                      e.target.value
                    )
                  }
                  onKeyDown={
                    handleChatKey
                  }
                  placeholder={
                    listening
                      ? "Listening..."
                      : language === "Tamil"
                      ? "வானிலை பற்றி கேளுங்கள்..."
                      : language === "Hindi"
                      ? "मौसम के बारे में पूछें..."
                      : language === "Telugu"
                      ? "వాతావరణం గురించి అడగండి..."
                      : language === "Kannada"
                      ? "ಹವಾಮಾನದ ಬಗ್ಗೆ ಕೇಳಿ..."
                      : language === "Malayalam"
                      ? "കാലാവസ്ഥയെക്കുറിച്ച് ചോദിക്കൂ..."
                      : "Ask about rain, heat, travel..."
                  }
                />


                <button
                  onClick={
                    sendMessage
                  }
                  className="send-button"
                >

                  <Send size={20} />

                </button>

              </div>

            </section>

          </>

        ) : null}

      </main>

    </div>
  );
}


// ============================================================
// RENDER
// ============================================================

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <App />

  </React.StrictMode>
);