import "./style.css";
import heroImg from "./assets/hero.png";
import javascriptLogo from "./assets/javascript.svg";
import viteLogo from "./assets/vite.svg";
import { setupCounter } from "./counter.js";
import { getData } from "./api/api.js";
import { getGeo } from "./api/geocode.js";
import { createWeatherCard } from "./components/card.js";

const form = document.querySelector("#search-form");
const locationInput = document.getElementById("locationInput");
const outputElement = document.querySelector("#api");
const outputCard = document.getElementById("card");

handleWeatherSearch("New York");

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

    console.log(location);
    console.log(weather);

    outputElement.textContent = `${temp}${unit}`;
    outputCard.appendChild(createWeatherCard("USA", "New York", 25, "°C"));
    outputCard.appendChild(createWeatherCard("USA", "New York", 25, "°C"));
    /* outputCard.appendChild(
      createWeatherCard(countryName, locationName, temp, unit),
    ); */
  } catch (error) {
    console.error("Error fetching weather:", error);
    outputElement.textContent = `Failed to load weather data. Please try again.`;
  }
}

/*getData().then((results) => {
  //document.querySelector("#api").innerHTML = JSON.stringify(results);
  //console.log(results);
}); */

/*document.querySelector("#app").innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.js</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${javascriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`; */

//setupCounter(document.querySelector("#counter"));
