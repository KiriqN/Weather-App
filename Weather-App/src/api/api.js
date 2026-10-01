export async function getData(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code`,
  );

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}
