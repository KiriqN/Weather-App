export async function getGeo(name) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=10&language=en&format=json`,
  );

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}
