const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const getToken = require(path.resolve(__dirname, "./getToken.js"));

const clientId = process.env.CLIENT_ID;

async function fetchGames(search, rating, genre, platform, gameMode) {
  try {
    const accessToken = await getToken();

    let query = `
      fields name, total_rating, genres, platforms, game_modes, cover.url;
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
