import "./style.css";
import { getData } from "./api/api.js";
import { getGeo } from "./api/geocode.js";
import { createWeatherCard } from "./components/card.js";
import { getWeatherCodes } from "./utils/weathercodes.js";
import { createSuggestionItem } from "./components/suggestions.js";
import { localStorageAvailable } from "./utils/storage.js";
import { getLocalStorageItem } from "./utils/storage.js";

/*handleWeatherSearch("New York");
handleWeatherSearch("Somerset West");
handleWeatherSearch("Stellenbosch");
handleWeatherSearch("St Petersburg");
handleWeatherSearch("Maldives");
*/

const storedLocations = getLocalStorageItem("weatherCardLocations");
let weatherCardLocations = storedLocations ? JSON.parse(storedLocations) : [];

const form = document.querySelector("#search-form");
const locationInput = document.getElementById("locationInput");
const outputElement = document.querySelector("#api");
const outputCard = document.getElementById("card");
const suggestionsList = document.getElementById("suggestions");
const spinner = document.getElementById("spinner");
let timerID;

spinner.style.display = "none"; // Hide the spinner initially

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
    }
  }, 300);
});

async function handleSuggestions(location) {
  const minChar = 3;

  if (location.length < minChar) {
    suggestionsList.style.display = "none";
    return;
  }
  try {
    const data = await getGeo(location);
    if (!data.results) {
      suggestionsList.style.display = "none";
      return;
    }

    const suggestions = data.results.slice(0, 3).map((place) =>
      createSuggestionItem(place, async (selectedPlace) => {
        locationInput.value = "";
        suggestionsList.style.display = "none";
        await showWeatherForPlace(selectedPlace);
      }),
    );
    suggestionsList.replaceChildren(...suggestions);
    suggestionsList.style.display = "block";
  } catch (error) {
    suggestionsList.style.display = "none";
    console.error("Error fetching suggestions:", error);
  }
}

// Submit path: turns a typed name into a place, then shows its weather.
async function handleWeatherSearch(name) {
  spinner.style.display = "block"; // Show the spinner while loading

  try {
    const location = await getGeo(name);

    console.log(location);

    if (!location.results) {
      outputElement.textContent = `No location found.`;
      return;
    }

    await showWeatherForPlace(location.results[0]);

    spinner.style.display = "none"; // Hide the spinner after loading
  } catch (error) {
    console.error("Error searching for location:", error);
    outputElement.textContent = `Failed to find that location. Please try again.`;
    spinner.style.display = "none"; // Hide the spinner after loading
  }
}

// Shared by both paths: takes a place object and creates its weather card.
async function showWeatherForPlace(place) {
  spinner.style.display = "block"; // Show the spinner while loading

  try {
    const weather = await getData(place.latitude, place.longitude);

    const temp = weather.current.temperature_2m;
    const unit = weather.current_units.temperature_2m;
    const weatherCode = weather.current.weather_code;
    const isDay = weather.current.is_day;

    const weatherInfo = getWeatherCodes(weatherCode, isDay);

    outputElement.textContent = "";
    /*outputCard.appendChild(
      createWeatherCard(place.country, place.name, temp, unit, weatherInfo), 
    ); */

    const weatherLocation = {
      id: place.id,
      temperature: temp,
      units: unit,
      weatherCode: weatherInfo,
      country: place.country,
      name: place.name,
    };
    weatherCardLocations.push(weatherLocation);
    console.log(weatherCardLocations);
    render();

    spinner.style.display = "none"; // Hide the spinner after loading
  } catch (error) {
    console.error("Error fetching weather:", error);
    outputElement.textContent = `Failed to load weather data. Please try again.`;
    spinner.style.display = "none"; // Hide the spinner after loading
  }
}

function render() {
  outputCard.innerHTML = "";
  weatherCardLocations.forEach((location) => {
    const card = createWeatherCard(
      location.id,
      location.country,
      location.name,
      location.temperature,
      location.units,
      location.weatherCode,
      (cardID) => {
        weatherCardLocations = weatherCardLocations.filter(
          (loc) => loc.id !== cardID,
        );

        render();
      },
    );
    outputCard.appendChild(card);
  });

  localStorage.setItem(
    "weatherCardLocations",
    JSON.stringify(weatherCardLocations),
  );
}

render(storedLocations);
