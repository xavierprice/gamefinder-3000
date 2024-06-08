export function checkArray(games) {
  const emptyArrayDiv = document.getElementById("empty-array");
  const gamesList = document.getElementById("games-list");

  if (games.length === 0) {
    emptyArrayDiv.classList.remove("hidden");
    gamesList.classList.add("hidden");
  } else {
    emptyArrayDiv.classList.add("hidden");
    gamesList.classList.remove("hidden");
  }
}
