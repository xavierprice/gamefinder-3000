import { displayGames } from "./displayGames.js";

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-button");
  const filtersWrapper = document.querySelector(".filters-wrapper");
  const arrow = document.getElementById("arrow");

  toggleButton.addEventListener("click", () => {
    filtersWrapper.classList.toggle("visible");
    arrow.classList.toggle("rotated");
  });

  // Function to close filters
  const closeFilterContainer = () => {
    filtersWrapper.classList.remove("visible");
    arrow.classList.remove("rotated");
  };

  // Close filters when clicking outside of it
  document.body.addEventListener("click", (event) => {
    if (
      !filtersWrapper.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      closeFilterContainer();
    }
  });

  // Close filters when scrolling
  document.addEventListener("scroll", () => {
    closeFilterContainer();
  });

  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", async () => {
    try {
      const searchValue = document.getElementById("search-bar").value;
      let ratingValue = document.getElementById("rating-select").value;
      let genreValue = document.getElementById("genre-select").value;
      let platformValue = document.getElementById("platform-select").value;
      let gameModeValue = document.getElementById("game-mode-select").value;

      // Construct object to pass through to server
      let data = { search: searchValue };

      // Parse values if selected
      if (ratingValue !== "any") {
        data.rating = parseInt(ratingValue);
      }
      if (genreValue !== "any") {
        data.genre = parseInt(genreValue);
      }
      if (platformValue !== "any") {
        data.platform = parseInt(platformValue);
      }
      if (gameModeValue !== "any") {
        data.gameMode = parseInt(gameModeValue);
      }

      closeFilterContainer();

      // Send client request to server
      const response = await fetch("http://localhost:3000/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const games = await response.json();
        console.log("Success", games);
        displayGames(games);
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
