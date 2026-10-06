export function createSuggestionItem(place, onItemClick) {
  const suggestionItem = document.createElement("li");
  suggestionItem.className =
    "suggestion-item border-b border-gray-700 h-auto px-2 cursor-pointer hover:bg-gray-700";
  suggestionItem.textContent = `${place.name}, ${place.country}, ${place.admin1}`;
  suggestionItem.addEventListener("click", () => onItemClick(place));

  return suggestionItem;
}
