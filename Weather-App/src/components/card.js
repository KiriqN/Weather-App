export function createWeatherCard(
  country,
  name,
  temperature,
  units,
  weatherCode,
) {
  const card = document.createElement("article");
  card.className =
    "rounded-xl p-4 shadow-md min-h-[200px] bg-[#1a1a1a] border-[#333333] border-1";

  // Top row: name and country on the left, close button on the right
  const topRow = document.createElement("div");
  topRow.className = "flex justify-between items-start";

  const textGroup = document.createElement("div");

  const countryPlace = document.createElement("h2");
  countryPlace.className = "text-[15px] font-medium text-gray-100";
  countryPlace.textContent = name;

  const countryName = document.createElement("p");
  countryName.className = "text-xs text-gray-400";
  countryName.textContent = country;

  const closeIcon = document.createElement("button");
  closeIcon.type = "button";
  closeIcon.className =
    "cursor-pointer font-semibold leading-none text-gray-500 hover:text-gray-200";
  closeIcon.textContent = "x";
  closeIcon.setAttribute("aria-label", `Remove ${name}`);

  textGroup.append(countryPlace, countryName);
  topRow.append(textGroup, closeIcon);

  // Weather icon
  const iconElement = document.createElement("img");
  iconElement.className = "w-12 h-12 mt-2";
  iconElement.src = `/weather-icons/${weatherCode.icon}.svg`;
  iconElement.alt = weatherCode.label;

  // Temperature row: big number with a smaller unit beside it
  const tempRow = document.createElement("p");
  tempRow.className = "flex mt-2 items-baseline gap-1";

  const degrees = document.createElement("span");
  degrees.className = "text-[32px] font-medium text-gray-100";
  degrees.textContent = temperature;

  const unit = document.createElement("span");
  unit.className = "text-[15px] font-medium text-gray-400";
  unit.textContent = units;

  tempRow.append(degrees, unit);

  // Condition label
  const weatherDescription = document.createElement("p");
  weatherDescription.className = "text-sm mt-2 text-gray-400";
  weatherDescription.textContent = weatherCode.label;

  card.append(topRow, iconElement, tempRow, weatherDescription);

  return card;
}
