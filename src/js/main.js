import { fetchAPOD } from "./api.js";
import { getFavorites, saveFavorite } from "./favoritos.js";
 
const title = document.getElementById("title");
const dateText = document.getElementById("date");
const explanation = document.getElementById("explanation");
const media = document.getElementById("media");
const datePicker = document.getElementById("datePicker");
const favoritesList = document.getElementById("favoritesList");
 
let currentAPOD = null;
 
async function loadAPOD(date = "") {
  const data = await fetchAPOD(date);
  currentAPOD = data;
 
  title.textContent = data.title;
  dateText.textContent = data.date;
  explanation.textContent = data.explanation;
 
  media.innerHTML =
    data.media_type === "image"
      ? `<img src="${data.url}" />`
      : `<iframe src="${data.url}" frameborder="0"></iframe>`;
}
 
function renderFavorites() {
  favoritesList.innerHTML = "";
  getFavorites().forEach(fav => {
    const li = document.createElement("li");
    li.textContent = fav.title;
    li.onclick = () => loadAPOD(fav.date);
    favoritesList.appendChild(li);
  });
}
 
datePicker.max = new Date().toISOString().split("T")[0];
datePicker.onchange = e => loadAPOD(e.target.value);
 
document.getElementById("saveFavorite").onclick = () => {
  if (currentAPOD) {
    saveFavorite(currentAPOD);
    renderFavorites();
  }
};
 
loadAPOD();
renderFavorites();