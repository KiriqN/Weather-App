export async function getData(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=uv_index&current=temperature_2m,precipitation,is_day,rain`,
  );

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}
