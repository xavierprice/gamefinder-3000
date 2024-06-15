import { checkArray } from "./checkArray.js";
import { displayGames } from "./displayGames.js";
import { sortGames } from "./sortGames.js";

document.addEventListener("DOMContentLoaded", () => {
  const toggleButtonFilters = document.getElementById("toggle-button-filters");
  const filtersWrapper = document.querySelector(".filters-wrapper");
  const arrowFilters = document.getElementById("arrow-filters");

  toggleButtonFilters.addEventListener("click", () => {
    filtersWrapper.classList.toggle("visible");
    arrowFilters.classList.toggle("rotated");
  });

  // Function to close filters
  const closeFilterContainer = () => {
    filtersWrapper.classList.remove("visible");
    arrowFilters.classList.remove("rotated");
  };

  // Close filters when clicking outside of it
  document.body.addEventListener("click", (event) => {
    if (
      !filtersWrapper.contains(event.target) &&
      !toggleButtonFilters.contains(event.target)
    ) {
      closeFilterContainer();
    }
  });

  // Close filters when scrolling
  document.addEventListener("scroll", () => {
    closeFilterContainer();
  });

  // Filter Order
  const ascending = document.getElementById("ascending");
  const descending = document.getElementById("descending");

  let currentOrder = "ascending";

  // Function to set currentOrder while gamesList is not visible
  function handleClick(event) {
    ascending.classList.remove("selected");
    descending.classList.remove("selected");
    event.target.classList.add("selected");
    if (event.target === ascending) {
      currentOrder = "ascending";
    } else {
      currentOrder = "descending";
    }
    console.log(currentOrder);
  }

  ascending.addEventListener("click", handleClick);
  descending.addEventListener("click", handleClick);

  function updateSortOrder() {
    document
      .getElementById("ascending")
      .classList.toggle("selected", currentOrder === "ascending");
    document
      .getElementById("descending")
      .classList.toggle("selected", currentOrder === "descending");
  }

  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", async () => {
    try {
      const searchValue = document.getElementById("search-bar").value;
      let ratingValue = document.getElementById("rating-select").value;
      let genreValue = document.getElementById("genre-select").value;
      let platformValue = document.getElementById("platform-select").value;
      let gameModeValue = document.getElementById("game-mode-select").value;
      const loading = document.getElementById("loading-container");
      const homePage = document.getElementById("home-page");

      homePage.classList.add("hidden");
      loading.classList.remove("hidden");
      document.body.classList.add("loading");

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
        checkArray(games);
        console.log("Success", games);
        console.log(currentOrder);
        // Sort on change
        document
          .getElementById("sortBy")
          .addEventListener("change", function () {
            const criteria = this.value;
            const order = currentOrder;
            const sortedGames = sortGames(games, criteria, order);
            displayGames(sortedGames);
          });

        // Set up event listener for sort order ascending
        document
          .getElementById("ascending")
          .addEventListener("click", function () {
            updateSortOrder();
            const criteria = document.getElementById("sortBy").value;
            const sortedGames = sortGames(games, criteria, currentOrder); // Sort the original array
            displayGames(sortedGames);
          });

        // Set up event listener for sort order descending
        document
          .getElementById("descending")
          .addEventListener("click", function () {
            updateSortOrder();
            const criteria = document.getElementById("sortBy").value;
            const sortedGames = sortGames(games, criteria, currentOrder); // Sort the original array
            displayGames(sortedGames);
          });

        // Initial sort
        document.getElementById("sortBy").dispatchEvent(new Event("change"));
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
