//use require for server-side environment
const getToken = require("./getToken");
//use axios instead of fetch, as fetch is not available in Node.js.
const axios = require("axios");
require("dotenv").config();
//process clientId here for easier reasability
const clientId = process.env.CLIENT_ID;
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

    const response = await axios.post("https://api.igdb.com/v4/games", query, {
      headers: {
        //use variable here instead of process.env
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
// testing parameters
fetchGames("Mario", 90)
  .then((responseData) => {
    console.log("Games:", responseData);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

module.exports = fetchGames;
