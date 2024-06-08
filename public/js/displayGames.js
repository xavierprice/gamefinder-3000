export function displayGames(games) {
  const gamesList = document.getElementById("games-list");

  gamesList.classList.remove("hidden");
  loading.classList.add("hidden");

  // Clear existing games
  gamesList.innerHTML = "";

  // Create and append new game cards
  games.forEach((game) => {
    const li = document.createElement("li");
    li.classList.add("card");

    const header = document.createElement("header");

    // Title
    const title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = game.name;

    // Header Data
    const headerData = document.createElement("div");
    headerData.classList.add("header-data");

    // Platforms
    const platformList = document.createElement("ul");
    platformList.classList.add("platform");

    if (game.platforms) {
      game.platforms.forEach((platform, index) => {
        const platformOption = document.querySelector(
          `option[data-platform-id="${platform.id}"]`
        );
        if (platformOption) {
          const platformItem = document.createElement("li");
          const platformName =
            platformOption.getAttribute("data-platform-name") ||
            "Unknown Platform";
          platformItem.textContent = platformName;
          platformList.appendChild(platformItem);
        }
      });
    }

    // Rating
    const rating = document.createElement("h5");
    rating.classList.add("rating");
    rating.textContent =
      "Rating: " + (game.total_rating ? game.total_rating.toFixed(1) : "N/A");

    // Append platforms and rating to header data
    headerData.appendChild(platformList);
    headerData.appendChild(rating);

    // Append title and header-data to header
    header.appendChild(title);
    header.appendChild(headerData);

    // Main content
    const main = document.createElement("main");
    main.classList.add("card-main");

    // Cover Art
    const coverArt = document.createElement("img");
    coverArt.classList.add("card-cover-art");
    coverArt.src = game.cover ? game.cover.url : "./assets/default-cover.jpg";
    coverArt.alt = "Game Cover Art";

    // Summary
    const cardSummary = document.createElement("section");
    cardSummary.classList.add("card-summary");

    const summary = document.createElement("p");
    summary.classList.add("text");
    // Maximum length for summary
    const maxLength = 200;
    const shortText = game.summary
      ? game.summary.slice(0, maxLength)
      : "No summary available.";
    // If long text then slice
    const longText = game.summary ? game.summary.slice(maxLength) : "";

    // Set summary text with "..." if longer than maxLength
    summary.textContent = shortText + (longText ? "..." : "");

    // Create span for hidden part of summary
    const moreText = document.createElement("span");
    moreText.classList.add("more-text");
    moreText.textContent = longText;
    moreText.style.display = "none";

    // Show More button
    if (longText) {
      const showMoreBtn = document.createElement("button");
      showMoreBtn.classList.add("show-more");
      showMoreBtn.textContent = "Show More ▼";
      showMoreBtn.addEventListener("click", function () {
        // Show text & hidden text buttons
        if (moreText.style.display === "none") {
          moreText.style.display = "inline";
          showMoreBtn.innerHTML = "Show Less ▲";
          // Remove the "..." when showing more
          summary.textContent = game.summary;
        } else {
          moreText.style.display = "none";
          showMoreBtn.innerHTML = "Show More ▼";
          // Add "..." when showing less
          summary.textContent = shortText + "...";
        }
      });
      // Append Summary then moreText then showMoreButton
      cardSummary.appendChild(summary);
      summary.appendChild(moreText);
      cardSummary.appendChild(showMoreBtn);
    } else {
      // If the summary is short, append it without Show More button
      cardSummary.appendChild(summary);
    }

    main.appendChild(coverArt);
    main.appendChild(cardSummary);

    // Footer
    const footer = document.createElement("footer");

    const footerTop = document.createElement("div");
    footerTop.classList.add("footer-top");

    // Genres
    const genreList = document.createElement("ul");
    genreList.classList.add("genre");
    if (game.genres) {
      game.genres.forEach((genre, index) => {
        const genreOption = document.querySelector(
          `option[data-genre-id="${genre.id}"]`
        );
        if (genreOption) {
          const genreItem = document.createElement("li");
          const genreName =
            genreOption.getAttribute("data-genre-name") || "Unknown Genre";
          genreItem.textContent = genreName;
          genreList.appendChild(genreItem);
        }
      });
    }

    // Game Modes
    const gameModeList = document.createElement("ul");
    gameModeList.classList.add("game-mode");
    if (game.game_modes) {
      game.game_modes.forEach((game_mode, index) => {
        const modeOption = document.querySelector(
          `option[data-game-mode-id="${game_mode.id}"]`
        );
        if (modeOption) {
          const modeItem = document.createElement("li");
          const modeName =
            modeOption.getAttribute("data-game-mode-name") || "Unknown Mode";
          modeItem.textContent = modeName;
          gameModeList.appendChild(modeItem);
        }
      });
    }

    footerTop.appendChild(genreList);
    footerTop.appendChild(gameModeList);

    // Footer end data
    const footerEnd = document.createElement("div");
    footerEnd.classList.add("footer-end");

    const dateReleased = document.createElement("h5");
    dateReleased.classList.add("date-released");
    dateReleased.textContent =
      "Released: " +
      (game.first_release_date
        ? new Date(game.first_release_date * 1000).toLocaleDateString()
        : "N/A");

    const dataUpdated = document.createElement("h5");
    dataUpdated.classList.add("data-updated");
    dataUpdated.textContent =
      "Data updated: " +
      (game.updated_at
        ? new Date(game.updated_at * 1000).toLocaleDateString()
        : "N/A");

    footerEnd.appendChild(dateReleased);
    footerEnd.appendChild(dataUpdated);

    // Append footer elements to footer
    footer.appendChild(footerTop);
    footer.appendChild(footerEnd);

    // Append header, main, and footer to list item
    li.appendChild(header);
    li.appendChild(main);
    li.appendChild(footer);

    // Append list item to games list
    gamesList.appendChild(li);
  });
}
