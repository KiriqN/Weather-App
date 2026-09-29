export async function getGeo() {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search?name=cape+town&count=10&language=en&format=json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
