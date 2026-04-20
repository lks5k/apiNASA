const KEY = "apodFavorites";
 
export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}
 
export function saveFavorite(apod) {
  const favorites = getFavorites();
  if (!favorites.some(f => f.date === apod.date)) {
    favorites.push(apod);
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }
}