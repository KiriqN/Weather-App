const outputCard = document.getElementById("card");

export function createWeatherCard(
  country,
  name,
  temperature,
  units,
  icon,
  description,
) {
  const card = document.createElement("article");
  card.className =
    "rounded-xl p-4 shadow-md min-h-[200px] bg-[#1a1a1a] border-[#333333] border-1";

  const temp = document.createElement("h2");
  temp.className = "text-[15px] font-medium text-gray-100";
  temp.textContent = `${name}`;

  const countryName = document.createElement("p");
  countryName.className = "text-xs text-gray-400";
  countryName.textContent = `${country}`;

  const iconElement = document.createElement("img");
  iconElement.className = "w-12 h-12 mt-2";
  iconElement.src = "/weather-icons/clear-day.svg";
  iconElement.alt = "Weather Icon";

  const weather = document.createElement("p");
  weather.className = "text-xl font-semibold text-gray-500";
  weather.textContent = `${temperature} ${units}`;

  const weatherDescription = document.createElement("p");
  weatherDescription.className = "text-sm text-gray-400";
  weatherDescription.textContent = `Clear Sky`;

  card.append(temp, countryName, iconElement, weather, weatherDescription);

  return card;
}
