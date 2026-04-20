const API_KEY = "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov/planetary/apod";
 
export async function fetchAPOD(date = "") {
  const url = `${BASE_URL}?api_key=${API_KEY}&date=${date}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener datos");
  return await response.json();
}
``