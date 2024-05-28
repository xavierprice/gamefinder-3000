document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", async () => {
    try {
      const searchValue = document.getElementById("search-bar").value;
      let ratingValue = document.getElementById("rating-select").value;
      let genreValue = document.getElementById("genre-select").value;
      let platformValue = document.getElementById("platform-select").value;
      let gameModeValue = document.getElementById("game-mode-select").value;

      const showMoreBtn = document.querySelector(".show-more");
      const moreText = document.querySelector(".more-text");
      showMoreBtn.addEventListener("click", function () {
        if (moreText.style.display === "none") {
          moreText.style.display = "inline";
          showMoreBtn.innerHTML = "Show Less ▲";
        } else {
          moreText.style.display = "none";
          showMoreBtn.innerHTML = "Show More ▼";
        }
      });

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

      // Send client request to server
      const response = await fetch("http://localhost:3000/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success", result);
        displayGames(result);
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
