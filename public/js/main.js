import { checkArray } from "./checkArray.js";
import { displayGames } from "./displayGames.js";
import { sortGames } from "./sortGames.js";

document.addEventListener("DOMContentLoaded", () => {
  // Generate HTML values
  const genres = [
    { value: "any", text: "Any" },
    { value: "31", text: "Adventure" },
    { value: "33", text: "Arcade" },
    { value: "35", text: "Card & Board Game" },
    { value: "4", text: "Fighting" },
    { value: "25", text: "Hack and slash/Beat 'em up" },
    { value: "32", text: "Indie" },
    { value: "36", text: "MOBA" },
    { value: "7", text: "Music" },
    { value: "30", text: "Pinball" },
    { value: "8", text: "Platform" },
    { value: "2", text: "Point-and-click" },
    { value: "9", text: "Puzzle" },
    { value: "26", text: "Quiz/Trivia" },
    { value: "10", text: "Racing" },
    { value: "11", text: "Real Time Strategy (RTS)" },
    { value: "12", text: "Role-playing (RPG)" },
    { value: "13", text: "Simulator" },
    { value: "5", text: "Shooter" },
    { value: "14", text: "Sport" },
    { value: "15", text: "Strategy" },
    { value: "24", text: "Tactical" },
    { value: "16", text: "Turn-based strategy (TBS)" },
    { value: "34", text: "Visual Novel" },
  ];
  const platforms = [
    { value: "any", text: "Any" },
    { value: "52", text: "Arcade" },
    { value: "34", text: "Android" },
    { value: "33", text: "Game Boy" },
    { value: "22", text: "Game Boy Color" },
    { value: "24", text: "Game Boy Advance" },
    { value: "388", text: "Gear VR" },
    { value: "39", text: "iOS" },
    { value: "14", text: "Mac" },
    { value: "386", text: "Meta Quest 2" },
    { value: "471", text: "Meta Quest 3" },
    { value: "130", text: "Nintendo Switch" },
    { value: "20", text: "Nintendo DS" },
    { value: "159", text: "Nintendo DSi" },
    { value: "21", text: "Nintendo GameCube" },
    { value: "387", text: "Oculus Go" },
    { value: "384", text: "Oculus Quest" },
    { value: "162", text: "Oculus VR" },
    { value: "6", text: "PC (Microsoft Windows)" },
    { value: "7", text: "PlayStation" },
    { value: "8", text: "PlayStation 2" },
    { value: "9", text: "PlayStation 3" },
    { value: "48", text: "PlayStation 4" },
    { value: "167", text: "PlayStation 5" },
    { value: "165", text: "PlayStation VR" },
    { value: "390", text: "PlayStation VR2" },
    { value: "163", text: "SteamVR" },
    { value: "5", text: "Wii" },
    { value: "41", text: "Wii U" },
    { value: "11", text: "Xbox" },
    { value: "12", text: "Xbox 360" },
    { value: "49", text: "Xbox One" },
    { value: "169", text: "Xbox Series X|S" },
  ];
  const gameModes = [
    { value: "any", text: "Any" },
    { value: "1", text: "Single player" },
    { value: "2", text: "Multiplayer" },
    { value: "3", text: "Co-operative" },
    { value: "4", text: "Split screen" },
    { value: "5", text: "Massively Multiplayer Online (MMO)" },
    { value: "6", text: "Battle Royale" },
  ];
  function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option.value;
      opt.textContent = option.text;
      select.appendChild(opt);
    });
  }
  populateSelect("genre-select", genres);
  populateSelect("platform-select", platforms);
  populateSelect("game-mode-select", gameModes);

  //Rating options select
  const ratingOptions = document.querySelectorAll(".rating-option");
  const sortByOptions = document.querySelectorAll(".sort-by-option");
  let ratingValue = "any";
  let sortByValue = "name";

  const gamesList = document.getElementById("games-list");

  // Scroll to top of games-list
  function scrollToTop() {
    if (gamesList) {
      gamesList.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function closeFiltersIfVisible() {
    if (filtersWrapper.classList.contains("visible")) {
      closeFilterContainer();
    }
  }

  ratingOptions.forEach((option) => {
    option.addEventListener("click", function () {
      ratingOptions.forEach((opt) => opt.classList.remove("selected"));

      this.classList.add("selected");

      ratingValue = this.getAttribute("data-value");
    });
  });

  sortByOptions.forEach((option) => {
    option.addEventListener("click", function () {
      sortByOptions.forEach((opt) => opt.classList.remove("selected"));

      this.classList.add("selected");

      sortByValue = this.getAttribute("data-value");
    });
  });

  const toggleButtonFilters = document.getElementById("toggle-button-filters");
  const filtersWrapper = document.querySelector(".filters-wrapper");
  const arrowFilters = document.getElementById("arrow-filters");

  const closeButton = document.querySelector(".close-button");

  closeButton.addEventListener("click", () => {
    closeFilterContainer();
  });

  toggleButtonFilters.addEventListener("click", () => {
    filtersWrapper.classList.toggle("visible");
    arrowFilters.classList.toggle("rotated");
    if (filtersWrapper.classList.contains("visible")) {
      filtersWrapper.scrollTop = 0;
    }
  });

  const closeFilterContainer = () => {
    filtersWrapper.classList.remove("visible");
    arrowFilters.classList.remove("rotated");
  };

  document.body.addEventListener("click", (event) => {
    if (
      !filtersWrapper.contains(event.target) &&
      !toggleButtonFilters.contains(event.target)
    ) {
      closeFilterContainer();
    }
  });

  function addScrollListener() {
    document.addEventListener("scroll", closeFilterContainer);
  }

  function removeScrollListener() {
    document.removeEventListener("scroll", closeFilterContainer);
  }

  function handleScrollListener() {
    if (window.innerWidth > 492) {
      addScrollListener();
    } else {
      removeScrollListener();
    }
  }

  handleScrollListener();

  window.addEventListener("resize", handleScrollListener);

  // Filter Order
  const ascending = document.getElementById("ascending");
  const descending = document.getElementById("descending");

  let currentOrder = "ascending";

  function handleClick(event) {
    ascending.classList.remove("selected");
    descending.classList.remove("selected");
    event.target.classList.add("selected");
    if (event.target === ascending) {
      currentOrder = "ascending";
      scrollToTop();
      closeFilterContainer();
    } else {
      currentOrder = "descending";
      scrollToTop();
      closeFilterContainer();
    }
  }

  const searchBar = document.getElementById("search-bar");
  const submitButton = document.getElementById("submit-button");

  searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitButton.click();
    }
  });

  const selects = document.querySelectorAll("select");

  selects.forEach((select) => {
    select.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
      }
    });
  });

  document.querySelectorAll(".rating-option").forEach((button) => {
    button.addEventListener("click", function () {
      this.focus();
    });

    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
      }
    });
  });

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

  sortByOptions.forEach((option) => {
    option.addEventListener("click", () => {
      scrollToTop();
      closeFiltersIfVisible();
      currentOrder = "ascending";
      ascending.classList.add("selected");
      descending.classList.remove("selected");
    });
  });

  const clearFiltersButton = document.getElementById("clear-filters-button");
  clearFiltersButton.addEventListener("click", function () {
    // Search
    document.getElementById("search-bar").value = "";
    // Genre
    document.getElementById("genre-select").selectedIndex = 0;
    // Rating
    document
      .querySelectorAll(".rating-options .rating-option")
      .forEach((button) => {
        button.classList.remove("selected");
      });
    document
      .querySelector('.rating-options button[data-value="any"]')
      .classList.add("selected");
    ratingValue = "any";
    // Platform
    document.getElementById("platform-select").selectedIndex = 0;
    // Game-modes
    document.getElementById("game-mode-select").selectedIndex = 0;
    // Sorting
    document.querySelectorAll("#sortBy .sort-by-option").forEach((button) => {
      button.classList.remove("selected");
    });
    document
      .querySelector('#sortBy button[data-value="name"]')
      .classList.add("selected");
    sortByValue = "name";
    // Order
    document.getElementById("ascending").classList.add("selected");
    document.getElementById("descending").classList.remove("selected");
    currentOrder = "ascending";
  });

  submitButton.addEventListener("click", async () => {
    try {
      const searchValue = document.getElementById("search-bar").value;
      let genreValue = document.getElementById("genre-select").value;
      let platformValue = document.getElementById("platform-select").value;
      let gameModeValue = document.getElementById("game-mode-select").value;
      const loading = document.getElementById("loading-container");
      const loadingMessage = document.getElementById("initial-message");
      const additionalMessage = document.getElementById("additional-message");
      const anotherMessage = document.getElementById(
        "another-additional-message"
      );
      const finalMessage = document.getElementById("final-message");
      const homePage = document.getElementById("home-page");
      const serverDownMessage = document.getElementById("server-down");

      serverDownMessage.classList.add("hidden");
      homePage.classList.add("hidden");
      loading.classList.remove("hidden");

      const initialTimeout = setTimeout(() => {
        loadingMessage.classList.remove("hidden");

        setTimeout(() => {
          additionalMessage.classList.remove("hidden");
        }, 10000); // Second message
      }, 5000); // First message

      document.body.classList.add("loading");

      let data = { search: searchValue };

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
      const response = await fetch(
        "https://gamefinder-3000-server.onrender.com/api/games",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const games = await response.json();
        checkArray(games);
        // development purposes
        // console.log("Success", games);

        let criteria = sortByValue;
        let order = currentOrder;
        const sortedGames = sortGames(games, criteria, order);
        displayGames(sortedGames);

        document
          .querySelectorAll("#sortBy .sort-by-option")
          .forEach((button) => {
            button.addEventListener("click", function () {
              document
                .querySelector("#sortBy .sort-by-option.selected")
                .classList.remove("selected");
              this.classList.add("selected");
              criteria = this.getAttribute("data-value");
              order = currentOrder;
              const sortedGames = sortGames(games, criteria, order);
              displayGames(sortedGames);
            });
          });

        document
          .getElementById("ascending")
          .addEventListener("click", function () {
            updateSortOrder("ascending");
            criteria = document
              .querySelector("#sortBy .sort-by-option.selected")
              .getAttribute("data-value");
            const sortedGames = sortGames(games, criteria, currentOrder);
            displayGames(sortedGames);
          });

        document
          .getElementById("descending")
          .addEventListener("click", function () {
            updateSortOrder("descending");
            criteria = document
              .querySelector("#sortBy .sort-by-option.selected")
              .getAttribute("data-value");
            const sortedGames = sortGames(games, criteria, currentOrder);
            displayGames(sortedGames);
          });

        document.getElementById("sortBy").dispatchEvent(new Event("change"));
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
        clearTimeout(initialTimeout);
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);

      loading.classList.add("hidden");
      loadingMessage.classList.add("hidden");

      const serverDownMessage = document.getElementById("server-down");
      serverDownMessage.classList.remove("hidden");
    }
  });
});
