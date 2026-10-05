export function createSuggestionItem(place) {
  const suggestionItem = document.createElement("li");
  suggestionItem.className = "suggestion-item";
  suggestionItem.textContent = `${place.name}, ${place.country}, ${place.admin1}`;

  return suggestionItem;
}
