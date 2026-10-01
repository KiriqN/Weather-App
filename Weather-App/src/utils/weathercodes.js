// WMO weather codes used by Open-Meteo.
// Icons with day and night versions use an object; the rest use a single name.
export const WEATHER_CODES = {
  0: { label: "Clear sky", icon: { day: "clear-day", night: "clear-night" } },
  1: {
    label: "Mainly clear",
    icon: { day: "clear-day", night: "clear-night" },
  },
  2: {
    label: "Partly cloudy",
    icon: { day: "partly-cloudy-day", night: "partly-cloudy-night" },
  },
  3: { label: "Overcast", icon: "cloudy" },

  45: { label: "Fog", icon: "fog" },
  48: { label: "Freezing fog", icon: "fog" },

  51: { label: "Light drizzle", icon: "drizzle" },
  53: { label: "Drizzle", icon: "drizzle" },
  55: { label: "Heavy drizzle", icon: "drizzle" },
  56: { label: "Light freezing drizzle", icon: "drizzle" },
  57: { label: "Freezing drizzle", icon: "drizzle" },

  61: { label: "Light rain", icon: "rain" },
  63: { label: "Rain", icon: "rain" },
  65: { label: "Heavy rain", icon: "rain" },
  66: { label: "Light freezing rain", icon: "rain" },
  67: { label: "Freezing rain", icon: "rain" },

  71: { label: "Light snow", icon: "snow" },
  73: { label: "Snow", icon: "snow" },
  75: { label: "Heavy snow", icon: "snow" },
  77: { label: "Snow grains", icon: "snow" },

  80: { label: "Light showers", icon: "rain" },
  81: { label: "Showers", icon: "rain" },
  82: { label: "Heavy showers", icon: "rain" },
  85: { label: "Light snow showers", icon: "snow" },
  86: { label: "Snow showers", icon: "snow" },

  95: { label: "Thunderstorm", icon: "thunderstorm" },
  96: { label: "Thunderstorm with hail", icon: "thunderstorm" },
  99: { label: "Thunderstorm with heavy hail", icon: "thunderstorm" },
};

export function getWeatherCodes(weatherCode, isDay) {
  const weather = WEATHER_CODES[weatherCode];

  if (!weather) {
    console.error(`Weather code ${weatherCode} not found.`);
    return { icon: "cloudy", label: "Unknown" };
  }

  let iconName = weather.icon;

  if (typeof weather.icon === "object") {
    iconName = isDay ? weather.icon.day : weather.icon.night;
  }
  return { icon: iconName, label: weather.label };
}
