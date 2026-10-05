`use strict`;

import "./style.css";
import { getData } from "./api/api.js";
import { getGeo } from "./api/geocode.js";
import { createWeatherCard } from "./components/card.js";
import { getWeatherCodes } from "./utils/weathercodes.js";
import { createSuggestionItem } from "./components/suggestions.js";

/*handleWeatherSearch("New York");
handleWeatherSearch("Somerset West");
handleWeatherSearch("Stellenbosch");
handleWeatherSearch("St Petersburg");
handleWeatherSearch("Maldives"); */

const form = document.querySelector("#search-form");
const locationInput = document.getElementById("locationInput");
const outputElement = document.querySelector("#api");
const outputCard = document.getElementById("card");
const suggestionsList = document.getElementById("suggestions");
let timerID;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const locationName = locationInput.value.trim();

  if (!locationName) {
    outputElement.textContent = `Please enter a valid location`;
    return;
  }
  locationInput.value = "";
  suggestionsList.style.display = "none";
  await handleWeatherSearch(locationName);
});

locationInput.addEventListener("input", () => {
  clearTimeout(timerID);
  timerID = setTimeout(() => {
    const locationInputListener = locationInput.value.trim();

    if (locationInputListener) {
      handleSuggestions(locationInputListener);
    } else {
      suggestionsList.style.display = "none";
      console.log("Suggestions Hidden");
    }
  }, 300);
});

async function handleSuggestions(location) {
  if (location.length < 3) {
    suggestionsList.style.display = "none";
    return;
  }
  try {
    const data = await getGeo(location);
    if (!data.results) {
      suggestionsList.style.display = "none";
      return;
    }
    suggestionsList.style.display = "block";

    const suggestions = data.results
      .slice(0, 3)
      .map((place) => createSuggestionItem(place));
    suggestionsList.replaceChildren(...suggestions);
  } catch (error) {
    suggestionsList.style.display = "none";
    console.error("Error fetching suggestions:", error);
  }
}

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

    //console.log(weather);
    //console.log(location);

    outputCard.appendChild(
      createWeatherCard(countryName, locationName, temp, unit, weatherInfo),
    );
  } catch (error) {
    console.error("Error fetching weather:", error);
    outputElement.textContent = `Failed to load weather data. Please try again.`;
  }
}
