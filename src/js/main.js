// src/js/main.js
 
import { fetchAPOD } from "./api.js";
import { getFavorites, saveFavorite } from "./favoritos.js";
 
// Referencias al DOM
const title = document.getElementById("title");
const dateText = document.getElementById("date");
const explanation = document.getElementById("explanation");
const media = document.getElementById("media");
const datePicker = document.getElementById("datePicker");
const favoritesList = document.getElementById("favoritesList");
const saveButton = document.getElementById("saveFavorite");
 
let currentAPOD = null;
 
// 🔹 Cargar APOD
async function loadAPOD(date = "") {
  try {
    explanation.textContent = "Cargando información de la NASA...";
    media.innerHTML = "";
 
    const data = await fetchAPOD(date);
    currentAPOD = data;
 
    title.textContent = data.title;
    dateText.textContent = data.date;
    explanation.textContent = data.explanation;
 
if (data.media_type === "image") {
  media.innerHTML = `
    <img
      src="${data.url}"
      alt="${data.title}"
      style="max-width: 100%; border-radius: 8px;"
    />
  `;
} else if (data.media_type === "video") {
  media.innerHTML = `
    <iframe
      src="${data.url}"
      width="100%"
      height="400"
      frameborder="0"
      allowfullscreen>
    </iframe>
  `;
}
  } catch (error) {
    explanation.textContent = error.message;
  }
}
 
// 🔹 Renderizar favoritos
function renderFavorites() {
  favoritesList.innerHTML = "";
 
  getFavorites().forEach((fav) => {
    const li = document.createElement("li");
    li.textContent = fav.title;
 
    li.addEventListener("click", () => {
      loadAPOD(fav.date);
    });
 
    favoritesList.appendChild(li);
  });
}
 
// 🔹 Validar fechas (no futuras)
const today = new Date().toISOString().split("T")[0];
datePicker.max = today;
 
datePicker.addEventListener("change", (e) => {
  loadAPOD(e.target.value);
});
 
// 🔹 Guardar favorito
saveButton.addEventListener("click", () => {
  if (currentAPOD) {
    saveFavorite(currentAPOD);
    renderFavorites();
  }
});
 
// 🔹 Inicialización
loadAPOD();
renderFavorites();
``