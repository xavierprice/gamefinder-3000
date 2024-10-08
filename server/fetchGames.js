const path = require("path");
const axios = require("axios");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const clientId = process.env.CLIENT_ID;

async function fetchGames(
  search,
  url,
  rating,
  genre,
  platform,
  gameMode,
  releaseDate,
  updatedAt
) {
  try {
    const accessToken = process.env.ACCESS_TOKEN;

    // Fetch properties of fields used in HTML
    let query = `
      fields name, url, total_rating, genres.name, platforms.name, game_modes.name, cover.url, summary, first_release_date, updated_at, version_parent;
where category = 0 & version_parent = null;
    `;
    // Add values to query if present in data
    if (search) {
      query += `search "${search}";`;
    }
    if (rating && rating !== "any") {
      query += ` where total_rating >= ${rating};`;
    }
    // Use () to filter value and include other values
    if (genre && genre !== "any") {
      query += ` where genres = (${genre});`;
    }
    if (platform && platform !== "any") {
      query += ` where platforms = (${platform});`;
    }
    if (gameMode && gameMode !== "any") {
      query += ` where game_modes = (${gameMode});`;
    }
    // Move limit to the end of the request for cleaner request
    query += "limit 10;";

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
