import "./style.css";
import { getData } from "./api/api.js";
import { getGeo } from "./api/geocode.js";
import { createWeatherCard } from "./components/card.js";
import { getWeatherCodes } from "./utils/weathercodes.js";

const form = document.querySelector("#search-form");
const locationInput = document.getElementById("locationInput");
const outputElement = document.querySelector("#api");
const outputCard = document.getElementById("card");

createWeatherCard("USA", "New York", 25, "°C");
createWeatherCard("USA", "New York", 25, "°C");

handleWeatherSearch("USA", "New York", 25, "°C");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const locationName = locationInput.value.trim();

  if (!locationName) {
    outputElement.textContent = `Please enter a valid location`;
    return;
  }
  await handleWeatherSearch(locationName);
});

async function handleWeatherSearch(name) {
  try {
    const location = await getGeo(name);

    if (!location.results) {
      outputElement.textContent = `No location found.`;
      return;
    }

    const latitude = location.results[0].latitude;
    const longitude = location.results[0].longitude;
    const locationName = location.results[0].name;
    const countryName = location.results[0].country;

    const weather = await getData(latitude, longitude);

    const temp = weather.current.temperature_2m;
    const unit = weather.current_units.temperature_2m;
    const weatherCode = weather.current.weather_code;
    const isDay = weather.current.is_day;

    const weatherInfo = getWeatherCodes(weatherCode, isDay);

    outputCard.appendChild(
      createWeatherCard(countryName, locationName, temp, unit, weatherInfo),
    );
  } catch (error) {
    console.error("Error fetching weather:", error);
    outputElement.textContent = `Failed to load weather data. Please try again.`;
  }
}
