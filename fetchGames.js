import fetch from "node-fetch";
import getToken from "./getToken.js";
import { config } from "dotenv";
config();
// add parameters from user to fetch games
async function fetchGames(search, rating) {
  try {
    const accessToken = await getToken();
// use query for IGDB API
    let query = `
      fields name, total_rating;
      search "${search}";
      limit 10;
    `;
// add filters to query
    if (rating !== "all") {
      query += ` where total_rating >= ${rating};`;
    }

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error("Error fetching games");
    }

    const responseData = await response.json();
    console.log("Games:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error fetching games:", error.message);
    throw error;
  }
}

//testing parameters
////will remove once all filters have functions to extract data
fetchGames("Mario", 60);

export default fetchGames;