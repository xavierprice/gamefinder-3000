const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const getToken = require(path.resolve(__dirname, "./getToken.js"));

const clientId = process.env.CLIENT_ID;

async function fetchGames(search, rating) {
  try {
    const accessToken = await getToken();

    let query = `
      fields name, total_rating;
      search "${search}";
      limit 10;
    `;
    // Add rating to query if present in data
    if (rating && rating !== "all") {
      query += ` where total_rating >= ${rating};`;
    }
    // API request to IGDB games database
    const response = await axios.post("https://api.igdb.com/v4/games", query, {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error.message);
    throw error;
  }
}

module.exports = fetchGames;
