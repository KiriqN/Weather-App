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

  const countryPlace = document.createElement("h2");
  countryPlace.className = "text-[15px] font-medium text-gray-100";
  countryPlace.textContent = `${name}`;

  const countryName = document.createElement("p");
  countryName.className = "text-xs text-gray-400";
  countryName.textContent = `${country}`;

  const iconElement = document.createElement("img");
  iconElement.className = "w-12 h-12 mt-2";
  iconElement.src = "/weather-icons/clear-day.svg";
  iconElement.alt = "Weather Icon";

  const tempRow = document.createElement("p");
  tempRow.className = "flex items-baseline gap-0.5";

  const degrees = document.createElement("span");
  degrees.className = "text-[32px] font-medium text-gray-100";
  degrees.textContent = `${temperature}`;

  const unit = document.createElement("span");
  unit.className = "text-[15px] text-gray-400";
  unit.textContent = ` ${units}`;

  const weatherDescription = document.createElement("p");
  weatherDescription.className = "text-sm text-gray-400";
  weatherDescription.textContent = `Clear Sky`;

  card.append(
    countryPlace,
    countryName,
    iconElement,
    tempRow,
    degrees,
    unit,
    weatherDescription,
  );

  return card;
}
