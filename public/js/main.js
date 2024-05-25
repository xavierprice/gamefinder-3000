document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", async () => {
    try {
      const searchValue = document.getElementById("search-bar").value;
      let ratingValue = document.getElementById("rating-select").value;

      // Construct object to pass through to server
      let data = { search: searchValue };

      // Parse rating
      if (ratingValue !== "all") {
        data.rating = parseInt(ratingValue);
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
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
