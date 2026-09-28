export async function getData() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=-33.9258&longitude=18.4232&hourly=uv_index&current=temperature_2m,precipitation,is_day,rain";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
