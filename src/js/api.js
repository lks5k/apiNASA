// src/js/api.js
 
const API_KEY = "2I1u2lbJBOoToBMxUpidcz8aOwrz855MldgOjBaF";
const BASE_URL = "https://api.nasa.gov/planetary/apod";
 
export async function fetchAPOD(date = "") {
  const url = `${BASE_URL}?api_key=${API_KEY}&date=${date}`;
 
  const response = await fetch(url);
 
  if (response.status === 429) {
    throw new Error(
      "Límite de peticiones alcanzado (Error 429). Intenta más tarde."
    );
  }
 
  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la NASA.");
  }
 
  return await response.json();
}